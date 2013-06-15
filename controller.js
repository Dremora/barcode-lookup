(function() {
  var barcode, event, onBarcodeChange, onHashChange, timeout, _i, _len, _ref;

  timeout = null;

  barcode = new Barcode('');

  barcode.onChange(function(value) {
    return document.getElementById('barcode').value = value;
  });

  barcode.onChange(function(value) {
    var $checksum, canvas;
    if (!barcode.valid) {
      document.getElementById('main').classList.remove('barcode-shown');
      document.getElementById('results').style.display = 'none';
      if (barcode.empty) {
        return document.getElementById('error').style.display = 'none';
      } else {
        return document.getElementById('error').style.display = 'block';
      }
    } else {
      document.getElementById('main').classList.add('barcode-shown');
      document.getElementById('error').style.display = 'none';
      canvas = document.getElementById('canvas');
      barcodeToCanvas(barcode, canvas);
      document.getElementById('image').src = canvas.toDataURL();
      document.getElementById('results').style.display = 'block';
      $checksum = document.getElementById('checksum');
      if (barcode.validChecksum()) {
        $checksum.textContent = 'valid';
        $checksum.className = 'valid';
      } else {
        $checksum.textContent = 'invalid';
        $checksum.className = 'invalid';
      }
      document.getElementById('canonical').textContent = barcode.canonical;
      return document.getElementById('country').textContent = barcode.country();
    }
  });

  barcode.onChange(function(value) {
    var newValue;
    if (timeout != null) {
      clearTimeout(timeout);
    }
    newValue = value;
    if (barcode.valid || barcode.empty) {
      return timeout = setTimeout(function() {
        return window.location.hash = value;
      }, 300);
    }
  });

  onBarcodeChange = function() {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    return barcode.set(document.getElementById('barcode').value);
  };

  onHashChange = function(hash) {
    var value;
    if (timeout != null) {
      clearTimeout(timeout);
    }
    value = hash ? hash.split('#')[1] : '';
    return barcode.set(value);
  };

  _ref = ['keyup', 'keydown', 'paste', 'cut', 'change', 'search'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    document.getElementById('barcode').addEventListener(event, onBarcodeChange);
  }

  window.onhashchange = function() {
    return onHashChange(window.location.hash);
  };

  onHashChange(window.location.hash);

}).call(this);
