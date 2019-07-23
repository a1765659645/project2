$('.zc').click(function(){
        window.location.href = 'logon.html';
});
$('.message').click(function(){
        $('.pwd-login').css('display','none');
        $('.phone-login').css('display','block');
});
$('.phone-login .return').click(function(){
        $('.pwd-login').css('display','block');
        $('.phone-login').css('display','none');
});

// 获取验证码
$('.get-code').click(function() {
        myHttp({
                type: 'get',
                url: '/login/getcode',
                success: function(data) {
                        $('.get-code').text(data);
                }
        });
});

//更新显示phone信息
$('.phone-login .login').click(function() {
        if($('.get-code').text() !== $('.code').val().toUpperCase()) {
                alert('验证码错误。。。');
                return;
        }
        //ajax动态请求页面phone信息
        myHttp({
                type: 'post',
                url: '/login/phone',
                data:{
                        phone: $('.phone1').val(),
                        code: $('.code').val()
                },
                success:function(data) {
                        window.location.href = Cookies.get('target');
                }
        });
});

$('.pwd-login .login').click(function() {
        //ajax动态请求页面pwd信息
        myHttp({
                type: 'post',
                url: '/login/pwd',
                data:{
                        account: $('.phone').val(),
                        pwd: $('.pwd').val()
                },
                success:function(data) {
                        window.location.href = Cookies.get('target');
                }
        });
});