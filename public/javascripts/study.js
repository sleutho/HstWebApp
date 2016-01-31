
function loadTable() {
    $('#list tbody > tr').remove();

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/hyperstudy/api/studies/" + study,
        cache: false,
        success: function (data) {
            var table = $("#list").find('tbody');
            table.append($('<tr>')
                .append($('<td>').text(data.Label).dblclick(editCell))
                .append($('<td>').text(data.Comment)));
        }
    });
}

$(document).ready(function () {
    loadTable();
});

function editCell() {
    var OriginalContent = $(this).text();

    $(this).addClass("cellEditing");
    $(this).html('<input type="text" value="' + OriginalContent + '" />');
    $(this).children().first().focus();

    $(this).children().first().keypress(function (e) {
        if (e.which == 13) {
            var newContent = $(this).val();
            $(this).parent().text(newContent);
            $(this).parent().removeClass("cellEditing");
        }
    });

    $(this).children().first().blur(function () {
        $(this).parent().text(OriginalContent);
        $(this).parent().removeClass("cellEditing");
    });
}
