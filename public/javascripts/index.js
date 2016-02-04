
function newUser() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/login/" + $('#username').attr('value'),
        cache: false,
        success: function (data) {
            
        }
    });
}

$(document).ready(function () {
    $(document).ready(function () {
        $('#login').bind('click', function () {
            newUser();
        });
    });
});
