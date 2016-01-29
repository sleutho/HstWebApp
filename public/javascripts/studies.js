
$(document).ready(function () {

    var table = $("#list").find('tbody');

    //$("p").text("test");

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
                    );
            });
        }
    });
});

