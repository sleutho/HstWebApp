
function loadTables () {
  clearTables()

  $.ajax({
    type: 'GET',
    dataType: 'json',
    processData: false,
    url: '/hyperstudy/api/studies/' + study + '/specification',
    cache: false,
    success: function (data) {
      fillTables(data)
    }
  })
}

function clearTables () {
  $('#perturb tbody > tr').remove()
  $('#props tbody > tr').remove()
}

function fillTables (data) {
  Object.keys(data.perturbation.properties).forEach(function (key) {
    addProperty(key, data.perturbation.properties[key])
  })

  data.available.forEach(function (element) {
    addPerturb(element, data.perturbation.Label)
  })
}

function addPerturb (item, activeLabel) {
  var table = $('#perturb').find('tbody')
  var tr = $('<tr>')
  var activeTd = $('<td>').text(item.label === activeLabel ? 1 : 0)
  if (item.label !== activeLabel) {
    activeTd.attr('data-label', item.label).dblclick(editActivePerturb)
  }
  tr.append(activeTd)
  tr.append($('<td>').text(item.label))
  tr.append($('<td>').text(item.klass))
  tr.append($('<td>').text(item.state))
  tr.append($('<td>').text(item.comment))
  table.append(tr)
}

function editActivePerturb () {
  var OriginalContent = $(this).text()
  var label = $(this).attr('data-label')

  $(this).addClass('cellEditing')
  $(this).html('<input type="text" value="' + OriginalContent + '"/>')
  $(this).children().first().focus()

  $(this).children().first().keypress(function (e) {
    if (e.which === 13) {
      var newContent = $(this).val()
      var parent = $(this).parent()

      if (newContent === '1') {
        $.ajax({
          type: 'POST',
          url: '/hyperstudy/api/studies/' + study + '/specification',
          data: { label: label },
          dataType: 'json',
          cache: false,
          success: function (data) {
            clearTables()
            fillTables(data)
          },
          error: function (req, status, err) {
            console.log(status)
            console.log(err)
            parent.text(OriginalContent)
            parent.removeClass('cellEditing')
          }
        })
      }
    }
  })

  $(this).children().first().blur(function () {
    $(this).parent().text(OriginalContent)
    $(this).parent().removeClass('cellEditing')
  })
}

function addProperty (key, value) {
  var table = $('#props').find('tbody')
  var tr = $('<tr>')
  tr.append($('<td>').text(key))
  tr.append($('<td>').text(value).attr('data-key', key).dblclick(editProperty))
  table.append(tr)
}

function editProperty () {
  var OriginalContent = $(this).text()
  var key = $(this).attr('data-key')

  $(this).addClass('cellEditing')
  $(this).html('<input type="text" value="' + OriginalContent + '"/>')
  $(this).children().first().focus()

  $(this).children().first().keypress(function (e) {
    if (e.which === 13) {
      var newContent = $(this).val()
      var parent = $(this).parent()

      $.ajax({
        type: 'PUT',
        url: '/hyperstudy/api/studies/' + study + '/specification',
        data: { prop: key, value: newContent },
        dataType: 'json',
        cache: false,
        success: function (data) {
          clearTables()
          fillTables(data)
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

$(document).ready(function () {
  loadTables()
})
