// ---------------可以隐藏的页眉------------
$(document).ready(function (){
    $(".clear1").eq(0).click(function (){
        $("#header").css("opacity","0").css("display","none");
    });
});

//---------------带Cookie的选择地址-----------------
$(document).ready(function (){
    if(document.cookie.split("=")[1]==null){//如果cookie的值为空，默认显示北京
        $("#top-txt").text("北京");
    }else{
        $("#top-txt").text(document.cookie.split("=")[1]);//否则显示cookie里的值
    }
    for(var i=0;i<$("#location-box div a").length;i++){//此处代码还可以优化！
        if($("#top-txt").text()==$("#location-box div a").eq(i).text()) {
            $("#location-box div a").eq(i).addClass("backRed");
        }
        else{
            $("#location-box div a").eq(i).removeClass("backRed");
        }
    }//如果是在div上加类名，那么清除的时候可以用 $(this).addClass("backRed").siblings().removeClass("backRed");
    $("#location-box div a").click(function (){
        $("#location-box div a").removeClass("backRed");
        $(this).addClass("backRed");
        document.cookie="load="+$(this).text()+"";
        $("#top-txt").text(document.cookie.split("=")[1]);
    });
});


//---------------商品分类列表-----------------
$(document).ready(function (){
    var i=0;//保存当前hover的那个li的索引值。
    $("#classify li").hover(function (){
        $(this).addClass("classify-li").siblings().removeClass("classify-li");
        $(".classify-show-li").eq($(this).index()).css("display","block");
        $("#classify-show").css("display","block");
    },function (){
        $(".classify-show-li").eq($(this).index()).css("display","none");
        $("#classify li").removeClass("classify-li");
        i=$(this).index();
        $("#classify-show").css("display","none");
    });
    $("#classify-show").hover(function (){
        $(this).css("display","block");
        $(".classify-show-li").eq(i).css("display","block");
        $("#classify li").eq(i).addClass("classify-li");
    },function () {
        $("#classify-show").css("display","none");
        $(".classify-show-li").css("display","none");
        $("#classify li").eq(i).removeClass("classify-li");
    });
});
// ---------------促销、公告的Tab切换------------------

$(document).ready(function () {
    $("#Tab-btn1").mouseover(function () {
        $("#Tab-title1").css("display","block");
        $("#Tab-title2").css("display","none");
        $("#red-hr").css("left",-2+"px");
    });
    $("#Tab-btn2").mouseover(function () {
        $("#Tab-title2").css("display","block");
        $("#Tab-title1").css("display","none");
        $("#red-hr").css("left",50+"px");
    })
});

//-----------------京东秒杀倒计时--------------------
$(document).ready(function () {
    setInterval(function () {
        var newTime=new Date();
        var time = newTime.getTime()%(1000*60*60*24);
        var i = Math.ceil(time/(2*1000*60*60));
        var one=i*2*1000*60*60;
        var endTime=new Date(one-time);
        var Hour=parseInt(endTime/(60*60*1000));
        var oHour=endTime%(60*60*1000);
        var Minute=parseInt(oHour/(60*1000));
        var oMiute=oHour%(60*1000);
        var Second=parseInt(oMiute/1000);
        $(".box").eq(0).text("0"+Hour);
        if(Minute<10){
            $(".box").eq(1).text("0"+Minute);
        }else{
            $(".box").eq(1).text(Minute);
        }
        if(Second<10){
            $(".box").eq(2).text("0"+Second);
        }else{
            $(".box").eq(2).text(Second);
        }
    },1000);
});

// ---------------京东秒杀-无缝滚动------------------
$(document).ready(function () {
    var late=-1000;
    $("#seckill-content").hover(function () {
        $(".seckill-btn").css("display","block");
    },function () {
        $(".seckill-btn").css("display","none");
    });
    $("#seckill-btn-left").click(function (){
        late+=1000;
        if(late>0){
            return false;
        }
        $("#seckill-list").css("transform","translateX("+late+"px)").css("transition","all 0.6s");
            if(late==0){
                setTimeout(function () {
                    late=-4000;
                    $("#seckill-list").css("transform","translateX("+late+"px)").css("transition","all 0s")
                },600);
            }
    });
    $("#seckill-btn-right").click(function (){
        late+=-1000;
        if(late<-5000){
            return false;
        }
        $("#seckill-list").css("transform","translateX("+late+"px)").css("transition","all 0.6s");
            if(late==-5000){
                setTimeout(function () {
                    late=-1000;
                    $("#seckill-list").css("transform","translateX("+late+"px)").css("transition","all 0s")
                },600);
            }
    })
});

// ----------头部可以显示隐藏的搜索栏、及左右侧边栏------------

