window.onscroll = function() {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop > 10) {
		$('.header-box').css('top','-1.2rem');
		$('.logo').css('width','0rem');
		$('.address').css('width','0rem');
                $('.search-box>div i').css('color', 'red');
                $('.search-box').css('background','rgba(255,255,255,0.8)');
                $('.search-box').css('border','1px solid #c6c6c6');
	} else{
		$('.header-box').css('top','0rem');
		$('.logo').css('width','0.8rem');
		$('.address').css('width','0.8rem');
                $('.search-box>div i').css('color', 'white');
                $('.search-box').css('background','rgba(255,255,255,0)');
                $('.search-box').css('border','1px solid transparent');
	}
};
//动态显示轮播图
var index = 0; timer = null;
function updateBanner() {
        if(timer !== null) clearInterval(timer);
}

// 倒计时
function showCountDownTime() {
        var begin = new Date();
        var end = new Date(2019, 7, 1, 0, 0, 0);
        var timeSpan = Math.ceil((end - begin) / 1000);
        var day = Math.floor(timeSpan / (3600 * 24));
        var hours = ('00' + Math.floor(timeSpan / 3600 % 24)).substr(-2);
        var minutes = ('00' + Math.floor(timeSpan / 60 % 60)).substr(-2);
        var seconds = ('00' + timeSpan % 60).substr(-2);
        document.querySelector('.hour').innerText = hours;
        document.querySelector('.minute').innerText = minutes;
        document.querySelector('.second').innerText = seconds;
        if (timeSpan <= 0) {
                clearInterval(timer);
                return;
        }
}
var timer = setInterval(showCountDownTime, 1000);

function updateList(data){
        data.forEach(function(item) {
                $(`
                        <li>
                                <img src="${ item.avatar }" alt="">
                                <p>${ item.name }</p>
                                <span class="price"><span>￥</span>${ item.price }</span>
                                <span class="old-price"><span>￥</span>${ item.oldPrice }</span>
                        </li>
                `).appendTo('.super-pro');

        });
}
$('<li class="more">查看更多<i class="iconfont icon-more"></i></li>').appendTo('.super-pro');
$.ajax({
        url: '/index/super',
        type: 'get',
        dataType: 'json',
        success: function(result){
                if(result.status === 200) updateList(result.data);
                else alert(result.message);
        }
});
function updateUnderstand(data) {
        data.forEach(function(item){
                $(`
                        <li >
                                <img src="${ item.avatar }" alt="">
                                <span class="discount1">${ item.discount1 }</span><span class="discount2">${ item.discount2 }</span>
                                <p>${ item.name }</p>
                                <div>
                                        <span class="price"><span>￥</span>${ item.price }</span>
                                        <span class="found">${ item.found }</span>
                                </div>
                        </li>
                `).appendTo('.understand');     
        });
}

$.ajax({
        url: '/index/understand',
        type: 'get',
        dataType: 'json',
        success: function(result){
                if(result.status === 200) updateUnderstand(result.data);
                else alert(result.message);
        }
});

$('.oil').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',1);
});
$('.food').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',2);
});
$('.fresh').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',3);
});
$('.milk').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',4);
});$('.paper-part').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',5);
});
$('.hair').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',6);
});
$('.phone-part').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',7);
});
$('.pet').click(function(){
        Cookies.remove('id');
        window.location.href = 'subcategory.html';
        Cookies.set('id',8);
});
$('.personal').click(function(){
        window.location.href = 'profile.html';
});
$('.cart').click(function(){
        window.location.href = 'cart.html';
});

