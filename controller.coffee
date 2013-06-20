timeout = null
barcode = new Barcode('')

barcode.onChange (value) ->
  if document.getElementById('barcode').value != value
    document.getElementById('barcode').value = value

barcode.onChange (value) ->
 if !barcode.valid
    document.getElementById('main').classList.remove('barcode-shown')
    document.getElementById('results').style.display = 'none'
    if barcode.empty
      document.getElementById('error').style.display = 'none'
    else
      document.getElementById('error').style.display = 'block'
  else
    document.getElementById('main').classList.add('barcode-shown')
    document.getElementById('error').style.display = 'none'
    canvas = document.getElementById('canvas')
    barcodeToCanvas(barcode, canvas)
    document.getElementById('image').src = canvas.toDataURL()
    document.getElementById('results').style.display = 'block'

    $checksum = document.getElementById('checksum')
    if barcode.isChecksumValid()
      $checksum.style.display = 'none'
    else
      $checksum.textContent = 'fix checksum'
      $checksum.href = '#' + barcode.withValidChecksum()
      $checksum.style.display = ''

    document.getElementById('country').textContent = barcode.country()

    if value == barcode.canonical
      document.getElementById('show-ean-link').style.display = 'none'
    else
      document.getElementById('show-ean-link').textContent = 'show EAN'
      document.getElementById('show-ean-link').href = '#' + barcode.canonical
      document.getElementById('show-ean-link').style.display = ''

barcode.onChange (value) ->
  clearTimeout timeout if timeout?
  newValue = value
  if barcode.valid || barcode.empty
    timeout = setTimeout ->
      window.location.hash = value
    , 300

onBarcodeChange = ->
  clearTimeout timeout if timeout?
  barcode.set(document.getElementById('barcode').value)

onHashChange = (hash) ->
  clearTimeout timeout if timeout?
  value = if hash then hash.split('#')[1] else ''
  barcode.set(value)

document.getElementById('barcode').addEventListener('input', onBarcodeChange)
window.onhashchange = -> onHashChange(window.location.hash)
onHashChange(window.location.hash)
