$('.return').click(function(){
        window.location.href = 'profile.html';
});
$('.add-address').click(function(){
        $('.add-address').css('display','none');
        $('.address-message').css('display','block');
        $('.address').css('display','none');
        $('.update').css('display','none');
});

// 展示收货地址列表
function updateAddress(data){
        data.forEach(function(item){
                $(`
                        <li data-id="${ item.id }">
                                <div>
                                        <span class="name">${ item.receiveName }</span>
                                        <span class="num">${ item.receiveTel }</span>
                                        <p class="address-p">${ item.receiveAddress }</p>
                                </div>
                                <div>
                                        <span class="edit">编辑</span>
                                        <span>|</span>
                                        <span class="remove">删除</span>   
                                        <span class="default"><i class="iconfont icon-customdefault"></i></span>    
                                </div>
                        </li>
                `).appendTo('.address-list');
        });
        // 编辑
        $('.edit').click(function(){
                var id = $(this).closest('li').attr('data-id');
                var receiveName = $('.receive-name').val();
                var receiveTel = $('.a').val();
                var receiveAddress = $('#demo1').val() + $('.address-a').val();
                Cookies.set('id',id);
                $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: '/address/edit',
                        data: { eid:id },
                        success: function(result){
                                if(result.status === 200) {
                                        var name = result.data[0].receiveName;
                                        var tel = result.data[0].receiveTel;
                                        $('.save').css('display','none');
                                        $('.update').css('display','block');
                                        $('.add-address').css('display','none');
                                        $('.address-message').css('display','block');
                                        $('.address').css('display','none');
                                        $('.receive-name').val(name);
                                } else {
                                        alert(result.message);
                                }
                        }
                });
        });
        // 删除收货地址信息
        $('.remove').click(function(){
                var id = $(this).closest('li').attr('data-id');
                $.ajax({
                        type: 'post',
                        url: '/address/remove',
                        dataType: 'json',
                        data: { id:id },
                        success: function(result){
                                if(result.status === 200) {
                                        alert('删除成功');
                                        window.location.href = 'address.html';
                                }
                        }
                });
        });
        // 设置默认地址
        $('.default').click(function(){
                var id = $(this).closest('li').attr('data-id');
                // $(this).children('i').css('color','#ff3c25');
                $('.default i').css('color','#ccc');
                $(this).children('i').css('color','#ff3c25');
                $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: '/address/default',
                        data: { id:id },
                        success: function(result){
                               if(result.status === 200) {
                                        alert('默认地址设置成功');
                                        console.log(data);

                               }
                        }
                });
      });
}

// 修改收货地址信息
if($('.update').css('display','block')){
        $('.update').click(function(){
                var receiveName = $('.receive-name').val();
                var receiveTel = $('.a').val();
                var receiveAddress = $('#demo1').val() + $('.address-a').val();
                var id = Cookies.get('id');
                $.ajax({
                        type: 'post',
                        url: '/address/update',
                        dataType: 'json',
                        data: {
                                receiveName:receiveName,
                                receiveTel:receiveTel,
                                receiveAddress:receiveAddress,
                                id:id,
                        },
                        success: function(result){
                                if(result.status === 200)
                                {
                                        alert('保存成功');
                                        window.location.href = 'address.html';
                                }
                        }
                });
        });

}

// 新增收货地址
$('.save').click(function(){
        var receiveName = $('.receive-name').val();
        var receiveTel = $('.a').val();
        var receiveAddress = $('#demo1').val() + $('.address-a').val();
        $.ajax({
                type: 'post',
                url: '/address/add',
                dataType: 'json',
                data: {
                        receiveName: receiveName,
                        receiveTel: receiveTel,
                        receiveAddress: receiveAddress,
                },
                success: function(result){
                        if(result.status === 200){
                                alert('地址添加成功');
                                window.location.href = 'address.html';
                        }
                }
        });
});

// 动态请求展示收货地址信息
$.ajax({
        type: 'post',
        url: '/address/list',
        dataType: 'json',
        success: function(result){
                if(result.status === 200) {
                        updateAddress(result.data);
                }
        }
});

