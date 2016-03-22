var model = require('../config/schema').Desenhistas,
	path = require('path'),
	fs = require('fs');

var desenhistasController = function () {

	var uploadFoto = function (file, newName, cb) {
		//Se existir arquivo na requisição.
		if (file) {
			var newPath = path.dirname(path.dirname(file.path)) + '/desenhista/' + newName + '.jpg';
			fs.rename(file.path, newPath, function(err){
				if (err) {
					console.log(err);
					console.log(newPath);
					return;
				}

				if (typeof cb === 'function') {
					var arrPath = newPath.split('/');
					newPath = arrPath.splice(1, arrPath.length).join('/');
					cb(newPath);
				}
				
				

			});

		} else {
			if(typeof cb === 'function') {
				cb(null);
			}
		
		}
	};

	return {

		//Insere roteirista
		postDesenhista : function (req, res) {

			uploadFoto(req.file, req.body.nome, function (foto) {

				req.body.foto = foto;
				model.create(req.body, function (err) {

					if (err) {
						console.log(err);
						res.status(500).send();
					} else {
						res.status(200).send();
					}

				});			

			});
		},

		putDesenhista : function (req, res) {
			var nome = req.params.nome,
			query = { "nome" : nome };

			uploadFoto(req.file, req.body.nome, function (foto) {

				model.update( query, { $set : req.body }, function ( err, desenhista ) {
					if (err) {
						console.log(err);
						res.status(500).send();
					} else {
						res.status(200).send();
					}
				});

			});

		},

		getDesenhista : function(req, res) {
			var query = { "nome" : req.params.nome };

			model.findOne(query, function (err, desenhista) {
				if ( err ) {
					console.log(err);
					res.status(500).send();
				} else {
					res.status(200).json( desenhista );
				}
			});
		},

		getDesenhistas : function(req, res) {
			model.find(function (err, desenhistas) {
				if ( err ) {
					console.log(err);
					res.status(500).send();
				} else {
					res.status(200).json(desenhistas);
				}
			});
		}
	};

};

module.exports = desenhistasController;
