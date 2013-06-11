!function(){this.barcodeToCanvas=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;for(e=95,l=null!=(r="undefined"!=typeof options&&null!==options?options.lineWidth:void 0)?r:3,k=null!=(s="undefined"!=typeof options&&null!==options?options.lineHeight:void 0)?s:70*l,h=10*l,g=null!=(t="undefined"!=typeof options&&null!==options?options.font:void 0)?t:"monospace",m=k+h/2,f=b.getContext("2d"),f.textBaseline="bottom",f.font=h+"px "+g,f.setTransform(1,0,0,1,0,0),f.clearRect(0,0,b.width,b.height),f.textAlign="right",f.fillText(a.barcode[0],h,k+h),f.textAlign="start",f.translate(h+3*l,0),u=a.toBinary(),n=0,p=u.length;p>n;n++)for(d=u[n],j=d.digit?!1:!0,i=j?m:k,j||(f.fillStyle="black",f.fillText(d.digit,0,k+h)),v=d.bits,o=0,q=v.length;q>o;o++)c=v[o],f.fillStyle="1"===c?"black":"white",f.fillRect(0,0,l,i),f.translate(l,0);return f.fillStyle="black",f.fillText(">",2*l,k+h)}}.call(this),function(){var a,b,c,d,e,f,g,h;a=function(){function a(a){for(this.barcode=a,this.barcode.match(/^[0-9]{10,13}$/)||(this.invalid=!0),this.empty=""===this.barcode;this.barcode.length<13;)this.barcode="0"+this.barcode;this.invalid&&(this.barcode="")}return a.prototype.canonical=function(){return this.barcode},a.prototype.country=function(){var a;return a=parseInt(this.barcode.slice(0,3),10),a>=0&&19>=a?"U.S. and Canada":a>=20&&29>=a?"Restricted distribution (MO defined)":a>=30&&39>=a?"U.S. drugs (see U.S. National Drug Code)":a>=40&&49>=a?"Restricted distribution (MO defined)":a>=50&&59>=a?"Coupons":a>=60&&99>=a?"U.S. and Canada":a>=100&&139>=a?"U.S. (reserved for later use)":a>=200&&299>=a?"Restricted distribution (MO defined)":a>=300&&379>=a?"France and Monaco":380===a?"Bulgaria":383===a?"Slovenia":385===a?"Croatia":387===a?"Bosnia and Herzegovina":389===a?"Montenegro":a>=400&&440>=a?"Germany":a>=450&&459>=a?"Japan":a>=460&&469>=a?"Russia":470===a?"Kyrgyzstan":471===a?"Taiwan":474===a?"Estonia":475===a?"Latvia":476===a?"Azerbaijan":477===a?"Lithuania":478===a?"Uzbekistan":479===a?"Sri Lanka":480===a?"Philippines":481===a?"Belarus":482===a?"Ukraine":484===a?"Moldova":485===a?"Armenia":486===a?"Georgia":487===a?"Kazakhstan":488===a?"Tajikistan":489===a?"Hong Kong SAR":a>=490&&499>=a?"Japan":a>=500&&509>=a?"United Kingdom":a>=520&&521>=a?"Greece":528===a?"Lebanon":529===a?"Cyprus":530===a?"Albania":531===a?"Macedonia":535===a?"Malta":539===a?"Ireland":a>=540&&549>=a?"Belgium and Luxembourg":560===a?"Portugal":569===a?"Iceland":a>=570&&579>=a?"Denmark, Faroe Islands and Greenland":590===a?"Poland":594===a?"Romania":599===a?"Hungary":a>=600&&601>=a?"South Africa":603===a?"Ghana":604===a?"Senegal":608===a?"Bahrain":609===a?"Mauritius":611===a?"Morocco":613===a?"Algeria":615===a?"Nigeria":616===a?"Kenya":618===a?"Côte d'Ivoire":619===a?"Tunisia":621===a?"Syria":622===a?"Egypt":624===a?"Libya":625===a?"Jordan":626===a?"Iran":627===a?"Kuwait":628===a?"Saudi Arabia":629===a?"United Arab Emirates":a>=640&&649>=a?"Finland":a>=690&&695>=a?"China, The People's Republic":a>=700&&709>=a?"Norway":729===a?"Israel":a>=730&&739>=a?"Sweden : EAN/GS1 Sweden":740===a?"Guatemala":741===a?"El Salvador":742===a?"Honduras":743===a?"Nicaragua":744===a?"Costa Rica":745===a?"Panama":746===a?"Dominican Republic":750===a?"Mexico":a>=754&&755>=a?"Canada":759===a?"Venezuela":a>=760&&769>=a?"Switzerland and Liechtenstein":a>=770&&771>=a?"Colombia":773===a?"Uruguay":775===a?"Peru":777===a?"Bolivia":779===a?"Argentina":780===a?"Chile":784===a?"Paraguay":785===a?"Peru":786===a?"Ecuador":a>=789&&790>=a?"Brazil":a>=800&&839>=a?"Italy, San Marino and Vatican City":a>=840&&849>=a?"Spain and Andorra":850===a?"Cuba":858===a?"Slovakia":859===a?"Czech Republic":860===a?"Serbia":865===a?"Mongolia":867===a?"North Korea":a>=868&&869>=a?"Turkey":a>=870&&879>=a?"Netherlands":880===a?"South Korea":884===a?"Cambodia":885===a?"Thailand":888===a?"Singapore":890===a?"India":893===a?"Vietnam":896===a?"Pakistan":899===a?"Indonesia":a>=900&&919>=a?"Austria":a>=930&&939>=a?"Australia":a>=940&&949>=a?"New Zealand":950===a?"GS1 Global Office: Special applications":951===a?"EPCglobal: Special applications":955===a?"Malaysia":958===a?"Macau":a>=960&&969>=a?"GS1 Global Office: GTIN-8 allocations":977===a?"Serial publications (ISSN)":a>=978&&979>=a?"Bookland (ISBN) - 979-0 used for sheet music":980===a?"Refund receipts":a>=981&&983>=a?"Common Currency Coupons":a>=990&&999>=a?"Coupons":"Unknown country"},a.prototype.validChecksum=function(){var a,b,c,d;for(a=0,b=c=1;12>=c;b=c+=2)a+=3*parseInt(this.barcode[b]);for(b=d=0;12>=d;b=d+=2)a+=parseInt(this.barcode[b]);return 0===a%10},a.prototype.group1map=["000000","001011","001101","001110","010011","011001","011100","010101","010110","011010"],a.prototype.codes=[["0001101","0100111","1110010"],["0011001","0110011","1100110"],["0010011","0011011","1101100"],["0111101","0100001","1000010"],["0100011","0011101","1011100"],["0110001","0111001","1001110"],["0101111","0000101","1010000"],["0111011","0010001","1000100"],["0110111","0001001","1001000"],["0001011","0010111","1110100"]],a.prototype.toBinary=function(){var a,b,c,d,e;return e=this.group1map[this.barcode[0]],b=function(){var b,c,f,g;for(f=this.barcode.slice(1,7),g=[],d=b=0,c=f.length;c>b;d=++b)a=f[d],g.push({bits:this.codes[a][e[d]],digit:a});return g}.call(this),c=function(){var b,c,d,e;for(d=this.barcode.slice(7,13),e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push({bits:this.codes[a][2],digit:a});return e}.call(this),[{bits:"101"}].concat(b).concat([{bits:"01010"}]).concat(c).concat([{bits:"101"}])},a}(),g=null,d="",h="http://dremora.com/barcode_toolz/",f=!1,c=function(b){var c,e;return c=new a($("#barcode").val()),null!=c.invalid?($("#results").hide(),c.empty&&$("#error").hide()):($("#error").hide(),e=document.getElementById("canvas"),barcodeToCanvas(c,e),document.getElementById("image").src=e.toDataURL(),$("#results").show(),c.validChecksum()?$("#checksum").text("valid").attr("class","valid"):$("#checksum").text("invalid").attr("class","invalid"),$("#canonical").text(c.canonical()),$("#country").text(c.country())),f||null!=(null!=b?b.fromHistory:void 0)?history.replaceState(c.canonical(),null,h+c.canonical()):d!==c.canonical()&&(history.pushState(c.canonical(),null,h+c.canonical()),f=!0),d!==c.canonical()?g=setTimeout(function(){return null==c.invalid||c.empty||$("#error").show(),d=c.canonical(),f=!1},1e3):void 0},e=function(){return null!=g&&clearTimeout(g),g=setTimeout(c,100)},b=function(a){return null!=g&&clearTimeout(g),d=a,$("#barcode").val(a),c({fromHistory:!0})},$(function(){var c,d,f,g,i;for($("#image").load(function(){return $(this).show()}),i=["keyup","keydown","paste","cut","change","search"],f=0,g=i.length;g>f;f++)d=i[f],$("#barcode").bind(d,e);return window.onpopstate=function(a){return null!=a.state?b(a.state):void 0},null!=history.state?b(history.state):(c=window.location.href.replace(h,""),c.length>0?(c=new a(c),history.replaceState(c.canonical(),null,window.location.href),b(c.canonical())):void 0)})}.call(this);