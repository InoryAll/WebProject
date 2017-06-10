/**
 * Created by Tang on 2017/6/2.
 */

/*初始化轮播*/
function setCarousel() {
    $('.owl-carousel').owlCarousel({
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        autoplaySpeed:500,
        smartSpeed:800
    });
}
