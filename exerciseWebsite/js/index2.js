// 公用js

//窗口大小
var winWidth,winHeight;

//触屏应用
var nowpageC=1; //当前页码数
var maxpage=3; //共计页码数
var prepageC=1;	//上一页页码数
var isAnimation=false; //是否正在动画


function goToAnotherpage()
{
	location.href="aboutus.html";
	}
/*分享*/

	
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
window.setInterval("choosepage()",3000);


function choosepage(){		//选择页码
	
		nextpage();
		
	}
function nextpage(){		//下一页
	if(isAnimation==false){
		prepageC=nowpageC;
		if(nowpageC!=3)
		{
			nowpageC++;			
			gopage("up");
			}
			
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
	
	document.getElementById("loading").style.width=winHeight*0.6+"px";
		document.getElementById("loading").style.height=winHeight*0.6+"px";
		//top=(页面高度-盒子高度)/2
		document.getElementById("loading").style.top=(winHeight-winHeight*0.6)/2+"px";
		//left=(页面宽度-盒子宽度)/2
		document.getElementById("loading").style.left=(winWidth-winHeight*0.6)/2+"px";
		loading();
		
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