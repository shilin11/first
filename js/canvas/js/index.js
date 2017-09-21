window.onload=function(){
	let tools=document.querySelectorAll('.tools');
	let canvas=document.querySelector('canvas');
	let mask=document.querySelector('.mask');
	let xp=document.querySelector('.icon-xiangpi');
	let eraser=document.querySelector('.eraser');
	let styles=document.querySelectorAll('.styles');
	let input=document.querySelectorAll('input');
	let wenzi=document.querySelector('.wenzi');
	let pal=new Palette(canvas,mask);
	tools.forEach(element=>{
		element.onclick=function(){
			let active1=document.querySelector('label[active=true]');
	        active1.setAttribute('active',false);
	        this.setAttribute('active',true);
            if(this.id=='pen'){
            	pal.pen();
            }else if(this.id=='six'){
                pal.bnum=prompt('请输入边数',5);
                pal.drow(this.id);
            }else if(this.id=='wujx'){
                pal.anum=prompt('请输入角数',5);
                pal.drow(this.id);
            }else{
            	pal.drow(this.id);
            }
		}
	})
	//橡皮
	xp.onclick=function(){
        pal.eraser(eraser,20,20);
        let active1=document.querySelector('.left>label[active=true]');
        active1.setAttribute('active',false);
        xp.setAttribute('active',true);
	}
	//填充  描边
	styles.forEach(element=>{
		element.onclick=function(){
			let active1=document.querySelector('.left>label[active=true]');
	        active1.setAttribute('active',false);
	        this.setAttribute('active',true);
            pal.style=this.id;
		}
	})
	input.forEach((element,index)=>{
		element.onchange=function(){
			if(index==0){
				pal.fillStyle=this.value;
			}else if(index==1){
				pal.strokeStyle=this.value;
			}
		}
	})
	//文字
	wenzi.onclick=function(){
		let active1=document.querySelector('.left>label[active=true]');
        active1.setAttribute('active',false);
        this.setAttribute('active',true);
		pal.font();
	}
	//保存
	let save=document.querySelector('.icon-baocun');
	save.onclick=function(){
		let active1=document.querySelector('.top>label[active=true]');
        active1.setAttribute('active',false);
        this.setAttribute('active',true);
		save.href=canvas.toDataURL('img/png');
		save.download='a.png';
	}
	//反向
	let reverse=document.querySelector('.reverse');
	reverse.onclick=function(){
		let active1=document.querySelector('.top>label[active=true]');
        active1.setAttribute('active',false);
        this.setAttribute('active',true);
		pal.rev();
	}
	//裁切
	let caiqie=document.querySelector('.icon-caijian');
	let clipObj=document.querySelector('.clip');
	caiqie.onclick=function(){
		let active1=document.querySelector('.left>label[active=true]');
        active1.setAttribute('active',false);
        this.setAttribute('active',true);
		pal.clip(clipObj);
	}
	document.onkeydown=function(e){
        if(e.ctrlKey && e.keyCode==90){
        	let img=pal.history.pop();
        	pal.ctx.putImageData(img,0,0);
        }
	}
}
