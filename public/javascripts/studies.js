
function loadTable () {
  $('#list tbody > tr').remove()

  $.ajax({
    type: 'GET',
    dataType: 'json',
    processData: false,
    url: '/hyperstudy/api/studies',
    cache: false,
    success: function (data) {
      data.forEach(function (element) {
        addRow(element)
      })
    }
  })
}

function addRow (obj) {
  var table = $('#list').find('tbody')
  var tr = $('<tr>').attr('data-id', obj.study)
  tr.append($('<td>').append($('<a>', { text: obj.study, title: 'Open Study', href: '/studies/' + obj.study })))
  tr.append($('<td>').text(obj.directory))
  tr.append($('<td>').append('<input id="remove" type="button" size="20" value="Remove" class="remove">').on('click', function () {
    removeStudy(obj.study, function () {
      $('*[data-id="' + obj.study + '"]').remove()
    })
  }))
  table.append(tr)
}

function newStudy () {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: '/hyperstudy/api/studies',
    cache: false,
    success: function (data) {
      addRow(data)
    }
  })
}

function removeStudy (id, callback) {
  $.ajax({
    type: 'DELETE',
    dataType: 'json',
    url: '/hyperstudy/api/studies/' + id,
    cache: false,
    success: function (data) {
      callback()
    }
  })
}

$(document).ready(function () {
  $(document).ready(function () {
    $('#new').bind('click', function () {
      newStudy()
    })
  })
  loadTable()
})
