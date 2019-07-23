var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

var isdef = null;

query('SELECT * FROM `yhd_address`;')
        .then(result => isdef = result)
        .catch(message => console.log(message));


router.post('/list',function(req, res, next) {
        var name = req.session.name;
        query('SELECT * FROM `yhd_address` WHERE `name` = ?;',[ name ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
});
router.post('/remove',function(req, res, next) {
        var id = parseInt(req.body.id);
        query('DELETE FROM `yhd_address` WHERE `id` = ?;',[ id])
                .then( results => {
                        if(results.affectedRows === 1) res.send(httpResult.success());
                        else res.send(httpResult.failure(null, message));
                })
                .catch(message => res.send(httpResult.error(null, message)));
});
router.post('/add',function(req, res, next) {
        var receiveName =req.body.receiveName;
        var receiveTel = req.body.receiveTel;
        var receiveAddress = req.body.receiveAddress;
        var name = req.session.name;
        query('INSERT `yhd_address` (`name`,`receiveName`,`receiveTel`,`receiveAddress`) VALUES (?,?,?,?);',
                [name, receiveName, receiveTel, receiveAddress]
        )
                .then(results => {
                        if(results.affectedRows === 1) res.send(httpResult.success(results.insertId, '地址添加成功 '));
                        else res.send(httpResult.failure(null, '地址添加失败'));
                })
                .catch(message => res.send(httpResult.error(null, message)));
});
router.post('/update',function(req, res, next) {
        var receiveName =req.body.receiveName;
        var receiveTel = req.body.receiveTel;
        var receiveAddress = req.body.receiveAddress;
        var id = parseInt(req.body.id);
        console.log(id);
        query('UPDATE `yhd_address` SET `receiveName` = ? ,`receiveTel` = ? ,`receiveAddress` = ? WHERE `id` = ?;',
                [ receiveName, receiveTel, receiveAddress, id ]
        )
                .then(results => {
                        if(results.affectedRows === 1) res.send(httpResult.success(null, '地址更新成功 '));
                        else res.send(httpResult.failure(null, '地址更新失败'));
                })
                .catch(message => res.send(httpResult.error(null, message)));
});
router.post('/edit',function(req, res, next){
        var eid = req.body.eid;
        console.log(eid);
        query('SELECT * FROM `yhd_address` WHERE `id` = ?;',[ eid ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
});
router.post('/default',function(req, res, next) {
        var id  =parseInt(req.body.id);
        var name = req.session.name;
        query('CALL yhd_setdefault(?,?);',[ name,id ])
                .then(results => res.send(httpResult.success(null, '默认地址设置成功')))
                .catch(message => res.send(httpResult.error(null, message)));
 });
 router.post('/temp', function(req, res, next) {
	 var id = req.body.id;
	 query('SELECT * FROM `yhd_address` WHERE `id` = ?;',[ id ])
		.then(results => res.send(httpResult.success(results)))
		.catch(message => res.send(httpResult.error(null, message)));
 });
 
 router.post('/isdef', function(req, res, next) {
	 query('SELECT * FROM `yhd_address` WHERE `isDef` = 1;')
	 		.then(results => res.send(httpResult.success(results)))
	 		.catch(message => res.send(httpResult.error(null, message)));
 })

module.exports = router;