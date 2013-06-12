@barcodeToCanvas = (barcode, canvas) ->
  count = 12 * 7 + 11
  lineWidth = options?.lineWidth ? 3
  lineHeight = options?.lineHeight ? lineWidth * 70
  fontSize = lineWidth * 10
  font = options?.font ? 'monospace'
  separatorHeight = lineHeight + fontSize / 2
  ctx = canvas.getContext('2d')
  ctx.textBaseline = 'bottom'
  ctx.font = fontSize + 'px ' + font

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.textAlign = 'right'
  ctx.fillText(barcode.barcode[0], fontSize, lineHeight + fontSize)
  ctx.textAlign = 'start'
  ctx.translate(fontSize + lineWidth * 3, 0)

  for block in barcode.toBinary()
    isSeparator = if (block.digit) then false else true
    h = if (isSeparator) then separatorHeight else lineHeight
    if !isSeparator
      ctx.fillStyle = 'black'
      ctx.fillText(block.digit, 0, lineHeight + fontSize);
    for bit in block.bits
      ctx.fillStyle = if (bit == '1') then 'black' else 'rgba(255, 255, 255, 0)'
      ctx.fillRect(0, 0, lineWidth, h)
      ctx.translate(lineWidth, 0)

  ctx.fillStyle = 'black';
  ctx.fillText('>', 2 * lineWidth, lineHeight + fontSize);
