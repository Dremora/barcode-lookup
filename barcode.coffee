class Barcode
  constructor: (barcode) ->
    @callbacks = []
    @set(barcode)

  set: (@newValue) ->
    oldValue = @value
    @value = @newValue
    return if (@value == oldValue)
    @valid = /^[0-9]{10,13}$/.test(@value)
    @empty = @value == ''
    if @valid
      @canonical = @value
      while @canonical.length < 13 then @canonical = "0#{@canonical}"
    else
      @canonical = ''
    cb(@value) for cb in @callbacks

  onChange: (cb) ->
    @callbacks.push(cb)

  country: ->
    code = parseInt @canonical[0..2], 10
    if 0 <= code <= 19 then 'U.S. and Canada'
    else if 20 <= code <= 29 then 'Restricted distribution (MO defined)'
    else if 30 <= code <= 39 then 'U.S. drugs (see U.S. National Drug Code)'
    else if 40 <= code <= 49 then 'Restricted distribution (MO defined)'
    else if 50 <= code <= 59 then 'Coupons'
    else if 60 <= code <= 99 then 'U.S. and Canada'
    else if 100 <= code <= 139 then 'U.S. (reserved for later use)'
    else if 200 <= code <= 299 then 'Restricted distribution (MO defined)'
    else if 300 <= code <= 379 then 'France and Monaco'
    else if code == 380 then 'Bulgaria'
    else if code == 383 then 'Slovenia'
    else if code == 385 then 'Croatia'
    else if code == 387 then 'Bosnia and Herzegovina'
    else if code == 389 then 'Montenegro'
    else if 400 <= code <= 440 then 'Germany'
    else if 450 <= code <= 459 then 'Japan'
    else if 460 <= code <= 469 then 'Russia'
    else if code == 470 then 'Kyrgyzstan'
    else if code == 471 then 'Taiwan'
    else if code == 474 then 'Estonia'
    else if code == 475 then 'Latvia'
    else if code == 476 then 'Azerbaijan'
    else if code == 477 then 'Lithuania'
    else if code == 478 then 'Uzbekistan'
    else if code == 479 then 'Sri Lanka'
    else if code == 480 then 'Philippines'
    else if code == 481 then 'Belarus'
    else if code == 482 then 'Ukraine'
    else if code == 484 then 'Moldova'
    else if code == 485 then 'Armenia'
    else if code == 486 then 'Georgia'
    else if code == 487 then 'Kazakhstan'
    else if code == 488 then 'Tajikistan'
    else if code == 489 then 'Hong Kong SAR'
    else if 490 <= code <= 499 then 'Japan'
    else if 500 <= code <= 509 then 'United Kingdom'
    else if 520 <= code <= 521 then 'Greece'
    else if code == 528 then 'Lebanon'
    else if code == 529 then 'Cyprus'
    else if code == 530 then 'Albania'
    else if code == 531 then 'Macedonia'
    else if code == 535 then 'Malta'
    else if code == 539 then 'Ireland'
    else if 540 <= code <= 549 then 'Belgium and Luxembourg'
    else if code == 560 then 'Portugal'
    else if code == 569 then 'Iceland'
    else if 570 <= code <= 579 then 'Denmark, Faroe Islands and Greenland'
    else if code == 590 then 'Poland'
    else if code == 594 then 'Romania'
    else if code == 599 then 'Hungary'
    else if 600 <= code <= 601 then 'South Africa'
    else if code == 603 then 'Ghana'
    else if code == 604 then 'Senegal'
    else if code == 608 then 'Bahrain'
    else if code == 609 then 'Mauritius'
    else if code == 611 then 'Morocco'
    else if code == 613 then 'Algeria'
    else if code == 615 then 'Nigeria'
    else if code == 616 then 'Kenya'
    else if code == 618 then 'Côte d\'Ivoire'
    else if code == 619 then 'Tunisia'
    else if code == 621 then 'Syria'
    else if code == 622 then 'Egypt'
    else if code == 624 then 'Libya'
    else if code == 625 then 'Jordan'
    else if code == 626 then 'Iran'
    else if code == 627 then 'Kuwait'
    else if code == 628 then 'Saudi Arabia'
    else if code == 629 then 'United Arab Emirates'
    else if 640 <= code <= 649 then 'Finland'
    else if 690 <= code <= 695 then 'China, The People\'s Republic'
    else if 700 <= code <= 709 then 'Norway'
    else if code == 729 then 'Israel'
    else if 730 <= code <= 739 then 'Sweden : EAN/GS1 Sweden'
    else if code == 740 then 'Guatemala'
    else if code == 741 then 'El Salvador'
    else if code == 742 then 'Honduras'
    else if code == 743 then 'Nicaragua'
    else if code == 744 then 'Costa Rica'
    else if code == 745 then 'Panama'
    else if code == 746 then 'Dominican Republic'
    else if code == 750 then 'Mexico'
    else if 754 <= code <= 755 then 'Canada'
    else if code == 759 then 'Venezuela'
    else if 760 <= code <= 769 then 'Switzerland and Liechtenstein'
    else if 770 <= code <= 771 then 'Colombia'
    else if code == 773 then 'Uruguay'
    else if code == 775 then 'Peru'
    else if code == 777 then 'Bolivia'
    else if code == 779 then 'Argentina'
    else if code == 780 then 'Chile'
    else if code == 784 then 'Paraguay'
    else if code == 785 then 'Peru'
    else if code == 786 then 'Ecuador'
    else if 789 <= code <= 790 then 'Brazil'
    else if 800 <= code <= 839 then 'Italy, San Marino and Vatican City'
    else if 840 <= code <= 849 then 'Spain and Andorra'
    else if code == 850 then 'Cuba'
    else if code == 858 then 'Slovakia'
    else if code == 859 then 'Czech Republic'
    else if code == 860 then 'Serbia'
    else if code == 865 then 'Mongolia'
    else if code == 867 then 'North Korea'
    else if 868 <= code <= 869 then 'Turkey'
    else if 870 <= code <= 879 then 'Netherlands'
    else if code == 880 then 'South Korea'
    else if code == 884 then 'Cambodia'
    else if code == 885 then 'Thailand'
    else if code == 888 then 'Singapore'
    else if code == 890 then 'India'
    else if code == 893 then 'Vietnam'
    else if code == 896 then 'Pakistan'
    else if code == 899 then 'Indonesia'
    else if 900 <= code <= 919 then 'Austria'
    else if 930 <= code <= 939 then 'Australia'
    else if 940 <= code <= 949 then 'New Zealand'
    else if code == 950 then 'GS1 Global Office: Special applications'
    else if code == 951 then 'EPCglobal: Special applications'
    else if code == 955 then 'Malaysia'
    else if code == 958 then 'Macau'
    else if 960 <= code <= 969 then 'GS1 Global Office: GTIN-8 allocations'
    else if code == 977 then 'Serial publications (ISSN)'
    else if 978 <= code <= 979 then 'Bookland (ISBN) - 979-0 used for sheet music'
    else if code == 980 then 'Refund receipts'
    else if 981 <= code <= 983 then 'Common Currency Coupons'
    else if 990 <= code <= 999 then 'Coupons'
    else 'Unknown country'

  validChecksum: ->
    sum = 0
    sum += parseInt(@canonical[x]) * 3 for x in [1..12] by 2
    sum += parseInt(@canonical[x]) for x in [0..12] by 2
    sum % 10 == 0

  group1map: [
    '000000',
    '001011',
    '001101',
    '001110',
    '010011',
    '011001',
    '011100',
    '010101',
    '010110',
    '011010'
  ]

  codes: [
    [ '0001101', '0100111', '1110010' ],
    [ '0011001', '0110011', '1100110' ],
    [ '0010011', '0011011', '1101100' ],
    [ '0111101', '0100001', '1000010' ],
    [ '0100011', '0011101', '1011100' ],
    [ '0110001', '0111001', '1001110' ],
    [ '0101111', '0000101', '1010000' ],
    [ '0111011', '0010001', '1000100' ],
    [ '0110111', '0001001', '1001000' ],
    [ '0001011', '0010111', '1110100' ]
  ]

  toBinary: ->
    map = @group1map[@canonical[0]]
    group1 = (bits: @codes[digit][map[i]], digit: digit for digit, i in @canonical[1..6])
    group2 = (bits: @codes[digit][2], digit: digit for digit in @canonical[7..12])
    [bits: '101'].concat(group1).concat([bits: '01010']).concat(group2).concat([bits: '101'])

window.Barcode = Barcode
