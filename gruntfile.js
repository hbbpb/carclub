/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
module.exports = function (grunt) {
    'use strict';

    var allJSFiles = ['*.js', 'server/**/*.js', 'client/js/*.js', 'client/app/**/*.js', 'test/**/*.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //region jshint
        jshint: {
            files: allJSFiles,
            options: {
                force: false,
                reporter: './test/jshint_reporter.js',
                asi: false,
                bitwise: false,
                boss: false,
                curly: false,
                debug: false,
                eqeqeq: true,
                eqnull: true,
                evil: false,
                forin: true,
                immed: true,
                laxbreak: false,
                newcap: true,
                noarg: true,
                noempty: false,
                nomen: false,
                onevar: false,
                passfail: false,
                plusplus: false,
                regexp: true,
                undef: false,
                sub: true,
                strict: true,
                camelcase: true,
                freeze: true,
                indent: false,
                quotmark: 'single',
                unused: true,
                white: true
            }
        },
        //endregion jshint

        //region bower
        bower: {
            install: {
                options: {
                    targetDir: './client/libs',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    bowerOptions: {
                        forceLatest: true
                    }
                }
            }
        },
        //endregion bower

        //region clean
        clean: ['client-build'],
        //endregion clean

        //region less
        less: {
            compile: {
                files: {
                    'client/css/carclub.css': 'client/less/carclub.less'
                }
            }
        },
        //endregion less

        //region uglify
        uglify: {
            options: {
                preserveComments: true
            },
            myTarget: {
                files: {
                    'client-build/libs/requirejs/require.js': ['client/libs/requirejs/require.js'],
                    'client-build/libs/angular-native-picker/build/angular-datepicker.js': ['client/libs/angular-native-picker/build/angular-datepicker.js']
                }
            }
        },
        //endregion uglify

        //region requirejs
        requirejs: {
            compile: {
                options: {
                    baseUrl: './',
                    name: 'client/js/main.js',
                    out: 'client-build/js/main.js',
                    findNestedDependencies: true,
                    optimize: 'uglify',
                    preserveLicenseComments: false,
                    paths: {
                        'config': 'client/js/config',
                        'app': 'client/app/app',
                        'controllers': 'client/app/controllers',
                        'routes': 'client/app/routes',
                        'services': 'client/app/services',
                        /*libs*/
//                        'angular': 'empty:',
//                        'angular-resource': 'empty:',
//                        'angular-route': 'empty:',
//                        'angular-animate': 'empty:',
//                        'angular-messages': 'empty:',
                        'angular': 'client/libs/angular/angular.min',
                        'angular-resource': 'client/libs/angular-resource/angular-resource.min',
                        'angular-route': 'client/libs/angular-route/angular-route.min',
                        'angular-animate': 'client/libs/angular-animate/angular-animate.min',
                        'angular-messages': 'client/libs/angular-messages/angular-messages.min',
                        'mobile-angular-ui': 'client/libs/mobile-angular-ui/dist/js/mobile-angular-ui.min',
                        'mobile-angular-ui-gestures': 'client/libs/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.min',
                        'ng-qrcode': 'client/libs/angular-qrcode-hbb/qrcode',
                        'qrcode': 'client/libs/qrcode-generator/js/qrcode',
                        'qrcode-utf8': 'client/libs/qrcode-generator/js/qrcode_UTF8',
//                        'datepicker': 'client/libs/angular-native-picker/build/angular-datepicker',
                        'datepicker': 'empty:',
                        'date-picker': 'client/libs/pickadate/lib/compressed/picker',
                        'date-picker-time': 'client/libs/pickadate/lib/compressed/picker.time',
//                        'jquery': 'empty:',
                        'jquery': 'client/libs/jquery/jquery.min',
                        'socket': 'empty:',
                        'ga': 'empty:'
                    },
                    shim: {
                        'angular': {
                            deps: ['jquery'],
                            exports: 'angular'
                        },
                        'angular-resource': {
                            deps: ['angular']
                        },
                        'angular-route': {
                            deps: ['angular']
                        },
                        'angular-animate': {
                            deps: ['angular']
                        },
                        'mobile-angular-ui': {
                            deps: ['angular']
                        },
                        'mobile-angular-ui-gestures': {
                            deps: ['angular']
                        },
                        'angular-messages': {
                            deps: ['angular']
                        },
                        'ng-qrcode': {
                            deps: ['angular']
                        },
                        'qrcode-utf8': {
                            deps: ['qrcode']
                        },
                        'qrcode': {
                            exports: 'qrcode'
                        },
                        'datepicker': {
                            deps: ['angular', 'date-picker-time']
                        },
                        'date-picker-time': {
                            deps: ['date-picker']
                        },
                        jquery: {
                            exports: 'jQuery'
                        }
                    }
                }
            }
        },
        //endregion requirejs

        //region cssmin
        cssmin: {
            combine: {
                files: {
                    'client-build/css/main.css': ['client/css/main.css']
                }
            },
            minify: {
                expand: true,
                cwd: 'client-build/css/',
                src: ['main.css', '!*.min.css'],
                dest: 'client-build/css/',
                ext: '.min.css'
            }
        },
        //endregion cssmin

        //region copy
        copy: {
            main: {
                files: [
                    {src: 'client/index.html', dest: 'client-build/index.html'},
                    {
                        expand: true,
                        flatten: true,
                        src: ['client/app/templates/*'],
                        dest: 'client-build/app/templates/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['client/libs/mobile-angular-ui/dist/fonts/*'],
                        dest: 'client-build/libs/mobile-angular-ui/dist/fonts/',
                        filter: 'isFile'
                    },
                    {src: 'client/js/init.js', dest: 'client-build/js/init.js'}
                ]
            }
        },
        //endregion copy

        //region githooks
        //此任务需要先运行一次，这册git hooks之后，以后Git commit时才能起作用
        githooks: {
            all: {
                //Will run the jshint and test tasks at every commit
                'pre-commit': {
                    taskNames: 'smart-unit-test',
                    template: './test/unit/githooks.hb'
                }
            }
        },
        //endregion githooks

        //region shell
        shell: {                                // Task
            startServer: {
                options: {                      // Options
                    stdout: true
                },
                command: 'node_modules/nodemon/bin/nodemon.js app.js'
            }
        },
        //endregion shell

        //region watch
        watch: {
            less: {
                files: ['client/less/*.less'],
                tasks: ['less']
            },
            jshint: {
                files: allJSFiles,
                tasks: ['jshint']
            }
        }
        //endregion watch
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('unit-test', ['jshint']);
    grunt.registerTask('smart-unit-test', ['jshint']);
    grunt.registerTask('build', ['bower', 'clean', 'less', 'uglify', 'requirejs', 'cssmin', 'copy']);
    grunt.registerTask('dev', ['githooks', 'watch:less']);
    grunt.registerTask('server', ['shell:startServer']);
};