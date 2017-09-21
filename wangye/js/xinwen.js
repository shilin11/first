$(function(){
	var yeshu=$(".yeshu a");
	yeshu.mouseenter(function(){
		yeshu.removeClass('hot');
		$(this).addClass('hot');
	});
	var news=$(".attractm a");
	news.mouseenter(function(){
		news.removeClass('choose');
		$(this).addClass('choose');
	});
})
