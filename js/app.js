(function() {
    // 'use strict';

    var zIndex = [],
        zHolder = '',
        zSplit = [];

    // store and modify the section's z-index when gallery happens...
    $.each($('section'), function(key) {
        zIndex.push($('section').eq(key).css('z-index'));
        zHolder = zIndex.join([separator = ',']);
        zSplit = zHolder.split(',');
    });

    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
        isIE = /*@cc_on!@*/ false || !!document.documentMode,
        viewport = {
            height: $(window).height(),
            width: $(window).width()
        },
        fullVH = $('.fullVH'),
        fullVW = $('.fullVW'),
        halfVH = $('.halfVH'),
        heroSection = $('section.hero'),
        heroHeader = $('h1.hero-header');

    $('.parallax').parallax();

    var safariCheck = function() {
        if (isSafari) {
            fullVH.css('height', window.innerHeight + "px");
            halfVH.css('height', window.innerHeight / 2 + "px");
            if (window.innerWidth === 320) {
                heroHeader.css({
                    'font-size': window.innerWidth / 12.5 + 'px',
                    'line-height': window.innerWidth / 9 + 'px'
                });
            } else {
                heroHeader.css({
                    'font-size': window.innerWidth / 24 + 'px',
                    'line-height': window.innerWidth / 22 + 'px'
                });

            }
        } else {
            fullVH.css('height', viewport.height + 'px');
            halfVH.css('height', viewport.height / 2 + 'px');
            
            if (viewport.width < 571) {
                heroHeader.css({
                    'font-size': viewport.width / 12.5 + 'px',
                    'line-height': viewport.width / 9 + 'px'
                });
            } else {
                heroHeader.css({
                    'font-size': viewport.width / 24 + 'px',
                    'line-height': viewport.width / 22 + 'px'
                });

            }

        }
    };
    safariCheck();
    var servicesCol = $('.services-row>.col.s4'),
        setColHeight = servicesCol.eq(0).height();
    servicesCol.eq(1).css('height', setColHeight + 'px');
    servicesCol.eq(2).css('height', setColHeight + 'px');

    //smoothscroll
    $('nav li > a[href^="#"]').on('click', function(e) {
        if (viewport.width > 480) {
            e.preventDefault();
            //$(document).off("scroll");

            $('a').each(function() {
                $(this).parent().removeClass('active');
            });
            $(this).parent().addClass('active');
            var hasshh = this.href.match(/(#)([a-z]+)/g)[0];
            if (hasshh === '#services') {
                if (!$('.services-row').hasClass('fade-In-Up')) {
                    $('.services-row').addClass('fade-In-Up');
                }
            }
            var target = this.hash,
                menu = target;
            $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + 2
            }, 500, 'swing', function() {
                window.location.hash = target;
            });
        } else {
            return;
        }

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
        var scrollPos = $(window).scrollTop() + 90;
        $('section.hero nav li a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('section.hero nav li').removeClass("active");
                currLink.parent().addClass("active");
                //console.log(currLink.attr("href")); 
                //window.location.hash = currLink.attr("href"); 
            } else {
                currLink.parent().removeClass("active");
            }
        });
    });

    var elem = document.documentElement,
        header = $('header');

    /****************************************************/
    /*         header shrinking when scrolling         */
    /****************************************************/
    var AnimatedHeader = (function() {

        var didScroll = false,
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
        if (viewport.width > 480) {
            init();
        }
    }());

    /***************************************/
    /*        image gallery builder        */
    /***************************************/

    var imageGallery = function() {
        $.getJSON("data/gallery.json", function(data) {
            var items = {},
                stored = {};
            // min = i, max = data[key].images     
            function prevImage(min, max) {
                if (min < 1) {
                    return max;
                } else {
                    return min;
                }
            }

            function nextImage(min, max) {
                if (min === (max - 1)) {
                    return 2;
                } else {
                    return min + 2;
                }
            }
            $.each(data, function(key, val) {
                items[key] = [];
                stored[key] = [];
                for (var i = 0; i < +data[key].images; i++) {
                    if (key !== 'path') {
                        items[key].push("<div id='" + key + "-" + (i + 1) + "' class='overlay'><a class='close' href='#page'><span class='icon-close-x'></span></a><a href='#" + key + "-" + prevImage(i, data[key].images) + "' class='prev'><span class='icon-angle-left2'></span></a><a href='#" + key + "-" + (nextImage(i, data[key].images)) + "' class='next'><span class='icon-angle-right2'></span></a><a href='#" + key + "-" + (nextImage(i, data[key].images)) + "' class='image-holder'><img src='" + data.path + "" + key + "/" + (i + 1) + ".jpg' alt='" + data[key].alt + "'/></a></div>");
                    }
                }
                stored[key].push([items[key].join("")]);
                $('figure.' + key).append($('<div class="gallery-' + key + '">' + stored[key] + '</div>'));
            });

        });
    };
    imageGallery();
    var galleryPictures = $('#gallery figure');
    function galleryFocus(){
        if(319<window.innerWidth<570){
            $.each(galleryPictures, function(key, val){
                console.log( galleryPictures.eq(key).offset() );
                console.log(window.pageYOffset);
            });

        }
    }
    galleryFocus();
    $('section').on('click', function(e) {
        var $target = $(e.target);

        if ($target.offsetParent()[0].nodeName.toLowerCase() === 'figcaption' || $target.offsetParent()[0].nodeName.toLowerCase() === 'figure') {
            $.each($('section'), function(key, val) {
                $('section').eq(key).css('z-index', '0');
            });
            $('section#gallery').css('z-index', '999');
        }
        if ($target.hasClass('overlay') || $target.hasClass('icon-close-x')) {
            $.each($('section'), function(key, val) {
                $('section').eq(key).css('z-index', zSplit[key]);
            });
            window.location.hash = '#page';
        }
    });

    function inputCheck() {
        var inputField = $('input#input-email');
        var inputLabel = $('span.input__label-content');
        inputField.on('input', function(e) {
            if (inputField.val() !== '') {
                inputLabel.css('visibility', 'hidden');
            } else {
                inputLabel.css('visibility', 'visible');
            }
        });
    }
    inputCheck();

    function responsiveMenu() {
        var smallHeader = $('.small-header'),
            openMenu = $('ul#small-menu'),
            smallMenu = $('a.small-menu-button')[0];
        $('.small-menu-button').on('click', function(e) {
            var target = e.target;
            if (openMenu.css('display') === 'block') {
                smallMenu.href = '#page';
            } else if ((openMenu.css('display') === 'none')) {
                smallMenu.href = '#small-menu';
                //openMenu.css('display', 'none');
            }
        });
    }
    responsiveMenu();


   // -------------------------------------------------
