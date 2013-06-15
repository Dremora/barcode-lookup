timeout = null
barcode = new Barcode('')

barcode.onChange (value) -> $('#barcode').val(value)

barcode.onChange (value) ->
 if !barcode.valid
    $('#main').removeClass('barcode-shown')
    $('#results').hide()
    if barcode.empty
      $('#error').hide()
    else
      $('#error').show()
  else
    $('#main').addClass('barcode-shown')
    $('#error').hide()
    canvas = document.getElementById('canvas')
    barcodeToCanvas(barcode, canvas)
    document.getElementById('image').src = canvas.toDataURL()
    $('#results').show()
    if barcode.validChecksum()
      $('#checksum').text('valid').attr('class', 'valid')
    else
      $('#checksum').text('invalid').attr('class', 'invalid')
    $('#canonical').text barcode.canonical
    $('#country').text barcode.country()

barcode.onChange (value) ->
  clearTimeout timeout if timeout?
  newValue = value
  if barcode.valid || barcode.empty
    timeout = setTimeout ->
      window.location.hash = value
    , 300

onBarcodeChange = ->
  clearTimeout timeout if timeout?
  barcode.set($('#barcode').val())

onHashChange = (hash) ->
  clearTimeout timeout if timeout?
  value = if hash then hash.split('#')[1] else ''
  barcode.set(value)

$ ->
  $('#barcode').bind event, onBarcodeChange for event in [
    'keyup', 'keydown', 'paste', 'cut', 'change', 'search'
  ]
  window.onhashchange = -> onHashChange(window.location.hash)
  onHashChange(window.location.hash)
