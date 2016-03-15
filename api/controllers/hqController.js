var model = require('../config/schema');

var hqController = function () {

	return {
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
