module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jshint: {
        options: {
          bitwise: true,
          curly: true,
          eqeqeq: true,
          latedef: true,
          nocomma: true,
          strict: true,
          unused: true,
          globals: {
            module: true,
            define: true,
            require: true,
          }
        },
        all: [
          'collections/*.js',
          'helpers/*.js',
          'models/*.js',
          'routers/*.js',
          'views/*.js',
          'main.js'
        ]
      },

      clean: {
        dist: ['dist']
      },

      requirejs: {
        compile: {
          options: {
            name: 'main',
            optimize: 'none',
            out: 'dist/js/main.js',
            mainConfigFile: 'main.js',
            generateSourceMaps: true,
            preserveLicenseComments: true,
            paths: {
                backbone: 'node_modules/backbone/backbone-min',
                bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min',
                jquery: 'node_modules/jquery/dist/jquery.min',
                chart: 'node_modules/chart.js/dist/chart.umd',
                viewer: 'node_modules/viewerjs/dist/viewer.min',
                text: 'node_modules/text/text',
                underscore: 'node_modules/underscore/underscore-min',
            }
          }
        }
      },

      copy: {
        dist: {
            files: [
                {src: 'html/*.html', dest: 'dist/'},
                {src: ['node_modules/requirejs/require.js'], dest: 'dist/js/require.js'},

            ]
        }
      },

      concat: {
        dist: {
          src: ['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/viewerjs/dist/viewer.css', 'styles/style.css'], dest: 'dist/css/main.css',
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'clean', 'requirejs', 'copy', 'concat']);

    grunt.registerTask('lint', ['jshint']);
  };
