(function() {
  var barcode, onBarcodeChange, onHashChange, timeout;

  timeout = null;

  barcode = new Barcode('');

  barcode.onChange(function(value) {
    if (document.getElementById('barcode').value !== value) {
      return document.getElementById('barcode').value = value;
    }
  });

  barcode.onChange(function(value) {
    var $checksum, canvas, options;
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
      options = {};
      if (!barcode.isChecksumValid()) {
        options.black = 'rgb(180, 102, 96)';
      }
      barcodeToCanvas(barcode, canvas, options);
      document.getElementById('image').src = canvas.toDataURL();
      document.getElementById('results').style.display = 'block';
      $checksum = document.getElementById('checksum');
      if (barcode.isChecksumValid()) {
        $checksum.style.display = 'none';
      } else {
        $checksum.textContent = 'fix checksum';
        $checksum.href = '#' + barcode.withValidChecksum();
        $checksum.style.display = '';
      }
      document.getElementById('country').textContent = barcode.country();
      if (value === barcode.canonical) {
        return document.getElementById('show-ean-link').style.display = 'none';
      } else {
        document.getElementById('show-ean-link').textContent = 'show EAN';
        document.getElementById('show-ean-link').href = '#' + barcode.canonical;
        return document.getElementById('show-ean-link').style.display = '';
      }
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

  document.getElementById('barcode').addEventListener('input', onBarcodeChange);

  window.onhashchange = function() {
    return onHashChange(window.location.hash);
  };

  onHashChange(window.location.hash);

  document.body.classList.remove('preload');

}).call(this);
