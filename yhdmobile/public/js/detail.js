$('.return').click(function(){
        window.location.href = 'subcategory.html';
});
// 从当前浏览器url中解析出传来的id
var params = window.location.search.substr(1).split('?');
var id = parseInt(params[0].split('=')[1]);
var pid = id;
// 发送ajax展示商品信息
function updateDetail(data) {
        $('.product')
                .append($(`<span class="price">￥<span>${ data.price }</span><span>`))
                .append($(`<p class="name">${ data.name }</p>`));
        data.banner.split(',').forEach(function(item){
                $(`
                        <div class="swiper-slide">
                                <img src="${ item }" />
                        </div>
                `).appendTo('.banner .swiper-wrapper');
        });
        var mySwiper = new Swiper ('.banner', {
                loop: false, // 循环模式选项

                autoplay: true,//可选选项，自动滑动

                // 如果需要分页器
                pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                },
        });
}
$.ajax({
        url: '/sub/detail',
        dataType: 'json',
        type: 'post',
        data: { id:id },
        success: function(result){
                if(result.status === 200) updateDetail(result.data);
                else alert(result.message);
        }
});
// 点击加入购物车
$('.cart').click(function(){
        myHttp({
                type: 'post',
                url: '/cart/add',
                data: { pid:pid },
                success: function(result){
                        alert('成功加入购物车');
                        window.location.href = 'cart.html';
                        Cookies.set('id',pid);
                }
        });
});