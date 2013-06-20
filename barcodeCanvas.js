(function() {
  this.barcodeToCanvas = function(barcode, canvas, options) {
    var bit, black, block, count, ctx, font, fontSize, h, isSeparator, lineHeight, lineWidth, separatorHeight, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    count = 12 * 7 + 11;
    lineWidth = (_ref = options != null ? options.lineWidth : void 0) != null ? _ref : 3;
    lineHeight = (_ref1 = options != null ? options.lineHeight : void 0) != null ? _ref1 : lineWidth * 70;
    fontSize = lineWidth * 10;
    font = (_ref2 = options != null ? options.font : void 0) != null ? _ref2 : 'monospace';
    black = (_ref3 = options != null ? options.black : void 0) != null ? _ref3 : 'black';
    separatorHeight = lineHeight + fontSize / 2;
    ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';
    ctx.font = fontSize + 'px ' + font;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'right';
    ctx.fillStyle = black;
    ctx.fillText(barcode.canonical[0], fontSize, lineHeight + fontSize);
    ctx.textAlign = 'start';
    ctx.translate(fontSize + lineWidth * 3, 0);
    _ref4 = barcode.toBinary();
    for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
      block = _ref4[_i];
      isSeparator = block.digit ? false : true;
      h = isSeparator ? separatorHeight : lineHeight;
      if (!isSeparator) {
        ctx.fillStyle = black;
        ctx.fillText(block.digit, 0, lineHeight + fontSize);
      }
      _ref5 = block.bits;
      for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
        bit = _ref5[_j];
        ctx.fillStyle = bit === '1' ? black : 'rgba(255, 255, 255, 0)';
        ctx.fillRect(0, 0, lineWidth, h);
        ctx.translate(lineWidth, 0);
      }
    }
    ctx.fillStyle = black;
    return ctx.fillText('>', 2 * lineWidth, lineHeight + fontSize);
  };

}).call(this);
