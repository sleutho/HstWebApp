
$(document).ready(function () {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    processData: false,
    url: '/hyperstudy/api/studies/' + study + '/post',
    cache: false,
    success: function (data) {
      var items = Object.keys(data)

      var curves = []
      for (var key in items) {
        var item = items[key]
        var column = data[item]

        var curve = []
        for (var index = 0; index < column.length; index++) {
          var element = column[index]
          curve.push([index + 1, element])
        }
        curves.push({ label: item, data: curve })
      }

      $.plot('#graph', curves, {
        series: {
          lines: { show: true },
          points: { show: true }
        }
      })
    }
  })
})
