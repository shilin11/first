//属性  线宽   端点  颜色  边数  角  尺寸  width height history  canvas
//方法
//  画线  画虚线  铅笔  多边形   圆  矩形  多角形
//   橡皮   裁切  文字
//   新建  保存
function Palette(canvas,mask){
	this.canvas=canvas;
	this.mask=mask;
	this.ctx=this.canvas.getContext('2d');
	this.history=[];
	this.cw=this.canvas.width;
	this.ch=this.canvas.height;
	this.lineWidth=2;
	this.lineCap='butt';
	this.fillStyle='blue';
	this.strokeStyle='';
	//描边  填充
	this.style='fill';
	//边 角
	this.bnum=5;
	this.anum=5;
    //裁切
	this.temp=null;
}
	
Palette.prototype={
	init:function(){
		this.ctx.lineWidth=this.lineWidth;
		this.ctx.setLineDash([0,0]);
		this.ctx.lineCap=this.lineCap;
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.strokeStyle=this.strokeStyle;
		this.ctx.style=this.style
	},
	//实线
	line:function(ox,oy,cx,cy){
 		this.ctx.beginPath();
 		this.ctx.moveTo(ox, oy);
 		this.ctx.lineTo(cx,cy);
 		this.ctx.closePath();
 		this.ctx.stroke(); 
	},
	//虚线
	dash:function(ox,oy,cx,cy){
 		this.ctx.beginPath();
 		this.ctx.setLineDash([10,10]);
 		this.ctx.moveTo(ox, oy);
 		this.ctx.lineTo(cx,cy);
 		this.ctx.closePath();
 		this.ctx.stroke();			
	},
	//铅笔
	pen:function(){
		this.mask.onmousedown=function(e){			
			let ox=e.offsetX,oy=e.offsetY;
			// this.ctx.clearRect(0, 0, this.cw,this.ch);
			if(this.history.length>0){
				this.ctx.putImageData(this.history[this.history.length-1],0,0);
			}
			this.ctx.beginPath();
			this.init();
			this.ctx.moveTo(ox, oy);
			this.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				this.ctx.lineTo(cx,cy);
				this.ctx.stroke();
			}.bind(this)
			this.mask.onmouseup=function(){
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.mask.onmousemove=null;
				this.mask.onmouseup=null;
		    }.bind(this)
		}.bind(this) //给事件处理函数重新绑定this
	},
	//圆
	circle:function(ox,oy,cx,cy){
		let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
		this.ctx.beginPath();
		this.ctx.arc(ox,oy,r,0,2*Math.PI)
	},
	//矩形
	arc:function(ox,oy,cx,cy){
		let w=cx-ox,h=cy-oy;
		this.ctx.beginPath();
		this.ctx.rect(ox,oy,w,h);
		this.ctx.closePath();
	},

	//六边形
	six:function(ox,oy,cx,cy){
		let ang=360/this.bnum/180*Math.PI;
		let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
		this.ctx.beginPath();
		this.ctx.moveTo(ox+r,oy);
		for(let i=1;i<this.bnum;i++){
			this.ctx.lineTo(ox+r*Math.cos(ang*i),oy+r*Math.sin(ang*i))
		}
		this.ctx.closePath();
	},
	//五角星
	wujx:function(ox,oy,cx,cy){
		let ang=360/(this.anum*2)/180*Math.PI;
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.ctx.beginPath();
        this.ctx.moveTo(ox+r,oy);
        for(let i=0;i<this.anum*2;i++){
        	if(i%2==0){
        		this.ctx.lineTo(ox+Math.cos(ang*i)*r, oy+Math.sin(ang*i)*r);
        	}else{
        		this.ctx.lineTo(ox+Math.cos(ang*i)*r/2, oy+Math.sin(ang*i)*r/2);
        	}
        }
        this.ctx.closePath();
	},
	//橡皮
	eraser:function(obj,w,h){
        let that=this;
        this.mask.onmousedown=function(e){
        	obj.style.display='block';
        	e.preventDefault();
        	that.mask.onmousemove=function(e){
                let cx=e.offsetX,cy=e.offsetY;
                let lefts=cx-w/2;
                let tops=cy-h/2;
                if(lefts<0){
                	lefts=0;
                }
                if(lefts>that.cw-w){
                	lefts=that.cw-w;
                }
                if(tops<0){
                	tops=0;
                }
                if(tops>that.ch-h){
                	tops=that.ch-h;
                }
                obj.style.left=`${lefts}px`;
                obj.style.top=`${tops}px`;
                that.ctx.clearRect(lefts, tops, w, h);
        	}
        	that.mask.onmouseup=function(){
        		obj.style.display='none';
        		that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
        		this.onmousemove=null;
        		this.onmouseup=null;
        	}
        }
	},
	//封装
	drow:function(type){
        this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			this.mask.onmousemove=function(e){
                let cx=e.offsetX,cy=e.offsetY;
                this.ctx.clearRect(0,0,this.cw,this.ch);
                if(this.history.length>0){
                	this.ctx.putImageData(this.history[this.history.length-1],0,0);
                }      
                this.init();
                this.ctx[this.style]();               
                this[type](ox,oy,cx,cy);
			}.bind(this)
			this.mask.onmouseup=function(){
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.mask.onmousemove=null;
				this.mask.onmouseup=null;
			}.bind(this)
		}.bind(this)
	},
	// 文字
	font:function(){
		this.mask.onmousedown=function(e){
			let that=this;
			let ox=e.offsetX,oy=e.offsetY;
			let divs=document.createElement('div');
			divs.style.cssText=`
            width:100px;height:40px;border:1px solid #ccc;
            background:#fff;position: absolute;
			`;
			divs.style.left=`${ox}px`;
			divs.style.top=`${oy}px`;
			divs.contentEditable=true;
			this.mask.appendChild(divs);			
			this.mask.onmousedown=null;
			let lefts,tops;
			divs.onmousedown=function(e){
                let ox=e.clientX,oy=e.clientY;
                let ol=divs.offsetLeft,ot=divs.offsetTop;
                that.mask.onmousemove=function(e){
                	let cx=e.clientX,cy=e.clientY;
                	lefts=cx-ox+ol;
                	tops=cy-oy+ot;
                	if(lefts<0){
				 	 	lefts=0;
				 	 }
				 	 if(lefts>that.cw-100){
				 	 	lefts=that.cw-100;
				 	 }
				 	 if(tops<0){
				 	 	tops=0;
				 	 }
				 	 if(tops>that.ch-40){
				 	 	tops=that.ch-40;
				 	 }
                	divs.style.left=`${lefts}px`;
			        divs.style.top=`${tops}px`;
                }
                divs.onmouseup=function(){
                	that.mask.onmousemove=null;
                	divs.onmouseup=null;
                }
			}
			divs.onblur=function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				let value=this.innerText;
                that.mask.removeChild(this);
                that.ctx.font='bold 20px sans-serif';
                that.ctx.textAlign='center'; 
	            that.ctx.textBaseLine='middle';
                that.ctx.fillText(value,lefts,tops);
			}
		}.bind(this)
	},
	//反向
	rev:function(){
		let image=this.ctx.getImageData(0,0,this.cw,this.ch);
        let data=image.data;
        for(let i=0;i<data.length;i+=4){
        	data[i]=255-data[i];
        	data[i+1]=255-data[i+1];
        	data[i+2]=255-data[i+2];
        }
        this.ctx.putImageData(image,0,0);
	},
	//裁切
	clip:function(clipObj){
		let that=this;
		this.mask.onmousedown=function(e){
			let minx,miny,w,h;
			let ox=e.offsetX,oy=e.offsetY;
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				w=Math.abs(cx-ox);
				h=Math.abs(cy-oy);
                minx = cx>ox ? ox : cx;
                miny = cy>oy ? oy : cy;
                clipObj.style.cssText=`
                display:block;width:${w}px;height:${h}px;
                left:${minx}px;top:${miny}px;
                `;
			}
			that.mask.onmouseup=function(){
				that.temp=that.ctx.getImageData(minx,miny,w,h);
				that.ctx.clearRect(minx,miny,w,h);
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.ctx.putImageData(that.temp,minx,miny);
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
                that.drag(minx,miny,w,h,clipObj);
			}
		}   
	},
	drag:function(minx,miny,w,h,clipObj){
		let that=this;
		this.mask.onmousemove=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            if(ox>minx&&ox < minx+w && oy>miny && oy < miny+h){
            	that.mask.style.cursor='move';
            }else{
            	that.mask.style.cursor='default';
            }
		}
		this.mask.onmousedown=function(e){
			 let ox=e.offsetX,oy=e.offsetY;
			 that.mask.onmousemove=function(e){
			 	 let cx=e.offsetX,cy=e.offsetY;
			 	 let lefts=cx-ox+minx,tops=cy-oy+miny;
			 	 clipObj.style.left=`${lefts}px`;
			 	 clipObj.style.top=`${tops}px`;
			 	 if(lefts<0){
			 	 	lefts=0;
			 	 }
			 	 if(lefts>that.cw-w){
			 	 	lefts=that.cw-w;
			 	 }
			 	 if(tops<0){
			 	 	tops=0;
			 	 }
			 	 if(tops>that.ch-h){
			 	 	tops=that.ch-h;
			 	 }
			 	 that.ctx.clearRect(0,0,that.cw,that.ch);
			 	 if(that.history.length>0){
			 	 	that.ctx.putImageData(that.history[that.history.length-1],0,0);
			 	 }
			 	 that.ctx.putImageData(that.temp,lefts,tops);
			 }
			 that.mask.onmouseup=function(){
			 	clipObj.style.display='none';
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.temp=null;
                that.mask.onmousemove=null;
                that.mask.onmouseup=null;
			 }
		}
	}
}
