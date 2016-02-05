
function loadTable() {
    $('#list tbody > tr').remove();

    $.ajax({
        type: "GET",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies/" + study + "/responses",
        cache: false,
        success: function (data) {
            data.responses.forEach(function (element) {
                addRow(element);
            });
        }
    });
}

function addRow(obj) {
    var table = $("#list").find('tbody');
    var tr = $('<tr>').attr('data-id', obj.Varname);
    tr.append($('<td>').attr('data-attr', 'State').dblclick(editCell).text(obj.State));
    tr.append($('<td>').attr('data-attr', 'Label').dblclick(editCell).text(obj.Label));
    tr.append($('<td>').attr('data-attr', 'Varname').dblclick(editCell).text(obj.Varname));
    tr.append($('<td>').attr('data-attr', 'Equation').dblclick(editCell).text(obj.Equation));
    tr.append($('<td>').attr('data-attr', 'ModelParameter').dblclick(editCell).text(obj.ModelParameter));
    tr.append($('<td>').attr('data-attr', 'MinValueAttr').dblclick(editCell).text(obj.MinValueAttr));
    tr.append($('<td>').attr('data-attr', 'InitialValue').dblclick(editCell).text(obj.InitialValue));
    tr.append($('<td>').attr('data-attr', 'MaxValueAttr').dblclick(editCell).text(obj.MaxValueAttr));
    tr.append($('<td>').attr('data-attr', 'MasterEvaluator').dblclick(editCell).text(obj.MasterEvaluator));
    tr.append($('<td>').attr('data-attr', 'Comment').dblclick(editCell).text(obj.Comment));
    tr.append($('<td>').append('<input id="remove" type="button" size="20" value="Remove" class="remove">').on('click', function () {
        removeResponse(obj.Varname, function () {
            $('*[data-id="' + obj.Varname + '"]').remove();
        });
    }))
    table.append(tr);
}

function newResponse() {
    $.ajax({
        type: "POST",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies/" + study + "/responses",
        cache: false,
        success: function (data) {
            addRow(data);
        }
    });
}

function removeResponse(id, callback) {
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "/hyperstudy/api/studies/" + study + "/responses/" + id,
        cache: false,
        success: function (data) {
            callback();
        }
    });
}

$(document).ready(function () {
    $(document).ready(function () {
        $('#new').bind('click', function () {
            newResponse();
        });
    });
    loadTable();
});

function editCell() {
    var OriginalContent = $(this).text();
    var attr = $(this).attr('data-attr');

    $(this).addClass("cellEditing");
    $(this).html('<input type="text" value="' + OriginalContent + '" />');
    $(this).children().first().focus();

    $(this).children().first().keypress(function (e) {
        if (e.which == 13) {
            var newContent = $(this).val();
            var parent = $(this).parent();
            var varname = parent.parent().attr('data-id');

            $.ajax({
                type: "PUT",
                url: "/hyperstudy/api/studies/" + study + '/responses/' + varname,
                //data: 'attr=' + attr + '&value=' + newContent,
                data: { attr: attr, value: newContent },
                cache: false,
                success: function (data) {
                    parent.text(newContent);
                    parent.removeClass("cellEditing");},
                error: function (req, status, err) {
                    console.log(status);
                    console.log(err);
                    parent.text(OriginalContent);
                    parent.removeClass("cellEditing");}
            });

        }
    });

    $(this).children().first().blur(function () {
        $(this).parent().text(OriginalContent);
        $(this).parent().removeClass("cellEditing");
    });
}
