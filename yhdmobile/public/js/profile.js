$('.order').click(function(){
        window.location.href = 'order.html';
});
$('.home i ').click(function(){
        window.location.href = 'index.html';
});
$('.avatar i').click(function(){
        window.location.href = 'message.html';
});
myHttp({
        type:'post',
        url: '/profile/center',
        success: function(data) {
                $('.name').text(data);
        }
});
$('.address').click(function(){
        window.location.href = 'address.html';
});