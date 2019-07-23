$('.footer li').click(function(){
        $('.footer li').children('span.noact').css('display', 'inline-block');
        $('.footer li').children('span.active').css('display', 'none');
        $('.footer li').removeClass('active');
        $(this).addClass('active');
        $(this).children('span.noact').css('display', 'none');
        $(this).children('span.active').css('display', 'inline-block');
        $('.category-title').text($(this).children('p').text());


});
$('.header .btn-return').click(function(){
        window.location.href = 'index.html';
})

// 更新显示二级分类
function updateSubcategory(data){
        data.forEach(function(item){
                $(`
                        <li data-id="${ item.id }" class="swiper-slide lis">
                                <span>${ item.name }</span>
                        </li>
                `).appendTo('.sub');
        })


        $('.sub>.lis').eq(0).addClass('active');
        var pid = $('.sub li').attr('data-id')
        Cookies.set('pid',pid);
        $.ajax({
                url: '/sub/list',
                dataType: 'json',
                type: 'post',
                data: { pid:pid },
                success: function(result){
                        if(result.status === 200) updateProduct(result.data);
                        else alert(result.message);
                }
        });
        $('.sub li').click(function(){
                var pid = $(this).attr('data-id')
                Cookies.set('pid',pid);
                $(this).addClass('active').siblings().removeClass('active');
                $.ajax({
                        url: '/sub/list',
                        dataType: 'json',
                        type: 'post',
                        data: { pid:pid },
                        success: function(result){
                                if(result.status === 200) updateProduct(result.data);
                                else alert(result.message);
                        }
                });
        });
        // 更新显示商品列表
        function updateProduct(data){
                $('ul.subProduct').empty();
                data.forEach(function(item){
                        $(`
                               <li data-id="${ item.id }">
                                        <a href="detail.html?id=${ item.id }"><img class="left" src="${item.avatar}" alt=""></a>
                                        <div class="right">
                                                <div>
                                                        <span class="zy">${ item.zy }</span>
                                                         <span class="name">${ item.name }</span>
                                                </div>
                                                <div>
                                                        <span class="price"><span>￥</span>${ item.price }</span>
                                                        <i class="iconfont icon-cart"></i>
                                                </div>
                                        </div>
                                       
                               </li> 
                        `).appendTo('.subProduct');
                });
        }

 }


        var id = Cookies.get('id');
        // 更新显示二级菜单
        $.ajax({
                url: '/sub/menu',
                dataType: 'json',
                data: {id: id},
                type: 'post',
                success: function(result){
                        if(result.status === 200) updateSubcategory(result.data);
                        else alert(result.message);
                }
        });