$(document).ready(function () {
   $(window).scroll(function (){
       if($(window).scrollTop()>700){
           $("#top-show").css("top","0");
           $("#toolbar-box").css("display","block");
       }else{
           bool=false;
           $("#top-show").css("top",-50+"px");
       }
       if ($(window).scrollTop()>$(".sidebar-left").eq(0).offset().top-50){
           $("#sidebar-left").css("opacity",1);
       }else{
           $("#sidebar-left").css("opacity",0);
       }
       var num=0;
       for (var x=0;x<$(".sidebar-li").length;x++){
           if($(window).scrollTop()>$(".sidebar-left").eq(x).offset().top-200){
               num=x;
           }
           $(".sidebar-li").eq(x).removeClass("backColor");
       }
       $(".sidebar-li").eq(num).addClass("backColor");
   });
   var bool=true;
    $("#toolbar-box-show-btn").click(function (){
        if(bool){
            $("#toolbar-box").css("right",0);
            bool=false;
        }else{
            $("#toolbar-box").css("right",-260+"px");
            bool=true;
        }
    });
    $("#toolbar-box-hidden-btn").click(function () {
        bool=true;
        $("#toolbar-box").css("right",-260+"px");
    });
    // -----右边返回顶部按钮-----
    $("#go-Top").click(function () {
        $(window).scrollTop(0);
    });
    // -----左边返回顶部按钮-----
    $("#go-Top2").click(function (){
        var speed=0;
        var time;
        speed=$(window).scrollTop()/30;
        time=setInterval(function () {
            if ($(window).scrollTop()<=0){
                clearInterval(time);
            }
            $(window).scrollTop($(window).scrollTop()-speed);
        },1);
    });
    $("#sidebar-left-list li").click(function () {
        var i=$(this).index();
        $(window).scrollTop($(".sidebar-left").eq(i).offset().top-50);
    })

});

// -----------主体内容部分底部logo无缝滚动---JS---------------
$(document).ready(function () {
    var late=-570;
    $(".life-box-left-btn").click(function (){
        late+=570;
        if(late>0){
            return false;
        }
        var i=$(this);
        $(this).siblings(".life-box-brand").find("ul").css("transform","translateX("+late+"px)").css("transition","all 0.6s");
        if(late==0){
            setTimeout(function () {
                late=-1140;
                $(i).siblings(".life-box-brand").find("ul").css("transform","translateX("+late+"px)").css("transition","all 0s")
            },600);
        }
    });
    $(".life-box-right-btn").click(function (){
        late+=-570;
        if(late<-1710){
            return false;
        }
        var i=$(this);
        $(this).siblings(".life-box-brand").find("ul").css("transform","translateX("+late+"px)").css("transition","all 0.6s");
        if(late==-1710){
            setTimeout(function () {
                late=-570;
                $(i).siblings(".life-box-brand").find("ul").css("transform","translateX("+late+"px)").css("transition","all 0s")
            },600);
        }
    })
});


//--------------排行榜TAB切换-------------
$(document).ready(function () {
    $("#ranking-list").find("a").hover(function () {
        i=$(this).index();
       $(".ranking-list-img").css("display","none");
       $(".ranking-list-img").eq(i).css("display","block");
       $("#ranking-list-hr").css("transform","translateX("+i*78+"px)");
    });
});


// -------------话费、机票、酒店、游戏--------------

$(document).ready(function () {
    $(".buy").hover(function () {
        $(".buy-a").css("top","-40px");
        $("#buy-hidden").css("top","30px");
        $(".buy").find("div").css("display","none");
        $(this).find("div").css("display","block");
        var i=$(this).index();
        $(".service_pop").css("display","none");
        $(".service_pop").eq(i).css("display","block");
    });
    $("#clear").click(function () {
        $("#cover-li").css("display","block");
        $(".buy-a").css("top",0);
        $("#buy-hidden").css("top","210px");
        $(".buy div").css("display","none");
    });
    $("#cover-li").hover(function () {
        $(".buy-a").eq(3).find("p").addClass("color-text");
    },function () {
        $(".buy-a").eq(3).find("p").removeClass("color-text");
        $(this).css("display","none");
    });
});

//------------------ 还没逛够-------------------

$(function () {
    $("#current").css("height","1300px");
    var i=1;
    $(window).scroll(function () {
        var doc=$("#current").offset().top+$("#current").height();
        var scrTop=$(window).scrollTop();
        var win=$(window).height();
        if(doc-scrTop-win<400){
            console.log(doc-scrTop-win);
            if(i<5){
                i++;
                $("#current").css("height",i*1300+"px");
            }
        }

    })
});














