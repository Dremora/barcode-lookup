// Generated by CoffeeScript 1.3.3
(function(){var a,b,c,d,e,f,g,h;a=function(){function a(a){this.barcode=a,this.barcode.match(/^[0-9]{10,13}$/)||(this.invalid=!0),this.empty=this.barcode==="";while(this.barcode.length<13)this.barcode="0"+this.barcode;this.invalid&&(this.barcode="")}return a.prototype.canonical=function(){return this.barcode},a.prototype.country=function(){var a;return a=parseInt(this.barcode.slice(0,3),10),0<=a&&a<=19?"U.S. and Canada":20<=a&&a<=29?"Restricted distribution (MO defined)":30<=a&&a<=39?"U.S. drugs (see U.S. National Drug Code)":40<=a&&a<=49?"Restricted distribution (MO defined)":50<=a&&a<=59?"Coupons":60<=a&&a<=99?"U.S. and Canada":100<=a&&a<=139?"U.S. (reserved for later use)":200<=a&&a<=299?"Restricted distribution (MO defined)":300<=a&&a<=379?"France and Monaco":a===380?"Bulgaria":a===383?"Slovenia":a===385?"Croatia":a===387?"Bosnia and Herzegovina":a===389?"Montenegro":400<=a&&a<=440?"Germany":450<=a&&a<=459?"Japan":460<=a&&a<=469?"Russia":a===470?"Kyrgyzstan":a===471?"Taiwan":a===474?"Estonia":a===475?"Latvia":a===476?"Azerbaijan":a===477?"Lithuania":a===478?"Uzbekistan":a===479?"Sri Lanka":a===480?"Philippines":a===481?"Belarus":a===482?"Ukraine":a===484?"Moldova":a===485?"Armenia":a===486?"Georgia":a===487?"Kazakhstan":a===488?"Tajikistan":a===489?"Hong Kong SAR":490<=a&&a<=499?"Japan":500<=a&&a<=509?"United Kingdom":520<=a&&a<=521?"Greece":a===528?"Lebanon":a===529?"Cyprus":a===530?"Albania":a===531?"Macedonia":a===535?"Malta":a===539?"Ireland":540<=a&&a<=549?"Belgium and Luxembourg":a===560?"Portugal":a===569?"Iceland":570<=a&&a<=579?"Denmark, Faroe Islands and Greenland":a===590?"Poland":a===594?"Romania":a===599?"Hungary":600<=a&&a<=601?"South Africa":a===603?"Ghana":a===604?"Senegal":a===608?"Bahrain":a===609?"Mauritius":a===611?"Morocco":a===613?"Algeria":a===615?"Nigeria":a===616?"Kenya":a===618?"Côte d'Ivoire":a===619?"Tunisia":a===621?"Syria":a===622?"Egypt":a===624?"Libya":a===625?"Jordan":a===626?"Iran":a===627?"Kuwait":a===628?"Saudi Arabia":a===629?"United Arab Emirates":640<=a&&a<=649?"Finland":690<=a&&a<=695?"China, The People's Republic":700<=a&&a<=709?"Norway":a===729?"Israel":730<=a&&a<=739?"Sweden : EAN/GS1 Sweden":a===740?"Guatemala":a===741?"El Salvador":a===742?"Honduras":a===743?"Nicaragua":a===744?"Costa Rica":a===745?"Panama":a===746?"Dominican Republic":a===750?"Mexico":754<=a&&a<=755?"Canada":a===759?"Venezuela":760<=a&&a<=769?"Switzerland and Liechtenstein":770<=a&&a<=771?"Colombia":a===773?"Uruguay":a===775?"Peru":a===777?"Bolivia":a===779?"Argentina":a===780?"Chile":a===784?"Paraguay":a===785?"Peru":a===786?"Ecuador":789<=a&&a<=790?"Brazil":800<=a&&a<=839?"Italy, San Marino and Vatican City":840<=a&&a<=849?"Spain and Andorra":a===850?"Cuba":a===858?"Slovakia":a===859?"Czech Republic":a===860?"Serbia":a===865?"Mongolia":a===867?"North Korea":868<=a&&a<=869?"Turkey":870<=a&&a<=879?"Netherlands":a===880?"South Korea":a===884?"Cambodia":a===885?"Thailand":a===888?"Singapore":a===890?"India":a===893?"Vietnam":a===896?"Pakistan":a===899?"Indonesia":900<=a&&a<=919?"Austria":930<=a&&a<=939?"Australia":940<=a&&a<=949?"New Zealand":a===950?"GS1 Global Office: Special applications":a===951?"EPCglobal: Special applications":a===955?"Malaysia":a===958?"Macau":960<=a&&a<=969?"GS1 Global Office: GTIN-8 allocations":a===977?"Serial publications (ISSN)":978<=a&&a<=979?"Bookland (ISBN) - 979-0 used for sheet music":a===980?"Refund receipts":981<=a&&a<=983?"Common Currency Coupons":990<=a&&a<=999?"Coupons":"Unknown country"},a.prototype.validChecksum=function(){var a,b,c,d;a=0;for(b=c=1;c<=12;b=c+=2)a+=parseInt(this.barcode[b])*3;for(b=d=0;d<=12;b=d+=2)a+=parseInt(this.barcode[b]);return a%10===0},a}(),g=null,d="",h="http://dremora.com/barcode_toolz/",f=!1,c=function(b){var c,e;c=new a($("#barcode").val()),c.invalid!=null?($("#results").hide(),c.empty&&$("#error").hide()):($("#error").hide(),e="http://www.jacoballred.com/barcode/barcode.php?1&encoding=EAN-13&code="+c.canonical()+"&multiplier=2",e!==$("#image").attr("src")&&($("#image").hide(),$("#image").attr("src",e)),$("#results").show(),c.validChecksum()?$("#checksum").text("valid").attr("class","valid"):$("#checksum").text("invalid").attr("class","invalid"),$("#canonical").text(c.canonical()),$("#country").text(c.country())),f||(b!=null?b.fromHistory:void 0)!=null?history.replaceState(c.canonical(),null,h+c.canonical()):d!==c.canonical()&&(history.pushState(c.canonical(),null,h+c.canonical()),f=!0);if(d!==c.canonical())return g=setTimeout(function(){return c.invalid!=null&&!c.empty&&$("#error").show(),d=c.canonical(),f=!1},1e3)},e=function(){return g!=null&&clearTimeout(g),g=setTimeout(c,100)},b=function(a){return g!=null&&clearTimeout(g),d=a,$("#barcode").val(a),c({fromHistory:!0})},$(function(){var c,d,f,g,i;$("#image").load(function(){return $(this).show()}),i=["keyup","keydown","paste","cut","change","search"];for(f=0,g=i.length;f<g;f++)d=i[f],$("#barcode").bind(d,e);window.onpopstate=function(a){if(a.state!=null)return b(a.state)};if(history.state!=null)return b(history.state);c=window.location.href.replace(h,"");if(c.length>0)return c=new a(c),history.replaceState(c.canonical(),null,window.location.href),b(c.canonical())})}).call(this);