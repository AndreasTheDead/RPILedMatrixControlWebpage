var express = require('express');
var router = express.Router();
const matrix = require('../bin/matrix')

/* GET home page. */
router.get('/info', function(req, res, next) {
    res.send('Generall API Informations')
});

router.get('/', function(req, res, next) {
    res.render('apiinformations', { title: 'API Infos' });
});

router.get('/text', function(req, res, next) {
    res.send('Generall API Informations')
});

module.exports = router;
