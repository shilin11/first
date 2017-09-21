//1.获取元素，返回  
//2.添加window.onload
//$(select[,ranger])
//参数：select 字符串->选择器  #son .box div
//             函数 ->  window.onload
//      ranger  范围  dom元素
//1.判断传进来的字符串的首字符
//   # ->document.getElementById
//   . ->document.getElementsByClassName
//   符合标签
//    div img a span ol ul li dl dt dd from input ......
//    / /正则 ^代表开头 $代表结尾 {x,y} x是最少出现的次数，y是最多出现的次数
//2.return 

function $(select,ranger=document){
	// ranger=ranger?ranger:document;
	// ranger=ranger||document;
	if(typeof select=='string'){
		let selector = select.trim();
	    let firstChar = selector.charAt(0);
	    if(firstChar=='#'){
            return ranger.getElementById(selector.substring(1));
	    }else if(firstChar=='.'){
            return ranger.getElementsByClassName(selector.substring(1));
	    }else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
		    return ranger.getElementsByTagName(selector);
	    }

	}else if(typeof select=='function'){
		window.onload=function(){
			select();
		}
	}
}

//html()  element dom元素
//获取或者是设置元素内容
function html(element,content){
    if(arguments.length==2){
        element.innerHTML=content;
    }else if(arguments.length==1){
    	return element.innerHTML;
    }
}

//text()
function text(element,content){
    if(arguments.length==2){
        element.innerText=content;
    }else if(arguments.length==1){
    	return element.innerText;
    }
}

//设置样式
//  css(element,attrObj)
function css(element,attrObj){
	for(let i in attrObj){  //for in遍历对象时i时字符串，要用[]
		element.style[i]=attrObj[i];
	}
}

//添加事件
//on(collection,type,fn)  collection 集合

function on(collection,type,fn){  //type传过来是字符串
	for(let i=0;i<collection.length;i++){
		collection[i][type]=fn;
	}
}

//移除事件
function off(collection,type){  //type传过来是字符串
	for(let i=0;i<collection.length;i++){
		collection[i][type]=null;
	}
}