var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');
var upload = require('../utils/upload');
var uploadPaths = require('../config').uploadPaths;
var path = require('path');
var file = require('../utils/file.js');

var router = express.Router();

router.post('/admin-list', function(req, res, next) {
        var { name, mId, sId, begin, pageSize } = req.body;
        query('CALL yhd_getProductByCondition(?,?,?,?,?);', [ name, mId, sId, begin, pageSize ])
                .then(results => res.send(httpResult.success({ total: results[0][0].total, list: results[1] })))
                .catch(message => res.send(httpResult.error(null, message)))
});

router.post('/banner/upload', upload.single('banner'), function(req, res, next) {
        // 把temp中的图片转移到product/banner中
        // 从temp中删除转移后的图片
        // 修改数据库
        // 把最终的路径返还客户端
        var { id } = req.body;
        var { temp, root, product: { banner } } = uploadPaths;
        var fileName = req.file.filename;
        var filePath = banner + fileName;
        var fromPath = path.join(temp, fileName);
        var toPath = path.join(root, banner, fileName);
        file.copy(fromPath, toPath)
                .then(() => file.unlink(fromPath))
                .then(() => query('CALL yhd_uploadProductBanner(?, ?);', [ filePath, id ]))
                .then(data => res.send(httpResult.success(filePath)))
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post('/banner/remove', function(req, res, next) {
        var { id, filePath, newBanner } = req.body;
        query('UPDATE `yhd_product` SET `banner` = ? WHERE `id` = ?', [ newBanner, id ])
                .then(() => file.unlink(path.join(uploadPaths.root, filePath)))
                .then(() => res.send(httpResult.success()))
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post('/remove', function(req, res, next) {
        var { id } = req.body;
        query('DELETE from `yhd_product` WHERE `id` = ?;', [ id ])
                .then(result => res.send(httpResult.success(result[0])))
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post('/add', function(req, res, next) {
        var { fid, name, avatar, price } = req.body;
        var { temp, root, product } = uploadPaths;
        var fromPath = path.join(temp, avatar);
        console.log(root);
        console.log(product);

	       var toPath = path.join(root, product.avatar, avatar);
         console.log(toPath);
         file.copy(fromPath, toPath)               // 从temp中拷贝到最终目录中
		       .then(() => file.unlink(fromPath))    // 从temp中删除临时文件
		         .then(() => query('CALL yhd_addProduct(?,?,?,?);', [fid, name, price, product.avatar + avatar]))
		           .then(results => results[0][0].result)
		             .then(data => {
                   console.log(data);
                   res.send(httpResult.success(data, '新增成功'))
                 })
		               .catch(message => res.send(httpResult.error(null, message)));
})
// 图片上传
router.post('/upload', upload.single('avatar'), function(req, res, next) {
	res.send(httpResult.success(req.file.filename));
});

module.exports = router;
