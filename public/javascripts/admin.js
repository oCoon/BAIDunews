$('.mymenu2 li').click(function(){
    // $('mytuijian').val($(this).text())
    var str = $(this).text();
    // console.log(str);
    // console.log($('.mytuijian'))
    $('.mytuijian').val(str);
})
$('.mymenu1 li').click(function(){
    // $('mytuijian').val($(this).text())
    var str = $(this).text();
    // console.log(str);
    // console.log($('.mytuijian'))
    $('.myswp').val(str);
})
$('.tijiao').click(function(){
    var json = {
        title:$('.title input').val(),
        imgurl:$('.imgurl input').val(),
        source:$('.source input').val(),
        date:$('.date input').val(),
        swp:$('.swp input').val(),
        tuijian:$('.tuijian input').val()
    };
    console.log(json)
    $.ajax({
        url:'/insertone',
        type:'post',
        data:json,
        success:function(alldata){
            $('.mytbody').text('');
            getData();
            if(alldata.state === 'ok'){
                alert(alldata.message);
                $('.title input').val('');
                $('.imgurl input').val('');
                $('.source input').val('');
                $('.date input').val('');
                $('.swp input').val('');
                $('.tuijian input').val('');
                
            }
        },
        error:function(){
            console.log(err)
        }
    })
})
$('.gengxin').click(function(){
    var json = {
        title:$('.title input').val(),
        imgurl:$('.imgurl input').val(),
        source:$('.source input').val(),
        date:$('.date input').val(),
        swp:$('.swp input').val(),
        tuijian:$('.tuijian input').val(),
        id:$('.span1').text()
    };
    $.ajax({
        url:'/update',
        type:'post',
        data:json,
        success:function(alldata){
            $('.mytbody').text('');
            getData();
            if(alldata.state === 'ok'){
                alert(alldata.message);
                $('.title input').val('');
                $('.imgurl input').val('');
                $('.source input').val('');
                $('.date input').val('');
                $('.swp input').val('');
                $('.tuijian input').val('');
                $('.span1').text('');
                
                
            }
        },
        error:function(){
            console.log(err)
        }
    })
})

function getData(){
    $.ajax({
        url:'/getdata',
        type:'get',
        success:function(data){
            console.log(data[0].id);
            data.forEach((cur,ind) => {
                var myTr = $('<tr></tr>');
                var str = cur.date.substring(0,10)
                $('<td></td>').text(cur.id).appendTo(myTr)
                $('<td></td>').text(cur.tuijian).appendTo(myTr)
                $('<td></td>').text(str).appendTo(myTr)
                $('<td></td>').text(cur.title).appendTo(myTr)
                $('<td></td>').text(cur.imgurl).appendTo(myTr)
                $('<td></td>').text(cur.source).appendTo(myTr)
                $('<td></td>').text(cur.swp).appendTo(myTr)
                $('<span></span>').text('删除').addClass('mySpan').addClass('danger'). appendTo( $('<td></td>').appendTo(myTr))
                myTr.appendTo($('.mytbody'));
                           
            });            
            //加背景颜色
            for(var n =0;n<$('.mytbody tr').length;n++){
                if(n%4 === 0){
                    $('.mytbody tr').eq(n).addClass('active');
                }else if(n%4 === 3){
                    $('.mytbody tr').eq(n).addClass('success');
                }else if(n%4 === 2){
                    $('.mytbody tr').eq(n).addClass('warning');
                }else{
                    $('.mytbody tr').eq(n).addClass('danger');
                } 
            }
            //点击内容添加到左侧
            $('.mytbody tr').on('click',function(){
                $('.title input').val($(this).find('td').eq(3).text());
                $('.imgurl input').val($(this).find('td').eq(4).text());
                $('.source input').val($(this).find('td').eq(5).text());
                $('.date input').val($(this).find('td').eq(2).text());
                $('.swp input').val($(this).find('td').eq(6).text());
                $('.tuijian input').val($(this).find('td').eq(1).text());
                $('.gengxin span').text($(this).find('td').eq(0).text())
                // console.log($(this).find('td').eq(0).text())
            })
            //点击删除
            $('.mySpan').click(function(e){
                window.event? window.event.cancelBubble = true : e.stopPropagation();
                // window.confirm('确定删除此项吗？')
                var res = window.confirm('确定删除此项吗？');
                var val = $(this).parent().siblings().eq(0).text();
                console.log(val);
                if(res){
                    var json = {
                        id:val
                    }
                    
                    $.ajax({
                        url:'/delete',
                        type:'post',
                        data:json,
                        success:function(alldata){
                            $('.mytbody').text('');
                            getData();
                             if(alldata.state === 'ok'){
                            alert(alldata.message);
                            
                            }
                        }
                    })
                
                }
                
               
            })   
            
            
            
        }
    })
}
getData();