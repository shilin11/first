$(function(){
	let hh=window.innerHeight;
	let mains=$('.mains');
	let photo1=$('.photos',mains[0]);
	let photo2=$('.photos',mains[1]);
	let photo3=$('.photos',mains[2]);
	let mainss1=$('.mainss',mains[0]);
	let mainss2=$('.mainss',mains[1]);
	let mainss3=$('.mainss',mains[2]);
	let arr=[];
	for(let i=0;i<mains.length;i++){
        arr.push(mains[i].offsetTop);
	}
	
	$(window).scroll(function(){
		let hs=$('body').scrollTop();
		if(hh+hs>=arr[0]+80){
			$('.mains:eq(0)').children('.photos').css('transform','translateX(500px)');
			$('.mains:eq(0)').children('.mainss').css('transform','translateX(-700px)');
		}
		if(hh+hs>=arr[1]+80){
			$('.mains:eq(1)').children('.photos').css('transform','translateX(-500px)');
			$('.mains:eq(1)').children('.mainss').css('transform','translateX(700px)');
		}
		if(hh+hs>=arr[2]+80){
			$('.mains:eq(2)').children('.photos').css('transform','translateX(500px)');
			$('.mains:eq(2)').children('.mainss').css('transform','translateX(-700px)');
		}
	})
})
