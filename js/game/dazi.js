// 属性  值是初始数据类型  描述
// 哪些字符
// 个数  
// 速度
// 得分
// 关卡
// 生命
// 减分
// 方法   值是函数  对象能实现的某一些功能
// 开始
// 消除
// 产生字符：个数 哪些
// 下一关
// 重新开始
let df=document.querySelector('.score>span');
let life=document.querySelector('.life>span');
function game(){
	this.charSheet=[
	['Q','img/16.png'],
	['W','img/17.png'],
	['E','img/6.png'],
	['Y','img/23.png'],
	['U','img/20.png'],
	['I','img/10.png'],
	['O','img/15.png'],
	['P','img/18.png'],
	['A','img/2.png'],
	['S','img/19.png'],
	['D','img/5.png'],
	['F','img/7.png'],
	['G','img/8.png'],
	['H','img/9.png'],
	['K','img/11.png'],
	['L','img/12.png'],
	['Z','img/24.png'],
	['X','img/22.png'],
	['C','img/4.png'],
	['V','img/21.png'],
	['B','img/3.png'],
	['N','img/14.png'],
	['M','img/13.png']]
	;
	this.length=5;
	this.ele=[];
	this.speed=8;
	this.score=0;
	this.life=10;
	this.position=[];
}
game.prototype={
	start:function(){
		this.getChars(this.length);
		this.drop();
		this.key();
		// this.next();
	},
	getChars:function(length){
		for(let i=0;i<length;i++){
			this.getChar();
		}
	},
	checkRepeat:function(num){
		return this.ele.some(value=>this.charSheet[num][0]==value.innerText);
	},
	checkPosition:function(lefts){
		return this.position.some(value=>Math.abs(lefts - value)<50);		
	},
	getChar:function(){
		let num;
		let divs=document.createElement('div');
		let lefts;
		let tops=Math.random()*100;
		divs.classList.add('box');
		do{
            num=Math.floor(Math.random()*this.charSheet.length);
		}while(this.checkRepeat(num));

		do{
			lefts=(innerWidth-200)*Math.random()+100;
		}while(this.checkPosition(lefts))
		divs.style.cssText=`
            left:${lefts}px;top:${tops}px;
            background:url(${this.charSheet[num][1]}) no-repeat center/cover;
            background-size: 50px;
		`;
		divs.innerText=this.charSheet[num][0];
		document.body.appendChild(divs);
		this.ele.push(divs);
		this.position.push(lefts);
	},
    drop:function(){
    	let that = this;
    	this.t=setInterval(function(){
    		for(let i=0;i<that.ele.length;i++){
    			let tops=that.ele[i].offsetTop;
    			that.ele[i].style.top=`${tops+that.speed}px`;
    			if(tops>450){
    				that.life--;
    				life.innerText=that.life;
    				document.body.removeChild(that.ele[i]);
    				that.ele.splice(i,1);
    				that.position.splice(i,1);
    				if(life.innerText==-1){
    					confirm('需要重新开始游戏吗');
    					that.restart();
    				}
    			}
    		}
    		if(that.ele.length<that.length){
    			that.getChar();
    		}
    		
    	},300)
    },
    key:function(){
    	let that=this;
    	document.onkeydown=function(e){
    		let char=String.fromCharCode(e.keyCode);
    		for(let i=0;i<that.ele.length;i++){
    			if(char==that.ele[i].innerText){
    				that.score++;
    				df.innerText=that.score;
    				document.body.removeChild(that.ele[i]);
    				that.ele.splice(i,1);
    				that.position.splice(i,1);
    				if(that.score==10){
    					that.next();
    				}
    			}
    		}
    	}
    },
    next:function(){
    	clearInterval(this.t);
    	for(let i=0;i<this.ele.length;i++){
    		document.body.removeChild(this.ele[i]);
    	}
    	this.ele=[];
    	this.position=[];
    	if(this.length<16){
    		this.length++;
    	}else{
    		this.speed+=4;
    	}
    	this.start();
    	df.innerText=0;
    	this.score=0;
    },
    restart:function(){
    	clearInterval(this.t);
    	for(let i=0;i<this.ele.length;i++){
    		document.body.removeChild(this.ele[i]);
    	}
    	this.length=5;
	    this.speed=8;
    	this.ele=[];
    	this.position=[];
    	this.start();
    	df.innerText=0;
    	this.score=0;
    	life.innerText=10;
    	this.life=10;
    }
}