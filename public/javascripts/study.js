
function loadTable () {
  $('#list tbody > tr').remove()

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/hyperstudy/api/studies/' + study,
    cache: false,
    success: function (data) {
      var table = $('#list').find('tbody')
      table.append($('<tr>')
        .append($('<td>').attr('data-attr', 'Label').text(data.Label).dblclick(editCell))
        .append($('<td>').attr('data-attr', 'Varname').text(data.Varname))
        .append($('<td>').attr('data-attr', 'Comment').text(data.Comment).dblclick(editCell)))
    }
  })
}

$(document).ready(function () {
  loadTable()
})

function editCell () {
  var OriginalContent = $(this).text()
  var attr = $(this).attr('data-attr')

  $(this).addClass('cellEditing')
  $(this).html('<input type="text" value="' + OriginalContent + '"/>')
  $(this).children().first().focus()

  $(this).children().first().keypress(function (e) {
    if (e.which === 13) {
      var newContent = $(this).val()
      var parent = $(this).parent()

      $.ajax({
        type: 'PUT',
        url: '/hyperstudy/api/studies/' + study,
        data: { attr: attr, value: newContent },
        cache: false,
        success: function (data) {
          parent.text(newContent)
          parent.removeClass('cellEditing')
        },
        error: function (req, status, err) {
          console.log(status)
          console.log(err)
          parent.text(OriginalContent)
          parent.removeClass('cellEditing')
        }
      })
    }
  })

  $(this).children().first().blur(function () {
    $(this).parent().text(OriginalContent)
    $(this).parent().removeClass('cellEditing')
  })
}
