var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

router.post('/menu', function(req, res, next){
        var id = parseInt(req.body.id);
        query('SELECT * FROM `yhd_subcategory` WHERE `cid` = ?;',[ id ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
})

router.post('/list',function(req, res, next){
        var { pid } = req.body;
        console.log(pid);
        query('SELECT * FROM `yhd_product` WHERE `fid` = ?;',[pid])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
})

router.post('/detail',function(req, res, next){
        var id = parseInt(req.body.id);
        query('SELECT name,price,banner FROM `yhd_product` WHERE `id` = ?;',[id])
                .then(results => res.send(httpResult.success(results[0])))
                .catch(message => res.send(httpResult.error(null, err.message)));
})

module.exports = router;