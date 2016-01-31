
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
    tr.append($('<td>').text(obj.State));
    tr.append($('<td>').text(obj.Label));
    tr.append($('<td>').text(obj.Varname));
    tr.append($('<td>').text(obj.Equation));
    tr.append($('<td>').text(obj.ParamRefAttr));
    tr.append($('<td>').text(obj.Category));
    tr.append($('<td>').text(obj.Role));
    tr.append($('<td>').text(obj.Comment));
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
