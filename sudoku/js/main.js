/*
*Author:Inory;
*Date:2017.3.23;
*last modefied by:Inory;
*last modefied time:2017.3.25;
*/

window.onload=function(){
	var canvas=document.getElementById('canvas');
	var sudoku=document.getElementById('sudoku');
	var context=getPaint(canvas);
	var item=document.getElementsByTagName('li');
	var sudokuItemCollection=[];
	var setPassword=document.getElementById('setPassword');
	var modifyPassword=document.getElementById('modifyPassword');
	var firstPassword=[];
	var secondPassword=[];
	var firstSet=true;
	var message=document.getElementById('message');

	/*页面初始化改变canvas画布*/
	resizeCanvas(canvas,getStyle(sudoku,'width'));

	/*窗口变化改变canvas画布大小*/
	window.onresize=function(){
		resizeCanvas(canvas,getStyle(sudoku,'width'));
	}

	/*初始化九宫格，放入集合数组中*/
	for(var i = 0, length1 = item.length; i < length1; i++){
		var sideLength=getStyle(item[i],'width')+2*getStyle(item[i],'marginLeft');
		var itemLength=getStyle(item[i],'width');
		var index=i;
		var left=getStyle(item[i],'marginLeft')+sideLength*(i%3);
		var top=getStyle(item[i],'marginTop')+sideLength*(Math.floor(i/3)%3);
		var right=left+itemLength;
		var bottom=top+itemLength;
		var active=0;
		var newItem=new sudokuItem(index,left,top,right,bottom,active);
		sudokuItemCollection.push(newItem);
	}

	/*初始化按钮以及信息状态*/
	setButtonAndMessage(setPassword,modifyPassword,message);
		
	/*给单选按钮添加事件*/
	/*设置密码*/
	bindEvent(setPassword,'change',function(){
		if (setPassword.checked) {
			console.log('设置密码');
			firstPassword=[];
			initCanvas(item,sudokuItemCollection);
			context.clearRect(0,0,600,600);
			message.innerHTML='请输入手势密码';
			/*设置密码的鼠标事件*/
			canvas.onmousedown=function(ev){
				var ev=ev||event;	
				initCanvas(item,sudokuItemCollection);
				context.clearRect(0,0,600,600);
				context.beginPath();
				/*第一次设置密码*/
				if (firstSet) {
					message.innerHTML='请输入手势密码';
					var startItem=measurePosition(getPositionX(ev,canvas),getPositionY(ev,canvas),sudokuItemCollection);
					if (startItem) {
						var startX=startItem.getCenter().x;
						var startY=startItem.getCenter().y;
						item[startItem.index].className='active';
						startItem.active=1;
						firstPassword.push(startItem);
					}
					canvas.onmousemove=function(ev){
						var endX=getPositionX(ev,canvas);
						var endY=getPositionY(ev,canvas);
						var nextX;
						var nextY;
						var nextItem=measurePosition(endX,endY,sudokuItemCollection);
						if (nextItem&&nextItem.active==0) {
							item[nextItem.index].className='active';
							nextItem.active=1;
							nextX=nextItem.getCenter().x;
							nextY=nextItem.getCenter().y;	
							firstPassword.push(nextItem);
						}
						continueLine(context,startX,startY,nextX,nextY);
						startX=nextX;
						startY=nextY;
					}
					canvas.onmouseup=function(){
						canvas.onmouseup=canvas.onmousemove=null;
						if (firstPassword.length>4) {
							firstSet=false;
							message.innerHTML='请再次输入手势密码';
							initCanvas(item,sudokuItemCollection);
							context.clearRect(0,0,600,600);
						}
						else
						{
							firstSet=true;
							message.innerHTML='密码太短，至少需要5个点';
							firstPassword=[];
						}
					}
				}
				else
				{
					/*第二次确认密码*/
					var startItem=measurePosition(getPositionX(ev,canvas),getPositionY(ev,canvas),sudokuItemCollection);
					if (startItem) {
						var startX=startItem.getCenter().x;
						var startY=startItem.getCenter().y;
						item[startItem.index].className='active';
						startItem.active=1;
						secondPassword.push(startItem);
					}
					canvas.onmousemove=function(ev){
						var endX=getPositionX(ev,canvas);
						var endY=getPositionY(ev,canvas);
						var nextX;
						var nextY;
						var nextItem=measurePosition(endX,endY,sudokuItemCollection);
						if (nextItem&&nextItem.active==0) {
							item[nextItem.index].className='active';
							nextItem.active=1;
							nextX=nextItem.getCenter().x;
							nextY=nextItem.getCenter().y;	
							secondPassword.push(nextItem);
						}
						continueLine(context,startX,startY,nextX,nextY);
						startX=nextX;
						startY=nextY;
					}
					canvas.onmouseup=function(){
						canvas.onmouseup=canvas.onmousemove=null;
						if (firstPassword.length==secondPassword.length) {
							for(var i = 0, length1 = firstPassword.length; i < length1; i++){
								if (firstPassword[i].index!=secondPassword[i].index){
									firstSet=true;
									message.innerHTML='两次输入的密码不一致';
									firstPassword=[];
									secondPassword=[];
									break;
								}
							}
							if (!firstSet) {
								message.innerHTML='密码设置成功';
								if (getLocalStorage('activeSudokuCllection')) {
									removeLocalStorage('activeSudokuCllection');
								}
								setLocalStorage(firstPassword);
								firstPassword=[];
								secondPassword=[];
								firstSet=true;
							}
						}
						else
						{
							firstSet=true;
							message.innerHTML='两次输入的密码不一致';
							firstPassword=[];
							secondPassword=[];
						}
					}
				}	
			}
			/*设置密码的手势事件*/
			canvas.ontouchstart=function(ev){
				var ev=ev||event;	
				initCanvas(item,sudokuItemCollection);
				context.clearRect(0,0,600,600);
				context.beginPath();
				/*第一次设置密码*/
				if (firstSet) {
					message.innerHTML='请输入手势密码';
					var startItem=measurePosition(getPositionX(ev.touches[0],canvas),getPositionY(ev.touches[0],canvas),sudokuItemCollection);
					if (startItem) {
						var startX=startItem.getCenter().x;
						var startY=startItem.getCenter().y;
						item[startItem.index].className='active';
						startItem.active=1;
						firstPassword.push(startItem);
					}
					canvas.ontouchmove=function(ev){
						var endX=getPositionX(ev.touches[0],canvas);
						var endY=getPositionY(ev.touches[0],canvas);
						var nextX;
						var nextY;
						var nextItem=measurePosition(endX,endY,sudokuItemCollection);
						if (nextItem&&nextItem.active==0) {
							item[nextItem.index].className='active';
							nextItem.active=1;
							nextX=nextItem.getCenter().x;
							nextY=nextItem.getCenter().y;	
							firstPassword.push(nextItem);
						}
						continueLine(context,startX,startY,nextX,nextY);
						startX=nextX;
						startY=nextY;
						ev.preventDefault();
					}
					canvas.ontouchend=function(){
						canvas.ontouchend=canvas.ontouchmove=null;
						if (firstPassword.length>4) {
							firstSet=false;
							message.innerHTML='请再次输入手势密码';
							initCanvas(item,sudokuItemCollection);
							context.clearRect(0,0,600,600);
						}
						else
						{
							firstSet=true;
							message.innerHTML='密码太短，至少需要5个点';
							firstPassword=[];
						}
						ev.preventDefault();
					}
				}
				else
				{
					/*第二次确认密码*/
					var startItem=measurePosition(getPositionX(ev.touches[0],canvas),getPositionY(ev.touches[0],canvas),sudokuItemCollection);
					if (startItem) {
						var startX=startItem.getCenter().x;
						var startY=startItem.getCenter().y;
						item[startItem.index].className='active';
						startItem.active=1;
						secondPassword.push(startItem);
					}
					canvas.ontouchmove=function(ev){
						var endX=getPositionX(ev.touches[0],canvas);
						var endY=getPositionY(ev.touches[0],canvas);
						var nextX;
						var nextY;
						var nextItem=measurePosition(endX,endY,sudokuItemCollection);
						if (nextItem&&nextItem.active==0) {
							item[nextItem.index].className='active';
							nextItem.active=1;
							nextX=nextItem.getCenter().x;
							nextY=nextItem.getCenter().y;	
							secondPassword.push(nextItem);
						}
						continueLine(context,startX,startY,nextX,nextY);
						startX=nextX;
						startY=nextY;
						ev.preventDefault();
					}
					canvas.ontouchend=function(){
						canvas.ontouchend=canvas.ontouchmove=null;
						if (firstPassword.length==secondPassword.length) {
							for(var i = 0, length1 = firstPassword.length; i < length1; i++){
								if (firstPassword[i].index!=secondPassword[i].index){
									firstSet=true;
									message.innerHTML='两次输入的密码不一致';
									firstPassword=[];
									secondPassword=[];
									break;
								}
							}
							if (!firstSet) {
								message.innerHTML='密码设置成功';
								if (getLocalStorage('activeSudokuCllection')) {
									removeLocalStorage('activeSudokuCllection');
								}
								setLocalStorage(firstPassword);
								firstPassword=[];
								secondPassword=[];
								firstSet=true;
							}
						}
						else
						{
							firstSet=true;
							message.innerHTML='两次输入的密码不一致';
							firstPassword=[];
							secondPassword=[];
						}
						ev.preventDefault();
					}
				}
				ev.preventDefault();;			
			}
		}
	});

	/*验证密码*/
	bindEvent(modifyPassword,'change',function(){
		if (modifyPassword.checked) {
			console.log('验证密码');
			initCanvas(item,sudokuItemCollection);
			context.clearRect(0,0,600,600);
			message.innerHTML='请输入密码';
			if (getLocalStorage('activeSudokuCllection')) {
				message.innerHTML='请输入密码';
				firstPassword=getLocalStorage('activeSudokuCllection').split(' ');
				/*验证密码的鼠标事件*/
				canvas.onmousedown=function(ev){
					var ev=ev||event;	
					initCanvas(item,sudokuItemCollection);
					context.clearRect(0,0,600,600);
					context.beginPath();
					var startItem=measurePosition(getPositionX(ev,canvas),getPositionY(ev,canvas),sudokuItemCollection);
					if (startItem) {
						var startX=startItem.getCenter().x;
						var startY=startItem.getCenter().y;
						item[startItem.index].className='active';
						startItem.active=1;
						secondPassword.push(startItem);
					}
					canvas.onmousemove=function(ev){
						var endX=getPositionX(ev,canvas);
						var endY=getPositionY(ev,canvas);
						var nextX;
						var nextY;
						var nextItem=measurePosition(endX,endY,sudokuItemCollection);
						if (nextItem&&nextItem.active==0) {
							item[nextItem.index].className='active';
							nextItem.active=1;
							nextX=nextItem.getCenter().x;
							nextY=nextItem.getCenter().y;	
							secondPassword.push(nextItem);
						}
						continueLine(context,startX,startY,nextX,nextY);
						startX=nextX;
						startY=nextY;
					}
					canvas.onmouseup=function(){
						canvas.onmouseup=canvas.onmousemove=null;
						if (secondPassword.length==firstPassword.length) {
							for(var i = 0, length1 = firstPassword.length; i < length1; i++){
								if (firstPassword[i]!=secondPassword[i].index) {
									message.innerHTML='输入的密码不正确';
									secondPassword=[];
									break;
								}
							}
							if(i==length1)
							{
								message.innerHTML='密码正确！';
								secondPassword=[];
							}
						}
						else
						{
							message.innerHTML='输入的密码不正确';
							secondPassword=[];
						}
					}
				}
				/*验证密码的手势事件*/
				canvas.ontouchstart=function(ev){
					var ev=ev||event;	
					initCanvas(item,sudokuItemCollection);
					context.clearRect(0,0,600,600);
					context.beginPath();
					var startItem=measurePosition(getPositionX(ev.touches[0],canvas),getPositionY(ev.touches[0],canvas),sudokuItemCollection);
					if (startItem) {
						var startX=startItem.getCenter().x;
						var startY=startItem.getCenter().y;
						item[startItem.index].className='active';
						startItem.active=1;
						secondPassword.push(startItem);
					}
					canvas.ontouchmove=function(ev){
						var endX=getPositionX(ev.touches[0],canvas);
						var endY=getPositionY(ev.touches[0],canvas);
						var nextX;
						var nextY;
						var nextItem=measurePosition(endX,endY,sudokuItemCollection);
						if (nextItem&&nextItem.active==0) {
							item[nextItem.index].className='active';
							nextItem.active=1;
							nextX=nextItem.getCenter().x;
							nextY=nextItem.getCenter().y;	
							secondPassword.push(nextItem);
						}
						continueLine(context,startX,startY,nextX,nextY);
						startX=nextX;
						startY=nextY;
						ev.preventDefault();
					}
					canvas.ontouchend=function(){
						canvas.onmouseup=canvas.onmousemove=null;
						if (secondPassword.length==firstPassword.length) {
							for(var i = 0, length1 = firstPassword.length; i < length1; i++){
								if (firstPassword[i]!=secondPassword[i].index) {
									message.innerHTML='输入的密码不正确';
									secondPassword=[];
									break;
								}
							}
							if(i==length1)
							{
								message.innerHTML='密码正确！';
								secondPassword=[];
							}
						}
						else
						{
							message.innerHTML='输入的密码不正确';
							secondPassword=[];
						}
						ev.preventDefault();
					}
					ev.preventDefault();
				}
			}
			else
			{
				message.innerHTML='请先设置密码';
			}
		}
		
	});

}
/*实现窗口变化改变canvas大小*/
function resizeCanvas(canvas,target){
	canvas.setAttribute('width',target);
	canvas.setAttribute('height',target);
}

