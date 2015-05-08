module.exports = function(grunt) {

  grunt.initConfig({
    // jshint
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      server: {
        src: 'server/**/*.js'
      },
      common: {
        src: 'common/**/*.js'
      },
      test: {
        src: 'test/**/*.js'
      }
    },
    // jsonlint
    jsonlint: {
      npm: {
        src: 'package.json'
      },
      server: {
        src: 'server/**/*.json'
      },
      common: {
        src: 'common/**/*.json'
      }
    },
    // copy
    copy: {
      build: {
        cwd: 'client/source/',
        src: ['**','!**/*.jade','!**/*.styl'],
        dest: 'client/build',
        expand: true
      }
    },
    clean: {
      build: {
        src: ['client/build']
      }
    },
    // jade
    jade: {
      compile: {
        options: {
          data: {},
          client: false,
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'client/source/',
          src: ['**/*.jade'],
          dest: 'client/build',
          ext: '.html'
        }]
      }
    },
    // stylus
    stylus: {
      compile: {
        options: {
          linenos: false,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'client/source/',
          src: ['**/*.styl'],
          dest: 'client/build',
          ext: '.css'
        }]
      }
    },
    // watch
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      npm: {
        files: 'package.json',
        tasks: 'jsonlint:npm'
      },
      javascript: {
        files: ['server/**/*.js', 'common/**/*.js'],
        tasks: ['jshint:server','jshint:common']
      },
      json: {
        files: ['server/**/*.json','common/**/*.json'],
        tasks: ['jsonlint:server','jsonlint:common']
      },
      jade: {
        files: 'client/source/**/*.jade',
        tasks: 'jade'
      },
      stylus: {
        files: 'client/source/**/*.styl',
        tasks: 'stylus'
      },
      test: {
        files: 'test/**/*.js',
        tasks: 'jshint:test'
      },
      copy: {
        files: [
          'client/source/**',
          '!client/source/**/*.jade',
          '!client/source/**/*.styl'
        ],
        tasks: 'copy'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['jshint']);
  grunt.registerTask('build','complile all of the assets and copies'+
                     'files to build',['clean', 'copy', 'jade', 'stylus']);

};

