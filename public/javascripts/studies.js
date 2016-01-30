
function loadTable() {
    var table = $("#list").find('tbody');

    $('#list tbody > tr').remove();

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/hyperstudy/api/studies",
        cache: false,
        success: function (data) {
            
            //console.log(Object.prototype.toString.call(data));

            data.forEach(function (element) {

                table.append($('<tr>')
                    .append($('<td>').text(element.study))
                    .append($('<td>').text(element.directory))
                    .append($('<input id="remove" type="button" size="30" value="Remove">').click(function () {
                        removeStudy(element.study, function () {
                            $(this).closest('tr').remove();
                        });
                    }))
                    );
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
        type: "Delete",
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
