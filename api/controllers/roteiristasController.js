var model = require('../config/schema').Roteiristas,
	path = require('path'),
	fs = require('fs');


var roteiristasController =  function() {

	var uploadFoto = function(file, newName, cb) {
		if(file){
			var newPath = path.dirname(path.dirname(file.path)) + '/roteirista/' + newName + '.jpg';
			fs.rename(file.path, newPath, function(err){
				if(err) {
					console.log(err);
					console.log(newPath);
					return;
				}

				if(typeof cb === 'function'){
					var arrPath = newPath.split('/');
					newPath = arrPath.splice(1, arrPath.length).join('/');
					cb(newPath);
				}

			});
		}else{
			if(typeof cb === 'function'){
				cb(null);
			}
		}
	};


	return {

		getRoteiristas: function(req, res, next) {
			model.find(function(err, roteiristas) {
				res.json(roteiristas);
			});
		},

		postRoteirista: function(req, res, next){

			var roteiristaModel = new model(req.body);
			uploadFoto(req.file, roteiristaModel.nome, function(foto) {

				roteiristaModel.foto = foto;
				roteiristaModel.save(function(err) {
					if(err) res.status(500).send(err);

					res.status(200).send();
				});
			});
		},

		putRoteirista: function(req, res, next){
			var query = {"nome" : req.params.nome};
			var roteiristaReq = req.body;
			uploadFoto(req.file, req.body.nome, function(foto) {
				
				if(foto)
					roteiristaReq.foto = foto;

				model.update(query, {$set : req.body}, function(err, roteirista){
					if(err) res.status(500).send(err);

					if(roteirista)
						res.status(200).json(roteirista);
					else
						res.status(404).send();
				});
			});
		},

		getRoteirista: function(req, res, next){
			var query = {"nome" : req.params.nome};
			model.findOne(query, function(err, roteirista){
				res.json(roteirista);
			});

		}

	};
};

module.exports = roteiristasController;
