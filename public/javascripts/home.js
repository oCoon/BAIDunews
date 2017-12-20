//轮播导航
var mySwiper = new Swiper('#topNav', {
	freeMode: true,
    freeModeMomentumRatio: 0.5,
    slideToClickedSlide:true,
    // spaceBetween: 0,
    slidesPerView: 'auto'
    // centeredSlides:true
});
$('.swiper-slide').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
})

//渲染整个页面
function getData(){
    var json = {
        Class:'推荐'
    }
    $.ajax({
        url:'/getcurnews',
        type:'post',
        data:json,
        success:function(data){
           
            xuanR(data);
        }
    })
    //渲染选项卡的内容
    $('nav').on('click','a',function(){
        // console.log($(this).text())
        $(this).unbind('click',function(){

        })
         mySp = null;
        $('main .swiper-wrapper').text('');
        $('main .other').text('');
        var cur = $(this).text();
        var json = {
            Class : cur
        }
        $.ajax({
            url:'/getcurnews',
            type:'post',
            data:json,
            success:function(data){
                               
                xuanR(data);
            }
        })
    })
    
}
// console.log(2)
getData()
function xuanR(data){

    var ary1 = [];
    var ary2 = [];
    for(var i = 0;i<data.length;i++){
        if(data[i].swp === 1){
            
            ary1.push(data[i])
        }else{
            
            ary2.push(data[i])
        }
    }
    console.log(ary1);
    console.log(ary2);
    //写入轮播图
    if(ary1 !== []){
        var lunbo = $('<div></div>').addClass('swiper-container').addClass('lunbo');
        lunbo.appendTo('main');
        var swiperWrapper = $('<div></div>').addClass('swiper-wrapper');
        swiperWrapper.appendTo(lunbo);
        $('<div></div>').addClass('swiper-pagination').appendTo(lunbo);
       for(var i = 0;i<ary1.length;i++){
        var myDiv = $('<div></div>').addClass('swiper-slide');
        
       
        
        myDiv.appendTo(swiperWrapper);
        
        $('<img />').attr('src',ary1[i].imgurl).appendTo(myDiv);
        $('<span></span>').text(ary1[i].title).appendTo(myDiv);
       }
        var mySp = new Swiper('.lunbo',{
        autoplay:true , //自动播放   可以设置停留时间
        autoplay:{
            delay:2000,
            disableOnInteraction: false
        },
        loop:true,
        // autoplayDisableOnInteraction:false,
        pagination:{
            el:'.swiper-pagination',
            hideOnClick:true,
            clickable:true
        }
    })
    }
    //写入普通新闻
    if(ary2 !== []){
        var other =  $('<div></div>').addClass('other').appendTo('main')
        for(var i = 0;i<ary2.length;i++){
            if(Number(ary2[i].source)){
                var mod2 = $('<div></div>').addClass('mod2');
                $('<p></p>').text(ary2[i].title).appendTo(mod2);
                var container = $('<div></div>').addClass('container');
                $('<img />').attr('src',ary2[i].imgurl).appendTo(container);
                
                $('<span></span>').text(ary2[i].source).appendTo(container);
                container.appendTo(mod2)
                mod2.appendTo(other);
            }else{
                var mod = $('<div></div>').addClass('mod');
                var imgContainer = $('<div></div>').addClass('imgContainer');
                var texContainer = $('<div></div>').addClass('texContainer');
                imgContainer.appendTo(mod);
                texContainer.appendTo(mod);
                $('<img />').attr('src',ary2[i].imgurl).appendTo(imgContainer);
                $('<span></span>').text(ary2[i].title).appendTo(texContainer);
                var oP = $('<p></p>');
                oP.appendTo(texContainer)
                $('<i></i>').text(ary2[i].source).appendTo(oP);
                mod.appendTo(other);
                var oldTime = new Date(ary2[i].date);
                var nowTime = new Date();
                var m =  nowTime.getTime()-oldTime.getTime();
                var n = m/1000/3600/24;
                if(n>=1){
                    var a = Math.floor(n);
                    $('<i></i>').text(`${a}天前`).appendTo(oP);
                }else{
                    $('<i></i>').text(`今天`).appendTo(oP);
                }

            }
            

        }
       
    }


    
}
