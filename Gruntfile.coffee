module.exports = (grunt) ->

  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')

    coffee:
      compile:
        files:
          'barcode.js': 'barcode.coffee'

    uglify:
      build:
        src: 'barcode.js'
        dest: 'barcode-min.js'
  )

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.registerTask('default', ['coffee', 'uglify'])
