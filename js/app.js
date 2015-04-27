(function() {
    'use strict';

    var viewport = {
            height: $(window).height(),
            width: $(window).width()
        },
        fullVH = $('.fullVH'),
        overFullVH = $('.over-full-VH'),
        threehalfVH = $('.threehalfVH'),
        heroSection = $('section.hero');
    overFullVH.css('min-height', viewport.height*1.25 + 'px');
    overFullVH.css('min-width', viewport.width + 'px');
    fullVH.css('min-height', viewport.height + 'px');
    fullVH.css('min-width', viewport.width + 'px');
    var halfVH = $('.halfVH');
    halfVH.css('min-height', viewport.height / 2 + 'px');
    halfVH.css('min-width', viewport.width + 'px');
    console.log(viewport.height + " : " + viewport.width);
    heroSection.css('display', 'table');
    var heroHeader = $('h1.hero-header');
    heroHeader.css({
        'font-size': viewport.width / 24 + 'px',
        'line-height': viewport.width / 22 + 'px'
    });

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
    });
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
    });

    // var AnimatedHeader = (function() {

    // 	var elem = document.documentElement,
    // 		header = $( 'header' ),
    // 		didScroll = false,
    // 		changeHeaderOn = 300;

    // 	function init() {
    // 		window.addEventListener( 'scroll', function( event ) {
    // 			if( !didScroll ) {
    // 				didScroll = true;
    // 				setTimeout( scrollPage, 250 );
    // 			}
    // 		}, false );
    // 	}

    // 	function scrollPage() {
    // 		var scroll_y = scrollY();
    // 		if ( scroll_y >= changeHeaderOn ) {
    // 			header.addClass('header-small');
    // 		}
    // 		else {
    // 			header.removeClass('header-small');
    // 		}
    // 		didScroll = false;
    // 	}

    // 	function scrollY() {
    // 		return window.pageYOffset || elem.scrollTop;
    // 	}

    // 	init();
    // }());
}());
