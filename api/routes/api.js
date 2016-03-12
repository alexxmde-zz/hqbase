var express = require('express'),
	 router = express.Router(),
	 selosController = require('../controllers/selosController')();
	 roteiristasController = require('../controllers/roteiristasController')();
	
var multer = require('multer');
var upload = multer({dest: 'api/images/temp'});

// --  GET /api
function api (req, res){
res.write('<h3>API</h3>');

res.send();
}

//Rotas Selo
router.get('/api', api);
router.get('/api/selos', selosController.getSelos);
router.get('/api/selos/:nome', selosController.getSelo);

router.post('/api/selo', upload.single('logo'), selosController.postSelo);
router.put('/api/selo/:nome', upload.single('logo'), selosController.putSelo);


//Rotas Roteirista
router.get('/api/roteiristas', roteiristasController.getRoteiristas);
router.post('/api/roteirista', upload.single('foto'), roteiristasController.postRoteirista);
router.put('/api/roteirista/:nome', upload.single('foto'), roteiristasController.putRoteirista);

router.get('/api/roteirista/:nome', roteiristasController.getRoteirista);
module.exports = router;
