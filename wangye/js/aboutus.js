$(function(){
	let about=$('.topr>a');
	let aboutmain=$('section[class^=aboutmain]');
	about.click(function(){
		let index=$(this).index();
		about.removeClass('topchange');
		aboutmain.css('display','none');
		about.eq(index).addClass('topchange');
		aboutmain.eq(index).css('display','block');
	})
})
