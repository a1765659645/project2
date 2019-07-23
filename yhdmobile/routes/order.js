var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

router.post('/orderDetail', function(req, res, next) {
        var orderId = req.body.orderId;
        console.log(orderId);
        query('CALL yhd_orderDetail(?);',[orderId])
                .then(result => res.send(httpResult.success(result[0])))
                .catch( message => res.send(httpResult.error(null, message)));
});

router.post('/orderlist', function(req, res, next) {
	var name = req.session.name;
	console.log(name);
	query('CALL yhd_orderlist(?);',[name])
		.then(result => res.send(httpResult.success(result[0])))
		.catch( message => res.send(httpResult.error(null, message)));
});



router.post('/pay', function(req, res, next) {
	var id = req.body.id;
	query('UPDATE `yhd_order` SET `pay` = 1 WHERE `id` = ?;', [id] )
		.then(result => res.send(httpResult.success(result[0])))
		.catch( message => res.send(httpResult.error(null, message)));
});

router.post('/remove', function(req, res, next) {
	var removeId = req.body.removeId;
	console.log(removeId);
	query('CALL yhd_removeOrder(?);',[removeId])
		.then(result => {
			console.log(result);
			res.send(httpResult.success(result[0]))
		})
		.catch( message => res.send(httpResult.error(null, message)));
})

module.exports = router;