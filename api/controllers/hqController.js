var model = require('../config/schema');
var path = require('path');
var fs = require('fs');

var hqController = function () {

	var uploadCapa= function (file, newName, cb) {

		//Remove(alguns) caracteres especiais do arquivo.
		newName = newName.replace(' ', '-').replace('?','7');

		//Se existir arquivo.
		if (file) {

			//Monta diretório + nome + extensão do arquivo
			var newPath = path.dirname(path.dirname(file.path)) + '/capas/' + newName + '.jpg';

			fs.rename(file.path, newPath, function(err){
				if (err) {
					console.log(err);
					console.log(newPath);
					return;
				}

				//Chama callback passando o nome do arquivo renomeado.
				if (typeof cb === 'function') {
					var arrPath = newPath.split('/');
					newPath = arrPath.splice(1, arrPath.length).join('/');
					cb(newPath);
				}

			});
			//Se não existir arquivo, apenas chama o callback.
		} else {
			if(typeof cb === 'function') {
				cb(null);
			}

		}
	};

	return {

		postHq : function (req, res) {
			var hq = req.body,
			capa = req.file,
			nomeArqCapa = hq.titulo + ' ' + hq.subTitulo;

			uploadCapa(capa, nomeArqCapa, function(capaField){
				if (capaField) {
					hq.capa = capaField;
				}

				model.Hq.create(hq, function(err, newHq) {

					if(err) console.log(err);
					else res.status(200).send();
				});

			})

		},

		getHqs : function (req, res) {
			model.Hq.find()
				.populate('roteiristas')
				.populate('desenhistas')
				.populate('selo')
				.exec(function(err, hqs) {
					if(err)
						res.status(500).send(err);
					else
						res.json(hqs);
				});
		},

		getHq : function (req, res) {
			var  query = {"_id" : req.params.id}
			model.Hq.findOne(query)
				.populate('roteiristas')
				.populate('desenhistas')
				.populate('selo')
				.exec(function(err, hq) {
					if(err)
						res.status(500).send(err);
					else
						res.json(hq);
				});

		},


		test : function (req, res) {
			var seloId,
			roteiristaId,
			desenhistaId;

			function obtain(cb) {
				var s, r, d;
				model.Selos.findOne({nome : 'DC Comics'} , function(err, selo){
					s = selo._id;
				});

				model.Roteiristas.findOne({nome : 'Neil Gaiman'}, function(err, roteirista){
					r = roteirista._id;

				});

				model.Desenhistas.findOne({nome : 'Curt Swan'}, function(err, desenhista){
					d = desenhista._id;
				});

				setTimeout(function() {

					cb(s, r, d);
				}, 500);
			}

			obtain(function(s, r, d){
				console.log("selo: " + s);
				console.log("roteirista: " + r);
				console.log("desenhista: " + d);

				var hq = {
					titulo : "Planetes",
					subtitulo: "Historinha dus planeta",
					selo: d,
					roteiristas: [r],
					desenhistas: [d]
				};
				model.Hq.create(hq, function(err, hqq){
					model.Hq.findOne({titulo: "Planetes"}).populate('roteiristas')
						.exec(function (err, h) {
							console.log(h.roteiristas);
						});
				});




				res.send();
			});

		} //function
	};//return
};

module.exports = hqController;
