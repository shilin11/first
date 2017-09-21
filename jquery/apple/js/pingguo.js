$(function(){
	let ban=$('.banner1');
	let photo=$('.banner1>a');
	let lbds=$('.top3>a');
	let back=$('.topleft');
	let forward=$('.topright');
	let widths=ban.width();
	let flag=true;
	let now=0,next=0;
	let t;
	t=setInterval(fn,3000);
    lbds.eq(0).addClass('hot');

        //自动播放
        function fn(){
            next++;
            if(next==photo.length){
                next=0;
            }        
            lbds.eq(next).addClass('hot');
            lbds.eq(now).removeClass('hot');
            photo.eq(next).css('left',widths);  
            photo.eq(now).animate({left:-parseInt(widths)},'normal');
            photo.eq(next).animate({left:0},'normal',function(){
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
            photo.eq(next).css('left',-parseInt(widths)+'px');  
            photo.eq(now).animate({left:parseInt(widths)},'normal');
            photo.eq(next).animate({left:0},'normal',function(){
                flag=true;
            });
            now=next;
        }
           //箭头
        ban.mouseenter(function(){
        	back.css('opacity',1);
            forward.css('opacity',1);
        }).mouseleave(function(){
            back.css('opacity',0);
            forward.css('opacity',0);
        })
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
                photo.eq(i).css('left',-parseInt(widths)+'px');  
                photo.eq(now).animate({left:parseInt(widths)},'normal');
                photo.eq(i).animate({left:0},'normal');
            }else if(now>i){
                lbds.eq(i).addClass('hot');
                lbds.eq(now).removeClass('hot');
                photo.eq(i).css('left',-parseInt(widths)+'px');  
                photo.eq(now).animate({left:parseInt(widths)},'normal');
                photo.eq(i).animate({left:0},'normal');
            }
            now=next=i;
        })

        //鼠标    
        ban.mouseenter(function(){
            clearInterval(t);
        }).mouseleave(function(){
            t=setInterval(fn,3000);
        })
})


