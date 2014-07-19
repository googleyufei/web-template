module.exports = function (grunt) {

    var _ = require("underscore");
    _.str = require("underscore.string");
    _.mixin(_.str.exports());


    var TAB = "[web]-",
        path = require("path"),
        util = require("util"),
        Wind = require("wind"),
        Async = Wind.Async,
        Task = Wind.Async.Task,
        FileUtil = require("oatos.utils").FileUtil,
        files = require("./Gruntconfig"),
        mkdirp = require("mkdirp"),
        msgs_cn = require("./app/commons/msg/message_zh_CN.js"),
        msgs_tw = require('./app/commons/msg/message_zh_TW.js'),
        msgs_en = require("./app/commons/msg/message_en_US.js");

    Wind.logger.level = Wind.Logging.Level.WARN;

    var current_dir = process.cwd(),
        seajs_config_file = path.join(current_dir, "seajs-config.js"),
        sea_app_dir = path.join(current_dir, 'sea-modules/app'),
        appVersion = new Date().valueOf();

    console.log("appVersion: ", appVersion);

    grunt.initConfig({

        handlebars: {
            options: {
                namespace: "tplpre",
                amd: true,
                processContent: function (content) {
                    content = content.replace(/^[/x20/t]+/mg, '').replace(/[/x20/t]+$/mg, '');
                    content = content.replace(/^[/r/n]+/, '').replace(/[/r/n]*$/, '');
                    content = content.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029)/g, "");
                    return content;
                },

                processName: function (filename) {
                    var tmpName = filename.substring(filename.lastIndexOf("/") + 1, filename.lastIndexOf('.'));
                    var firstChar = tmpName.substring(0, 1);
                    return firstChar.toLowerCase() + tmpName.substring(1);
                }
            },

            commons: {files: []},
            publogin: {files: files.publogin.tpls},
            prilogin: {files: files.prilogin.tpls},
            share: {files: files.share.tpls},
            buy: {files: files.buy.tpls},
            viewer: {files: files.viewer.tpls},
            admin: {files: files.admin.tpls},
            website: {files: files.website.tpls}
        },

        transport: {
            options: {
                debug: false
            },

            commons: {files: files.commons.transport},
            publogin: {files: files.publogin.transport},
            prilogin: {files: files.prilogin.transport},
            share: {files: files.share.transport},
            buy: {files: files.buy.transport},
            viewer: {files: files.viewer.transport},
            admin: {files: files.admin.transport},
            website: {files: files.website.transport}
        },

        concat: {
            commons: {files: files.commons.concat},
            publogin: {files: files.publogin.concat},
            prilogin: {files: files.prilogin.concat},
            share: {files: files.share.concat},
            buy: {files: files.buy.concat},
            viewer: {files: files.viewer.concat},
            admin: {files: files.admin.concat},
            website: {files: files.website.concat}
        },

        uglify: {
            commons: {files: files.commons.uglify},
            publogin: {files: files.publogin.uglify},
            prilogin: {files: files.prilogin.uglify},
            share: {files: files.share.uglify},
            buy: {files: files.buy.uglify},
            viewer: {files: files.viewer.uglify},
            admin: {files: files.admin.uglify},
            website: {files: files.website.uglify}
        },

        replace: {
            tpls: {
                src: ['dist/**/*tpls.js'],
                overwrite: true,
                replacements: [
                    {
                        from: 'define(["handlebars"],function(a){',
                        to: 'define(["handlebars"],function(require){var a = require("handlebars");'
                    }
                ]
            },


            cssimg: {
                src: ['css/**/*.min.css'],
                overwrite: true,
                replacements: [
                    {
                        from: /url\(["']?(\.\.\/img\/.*?)(?:\?v=\d*)?["']?\)/g,
                        to: 'url("$1?v=' + appVersion + '")'
                    }
                ]
            },

            tplimg: {
                src: ['dist/**/tpls*.js', '*.html'],
                overwrite: true,
                replacements: [
                    {
                        from: /src[\s]?=["'](img\/.*?)(?:\?v=\d*)?["']/g,
                        to: 'src="$1?v=' + appVersion + '"'
                    }
                ]
            },

            appVersion: {
                src: ['seajs-config*.js'],
                overwrite: true,
                replacements: [
                    {
                        from: /\d{10,}/g,
                        to: appVersion
                    }
                ]
            }
        },

        copy: {
            commons: {files: files.commons.copy},
            publogin: {files: files.publogin.copy},
            prilogin: {files: files.prilogin.copy},
            share: {files: files.share.copy},
            buy: {files: files.buy.copy},
            viewer: {files: files.viewer.copy},
            admin: {files: files.admin.copy},
            website: {files: files.website.copy}
        },

        cssmin: {
            commons: { files: files.commons.cssmin},
            publogin: {files: files.publogin.cssmin},
            prilogin: {files: files.prilogin.cssmin},
            share: {files: files.share.cssmin},
            buy: {files: files.buy.cssmin},
            viewer: {files: files.viewer.cssmin},
            admin: {files: files.admin.cssmin},
            website: {files: files.website.cssmin}
        },

        clean: {
            build: ['dist', 'build'],
            commons: files.commons.clean,
            admin: files.admin.clean,
            publogin: files.publogin.clean,
            prilogin: files.prilogin.clean,
            share: files.share.clean,
            buy: {files: files.buy.clean},
            viewer: files.viewer.clean,
            website: files.website.clean
        }
    });

    var Q = require("q"),
        exec = require('child_process').exec,
        fs = require("fs"),
        rimraf = require("rimraf"),
        ncp = require("ncp");

    function execAsync(cmd) {
        var defer = Q.defer();
        exec(cmd, function (err, stdout, stderr) {
            if (err) {
                defer.reject(new Error(err));
            } else {
                // console.log("stdout: ", stdout);
                defer.resolve();
            }
        });
        return defer.promise;
    }

    fs.rmdirAsync = Q.denodeify(fs.rmdir);

    grunt.registerTask("zipFile", "zip os folder ", function () {
        var done = this.async();
        var files = [
            'app/commons',
            'app/pub-login/*',
            'sea-modules/*',
            'tpls/uikit/reglogin/*',

            'img/login/*',
            'img/common/*',

            'css/global.css',
            'css/common.css',
            'css/pub-login.css',
            'css/bootstrap.min.css',
            'css/pub-login.min.css',

            'login.html',
            'seajs-config.js'];

        var cmds = files.reduce(function (total, file) {
            return total + ' "' + file + '"';
        }, "");
        execAsync('7z a -tzip login-module.zip ' + cmds + " -r").then(done);
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('compile_tpls', function (proj) {
        var done = this.async(), tag = "[compile_tpls]-";
        var destdirs;
        if (proj === 'commons')
            return;

        if (proj) {
            if (proj === 'publogin') proj = "pub-login";
            if (proj === 'prilogin') proj = "pri-login";
            destdirs = [path.join(sea_app_dir, proj)];
        } else {
            destdirs = _.map(['publogin', "prilogin", 'share', 'buy', 'viewer', 'website', 'admin'], function (proj) {
                if (proj === 'publogin') proj = "pub-login";
                if (proj === 'prilogin') proj = "pri-login";
                return path.join(sea_app_dir, proj);
            });
        }

        eval(Wind.compile("async", function () {
            var files, destdir;
            for (var i = 0; i < destdirs.length; i++) {
                destdir = destdirs[i];
                $await(compileTplAsync(destdir));
            }
            done();
        }))().start();
    });

    function compileTplAsync(destdir) {
        var tag = "[compileTplAsync]-";
        return eval(Wind.compile("async", function (destdir) {
            var msgMap = {
                "zh_CN": msgs_cn,
                "zh_TW": msgs_tw,
                "en_US": msgs_en
            }

            var tpls = [], file, srcfile, destfile, content;

            files = $await(FileUtil.readdirAsync(destdir));
            for (var j = 0; j < files.length; j++) {
                file = files[j];
                file === 'tpls.js' && tpls.push(file);
            }

            for (var i = 0; i < tpls.length; i++) {
                file = tpls[i];
                srcfile = path.join(destdir, file);
                grunt.log.writeln(tag, '[Find] find a tpl file: ', file);

                content = $await(FileUtil.readFileAsync(srcfile, 'UTF-8'));
                var langs = _.keys(msgMap);
                for (var l = 0; l < langs.length; l++) {
                    destfile = path.join(destdir, _.strLeftBack(file, '.') + '_' + langs[l] + ".js");
                    grunt.log.writeln(tag, "[START] srcfile: ", srcfile, ', destfile: ', destfile);
                    $await(FileUtil.writeFileAsync(destfile, _.template(content, msgMap[langs[l]])));
                    grunt.log.writeln(tag, "[end] compiled!");
                }

                files = $await(FileUtil.readdirAsync(destdir));
                grunt.log.writeln('[After] files: ', files);
            }
        }))(destdir);
    }

    grunt.registerTask('build', 'Build project task', function (proj) {
        var tasks = [
            'clean'
            , 'handlebars'
            , 'transport'
            , 'concat'
            , 'uglify'
            , 'cssmin'
            , 'replace'
            , 'copy'
            , 'clean:build'];
        if (arguments.length === 0) {
            grunt.log.writeln("Build all project");
            grunt.task.run(tasks);
            grunt.task.run(['compile_tpls']);
        } else {
            grunt.log.writeln("Build project " + proj);
            tasks = ['clean:build'
                , 'clean:' + proj
                , 'handlebars:' + proj
                , 'transport:' + proj
                , "concat:" + proj
                , "uglify:" + proj
                , "cssmin:" + proj
                , 'replace'
                , "copy:" + proj
                , 'clean:build'
            ];
            grunt.task.run(tasks);
            grunt.task.run(['compile_tpls:' + proj]);
        }
    });
}
