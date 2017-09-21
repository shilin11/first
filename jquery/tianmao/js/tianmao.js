$(function(){
	let bannerleft=document.getElementsByClassName('banner-left')[0];
    $('.banner-left li').mouseenter(function(){
        $(this).children('.item').css('display','block');
    }).mouseleave(function(){
        $(this).children('.item').css('display','none');
    })

	//bannertu
	let lis1=$('.bannertu li');
	let a1=$('.lunbodian a');
    let length=$('')
	let num=0;
	let t;
	t=setInterval(fn, 3000);
	//自动轮播
	function fn(){
		num++;
        if(num==lis1.length){
            num=0;
        }
        lis1.css('display','none');
        a1.css('background','#a2a2a2');
        lis1.eq(num).css('display','block');
        a1.eq(num).css('background','#fff');
	}

	//鼠标放上去暂停
    $('.banner-right').mouseenter(function(){
    	clearInterval(t);
    })
    $('.banner-right').mouseleave(function(){
    	t=setInterval(fn, 3000);
    })

     // 轮播点
     a1.click(function(){
        let index=$(this).index();
        lis1.eq(num).css('display','none');
        lis1.eq(index).css('display','block');
        a1.css('background','#a2a2a2');
        a1.eq(index).css('background','#fff');
        num=index;
     })
    //浏览器缩小
     $(window).blur(function(){
        clearInterval(t);
     })
     $(window).focus(function(){
        t=setInterval(fn, 3000);
     })

    //下拉
    $('.headright11').mouseenter(function(){
        $('.xiala1').css('display','block');
    })
    $('.headright11').mouseleave(function(){
        $('.xiala1').css('display','none');
    })
    $('.headright14').mouseenter(function(){
        $('.xiala2').css('display','block');
    })
    $('.headright14').mouseleave(function(){
        $('.xiala2').css('display','none');
    })
    $('.headright21').mouseenter(function(){
        $('.headright21>img').css('display','block');
        $('.angle1').css('display','block');
    })
    $('.headright21').mouseleave(function(){
        $('.headright21>img').css('display','none');
        $('.angle1').css('display','none');
    })
    $('.headright24').mouseenter(function(){
        $('.xiala3').css('display','block');
    })
    $('.headright24').mouseleave(function(){
        $('.xiala3').css('display','none');
    })
     $('.headright25').mouseenter(function(){
        $('.xiala4').css('display','block');
    })
    $('.headright25').mouseleave(function(){
        $('.xiala4').css('display','none');
    })

    //asidee
    let H=$(window).innerHeight();
    let flag=true;
    let arr=[0];
    let num1=0;
    $('section[class$="top"]').each(function(){
        arr.push($(this).offset().top);
    })
    $('.cehang12').click(function(){
        $('body').animate({scrollTop: 0}, 'normal');
    })
   $('.asidee>div').click(function(){
        $('body').animate({scrollTop: 0}, 'normal');
    })
    $(window).scroll(function(){
        let hh=$('body').scrollTop();
        arr.forEach(function(value,num2){
            if(H+hh>=value+360){
                $('.asidee>a').eq(num1).removeClass(`color${num1}`);
                $('.asidee>a').eq(num2).addClass(`color${num2}`);
                num1=num2;
            }
        })
        if(hh>600){
            $('.asidee').css('display','block');
            $('.cehang12').css('display','block');
            if(flag){
                flag=false;
                $('.search').css('transform','translateY(50px)');
            }
        }else{
             $('.asidee').css('display','none');
            $('.cehang12').css('display','none');
             if(!flag){
                flag=true;
                $('.search').css('transform','translateY(-50px)');
            }
        }
    })
    $('.asidee>a').mouseenter(function(){
        let index=$(this).index();
        $(this).addClass(`color${index}`);
    }).mouseleave(function(){
        let index=$(this).index();
        $(this).removeClass(`color${index}`);
    })
    $('.asidee>a').click(function(){
        let index=$(this).index();
        $('body').animate({scrollTop:arr[index]}, 'normal');
        for(let i=0;i<arr.length;i++){
           $('.asidee>a').eq(i).removeClass(`color${i}`); 
        }
        $('.asidee>a').eq(index).addClass(`color${index}`);
    })
    //固定定位
    $('.cehang>a').mouseenter(function(){
        $(this).children('.cehangdw').css({'opacity':1,'transform':'translateX(8px)'});
    }).mouseleave(function(){
        $(this).children('.cehangdw').css({'opacity':0,'transform':'translateX(0px)'});
    })
    $('.cehang11').mouseenter(function(){
        $('.cehang11>img').css('display','block');
    }).mouseleave(function(){
        $('.cehang11>img').css('display','none');
    })

    //pinpai
    let numsss=0;
    let tts;
    tts=setInterval(function(){
        if(numsss==3){
            numsss=0;
        }
        $('.pinpai34').css('transform',`translateY(${-49*numsss}px)`);
        numsss++;
    },4000);
    $('.pinpaileft21').mouseenter(function(){
        $('.zhezhao1').removeClass('zhezhao1m');
        $(this).children('.zhezhao1').addClass('zhezhao1m');
    })

    //平移
    let meilimain121=$('.meilimain121');
    let next=0,now=0;
    let t1;
    t1=setInterval(function(){
        next++;
        if(next==3){
            next=0;
        }
        meilimain121.eq(next).css('top',`30px`);
        meilimain121.eq(now).animate({top:-30},'normal');
        meilimain121.eq(next).animate({top:0},'normal');
        now=next;
    },2000);

    let kuwanmain121=$('.kuwanmain121');
    let next1=0,now1=0;
    let t2;
    t2=setInterval(function(){
        next1++;
        if(next1==3){
            next1=0;
        }
        kuwanmain121.eq(next1).css('top',`30px`);
        kuwanmain121.eq(now1).animate({top:-30},'normal');
        kuwanmain121.eq(next1).animate({top:0},'normal');
        now1=next1;
    },2000);

    let jujiamain121=$('.jujiamain121');
    let next2=0,now2=0;
    let t3;
    t3=setInterval(function(){
        next2++;
        if(next2==3){
            next2=0;
        }
        jujiamain121.eq(next2).css('top',`30px`);
        jujiamain121.eq(now2).animate({top:-30},'normal');
        jujiamain121.eq(next2).animate({top:0},'normal');
        now2=next2;
    },2000);

    let homemain121=$('.homemain121');
    let next3=0,now3=0;
    let t4;
    t4=setInterval(function(){
        next3++;
        if(next3==3){
            next3=0;
        }
        homemain121.eq(next3).css('top',`30px`);
        homemain121.eq(now3).animate({top:-30},'normal');
        homemain121.eq(next3).animate({top:0},'normal');
        now3=next3;
    },2000);

    let huwaimain121=$('.huwaimain121');
    let next4=0,now4=0;
    let t5;
    t5=setInterval(function(){
        next4++;
        if(next4==3){
            next4=0;
        }
        huwaimain121.eq(next4).css('top',`30px`);
        huwaimain121.eq(now4).animate({top:-30},'normal');
        huwaimain121.eq(next4).animate({top:0},'normal');
        now4=next4;
    },2000);

    let qinzimain121=$('.qinzimain121');
    let next5=0,now5=0;
    let t6;
    t6=setInterval(function(){
        next5++;
        if(next5==3){
            next5=0;
        }
        qinzimain121.eq(next5).css('top',`30px`);
        qinzimain121.eq(now5).animate({top:-30},'normal');
        qinzimain121.eq(next5).animate({top:0},'normal');
        now5=next5;
    },2000);

})


