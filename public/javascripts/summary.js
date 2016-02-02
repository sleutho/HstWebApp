
$(document).ready(function () {
    var tbody = $("#list").find('tbody');
    var thead = $("#list").find('thead');

    $.ajax({
        type: "GET",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies/" + study + "/post",
        cache: false,
        success: function (data) {
            var items = Object.keys(data);
            
            var headTr = $('<tr>');
            thead.append(headTr);
            
            items.forEach(function (key) {
                headTr.append($('<td>').text(key));
            });

            var rows = [];
            var i = 0;
            for (var key in items) {
                var item = items[key];
                var column = data[item];

                for (var j = 0; j < column.length; j++) {
                    var element = column[j];

                    if (i) {
                        rows[j].push(element);
                    } else {
                        rows.push([element]);
                    }
                }
                i++;
            }

            rows.forEach(function (row) {
                var bodyTr = $('<tr>');
                tbody.append(bodyTr);
                row.forEach(function (element) {
                    bodyTr.append($('<td>').text(element));
                });
            });
        }
    });
});
