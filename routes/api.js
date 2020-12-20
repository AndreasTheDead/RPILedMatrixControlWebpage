var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/info', function(req, res, next) {
    res.send('Generall API Informations')
});

router.get('/', function(req, res, next) {
    res.render('apiinformations', { title: 'API Infos' });
});

module.exports = router;
