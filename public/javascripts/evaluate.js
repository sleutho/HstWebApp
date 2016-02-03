
function evaluateStudy() {
    $('#status').text("Working on it");
    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "/hyperstudy/api/studies/" + study + "/evaluate",
        cache: false,
        success: function (data) {
            $('#status').text(data.state);
        },
        error: function (req, status, err) {
                    $('#status').text(err);}
    });
}

$(document).ready(function () {
    $(document).ready(function () {
        $('#eval').bind('click', function () {
            evaluateStudy();
        });
    });
    
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/hyperstudy/api/studies/" + study + "/evaluate",
        cache: false,
        success: function (data) {
            $('#status').text(data.state);
        }
    });
});
