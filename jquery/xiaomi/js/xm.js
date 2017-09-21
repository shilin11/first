$(function(){
    $('.banner-left>.li1').mouseenter(function(){
        $(this).children('ul').addClass('block').removeClass('none');
    }).mouseleave(function(){
        $(this).children('ul').addClass('none').removeClass('block');
    });

    //banner
    var num=0;
    var t=setInterval(function(){fn('r')}, 3000);
    var photo=$('.bannertu>a');
    var length=photo.length;    
    //箭头
    $('.banner-right2').click(function(){
        fn('r');
    })
    $('.banner-right1').click(function(){
        fn('l');
    })
    //自动轮播
    function fn(ele){
        if(ele=='r'){
            num++;
            if(num==length){
                num=0;
            } 
        }else if(ele=='l'){
            num--;
            if(num==-1){
                num=length-1;
            }
        }
    	
        photo.css({'opacity':0.1,'zIndex':0});
        $('.banner-right3>li').css('background','#17171c');
        $(`.bannertu a:eq(${num})`).animate({opacity:1}).css({'zIndex':1});
        $(`.banner-right3 li:eq(${num})`).css('background','#7c7c81');
    }
    // 轮播点
    $('.banner-right3>li').click(function(){
        let index=$(this).index();
        photo.css({'opacity':0.1,'zIndex':0});
        $(`.bannertu a:eq(${index})`).animate({opacity:1}).css({'zIndex':1});
        $('.banner-right3>li').css('background','#17171c');
        $(this).css('background','#7c7c81');
        num=index;
    })
     //鼠标放上去暂停
     $('.banner').mouseenter(function(){
        clearInterval(t);
     })
     $('.banner').mouseleave(function(){
        t=setInterval(function(){fn('r')}, 3000);
     })
     //浏览器缩小
     $(window).blur(function(){
        clearInterval(t);
     })
     $(window).focus(function(){
        t=setInterval(function(){fn('r')}, 3000);
     })

    //nav
    $('.navidw').mouseenter(function(){
        $('.navi').css('borderBottom','1px solid #e0e0e0');
        $('.down1').css('height','230px');
    })
    $('.navidw>li').mouseenter(function(){
        let index1=$(this).index();
        $('.down1').css('display','none');
        $('.down1:eq('+index1+')').css('display','block');
    })
    $('.navidw').mouseleave(function(){
        $('.navi').css('borderBottom','none');
        $('.down1').css('height','0');
    })
    $('.navidw>li').mouseleave(function(){
        let index1=$(this).index();
        $('.down1').css('display','none');
        $('.down1:eq('+index1+')').css('display','block');
    })
    //购物车
    $('.head-right2').mouseenter(function(){
        $('.head-right23').css('height','100px');
        $('.head-right23m').css({'display':'block','border':'1px solid #e0e0e0','borderTop':'none'});
    })
    $('.head-right2').mouseleave(function(){
        $('.head-right23').css('height','0px');
        $('.head-right23m').css({'display':'none'});
    })

    //搜索框
    $('.navi-right1').focus(function(){
        $('.navi-rightxl').css('display','block');
        $(this).css('border','1px solid #ff6700');
        $('.navi-right2').css({'border':'1px solid #ff6700','borderLeft':'none'});
        $('.navi-right>a').css('display','none');
    })
    $('.navi-right1').blur(function(){
        $('.navi-rightxl').css('display','none');
        $(this).css('border','1px solid #e0e0e0');
        $('.navi-right2').css({'border':'1px solid #e0e0e0','borderLeft':'none'});
        $('.navi-right>a').css('display','block');
    })
    //单品展示
    let butL=$('.lbut');
    let butR=$('.rbut');
    let dpzsmain=$('.dpzsmain');
    let liss=$('.dpzsmain li:first-child');
    let num2=0;
    let flag=true;
    let tt;  
    tt=setInterval(move, 3000);
    function move(){
        if(flag){
           if(num2==2){
               flag=false;
               butL.addClass('disabled');
               return; 
            }
            num2++; 
            butR.removeClass('disabled');
            dpzsmain.css('transform',`transLateX(${-1240*num2}px)`);    
        }else{
            if(num2==0){
                flag=true;
                butR.addClass('disabled');
                return;
            }
            num2--;
            butL.removeClass('disabled');
            dpzsmain.css('transform',`transLateX(${-1240*num2}px)`);
        }
        
    }
    butL.click(function(){
        clearInterval(tt);
        if(num2==2){
            butL.addClass('disabled');
            tt=setInterval(move, 3000);
            return;
        }
        num2++;
        butR.removeClass('disabled');
        dpzsmain.css('transform',`transLateX(${-1240*num2}px)`);
        tt=setInterval(move, 3000);
    })
    butR.click(function(){
        clearInterval(tt);
        if(num2==0){
            butR.addClass('disabled');
            tt=setInterval(move, 3000);
            return;
        }
         num2--;
        butL.removeClass('disabled');
        dpzsmain.css('transform',`transLateX(${-1240*num2}px)`);
        tt=setInterval(move, 3000);
    })
    //智能硬件
    let znyjtop2s=$('.znyj-top2 li');
    let znyjmainright=$('.znyj-mainright');
    znyjtop2s.mouseenter(function(){
        let nu=$(this).index();
        $('.znyj-top2 a').removeClass('znyjc');
        $(this).children().addClass('znyjc');
        znyjmainright.css('display','none');
        $('.znyj-mainright:eq('+nu+')').css('display','block');
    })  

     //智能
    let zhinengtop2s=$('.zhineng-top2 li');
    let zhinengmainright=$('.zhineng-mainright');
    zhinengtop2s.mouseenter(function(){
        let nu=$(this).index();
        $('.zhineng-top2 a').removeClass('zhinengc');
        $(this).children().addClass('zhinengc');
        zhinengmainright.css('display','none');
        $('.zhineng-mainright:eq('+nu+')').css('display','block');
    })
     //搭配
    let dapeitop2s=$('.dapei-top2 li');
    let dapeimainright=$('.dapei-mainright');
    dapeitop2s.mouseenter(function(){
        let nu=$(this).index();
        $('.dapei-top2 a').removeClass('dapeic');
        $(this).children().addClass('dapeic');
        dapeimainright.css('display','none');
        $('.dapei-mainright:eq('+nu+')').css('display','block');
    })  

     //周边
    let zhoubiantop2s=$('.zhoubian-top2 li');
    let zhoubianmainright=$('.zhoubian-mainright');
    zhoubiantop2s.mouseenter(function(){
        let nu=$(this).index();
        $('.zhoubian-top2 a').removeClass('zhoubianc');
        $(this).children().addClass('zhoubianc');
        zhoubianmainright.css('display','none');
        $('.zhoubian-mainright:eq('+nu+')').css('display','block');
    }) 

    //为你推荐
    let butLe=$('.lbute');
    let butRe=$('.rbute');
    let shangmain=$('.shangmain');
    let lis2=$('.shangmain li:first-child');
    let num3=shangmain.children('li').length;
    let num4=0;
    let wntjw=parseInt(lis2.css('width'))+parseInt(lis2.css('marginRight'));
    shangmain.css('width',`${wntjw*num3}px`);
    butLe.click(function(){
        if(num4==3){
            butLe.addClass('disabled');
            return;
        }
        num4++;
        butRe.removeClass('disabled');
        shangmain.css('transform',`transLateX(${-1240*num4}px)`);
    })
    butRe.click(function(){
        if(num4==0){
            butRe.addClass('disabled');
            return;
        }
         num4--;
        butLe.removeClass('disabled');
        shangmain.css('transform',`transLateX(${-1240*num4}px)`);
    })

    //内容
    let neirongmain1=$('.neirongmain1');
    let nrmain=$('.nrmain');
    let nums=[0,0,0,0];
    neirongmain1.each(function(){
        let h7=$(this).children('.h7');
        let hi=h7.children('a');
        let back1=$(this).children('.back1');
        let forward1=$(this).children('.forward1');
        let xiabiaos=$(this).index();
        hi.click(function(){
            let xiabiao=$(this).index();
            hi.removeClass('hc');
            $(this).addClass('hc');
            nrmain.eq(xiabiaos).css('transform',`transLateX(${-296*xiabiao}px)`);
            nums[xiabiaos]=xiabiao;
        })
        forward1.click(function(){
            if(nums[xiabiaos]==2){
                return;
            }
            nums[xiabiaos]++;
            nrmain.eq(xiabiaos).css('transform',`transLateX(${-296*nums[xiabiaos]}px)`);
            hi.removeClass('hc');
            hi.eq(nums[xiabiaos]).addClass('hc');
        })
        back1.click(function(){
            if(nums[xiabiaos]==0){
                return;
            }
            nums[xiabiaos]--;
            nrmain.eq(xiabiaos).css('transform',`transLateX(${-296*nums[xiabiaos]}px)`);
            hi.removeClass('hc');
            hi.eq(nums[xiabiaos]).addClass('hc');
        })
    })
        
    
})