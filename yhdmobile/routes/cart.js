var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

router.post('/center',function(req,res,next) {
        var data = req.session.name;
        res.send(httpResult.success(data));
});
// 加入购物车
router.post('/add', function(req, res, next){
        var name = req.session.name;
        var pid = parseInt(req.body.pid);
        var count = 1;
        query('CALL yhd_addProductToCart(?,?,?);',[ name,pid,new Date() ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
})

//购物车商品展示
router.post('/list', function(req, res, next) {
        query('CALL yhd_getCartInfo(?);',[ req.session.name ])
                .then(result => res.send(httpResult.success(result[0])))
                .catch(message => res.send(httpResult.error(null, message)));
});

//购物车商品数量加减
router.post('/increase', function(req, res, next){
        var id = parseInt(req.body.id);
        query('UPDATE `yhd_cart` SET `count` = `count` + 1, `shoppingTime` = ? WHERE `id` = ?;', [ new Date(), id ])
                .then(result => {
                        if(result.affectedRows === 1) res.send(httpResult.success());
                        else res.send(httpResult.failure(null, '新增商品数量失败'));
                })
                .catch(message => res.send(httpResult.error(null, message)));
});
router.post('/decrease', function(req, res, next){
        var id = parseInt(req.body.id);
        query('UPDATE `yhd_cart` SET `count` = `count` - 1, `shoppingTime` = ? WHERE `id` = ?;', [ new Date(), id ])
                .then(result => {
                        if(result.affectedRows === 1) res.send(httpResult.success());
                        else res.send(httpResult.failure(null, '新增商品数量失败'));
                })
                .catch(message => res.send(httpResult.error(null, message)));
});

// 删除购物车商品
router.post('/remove', function(req, res, next) {
        var ids = JSON.parse(req.body.ids);
        query('DELETE FROM `yhd_cart` WHERE `id` IN (?);', [ ids ] )
                .then(result => {
                        if(result.affectedRows === ids.length) res.send(httpResult.success());
                        else res.send(httpResult.failure(null, '删除商品失败'));
                })
                .catch(message => res.send(httpResult.error(null, message)));
})

// 结算功能
router.post('/settlement', function(req, res, next) {
        var account = parseInt(req.body.account);
        var ids = JSON.parse(req.body.ids).join(',');
        var name = req.session.name;
        query('CALL yhd_settlement(?,?,?,?);', [ ids, account, new Date(), name ])
                .then(result => res.send(httpResult.success(result)))
                .catch(message => res.send(httpResult.error(null, message)));
});

module.exports = router;