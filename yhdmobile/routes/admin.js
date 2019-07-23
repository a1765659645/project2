var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

router.get('/sub', function(req, res, next) {
        query('SELECT * FROM `yhd_subcategory`')
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post('/login', function(req, res, next) {
	var { name, pwd } = req.body;
	query('SELECT `pwd` FROM `yhd_admin` WHERE `name` = ?;', [ name ]) // 回来的结果是一个数组
	 // results = [{ pwd: ??? }] 或者是  []
	.then(results => {
		if(results.length > 0) {
			if(results[0].pwd === pwd) res.send(httpResult.success());
			else res.send(httpResult.failure(null, '密码错误..'));
		} else res.send(httpResult.failure(null, '用户名不存在..'));
	})
	.catch(message => res.send(httpResult.error(null, err.message)));
});

router.post('/password', function(req, res, next) {
	var { name, pwd, newPwd } = req.body;
	query('CALL yhd_password(?,?,?);', [ name, pwd, newPwd ])
		.then(results => results[0][0].result)
		.then(results => {
			if(results === '')  res.send(httpResult.success(null, '密码修改成功，请重新登录'));
			else res.send(httpResult.failure(null, results));
		})
		.catch(message => res.send(httpResult.error(null, message)));
});

module.exports = router;
