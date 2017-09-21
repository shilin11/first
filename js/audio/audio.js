window.onload=function(){
	let song=document.querySelector('.song');
	let singer=document.querySelector('.singer');
	let list=document.querySelector('.list');
	let pause=document.querySelector('.pause');
	let prev=document.querySelector('.prev');
	let next=document.querySelector('.next');
	let audio=document.querySelector('audio');
	let photo=document.querySelector('.photo>img');
	let dSong=document.querySelector('.dSong');
	let current=document.querySelector('.current');
	let duration=document.querySelector('.duration');
	let progressBer=document.querySelector('.progressBer');
	let voicej=document.querySelector('.voicej');
	let circle=document.querySelector('.circle');
	let voice=document.querySelector('.voice');
	let i=0;
	//上一首
	prev.onclick=function(){
		if(i==0){
			i=database.length;
		}
		i--;
		render(database[i]);
		audio.pause();
        pause.classList.remove('icon-pcduanbizhixiazaicishutubiao');
		pause.classList.add('icon-yinlebofang');
		progressBer.style.width=0;
	}
	//下一首
	next.onclick=function(){
		if(i==database.length-1){
			i=-1;
		}
		i++;
		render(database[i]);
		audio.pause();
        pause.classList.remove('icon-pcduanbizhixiazaicishutubiao');
		pause.classList.add('icon-yinlebofang');
		progressBer.style.width=0;
	}
	render(database[i]);
	pause.onclick=function(){
		if(audio.paused){
			audio.play();
		}
		else{
			audio.pause();
		}
		pause.classList.toggle('icon-pcduanbizhixiazaicishutubiao');
		pause.classList.toggle('icon-yinlebofang');
	}
	//声音
	circle.onmousedown=function(e){
		let ox=e.clientX;
		let left=this.offsetLeft;
		let lefts,cx;
		voicej.onmousemove=function(e){
			cx=e.clientX;
			lefts=cx-ox+left;
			if(lefts<0){
				lefts=0;
			}
			if(lefts>100){
				lefts=100;
			}
			circle.style.left=`${lefts-7}px`;
			voice.style.width=`${lefts}px`;
		    audio.volume=lefts/100;
		}
		circle.onmouseup=function(){
			this.onmouseup=null;
			voicej.onmousemove=null;
		}
	}

	audio.ontimeupdate=function(){
		let bili=audio.currentTime/audio.duration;
		let ct=time(audio.currentTime);
		progressBer.style.width=`${bili*100}%`;
		current.innerText=ct;
		database[i].lyrics.forEach((element,index)=>{
			if(element.time==ct){
				let a=index;
				list.innerHTML='';
				if(index<3){
					index=0;
				}else{
					index-=3;
				}
				for(let j=index;j<database[i].lyrics.length;j++){
					list.innerHTML+=`<li class=list${j}>${database[i].lyrics[j].lyric}</li>`;
				}
				let addcolor=document.querySelector(`.list${a}`);
				addcolor.style.color='#ff3afd';
			}
		})
	}
	function render(data){
		song.innerText=data.songs;
		singer.innerText=data.name;
		audio.src=data.src;
        photo.src=data.photo;
        dSong.innerText=`${data.songs} / ${data.name}`;
        current.innerText='00:00';
        duration.innerText=data.alltime;
		list.innerHTML='';
		for(let i=0;i<data.lyrics.length;i++){
			list.innerHTML+=`<li class=list${i}>${data.lyrics[i].lyric}</li>`;
		}
	}
	function time(data){
		let m=Math.floor(data/60)>=10?Math.floor(data/60):`0${Math.floor(data/60)}`;
		let s=Math.floor(data%60)>=10?Math.floor(data%60):`0${Math.floor(data%60)}`;
		return `${m}:${s}`;
	}
}
