jQuery(document).ready(function($) {
    "use strict";
    /**
     * Load category tab.
     */

    ajax_pagenav();

    $('.masonry-filters.ajax-filter ul li').on('click', 'a', function(e) {
        e.preventDefault();

        $('.masonry-filters.ajax-filter ul li a').removeClass('active');
        $(this).addClass('active');

        var cat_ids = $(this).data('ids'),
            cat = $(this).data('cat'),
            limit = $(this).data('limit'),
            style = $(this).data('style'),
            caption = $(this).data('caption');

        $.ajax({
            type: 'POST',
            dataType: 'html',
            url: windfall_admin_url.ajaxurl,
            data: {
                'cat': cat,
                'limit': limit,
                'caption': caption,
                'action': 'windfall_gallery_ajax'
            },
            beforeSend: function() {
                $('.wndfal-masonry').isotope('reloadItems').isotope();
                $('.wndfal-masonry').append('<div class="post-spinner"><div class="loader-wrap"><div class="loader"><div class="loader-inner ball-pulse"></div></div></div></div>');
                $('.loader-inner').loaders();
                $(".ajax-page-numbers").hide();
            },
            success: function(data) {
                $('.wndfal-masonry').isotope('reloadItems').isotope();
                $(".wndfal-masonry").html(data);

                $(".gallery-item").mouseenter(function() {
                    $(this).addClass('wndfal-hover');
                });
                $(".gallery-item").mouseleave(function() {
                    $(this).removeClass('wndfal-hover');
                });
                var $masonryheight = $(".wndfal-masonry").height();
                $(".crmny-galry-data").css('height', $masonryheight);

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

                setTimeout(ajax_pagenav, 100);
                $('.wndfal-pagi').hide();

            },
        });
    });

    function ajax_pagenav() {
        $(".ajax-page-numbers li").on('click', 'a', function(e) {
            e.preventDefault();

            var page_no = $(this).data("page"),
                cat_slug = $(".masonry-filters.ajax-filter ul li a.active").data("cat"),
                limit = $(this).data('limit'),
                caption = $(".masonry-filters.ajax-filter ul li a.active").data('caption');

            $.ajax({
                type: 'POST',
                dataType: 'html',
                url: windfall_admin_url.ajaxurl,
                data: {
                    'cat': cat_slug,
                    'offset': page_no,
                    'limit': limit,
                    'caption': caption,
                    'action': 'windfall_more_gallery_ajax_pagi'
                },
                beforeSend: function() {
                    $('.wndfal-masonry').isotope('reloadItems').isotope();
                    $('.wndfal-masonry').append('<div class="post-spinner"><div class="loader-wrap"><div class="loader"><div class="loader-inner ball-pulse"></div></div></div></div>');
                    $('.loader-inner').loaders();
                },
                success: function(data) {
                    $('.wndfal-masonry').isotope('reloadItems').isotope();
                    $(".wndfal-masonry").html(data);
                    var $masonryheight = $(".wndfal-masonry").height();
                    $(".crmny-galry-data").css('height', $masonryheight);
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
                },
                complete: function(data) {
                    // Pagination data link update
                    setTimeout(function() {
                        $('.wndfal-masonry').isotope('reloadItems').isotope();
                        var $masonryheight = $(".wndfal-masonry").height();
                        $(".crmny-galry-data").css('height', $masonryheight);
                    }, 100);
                    $(".ajax-page-numbers .last").remove();
                    $(".ajax-page-numbers .first").remove();
                    $('.ajax-page-numbers a').removeClass('current disabled-click');
                    $('.ajax-page-numbers a[data-page = ' + page_no + ']').addClass('current disabled-click');
                    if (page_no > 1) {
                        $(".ajax-page-numbers").prepend('<li class="first update-item"><a class="prev page-numbers" data-page="' + (page_no - 1) + '" href="#"><i class="fa fa-angle-left"></i></a></li>');
                    }
                    var navcount = $(".ajax-page-numbers > li").not('.update-item').length;
                    if (navcount >= (page_no + 1)) {
                        $(".ajax-page-numbers").append('<li class="last update-item"><a class="next page-numbers" data-page="' + (page_no + 1) + '" href="#"><i class="fa fa-angle-right"></i></a></li>');
                    }
                    $(".gallery-item").mouseenter(function() {
                        $(this).addClass('wndfal-hover');
                    });
                    $(".gallery-item").mouseleave(function() {
                        $(this).removeClass('wndfal-hover');
                    });

                    ajax_pagenav();
                    $('.wndfal-pagi').hide();
                }
            });

        });
    }

});