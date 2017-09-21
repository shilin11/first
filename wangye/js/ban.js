function $(select,ranger=document){
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