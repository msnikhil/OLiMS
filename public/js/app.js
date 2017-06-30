
var app = angular.module('olimsApp',['ngRoute','ui.utils']);

app.constant('envVars', {
    appName: 'OLiMS',
    version: '1.0.0',
    DOMAIN: 'http://localhost',
    PORT: 3000
});