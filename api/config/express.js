var express = require('express'),
	apiRoutes = require('../routes/api'),
	bodyParser = require('body-parser');

module.exports = function (){
	var app = express();

	//Variáveis de ambiente.
	app.set('port', 3000);
	app.set('view engine', 'ejs');

		app.set('views', 'api/views');

	app.use(express.static('./app/'));
	app.use('/images', express.static('api/images/'));
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());

	app.use(apiRoutes);

	return app;

};
