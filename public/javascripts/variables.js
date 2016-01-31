
function loadTable() {
    $('#list tbody > tr').remove();

    $.ajax({
        type: "GET",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies/" + study + "/variables",
        cache: false,
        success: function (data) {
            /*var table = $("#list").find('tbody');
            data.forEach(function (element) {
                table.append($('<tr>').attr('data-id', element.study)
                    .append($('<td>').text(element.study))
                    .append($('<td>').text(element.directory))
                    );
            });*/
        }
    });
}

$(document).ready(function () {
    loadTable();
});
