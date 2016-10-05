var gulp = require('gulp');
var replace = require('gulp-replace');
var fs = require("fs");

var buildNumberFile = 'build/build-number.txt';

var filesToChange = [
    'build/bundles.js',
    'build/paths.js',
    'config.js',
    'package.json'
];

gulp.task('cache-burst', function () {

    // get the current build number
    var contents = fs.readFileSync(buildNumberFile, 'utf8');
    version = parseInt(contents);

    // bump the current build number
    version = version + 1;
    fs.writeFile(buildNumberFile, version);

    // 
    // matches "dist
    // matches 'dist
    // matches "dist1
    // matches 'dist12
    // 
    var outputDirectoryRegex = /([\"|\']dist)([0-9]*)/g;

    // replace the build number in appropriate files
    gulp.src(filesToChange, { base: './' })
        .pipe(replace(outputDirectoryRegex, '$1' + version))
        .pipe(gulp.dest('.'));
});