/*初始化按钮以及信息状态*/
function setButtonAndMessage(setPassword,modifyPassword,message){
	setPassword.checked=false;
	modifyPassword.checked=false;
	message.innerHTML='请选择动作';
}

/*获取被激活的点集，并且写入localStorage*/
function setLocalStorage(firstPassword){
	var str='';
	for(var i = 0, length1 = firstPassword.length; i < length1; i++){
		str+=firstPassword[i].index+' ';
	}
	str=str.trim();
	localStorage.setItem('activeSudokuCllection',str);
}

/*获取localStorage,并且返回被激活的点集*/
function getLocalStorage(){
	return localStorage.getItem('activeSudokuCllection');
}

/*清除存储点集的localStorage*/
function removeLocalStorage(){
	localStorage.removeItem('activeSudokuCllection');
}

/*初始化画布*/
function initCanvas(item,sudokuItemCollection){
	for(var i = 0, length1 = item.length; i < length1; i++){
		item[i].className='';
	}
	for(var i = 0, length1 = sudokuItemCollection.length; i < length1; i++){
		sudokuItemCollection[i].active=0;
	}
}

/*检测点击位置*/
function measurePosition(clickX,clickY,sudokuItemCollection){
	for(var i = 0, length1 = sudokuItemCollection.length; i < length1; i++){
		if (clickX>sudokuItemCollection[i].left
			&&clickX<sudokuItemCollection[i].right
			&&clickY>sudokuItemCollection[i].top
			&&clickY<sudokuItemCollection[i].bottom
			) {
			return sudokuItemCollection[i];
		}
	}
	return null;
}

