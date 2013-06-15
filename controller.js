(function() {
  var barcode, onBarcodeChange, onHashChange, timeout;

  timeout = null;

  barcode = new Barcode('');

  barcode.onChange(function(value) {
    return $('#barcode').val(value);
  });

  barcode.onChange(function(value) {
    var canvas;
    if (!barcode.valid) {
      $('#main').removeClass('barcode-shown');
      $('#results').hide();
      if (barcode.empty) {
        return $('#error').hide();
      } else {
        return $('#error').show();
      }
    } else {
      $('#main').addClass('barcode-shown');
      $('#error').hide();
      canvas = document.getElementById('canvas');
      barcodeToCanvas(barcode, canvas);
      document.getElementById('image').src = canvas.toDataURL();
      $('#results').show();
      if (barcode.validChecksum()) {
        $('#checksum').text('valid').attr('class', 'valid');
      } else {
        $('#checksum').text('invalid').attr('class', 'invalid');
      }
      $('#canonical').text(barcode.canonical);
      return $('#country').text(barcode.country());
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
    return barcode.set($('#barcode').val());
  };

  onHashChange = function(hash) {
    var value;
    if (timeout != null) {
      clearTimeout(timeout);
    }
    value = hash ? hash.split('#')[1] : '';
    return barcode.set(value);
  };

  $(function() {
    var event, _i, _len, _ref;
    _ref = ['keyup', 'keydown', 'paste', 'cut', 'change', 'search'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      $('#barcode').bind(event, onBarcodeChange);
    }
    window.onhashchange = function() {
      return onHashChange(window.location.hash);
    };
    return onHashChange(window.location.hash);
  });

}).call(this);
