/*
*@Author:Inory
*@Date:2017.3.13
*@Last Modefied by:Inory
*@Last Modefied time:2017.3.13
*/
$(document).ready(function() {
	
	var flag=false;

	/*
	*窗口变化重置布局
	*/
	$(window).resize(function() {
		location.replace(location);
	});

	/*
	*屏幕滑动固定导航栏效果
	*/
	$(window).scroll(function() {
		if ($('#header').css('display')!='none'){
			if($(document).scrollTop()>50){
				$('#header').css({
					display: 'block',
					position: 'fixed'
				});
			}
			else
			{
				$('#header').css({
					position: 'static'
				});
			}
		}
		
	});

	/*
	*侧边栏点击选项的效果
	*/
	$('#sideBar .list a').each(function(index,elem) {
		$(this).on('click',function(){
			$('#sideBar li').removeClass('active');
			$(this).parent().addClass('active');
		});
	});

	/*
	*侧边栏横向滑动出现效果
	*/
	$('#header a').on('click',function(){
		if(!flag)
		{
			var headerWidth=parseInt($('#header').css('width'))-parseInt($('#sideBar').css('width'))+'px';
			var sideBarWidth=parseInt($('#sideBar').css('width'))+'px';
			$('#sideBar').css({
				display: 'block',
				right:'-'+sideBarWidth
			});
			$('#header').animate({
				width: headerWidth},
				400, function() {
			});
			$('#sideBar').animate({
				right: '0px'},
				400, function() {
					$('#header').css('width','calc(100% - '+sideBarWidth+')');
			});
			flag=true;
			$('#header span').css('color', '#4acaa8');
		}
		else
		{
			var headerWidth=parseInt($('#header').css('width'))+parseInt($('#sideBar').css('width'))+'px';
			var sideBarWidth=parseInt($('#sideBar').css('width'))+'px';
			$('#header').animate({
				width: headerWidth},
				400, function() {
			});
			$('#sideBar').animate({
				right: '-'+sideBarWidth},
				400, function() {
					$('#header').css('width','100%');
			});
			flag=false;
			$('#header span').css('color', '#ffffff');
		}
	});

	/*
	*按钮点击显示代码区域
	*/
	$('.getMore').each(function(index, elem) {
		$(this).on('click',function(){
			if($('.content pre').eq(index).css('display')!='block'){
				$('.content pre').eq(index).css('display','block');
				var preHeight=$('.content pre').eq(index).css('height');
				$('.content pre').eq(index).css('height','0px');
				$('.content pre').eq(index).animate({
					height: preHeight},
					800, function() {
						var windowHeight=parseInt($('#content_info').css('height'));
						$('#filterBox').css('height',windowHeight);
				});
			}
		});
	});

	/*
	*内容的左右滑动效果
	*/
	$('#sideBar .list li').each(function(index, elem) {
		$(this).on('click', function(event) {
			var overflowTarget;
			var trueTarget=-100*index+'%';
			var nowPosition=parseInt($('#mainBox').css('marginLeft'));
			if (parseInt(trueTarget)<=nowPosition) {
				overflowTarget=-100*index-10+'%';
			} else {
				overflowTarget=-100*index+10+'%';
			}
			if (index==2) {
				$('#mainBox').animate({
					marginLeft: trueTarget},
					400, function() {
						$('#filterBox').css('height', $('.content:eq('+index+')').css('height'));
				});
			} else {
				$('#mainBox').animate({
					marginLeft: overflowTarget},
					400, function() {
						$('#mainBox').animate({
							marginLeft: trueTarget},
							400, function() {
								$('#filterBox').css('height', $('.content:eq('+index+')').css('height'));
						});
				});
			}
		});
	});

	/*
	*关注博主显示二维码
	*/
	$('#content_Github button').each(function(index, elem) {
		$(this).on('click',function(){
			if($('#content_Github article .imgBox:eq('+index+')').css('opacity')==0)
			{
				$('#content_Github article .imgBox:eq('+index+')').css('height', 'auto');
				var imgHeight=$('#content_Github article .imgBox:eq('+index+')').css('height');
				$('#content_Github article .imgBox:eq('+index+')').css('height', '0px');
				$('#content_Github article .imgBox:eq('+index+')').animate({
					height: imgHeight},
					400, function() {
						$('#content_Github article .imgBox:eq('+index+')').animate({
							opacity: '1'},
							400, function() {
								var windowHeight=parseInt($('#content_Github').css('height'));
								$('#filterBox').css('height',windowHeight);
						});
				});
			}
		});
	});

	/*
	*弹出框效果
	*/
	$('.adviceSubmit').on('mousedown',function(){
		$('.alertDiv').fadeIn(1000, function() {
			setTimeout(function(){
				$('.alertDiv').fadeOut('slow', function() {
				});
			}, 2000);
		});
	});	
	$('.hideBtn').on('click',function(){
		$('.alertDiv').fadeOut('slow', function() {
		});
	});

	/*
	*表单域重置
	*/
	$('.adviceReset').on('click',function(){
		$('form input').val('');
		$('form textarea').val('');
	});

	/*
	*表单数据有效性判断
	*/
	$('.adviceSubmit').on('click',function(){
		var name=$('input[name=name]').val();
		var email=$('input[name=email]').val();
		var subject=$('input[name=subject]').val();
		var message=$('#message').val();
		if (!testData(name,/^\S{3,9}$/)) {
			$('#submitMessage').text('姓名格式错误,请修正,长度应为3-9位!');	
		}
		else if(!testData(email,/^\w+@[0-9a-z]+\.[a-z]{2,4}$/)){
			$('#submitMessage').text('邮箱格式错误,请修正,格式请参照标准!');	
		}
		else if(!testData(subject,/^.{5,50}$/))
		{
			$('#submitMessage').text('主题格式错误,请修正,长度请为5-50!');
		}
		else if(!testData(message,/^.{1,}$/)){
			$('#submitMessage').text('内容格式错误,内容不能为空!');
		}
		else
		{
			$('#submitMessage').text('你已经成功提交表单，谢谢你的意见!');
		}
	});
});

/*
*检测输入数据的合法性函数
*/
function testData(data,reg){
	return reg.test(data);
}