/*绑定事件*/
function bindEvent(obj,type,fn){
	if (obj.addEventListener) {
		obj.addEventListener(type,fn,false);
	}
	else
	{
		obj.attachEvent(type,fn);
	}
}

/*封装点集类*/
function sudokuItem(index,left,top,right,bottom,active){
	this.index=index;
	this.left=left;
	this.top=top;
	this.right=right;
	this.bottom=bottom;
	this.active=active;
}
sudokuItem.prototype.getCenter= function(){
	var x=Math.round((this.left+this.right)/2);
	var y=Math.round((this.top+this.bottom)/2);
	return {x:x,y:y};
};

/*获取绘图上下文*/
function getPaint(canvas){
	var context=canvas.getContext('2d');
	return context;
}

/*开始绘制线条*/
/*function drawLine(context,startX,startY,endX,endY){
	context.beginPath();
	context.strokeStyle="";
	context.moveTo(startX,startY);
	context.lineTo(endX,endY);
	context.stroke();
}*/

/*连续绘制线条*/
function continueLine(context,startX,startY,endX,endY){
	context.strokeStyle='#6a83ea';
	context.lineWidth='10';
	context.lineCap='round';
	context.lineJoin='round';
	context.moveTo(startX,startY);
	context.lineTo(endX,endY);
	context.stroke();
}

/*获取鼠标在canvas上的坐标*/
function getPositionX(ev,canvas){
	return ev.clientX-canvas.offsetLeft+document.documentElement.scrollLeft||document.body.scrollLeft;
}
function getPositionY(ev,canvas){
	return ev.clientY-canvas.offsetTop+document.documentElement.scrollTop||document.body.scrollTop;
}

/*获取元素的属性值*/
function getStyle(obj,attr){
	return obj.currentStyle?parseInt(obj.currentStyle[attr]):parseInt(getComputedStyle(obj)[attr]);
}