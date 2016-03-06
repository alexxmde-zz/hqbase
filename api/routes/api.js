var express = require('express'),
	 router = express.Router(),
	 selosController = require('../controllers/selosController')();

// --  GET /api
function api (req, res){
res.write('<h3>API</h3>');

res.send();
}

//Rotas
router.get('/api', api);

router.get('/api/selos', selosController.getSelos);
router.get('/api/selos/:nome', selosController.getSelo);

router.post('/api/selos', selosController.postSelo);

module.exports = router;
