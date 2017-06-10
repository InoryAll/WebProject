/**
 * index.js
 * Created by Tang on 2017/5/31.
 */
$(document).ready(function () {
    setCarousel();
});

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
    $('#carousel .prev').on('click',function (ev) {
        $('.owl-carousel').trigger('prev.owl.carousel');
        ev.preventDefault();
    });
    $('#carousel .next').on('click',function (ev) {
        $('.owl-carousel').trigger('next.owl.carousel');
        ev.preventDefault();
    });
    $('.owl-carousel').on('changed.owl.carousel',function (ev) {
       for(var i=0;i<$('#menu ul li').length;i++){
           $('#menu ul li').eq(i).find('a').removeClass('active');
       }
       $('#menu ul li').eq(ev.page.index).find('a').toggleClass('active');
        ev.preventDefault();
    });
    $('#menu ul a').on('click',function (ev) {
        $('.owl-carousel').trigger('to.owl.carousel', [$('#menu ul a').index(this),0]);
        ev.preventDefault();
    });
}