
var app = angular.module('olimsApp',
    [
        'ngRoute',
        'ui.utils',
        'ui.bootstrap',
        'toaster'
    ]);

// Change PORT value to configure the ports through which the apiService calls 
// the backend.
app.constant('envVars', {
    appName: 'OLiMS',
    version: '1.0.0',
    DOMAIN: 'http://localhost',
    PORT: 3000
});