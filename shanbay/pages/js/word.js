/**
 * Created by Tang on 2017/6/5.
 */

$(document).ready(function () {
    /*设置各区域的选择显示*/
    setContentChange();

    /*设置点击进入开始单词学习*/
    toWordsLearningStart();

    /*设置点击进入单词学习*/
    toWordsLearningContent();
});

/*各区域的选择显示*/
function setContentChange() {
    $('#navigation ul li a').on('click',function (ev) {
        for (var i=0;i<$('#navigation ul li a').length;i++){
            $('#navigation ul li a').eq(i).parents().removeClass('active');
        }
        $(this).parents().addClass('active');
        for (var i=0;i< $('#content .content-box div').length;i++){
            $('#content>.container>.content-box>div').eq(i).css('display','none');
        }
        var _index=$('#navigation ul li a').index(this);
        console.log(_index);
        $('#content>.container>.content-box>div').eq(_index).css('display','block');
        ev.preventDefault();
    });
}

/*进入开始单词学习*/
function toWordsLearningStart() {
    $('.words-learning .choices .item').on('click',function (ev) {
        for (var i=0;i< $('#content .content-box div').length;i++){
            $('#content>.container>.content-box>div').eq(i).css('display','none');
        }
        $('#content .content-box .words-learning-start').css('display','block');
        ev.preventDefault();
    });
}

/*进入单词学习*/
function toWordsLearningContent() {
    $('#content .content-box .words-learning-start button').on('click',function (ev) {
        for (var i=0;i< $('#content .content-box div').length;i++){
            $('#content>.container>.content-box>div').eq(i).css('display','none');
        }
        $('#content .content-box .words-learning-content').css('display','block');
        ev.preventDefault();
    });
}
