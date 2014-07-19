var _ = require("underscore")
    , path = require("path");

var sea_module_dir = "./sea-modules/";

exports.commons = {
    transport: {
        'build/commons/main': ['app/commons/**/*.js', 'app/commons/*.js']
    },

    concat: {
        'dist/commons/main-debug.js': ['build/commons/main/**/**.js'],
        'sea-modules/commons/commons-all.js': [
            'sea-modules/commons/commons-module-def.js' ,
            'sea-modules/commons/all.js' ,
            'sea-modules/backbone/all.js',
            'sea-modules/bootstrap/all.js',
            'sea-modules/flash/flash-all.js',
            'sea-modules/socket-io-client/socket.io.min.js'
        ]
    },

    uglify: {
        'dist/commons/main.js': ['dist/commons/main-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/commons/*'], dest: path.join(sea_module_dir, 'app/commons/'), filter: 'isFile'}
    ],

    cssmin: {
        './css/commons.min.css': ['./css/global.css', './css/common.css'],
        './css/viewer.min.css': ['./css/commons.min.css', './css/viewer.css']
    },

    clean: ['sea-modules/app/commons']
}

exports.publogin = {
    tpls: {
        "dist/pub-login/tpls-debug.js": ["app/commons/tpls/**/*.tpl", "app/pub-login/tpls/**/*.tpl"]
    },

    transport: {
        'build/pub-login/main': ['app/pub-login/**/*.js', 'app/pub-login/*']
    },

    concat: {
        'dist/pub-login/main-debug.js': ['build/pub-login/main/**/*.js']
    },

    uglify: {
        'dist/pub-login/tpls.js': ['dist/pub-login/tpls-debug.js'],
        'dist/pub-login/main.js': ['dist/pub-login/main-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/pub-login/*'],
            dest: path.join(sea_module_dir, 'app/pub-login/'), filter: 'isFile'}
    ],

    cssmin: {
        './css/pub-login.min.css': ["./css/pub-login.css", "./css/global.css", "./css/common.css"]
    },

    clean: ['sea-modules/app/pub-login']
};

exports.prilogin = {
    tpls: {
        "dist/pri-login/tpls-debug.js": ["app/commons/tpls/**/*.tpl", "app/pri-login/tpls/*.tpl"]
    },

    transport: {
        'build/pri-login/main': ['app/pri-login/**/*.js', 'app/pri-login/*']
    },

    concat: {
        'dist/pri-login/main-debug.js': ['build/pri-login/main/**/*.js']
    },

    uglify: {
        'dist/pri-login/tpls.js': ['dist/pri-login/tpls-debug.js'],
        'dist/pri-login/main.js': ['dist/pri-login/main-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/pri-login/*'],
            dest: path.join(sea_module_dir, 'app/pri-login/'), filter: 'isFile'}
    ],

    cssmin: {
        './css/pri-login.min.css': ["./css/pri-login.css"]
    },

    clean: ['sea-modules/app/pri-login']
};

exports.share = {
    tpls: {
        "dist/share/tpls-debug.js": ["app/commons/tpls/**/*.tpl", "app/share/tpls/**/*.tpl"]
    },

    transport: {
        'build/share/main': ['app/share/views/**/*.js', 'app/share/*.js']
    },

    concat: {
        'dist/share/main-debug.js': ['build/share/main/**/*.js']
    },

    uglify: {
        'dist/share/main.js': ['dist/share/main-debug.js'],
        'dist/share/tpls.js': ['dist/share/tpls-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/share/*'], dest: path.join(sea_module_dir, 'app/share/'), filter: 'isFile'}
    ],

    cssmin: {},

    clean: ['sea-modules/app/share']
}

exports.viewer = {
    tpls: {
        "dist/viewer/tpls-debug.js": ["app/commons/tpls/**/*.tpl", "app/viewer/tpls/**/*.tpl"]
    },
    transport: {
        'build/viewer/main': ['app/viewer/*.js', 'app/viewer/*/**/*.js']
    },

    concat: {
        'dist/viewer/main-debug.js': ['build/viewer/main/**/*.js']
    },

    uglify: {
        'dist/viewer/main.js': ['dist/viewer/main-debug.js'],
        'dist/viewer/tpls.js': ['dist/viewer/tpls-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/viewer/*'], dest: path.join(sea_module_dir, 'app/viewer/'), filter: 'isFile'}
    ],

    cssmin: {},

    clean: ['sea-modules/app/viewer']
}

exports.admin = {
    tpls: {
        "dist/admin/tpls-debug.js": ["app/commons/tpls/**/*.tpl", "app/admin/**/*.tpl"]
    },
    transport: {
        'build/admin/main': ['app/admin/**/*.js', 'app/admin/*.js']
    },

    concat: {
        'dist/admin/main-debug.js': ['build/admin/main/**/*.js']
    },

    uglify: {
        'dist/admin/main.js': ['dist/admin/main-debug.js'],
        'dist/admin/tpls.js': ['dist/admin/tpls-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/admin/*'], dest: path.join(sea_module_dir, 'app/admin/'), filter: 'isFile'}
    ],

    cssmin: {
        './css/admin.min.css': ["./css/commons.min.css", './css/admin.css' ]
    },

    clean: ['sea-modules/app/admin']
}

exports.website = {
    tpls: {
        "dist/website/tpls-debug.js": ["app/website/**/*.tpl", "app/commons/tpls/**/*.tpl"]
    },

    transport: {
        'build/website/main': ['app/website/*.js', 'app/website/**/*.js']
    },

    concat: {
        'dist/website/main-debug.js': ['build/website/main/**/*.js']
    },

    uglify: {
        'dist/website/main.js': ['dist/website/main-debug.js'],
        'dist/website/tpls.js': ['dist/website/tpls-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/website/*'], dest: path.join(sea_module_dir, 'app/website/'), filter: 'isFile'}
    ],

    cssmin: {
        './css/website.min.css': [
            'css/commons.min.css',
            "css/home.css"
        ]
    },

    clean: ['sea-modules/app/website']
}

exports.buy = {
    tpls: {
        "dist/buy/tpls-debug.js": ["app/commons/tpls/**/*.tpl", "app/buy/tpls/**/*.tpl"]
    },

    transport: {
        'build/buy/main': ['app/buy/**/*.js', 'app/buy/*.js']
    },

    concat: {
        'dist/buy/main-debug.js': ['build/buy/main/**/*.js']
    },

    uglify: {
        'dist/buy/main.js': ['dist/buy/main-debug.js'],
        'dist/buy/tpls.js': ['dist/buy/tpls-debug.js']
    },

    copy: [
        {expand: true, flatten: true, src: ['dist/buy/*'], dest: path.join(sea_module_dir, 'app/buy/'), filter: 'isFile'}
    ],

    cssmin: {
        './css/buy.min.css': ["./css/buy.css", "./css/global.css", "./css/common.css"]
    },

    clean: ['sea-modules/app/buy']
}