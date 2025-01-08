jQuery(document).ready(function($) {
    "use strict";
    //Wndfal Sticky Script
    $('.wndfal-header.wndfal-sticky').WindfallSticky({
        topSpacing: 0,
        zIndex: 4
    });

    //Wndfal Add Class CSS Script
    $('.wndfal-toggle').on('click', function() {
        $(this).toggleClass('active');
    });

    $('li.has-dropdown ul.dropdown-nav li.has-dropdown').addClass('sub');

    //Wndfal Onclick Slideup Slidedown Parent And Add Class Script
    $('.dropdown-arrow').on('click', function() {
        var element = $(this).parent('.has-dropdown');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('.has-dropdown').removeClass('open');
            element.find('.dropdown-nav').slideUp();
        } else {
            element.addClass('open');
            element.children('.dropdown-nav').slideDown();
            element.siblings('.has-dropdown').children('.dropdown-nav').slideUp();
            element.siblings('.has-dropdown').removeClass('open');
            element.siblings('.has-dropdown').find('.has-dropdown').removeClass('open');
            element.siblings('.has-dropdown').find('.dropdown-nav').slideUp();
        }
    });
    $('.fw-btn-submit').on('click', function() {
        if ($('.fw-btn-submit').hasClass('fw-submit-success')) {
            $('.fw-wizard-step-container').hide();
        }
    });

    //Wndfal Search Box Script
    $('html').on('click', function() {
        $('.search-box').fadeOut(300).removeClass('open');
    });
    $('.search-link').on('click', function(e) {
        e.stopPropagation();
        $('.search-box').find('input[type="text"]').focus();
    });
    $('.search-link a').on('click', function() {
        $('.search-box').fadeToggle(300).toggleClass('open');
    });

    //Wndfal Parallax Script
    $(window).resize(function() {

        // Mean nav margin top - Header Two
        var $headerHeight = $('.header-style-two .wndfal-header').outerHeight();
        $('.header-style-two .mean-nav').css('margin-top', $headerHeight);
        // Header One
        var $headerHeight_one = $('.header-style-one .navigation-wrap').outerHeight();
        $('.header-style-one .mean-nav').css('margin-top', $headerHeight_one);

        // Mean Toggle Top Value - Header Two
        var $meantop = $('.header-style-two .wndfal-header').outerHeight() / 2;
        $('.header-style-two .mean-container a.meanmenu-reveal').css('top', $meantop);
        // Header One
        var $meantop_one = $('.header-style-one .navigation-wrap').outerHeight() / 2;
        $('.header-style-one .mean-container a.meanmenu-reveal').css('top', $meantop_one);

        if (screen.width >= 768) {
            $('.wndfal-parallax').jarallax({
                speed: 0.6,
            });
        };
        if (screen.width >= 1200) {
            $('.wndfal-sticky-footer .main-wrap-inner').css('margin-bottom', $('.wndfal-footer').outerHeight());
        };
    });
    $(window).trigger('resize');

    //Wndfal Hover Script
    $(".industry-item, .service-item, .partner-item, .intro-item, .offer-item, li.product, .blog-item, .feature-item, .customer-item, .download-item, .services-style-two .service-item, .mate-item, .gallery-item").mouseenter(function() {
        $(this).addClass('wndfal-hover');
    });
    $(".industry-item, .service-item, .partner-item, .intro-item, .offer-item, li.product, .blog-item, .feature-item, .customer-item, .download-item, .services-style-two .service-item, .mate-item, .gallery-item").mouseleave(function() {
        $(this).removeClass('wndfal-hover');
    });

    $(".industry-item").mouseenter(function() {
        $(this).find('.industry-info-inner').first().stop(true, true).slideDown(300);
    });
    $(".industry-item").mouseleave(function() {
        $(this).find('.industry-info-inner').first().stop(true, true).slideUp(300);
    });

    //Wndfal Datepicker Script
    $('#datepicker').datepicker({
        autoHide: true,
    });

    //Cosgrove Clockpicker Script
    var input = $('#clockpicker').clockpicker({
        autoclose: true,
    });

    //Wndfal Counter Script
    $('.wndfal-counter').each(function() {
        var $counter = $(this);
        var countdelay = $counter.data('delay');
        var counttime = $counter.data('time');
        $counter.counterUp({
            delay: countdelay,
            time: counttime,
        });
    });

    //Wndfal Magnific Popup Script
    $('.wndfal-popup').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        removalDelay: 100,
        mainClass: 'mfp-fade mfp-img-mobile',
        closeMarkup: '<div class="mfp-close" title="%title%"></div>',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true,
            arrowMarkup: '<div title="%title%" class="mfp-arrow mfp-arrow-%dir%"></div>',
        },
    });

    //Wndfal Magnific Popup Video Script
    $('.wndfal-popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        type: 'iframe',
        closeMarkup: '<div class="mfp-close" title="%title%"></div>',
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                },
                dailymotion: {
                    index: 'dailymotion.com/',
                    id: function(url) {
                        var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                        if (!m || !m[2]) return null;
                        return m[2];
                    },
                    src: 'https://iframespot.blogspot.com/ncr/?m=0&type=dv&url=https%3A%2F%2Fwww.dailymotion.com%2Fembed%2Fvideo%2F%id%%3Fapi%3D0%26autoplay%3D1%26info%3D0%26logo%3D0%26social%3D0%26related%3D0'
                }
            }
        }
    });

    //Windfall Set Equal Height Script
    $('.woocommerce ul.products li.product').matchHeight({
        property: 'height'
    });

    //Wndfal Sticky Sidebar Script
    $('.wndfal-sticky-sidebar').theiaStickySidebar({
        additionalMarginTop: 200,
        additionalMarginBottom: 10,
    });

    $(window).load(function() {

        // onpage nave hash link animation
        $(".smooth-scroll .mean-container ul li a[href^='#']").on('click', function(e) {
            $(".meanmenu-reveal").click();
        });

        $('[type=range]').each(function() {
            var $rangeSlider = $(this);
            var $mainValue = $rangeSlider.attr('value');
            var $minValue = ($rangeSlider.attr('min') !== undefined) ? $rangeSlider.attr('min') : 0;
            var $maxValue = ($rangeSlider.attr('max') !== undefined) ? $rangeSlider.attr('max') : 1500;
            var $stepValue = ($rangeSlider.attr('step') !== undefined) ? $rangeSlider.attr('step') : 1;
            $rangeSlider.slider({
                tooltip_position: 'bottom',
                value: $mainValue,
                min: $minValue,
                max: $maxValue,
                step: $stepValue,
            });
            $rangeSlider.slider();
            $rangeSlider.on('slide', function(slideEvt) {
                $('.square-value > input, .square-value').val(slideEvt.value);
            });
        });

        // Mean nav margin top
        var $headerHeight = $('.header-style-two .wndfal-header').outerHeight();
        $('.header-style-two .mean-nav').css('margin-top', $headerHeight);
        // Mean Toggle Top Value
        var $meantop = $('.header-style-two .wndfal-header').outerHeight() / 2;
        $('.header-style-two .mean-container a.meanmenu-reveal').css('top', $meantop);

        //Wndfal Owl Carousel Slider Script
        $('.owl-carousel').each(function() {
            var $carousel = $(this);
            var $items = ($carousel.data('items') !== undefined) ? $carousel.data('items') : 1;
            var $items_tablet = ($carousel.data('items-tablet') !== undefined) ? $carousel.data('items-tablet') : 1;
            var $items_mobile_landscape = ($carousel.data('items-mobile-landscape') !== undefined) ? $carousel.data('items-mobile-landscape') : 1;
            var $items_mobile_portrait = ($carousel.data('items-mobile-portrait') !== undefined) ? $carousel.data('items-mobile-portrait') : 1;
            $carousel.owlCarousel({
                loop: ($carousel.data('loop') !== undefined) ? $carousel.data('loop') : true,
                items: $carousel.data('items'),
                margin: ($carousel.data('margin') !== undefined) ? $carousel.data('margin') : 0,
                dots: ($carousel.data('dots') !== undefined) ? $carousel.data('dots') : true,
                nav: ($carousel.data('nav') !== undefined) ? $carousel.data('nav') : false,
                navText: ["<div class='slider-no-current'><span class='current-no'></span><span class='total-no'></span></div><span class='current-monials'></span>", "<div class='slider-no-next'></div><span class='next-monials'></span>"],
                autoplay: ($carousel.data('autoplay') !== undefined) ? $carousel.data('autoplay') : false,
                autoplayTimeout: ($carousel.data('autoplay-timeout') !== undefined) ? $carousel.data('autoplay-timeout') : 5000,
                animateIn: ($carousel.data('animatein') !== undefined) ? $carousel.data('animatein') : false,
                animateOut: ($carousel.data('animateout') !== undefined) ? $carousel.data('animateout') : false,
                mouseDrag: ($carousel.data('mouse-drag') !== undefined) ? $carousel.data('mouse-drag') : true,
                autoWidth: ($carousel.data('auto-width') !== undefined) ? $carousel.data('auto-width') : false,
                autoHeight: ($carousel.data('auto-height') !== undefined) ? $carousel.data('auto-height') : false,
                center: ($carousel.data('center') !== undefined) ? $carousel.data('center') : false,
                // RTL Change
                rtl: ($carousel.data('rtl') !== undefined) ? $carousel.data('rtl') : false,
                responsiveClass: true,
                dotsEachNumber: true,
                smartSpeed: 600,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: $items_mobile_portrait,
                    },
                    480: {
                        items: $items_mobile_landscape,
                    },
                    768: {
                        items: $items_tablet,
                    },
                    992: {
                        items: $items,
                    }
                }
            });
            var totLength = $('.owl-dot', $carousel).length;
            $('.total-no', $carousel).html(totLength);
            $('.current-no', $carousel).html(totLength);
            $carousel.owlCarousel();
            $('.current-no', $carousel).html(1);
            $carousel.on('changed.owl.carousel', function(event) {
                var total_items = event.page.count;
                var currentNum = event.page.index + 1;
                $('.total-no', $carousel).html(total_items);
                $('.current-no', $carousel).html(currentNum);
            });
        });

        var $grid = $('.wndfal-masonry').isotope({
            itemSelector: '.masonry-item',
            layoutMode: 'packery',
            percentPosition: true,
            isFitWidth: true,
        });
        var filterFns = {
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };
        $('.masonry-filters.normal-filter').on('click', 'li a', function() {
            var filterValue = $(this).attr('data-filter');
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue
            });
        });
        $('.masonry-filters.normal-filter').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'li a', function() {
                $buttonGroup.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });

        //Wndfal Preloader Script
        $('.wndfal-preloader').fadeOut(500);

    });

    // Windfall Estimate Calculator CheckBox
    $(".estimation-item [type=checkbox]").change(function() {
        if ($(this).is(':checked')) {
            $(this).parent('label').addClass("checkbox-icon-checked");
        } else {
            $(this).parent('label').removeClass("checkbox-icon-checked");
        }
    });

    // Windfall Estimate Calculator CheckBox - Each reload selected mode
    $(".estimation-item [type=checkbox]").each(function() {
        if ($(this).is(':checked')) {
            $(this).parent('label').addClass("checkbox-icon-checked");
        } else {
            $(this).parent('label').removeClass("checkbox-icon-checked");
        }
    });

    //Wndfal Custom Select Script
    $('select').niceSelect();
    $('.woocommerce-Reviews select,.wndfal-widget.woocommerce select, .woocommerce div.product form.cart .variations select, .shipping-calculator-form select').niceSelect('destroy');

    // Mean Menu
    var $navmenu = $('nav');
    var $menu_starts = ($navmenu.data('nav') !== undefined) ? $navmenu.data('nav') : 1199;
    $('.wndfal-navigation').meanmenu({
        meanMenuContainer: '.header-style-one.container-menubar .wndfal-header .navigation-wrap, .header-style-two .wndfal-header > .container, .header-style-one.fullwidth-menubar .wndfal-header .navigation-wrap > .container',
        meanMenuOpen: '<span></span>',
        meanMenuClose: '<span></span>',
        meanExpand: '<i class="fa fa-angle-down"></i>',
        meanContract: '<i class="fa fa-angle-up"></i>',
        meanScreenWidth: $menu_starts,
    });

    //Wndfal Responsive Tabs Script
    $('.woocommerce-tabs').responsiveTabs({
        collapsible: false,
        animation: 'fade',
        duration: 0,
        active: 0,
    });

    //Wndfal Rating Script
    $('.wndfal-rating').rateYo({
        rating: 4,
        starWidth: '12px',
        spacing: '1px',
        ratedFill: '#ff6600',
        normalFill: '#cccccc'
    });

    //Wndfal Payment Method Input Script
    $('#diffrent_address:checked').parents('.diffrent-address').children('.shipping-diffrent-address').slideToggle();
    $('#createaccount:checked').parents('.create-account').next('.create-account').slideToggle();
    $('.wc_payment_method input:checked').parents().children('.payment_box').slideToggle();
    $('.wc_payment_method input').on('click', function() {
        $('.wc_payment_method input:not(:checked)').parents().children('.payment_box').slideUp();
        $('.wc_payment_method input:checked').parents().children('.payment_box').slideToggle();
    });

    //Wndfal Back Top Script
    if ($('div').hasClass('wndfal-back-top')) {
        var backtop = $('.wndfal-back-top');
        var position = backtop.offset().top;
    }
    $(window).scroll(function() {
        // Sticky Header
        $('.wndfal-header').WindfallSticky('update');

        //Wndfal Floating Sidebar Script
        var $window = jQuery(window),
            $flotingbar = jQuery('.wndfal-floating-sidebar'),
            offset = jQuery('.wndfal-mid-wrap').offset(),
            $scrolling = jQuery('.wndfal-primary').height(),
            $offsetHeight = jQuery('.wndfal-primary').offset(),
            $topHeight = 0;
        if (jQuery('.wndfal-floating-sidebar').length > 0) {
            if ($window.width() > 1199) {
                if (($window.scrollTop() + $topHeight) > offset.top) {
                    if ($window.scrollTop() + $topHeight + $flotingbar.height() + 50 < $offsetHeight.top + $scrolling) {
                        $flotingbar.stop().animate({
                            marginTop: ($window.scrollTop() - offset.top) + $topHeight + 120,
                        });
                    } else {
                        $flotingbar.stop().animate({
                            marginTop: ($scrolling - $flotingbar.height() - 80) + 80,
                        });
                    }
                } else {
                    $flotingbar.stop().animate({
                        marginTop: 0,
                    });
                }
            } else {
                $flotingbar.css('margin-top', 0);
            }
        }
        // Back to top
        if ($('div').hasClass('wndfal-back-top')) {
            var windowposition = $(window).scrollTop();
            if (windowposition + $(window).height() == $(document).height()) {
                backtop.removeClass('active');
            } else if (windowposition > 150) {
                backtop.addClass('active');
            } else {
                backtop.removeClass('active');
            }
        }
    });
    jQuery('.wndfal-back-top a').on('click', function() {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 2000);
        return false;
    });

    if ($('div').hasClass('wndfal-popup')) {
        $(this).find('a').attr("data-elementor-open-lightbox", "no");
    }

});