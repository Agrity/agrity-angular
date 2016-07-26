const gulp = require('gulp');
const typescript = require('gulp-typescript');

const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');

const tscConfig = require('./tsconfig.json');

const browserSync = require('browser-sync').create();
const browserSyncConfig = require('./bs-config.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('tslint', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// TypeScript compile
var compileFunc = function() {
  return gulp
    .src(['./**/*.ts', "../typings/browser.d.ts"], { cwd: 'src/' })
    .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
  };

gulp.task('compile', ['clean'], compileFunc);
gulp.task('compile-noclean', compileFunc);

gulp.task('compile:watch', function () {
  gulp.watch('src/**/*.ts', ['tslint', 'compile-noclean']);
});

var sassFunc = function() {
  return gulp.src('./**/*.scss', { cwd: 'src/'} )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
};

gulp.task('sass', ['clean'], sassFunc);
gulp.task('sass-noclean', sassFunc);

gulp.task('sass:watch', function () {
  gulp.watch('src/**/*.scss', ['sass-noclean']);
});


var copyHtmlFunc = function() {
  return gulp.src('./**/*.html', { cwd: 'src/'} )
    .pipe(gulp.dest('dist'));
};


gulp.task('copy:html', ['clean'], copyHtmlFunc);
gulp.task('copy:html-noclean', copyHtmlFunc);

gulp.task('html:watch', function () {
  gulp.watch('src/**/*.html', ['copy:html-noclean']);
});

// copy static assets - i.e. non TypeScript compiled source
var copyAssetsFunc = function() {
  return gulp.src('./assets/**/*', { cwd : 'src/' })
    .pipe(gulp.dest('dist/assets'))
};

gulp.task('copy:assets', ['clean'], copyAssetsFunc);
gulp.task('copy:assets-noclean', copyAssetsFunc);


gulp.task('assets:watch', function () {
  gulp.watch('src/assets/**/*', ['copy:assets-noclean']);
});

var copyConfigFunc = function() {
  return gulp.src('./config/**/*', { cwd : 'src/' })
    .pipe(gulp.dest('dist/config'))
};

gulp.task('copy:config', ['clean'], copyConfigFunc);
gulp.task('copy:config-noclean', copyConfigFunc);


gulp.task('config:watch', function () {
  gulp.watch('src/config/**/*', ['copy:config-noclean']);
});

// copy node modules to libs folder.
var copyLibsFunc = function() {
  // TODO Only copy production modules
  return gulp.src(['./node_modules/**/*.js',
                   './node_modules/**/*.js.map',
                   './node_modules/**/*.d.ts'])
    .pipe(gulp.dest('dist/lib'))
};

gulp.task('copy:libs', ['clean'], copyLibsFunc);
gulp.task('copy:libs-noclean', copyLibsFunc);

var copyOtherFunc = function() {
  return gulp.src('systemjs.config.js')
    .pipe(gulp.dest('dist'))
};

gulp.task('copy:other', ['clean'], copyOtherFunc);
gulp.task('copy:other-noclean', copyOtherFunc);

gulp.task('serve', ['build'], function() {
  browserSync.init(browserSyncConfig);

  gulp.watch('src/**/*.ts', ['compile-noclean']).on('change', browserSync.reload);
  gulp.watch('src/**/*.scss', ['sass-noclean']);
  gulp.watch('src/**/*.html', ['copy:html-noclean']).on('change', browserSync.reload);
  gulp.watch('src/assets/**/*', ['copy:assets-noclean']).on('change', browserSync.reload);
  gulp.watch('src/config/**/*', ['copy:config-noclean']).on('change', browserSync.reload);

});

gulp.task('build', ['clean', 'tslint', 'compile', 'sass', 'copy:html',
                    'copy:assets', 'copy:config', 'copy:libs', 'copy:other']);

gulp.task('watch', ['compile:watch', 'sass:watch',
                    'html:watch', 'assets:watch', 'config:watch']);

gulp.task('default', ['build']);
