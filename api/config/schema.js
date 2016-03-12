var connection = require('./db'),

	seloSchema = {
		nome: {type: String, required: true, unique: true},
		site: {type: String, required: true},
		logo: {type: String, required: true}

	},

	roteiristaSchema = {
		nome: { type: String, required:true, unique: true },
		foto: {type: String},
		pais: {type: String},
		anoNascimento: {type: Number},
		descricao: {type: String}
	};

var Roteirista = connection.model('Roteirista',roteiristaSchema),
	Selo = connection.model('Selo', seloSchema);

var Models = {

	"Selos" : Selo,
	"Roteiristas" : Roteirista

};

module.exports = Models;
