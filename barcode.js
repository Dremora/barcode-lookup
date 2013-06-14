(function() {
  var Barcode, barcode, onBarcodeChange, onHashChange, timeout;

  Barcode = (function() {
    function Barcode(barcode) {
      this.callbacks = [];
      this.set(barcode);
    }

    Barcode.prototype.set = function(newValue) {
      var cb, oldValue, _i, _len, _ref, _results;
      this.newValue = newValue;
      oldValue = this.value;
      this.value = this.newValue;
      if (this.value === oldValue) {
        return;
      }
      this.valid = /^[0-9]{10,13}$/.test(this.value);
      this.empty = this.value === '';
      if (this.valid) {
        this.canonical = this.value;
        while (this.canonical.length < 13) {
          this.canonical = "0" + this.canonical;
        }
      } else {
        this.canonical = '';
      }
      _ref = this.callbacks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb(this.value));
      }
      return _results;
    };

    Barcode.prototype.onChange = function(cb) {
      return this.callbacks.push(cb);
    };

    Barcode.prototype.country = function() {
      var code;
      code = parseInt(this.canonical.slice(0, 3), 10);
      if ((0 <= code && code <= 19)) {
        return 'U.S. and Canada';
      } else if ((20 <= code && code <= 29)) {
        return 'Restricted distribution (MO defined)';
      } else if ((30 <= code && code <= 39)) {
        return 'U.S. drugs (see U.S. National Drug Code)';
      } else if ((40 <= code && code <= 49)) {
        return 'Restricted distribution (MO defined)';
      } else if ((50 <= code && code <= 59)) {
        return 'Coupons';
      } else if ((60 <= code && code <= 99)) {
        return 'U.S. and Canada';
      } else if ((100 <= code && code <= 139)) {
        return 'U.S. (reserved for later use)';
      } else if ((200 <= code && code <= 299)) {
        return 'Restricted distribution (MO defined)';
      } else if ((300 <= code && code <= 379)) {
        return 'France and Monaco';
      } else if (code === 380) {
        return 'Bulgaria';
      } else if (code === 383) {
        return 'Slovenia';
      } else if (code === 385) {
        return 'Croatia';
      } else if (code === 387) {
        return 'Bosnia and Herzegovina';
      } else if (code === 389) {
        return 'Montenegro';
      } else if ((400 <= code && code <= 440)) {
        return 'Germany';
      } else if ((450 <= code && code <= 459)) {
        return 'Japan';
      } else if ((460 <= code && code <= 469)) {
        return 'Russia';
      } else if (code === 470) {
        return 'Kyrgyzstan';
      } else if (code === 471) {
        return 'Taiwan';
      } else if (code === 474) {
        return 'Estonia';
      } else if (code === 475) {
        return 'Latvia';
      } else if (code === 476) {
        return 'Azerbaijan';
      } else if (code === 477) {
        return 'Lithuania';
      } else if (code === 478) {
        return 'Uzbekistan';
      } else if (code === 479) {
        return 'Sri Lanka';
      } else if (code === 480) {
        return 'Philippines';
      } else if (code === 481) {
        return 'Belarus';
      } else if (code === 482) {
        return 'Ukraine';
      } else if (code === 484) {
        return 'Moldova';
      } else if (code === 485) {
        return 'Armenia';
      } else if (code === 486) {
        return 'Georgia';
      } else if (code === 487) {
        return 'Kazakhstan';
      } else if (code === 488) {
        return 'Tajikistan';
      } else if (code === 489) {
        return 'Hong Kong SAR';
      } else if ((490 <= code && code <= 499)) {
        return 'Japan';
      } else if ((500 <= code && code <= 509)) {
        return 'United Kingdom';
      } else if ((520 <= code && code <= 521)) {
        return 'Greece';
      } else if (code === 528) {
        return 'Lebanon';
      } else if (code === 529) {
        return 'Cyprus';
      } else if (code === 530) {
        return 'Albania';
      } else if (code === 531) {
        return 'Macedonia';
      } else if (code === 535) {
        return 'Malta';
      } else if (code === 539) {
        return 'Ireland';
      } else if ((540 <= code && code <= 549)) {
        return 'Belgium and Luxembourg';
      } else if (code === 560) {
        return 'Portugal';
      } else if (code === 569) {
        return 'Iceland';
      } else if ((570 <= code && code <= 579)) {
        return 'Denmark, Faroe Islands and Greenland';
      } else if (code === 590) {
        return 'Poland';
      } else if (code === 594) {
        return 'Romania';
      } else if (code === 599) {
        return 'Hungary';
      } else if ((600 <= code && code <= 601)) {
        return 'South Africa';
      } else if (code === 603) {
        return 'Ghana';
      } else if (code === 604) {
        return 'Senegal';
      } else if (code === 608) {
        return 'Bahrain';
      } else if (code === 609) {
        return 'Mauritius';
      } else if (code === 611) {
        return 'Morocco';
      } else if (code === 613) {
        return 'Algeria';
      } else if (code === 615) {
        return 'Nigeria';
      } else if (code === 616) {
        return 'Kenya';
      } else if (code === 618) {
        return 'Côte d\'Ivoire';
      } else if (code === 619) {
        return 'Tunisia';
      } else if (code === 621) {
        return 'Syria';
      } else if (code === 622) {
        return 'Egypt';
      } else if (code === 624) {
        return 'Libya';
      } else if (code === 625) {
        return 'Jordan';
      } else if (code === 626) {
        return 'Iran';
      } else if (code === 627) {
        return 'Kuwait';
      } else if (code === 628) {
        return 'Saudi Arabia';
      } else if (code === 629) {
        return 'United Arab Emirates';
      } else if ((640 <= code && code <= 649)) {
        return 'Finland';
      } else if ((690 <= code && code <= 695)) {
        return 'China, The People\'s Republic';
      } else if ((700 <= code && code <= 709)) {
        return 'Norway';
      } else if (code === 729) {
        return 'Israel';
      } else if ((730 <= code && code <= 739)) {
        return 'Sweden : EAN/GS1 Sweden';
      } else if (code === 740) {
        return 'Guatemala';
      } else if (code === 741) {
        return 'El Salvador';
      } else if (code === 742) {
        return 'Honduras';
      } else if (code === 743) {
        return 'Nicaragua';
      } else if (code === 744) {
        return 'Costa Rica';
      } else if (code === 745) {
        return 'Panama';
      } else if (code === 746) {
        return 'Dominican Republic';
      } else if (code === 750) {
        return 'Mexico';
      } else if ((754 <= code && code <= 755)) {
        return 'Canada';
      } else if (code === 759) {
        return 'Venezuela';
      } else if ((760 <= code && code <= 769)) {
        return 'Switzerland and Liechtenstein';
      } else if ((770 <= code && code <= 771)) {
        return 'Colombia';
      } else if (code === 773) {
        return 'Uruguay';
      } else if (code === 775) {
        return 'Peru';
      } else if (code === 777) {
        return 'Bolivia';
      } else if (code === 779) {
        return 'Argentina';
      } else if (code === 780) {
        return 'Chile';
      } else if (code === 784) {
        return 'Paraguay';
      } else if (code === 785) {
        return 'Peru';
      } else if (code === 786) {
        return 'Ecuador';
      } else if ((789 <= code && code <= 790)) {
        return 'Brazil';
      } else if ((800 <= code && code <= 839)) {
        return 'Italy, San Marino and Vatican City';
      } else if ((840 <= code && code <= 849)) {
        return 'Spain and Andorra';
      } else if (code === 850) {
        return 'Cuba';
      } else if (code === 858) {
        return 'Slovakia';
      } else if (code === 859) {
        return 'Czech Republic';
      } else if (code === 860) {
        return 'Serbia';
      } else if (code === 865) {
        return 'Mongolia';
      } else if (code === 867) {
        return 'North Korea';
      } else if ((868 <= code && code <= 869)) {
        return 'Turkey';
      } else if ((870 <= code && code <= 879)) {
        return 'Netherlands';
      } else if (code === 880) {
        return 'South Korea';
      } else if (code === 884) {
        return 'Cambodia';
      } else if (code === 885) {
        return 'Thailand';
      } else if (code === 888) {
        return 'Singapore';
      } else if (code === 890) {
        return 'India';
      } else if (code === 893) {
        return 'Vietnam';
      } else if (code === 896) {
        return 'Pakistan';
      } else if (code === 899) {
        return 'Indonesia';
      } else if ((900 <= code && code <= 919)) {
        return 'Austria';
      } else if ((930 <= code && code <= 939)) {
        return 'Australia';
      } else if ((940 <= code && code <= 949)) {
        return 'New Zealand';
      } else if (code === 950) {
        return 'GS1 Global Office: Special applications';
      } else if (code === 951) {
        return 'EPCglobal: Special applications';
      } else if (code === 955) {
        return 'Malaysia';
      } else if (code === 958) {
        return 'Macau';
      } else if ((960 <= code && code <= 969)) {
        return 'GS1 Global Office: GTIN-8 allocations';
      } else if (code === 977) {
        return 'Serial publications (ISSN)';
      } else if ((978 <= code && code <= 979)) {
        return 'Bookland (ISBN) - 979-0 used for sheet music';
      } else if (code === 980) {
        return 'Refund receipts';
      } else if ((981 <= code && code <= 983)) {
        return 'Common Currency Coupons';
      } else if ((990 <= code && code <= 999)) {
        return 'Coupons';
      } else {
        return 'Unknown country';
      }
    };

    Barcode.prototype.validChecksum = function() {
      var sum, x, _i, _j;
      sum = 0;
      for (x = _i = 1; _i <= 12; x = _i += 2) {
        sum += parseInt(this.canonical[x]) * 3;
      }
      for (x = _j = 0; _j <= 12; x = _j += 2) {
        sum += parseInt(this.canonical[x]);
      }
      return sum % 10 === 0;
    };

    Barcode.prototype.group1map = ['000000', '001011', '001101', '001110', '010011', '011001', '011100', '010101', '010110', '011010'];

    Barcode.prototype.codes = [['0001101', '0100111', '1110010'], ['0011001', '0110011', '1100110'], ['0010011', '0011011', '1101100'], ['0111101', '0100001', '1000010'], ['0100011', '0011101', '1011100'], ['0110001', '0111001', '1001110'], ['0101111', '0000101', '1010000'], ['0111011', '0010001', '1000100'], ['0110111', '0001001', '1001000'], ['0001011', '0010111', '1110100']];

    Barcode.prototype.toBinary = function() {
      var digit, group1, group2, i, map;
      map = this.group1map[this.canonical[0]];
      group1 = (function() {
        var _i, _len, _ref, _results;
        _ref = this.canonical.slice(1, 7);
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          digit = _ref[i];
          _results.push({
            bits: this.codes[digit][map[i]],
            digit: digit
          });
        }
        return _results;
      }).call(this);
      group2 = (function() {
        var _i, _len, _ref, _results;
        _ref = this.canonical.slice(7, 13);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          digit = _ref[_i];
          _results.push({
            bits: this.codes[digit][2],
            digit: digit
          });
        }
        return _results;
      }).call(this);
      return [
        {
          bits: '101'
        }
      ].concat(group1).concat([
        {
          bits: '01010'
        }
      ]).concat(group2).concat([
        {
          bits: '101'
        }
      ]);
    };

    return Barcode;

  })();

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
