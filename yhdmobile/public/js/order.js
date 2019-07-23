$('.return').click(function(){
        window.location.href = 'profile.html';
});

$(".order").find($("li")).each(function() {
        $(this).bind("click",
                function() {
                        var index = $(this).index();
                        var $this = $(this);
                        $this.addClass("active");
                        $this.siblings().removeClass("active");
                        $this.parent().siblings().removeClass("show");
                        $this.parent().siblings().eq(index).addClass("show");
                });
});

//根据用户名得到订单编号并显示相应的订单信息
var orderId = window.location.search.substr(1).split('?');
console.log(orderId);
$.ajax({
        type: 'post',
        dataType: 'json',
        url: '/order/orderDetail',
        data: { orderId: orderId },
        success: function(result) {
                if(result.status === 200) {
                        updateOrder(result.data);
                }
                else {
                        alert(result.message);
                }
        }
});
function updateOrder(data) {
        console.log(data);
        data.forEach(function(item) {
                $(`
                        <li>
                                <div>
                                        <img src="${ item.avatar }" alt="">
                                        <div>
                                                <p>${ item.name }</p>
                                                <p class="price-content">
                                                        <span class="price">￥${ item.price }</span>
                                                        <span class="count">共计${item.count}件商品</span>
                                                </p>
                                        </div>
                                </div>
                                <div>
                                        <span>${item.shoppingTime}</span>
                                        <div class="pay">取消订单</div>
                                </div>
                        </li>
                `).appendTo('.all>ul');
        })
        $('.pay').click(function(){
                alert(123)
        })
}