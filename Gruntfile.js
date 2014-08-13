/**
 * Created by danielraudschus on 01.08.14.
 */
module.exports = function (grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/hammer.min.js',
                    'js/game.js',
                    'js/main.js'
                ],
                dest: 'js/release.js'
            }

        },

        uglify: {
            build: {
                src: 'js//release.js',
                dest: 'js/release.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'bilder/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'bilder/build/'
                    }
                ]
            }
        },

        watch: {
            options: {
                livereload: false
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify', 'watch'],
                options: {
                    spawn: false
                }
            },

            css: {
                files: ['*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'main.css': 'main.scss'
                }
            }
        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'index.html',     // 'destination': 'source'
                    'dist/game.html': 'game.html',
                    'dist/gameover.html': 'gameover.html',
                    'dist/howtoplay.html': 'howtoplay.html',
                    'dist/impressum.html': 'impressum.html',
                    'dist/input.html': 'input.html',
                    'dist/webapp.html': 'webapp.html'
                }
            },
            dev: {                                       // Another target
                files: {
                    'dist/index.html': 'index.html',     // 'destination': 'source'
                    'dist/game.html': 'game.html',
                    'dist/gameover.html': 'gameover.html',
                    'dist/howtoplay.html': 'howtoplay.html',
                    'dist/impressum.html': 'impressum.html',
                    'dist/input.html': 'input.html',
                    'dist/webapp.html': 'webapp.html'
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'htmlmin', /*'imagemin',*/ 'watch']);

};
