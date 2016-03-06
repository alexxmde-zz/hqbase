var connection = require('./db'),

 Selo = connection.model('Selo', {
	
	 nome: {type: String, required: true},
	site: {type: String, required: true},
	logo: {type: String, required: true}

});

var Models = {
	"Selos" : Selo

};
module.exports = Models;
