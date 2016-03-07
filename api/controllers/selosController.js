var model = require('../config/schema'),
	path = require('path'),
	fs = require('fs');

var selosController = function () {
    //Callback do Save
	var saveCb = function(err, res) {
		if (err) {
			res.send(err.message);
		} else {
			res.sendStatus(200);
		}
	};

	//Renomeia o logo do selo para o nome do selo.
	var uploadLogo = function(file, name, cb){
		var newPath = path.dirname(file.path) + '/' + name + ".jpg";
	
		fs.rename(file.path, newPath, function(err) {

			if(err) return err;
			//Retorna o novo caminho do selo.
			if(typeof cb === 'function')
			cb(newPath);

		});
	};

	return {

		// -- POST /api/selo
		// -- PUT /api/selo/:nome
		postSelo: function (req, res) {
			var seloReq = req.body;
			var fileReq = req.file;
			//Se o arquivo for encontrado na requisição.
			if (fileReq) {
				uploadLogo(fileReq, seloReq.nome, function (logo) {
					seloReq.logo = logo;
					var selo = new model.Selos(seloReq, true);
					selo.save( function (err) {
						saveCb(err, res);

					});

				});


			} else {
				res.status(202).send("Logo do selo não presente na requisição.");

			} //else
		},

		putSelo: function(req, res){
			var seloReq = req.body;
			var fileReq = req.file;

			if (fileReq) {
				uploadLogo(fileReq, seloReq.nome, function (logo) {
					seloReq.logo = logo;
				});
			}

			var query = {"nome" : req.params.nome};
			model.Selos.update(query, {$set : seloReq}, function(err, selo) {
				if(err){
					res.status(202).send("Não foi possível atualizar o selo");
				} else {
					
				}
			});	
		},

		// -- GET /api/selos
		getSelos: function (req, res) {
			//Obtem os selos
			model.Selos.find(function (err, selos) {
				//Escreve resposta e envia
				res.json(selos);
			});
		},

		getSelo: function (req, res) {
			q = req.params.nome;
			model.Selos.findOne({"nome" : q}, function (err, selo) {
				if(err)
					res.sendStatus(404);
				else
					res.json(selo);
			});
		}
	};
};

module.exports = selosController;

