const EXPRESS = require('express');
const PATH = require('path');
const APP = EXPRESS();

// set the port
APP.set('port', 8080);

// Setting the needed paths to the src folder and the jquery dist folder
APP.use('/', EXPRESS.static(PATH.join(__dirname, './')));
APP.use(EXPRESS.static(PATH.join(__dirname, '../src')));
APP.use('/jquery', EXPRESS.static(PATH.join(__dirname, '../node_modules/jquery/dist/')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
  console.log('The server is running on http://:10.6.130.141' + APP.get('port'));
});