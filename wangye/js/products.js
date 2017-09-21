$(function(){
	let hh=window.innerHeight;
	let pro=$(".productsmain");
	let arr=[];
	for(let i=0;i<pro.length;i++){
        arr.push(pro.eq(i).offset().top);
	}
	$(window).scroll(function(){
		let hs=$('body').scrollTop();
		for(let i=0;i<pro.length;i++){
            if(hh+hs>=arr[i]+140){
				pro.eq(i).animate({left:0},1500);
			}
		}
	})
})
