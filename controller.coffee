timeout = null
barcode = new Barcode('')

barcode.onChange (value) -> document.getElementById('barcode').value = value

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
    if barcode.validChecksum()
      $checksum.textContent = 'valid'
      $checksum.className = 'valid'
    else
      $checksum.textContent = 'invalid'
      $checksum.className = 'invalid'
    document.getElementById('canonical').textContent = barcode.canonical
    document.getElementById('country').textContent = barcode.country()

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

document.getElementById('barcode').addEventListener(event, onBarcodeChange) for event in [
  'keyup', 'keydown', 'paste', 'cut', 'change', 'search'
]
window.onhashchange = -> onHashChange(window.location.hash)
onHashChange(window.location.hash)
