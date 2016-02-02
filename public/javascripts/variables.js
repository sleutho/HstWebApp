
function loadTable() {
    $('#list tbody > tr').remove();

    $.ajax({
        type: "GET",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies/" + study + "/variables",
        cache: false,
        success: function (data) {
            data.variables.forEach(function (element) {
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
    tr.append($('<td>').attr('data-attr', 'ParamRefAttr').dblclick(editCell).text(obj.ParamRefAttr));
    tr.append($('<td>').attr('data-attr', 'Category').dblclick(editCell).text(obj.Category));
    tr.append($('<td>').attr('data-attr', 'Role').dblclick(editCell).text(obj.Role));
    tr.append($('<td>').attr('data-attr', 'Levels').dblclick(editCell).text(obj.Levels));
    tr.append($('<td>').attr('data-attr', 'RoleDesc').dblclick(editCell).text(obj.RoleDesc));
    tr.append($('<td>').attr('data-attr', 'DataType').dblclick(editCell).text(obj.DataType));
    tr.append($('<td>').attr('data-attr', 'MinValueAttr').dblclick(editCell).text(obj.MinValueAttr));
    tr.append($('<td>').attr('data-attr', 'InitialValue').dblclick(editCell).text(obj.InitialValue));
    tr.append($('<td>').attr('data-attr', 'MaxValueAttr').dblclick(editCell).text(obj.MaxValueAttr));
    tr.append($('<td>').attr('data-attr', 'DataMode').dblclick(editCell).text(obj.DataMode));
    tr.append($('<td>').attr('data-attr', 'Levels').dblclick(editCell).text(obj.Levels));
    tr.append($('<td>').attr('data-attr', 'Distribution').dblclick(editCell).text(obj.Distribution));
    tr.append($('<td>').attr('data-attr', 'Alpha').dblclick(editCell).text(obj.Alpha));
    tr.append($('<td>').attr('data-attr', 'Beta').dblclick(editCell).text(obj.Beta));
    tr.append($('<td>').attr('data-attr', 'DataMode').dblclick(editCell).text(obj.Gamma));
    tr.append($('<td>').attr('data-attr', 'Comment').dblclick(editCell).text(obj.Comment));
    tr.append($('<input id="remove" type="button" size="20" value="Remove">').on('click', function () {
        removeVariable(obj.Varname, function () {
            $('*[data-id="' + obj.Varname + '"]').remove();
        });
    }))
    table.append(tr);
}

function newVariable() {
    $.ajax({
        type: "POST",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies/" + study + "/variables",
        cache: false,
        success: function (data) {
            addRow(data);
        }
    });
}

function removeVariable(id, callback) {
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "/hyperstudy/api/studies/" + study + "/variables/" + id,
        cache: false,
        success: function (data) {
            callback();
        }
    });
}

$(document).ready(function () {
    $(document).ready(function () {
        $('#new').bind('click', function () {
            newVariable();
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
                url: "/hyperstudy/api/studies/" + study + '/variables/' + varname,
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
