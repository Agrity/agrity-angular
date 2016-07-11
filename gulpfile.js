const gulp = require('gulp');
const typescript = require('gulp-typescript');

const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');

const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src(['app/**/*.ts', "typings/browser.d.ts"])
    .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('sass', ['clean'], function () {
  return gulp.src('app/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('sass:watch', function () {
  gulp.watch('app/**/*.scss', ['sass']);
});

// copy node modules to libs folder.
gulp.task('copy:libs', ['clean'], function() {
  // TODO Verify only need js files.
  return gulp.src('./node_modules/**/*.js')
    .pipe(gulp.dest('dist/lib'))
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/**/*',
                   'assets/**/*',
                   'index.html',
                   'styles.css',
                   'systemjs.config.js',
                   '!app/**/*.ts',
                   '!app/**/*.scss'], { base : './' })
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['tslint', 'compile', 'sass', 'copy:libs', 'copy:assets']);
gulp.task('default', ['build']);
