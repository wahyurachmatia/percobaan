(function ($) {

    'use strict';

    $.exists = function(selector) {
        return ($(selector).length > 0);
    }
    $.noexists = function(selector) {
        return ($(selector).length < 0);
    }
    
    $('.text-component a > img').parent('a').addClass('has-img');
    $('.text-component__inner .twitter-tweet').parent('.media-wrapper').addClass('twitter-embed');

    ms_header_menu();
    ms_page_transition();
    ms_theme_mode();
    ms_menu_mokko_button();
    ms_menu_default_mobile();
    ms_excerpt_plyr();
    ms_excerpt_gallery();
    ms_search_widget();
    ms_woo_quantity();
    ms_woo_category_loop();
    ms_woo_product_image();
    ms_video_background();
    ms_clipboard();

    // Elementor Controllers
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_gallery.default', ms_lightbox );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms-hero.default', ms_parallax_hero );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_google_map.default', ms_initMap );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_projects.default', ms_video_thumb );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_slider.default', ms_slider );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_animated_headline.default', ms_headline );
        if (typeof elementor !== 'undefined' && elementorFrontend.isEditMode()) {
            // empty
        } else {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_projects.default', ms_load_more_btn );
        }
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_posts.default', ms_isotope_card_grid );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_gallery.default', ms_masonry_gallery );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_text_ticker.default', ms_text_ticker );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_projects.default', ms_masonry_gallery );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_video_button.default', ms_video_button );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_accordion.default', ms_accordion_widget );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ms_projects.default', ms_custom_cursor_portfolio );
    });

    // Menu Btn Open
    var menu_open = false;

    // LocomotiveScroll
    var data_scroll = $('body').attr('data-smooth-scroll'),
    smscroll = ( 'on' == data_scroll ) ? true : false;

    const locoScroll = new LocomotiveScroll({
        lenisOptions: {
            wrapper: window,
            content: document.documentElement,
            lerp: 0.1,
            duration: 1.2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: smscroll,
            smoothTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            normalizeWheel: true,                
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
        autoStart: false,
        scrollCallback: onScroll,            
    });

    $(document).ready(function(){
        requestAnimationFrame(() => {
            setTimeout(() => {
                locoScroll.start();
            }, 1000);
        });

    });

    function onScroll({ scroll }) {
        
        // btt button
        if ($.exists('.back-to-top')) {
            const backToTop = document.querySelector(".back-to-top");
            const visibilityClass = 'active';
            if ( scroll > 300 ) {
                backToTop.classList.add(visibilityClass);
            } else {
                backToTop.classList.remove(visibilityClass);
            }
        }
        // fixed menu

        if ($(window).width() > 1023 && $.exists('body[data-menu="fixed"]') ) {
            
            if ( scroll > 50 ) {
                $('.main-header__inner').addClass('move');                    
            } else {
                $('.main-header__inner').removeClass('move');
            }
        } else {
            $('.main-header__inner').removeClass('move');
        }

    }

    function ms_headline($scope) {
        
        Splitting();

        const element = $scope.find('.ms-ah-wrapper');
        const el_title = element.find('.content__title');

        if ( element.has("splitting") ) {
            $('.content__title').css('opacity', '1');
        }

        const fx1Titles = [...element[0].querySelectorAll('.content__title[data-splitting][data-effect1]')];
        const fx2Titles = [...element[0].querySelectorAll('.content__title[data-splitting][data-effect2]')];
        const fx3Titles = [...element[0].querySelectorAll('.content__title[data-splitting][data-effect3]')];
        const fx4Titles = [...element[0].querySelectorAll('.content__title[data-splitting][data-effect4]')];
        const fx5Titles = [...element[0].querySelectorAll('.content__title[data-splitting][data-effect5]')];
        const fx6Titles = [...element[0].querySelectorAll('.content__title[data-splitting][data-effect6]')];


        function scrolltrigger(animation) {

            if ( el_title.attr('data-scroll') == 'off' ) {
                if ($('body').hasClass('transition-effect')){
                    var del_time = '1400';
                } else {
                    var del_time = '0';
                }
                animation.scrollTrigger.disable();
                $( document ).ready(function() {
                    setTimeout(function() {
                        animation.play();
                   }, del_time);
                });
            } else {
                animation.scrollTrigger.enable();
            }
        }

        fx1Titles.forEach(title => {

            const words = title.querySelectorAll('.word');
    
            for (const word of words) {

                const chars = word.querySelectorAll('.char');

                chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 
    
                const animation = gsap.fromTo(chars, { 
                    'will-change': 'opacity, transform', 
                    transformOrigin: '100% 50%',
                    alpha: 0, 
                    rotationY: -90,
                    z: -300
                },
                {
                    ease: 'expo',
                    alpha: 1,
                    rotationY: 0,
                    z: 0,
                    duration: 3,
                    stagger: { each: 0.06, from: 'end'},
                    scrollTrigger: {
                        trigger: word,
                        start: 'bottom bottom',
                        end: 'top top',
                        scrub: true,
                    },
                });
                scrolltrigger(animation);
            }

        });

        fx2Titles.forEach(title => {
        
            const words = title.querySelectorAll('.word');
            
            for (const word of words) {
    
                const chars = word.querySelectorAll('.char');
    
                chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 
    
                const animation = gsap.fromTo(chars, { 
                    'will-change': 'opacity, transform', 
                    autoAlpha: 0, 
                    rotationX: -90,
                    yPercent: 50
                },
                {
                    ease: 'power1.inOut',
                    autoAlpha: 1,
                    rotationX: 0,
                    yPercent: 0,
                    stagger: {
                        each: 0.03,
                        from: 0
                    },
                    scrollTrigger: {
                        trigger: word,
                        duration: 3,
                        start: 'center bottom+=20%',
                        end: 'bottom center',
                        scrub: true,
                    }
                });
                scrolltrigger(animation);
            }
    
        });

        fx3Titles.forEach(title => {
           
            const animation = gsap.fromTo(title.querySelectorAll('.word'), {
                'will-change': 'opacity',
                opacity: 0.05
            }, 
            {
                ease: 'none',
                opacity: 1,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: title,
                    start: 'top bottom-=10%',
                    end: 'center top+=50%',
                    scrub: true,
                    
                }
            });
            
            scrolltrigger(animation);
    
        });
    
        fx4Titles.forEach(title => {
        
            const chars = title.querySelectorAll('.char');
        
            chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
            
            const animation = gsap.fromTo(chars, { 
                'will-change': 'opacity, transform', 
                autoAlpha: 0,
                rotateX: () => gsap.utils.random(-120,120),
                z: () => gsap.utils.random(-200,200),
            }, 
            {
                ease: 'none',
                autoAlpha: 1,
                rotateX: 0,
                z: 0,
                stagger: 0.02,
                scrollTrigger: {
                    trigger: title,
                    duration: 3,
                    start: 'top bottom',
                    end: 'bottom top+=25%',
                    scrub: true,
                }
            });
            scrolltrigger(animation);
        });

        fx5Titles.forEach(title => {
        
            if ( $('body').attr('data-smooth-scroll') === 'on') {
                var ease_dynamic = 'sine.Out';
            } else {
                var ease_dynamic = 'expo';
            }

            const chars = title.querySelectorAll('.char');
            
            chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
            
            const animation = gsap.fromTo(chars, {
                'will-change': 'opacity, transform', 
                transformOrigin: '50% 0%',
                opacity: 0,
                rotationX: -90,
                z: -200,
                duration: 1,
            }, 
            {
                ease: ease_dynamic,
                opacity: 1,
                stagger: 0.05,
                rotationX: 0,
                z: 0,
                scrollTrigger: {
                    trigger: title,
                    start: 'center bottom',
                    end: 'bottom top+=40%',
                    scrub: true,
                }
            });
            scrolltrigger(animation);
        });
    
        fx6Titles.forEach(title => {
            
            const words = [...title.querySelectorAll('.word')];
            
            for (const word of words) {
    
                const chars = word.querySelectorAll('.char');
                const charsTotal = chars.length;
                
                const animation = gsap.fromTo(chars, {
                    'will-change': 'transform, filter', 
                    transformOrigin: '50% 100%',
                    scale: position => {
                        const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                        return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0.5, 2.1, factor);
                    },
                    y: position => {
                        const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                        return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 60, factor);
                    },
                    rotation: position => {
                        const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                        return position < charsTotal/2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal/2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 4, factor);
                    },
                    filter: 'blur(12px) opacity(0)',
                }, 
                {
                    ease: 'power2.inOut',
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 1,
                    filter: 'blur(0px) opacity(1)',
                    scrollTrigger: {
                        trigger: word,
                        start: 'top bottom+=20%',
                        end: 'top top+=25%',
                        scrub: true,
                    },
                    stagger: {
                        amount: 0.15,
                        from: 'center'
                    }
                });
                scrolltrigger(animation);
            }
    
        });
        
    }

    function ms_text_ticker($scope) {

        const el_wrap = $scope.find('.ms-tt-wrap');
        const el_item =el_wrap.find('.ms-tt');

        const dir = el_wrap.attr('data-direction');

        gsap.registerEffect({
            name: "ticker",
            effect(targets, config) {
                buildTickers({
                    targets: targets,
                    clone: config.clone || (el => {
                        let clone = el.children[0].cloneNode(true);
                        el.insertBefore(clone, el.children[0]);
                        return clone;
                    })
                });
                function buildTickers(config, originals) {
                    let tickers;
                    if (originals && originals.clones) { // on window resizes, we should delete the old clones and reset the widths
                        originals.clones.forEach(el => el && el.parentNode && el.parentNode.removeChild(el));
                        originals.forEach((el, i) => originals.inlineWidths[i] ? (el.style.width = originals.inlineWidths[i]) : el.style.removeProperty("width"));
                        tickers = originals;
                    } else {
                        tickers = config.targets;
                    }
                    const clones = tickers.clones = [],
                        inlineWidths = tickers.inlineWidths = [];
                    tickers.forEach((el, index) => {
                        inlineWidths[index] = el.style.width;
                        el.style.width = "10000px"; // to let the children grow as much as necessary (otherwise it'll often be cropped to the viewport width)
                        el.children[0].style.display = "inline-block";
                        let width = el.children[0].offsetWidth,
                            cloneCount = Math.ceil(window.innerWidth / width),
                            right = el.dataset.direction === "right",
                            i;
                        el.style.width = width * (cloneCount + 1) + "px";
                        for (i = 0; i < cloneCount; i++) {
                            clones.push(config.clone(el));
                        }
                        var ms_ticker = gsap.fromTo(el, {
                            x: right ? -width : 0
                        }, {
                            x: right ? 0 : -width,
                            duration: width / 100 / parseFloat(el.dataset.speed || 1),
                            repeat: -1,
                            overwrite: "auto",
                            ease: "none",
                        });
                        
                        if ( el.dataset.hover === 'stop' ) {
                            $(el).parent().on('mouseenter',()=>{
                                ms_ticker.pause();
                                
                            });
                            $(el).parent().on("mouseleave", function() {
                                ms_ticker.play();
                            });
                        }

                        if ( el.dataset.hover === 'slow_down' ) {
                            $(el).parent().on('mouseenter',()=>{
                                gsap.to(ms_ticker, { timeScale: .5, duration: 1 });
                            });
                            $(el).parent().on("mouseleave", function() {
                                gsap.to(ms_ticker, { timeScale: 1, duration: 1 });
                            });
                        }

                    });
                    // rerun on window resizes, otherwise there could be gaps if the user makes the window bigger.
                    originals || window.addEventListener("resize", () => buildTickers(config, tickers));
                }
            }
        });

        if ( el_wrap.attr('data-scroll') === 'off' ) {
            gsap.effects.ticker(el_wrap);
        }  
        
    }

    function ms_video_background() {

        if ($.exists('[data-vbg]')) {
            $('[data-vbg]').youtube_background();
        }

    }

    function ms_search_widget() {

        $('.header__search-icon').on('click', function() {
            $('.header__search-modal').toggleClass('modal--is-visible');
        });
        
        $(document).on('click', '.modal--is-visible', function(e) {
            if (e.target == this) {
                $('.header__search-modal').toggleClass('modal--is-visible');
            }
        });

        $('.header__search--close-btn').on('click', function() {
            $('.header__search-modal').toggleClass('modal--is-visible');
        });

    }

    function ms_woo_product_image() {  

        $('[data-fancybox]').on('click', function(e) {
            e.preventDefault();
            
        });
        $('[data-fancybox]').magnificPopup({
            mainClass: 'mfp-fade',
            tClose: 'Fechar (Esc)',
            tLoading: '',
            type: 'image',
            image: {
               titleSrc: function(item) {
                  return item.el.attr("title");;
               }
            },
            gallery: {
                enabled:true,
                preload: [0,2],
            },

            mainClass: 'mfp-zoom-in',
            removalDelay: 300, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    $('#portfolio a').each(function(){
                        $(this).attr('alt', $(this).find('img').attr('alt'));
                    }); 
                },
                open: function() {
                    //overwrite default prev + next function. Add timeout for css3 crossfade animation
                    $.magnificPopup.instance.next = function() {
                        var self = this;
                        self.wrap.removeClass('mfp-image-loaded');
                        setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
                    }
                    $.magnificPopup.instance.prev = function() {
                        var self = this;
                        self.wrap.removeClass('mfp-image-loaded');
                        setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
                    }
                },
                imageLoadComplete: function() { 
                    var self = this;
                    setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
                }
            }

        });
    }

    function ms_excerpt_plyr() {
        var player = new Plyr('.ms-player'),
            v_player = new Plyr('.ms-video-player');

            $('.wp-block-video').each(function() {

                var videoPlayer = new Plyr($(this).find('video'), {
                    tooltips: {
                        controls: true,
                        seek: true
                    }
                });
          
            });
            $('.wp-block-audio').each(function() {

                var audioPlayer = new Plyr($(this).find('audio'), {
                    tooltips: {
                        controls: true,
                        seek: true
                    }
                });
          
            });
    }

    function ms_excerpt_gallery() {
        if ($.exists('.back-to-top')) {
            const swiper = new Swiper('.ms-post-media__gallery', {
                loop: true,
                speed: 600,
                navigation: {
                    nextEl: '.ms-sp-btn__next',
                    prevEl: '.ms-sp-btn__prev',
                },
            });
        }

    }
   
    // Header menu
    function ms_header_menu() {
        if ($.exists('.js-main-header__nav-trigger')) {
            var mainHeader = document.getElementsByClassName('js-main-header')[0];
            if( mainHeader ) {
                var trigger = mainHeader.getElementsByClassName('js-main-header__nav-trigger')[0],
                    nav = mainHeader.getElementsByClassName('js-main-header__nav')[0];
                    //detect click on nav trigger
                    trigger.addEventListener("click", function(event) {
                        event.preventDefault();
                        var ariaExpanded = !Util.hasClass(nav, 'main-header__nav--is-visible');
                        //show nav and update button aria value
                        Util.toggleClass(nav, 'main-header__nav--is-visible', ariaExpanded);
                        trigger.setAttribute('aria-expanded', ariaExpanded);
                        if(ariaExpanded) { //opening menu -> move focus to first element inside nav
                            nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
                        }
                    });
            }
        }
        if ( $(window).width() > 1023 ){
           
            // Default Menu Style
            if ($.exists('.menu-default')) {
                var m_item = $('.navbar-nav').find(' > li.menu-item > a');

                $(m_item).each(function() {
                    $(this).html('<span>' + this.textContent + '</span>');
                    $(this).attr("title", this.textContent);
                });

                var menu_type = $("body").attr('data-menu');
                if (menu_type == 'fixed') {
                    var header = $(".main-header__layout").addClass('top');
                    $(window).scroll(function() {    
                        var scroll = $(window).scrollTop();
                    
                        if (scroll > 300) {
                            header.removeClass('top').addClass("action");
                        } else {
                            header.addClass('top').removeClass("action");
                        }
                    });
                }

            }

        }

    }
    
    // Mokko menu button
    function ms_menu_mokko_button() {

        if ($('#primary-menu-button').find('.menu-title').length) {
            // do action
        } else {
            $('#primary-menu-button').prepend('<li class="menu-title"><a>Menu</a></li>');
        }
        
        $(window).load(function () {
            var el_wrap = $('.ms-menu-container'),
            el = $('#primary-menu-button'),
            el_child_link = el.find('.menu-item-has-children > a'),
            submenuClicked = '1',
            next_width = el.outerWidth(),
            next_height = el.outerHeight();
            
            el.css({
                'width': next_width+'px',
                'height': next_height+'px'
            });

            // OPEN MENU
            $('.action-menu, .close-menu-bg').on('click', function(){
                if (menu_open === false ) {
                    menuOpen(menu_open);
                    menu_open = true;                   
                } else {
                    menuOpen(menu_open);
                    menu_open = false;
                }               
                
            });

            function menuOpen(menu_open) {
                if(menu_open === false) {
                    el.addClass('show');
                    $('.close-menu-bg').addClass('show');
                    $('.ms-menu-wrapper').addClass('open');
                    $('.action-menu').addClass('active');
                    menu_open = true;
                    return menu_open;
                } else {
                    el.removeClass('show');
                    $('.close-menu-bg').removeClass('show');
                    $('.ms-menu-wrapper').removeClass('open');
                    $('.action-menu').removeClass('active');
                    menu_open = false;
                    return menu_open;
                }
            }

            function menuIn(child) {
                $('.navbar-nav, .sub-menu').removeClass('show');
                child.children('.sub-menu').addClass('show');
                gsap.to(el_wrap,{ width: next_width, height: next_height, ease: "power2.inOut" });
                gsap.to(el,{ xPercent:'-=100', ease: "power2.inOut" });
            }

            el_child_link.on('click', function(e) {
                e.preventDefault();
                var child = $(this).parent(el_child_link);
                next_width = child.find('>.sub-menu').outerWidth(),
                next_height = child.find('>.sub-menu').outerHeight();
                if(submenuClicked === '1') {
                    submenuClicked = '2';
                } else if (submenuClicked === '2') {
                    el = child.parent();
                    submenuClicked = '3';
                }
                menuIn(child, next_width, next_height);

            });

            // Back
            $('#primary-menu-button .sub-menu').prepend('<li class="menu-back"><a>Back</a></li>');

            var menu_back = $('.menu-back');

            menu_back.on('click', function(e) {

                e.preventDefault();
                var child_back = $(this);
                menuOut(child_back);

                if(submenuClicked === '1') {
                    submenuClicked = '2';
                    gsap.to(el,{ xPercent:'+=100', ease: "power2.inOut" });
                } else if(submenuClicked === '2') {
                    submenuClicked = '1';
                    gsap.to('#primary-menu-button',{ xPercent:'0', ease: "power2.inOut" });
                } else if(submenuClicked === '3') {
                    submenuClicked = '2';
                    gsap.to(el,{ xPercent:'+=100', ease: "power2.inOut" });
                    el = $('#primary-menu-button');
                }

            });

            function menuOut(child_back) {
                var parent_back = child_back.parent();
                next_width = parent_back.parent('.menu-item').parent().outerWidth(),
                next_height = parent_back.parent('.menu-item').parent().outerHeight();
                parent_back.removeClass('show');
                parent_back.parent().parent().addClass('show');
                parent_back.parent('.navbar-nav, .sub-menu').removeClass('show');
                parent_back.parent('.sub-menu').removeClass('show');
                gsap.to(el_wrap,{ width: next_width, height: next_height, ease: "power2.inOut" });
            }
        });

    }

    // Mobile Menu
    function ms_menu_default_mobile() {

        if ($(window).width() < 1024) {
            $('.main-header__nav ').addClass('is_mobile');
        }
    
        var isAbove1024 = $(window).width() > 1024;
        $(window).on('resize', function(event){
            if( $(window).width() < 1077 && isAbove1024){
                isAbove1024 = false;
                $('.sub-menu').css('display', 'none');
                $('.main-header__nav ').addClass('is_mobile');
            }else if($(window).width() > 1077 && !isAbove1024){
                isAbove1024 = true;
                $('.sub-menu').css('display', 'block');
                $('.main-header__nav ').removeClass('is_mobile');
            }
        });

        $(document).on('click', '.is_mobile .navbar-nav > .menu-item-has-children > a', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).siblings('.sub-menu').slideUp(300);
            } else {
                $('.menu-item-has-children > a').removeClass('active');
                $(this).addClass('active');
                $('.sub-menu').slideUp(200);
                $(this).siblings('.sub-menu').slideDown(300);
            }
          });

          $(document).on('click', '.is_mobile .sub-menu > .menu-item-has-children > a', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).siblings('.sub-menu').slideUp(300);
            } else {
                $('.sub-menu > .menu-item-has-children > a').removeClass("active");
                $(this).addClass('active');
                $(this).siblings('.sub-menu').slideUp(200);
                $(this).siblings('.sub-menu').slideDown(300);
            }
          });
    }
    
    // Page Transition
    function ms_page_transition() {

        if ($.exists('#loaded')) {

            $('body').addClass('transition-effect');

            window.onpageshow = function (event) {
                if (event.persisted) {
                    window.location.reload();
                }
            };

            window.onbeforeunload = function(){
                $('#loaded').css('display', 'block');
                $('body').removeClass('lazy-load');
                gsap.to("#loaded",{ opacity:1, ease: "power4.inOut", duration:.3 });
            };

            function ms_page_loaded() {
                $('#loaded').css('display', 'none');
                $('body').attr('onunload','');
                $('body').addClass('lazy-load');
            }
            gsap.fromTo("#loaded",{opacity: 1}, {opacity: 0, ease: Power1.easeOut, onComplete:ms_page_loaded, duration: .3, delay: 1 });
            
        } else {
            $('body').addClass('no-transition-effect');
        }

    }

    // Portfolio Video Thumb
    function ms_video_thumb($scope) {
        
        const el = $scope.find('.item--inner');
        const hasAutoplay = el.find('video').prop('autoplay');
        
        if (hasAutoplay) {
            // index
                let ms_clip = el.find('video');
                if ($.exists(ms_clip)) {
                    ms_clip.get(0).play();
                };
        } else {
            //play video on hover
            $(el).on('mouseover', function() {
                
                let ms_clip = $(this).find('video');
                if ($.exists(ms_clip)) {
                    ms_clip.get(0).play();
                };
            }); 

            //pause video on mouse leave
            $(el).on('mouseleave', function() {
                let ms_clip = $(this).find('video');
                if ($.exists(ms_clip)) {
                    ms_clip.get(0).pause();
                    setTimeout(function(){ ms_clip.get(0).currentTime = 0; }, 400);
                };
            });
        }

    }

    // Custom Cursor Portfolio
    function ms_custom_cursor_portfolio($scope) {

        // Custom Cursor Portfolio
        if ( $.exists('.cursor-custom') ) {
            if ($(".ms-cc_p")[0]){
                // empty
            } else {
                var html = '<div class="ms-cc_p">' +
                '<div class="cursor-view">' +
                    '<div class="cursor-text-holder">' +
                        '<div class="cursor-text"></div>' +
                    '</div>' +
                    '<div class="cursor-dot"></div>' +
                '</div>' +
                '</div>';
                $('body').append(html);
            }
        
            var cursorArea = $scope.find('.cursor-custom');
            var el = $scope.find('.portfolio-feed');
            var el_text = el.attr('data-hover-text');

            gsap.set(".ms-cc_p", {xPercent: -50, yPercent: -50});

            const ball = document.querySelector(".ms-cc_p");
            const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            const mouse = { x: pos.x, y: pos.y };
            const speed = 1;
            const xSet = gsap.quickSetter(ball, "x", "px");
            const ySet = gsap.quickSetter(ball, "y", "px");

            window.addEventListener("mousemove", e => {
                mouse.x = e.x;
                mouse.y = e.y;
            });

            $('.cursor-text').text(el_text);

            cursorArea.each((index,item)=>{
                var $this = $(item);
                var $n_item = $this;
                $n_item.on('mouseenter', (e)=> { $n_item.addClass('hovering');

                gsap.ticker.add(() => {
                    // adjust speed for higher refresh monitors
                    const dt = 1.0 - Math.pow(1 - speed, gsap.ticker.deltaRatio()); 
                    pos.x += (mouse.x - pos.x) * dt;
                    pos.y += (mouse.y - pos.y) * dt;
                    xSet(pos.x);
                    ySet(pos.y);
                    
                });
                if($n_item.hasClass('hovering')){
                    $('.cursor-text').text(el_text);
                    var text_h = $('.cursor-text').width();
                    $('.ms-cc_p .cursor-view, .cursor-text-holder').css('width', 'calc(4em + ' + text_h + 'px)');
                    $('.ms-cc_p').addClass('active');
                }
                }).on('mouseleave', (e)=> {
                    $n_item.removeClass('hovering');
                    $('.ms-cc_p').removeClass('active');
                    $('.ms-cc_p .cursor-view, .cursor-text-holder').css('width', '100%');
                })

            })
        }
    }

    // Portfolio Buttons
    function ms_load_more_btn($scope) {

        var pageNum = parseInt(infinity_load.startPage) + 1,
            max = parseInt(infinity_load.maxPages),
            el = $scope.find('.portfolio_wrap'),
            id = el.attr('id'),
            container = el.find('.ms-masonry-gallery'),
            container_g = el.find('.portfolio-feed'),
            contgrid = el.find('.grid-content');
    
            // Filter
            el.on( 'click', '.filter-nav__item:not(.active)', function(e) {
                pageNum = parseInt(infinity_load.startPage) + 1;
                e.preventDefault();
    
                var $p_item = container.find('.grid-item-p'),
                    $pg_item = container_g.find('.grid-item-p'),
                    button = el.find('.ajax-area'),
                    filterValue = $(this).attr('data-filter'),
                    url = window.location.href,
                    url = url + '?category=' + filterValue,
                    preloader = el.find('.load_filter').addClass('show');
                    el.find('.grid-item-p').css({'pointer-events' : 'none'});
                button.css('opacity', '0').delay(10).queue(function(){$(this).remove();});
                el.find('.filter-nav__item').removeClass('active');
                $(this).addClass('active');
                el.find('.filtr-btn li .subnav__link').attr('aria-current', 'none');
                $(this).find('.subnav__link').attr('aria-current', 'page');
                el.find('.filtr-btn li').css({'pointer-events' : 'none'});
                $p_item.css({'pointer-events' : 'none'});

                if ($.exists(contgrid)) {
                    gsap.to( $p_item ,{opacity:.3, ease: "power2.inOut", duration:.5 });
                } else {
                    gsap.to( $pg_item ,{opacity:.3, ease: "power2.inOut", duration:.5 });
                }
                
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'html',
                    success: function(data) {
                        var max = parseInt(infinity_load.maxPages),
                            item = $(data),
                            items = item.find('#' + id +' .grid-item-p'),
                            button = item.find('#' + id +' .ajax-area');
                        
                        setTimeout(function(){
                            container.imagesLoaded( function() {
                                $p_item.css({'pointer-events' : 'auto'});
                                preloader.removeClass('show');
                                // If Grid layout = masonry
                                if ($.exists(contgrid)) {
                                    container.imagesLoaded( function() {
                                        container.isotope({
                                            itemSelector: '.grid-item-p',
                                            percentPosition: true,
                                            masonry: {
                                                columnWidth: '.grid-sizer'
                                            }
                                        });
                                    });
                                    if(items.length > 0) {
                                        container.append(items).isotope( 'appended', items );
                                    }
                                    container.isotope('reloadItems').isotope('remove', $p_item);
                                // If Grid layout = simple grid
                                } else {
                                    container_g.imagesLoaded( function() {
                                        container_g.find('.grid-item-p').remove();
                                        container_g.append(items);
                                    });
                                }
                                // Refresh Locomotive scroll
                                setTimeout(function(){
                                    locoScroll.addScrollElements(document.documentElement);
                                }, 10);

                                $scope = items;
                                ms_custom_cursor_portfolio($scope);
                                ms_video_thumb($scope);

                                el.append(button);
                                el.find('.filtr-btn span').removeClass('loaded');
                                el.find('.filtr-btn li').css({'pointer-events' : 'auto'});
                            });
                        }, 1500);
                    }
                });
    
            });
    
            // Load Button
            el.on('click', '.btn-load-more', function(event){

                var nextLink = infinity_load.nextLink;
                nextLink = nextLink.replace(/\/page\/[0-9]?/,'/page/'+ pageNum);

                event.preventDefault();
                var posts_container = el.find('.ms-masonry-gallery'),
                    button = $(this),
                    filterValue =  el.find('.filtr-btn li.active').attr('data-filter');
                if (filterValue === undefined || filterValue === '') {
                    filterValue = '';
                }
                
                $(this).toggleClass('loading');
                el.find('.grid-item-p').css({'pointer-events' : 'none'});
                $('.md-content-loader').addClass('active');
                var max = el.find('.ajax-area').attr('data-max');
    
                    button.css({'pointer-events' : 'none'});
                    
                    pageNum++;
                    $.ajax({
                        type: 'POST',
                        url: nextLink + '?category=' + filterValue,
                        dataType: 'html',
                        success: function(data) {
                            
                            var item = $(data),
                            val = item.find('#' + id +' .grid-item-p');
  
                            if ($.exists(contgrid)) {
                                var $container = el.find('.ms-masonry-gallery').isotope();
                            } else {
                                var $container = el.find('.portfolio-feed');                                  
                            }
                                
                            nextLink = nextLink.replace(/\/page\/[0-9]?/,'/page/'+ pageNum);

                            if(val.length > 0) {
                                
                                setTimeout(function(){
                                    $('.md-content-loader').removeClass('active');
                                    button.find('.ajax-area');
                                    button.toggleClass('loading');
                                    button.css({'pointer-events' : 'auto'});
                                    container.imagesLoaded( function() {
                                        if ($.exists(contgrid)) {
                                            $container.append(val).isotope( 'appended', val );
                                        } else {
                                            $container.append(val);
                                        }
                                    });
                                    
                                    if(pageNum <= max) {
                                    } else {
                                        button.addClass('no-works');
                                        button.css({'pointer-events' : 'none'});
                                    }
                                    // Refresh Locomotive scroll
                                    setTimeout(function(){
                                        locoScroll.addScrollElements(document.documentElement);
                                    }, 10);

                                    $scope = val;
                                    el.find('.grid-item-p').css({'pointer-events' : 'auto'});
                                    ms_custom_cursor_portfolio($scope);
                                    ms_video_thumb($scope);

                                }, 1500);

                            }
                        
                        }
                    });

            });

    }
    
    // Accordion Widget
    function ms_accordion_widget($scope) {

        let el = $scope.find('.ms_accordion');
        let el_panel = el.find('.ms_ac_panel');
        let el_label = el_panel.find('.ms_ac--label');

        let groups = gsap.utils.toArray(el_panel);
        let menus = gsap.utils.toArray(el_label);
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {

            let menu = element.querySelector('.ms_ac--label');
            let box = element.querySelector('.ms_ac--content');
            let minusElement = element.querySelector('.accordion_icon--close');
            let plusElement = element.querySelector('.accordion_icon--open');

            gsap.set(box, { height: "auto" });
            
            if ($.exists('.switching')) {
                var animation = gsap
                .timeline().from(box, {
                    height: 0,
                    duration: 0.5,
                    ease: "power2.inOut"
                })
                .from(minusElement, { duration: 0.2, autoAlpha: 0, ease:"none" }, 0)
                .to(plusElement, { duration: 0.2, autoAlpha: 0, ease:"none" }, 0)
                .reverse();
            } else {
                var animation = gsap
                .timeline().from(box, {
                    height: 0,
                    duration: 0.5,
                    ease: "power2.inOut"
                })
                .to(plusElement, { duration: 0.2, rotation:"180_cw", ease:"none" }, 0)
                .reverse();
            }

            if (el.data('collapse')) {
                return function (clickedMenu) {
                    if (clickedMenu === menu) {
                        animation.reversed(!animation.reversed());
                    } else {
                        animation.reverse();
                    }
                };
            } else {
                return function (clickedMenu) {
                    if (clickedMenu === menu) {
                        animation.reversed(!animation.reversed());
                    }
                };
            }

        }

    }

    // Google Map
    function ms_initMap($scope) {
    
        var googleMap = $scope.find('.ms-gmap--wrapper'),
            map_lat = googleMap.data('map-lat'),
            map_lng = googleMap.data('map-lng'),
            map_zoom = googleMap.data('map-zoom'),
            map_gesture_handling = googleMap.data('map-gesture-handling'),
            map_zoom_control = googleMap.data('map-zoom-control') ? true : false,
            map_zoom_control_position = googleMap.data('map-zoom-control-position'),
            map_default_ui = googleMap.data('map-default-ui') ? false : true,
            map_type = googleMap.data('map-type'),
            map_type_control = googleMap.data('map-type-control') ? true : false,
            map_type_control_style = googleMap.data('map-type-control-style'),
            map_type_control_position = googleMap.data('map-type-control-position'),
            map_streetview_control = googleMap.data('map-streetview-control') ? true : false,
            map_streetview_position = googleMap.data('map-streetview-position'),
            map_info_window_width = googleMap.data('map-info-window-width'),
            map_locations = googleMap.data('map-locations'),
            map_styles = googleMap.data('map-style') || '',
            infowindow,
            map;
    
            function initMap() {
    
                var myLatLng = {
                    lat: parseFloat(map_lat),
                    lng: parseFloat(map_lng)
                };
    
                if (typeof google === 'undefined') {
                    return;
                }
    
                var map = new google.maps.Map(googleMap[0], {
                    center: myLatLng,
                    zoom: map_zoom,
                    disableDefaultUI: map_default_ui,
                    zoomControl: map_zoom_control,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition[map_zoom_control_position]
                    },
                    mapTypeId: map_type,
                    mapTypeControl: map_type_control,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle[map_type_control_style],
                        position: google.maps.ControlPosition[map_type_control_position]
                    },
                    streetViewControl: map_streetview_control,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition[map_streetview_position]
                    },
                    styles: map_styles,
                    gestureHandling: map_gesture_handling,
                });
    
                $.each(map_locations, function (index, googleMapement, content) {
    
                    var content = '\
                    <div class="ms-gm--wrap">\
                    <h6>' + googleMapement.title + '</h6>\
                    <div>' + googleMapement.text + '</div>\
                    </div>';
    
                    var icon = '';
    
                    if (googleMapement.pin_icon !== '') {
                        if (googleMapement.pin_icon_custom) {
                            icon = googleMapement.pin_icon_custom;
                        } else {
                            icon = '';
                        }
                    }
    
                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(parseFloat(googleMapement.lat), parseFloat(googleMapement.lng)),
                        animation: google.maps.Animation.DROP,
                        icon: icon,
                    });
    
                    if (googleMapement.title !== '' && googleMapement.text !== '') {
                        addInfoWindow(marker, content);
                    }
    
                    google.maps.event.addListener(marker, 'click', toggleBounce);
    
                    function toggleBounce() {
                        if (marker.getAnimation() != null) {
                            marker.setAnimation(null);
                        } else {
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    }
    
                });
            }
    
            function addInfoWindow(marker, content) {
                google.maps.event.addListener(marker, 'click', function () {
                    if (!infowindow) {
                        infowindow = new google.maps.InfoWindow({
                            maxWidth: map_info_window_width
                        });
                    }
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            }
    
            initMap();
    }
    
    // Isotope
    function ms_isotope_card_grid($scope) { 
    
        var grid = $scope.find('.grid-content');
        // init Isotope
        grid.imagesLoaded(function () { grid.isotope(); });
        
    }
    
    // Masonry Gallery
    function ms_masonry_gallery($scope) {
     
        var grid = $scope.find('.ms-masonry-gallery');
    
        grid.imagesLoaded(function () { grid.isotope(); });
    
        var el_2 = $scope.find('.blockgallery.h_s2').find('.mfp-img img');

        $(el_2).on('mouseenter', function () {
            $(el_2).css('opacity', '0.5');
        });

        $(el_2).on('mouseleave', function () {
            $(el_2).css('opacity', '1');
        });
    
    }

    // Parallax Hero
    function ms_parallax_hero($scope) {

        var el = $scope.find('.ms-parallax'),
            video = el.find('.jarallax-img').attr('data-video-src'),
            video_start = el.find('.jarallax-img').attr('data-video-start-time'),
            video_end = el.find('.jarallax-img').attr('data-video-end-time');

        el.jarallax({ 
            videoSrc: video,
            loop: true,
            videoStartTime: video_start,
            videoEndTime: video_end,
        });

    }

    // Swiper Slider Options
    function ms_slider($scope) {

        var slider_global = $scope.find('.ms-slider');

        var checkCLass = slider_global;
        Splitting();
        // Swiper Material
        if (checkCLass.hasClass('material-slider')) {

            // Swiper Meterial
            var el_material = $scope.find('.swiper.ms-slider-material'),
                effect = el_material.attr('data-effect'),
                nav_next = el_material.find('.swiper-button-next'),
                nav_prev = el_material.find('.swiper-button-prev'),
                scrollbar = el_material.find('.swiper-scrollbar'),
                centered = ( 'on' === el_material.attr('data-centered') ) ? true : false,
                autoplay = ( 'on' === el_material.attr('data-autoplay') ) ? true : false,
                wheel = ( 'on' === el_material.attr('data-mousewheel') ) ? true : false,
                st = ( 'on' === el_material.attr('data-simulatetouch') ) ? true : false,
                loop = ( 'on' === el_material.attr('data-loop') ) ? true : false,
                delay = el_material.attr('data-delay'),
                slides = el_material.attr('data-spv'),
                slides_t = el_material.attr('data-spv-t'),
                slides_m = el_material.attr('data-spv-m'),
                space = el_material.attr('data-space'),
                space_t = el_material.attr('data-space-t'),
                space_m = el_material.attr('data-space-m'),
                speed = el_material.attr('data-speed'),
                anim_class = el_material.find('.ms-slider--cont'),
                swiper = new Swiper(el_material.get(0), {
                modules: [EffectMaterial],
                effect: effect,
                slidesPerView:  eval(slides),
                centeredSlides: centered,
                spaceBetween: eval(space),
                speed: speed,
                autoplay: autoplay,
                mousewheel: wheel,
                loop: loop,
                simulateTouch: st,
                navigation: {
                    nextEl: nav_next.get(0),
                    prevEl: nav_prev.get(0),
                },
                scrollbar: {
                    el: scrollbar.get(0),
                    hide: false,
                    draggable: true,
                },
                on: {
                    init: function () {
                        var activeIndexTitle = $(this.slides[this.activeIndex]).find('.ms-sc--t');
                        var first_slide_char = activeIndexTitle.find('.char');
                        slideFirstInit(first_slide_char);
                    },
                },
                breakpoints: {
                    '@0.25': {
                        slidesPerView: slides_m,
                        spaceBetween: eval(space_m)
                    },
                    768: {
                        slidesPerView: slides_t,
                        spaceBetween: eval(space_t)
                    },
                    1024: {
                        slidesPerView: eval(slides),
                        spaceBetween: eval(space)
                    }
                },
            });

            if (anim_class.hasClass('swiper-material-animate-scale')) {
                
                swiper.on('slideChangeTransitionEnd', function () {
                    var activeSlideIndex = this.activeIndex;
                    var el_char_end = $(this.slides[activeSlideIndex]).find('.ms-sc--t');
                    slideTitlesEnd(el_char_end);
                });
    
                swiper.on('slideChangeTransitionStart', function () {
                    var el_char_start = $scope.find('.ms-sc--t');
                    slideTitlesStart(el_char_start);
                });
            }

            swiper.params.autoplay.delay = delay;
        }

        // Swiper Triple
        if (checkCLass.hasClass('triple-slider')) {

            const el_triple = $scope.find('.triple-slider');
            var el_attr = el_triple.find('.ms-slider-triple'),
                wheel = ( 'on' === el_attr.attr('data-mousewheel') ) ? true : false,
                st = ( 'on' === el_attr.attr('data-simulatetouch') ) ? true : false,
                speed = el_attr.attr('data-speed');
            const sliderEl = el_triple.get(0);
            createTripleSlider(sliderEl);
            
            function createTripleSlider(el) {
                const swiperEl = el.querySelector('.swiper');
                const swiperPrevEl = swiperEl.cloneNode(true);
                swiperPrevEl.classList.add('triple-slider-prev');
                el.insertBefore(swiperPrevEl, swiperEl);
                const swiperPrevSlides = swiperPrevEl.querySelectorAll('.swiper-slide');
                const swiperPrevLastSlideEl = swiperPrevSlides[swiperPrevSlides.length - 1];
                swiperPrevEl
                .querySelector('.swiper-wrapper')
                .insertBefore(swiperPrevLastSlideEl, swiperPrevSlides[0]);

                const swiperNextEl = swiperEl.cloneNode(true);
                swiperNextEl.classList.add('triple-slider-next');
                el.appendChild(swiperNextEl);
                const swiperNextSlides = swiperNextEl.querySelectorAll('.swiper-slide');
                const swiperNextFirstSlideEl = swiperNextSlides[0];
                swiperNextEl
                .querySelector('.swiper-wrapper')
                .appendChild(swiperNextFirstSlideEl);
            
                swiperEl.classList.add('triple-slider-main');

                const commonParams = {
                
                speed: speed,
                loop: true,
                parallax: true,
                mousewheel: wheel,
                autoplay: autoplay,
                simulateTouch: st

                };
            
                let tripleMainSwiper;
            
                // init prev swiper
                const triplePrevSwiper = new Swiper(swiperPrevEl, {
                ...commonParams,
                allowTouchMove: false,
                mousewheel: false,
                on: {
                    click() {
                    tripleMainSwiper.slidePrev();
                    },
                    init() {
                        $('.ms-sc--t').css({
                            'opacity': '1',
                        });
                        gsap.to( '.ms-sc--t, .bg-image', { 
                            opacity: 1,
                            duration: .7,
                            ease: 'ease-in-out',
                        });
                    }
                },
                });
                
                // init next swiper
                const tripleNextSwiper = new Swiper(swiperNextEl, {
                ...commonParams,
                allowTouchMove: false,
                mousewheel: false,
                on: {
                    click() {
                    tripleMainSwiper.slideNext();
                    },
                },
                });
                // init main swiper
                tripleMainSwiper = new Swiper(swiperEl, {
                ...commonParams,
                grabCursor: true,
                controller: {
                    control: [triplePrevSwiper, tripleNextSwiper],
                },
                on: {
                    destroy() {
                    // destroy side swipers on main swiper destroy
                    triplePrevSwiper.destroy();
                    tripleNextSwiper.destroy();
                    },
                },
                });

                return tripleMainSwiper;
            }
        }

        // Swiper Default
        if (checkCLass.hasClass('default-slider')) {
            
            var el_default = $scope.find('.swiper.ms-slider-default'),
                nav_prev = el_default.find('.swiper-button-prev'),
                nav_next = el_default.find('.swiper-button-next'),
                scrollbar = el_default.find('.swiper-scrollbar'),
                effect = el_default.attr('data-effect'),
                direction = el_default.attr('data-direction'),
                slides = el_default.attr('data-spv'),
                slides_t = el_default.attr('data-spv-t'),
                slides_m = el_default.attr('data-spv-m'),
                speed = el_default.attr('data-speed'),
                space = el_default.attr('data-space'),
                space_t = el_default.attr('data-space-t'),
                space_m = el_default.attr('data-space-m'),
                delay = el_default.attr('data-autoplay-delay'),
                anim_class = el_default.find('.ms-slider--cont'),
                scrollbar_hide = el_default.find('.swiper-scrollbar'),
                scrollbar_draggable = el_default.find('.swiper-scrollbar'),
                loop = ( 'on' === el_default.attr('data-loop') ) ? true : false,
                autoplay = ( 'on' === el_default.attr('data-autoplay') ) ? true : false,
                centered = ( 'on' === el_default.attr('data-centered') ) ? true : false,
                wheel = ( 'on' === el_default.attr('data-mousewheel') ) ? true : false,
                st = ( 'on' === el_default.attr('data-simulatetouch') ) ? true : false,
                pbo = ( 'vertical' === el_default.attr('data-direction') ) ? true : false,
                scrollbar_h = ( 'on' === scrollbar_hide.attr('data-interaction') ) ? true : false,
                scrollbar_d = ( 'on' === scrollbar_draggable.attr('data-dragable') ) ? true : false;

                if (!direction) {
                    direction = 'horizontal';
                }
    
                var swiper = new Swiper(el_default.get(0), {
                    effect: effect,
                    slidesPerView: slides,
                    direction: direction,
                    spaceBetween: eval(space),
                    loop: loop,
                    loopFillGroupWithBlank: true,
                    autoplay: autoplay,
                    centeredSlides: centered,
                    speed: eval(speed),
                    mousewheel: wheel,
                    simulateTouch: st,
                    scrollbar: {
                        el: scrollbar.get(0),
                        hide: scrollbar_h,
                        draggable: scrollbar_d,
                    },
                    navigation: {
                        nextEl: nav_next.get(0),
                        prevEl: nav_prev.get(0),
                    },
                    breakpoints: {
                        '@0.25': {
                            slidesPerView: slides_m,
                            spaceBetween: eval(space_m)
                        },
                        768: {
                            slidesPerView: slides_t,
                            spaceBetween: eval(space_t)
                        },
                        1024: {
                            slidesPerView: eval(slides),
                            spaceBetween: eval(space)
                        }
                    },
                    on: {
                        init: function () {
                            var activeIndexTitle = $(this.slides[this.activeIndex]).find('.ms-sc--t');
                            var first_slide_char = activeIndexTitle.find('.char');
                            slideFirstInit(first_slide_char);
                        },
                    },
            });

            swiper.params.autoplay.delay = delay;
            swiper.update();
            
            if (anim_class.hasClass('swiper-material-animate-scale')) {
            swiper.on('slideChangeTransitionEnd', function () {
                var activeSlideIndex = this.activeIndex;
                var el_char_end = $(this.slides[activeSlideIndex]).find('.ms-sc--t');
                slideTitlesEnd(el_char_end);
            });

            swiper.on('slideChangeTransitionStart', function () {
                var el_char_start = $scope.find('.ms-sc--t');
                slideTitlesStart(el_char_start);
            });
            }
        }

        // Content Text Effect
        
        function slideFirstInit(first_slide_char) {
            var first_slide_load = $scope.find('.char'),
                first_slide_img = $scope.find('.swiper-slide img, .bg-image');
            first_slide_load.css({
                'opacity': '0',
                'transform': 'scale(0,0)'
            });

            setTimeout(function () {
                $('.ms-sc--t').css({
                    'opacity': '1',
                });
                gsap.to( first_slide_img, { 
                    opacity: 1,
                    duration: .7,
                    ease: 'ease-in-out',
                });
            }, 700);

            setTimeout(function () {

                const words = $scope.find('.word');
                for (const word of words) {
                    const tl = gsap.timeline();
                    const chars = first_slide_char;
        
                    const wordTimeline = gsap.timeline().fromTo(chars, { 
                        willChange: 'transform, opacity',
                        opacity: 0,
                        scale: 1.7
                    },
                    {
                        duration: .7,
                        ease: 'power2',
                        opacity: 1,
                        scale: 1,
                        stagger: {
                            each: 0.015,
                            from: 'edges'
                        },
                        onComplete: function() {
                            swiper.allowSlideNext = true;
                            swiper.allowSlidePrev = true;
                        }
                    });
                    // tl.add(wordTimeline, Math.random()*.5);
                }

            }, 1000);
        }

        function slideTitlesEnd(slideIndex) {

            var slideTitles = slideIndex;
            const tl = gsap.timeline();
            
            if ( slideTitles.length ) {
                swiper.allowSlideNext = false;
                swiper.allowSlidePrev = false;
            }

            const words = slideTitles.find('.word');

            for (const word of words) {

                const chars = word.querySelectorAll('.char');
    
                const wordTimeline = gsap.timeline().fromTo(chars, { 
                    willChange: 'transform, opacity',
                    opacity: 0,
                    scale: 1.7
                },
                {
                    duration: .7,
                    ease: 'power2',
                    opacity: 1,
                    scale: 1,
                    stagger: {
                        each: 0.015,
                        from: 'edges'
                    },
                    onComplete: function() {
                        swiper.allowSlideNext = true;
                        swiper.allowSlidePrev = true;
                    }
                });
                tl.add(wordTimeline, Math.random()*.5);
            }

        }

        function slideTitlesStart(el_char) {

            const slideTitles = el_char;
            const tl = gsap.timeline();
            const words = slideTitles.find('.word');

            for (const word of words) {

                const chars = word.querySelectorAll('.char');
    
                const wordTimeline = gsap.timeline().fromTo(chars, {
                    willChange: 'transform, opacity',
                    scale: 1
                },
                {
                    duration: .25,
                    ease: 'power1.in',
                    opacity: 0,
                    scale: 0,
                    stagger: {
                        each: 0.02,
                        from: 'edges'
                    },
                });
                tl.add(wordTimeline, Math.random()*.5);
            }

        }

    }

    // Video Button
    function ms_video_button($scope) {
    
        var el = $scope.find('.ms-vb').find('.ms-vb--src'),
            autoplay = el.attr('data-autoplay'),
            type = el.attr('data-video'),
            loop = el.attr('data-loop'),
            controls = el.attr('data-controls'),
            muted = el.attr('data-muted');
        if ( type === 'youtube' ) {
            var start = el.attr('data-start'),
                end = el.attr('data-end');
        } else {

        }

        el.magnificPopup({
            type: 'iframe',
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/', 
                        id: function(url) {        
                            var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                            if ( !m || !m[1] ) return null;
                            return m[1];
                        },
                        src: 'https://www.youtube.com/embed/%id%?autoplay='+autoplay+'&loop='+loop+'&controls='+controls+'&mute='+muted+'&start='+start+'&end='+end
                    },
                    vimeo: {
                        index: 'vimeo.com/', 
                        id: function(url) {        
                            var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                            if ( !m || !m[5] ) return null;
                            return m[5];
                        },
                        src: '//player.vimeo.com/video/%id%?autoplay=' + autoplay + '&loop=' + loop + '&controls=' + controls + '&muted=' +  muted
                    }
                },
                markup: '<div class="mfp-iframe-scaler">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>'+
                    '<div class="mfp-title">Some caption</div>'+
                    '</div>'
            },
            callbacks: {
                markupParse: function(template, values, item) {
                    values.title = item.el.attr('data-caption');
                }
            },
        });
    
    }
    
    // Justified Gallery
    function ms_lightbox($scope) {
    
        var el = $scope.find('.blockgallery'),
            justified = $scope.find('.justified-gallery'),
            m = justified.data('margins'),
            h = justified.data('row-height');
    
            justified.justifiedGallery({
                rowHeight : h,
                margins : m,
                captions : false,
                border: 0,
                lastRow : 'nojustify',
            });

            el.magnificPopup({
                delegate: '.mfp-img',
                mainClass: 'mfp-fade',
                tClose: 'Fechar (Esc)',
                tLoading: '',
                type: 'image',
                image: {
                   titleSrc: function(item) {
                      return item.el.attr("title");;
                   }
                },
                gallery: {
                    enabled:true,
                    preload: [0,2],
                },
    
                mainClass: 'mfp-zoom-in',
                removalDelay: 300, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function() {
                        $('#portfolio a').each(function(){
                            $(this).attr('alt', $(this).find('img').attr('alt'));
                        }); 
                    },
                    open: function() {
                        //overwrite default prev + next function. Add timeout for css3 crossfade animation
                        $.magnificPopup.instance.next = function() {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
                        }
                        $.magnificPopup.instance.prev = function() {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
                        }
                    },
                    imageLoadComplete: function() { 
                        var self = this;
                        setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
                    }
                }
    
            });
    }

    function ms_clipboard() {
        $(".share-copy").on('click', function(e){       
            e.preventDefault();
            var copyText = $(this).data('copy-link-url');
            document.addEventListener('copy', function(e) {
               e.clipboardData.setData('text/plain', copyText);
               e.preventDefault();
            }, true);
            document.execCommand('copy');
            $(this).addClass('copied');
            setTimeout(function() { $('.share-button.share-copy').removeClass('copied'); }, 1000); 
        });
    }
    
    // Theme Mode
    function ms_theme_mode() {
        if ($.exists('.ms_theme_mode')) {
            var td = $("#theme-dark"),
                tl = $("#theme-light"),
                s = $("#switcher");
            $(td).on("click", function(){
                $(tl).removeClass("toggler--is-active");
                $(s).prop('checked', false);
                $(this).addClass('toggler--is-active');
                $('body').attr('data-theme', 'dark');
                var theme = $('body').attr('data-theme');
                setCookie('theme-mode', theme, {expires : 30});
                });
            $(tl).on("click", function(){
                $(td).removeClass("toggler--is-active");
                $(s).prop('checked', true);
                $(this).addClass('toggler--is-active');
                $('body').attr('data-theme', 'light');
                var theme = $('body').attr('data-theme');
                setCookie('theme-mode', theme, {expires : 30});
            });
            $(s).on("click", function(){
                $(td).toggleClass("toggler--is-active");
                $(tl).toggleClass("toggler--is-active");
                $('body').attr('data-theme', $('body').attr('data-theme') == 'light' ? 'dark' : 'light');
                var theme = $('body').attr('data-theme');
                setCookie('theme-mode', theme, {expires : 30});
            });
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
        }
    }

    function ms_woo_quantity() {

        if ($.exists('.ms-quantity')) {
            $('body').on('click', '.button-plus, .button-minus', function(e) {
                const isNegative = $(e.target).closest('.button-minus').is('.button-minus');
                const input = $(e.target).closest('.ms-quantity').find('input');
                if (input.is('input')) {
                  input[0][isNegative ? 'stepDown' : 'stepUp']();
                  $('button[name="update_cart"]').prop('disabled', false);
                }
              });
        }
        $('body').on('click', 'button[name="update_cart"], a.remove, button[name="apply_coupon"]', function() {
            $('.woocommerce-notices-wrapper').css('display', 'none');
            setTimeout(function() {

                // Notice animation
                $('.woocommerce-notices-wrapper').css({
                    'display' : 'block'
                });

                // Recal Mini Cart
                var allCountInCart  =  0;
                
                $("input.input-text.qty").each(function() {
                    allCountInCart  = allCountInCart+parseInt($(this).val());
                });

                $('#mini-cart-count span').text(allCountInCart);

            }, 1400);

            // Stop SCrolling after update
            $(document).ajaxComplete(function() {
                if ($('body').hasClass('woocommerce-checkout') || $('body').hasClass('woocommerce-cart')) {
                    jQuery( 'html, body' ).stop();
                }
                if ($('body').hasClass('product-template-default')) {

                    jQuery( 'html, body' ).stop();
                }
            });

          });
            // Stop SCrolling after update
            if ($('body[data-smooth-scroll="on"]').hasClass('product-template-default')) {

                // store the hash (DON'T put this code inside the $() function, it has to be executed 
                // right away before the browser can start scrolling!
                var target = window.location.hash,
                    target = target.replace('#', '');

                // delete hash so the page won't scroll to it
                window.location.hash = "";

                // now whenever you are ready do whatever you want
                // (in this case I use jQuery to scroll to the tag after the page has loaded)
                $(window).load(function() {
                    if (target) {
                        $('html, body').animate({
                            scrollTop: $("#" + target).offset().top
                        }, 600, 'swing', function () {});
                        location.reload();
                    }
                });

            }     
    }

    function ms_woo_category_loop() {
        
        if ($.exists('.product-category')) {
            $('.product-category').wrapAll('<div class="ms-woocommerce-product-category"></div>');
        }

    }

