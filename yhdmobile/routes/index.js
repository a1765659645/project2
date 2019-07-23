var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

router.get('/super', function(req, res, next) {
        query('SELECT * FROM `yhd_super_single`')
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
});
router.get('/understand', function(req, res, next) {
        query('SELECT * FROM `yhd_understand`')
                .then(results => {
			res.send(httpResult.success(results))	
		})
                .catch(message => res.send(httpResult.error(null, message)));
});

module.exports = router;
