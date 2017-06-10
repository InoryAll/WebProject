/**
 * Created by Tang on 2017/6/1.
 */
$(document).ready(function () {
    /*设置轮播*/
    setCarousel();

    /*设置表单获取焦点效果*/
    setFormItemSelect();

    /*设置checkbox效果*/
    setCheckboxChecked();

    /*设置输入时的注册按钮状态变化*/
    setRegeditBtnStateChange();

    /*注册时的正则验证*/
    validateAll();

});

/*初始化表单控件*/
function initAllFormItems() {
    for (var i=0;i<$('input').length-1;i++){
        $('input').eq(i).val('');
    }
    $('input[name=agreement]').val('false');
    $('.checkbox').removeClass('active');
    $('.regedit-btn').removeClass('active');
    $('.regedit-btn').prop('disabled',false);
}

/*表单获取焦点效果*/
function setFormItemSelect() {
    $('input[type=text]').on('focus',function (ev) {
        $(this).parents().addClass('active');
        ev.preventDefault();
    });
    $('input[type=text]').on('blur',function (ev) {
        $(this).parents().removeClass('active');
        ev.preventDefault();
    });
    $('input[type=password]').on('focus',function (ev) {
        $(this).parents().addClass('active');
        ev.preventDefault();
    });
    $('input[type=password]').on('blur',function (ev) {
        $(this).parents().removeClass('active');
        ev.preventDefault();
    });
    $('input[name=username]').focus();
}

/*checkbox效果*/
function setCheckboxChecked() {
    $('.checkbox').on('click',function (ev) {
        $(this).toggleClass('active');
        if ($('input[type=checkbox]').prop('checked')==true){
           $('input[type=checkbox]').removeProp('checked');
            $('input[type=checkbox]').val(false);
            return;
        }
        if ($('input[type=checkbox]').prop('checked')==false){
            $('input[type=checkbox]').prop('checked','true');
            $('input[type=checkbox]').val(true);
            return;
        }
        ev.preventDefault();
    });
}

/*输入时的注册按钮状态变化*/
function setRegeditBtnStateChange() {
    var username=$('input[name=username]').val();
    var email=$('input[nmae=email]').val();
    var password=$('input[name=passowrd]').val();
    var repassword=$('input[name=repassword]').val();
    var validate=$('input[name=validate]').val();
    var agreement=$('input[name=agreement]').val();
    $('input').on('change',function (ev) {
        var canRegedit=true;
        for (var i=0;i<$('input').length;i++){
            if ($('input').eq(i).val()==''){
                canRegedit=false;
            }
            if ($('input[name=agreement]').val()=='false'){
                canRegedit=false;
            }
        }
        if (canRegedit){
            $('.regedit-btn').addClass('active');
            $('.regedit-btn').prop('disabled',false);
        }
        else{
            $('.regedit-btn').removeClass('active');
            $('.regedit-btn').prop('disabled',true);
        }
        ev.preventDefault();
    });
}

/*注册时的正则验证*/
function validateAll() {
    $('.regedit-btn').on('click',function (ev) {
        var username=$('input[name=username]').val();
        var email=$('input[name=email]').val();
        var password=$('input[name=password]').val();
        var repassword=$('input[name=repassword]').val();
        var validate=$('input[name=validate]').val();
        var agreement=$('input[name=agreement]').val();
        var reg=/^\w+@\S+$/;
        if (username.length<6){
            alert('用户名长度不得小于6位!');
            return;
        }
        if (!reg.test(email)){
            alert('邮箱格式不正确!');
            return;
        }
        if (password.length<6||repassword.length<6){
            alert('密码长度不得小于6位!');
            return;
        }
        if (repassword!=password)
        {
            alert('两次密码输入的不一致!');
            return;
        }
        if (validate.toLowerCase()!='e4bp'){
            alert('验证码输入不正确!');
            return;
        }
        alert('注册成功!');
        location.href='login.html';
        ev.preventDefault();
    });
}


















































