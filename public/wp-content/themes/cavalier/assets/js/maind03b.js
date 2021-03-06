(function ($) {
    "use strict";

    /*--------------------------
    preloader
    ---------------------------- */

    var pre_loader = $('#preloader')
    pre_loader.fadeOut('slow', function () {
        $(this).remove();
    });


    /*---------------------
      venobox
    --------------------- */
    var veno_box = $('.venobox');
    veno_box.venobox();

    /*------------------------------------
     search option
    ------------------------------------- */
    $('.search-option').hide();
    $(".main-search").on('click', function () {
        $('.search-option').animate({
            height: 'toggle',
        });
    });
    /*---------------------
     TOP Menu Stick
    --------------------- */
    var windows = $(window);
    var sticky = $('#sticker');

    windows.on('scroll', function () {
        var scroll = windows.scrollTop();
        if (scroll < 100) {
            sticky.removeClass('stick');
        } else {
            sticky.addClass('stick');
        }
    });
    /*----------------------------
     jQuery MeanMenu
    ------------------------------ */
    var mean_menu = $('nav#dropdown');
    mean_menu.meanmenu();

    /*--------------------------
     scrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*--------------------------
     collapse
    ---------------------------- */
    var panel_test = $('.panel-heading a');
    panel_test.on('click', function () {
        panel_test.removeClass('active');
        $(this).addClass('active');
    });

    /*--------------------------
     MagnificPopup
    ---------------------------- */


    /*--------------------------
         slider carousel
    ---------------------------- */

    $(window).on("load", function () {
        var intro_carousel = $('.intro-carousel');
        intro_carousel.owlCarousel({
            loop: true,
            nav: true,
            autoplay: true,
            dots: false,
            navText: ["<i class='icon icon-chevron-left'></i>", "<i class='icon icon-chevron-right'></i>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    });

    /*--------------------------
         Services carousel
    ---------------------------- */
    var services_carousel = $('.services-carousel');
    services_carousel.owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        dots: false,
        navText: ["<i class='icon icon-chevron-left'></i>", "<i class='icon icon-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });
    /*----------------------------
     isotope active
    ------------------------------ */
    // project start
    $(window).on("load", function () {
        var $container = $('.project-content');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.project-menu li a').on("click", function () {
            $('.project-menu li a.active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
    //portfolio end

    /*---------------------
     Testimonial carousel
    ---------------------*/
    var review = $('.testimonial-carousel');
    review.owlCarousel({
        loop: true,
        nav: true,
        margin: 40,
        dots: false,
        autoplay: true,
        navText: ["<i class='icon icon-chevron-left'></i>", "<i class='icon icon-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    /*--------------------------
         Game details carousel
    ---------------------------- */
    var game_carousel = $('.game-carousel');
    game_carousel.owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        dots: false,
        navText: ["<i class='icon icon-chevron-left'></i>", "<i class='icon icon-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    jQuery(".image_background").each(function () {
        var attr = $(this).attr('data-image-src');

        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url(' + attr + ')');
        }

    });

})(jQuery);