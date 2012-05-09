(function() {
  var Barcode, barcodeChange, barcodeUpdate, current_barcode, onBarcodeChange, state_pushed, timeout, url;
  Barcode = (function() {
    function Barcode(barcode) {
      this.barcode = barcode;
      if (!this.barcode.match(/^[0-9]{10,13}$/)) {
        this.invalid = true;
      }
      this.empty = this.barcode === '';
      while (this.barcode.length < 13) {
        this.barcode = "0" + this.barcode;
      }
      if (this.invalid) {
        this.barcode = '';
      }
    }
    Barcode.prototype.canonical = function() {
      return this.barcode;
    };
    Barcode.prototype.country = function() {
      var code;
      code = parseInt(this.barcode.slice(0, 3), 10);
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
      var sum, x;
      sum = 0;
      for (x = 1; x <= 12; x += 2) {
        sum += parseInt(this.barcode[x]) * 3;
      }
      for (x = 0; x <= 12; x += 2) {
        sum += parseInt(this.barcode[x]);
      }
      return sum % 10 === 0;
    };
    return Barcode;
  })();
  timeout = null;
  current_barcode = '';
  url = "http://dremora.com/barcode_toolz/";
  state_pushed = false;
  barcodeUpdate = function(params) {
    var barcode, image_url;
    barcode = new Barcode($('#barcode').val());
    if (barcode.invalid != null) {
      $('#results').hide();
      if (barcode.empty) {
        $('#error').hide();
      }
    } else {
      $('#error').hide();
      image_url = "http://www.jacoballred.com/barcode/barcode.php?1&encoding=EAN-13&code=" + (barcode.canonical()) + "&multiplier=2";
      if (image_url !== $('#image').attr('src')) {
        $('#image').hide();
        $('#image').attr('src', image_url);
      }
      $('#results').show();
      if (barcode.validChecksum()) {
        $('#checksum').text('valid').attr('class', 'valid');
      } else {
        $('#checksum').text('invalid').attr('class', 'invalid');
      }
      $('#canonical').text(barcode.canonical());
      $('#country').text(barcode.country());
    }
    if (state_pushed || ((params != null ? params.fromHistory : void 0) != null)) {
      history.replaceState(barcode.canonical(), null, url + barcode.canonical());
    } else if (current_barcode !== barcode.canonical()) {
      history.pushState(barcode.canonical(), null, url + barcode.canonical());
      state_pushed = true;
    }
    if (current_barcode !== barcode.canonical()) {
      return timeout = setTimeout(function() {
        if ((barcode.invalid != null) && !barcode.empty) {
          $('#error').show();
        }
        current_barcode = barcode.canonical();
        return state_pushed = false;
      }, 1000);
    }
  };
  onBarcodeChange = function() {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    return timeout = setTimeout(barcodeUpdate, 100);
  };
  barcodeChange = function(barcode) {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    current_barcode = barcode;
    $('#barcode').val(barcode);
    return barcodeUpdate({
      fromHistory: true
    });
  };
  $(function() {
    var barcode, event, _i, _len, _ref;
    $('#image').load(function() {
      return $(this).show();
    });
    _ref = ['keyup', 'keydown', 'paste', 'cut', 'change', 'search'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      $('#barcode').bind(event, onBarcodeChange);
    }
    window.onpopstate = function(event) {
      if (event.state != null) {
        return barcodeChange(event.state);
      }
    };
    if (history.state != null) {
      return barcodeChange(history.state);
    } else {
      barcode = window.location.href.replace(url, '');
      if (barcode.length > 0) {
        barcode = new Barcode(barcode);
        history.replaceState(barcode.canonical(), null, window.location.href);
        return barcodeChange(barcode.canonical());
      }
    }
  });
}).call(this);
