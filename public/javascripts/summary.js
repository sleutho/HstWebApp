
$(document).ready(function () {
    var table = $("#list").find('tbody');
    var tr = $('<tr>').attr('data-id', obj.study);
    tr.append($('<td>').append($('<a>', { text: obj.study, title: 'Open Study', href: "/studies/" + obj.study })));
    tr.append($('<td>').text(obj.directory));
    tr.append($('<input id="remove" type="button" size="20" value="Remove">').on('click', function () {
        removeStudy(obj.study, function () {
            $('*[data-id="' + obj.study + '"]').remove();
        });
    }))
    table.append(tr);
    
    $.ajax({
        type: "GET",
        dataType: "json",
        processData: false,
        url: "/hyperstudy/api/studies" + study + "/post",
        cache: false,
        success: function (data) {
            data.forEach(function (element) {
                addRow(element);
            });
        }
    });
});
