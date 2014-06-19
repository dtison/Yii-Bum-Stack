'use strict';

module.exports = function(grunt) {

    var rsync = grunt.file.readJSON('../../rsync.json');
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,
        rsync: rsync,


        // Adds banner defined in package.json to top of js file
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
            '\n*/\n\n',

        bumtemp: {
            build: {
                src: './views/**/*.html',
                dest: './_build/sponsor.html'
            },
            dist: {
                src: './views/**/*.html',
                dest: '../../public_html/HTMLfrag/sponsor.html'
            }
        },

        // Combines all files into one defined in package.json
        concat: {
            vendors : {
                src : [
                    '../../bower_components/jquery/dist/jquery.js',
                    '../../bower_components/underscore/underscore.js',
                    '../../bower_components/modernizr/modernizr.js',
                    '../../bower_components/backbone/backbone.js',
                    '../../bower_components/marionette/lib/backbone.marionette.js',
                    '../../bower_components/json2/json2.js',
                    '../../bower_components/bootstrap/dist/js/bootstrap.js'

                ],
                dest: './_build/vendors.js'
            },
            app : {
                options: {
                    banner: '<%= banner %>',
                    stripBanners: false,
                    footer: '\n// Courtesy of grunt - you know you need this.\nBumApp.start();'
                },
                src : [
                    './models.js',
                    './controllers.js',
                    './main.js',
                    './drifter.js'
                ],
                dest: './_build/app.js'
            },
            dist: {
                src: [
                    './_build/vendors.js',
                    './_build/app.js'
                ],
                dest: '../../public_html/js/sponsor/BumApp.js'
            }
        },

          // Minification
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= concat.dist.dest %>.min.js'
            }
        },


        // Bash Exec
        exec: {
            clean: {
                cmd: 'rm -rf _build'
            },
            deploy: {
                cmd: 'rsync ../../public_html/* <%= rsync.options %> <%= rsync.user %>@<%= rsync.host %>:<%=rsync.path %>'
            },
            install: {
                cmd: 'node install . --save-dev'
            }
        },


        // Watch - runs tasks when any changes are detected.
        watch: {
            scripts: {
                files: '**/*',
                tasks: ['deploy'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bumtemp');
    grunt.loadNpmTasks('grunt-exec');



    // Register command line tasks.
    grunt.registerTask('clean', 'cleans up _build dir', ['exec:clean']);

    grunt.registerTask('build', 'Build from Source files',
        [
        'clean',
        'concat:vendors',
        'concat:app',
        'concat:dist',
        'bumtemp:build',
        'bumtemp:dist',
        'uglify'
    ]);
    grunt.registerTask('deploy', 'Deploy to your dev stage', ['build','exec:deploy']);

    // Installation tasks
    grunt.registerTask('bower', 'install frontend dependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install ', {cwd: '../../'}, function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('grunt-inst', 'install grunt dependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('npm install . --save-dev', {cwd: './'}, function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });


    grunt.registerTask('default','Install all dependencies',['grunt-inst','bower'])
};
