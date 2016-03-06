var model = require('../config/schema');

var selosController = function () {
    //Callback do Save
	var saveCb = function(err, res) {
		if (err) {
			res.send(err.message);
		} else {
			res.sendStatus(200);
		}
	};

	return {

		// -- POST /api/selos
		postSelo: function (req, res) {

			var selo = new model.Selos(req.body, true);
			selo.save( function (err) {
				saveCb(err, res);
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

