// require gulp
var gulp     = require('gulp');
// require gulp uglify
var uglify   = require('gulp-uglify');
// require gulp jshint
var jshint   = require('gulp-jshint');
// require gulp concat
var concat   = require('gulp-concat');
// require gulp watcher
var watcher  = require('gulp-watch');
// require gulp rename
var rename   = require('gulp-rename');
// require gulp minify css
var minify   = require('gulp-minify-css');
// require gulp rimraf 
var rimraf   = require('gulp-rimraf');
// require gulp inject
var inject   = require('gulp-inject');
// require run sequence
var sequence = require('run-sequence');
// require main bower files
var bower    = require('main-bower-files');
// require gulp revision
var revision = require('gulp-rev');

// set bower main files options (scripts)
bowerScripts = bower({
    includeDev      : 'inclusive',
    checkExistence  : true,
    debugging       : true,
    filter          : new RegExp('.*js$', 'i')
});

// set bower main files options (styles)
bowerStyles = bower({
    includeDev      : 'inclusive',
    checkExistence  : true,
    debugging       : true,
    filter          : new RegExp('.*css$', 'i')
});

// bower components path
var BOWER_PATH          = __dirname + '/bower_components';
// application vendor path
var APP_VENDOR_PATH     = __dirname + '/vendor';
// application build path
var APP_BUILD_PATH      = __dirname + '/build';
// application styles build path
var STYLES_BUILD_PATH   = __dirname + '/build/styles';
// application scripts build path
var SCRIPTS_BUILD_PATH  = __dirname + '/build/scripts';

// application scripts path
var APP_SCRIPTS_PATH    = __dirname + '/scripts/**/*.js';
// application styles path
var APP_STYLES_PATH     = __dirname + '/styles/**/*.css';

// injector target path
var INJECT_TARGET_PATH  = __dirname + '/page.php';

// bower ignored files
var ignored = [];

// application files
var files = {
    // production scripts
    'scripts' : {
        tag  : { starttag : '<!-- inject:scripts -->' },
        path : './build/scripts/**/*.js'
    },
    // production styles
    'styles' : {
        tag  : { starttag : '<!-- inject:styles -->' },
        path : './build/styles/**/*.css'
    },

    // development scripts
    'scripts-dev' : {
        tag  : { starttag : '<!-- inject:scripts -->' },
        path : './scripts/**/*.js'
    },
    // development styles
    'styles-dev' : {
        tag  : { starttag : '<!-- inject:styles -->' },
        path : './styles/**/*.css'
    },

    // production / dev 3rd party scripts
    'vendor-scripts' : {
        tag  : { starttag : '<!-- inject:third-party-scripts -->' },
        path : []
    },
    // production / dev 3rd party styles
    'vendor-styles' : {
        tag  : { starttag : '<!-- inject:third-party-styles -->' },
        path : []
    }
};

// minify scripts
gulp.task('minify-scripts', function() {
    // initialize gulp, read src
    return gulp.src(APP_SCRIPTS_PATH)
    // set build file name
    .pipe(concat('scripts.js'))
    // set file revision hash
    .pipe(revision())
    // uglify with variable mangle
    .pipe(uglify({ mangle : true }))
    // rename extension to .min.js
    .pipe(rename({ extname : '.min.js' }))
    // save to destination path
    .pipe(gulp.dest(SCRIPTS_BUILD_PATH));
});

// minify styles
gulp.task('minify-styles', function() {
   // initialize gulp, read src
    return gulp.src(APP_STYLES_PATH)
    // set build file name
    .pipe(concat('styles.css'))
    // set file revision hash
    .pipe(revision())
    // minify css
    .pipe(minify())
    // rename extension to .min.css
    .pipe(rename({ extname : '.min.css' }))
    // save to destination path
    .pipe(gulp.dest(STYLES_BUILD_PATH));
});

// set up build task
gulp.task('build', [
    'clean',
    'minify-scripts',
    'minify-styles'
]);

// set up clean task
gulp.task('clean', function() {
    // initialize path to clean
    return gulp
    // initialize path to clean, read false
    .src([
        APP_BUILD_PATH + '/**/*',
        SCRIPTS_BUILD_PATH + '/**/*',
        STYLES_BUILD_PATH + '/**/*'
    ], { read : false })
    // clean directory
    .pipe(rimraf({ force : true }));
});

// set up gulp watcher
gulp.task('watch', function() {
    // watch folders
    watcher([
        APP_SCRIPTS_PATH,
        STYLES_BUILD_PATH,
        SCRIPTS_BUILD_PATH,
        APP_STYLES_PATH
    ], function() {
        // run this actions
        sequence('build', 'inject-clean', 'inject');
    });
});

// set up gulp watch-dev
gulp.task('watch-dev', function() {
    // watch folders
    watcher([
        APP_SCRIPTS_PATH,
        STYLES_BUILD_PATH,
        SCRIPTS_BUILD_PATH,
        APP_STYLES_PATH
    ], function() {
        // run this actions
        sequence('inject-clean', 'inject-dev');
    });
});

// move bower_components/* to vendor
gulp.task('install-vendor', function() {
    // initialize path to move
    return gulp.src([BOWER_PATH + '/**/*'])
    // save to destination path
    .pipe(gulp.dest(APP_VENDOR_PATH));
});

// clean vendor folder
gulp.task('clean-vendor', function() {
    // initialize path to clean
    return gulp
    // initialize path to clean, read false
    .src(APP_VENDOR_PATH, { read : false })
    // clean directory
    .pipe(rimraf({ force : true }));
});

// set up install task
gulp.task('install', function(callback) {
    // run clean-vendor, install-vendor task
    sequence('clean-vendor', 'install-vendor', callback);
});

