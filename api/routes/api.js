var express = require('express'),
	 router = express.Router(),
	 selosController = require('../controllers/selosController')();

var multer = require('multer');
var upload = multer({dest: 'api/images/selo'});

// --  GET /api
function api (req, res){
res.write('<h3>API</h3>');

res.send();
}

//Rotas
router.get('/api', api);
router.get('/api/selos', selosController.getSelos);
router.get('/api/selos/:nome', selosController.getSelo);

router.post('/api/selo', upload.single('logo'), selosController.postSelo);

router.put('/api/selo/:nome', upload.single('logo'), selosController.putSelo);
module.exports = router;