var some = $( window ).height();
var elements = $('figure'), // the object we are checking
    viewportHeight = some; //window.innerHeight || document.body.clientHeight || $(document).height(),  
    midfunc = function(e){
        var middleElement;
      
        if( e && e.type == 'resize' ){
            viewportHeight = $( window ).height(); //window.innerHeight || document.body.clientHeight || $(document).height();
        }
        elements.each(function(){
            var pos = this.getBoundingClientRect().top;
            // if an element is more or less in the middle of the viewport
          // אם גדול משליש אבל קטן מחצי
            if( pos > viewportHeight/3 && pos < viewportHeight/2 ){
              //console.log(pos + " : " + viewportHeight/3 + " : " + viewportHeight/2);
                middleElement = this;
              if(!$(middleElement).hasClass('hover')){
                $(middleElement).addClass('hover');
                alert('working');
              }             
                return false; // stop iteration 
            }
           if ( (this.getBoundingClientRect().top > 500) || (this.getBoundingClientRect().bottom < 375) ){
             $(this).removeClass('hover');
              }
        });
        
    };

if (viewport.width < 571){
    $(window).on('scroll resize', midfunc);
} 

  var form = $('form'); // contact form
  var submit = $('#submit');  // submit button
  var greet = $('.greet'); // greet div for show greet message

  // form submit actions
  form.on('submit', function(e) {
    e.preventDefault(); // prevent default form submit

    $.ajax({
      url: 'php/form-to-email.php', // form action url
      type: 'POST', // form submit method get/post
      dataType: 'html', // request type html/json/xml
      //data: form.serialize(), // serialize form data 
      success: function(data) {
        greet.removeClass('hide'); // fade in response data
        form.hide(500);
      },
      error: function(e) {
        console.log("something went wrong: "+ e);
      }
    });
  });

}());
