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
	},

	desenhistaSchema = {
		nome: {type: String, required:true, unique: true},
		foto: {type: String},
		pais: {type: String},
		anoNascimento: {type: Number},
		descricao: {type: String}
	
	},

	hqSchema =  {
		titulo : { type: String, required: true },
		subTitulo : { type: String },

		//Selo
		selo : {type : connection.Schema.Types.ObjectId, ref : 'Selo'},

		roteiristas : [ { 
			type : connection.Schema.Types.ObjectId,
			ref : 'Roteirista'

		} ],
		desenhistas : [ {
			type: connection.Schema.Types.ObjectId,
			ref : 'Desenhista'
		} ]
		

	};

var Roteirista = connection.model('Roteirista',roteiristaSchema),
	Selo = connection.model('Selo', seloSchema),
	Desenhista = connection.model('Desenhista', desenhistaSchema),
	Hq = connection.model('Hq', hqSchema);

var Models = {

	"Selos" : Selo,
	"Roteiristas" : Roteirista,
	"Desenhistas" : Desenhista,
	"Hq" : Hq

};

module.exports = Models;
