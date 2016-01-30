
function loadTable() {
    $('#list tbody > tr').remove();

    $.ajax({
        type: "GET",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies",
        cache: false,
        success: function (data) {
            var table = $("#list").find('tbody');
            data.forEach(function (element) {
                table.append($('<tr>').attr('data-id', element.study)
                    .append($('<td>').text(element.study))
                    .append($('<td>').text(element.directory))
                    .append($('<input id="remove" type="button" size="20" value="Remove">').on('click', function () {
                        removeStudy(element.study, function () {
                            $('*[data-id="' + element.study + '"]').remove();
                        });
                    })));
            });
        }
    });
}

function newStudy() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/hyperstudy/api/studies",
        cache: false,
        success: function (data) {
            loadTable();
        }
    });
}

function removeStudy(id, callback) {
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "/hyperstudy/api/studies/" + id,
        cache: false,
        success: function (data) {
            callback();
        }
    });
}

$(document).ready(function () {
    $(document).ready(function () {
        $('#new').bind('click', function () {
            newStudy();
        });
    });
    loadTable();
});
