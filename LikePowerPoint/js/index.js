// 公用js

//窗口大小
var winWidth,winHeight;

//触屏应用
var nowpageC=1; //当前页码数
var maxpage=6; //共计页码数
var prepageC=1;	//上一页页码数
var isAnimation=false; //是否正在动画

/*音乐播放器*/
var playstate=0;	//播放状态 0为不播放 1为播放
var myvideo;	    //我的播放器
var initState=0;	//0 未初始化，1初始化

function goToAnotherpage()
{
	location.href="aboutus.html";
	}
/*分享*/
function showShareBox(){		//打开分享窗口
	document.getElementById('sharebox').style.display="block";
	}
function closeSharebox(){		//关闭分享窗口
	document.getElementById('sharebox').style.display="none";
	}
	
//浏览器监听
window.onload=function(){
	document.addEventListener("touchmove",function(event){
        event.preventDefault(); },false);
	$(window).keydown(function(event){choosepage(event.keyCode);})
	$(document).swipeUp(function(){
            nextpage();
            })
	$(document).swipeDown(function(){
            prepage();
            })
		
	checkWinSize();
	}
window.onresize=function(){
	checkWinSize();
	}
	
//功能函数
function changeVideostate(){				//修改播放器播放状态 
	if(myvideo.paused){
		myvideo.play();
		}
	else{
		myvideo.pause();
		}
	
	}
function choosepage(keycode){		//选择页码
	if(keycode==38){
		prepage();
		}
	else if(keycode==40){
		nextpage();
		}
	}
function nextpage(){		//下一页
	if(isAnimation==false){
		prepageC=nowpageC;
		if(nowpageC==maxpage){
			nowpageC=1;
			}
		else{
			nowpageC++;
			}
		gopage("up");
		}
	}
function prepage(){		//上一页
	if(isAnimation==false){
		prepageC=nowpageC;
		if(nowpageC==1){
			nowpageC=maxpage;
			}
		else{
			nowpageC--;
			}
		gopage("down");
		}
	}
function gopage(state){		//翻页方法
	var nextpageCss=".page"+nowpageC;
	var prepageCss=".page"+prepageC;
	var Outcss,Incss;
	
	if(state=="up"){		//上翻
		Outcss="page-moveToTopbox";
		Incss="page-moveFromBottombox";
		}
	else if(state=="down"){		//下翻
		Outcss="page-moveToBottombox";
		Incss="page-moveFromTopbox";
		}
	isAnimation=true;
	$(nextpageCss).removeClass("hide");
	$(prepageCss).addClass(Outcss);
	$(nextpageCss).addClass(Incss);
	
	setTimeout(function(){	
		$(prepageCss).removeClass(Outcss);
		$(prepageCss).removeClass("page-current");
		$(prepageCss).addClass("hide");
		$(prepageCss).find("img").addClass("hide");
		
		$(nextpageCss).addClass('page-current');
		$(nextpageCss).removeClass(Incss);
		$(nextpageCss).find("img").removeClass("hide");
		isAnimation=false;
		},600);
	}

//检测窗口大小
function checkWinSize(){
	getWindowSize();
		document.getElementById('content').style.width=winWidth + "px";
	document.getElementById('content').style.height=winHeight + "px";
	document.getElementById('sharebox').style.width=winWidth+"px";
	document.getElementById('sharebox').style.height=winHeight+"px";
	document.getElementById("loading").style.width=winHeight*0.6+"px";
		document.getElementById("loading").style.height=winHeight*0.6+"px";
		//top=(页面高度-盒子高度)/2
		document.getElementById("loading").style.top=(winHeight-winHeight*0.6)/2+"px";
		//left=(页面宽度-盒子宽度)/2
		document.getElementById("loading").style.left=(winWidth-winHeight*0.6)/2+"px";
		loading();
		//显示播放器并播放
		if(initState==0){		//初始化播放器
			document.getElementById('videoContainer').innerHTML='<video autoplay="autoplay" loop="loop" id="myVideobox"><source src="images/bg_music3.mp3"></video>';
			myvideo=document.getElementById('myVideobox');
			myvideo.play();
			}
		else{		//播放操作
			myvideo.play();
			}
	}
function loading(){		//载入第一页
	if(document.readyState == "complete"){ 
		$("#loading").hide();
		$(".content").show();
		}
}
	
//获取窗口大小
function getWindowSize(){
	//获取窗口宽度
	if (window.innerWidth){
		 winWidth = window.innerWidth;
		}
	else if ((document.body) && (document.body.clientWidth)){
		 winWidth = document.body.clientWidth;
		}
	//获取窗口高度
	if (window.innerHeight){
		 winHeight = window.innerHeight;
		}
	else if ((document.body) && (document.body.clientHeight)){
		 winHeight = document.body.clientHeight;
		}
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement  && document.documentElement.clientHeight &&document.documentElement.clientWidth){
	   winHeight = document.documentElement.clientHeight;
	   winWidth = document.documentElement.clientWidth;
		}
	}