// set up injector
gulp.task('inject', function() {
    // default option
    var options = { read : false };

    // scripts
    var scripts         = files['scripts'];
    // styles
    var styles          = files['styles'];
    // vendor scripts
    var vendorScripts   = files['vendor-scripts'];
    // vendor styles
    var vendorStyles    = files['vendor-styles'];

    // set self closing tags for <link />
    styles.tag.selfClosingTag = true;

    // replace paths
    bowerScripts = replacePaths(bowerScripts.concat(vendorScripts.path), BOWER_PATH, APP_VENDOR_PATH);

    // replace paths
    bowerStyles  = replacePaths(bowerStyles.concat(vendorStyles.path), BOWER_PATH, APP_VENDOR_PATH);

    // setup dependency injector
    return gulp.src(INJECT_TARGET_PATH)
    // inject scripts
    .pipe(inject(gulp.src(scripts.path, options), scripts.tag))
    // inject styles
    .pipe(inject(gulp.src(styles.path, options), styles.tag))
    // inject vendor scripts
    .pipe(inject(gulp.src(bowerScripts, options), vendorScripts.tag))
    // inject vendor styles
    .pipe(inject(gulp.src(bowerStyles, options), vendorStyles.tag))
    // set destination
    .pipe(gulp.dest('../template'));
});

// set up injector - dev
gulp.task('inject-dev', function() {
    // default option
    var options = { read : false };
    
    // scripts
    var scripts         = files['scripts-dev'];
    // styles
    var styles          = files['styles-dev'];
    // vendor scripts
    var vendorScripts   = files['vendor-scripts'];
    // vendor styles
    var vendorStyles    = files['vendor-styles'];

    // set self closing tags for <link />
    styles.tag.selfClosingTag = true;

    // replace paths
    bowerScripts = replacePaths(bowerScripts.concat(vendorScripts.path), BOWER_PATH, APP_VENDOR_PATH);

    // replace paths
    bowerStyles  = replacePaths(bowerStyles.concat(vendorStyles.path), BOWER_PATH, APP_VENDOR_PATH);

    // setup dependency injector
    return gulp.src(INJECT_TARGET_PATH)
    // inject scripts
    .pipe(inject(gulp.src(scripts.path, options), scripts.tag))
    // inject styles
    .pipe(inject(gulp.src(styles.path, options), styles.tag))
    // inject vendor scripts
    .pipe(inject(gulp.src(bowerScripts, options), vendorScripts.tag))
    // inject vendor styles
    .pipe(inject(gulp.src(bowerStyles, options), vendorStyles.tag))
    // set destination
    .pipe(gulp.dest('../template'));
});

// set up injector-clean
gulp.task('inject-clean', function() {
    // default option
    var options = { read : false };

    // scripts
    var scripts         = files['scripts-dev'];
    // styles
    var styles          = files['styles-dev'];
    // vendor scripts
    var vendorScripts   = files['vendor-scripts'];
    // vendor styles
    var vendorStyles    = files['vendor-styles'];

    // setup dependency injector
    return gulp.src(INJECT_TARGET_PATH)
    // inject scripts
    .pipe(inject(gulp.src('', options), scripts.tag))
    // inject styles
    .pipe(inject(gulp.src('', options), styles.tag))
    // inject vendor scripts
    .pipe(inject(gulp.src('', options), vendorScripts.tag))
    // inject vendor styles
    .pipe(inject(gulp.src('', options), vendorStyles.tag))
    // set destination
    .pipe(gulp.dest('.'));
});

// javascript linter task
gulp.task('lint', function() {
    // set script source
    return gulp.src([
        APP_SCRIPTS_PATH
    ])
    // set jshint
    .pipe(jshint('.jshintrc'))
    // set jshint reporter
    .pipe(jshint.reporter('jshint-stylish'));
});

// production deployment task
gulp.task('deploy', function(callback) {
    // 1. Install bower components to vendor
    // 2. Clean build files
    // 3. Build files,
    // 4. Clean Injected files,
    // 5. Inject files
    sequence('install', 'clean', 'build', 'inject-clean', 'inject', callback);
});

// development deployment task
gulp.task('deploy-dev', function(callback) {
    // 1. Install bower components to vendor
    // 2. Clean build files
    // 3. Clean Injected files,
    // 4. Inject files
    sequence('install', 'clean', 'inject-clean', 'inject-dev', callback);
});

// set up default task
gulp.task('default', function() {
    gulp.start('watch');
});

// helper function to replace bower_components
// to new vendor path, and to also replace .js
// files to .min.js
function replacePaths(paths, bowerPath, appVendorPath) {
    // require fs
    var fs = require('fs');

    // if no paths
    if(!paths.length) {
        return [];
    }

    // get replaced paths
    var newPaths = [];

    // iterate on each paths
    for(var i in paths) {
        // if we need to ignore it
        if(ignored.indexOf(paths[i]) !== -1) {
            continue;
        }

        newPaths[i] = paths[i]
        // replace bower components path
        .replace(bowerPath, appVendorPath);

        // if not yet .min.js
        if(newPaths[i].indexOf('.min.js') === -1) {
            // replace .js to .min.js
            newPaths[i] = newPaths[i].replace('.js', '.min.js');
        }

        // if minified exists
        if(!fs.existsSync(newPaths[i])) {
            // get back original
            newPaths[i] = newPaths[i].replace('.min.js', '.js');
        }

        // if it really does not exists
        if(!fs.existsSync(newPaths[i])) {
            // remove that path
            delete newPaths[i];
        }
    }

    return newPaths;
};