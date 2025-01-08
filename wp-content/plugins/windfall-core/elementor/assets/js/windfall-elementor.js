/*
Template Name: Windfall
Author: VictorTheme
Version: 1.0
Email: support@victortheme.com
*/

(function($) {
    'use strict';
    /*----- ELEMENTOR LOAD SWIPER CALL ---*/
    function SwiperSliderInit(slider_el) {
        //Atrakt Swiper Slider Script
        let animEndEv = 'webkitAnimationEnd animationend';
        let swipermw = (slider_el.hasClass('swiper-mousewheel')) ? true : false;
        let swiperkb = (slider_el.hasClass('swiper-keyboard')) ? true : false;
        let swipercentered = (slider_el.hasClass('swiper-center')) ? true : false;
        let swiperautoplay = slider_el.data('autoplay');
        let swiperinterval = slider_el.data('interval');
        let swiperloop = slider_el.data('loop');
        let swipermousedrag = slider_el.data('mousedrag');
        let swipereffect = slider_el.data('effect');
        let swiperclikable = slider_el.data('clickpage');
        let swiperspeed = slider_el.data('speed');
        let swiperinteraction = slider_el.data('interaction');

        let swipersitems = (slider_el.data('items')) ? slider_el.data('items') : 1;
        let swiperstabitems = (slider_el.data('tab-items')) ? slider_el.data('tab-items') : 1;
        let swipersmobileitems = (slider_el.data('mobile-items')) ? slider_el.data('mobile-items') : 1;

        //Atrakt Swiper Slides Script
        let autoplay = swiperinterval;

        // Init elementor swiper
        let Swiper = elementorFrontend.utils.swiper;
        initSwiper();

        async function initSwiper() {
            let slidervar = await new Swiper(slider_el, {
                autoplayDisableOnInteraction: swiperinteraction,
                slidesPerView: swipersitems,
                effect: swipereffect,
                speed: swiperspeed,
                loop: swiperloop,
                paginationClickable: swiperclikable,
                watchSlidesProgress: true,
                autoplay: swiperautoplay,
                simulateTouch: swipermousedrag,
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: swipersmobileitems,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: swipersmobileitems,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: swiperstabitems,
                    },
                    991: {
                        slidesPerView: swipersitems,
                    }
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                mousewheelControl: swipermw,
                keyboardControl: swiperkb,
            });
            slidervar.on('slideChange', function(s) {
                let currentSlide = $(slidervar.slides[slidervar.activeIndex]);
                let elems = currentSlide.find('.animated')
                elems.each(function() {
                    let $this = $(this);
                    let animationType = $this.data('animation');
                    $this.addClass(animationType, 100).on(animEndEv, function() {
                        $this.removeClass(animationType);
                    });
                });
            });
        }
    }
    /*----- ELEMENTOR LOAD FUNTION CALL ---*/

    $(window).on('elementor/frontend/init', function() {
        //Obra Owl Carousel Slider Script
        var owl_carousel = function() {
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

        }; // end

        // Add space for Elementor Menu Anchor link
        elementorFrontend.hooks.addFilter('frontend/handlers/menu_anchor/scroll_top_distance', function(scrollTop) {
            var headerheight;
            headerheight = $(".wndfal-header").outerHeight();
            return scrollTop - headerheight;
        });

        var item_hover_class = function(selector) {
            $(selector).on({
                mouseenter: function() {
                    $(this).addClass('wndfal-hover');
                },
                mouseleave: function() {
                    $(this).removeClass('wndfal-hover');
                }
            });
        };

        var EqualHeight = function() {
            $('.wndfal-item').matchHeight({
                property: 'height'
            });
            $('.wndfal-inner-item').matchHeight({
                property: 'height'
            });
        };

        // Gallery
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_gallery.default', function($scope, $) {
            owl_carousel();
            item_hover_class('.gallery-item');
        });

        // Features
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_features.default', function($scope, $) {
            item_hover_class('.feature-item');
        });

        // Offer
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_offer.default', function($scope, $) {
            item_hover_class('.offer-item');
        });

        // Intro
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_intro.default', function($scope, $) {
            item_hover_class('.intro-item');
        });

        // Download Item
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_download_item.default', function($scope, $) {
            item_hover_class('.download-item');
        });

        //Windfall client
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_client.default', function($scope, $) {
            owl_carousel();
            item_hover_class('.client-item');
        });

        //Windfall Pricing
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_pricing.default', function($scope, $) {
            $('.wndfal-item').matchHeight({
                property: 'height'
            });
        });

        //Windfall Testimonial Carousel
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_testimonial_carousel.default', function($scope, $) {
            owl_carousel();
        });

        //Windfall Team
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_team.default', function($scope, $) {
            owl_carousel();
        });
        //Windfall Slider
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_slider.default', function($scope, $) {
            //Windfall Swiper Slider Script
            let slider_el = $scope.find(".swiper-slides");
            SwiperSliderInit(slider_el);
        });

        //Windfall List
        elementorFrontend.hooks.addAction('frontend/element_ready/vt-windfall_list.default', function($scope, $) {
            $('[data-toggle="tooltip"]').tooltip();
            var Tooltip = $.fn.tooltip.Constructor;
            $.extend(Tooltip.Default, {
                customClass: '',
            });
            var _show = Tooltip.prototype.show;
            Tooltip.prototype.show = function() {
                _show.apply(this, Array.prototype.slice.apply(arguments));
                if (this.config.customClass) {
                    var tip = this.getTipElement();
                    $(tip).addClass(this.config.customClass);
                }
            };
        });

    });

})(jQuery);