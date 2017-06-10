/**
 * Created by Tang on 2017/6/1.
 */

$(document).ready(function () {

    /*初始化所有控件*/
    initAllFormitems();

    /*实例化一个user*/
    var admin=new User('tangxiaofang','123456');

    /*设置轮播*/
    setCarousel();

    /*设置form控件获取焦点效果*/
    setFormItemSelect();

    /*设置输入时的登录按钮状态变化*/
    setLoginBtnStateChange();

    /*设置登录时的验证*/
    validate(admin);
});

/*初始化所有控件*/
function initAllFormitems() {
    for (var i=0;i<$('input').length;i++){
        $('input').eq(i).val('');
    }
    $('.login-btn').removeClass('active');
    $('.login-btn').prop('disabled',false);
}

/*用户实体类*/
function User(username,password) {
    this.username=username;
    this.password=password;
}

/*form控件获取焦点效果*/
function setFormItemSelect() {
    $('input').on('focus',function (ev) {
        $(this).parents().addClass('active');
        ev.preventDefault();
    });
    $('input').on('blur',function (ev) {
        $(this).parents().removeClass('active');
        ev.preventDefault();
    });
    $('input[type=text]').focus();
}

/*输入时的登录按钮状态变化*/
function setLoginBtnStateChange() {
    $('input').on('input',function (ev) {
        var canLogin=true;
        for(var i=0;i<$('input').length;i++){
            if ($('input').eq(i).val()==''){
                canLogin=false;
            }
        }
        if (canLogin){
            $('.login-btn').addClass('active');
            $('.login-btn').prop('disabled',false);
        }
        else
        {
            $('.login-btn').removeClass('active');
            $('.login-btn').prop('disabled',true);
        }
        ev.preventDefault();
    });
}

/*登录的正则验证*/
function validate(user) {
    $('.login-btn').on('click',function (ev) {
        var username=$('input[name=username]').val();
        var password=$('input[name=password]').val();
        if (username.length<6) {
            alert('用户名不得小于6位!');
        }
        else{
            if (password.length<6){
                alert('密码不得小于6位!');
            }
            else{
                if (user.username=='')
                {
                    alert('用户名不存在!');
                }
                else
                {
                    if (user.password!=password){
                        alert('密码错误!');
                    }
                    else
                    {
                        location.href='pages/word.html';
                    }
                }
            }
        }
        ev.preventDefault();
    })
}

