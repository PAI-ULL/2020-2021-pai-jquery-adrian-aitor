import EXPRESS from 'express';
import PATH from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = EXPRESS();

//set the port
APP.set('port', 8085);

//tell express that we want to use the www folder
//for our static assets
APP.use('/', EXPRESS.static(PATH.join(__dirname, './')));
APP.use('/img', EXPRESS.static(PATH.join(__dirname, '../img')));
APP.use('/css', EXPRESS.static(PATH.join(__dirname, '../css')));
APP.use('/jquery', EXPRESS.static(PATH.join(__dirname, '../../node_modules/jquery/dist/')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
  console.log('The server is running on http://:10.6.130.141' + APP.get('port'));
});