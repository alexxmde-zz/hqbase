var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hqbase');

var db = mongoose.connection;

//Erro de conexão
db.on('error', 
		function(erro){console.log("Erro de conexão " + erro);
});

//Sucesso de conexão
db.once('open', function(){
	console.log("Mongoose  - Conectado");
});

module.exports = mongoose;
