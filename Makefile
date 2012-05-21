barcode-min.js: barcode.js
	node_modules/uglify-js/bin/uglifyjs -o $@ $^

barcode.js: barcode.coffee
	node_modules/coffee-script/bin/coffee -c $^