// Portfolio filter-navigation

 function Util () {};

 // class manipulation functions
 Util.hasClass = function(el, className) {
     if (el.classList) return el.classList.contains(className);
     else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
 };
 
 Util.addClass = function(el, className) {
     var classList = className.split(' ');
     if (el.classList) el.classList.add(classList[0]);
     else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
     if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
 };
 
 Util.removeClass = function(el, className) {
     var classList = className.split(' ');
     if (el.classList) el.classList.remove(classList[0]);  
     else if(Util.hasClass(el, classList[0])) {
         var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
         el.className=el.className.replace(reg, ' ');
     }
     if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
     };
 
 Util.toggleClass = function(el, className, bool) {
     if(bool) Util.addClass(el, className);
     else Util.removeClass(el, className);
     };
 
 Util.setAttributes = function(el, attrs) {
     for(var key in attrs) {
         el.setAttribute(key, attrs[key]);
     }
 };

(function() {
    var FilterNav = function(element) {
        this.element = element;
        this.wrapper = this.element.getElementsByClassName('js-filter-nav__wrapper')[0];
        this.nav = this.element.getElementsByClassName('js-filter-nav__nav')[0];
        this.list = this.nav.getElementsByClassName('js-filter-nav__list')[0];
        this.control = this.element.getElementsByClassName('js-filter-nav__control')[0];
        this.modalClose = this.element.getElementsByClassName('js-filter-nav__close-btn')[0];
        this.placeholder = this.element.getElementsByClassName('js-filter-nav__placeholder')[0];
        this.marker = this.element.getElementsByClassName('js-filter-nav__marker');
        this.layout = 'expanded';
        initFilterNav(this);
    };

    function initFilterNav(element) {
        checkLayout(element); // init layout
        if(element.layout == 'expanded') placeMarker(element);
        element.element.addEventListener('update-layout', function(event){ // on resize - modify layout
        checkLayout(element);
        });

        // update selected item
        element.wrapper.addEventListener('click', function(event){
        var newItem = event.target.closest('.js-filter-nav__btn');
        if(newItem) {
            updateCurrentItem(element, newItem);
            return;
        }
        // close modal list - mobile version only
        if(Util.hasClass(event.target, 'js-filter-nav__wrapper') || event.target.closest('.js-filter-nav__close-btn')) toggleModalList(element, false);
        });

        // open modal list - mobile version only
        element.control.addEventListener('click', function(event){
        toggleModalList(element, true);
        });
        
        // listen for key events
        window.addEventListener('keyup', function(event){
        // listen for esc key
        if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
            // close navigation on mobile if open
            if(element.control.getAttribute('aria-expanded') == 'true' && isVisible(element.control)) {
            toggleModalList(element, false);
            }
        }
        // listen for tab key
        if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
            // close navigation on mobile if open when nav loses focus
            if(element.control.getAttribute('aria-expanded') == 'true' && isVisible(element.control) && !document.activeElement.closest('.js-filter-nav__wrapper')) toggleModalList(element, false);
        }
        });
    };

    function updateCurrentItem(element, btn) {
        if(btn.getAttribute('aria-current') == 'true') {
        toggleModalList(element, false);
        return;
        }
        var activeBtn = element.wrapper.querySelector('[aria-current]');
        if(activeBtn) activeBtn.removeAttribute('aria-current');
        btn.setAttribute('aria-current', 'true');
        // update trigger label on selection (visible on mobile only)
        element.placeholder.textContent = btn.textContent;
        toggleModalList(element, false);
        if(element.layout == 'expanded') placeMarker(element);
    };

    function toggleModalList(element, bool) {
        element.control.setAttribute('aria-expanded', bool);
        Util.toggleClass(element.wrapper, 'filter-nav__wrapper--is-visible', bool);
        if(bool) {
        element.nav.querySelectorAll('[href], button:not([disabled])')[0].focus();
        } else if(isVisible(element.control)) {
        element.control.focus();
        }
    };

    function isVisible(element) {
        return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    };

    function checkLayout(element) {
        if(element.layout == 'expanded' && switchToCollapsed(element)) { // check if there's enough space 
        element.layout = 'collapsed';
        Util.removeClass(element.element, 'filter-nav--expanded');
        Util.addClass(element.element, 'filter-nav--collapsed');
        Util.removeClass(element.modalClose, 'is-hidden');
        Util.removeClass(element.control, 'is-hidden');
        } else if(element.layout == 'collapsed' && switchToExpanded(element)) {
        element.layout = 'expanded';
        Util.addClass(element.element, 'filter-nav--expanded');
        Util.removeClass(element.element, 'filter-nav--collapsed');
        Util.addClass(element.modalClose, 'is-hidden');
        Util.addClass(element.control, 'is-hidden');
        }
        // place background element
        if(element.layout == 'expanded') placeMarker(element);
    };

    function switchToCollapsed(element) {
        return element.nav.scrollWidth > element.nav.offsetWidth;
    };

    function switchToExpanded(element) {
        element.element.style.visibility = 'hidden';
        Util.addClass(element.element, 'filter-nav--expanded');
        Util.removeClass(element.element, 'filter-nav--collapsed');
        var switchLayout = element.nav.scrollWidth <= element.nav.offsetWidth;
        Util.removeClass(element.element, 'filter-nav--expanded');
        Util.addClass(element.element, 'filter-nav--collapsed');
        element.element.style.visibility = 'visible';
        return switchLayout;
    };

    function placeMarker(element) {
        var activeElement = element.wrapper.querySelector('.js-filter-nav__btn[aria-current="true"]');
        if(element.marker.length == 0 || !activeElement ) return;
        element.marker[0].style.width = activeElement.offsetWidth+'px';
        element.marker[0].style.transform = 'translateX('+(activeElement.getBoundingClientRect().left - element.list.getBoundingClientRect().left)+'px)';
    };

    var filterNav = document.getElementsByClassName('js-filter-nav');
    if(filterNav.length > 0) {
        var filterNavArray = [];
        for(var i = 0; i < filterNav.length; i++) {
        filterNavArray.push(new FilterNav(filterNav[i]));
        }

        var resizingId = false,
        customEvent = new CustomEvent('update-layout');

        window.addEventListener('resize', function() {
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 100);
        });

        // wait for font to be loaded
        document.fonts.onloadingdone = function (fontFaceSetEvent) {
        doneResizing();
        };

        function doneResizing() {
        for( var i = 0; i < filterNavArray.length; i++) {
            (function(i){filterNavArray[i].element.dispatchEvent(customEvent)})(i);
        };
        };
    }

}());

})(jQuery);

// Swiper Lightbox debug

jQuery(function($){
  $('a[data-elementor-open-lightbox="yes"]').on('click', function() {
    setTimeout(function() {
      var $img = $('.swiper-zoom-container img.elementor-lightbox-image');

      if ($img.length) {
        var dataSrc = $img.attr('data-src');
        if (dataSrc && !$img.attr('src')) {
          $img.attr('src', dataSrc);
        }
      }
    }, 50);
  });
});