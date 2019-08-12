module.exports = (grunt) ->

  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')

    coffee:
      compile:
        files:
          'dist/barcode.js': 'barcode.coffee'
          'dist/barcodeCanvas.js': 'barcodeCanvas.coffee'
          'dist/controller.js': 'controller.coffee'

    uglify:
      build:
        src: ['dist/barcodeCanvas.js', 'dist/barcode.js', 'dist/controller.js']
        dest: 'public/barcode-min.js'
  )

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.registerTask('default', ['coffee', 'uglify'])
