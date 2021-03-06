(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                              'app', // 'dist',
    'config':                           'config',
    'rxjs':                             'lib/rxjs',
    'angular2-in-memory-web-api':       'lib/angular2-in-memory-web-api',
    '@angular':                         'lib/@angular',
    'json':                             'lib/systemjs-plugin-json/json.js',
    'angular2-modal':                   'lib/angular2-modal',
    'angular2-modal/platform-browser':  'lib/angular2-modal/platform-browser',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: '../boot.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };
  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',

    'angular2-modal',
    'angular2-modal/platform-browser',
    'angular2-modal/plugins/bootstrap',
    'angular2-modal/plugins/vex',
  ];
  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages,
    defaultJSExtensions: true,
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) {
    global.filterSystemConfig(config);
  }

  System.config(config);
})(this);
