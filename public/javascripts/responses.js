
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
    tr.append($('<td>').text(obj.State));
    tr.append($('<td>').text(obj.Label));
    tr.append($('<td>').text(obj.Varname));
    tr.append($('<td>').text(obj.Equation));
    tr.append($('<td>').text(obj.ModelParameter));
    tr.append($('<td>').text(obj.MinValueAttr));
    tr.append($('<td>').text(obj.InitialValue));
    tr.append($('<td>').text(obj.MaxValueAttr));
    tr.append($('<td>').text(obj.MasterEvaluator));
    tr.append($('<td>').text(obj.Comment));
    tr.append($('<input id="remove" type="button" size="20" value="Remove">').on('click', function () {
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
