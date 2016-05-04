/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'materialize-css/bin/materialize.css',
      'materialize-css/font/roboto/Roboto-Regular.woff2',
      'materialize-css/font/roboto/Roboto-Regular.woff',
      'materialize-css/font/roboto/Roboto-Regular.ttf'
    ]
  });
};
