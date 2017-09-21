$(function(){
	let lis=$('.navv');
	$('.photo1').mouseenter(function(){
		$('.photoxl').css('display','block');
	})
	$('.photo1').mouseleave(function(){
		$('.photoxl').css('display','none');
	})
	$('.sousuo2').mouseenter(function(){
        $('.sousuo3').css('display','block');
    })
    $('.sousuo2').mouseleave(function(){
        $('.sousuo3').css('display','none');
    })
    lis.mouseenter(function(){
        $(this).children('.item').css('height','560px');
        $(this).children('.item').css('borderTop','5px solid #b71a21');
    }).mouseleave(function(){
        $(this).children('.item').css('height','0');
        $(this).children('.item').css('borderTop','5px solid #fff');
    })

	//banner
    let lbd=$('.bbox a');
    let photo=$('.banner img');
    let zuo=$('.zuo');
    let you=$('.you');
    let num=0;
    let t;
    t=setInterval(function(){fn('r')}, 3000);
    //箭头
   you.click(function(){
    	fn('r');
    	return false;
    });
    zuo.click(function(){
    	fn('l');
    	return false;
    });
    //自动轮播
    function fn(str){
        if(str=='r'){
            num++;
            if(num==photo.length){
                num=0;
            }   
        }else if(str=='l'){
            num--;
            if(num==-1){
                num=photo.length-1;
            }
        }
    	photo.css('display','none');
        lbd.css('background','#dddddd');
        photo.eq(num).css('display','block');
        lbd.eq(num).css('background','#a10000');
    }

    // 轮播点
    lbd.click(function(){
        let index=lbd.index($(this));
        photo.css('display','none');
        photo.eq(index).css('display','block');
        lbd.css('background','#dddddd');
        $(this).css('background','#a10000');
        num=index;
    })
     //鼠标放上去暂停
    $('.banner').mouseenter(function(){
        clearInterval(t);
    })
    $('.banner').mouseleave(function(){
        t=setInterval(function(){fn('r')}, 3000);
    })

    //回顶部
    guding3=$('.guding3');
    $('.guding3').click(function(){
        $('body').animate({scrollTop:0},'normal');
    })
    // guding3.addEventListener('click', function(){
    //     animate(document.body,{scrollTop:0});
    // })
})
