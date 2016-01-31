
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
                .append($('<td>').text(data.Label))
                .append($('<td>').text(data.Comment)));
        }
    });
}

$(document).ready(function () {
    loadTable();
});
