$(function(){   
    let ban=$('.banner');
    let lis=$('.photo>li');
    let lbds=$('.lbd>div');
    let back=$('.zuo');
    let forward=$('.you');
    let widths=ban.width();
    let t;
    let next=0;
    let now=0;
    let flag=true;
    t=setInterval(fn,3000);
    lbds.eq(0).addClass('hot');

    //自动播放
    function fn(){
        next++;
        if(next==lis.length){
            next=0;
        }
        
        lbds.eq(next).addClass('hot');
        lbds.eq(now).removeClass('hot');
        lis.eq(next).css('left',widths);  
        lis.eq(now).animate({left:-parseInt(widths)},'normal');
        lis.eq(next).animate({left:0},'normal',function(){
            flag=true;
        });
        now=next;
    }

    function fn1(){
        next--;
        if(next==-1){
            next=lbds.length-1;
        }
        
        lbds.eq(next).addClass('hot');
        lbds.eq(now).removeClass('hot');
        lis.eq(next).css('left',-parseInt(widths)+'px');  
        lis.eq(now).animate({left:parseInt(widths)},'normal');
        lis.eq(next).animate({left:0},'normal',function(){
            flag=true;
        });
        
        now=next;
    }

     //鼠标
     ban.mouseenter(function(){
        clearInterval(t);
    }).mouseleave(function(){
        t=setInterval(fn,3000);
    })

     //箭头
    back.click(function(){
        if(!flag){
            return;
        }
        flag=false;
        fn1();
    })
    forward.click(function(){
        if(!flag){
            return;
        }
        flag=false;
        fn();
    })

    //轮播点点击
    lbds.click(function(){
            let i=$(this).index();
            console.log(i)
            if(now==i){return};
            if(now<i){
                lbds.eq(i).addClass('hot');
                lbds.eq(now).removeClass('hot');
                lis.eq(i).css('left',-parseInt(widths)+'px');  
                lis.eq(now).animate({left:parseInt(widths)},'normal');
                lis.eq(i).animate({left:0},'normal');
            }else if(now>i){
                lbds.eq(i).addClass('hot');
                lbds.eq(now).removeClass('hot');
                lis.eq(i).css('left',-parseInt(widths)+'px');  
                lis.eq(now).animate({left:parseInt(widths)},'normal');
                lis.eq(i).animate({left:0},'normal');
            }
            now=next=i;
        })

    //jiantou
    let more=$('.zhezhao1>a');
    let mores=more.children('div');
    more.mouseenter(function(){
        $(this).css('border','1px solid #f99a18');
        mores.css({'color':'#f99a18','transform':'translateY(-36px)'})
    })
    more.mouseleave(function(){
        $(this).css('border','1px solid #fff');
        mores.css({'color':'#fff','transform':'translateY(0)'})
    })

    //product
    let promain=$('.promain');
    let t1;
    t1=setInterval(fn2,4000);
    function fn2(){
        var lefts=promain.eq(0).position().left;
        var lefts1=promain.eq(1).position().left;
        promain.eq(0).css('opacity',1);
        promain.eq(1).css('opacity',1);
        if(promain.eq(0).position().left==-1500){
            promain.eq(0).css('opacity',0);
            lefts=1500;
            
        }else if(promain.eq(1).position().left==-1500){
            promain.eq(1).css('opacity',0);
            lefts1=1500;
            
        }
        promain.eq(0).animate({left:lefts-300}, 1000);
        promain.eq(1).animate({left:lefts1-300}, 1000);
    }

    promain.mouseenter(function(){
        clearInterval(t1);
    })
    promain.mouseleave(function(){
        t1=setInterval(fn2,4000);
    })

    //news
    var news=$('.newsmain');
    var about=$('.about');
    let hh=window.innerHeight;
    $(window).scroll(function(){
        let hs=$('body').scrollTop();
        if(hh+hs>=news.offset().top+100){
            news.animate({left:0},2000);
        }
        if(hh+hs>=about.offset().top+20){
            about.animate({opacity:1},2000);
        }
    })

})