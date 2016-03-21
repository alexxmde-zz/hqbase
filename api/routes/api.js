var express = require('express'),
	 router = express.Router(),
	 selosController = require('../controllers/selosController')(),
	 roteiristasController = require('../controllers/roteiristasController')(),
	 desenhistasController = require('../controllers/desenhistasController')();
	 hqController = require('../controllers/hqController')();
	
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

//Rotas Desenhistas
router.get('/api/desenhistas', desenhistasController.getDesenhistas);
router.get('/api/desenhista/:nome', desenhistasController.getDesenhista);
router.put('/api/desenhista/:nome', upload.single('foto'), desenhistasController.putDesenhista);
router.post('/api/desenhista', upload.single('foto'), desenhistasController.postDesenhista);

//Rotas Hq
router.post('/api/hq', upload.single('capa'), hqController.postHq);
router.get('/api/hqs', hqController.getHqs);
router.get('/api/hq/:id', hqController.getHq);

module.exports = router;
