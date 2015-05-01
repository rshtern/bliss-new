(function() {
    // 'use strict';

    var viewport = {
            height: $(window).height(),
            width: $(window).width()
        },
        fullVH = $('.fullVH'),
        heroSection = $('section.hero');
    fullVH.css('height', viewport.height + 'px');
    fullVH.css('width', viewport.width + 'px');
    var halfVH = $('.halfVH');
    halfVH.css('height', viewport.height / 2 + 'px');
    halfVH.css('width', viewport.width + 'px');
    console.log(viewport.height + " : " + viewport.width);
    heroSection.css('display', 'table');
    var heroHeader = $('h1.hero-header');
    heroHeader.css({
        'font-size': viewport.width / 24 + 'px',
        'line-height': viewport.width / 22 + 'px'
    });

    var servicesCol = $('.services-row>.col.s4');
    var setColHeight = servicesCol.eq(0).height();
    servicesCol.eq(1).css('height', setColHeight + 'px');
    servicesCol.eq(2).css('height', setColHeight + 'px');

// PNG SUPPORT FOR IE7-8
// 
var isIE = /*@cc_on!@*/false || !!document.documentMode;
function fixPNGs(){
  if(isIE){ 
    var i;
    //alert(document.images.length);
    for(i in document.images){
      if(document.images[i].src){
        var imgSrc = document.images[i].src;
        if(imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG'){
        document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
        }
      }
    }   
  }
}
fixPNGs();
    $(window).resize(function() {
        viewport = {
            height: $(window).height(),
            width: $(window).width()
        };
        fullVH.css('min-height', viewport.height + 'px');
        fullVH.css('min-width', viewport.width + 'px');
        halfVH.css('min-height', viewport.height / 2 + 'px');
        halfVH.css('min-width', viewport.width + 'px');
        heroHeader.css({
            'font-size': viewport.width / 18 + 'px',
            'line-height': viewport.width / 17 + 'px'
        });
        servicesCol.eq(1).css('height', setColHeight + 'px');
        servicesCol.eq(2).css('height', setColHeight + 'px');
    });
    
    //smoothscroll
    $('nav li > a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function() {
            $(this).parent().removeClass('active');
        });
        $(this).parent().addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function() {
            window.location.hash = target;
        });
    });

    // scroll event behaviors
    $(window).scroll(function() {

        if ($(this).scrollTop() > viewport.height / 4) {
            $('.main-header').css({
                'opacity': '0',
                '-webkit-transition': 'opacity 0.5s ease-in-out',
                '-moz-transition': 'opacity 0.5s ease-in-out',
                '-ms-transition': 'opacity 0.5s ease-in-out',
                '-o-transition': 'opacity 0.5s ease-in-out',
                'animation-timing-function': 'ease',
                '-webkit-animation-timing-function': 'ease',
                'animation-iteration-count': '1',
                '-webkit-animation-iteration-count': '1'
            });
            $('.scroll-down').css('opacity', '0');
        } else if ($(this).scrollTop() <= viewport.height / 4) {
            $('.main-header').css({
                'opacity': '1',
                '-webkit-transition': 'opacity 0.5s ease-in-out',
                '-moz-transition': 'opacity 0.5s ease-in-out',
                '-ms-transition': 'opacity 0.5s ease-in-out',
                '-o-transition': 'opacity 0.5s ease-in-out',
                'animation-timing-function': 'ease',
                '-webkit-animation-timing-function': 'ease',
                'animation-iteration-count': '1',
                '-webkit-animation-iteration-count': '1'
            });
            $('.scroll-down').css('opacity', '1');
        }
        var scrollPos = $(window).scrollTop()+90;
        $('section.hero nav li a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('section.hero nav li').removeClass("active");
                currLink.parent().addClass("active");
            } else {
                currLink.parent().removeClass("active");
            }
        });
    });

    /****************************************************/
    /*         header shrinking when scrolling         */
    /****************************************************/
    var AnimatedHeader = (function() {

        var elem = document.documentElement,
            header = $('header'),
            didScroll = false,
            changeHeaderOn = viewport.height / 3.25;

        function init() {
            window.addEventListener('scroll', function(event) {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 250);
                }
            }, false);
        }

        function scrollPage() {
            var scroll_y = scrollY();
            if (scroll_y >= changeHeaderOn) {
                header.addClass('fixed-nav');
            } else {
                header.removeClass('fixed-nav');
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || elem.scrollTop;
        }

        init();
    }());
}());
