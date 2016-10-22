'use strict';
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var blockBlogMenu = document.getElementsByClassName('blog__nav-list')[0];
        if (!blockBlogMenu)
            return;
        var BlogMenu = function (block) {
            this.blogMenu = block;
            this.blogWrap = block.parentNode;
            this.blogContainer = block.parentNode.parentNode;
            this.mobileStatus = false;
            this.triggerMobileMenu = function () {
                var buttonBlogMenu = document.getElementsByClassName('blog__nav-button')[0], $that = this;
                if (!buttonBlogMenu)
                    return;
                buttonBlogMenu.addEventListener('click', function () {
                    $that.mobileStatus = !$that.mobileStatus;
                    if ($that.mobileStatus) {
                        buttonBlogMenu.classList.add('_showed-blog-menu');
                        $that.blogWrap.classList.add('_showed-blog-menu');
                    } else {
                        buttonBlogMenu.classList.remove('_showed-blog-menu');
                        $that.blogWrap.classList.remove('_showed-blog-menu');
                    }
                });
                document.body.addEventListener('click', function (e) {
                    if (!$that.mobileStatus)
                        return;
                    var element = e.target, hide = true;
                    while (element) {
                        if (element.classList.contains('_showed-blog-menu')) {
                            hide = false;
                            break;
                        } else
                            element = element.parentElement;
                    }
                    if (hide) {
                        $that.mobileStatus = !$that.mobileStatus;
                        buttonBlogMenu.classList.remove('_showed-blog-menu');
                        $that.blogWrap.classList.remove('_showed-blog-menu');
                    }
                });
            };
            this.fixed = function fixed(e) {
                var container = this.blogContainer, menu = this.blogMenu, wrap = this.blogWrap, wrapPos = wrap.getBoundingClientRect(), containerHeight, menuHeight, fixedStart, fixedStop, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                menuHeight = menu.offsetHeight;
                containerHeight = container.offsetHeight;
                fixedStart = scrollTop + wrapPos.top;
                fixedStop = fixedStart + containerHeight - (menuHeight + parseFloat(getComputedStyle(container).paddingTop) + parseFloat(getComputedStyle(container).paddingBottom));
                if (scrollTop <= fixedStart) {
                    menu.classList.remove('blog__nav-list_fixed');
                }
                if (scrollTop > fixedStart) {
                    menu.classList.remove(-wrapPos.top < fixedStop - fixedStart ? 'blog__nav-list_in-bottom' : 'blog__nav-list_fixed');
                    menu.classList.add(-wrapPos.top < fixedStop - fixedStart ? 'blog__nav-list_fixed' : 'blog__nav-list_in-bottom');
                }
            };
            this.checkActive = function () {
                var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, menuItemsLinks = this.blogMenu.getElementsByClassName('blog__nav-item-lnk'), blogItemId, blogItem, activeId, minTop, currentTop, i;
                if (menuItemsLinks.length == 0)
                    return;
                for (i in menuItemsLinks) {
                    if (typeof menuItemsLinks[i] !== 'object')
                        continue;
                    blogItemId = menuItemsLinks[i].getAttribute('href').match(/#(.*)/i)[1];
                    blogItem = document.getElementById(blogItemId);
                    if (!blogItem)
                        continue;
                    currentTop = Math.abs(blogItem.getBoundingClientRect().top);
                    if (typeof minTop === 'undefined') {
                        minTop = currentTop;
                        activeId = blogItemId;
                        continue;
                    }
                    if (currentTop < minTop) {
                        minTop = currentTop;
                        activeId = blogItemId;
                    }
                }
                if (activeId) {
                    var pattern = new RegExp('#' + activeId + '$', 'i');
                    for (i in menuItemsLinks) {
                        if (typeof menuItemsLinks[i] !== 'object')
                            continue;
                        menuItemsLinks[i].classList.remove('blog__nav-item-lnk_active');
                        if (menuItemsLinks[i].getAttribute('href').match(pattern)) {
                            menuItemsLinks[i].classList.add('blog__nav-item-lnk_active');
                        }
                    }
                }
            };
            this.init = function () {
                this.checkActive();
                this.triggerMobileMenu();
                window.addEventListener('scroll', this.fixed.bind({
                    'blogContainer': this.blogContainer,
                    'blogMenu': this.blogMenu,
                    'blogWrap': this.blogWrap
                }));
                window.addEventListener('resize', this.fixed.bind({
                    'blogContainer': this.blogContainer,
                    'blogMenu': this.blogMenu,
                    'blogWrap': this.blogWrap
                }));
                window.addEventListener('scroll', this.checkActive.bind({ 'blogMenu': this.blogMenu }));
                window.addEventListener('resize', this.checkActive.bind({ 'blogMenu': this.blogMenu }));
            };
        };
        var menu = new BlogMenu(blockBlogMenu);
        menu.init();
    }());
});
// $(function(){
// 	// Flipper trigger
// 	(function(){
// 		$(document).on('click', '.flipper-trigger', function(e){
// 			e.preventDefault();
//  			var $this = $(this);
//  			var flipId = $(this).attr('data-flip-id');
//  			var flipper = $('.flipper[data-flip-id = ' + flipId + ']');
//  			if($this.hasClass('flipper-trigger_back')) {
//  				flipper.addClass('flipper_turned');
//  				$this.addClass('flipper-trigger_hidden');
//  			} else {
//  				flipper.removeClass('flipper_turned');
//  				$('.flipper-trigger_back').removeClass('flipper-trigger_hidden');
//  			}
// 		});
// 	})()
// })
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var trigger = document.querySelectorAll('.flipper-trigger'), i;
        for (i in trigger) {
            if (typeof trigger[i].addEventListener !== 'function')
                continue;
            trigger[i].addEventListener('click', function (e) {
                e.preventDefault();
                var flipId = this.getAttribute('data-flip-id');
                var flipper = document.querySelector('.flipper[data-flip-id = ' + flipId + ']');
                if (!flipper)
                    return false;
                if (this.classList.contains('flipper-trigger_back')) {
                    flipper.classList.add('flipper_turned');
                    this.classList.add('flipper-trigger_hidden');
                } else {
                    flipper.classList.remove('flipper_turned');
                    document.querySelector('.flipper-trigger_back[data-flip-id = ' + flipId + ']').classList.remove('flipper-trigger_hidden');
                }
            });
        }
    }());
});
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var btnMenu = document.querySelectorAll('.btn-menu'), i;
        for (var i in btnMenu) {
            if (typeof btnMenu[i].addEventListener !== 'function')
                continue;
            btnMenu[i].addEventListener('click', function (e) {
                e.preventDefault();
                var nav = document.querySelector('.nav');
                if (!nav)
                    return false;
                if (!nav.classList.contains('nav_open')) {
                    nav.classList.add('nav_open');
                    this.classList.add('btn-menu_cross');
                    this.classList.add('nav__btn-menu_fixed');
                } else {
                    nav.classList.remove('nav_open');
                    this.classList.remove('btn-menu_cross');
                    this.classList.remove('nav__btn-menu_fixed');
                }
            });
        }
    }());
});
document.addEventListener('DOMContentLoaded', function () {
    // BLUR	
    var blur = function () {
        var bgImg = document.getElementsByClassName('page__footer-bg-img')[0], formBlur = document.getElementsByClassName('form__wrap-blur')[0];
        return {
            init: function () {
                if (!bgImg || !formBlur)
                    return;
                if (navigator.userAgent.indexOf('Trident') + 1 != 0) {
                    formBlur.classList.add('form__wrap-blur_alt');
                    return;
                }
                var posLeft = bgImg.getBoundingClientRect().left - formBlur.getBoundingClientRect().left, posTop = bgImg.getBoundingClientRect().top - formBlur.getBoundingClientRect().top;
                //formBlur.style.backgroundImage = 'url(' + bgImg.src + ')';
                formBlur.style.backgroundPosition = posLeft / 10 + 'rem' + ' ' + posTop / 10 + 'rem';
                formBlur.style.backgroundSize = bgImg.clientWidth / 10 + 'rem' + ' ' + bgImg.clientHeight / 10 + 'rem';
            }
        };
    }();
    blur.init();
    window.addEventListener('resize', blur.init.bind(blur));
    window.addEventListener('scroll', blur.init.bind(blur));
    //Parallax
    var parallax = function () {
        var bgImg = document.getElementsByClassName('page__footer-bg-img')[0], leaf1 = document.getElementsByClassName('page__footer-bg-leaf-1')[0], leaf2 = document.getElementsByClassName('page__footer-bg-leaf-2')[0], leaf3 = document.getElementsByClassName('page__footer-bg-leaf-3')[0];
        return {
            move: function (element, speedShift, speedDrop, speedRotate) {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop, pageHeight = document.documentElement.scrollHeight, clientHeight = document.documentElement.clientHeight, scrollTop, top = element.getBoundingClientRect().top + (window.innerHeight || window.body.clientHeight || document.documentElement.clientHeight), transform;
                transform = speedShift ? 'translateX(' + ((scrollTop + clientHeight) / pageHeight - 1) * 1000 * speedShift + '%)' : '';
                transform += speedDrop ? 'translateY(' + ((scrollTop + clientHeight) / pageHeight - 1) * 1000 * speedDrop + '%)' : '';
                transform += 'translateZ(0)';
                transform += speedRotate ? 'rotate(' + ((scrollTop + clientHeight) / pageHeight - 1) * speedRotate * 360 + 'deg)' : '';
                if (transform === 'translateZ(0)') {
                    element.style.bottom = ((scrollTop + clientHeight) / pageHeight - 1) * 100 + '%';
                    return;
                }
                element.style.webkitTransform = transform;
                element.style.mozTransform = transform;
                element.style.transform = transform;
                element.style.msTransform = transform;
                element.style.oTransform = transform;
            },
            init: function () {
                if (leaf1)
                    this.move(leaf1, 1, 0.75, 0.5);
                if (leaf2)
                    this.move(leaf2, 1, 2, 1);
                if (leaf3)
                    this.move(leaf3, 1, 4, 2);
                if (bgImg)
                    this.move(bgImg, false, false, false);
            }
        };
    }();
    window.addEventListener('scroll', parallax.init.bind(parallax));
});
var map, styleMap = [
        {
            'featureType': 'all',
            'elementType': 'all',
            'stylers': [
                { 'visibility': 'on' },
                { 'hue': '#ff0000' }
            ]
        },
        {
            'featureType': 'all',
            'elementType': 'geometry',
            'stylers': [{ 'saturation': '100' }]
        },
        {
            'featureType': 'all',
            'elementType': 'geometry.stroke',
            'stylers': [
                { 'visibility': 'on' },
                { 'hue': '#ff0000' }
            ]
        },
        {
            'featureType': 'administrative',
            'elementType': 'labels.text.fill',
            'stylers': [{ 'color': '#444444' }]
        },
        {
            'featureType': 'administrative.country',
            'elementType': 'labels.text.fill',
            'stylers': [{ 'hue': '#ff0000' }]
        },
        {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [{ 'color': '#f2f2f2' }]
        },
        {
            'featureType': 'landscape.natural.terrain',
            'elementType': 'labels.text.stroke',
            'stylers': [{ 'visibility': 'on' }]
        },
        {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [{ 'visibility': 'off' }]
        },
        {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [
                { 'saturation': -100 },
                { 'lightness': 45 }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [{ 'visibility': 'simplified' }]
        },
        {
            'featureType': 'road.arterial',
            'elementType': 'labels.icon',
            'stylers': [{ 'visibility': 'off' }]
        },
        {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [{ 'visibility': 'off' }]
        },
        {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
                { 'color': '#86a77a' },
                { 'visibility': 'on' }
            ]
        }
    ];
function initMap() {
    var myLatLng = {
        lat: 60.065651,
        lng: 30.312249
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15,
        mapTypeControl: false,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        draggable: !('ontouchend' in document),
        styles: styleMap
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Моя локация'
    });
    marker.setMap(map);
}
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        // first add raf shim
        // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        window.requestAnimFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        }();
        // main function
        function scrollToY(scrollTargetY, speed, easing) {
            // scrollTargetY: the target scrollY property of the window
            // speed: time in pixels per second
            // easing: easing equation to use
            var scrollY = window.scrollY, scrollTargetY = scrollTargetY || 0, speed = speed || 2000, easing = easing || 'easeOutSine', currentTime = 0;
            // min time .1, max time .8 seconds
            var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
            // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
            var PI_D2 = Math.PI / 2, easingEquations = {
                    easeOutSine: function (pos) {
                        return Math.sin(pos * (Math.PI / 2));
                    },
                    easeInOutSine: function (pos) {
                        return -0.5 * (Math.cos(Math.PI * pos) - 1);
                    },
                    easeInOutQuint: function (pos) {
                        if ((pos /= 0.5) < 1) {
                            return 0.5 * Math.pow(pos, 5);
                        }
                        return 0.5 * (Math.pow(pos - 2, 5) + 2);
                    }
                };
            // add animation loop
            function tick() {
                currentTime += 1 / 60;
                var p = currentTime / time;
                var t = easingEquations[easing](p);
                if (p < 1) {
                    requestAnimFrame(tick);
                    window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
                } else {
                    //console.log('scroll done');
                    window.scrollTo(0, scrollTargetY);
                }
            }
            // call it once to get started
            tick();
        }
        var link = document.querySelectorAll('[href^="#"]'), speed = 0.5;
        function getElementScrollPosition(element) {
            if (!element)
                return;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop, elementId = element.href.match(/#(.*)/i), elementOfPage;
            elementOfPage = document.getElementById(elementId[1]);
            return elementOfPage ? scrollTop + elementOfPage.getBoundingClientRect().top : 0;
        }
        for (var i in link) {
            if (typeof link[i] != 'object')
                return;
            link[i].addEventListener('click', function (e) {
                e.preventDefault();
                var scrollTo = getElementScrollPosition(this), start = null;
                scrollToY(scrollTo, 2000);
            });
        }
    }());
});
document.addEventListener('DOMContentLoaded', function () {
    // PRELOADER	
    (function () {
        var elements = document.getElementsByTagName('*'), imgs = [], totalImgs, totalLoaded = 0, showedPercents = 0, preloader = document.getElementsByClassName('preloader')[0], preloaderPercents = document.getElementsByClassName('preloader__progress-text')[0], timer;
        if (!preloader || !preloaderPercents)
            return;
        for (var i in elements) {
            if (typeof elements[i] !== 'object')
                continue;
            var imgUrl = null;
            switch (elements[i].nodeName) {
            case 'IMG':
                imgUrl = elements[i].getAttribute('src');
                break;
            case 'SVG':
            case 'svg':
                var svgUse = elements[i].getElementsByTagName('use');
                if (!svgUse[0])
                    break;
                var useHref = svgUse[0].getAttribute('xlink:href');
                useHref = useHref.match(/(.*?)\.svg/);
                imgUrl = useHref !== null ? useHref[0] : null;
                break;
            default:
                if (!elements[i].nodeName)
                    break;
                var bgImg = getComputedStyle(elements[i]).backgroundImage;
                if (bgImg != 'none') {
                    bgImg = bgImg.match(/url\((.*?)\)/);
                    bgImg = bgImg !== null ? bgImg[1].replace(/('|")/g, '') : null;
                    imgUrl = bgImg;
                }
            }
            if (imgUrl !== null && imgUrl != 'none' && imgs.indexOf(imgUrl) == -1)
                imgs.push(imgUrl);
        }
        totalImgs = imgs.length;
        for (i in imgs) {
            var img = new Image();
            img.src = imgs[i];
            img.onload = function () {
                totalLoaded++;
                setPercents(totalLoaded, totalImgs);
                console.log(this.src + ' загружено');
            };
            img.onerror = function () {
                totalLoaded++;
                setPercents(totalLoaded, totalImgs);
            };
        }
        function setPercents(totalLoaded, totalImgs) {
            var percents = Math.ceil(totalLoaded / totalImgs * 100);
            clearInterval(timer);
            preloaderPercents.textContent = showedPercents;
            if (percents >= 100) {
                preloaderPercents.textContent = showedPercents = 100;
                if (preloader) {
                    preloader.classList.add('preloader_hidden');
                    document.getElementsByTagName('html')[0].classList.add('_loaded');
                }
            } else {
                timer = setInterval(function () {
                    preloaderPercents.textContent = showedPercents;
                    showedPercents++;
                    if (showedPercents >= percents) {
                        clearInterval(timer);
                    }
                }, 10);
            }
        }
    }());
});
document.addEventListener('DOMContentLoaded', function () {
    // SLIDER	
    (function () {
        var slider = document.getElementsByClassName('slider');
        if (!slider.length)
            return;
        function Slider(root) {
            this.sliderRoot = root;
            this.sliderItems = [];
            this.currentItemNum = 0;
            this.flag = false;
            this.getValuesItemsHelper = function (item, name) {
                var classPrefix = 'slider__item-', value;
                value = item.getAttribute('data-' + name);
                if (!value) {
                    value = item.getElementsByClassName(classPrefix + name)[0];
                    value = value ? value.innerHTML.trim() : null;
                }
                return value;
            };
            this.genItems = function () {
                var items = this.sliderRoot.getElementsByClassName('slider__item'), i, sliderItem;
                if (!items.length)
                    return false;
                for (i in items) {
                    if (typeof items[i] !== 'object')
                        continue;
                    sliderItem = {
                        'title': this.getValuesItemsHelper(items[i], 'title'),
                        'descr': this.getValuesItemsHelper(items[i], 'descr'),
                        'img': this.getValuesItemsHelper(items[i], 'img'),
                        'href': this.getValuesItemsHelper(items[i], 'href')
                    };
                    this.sliderItems[i] = sliderItem;
                }
                this.total = this.sliderItems.length;
            };
            this.genHTML = function () {
                var blockPic = document.createElement('div'), blockPicItem = document.createElement('div'), blockAboutUnit = document.createElement('div'), blockUnitTitle = document.createElement('div'), blockUnitTitleCnt = document.createElement('div'), blockUnitDescr = document.createElement('div'), blockUnitLink = document.createElement('div'), blockUnitLinkHref = document.createElement('a'), blockNav = document.createElement('div'), blockNavBtnPrev = document.createElement('a'), blockNavBtnNext = document.createElement('a'), i;
                blockPic.classList.add('slider__init-pic');
                this.blockPic = blockPic;
                this.blockPicActiveItem = blockPic.appendChild(blockPicItem.cloneNode());
                this.blockPicActiveItem.classList.add('slider__init-pic-item');
                this.blockPicActiveItem.classList.add('slider__init-pic-item_visible');
                this.blockPicDisactiveItem = blockPic.appendChild(blockPicItem);
                this.blockPicDisactiveItem.classList.add('slider__init-pic-item');
                this.blockPicDisactiveItem.classList.add('slider__init-pic-item_hidden');
                blockAboutUnit.classList.add('slider__about-unit');
                blockUnitTitle.classList.add('slider__unit-title');
                blockUnitTitleCnt.classList.add('title');
                blockUnitTitleCnt.classList.add('title_with-line');
                blockUnitTitleCnt.classList.add('title_with-line-upper');
                blockUnitDescr.classList.add('slider__unit-descr');
                blockUnitLink.classList.add('slider__unit-link');
                blockUnitLinkHref.classList.add('btn');
                blockUnitLinkHref.classList.add('btn_with-icon');
                blockUnitLinkHref.setAttribute('href', '#');
                blockUnitLinkHref.setAttribute('target', '_blank');
                blockUnitLinkHref.innerHTML = '<svg class="svg-icon svg-icon_link" role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./assets/img/sprite.svg#link"></use></svg><span>Посмотреть сайт</span>';
                this.blockUnitTitle = blockAboutUnit.appendChild(blockUnitTitle).appendChild(blockUnitTitleCnt);
                blockAboutUnit.appendChild(blockUnitTitle).style.display = 'none';
                this.blockUnitDescr = blockAboutUnit.appendChild(blockUnitDescr);
                this.blockUnitDescr.style.display = 'none';
                this.blockUnitLink = blockAboutUnit.appendChild(blockUnitLink).appendChild(blockUnitLinkHref);
                this.blockUnitLink.parentNode.style.display = 'none';
                blockNav.classList.add('slider__nav');
                blockNavBtnPrev.classList.add('slider__nav-btn');
                blockNavBtnPrev.setAttribute('href', '#');
                blockNavBtnPrev.setAttribute('rel', 'nofollow');
                blockNavBtnPrev.innerHTML = '<span class="slider__nav-icon"></span>';
                blockNavBtnNext = blockNavBtnPrev.cloneNode();
                blockNavBtnNext.innerHTML = blockNavBtnPrev.innerHTML;
                this.blockNavBtnPrev = blockNav.appendChild(blockNavBtnPrev);
                this.blockNavBtnPrev.classList.add('slider__nav-btn_prev');
                this.blockNavBtnNext = blockNav.appendChild(blockNavBtnNext);
                this.blockNavBtnNext.classList.add('slider__nav-btn_next');
                this.blockNavBtnNext.addEventListener('click', this.clickNavBtn.bind({
                    slider: this,
                    type: 'next'
                }));
                this.blockNavBtnPrev.addEventListener('click', this.clickNavBtn.bind({
                    slider: this,
                    type: 'prev'
                }));
                this.sliderRoot.appendChild(blockPic);
                this.sliderRoot.appendChild(blockAboutUnit);
                this.sliderRoot.appendChild(blockNav);
                var $that = this;
                return new Promise(function (resolve) {
                    var loadedSlides = 0;
                    function listenLoaded(loaded, total) {
                        if (loaded == total) {
                            resolve($that);
                        }
                    }
                    ;
                    for (i in $that.sliderItems) {
                        var sliderItem = $that.sliderItems[i], slideImg = new Image(), slideThumb = document.createElement('span');
                        slideThumb.classList.add('slider__nav-btn-thumb');
                        slideImg.src = sliderItem.img;
                        slideImg.onload = function () {
                            console.log(this.src + ' загружено в слайдер');
                            loadedSlides++;
                            listenLoaded(loadedSlides, $that.total);
                        };
                        slideImg.onerror = function () {
                            console.log(this.src + ' не загружено в слайдер');
                            loadedSlides++;
                            listenLoaded(loadedSlides, $that.total);
                        };
                        $that.blockNavBtnNext.appendChild(slideThumb).appendChild(slideImg);
                        $that.blockNavBtnPrev.appendChild(slideThumb.cloneNode()).appendChild(slideImg.cloneNode());
                    }
                });
            };
            this.changeSlide = function (currentNew, type) {
                var current = this.currentItemNum, next = this.getNextNum(current), prev = this.getPrevNum(current), nextNew = this.getNextNum(currentNew), prevNew = this.getPrevNum(currentNew), $that = this;
                return new Promise(function (resolve) {
                    (type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb')[type == 'next' ? next : prev].classList.add('slider__nav-btn-thumb_unactive');
                    (type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb')[type == 'next' ? next : prev].classList.remove('slider__nav-btn-thumb_active');
                    (type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb')[type == 'next' ? nextNew : prevNew].classList.add('slider__nav-btn-thumb_active');
                    (type == 'next' ? $that.blockNavBtnNext : $that.blockNavBtnPrev).getElementsByClassName('slider__nav-btn-thumb_unactive')[0].addEventListener('transitionend', function () {
                        this.classList.remove('slider__nav-btn-thumb_unactive');
                        resolve(this);
                    });
                });
            };
            this.setActiveInfo = function (current) {
                var activeSlide = this.sliderItems[current];
                if (activeSlide.title) {
                    this.blockUnitTitle.innerHTML = activeSlide.title;
                    this.blockUnitTitle.parentNode.style.display = '';
                } else {
                    this.blockUnitTitle.parentNode.style.display = 'none';
                }
                if (activeSlide.descr) {
                    this.blockUnitDescr.innerHTML = activeSlide.descr;
                    this.blockUnitDescr.style.display = '';
                } else {
                    this.blockUnitDescr.style.display = 'none';
                }
                if (activeSlide.href) {
                    this.blockUnitLink.setAttribute('href', activeSlide.href);
                    this.blockUnitLink.parentNode.style.display = '';
                } else {
                    this.blockUnitLink.parentNode.style.display = 'none';
                }
            };
            this.setActivePic = function (current, blockPicItem) {
                var activeSlide = this.sliderItems[current], img = document.createElement('img');
                return new Promise(function (resolve) {
                    img.src = activeSlide.img;
                    if (blockPicItem.classList.contains('slider__init-pic-item_visible')) {
                        blockPicItem.classList.remove('slider__init-pic-item_visible');
                        blockPicItem.classList.add('slider__init-pic-item_hidden');
                        blockPicItem.innerHTML = '';
                    } else {
                        blockPicItem.appendChild(img).parentNode.classList.remove('slider__init-pic-item_hidden');
                        blockPicItem.classList.add('slider__init-pic-item_visible');
                    }
                    blockPicItem.addEventListener('transitionend', function () {
                        resolve();
                    });
                });
            };
            this.clickNavBtn = function (e) {
                e.preventDefault();
                if (this.slider.flag) {
                    var current = this.slider.currentItemNum, currentNew = this.type == 'next' ? this.slider.getNextNum(current) : this.slider.getPrevNum(current);
                    this.slider.flag = false;
                    this.slider.animationDone([
                        this.slider.changeSlide(currentNew, 'next'),
                        this.slider.changeSlide(currentNew, 'prev'),
                        this.slider.setActivePic(currentNew, this.slider.blockPicActiveItem),
                        this.slider.setActivePic(currentNew, this.slider.blockPicDisactiveItem)
                    ]);
                    this.slider.setActiveInfo(currentNew);
                    this.slider.currentItemNum = currentNew;
                }
            };
            this.getNextNum = function (current) {
                current++;
                return current > this.total - 1 ? 0 : current;
            };
            this.getPrevNum = function (current) {
                current--;
                return current < 0 ? this.total - 1 : current;
            };
            this.animationDone = function (arr) {
                var $that = this;
                Promise.all(arr).then(function (results) {
                    $that.flag = true;
                    console.log('aimation done');
                });
            };
            this.init = function () {
                this.genItems();
                if (this.sliderItems.length === 0)
                    return;
                this.genHTML().then(function (slider) {
                    slider.sliderRoot.classList.add('slider_loaded');
                    slider.animationDone([
                        slider.changeSlide(slider.currentItemNum, 'next'),
                        slider.changeSlide(slider.currentItemNum, 'prev'),
                        slider.setActivePic(slider.currentItemNum, slider.blockPicActiveItem),
                        slider.setActivePic(slider.currentItemNum, slider.blockPicDisactiveItem)
                    ]);
                    slider.setActiveInfo(slider.currentItemNum);
                    console.log('ready');
                });
            };
        }
        for (var i in slider) {
            if (typeof slider[i] != 'object')
                continue;
            var s = new Slider(slider[i]);
            s.init();
        }
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cvYmxvZy5qcyIsImZsaXBwZXItdHJpZ2dlci9mbGlwcGVyLXRyaWdnZXIuanMiLCJuYXYvbmF2LmpzIiwicGFnZS9wYWdlX19mb290ZXIuanMiLCJwYWdlL3Njcm9sbC5qcyIsInByZWxvYWRlci9wcmVsb2FkZXIuanMiLCJzbGlkZXIvc2xpZGVyLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJsb2NrQmxvZ01lbnUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQmxvZ01lbnUiLCJibG9jayIsImJsb2dNZW51IiwiYmxvZ1dyYXAiLCJwYXJlbnROb2RlIiwiYmxvZ0NvbnRhaW5lciIsIm1vYmlsZVN0YXR1cyIsInRyaWdnZXJNb2JpbGVNZW51IiwiYnV0dG9uQmxvZ01lbnUiLCIkdGhhdCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImJvZHkiLCJlIiwiZWxlbWVudCIsInRhcmdldCIsImhpZGUiLCJjb250YWlucyIsInBhcmVudEVsZW1lbnQiLCJmaXhlZCIsImNvbnRhaW5lciIsIm1lbnUiLCJ3cmFwIiwid3JhcFBvcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNvbnRhaW5lckhlaWdodCIsIm1lbnVIZWlnaHQiLCJmaXhlZFN0YXJ0IiwiZml4ZWRTdG9wIiwic2Nyb2xsVG9wIiwid2luZG93IiwicGFnZVlPZmZzZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJvZmZzZXRIZWlnaHQiLCJ0b3AiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiY2hlY2tBY3RpdmUiLCJ3aW5IZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsIm1lbnVJdGVtc0xpbmtzIiwiYmxvZ0l0ZW1JZCIsImJsb2dJdGVtIiwiYWN0aXZlSWQiLCJtaW5Ub3AiLCJjdXJyZW50VG9wIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsIm1hdGNoIiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXRoIiwiYWJzIiwicGF0dGVybiIsIlJlZ0V4cCIsImluaXQiLCJiaW5kIiwidHJpZ2dlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcmV2ZW50RGVmYXVsdCIsImZsaXBJZCIsImZsaXBwZXIiLCJxdWVyeVNlbGVjdG9yIiwiYnRuTWVudSIsIm5hdiIsImJsdXIiLCJiZ0ltZyIsImZvcm1CbHVyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsInBvc0xlZnQiLCJsZWZ0IiwicG9zVG9wIiwic3R5bGUiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kU2l6ZSIsImNsaWVudFdpZHRoIiwicGFyYWxsYXgiLCJsZWFmMSIsImxlYWYyIiwibGVhZjMiLCJtb3ZlIiwic3BlZWRTaGlmdCIsInNwZWVkRHJvcCIsInNwZWVkUm90YXRlIiwicGFnZUhlaWdodCIsInNjcm9sbEhlaWdodCIsInRyYW5zZm9ybSIsImJvdHRvbSIsIndlYmtpdFRyYW5zZm9ybSIsIm1velRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwib1RyYW5zZm9ybSIsIm1hcCIsInN0eWxlTWFwIiwiaW5pdE1hcCIsIm15TGF0TG5nIiwibGF0IiwibG5nIiwiZ29vZ2xlIiwibWFwcyIsIk1hcCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInBhbkNvbnRyb2wiLCJ6b29tQ29udHJvbCIsInpvb21Db250cm9sT3B0aW9ucyIsInBvc2l0aW9uIiwiQ29udHJvbFBvc2l0aW9uIiwiUklHSFRfQ0VOVEVSIiwic3RyZWV0Vmlld0NvbnRyb2wiLCJtYXBUeXBlSWQiLCJNYXBUeXBlSWQiLCJST0FETUFQIiwic2Nyb2xsd2hlZWwiLCJkcmFnZ2FibGUiLCJzdHlsZXMiLCJtYXJrZXIiLCJNYXJrZXIiLCJ0aXRsZSIsInNldE1hcCIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJzY3JvbGxUb1kiLCJzY3JvbGxUYXJnZXRZIiwic3BlZWQiLCJlYXNpbmciLCJzY3JvbGxZIiwiY3VycmVudFRpbWUiLCJ0aW1lIiwibWF4IiwibWluIiwiUElfRDIiLCJQSSIsImVhc2luZ0VxdWF0aW9ucyIsImVhc2VPdXRTaW5lIiwicG9zIiwic2luIiwiZWFzZUluT3V0U2luZSIsImNvcyIsImVhc2VJbk91dFF1aW50IiwicG93IiwidGljayIsInAiLCJ0Iiwic2Nyb2xsVG8iLCJsaW5rIiwiZ2V0RWxlbWVudFNjcm9sbFBvc2l0aW9uIiwiZWxlbWVudElkIiwiaHJlZiIsImVsZW1lbnRPZlBhZ2UiLCJzdGFydCIsImVsZW1lbnRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbWdzIiwidG90YWxJbWdzIiwidG90YWxMb2FkZWQiLCJzaG93ZWRQZXJjZW50cyIsInByZWxvYWRlciIsInByZWxvYWRlclBlcmNlbnRzIiwidGltZXIiLCJpbWdVcmwiLCJub2RlTmFtZSIsInN2Z1VzZSIsInVzZUhyZWYiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJyZXBsYWNlIiwicHVzaCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwic2V0UGVyY2VudHMiLCJjb25zb2xlIiwibG9nIiwib25lcnJvciIsInBlcmNlbnRzIiwiY2VpbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0Q29udGVudCIsInNldEludGVydmFsIiwic2xpZGVyIiwiU2xpZGVyIiwicm9vdCIsInNsaWRlclJvb3QiLCJzbGlkZXJJdGVtcyIsImN1cnJlbnRJdGVtTnVtIiwiZmxhZyIsImdldFZhbHVlc0l0ZW1zSGVscGVyIiwiaXRlbSIsIm5hbWUiLCJjbGFzc1ByZWZpeCIsInZhbHVlIiwiaW5uZXJIVE1MIiwidHJpbSIsImdlbkl0ZW1zIiwiaXRlbXMiLCJzbGlkZXJJdGVtIiwidG90YWwiLCJnZW5IVE1MIiwiYmxvY2tQaWMiLCJjcmVhdGVFbGVtZW50IiwiYmxvY2tQaWNJdGVtIiwiYmxvY2tBYm91dFVuaXQiLCJibG9ja1VuaXRUaXRsZSIsImJsb2NrVW5pdFRpdGxlQ250IiwiYmxvY2tVbml0RGVzY3IiLCJibG9ja1VuaXRMaW5rIiwiYmxvY2tVbml0TGlua0hyZWYiLCJibG9ja05hdiIsImJsb2NrTmF2QnRuUHJldiIsImJsb2NrTmF2QnRuTmV4dCIsImJsb2NrUGljQWN0aXZlSXRlbSIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiYmxvY2tQaWNEaXNhY3RpdmVJdGVtIiwic2V0QXR0cmlidXRlIiwiZGlzcGxheSIsImNsaWNrTmF2QnRuIiwidHlwZSIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZGVkU2xpZGVzIiwibGlzdGVuTG9hZGVkIiwibG9hZGVkIiwic2xpZGVJbWciLCJzbGlkZVRodW1iIiwiY2hhbmdlU2xpZGUiLCJjdXJyZW50TmV3IiwiY3VycmVudCIsIm5leHQiLCJnZXROZXh0TnVtIiwicHJldiIsImdldFByZXZOdW0iLCJuZXh0TmV3IiwicHJldk5ldyIsInNldEFjdGl2ZUluZm8iLCJhY3RpdmVTbGlkZSIsImRlc2NyIiwic2V0QWN0aXZlUGljIiwiYW5pbWF0aW9uRG9uZSIsImFyciIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwicyJdLCJtYXBwaW5ncyI6IjtBQUFBQSxRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQSxDQUFBLFlBQUE7QUFBQSxRQUVBLElBQUFDLGFBQUEsR0FBQUYsUUFBQSxDQUFBRyxzQkFBQSxDQUFBLGdCQUFBLEVBQUEsQ0FBQSxDQUFBLENBRkE7QUFBQSxRQUlBLElBQUEsQ0FBQUQsYUFBQTtBQUFBLFlBQUEsT0FKQTtBQUFBLFFBTUEsSUFBQUUsUUFBQSxHQUFBLFVBQUFDLEtBQUEsRUFBQTtBQUFBLFlBRUEsS0FBQUMsUUFBQSxHQUFBRCxLQUFBLENBRkE7QUFBQSxZQUlBLEtBQUFFLFFBQUEsR0FBQUYsS0FBQSxDQUFBRyxVQUFBLENBSkE7QUFBQSxZQU1BLEtBQUFDLGFB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O0FBQUEsU0FOQTtBQUFBLFFBcVNBLFNBQUF0SSxDQUFBLElBQUE2SSxNQUFBLEVBQUE7QUFBQSxZQUNBLElBQUEsT0FBQUEsTUFBQSxDQUFBN0ksQ0FBQSxDQUFBLElBQUEsUUFBQTtBQUFBLGdCQUFBLFNBREE7QUFBQSxZQUVBLElBQUE2TSxDQUFBLEdBQUEsSUFBQS9ELE1BQUEsQ0FBQUQsTUFBQSxDQUFBN0ksQ0FBQSxDQUFBLENBQUEsQ0FGQTtBQUFBLFlBR0E2TSxDQUFBLENBQUFwTSxJQUFBLEdBSEE7QUFBQSxTQXJTQTtBQUFBLEtBQUEsSUFGQTtBQUFBLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgYmxvY2tCbG9nTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1saXN0JylbMF07XHJcblx0XHRcclxuXHRcdGlmKCFibG9ja0Jsb2dNZW51KSByZXR1cm47XHJcblxyXG5cdFx0dmFyIEJsb2dNZW51ID0gZnVuY3Rpb24oYmxvY2spIHtcclxuXHJcblx0XHRcdHRoaXMuYmxvZ01lbnUgPSBibG9jaztcclxuXHJcblx0XHRcdHRoaXMuYmxvZ1dyYXAgPSBibG9jay5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5ibG9nQ29udGFpbmVyID0gYmxvY2sucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5tb2JpbGVTdGF0dXMgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgYnV0dG9uQmxvZ01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nX19uYXYtYnV0dG9uJylbMF0sXHJcblx0XHRcdFx0XHQkdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdGlmKCFidXR0b25CbG9nTWVudSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRidXR0b25CbG9nTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdCR0aGF0Lm1vYmlsZVN0YXR1cyA9ICEkdGhhdC5tb2JpbGVTdGF0dXM7XHJcblx0XHRcdFx0XHRpZigkdGhhdC5tb2JpbGVTdGF0dXMpIHtcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbkJsb2dNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmJsb2dXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0XHRcdGlmKCEkdGhhdC5tb2JpbGVTdGF0dXMpIHJldHVybjtcclxuXHRcdFx0XHRcdHZhciBlbGVtZW50ID0gZS50YXJnZXQsXHJcblx0XHRcdFx0XHRcdGhpZGUgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdHdoaWxlKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ19zaG93ZWQtYmxvZy1tZW51JykpIHtcclxuXHRcdFx0XHRcdFx0XHRoaWRlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmKGhpZGUpIHtcclxuXHRcdFx0XHRcdFx0JHRoYXQubW9iaWxlU3RhdHVzID0gISR0aGF0Lm1vYmlsZVN0YXR1cztcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZml4ZWQgPSBmdW5jdGlvbiBmaXhlZChlKSB7XHJcblxyXG5cdFx0XHRcdHZhciBjb250YWluZXIgPSB0aGlzLmJsb2dDb250YWluZXIsXHJcblx0XHRcdFx0XHRtZW51ID0gdGhpcy5ibG9nTWVudSxcclxuXHRcdFx0XHRcdHdyYXAgPSB0aGlzLmJsb2dXcmFwLFxyXG5cdFx0XHRcdFx0d3JhcFBvcyA9IHdyYXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdFx0XHRjb250YWluZXJIZWlnaHQsXHJcblx0XHRcdFx0XHRtZW51SGVpZ2h0LFxyXG5cdFx0XHRcdFx0Zml4ZWRTdGFydCxcclxuXHRcdFx0XHRcdGZpeGVkU3RvcCxcclxuXHRcdFx0XHRcdHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRcdG1lbnVIZWlnaHQgPSBtZW51Lm9mZnNldEhlaWdodDtcclxuXHRcdFx0XHRcdGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdFx0XHRmaXhlZFN0YXJ0ID0gc2Nyb2xsVG9wICsgd3JhcFBvcy50b3A7XHJcblx0XHRcdFx0XHRmaXhlZFN0b3AgPSAgZml4ZWRTdGFydCArIGNvbnRhaW5lckhlaWdodCAtIChtZW51SGVpZ2h0ICsgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5wYWRkaW5nQm90dG9tKSk7XHJcblxyXG5cdFx0XHRcdGlmKHNjcm9sbFRvcCA8PSBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihzY3JvbGxUb3AgPiBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9pbi1ib3R0b20nIDogJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5hZGQoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9maXhlZCcgOiAnYmxvZ19fbmF2LWxpc3RfaW4tYm90dG9tJyk7XHRcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuY2hlY2tBY3RpdmUgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LFxyXG5cdFx0XHRcdFx0bWVudUl0ZW1zTGlua3MgPSB0aGlzLmJsb2dNZW51LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1pdGVtLWxuaycpLFxyXG5cdFx0XHRcdFx0YmxvZ0l0ZW1JZCxcclxuXHRcdFx0XHRcdGJsb2dJdGVtLFxyXG5cdFx0XHRcdFx0YWN0aXZlSWQsXHJcblx0XHRcdFx0XHRtaW5Ub3AsXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wLFxyXG5cdFx0XHRcdFx0aTtcclxuXHJcblx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3MubGVuZ3RoID09IDApIHJldHVybjtcclxuXHJcblx0XHRcdFx0Zm9yKGkgaW4gbWVudUl0ZW1zTGlua3MpIHtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRibG9nSXRlbUlkID0gbWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2goLyMoLiopL2kpWzFdO1xyXG5cdFx0XHRcdFx0YmxvZ0l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChibG9nSXRlbUlkKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYoIWJsb2dJdGVtKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wID0gTWF0aC5hYnMoYmxvZ0l0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWluVG9wID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHRtaW5Ub3AgPSBjdXJyZW50VG9wO1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVJZCA9IGJsb2dJdGVtSWQ7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fSBcclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50VG9wIDwgbWluVG9wKSB7XHJcblx0XHRcdFx0XHRcdG1pblRvcCA9IGN1cnJlbnRUb3A7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZUlkID0gYmxvZ0l0ZW1JZDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHRcdGlmKGFjdGl2ZUlkKSB7XHJcblx0XHRcdFx0XHR2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoJyMnICsgYWN0aXZlSWQgKyAnJCcsICdpJyk7XHJcblx0XHRcdFx0XHRmb3IoaSBpbiBtZW51SXRlbXNMaW5rcykge1xyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHRcdFx0bWVudUl0ZW1zTGlua3NbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZ19fbmF2LWl0ZW0tbG5rX2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2gocGF0dGVybikpIHtcclxuXHRcdFx0XHRcdFx0XHRtZW51SXRlbXNMaW5rc1tpXS5jbGFzc0xpc3QuYWRkKCdibG9nX19uYXYtaXRlbS1sbmtfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuY2hlY2tBY3RpdmUoKTtcdFxyXG5cdFx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUoKTtcclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5maXhlZC5iaW5kKHsnYmxvZ0NvbnRhaW5lcicgOiB0aGlzLmJsb2dDb250YWluZXIsICdibG9nTWVudScgOiB0aGlzLmJsb2dNZW51LCAnYmxvZ1dyYXAnIDogdGhpcy5ibG9nV3JhcH0pKTtcdFxyXG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpeGVkLmJpbmQoeydibG9nQ29udGFpbmVyJyA6IHRoaXMuYmxvZ0NvbnRhaW5lciwgJ2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnUsICdibG9nV3JhcCcgOiB0aGlzLmJsb2dXcmFwfSkpO1x0XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtZW51ID0gbmV3IEJsb2dNZW51KGJsb2NrQmxvZ01lbnUpO1xyXG5cdFx0bWVudS5pbml0KCk7XHJcblxyXG5cdH0pKClcclxufSk7IiwiLy8gJChmdW5jdGlvbigpe1xyXG5cclxuLy8gXHQvLyBGbGlwcGVyIHRyaWdnZXJcclxuLy8gXHQoZnVuY3Rpb24oKXtcclxuXHJcbi8vIFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZsaXBwZXItdHJpZ2dlcicsIGZ1bmN0aW9uKGUpe1xyXG4vLyBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICBcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4vLyAgXHRcdFx0dmFyIGZsaXBJZCA9ICQodGhpcykuYXR0cignZGF0YS1mbGlwLWlkJyk7XHJcbi8vICBcdFx0XHR2YXIgZmxpcHBlciA9ICQoJy5mbGlwcGVyW2RhdGEtZmxpcC1pZCA9ICcgKyBmbGlwSWQgKyAnXScpO1xyXG5cclxuLy8gIFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKCdmbGlwcGVyLXRyaWdnZXJfYmFjaycpKSB7XHJcbi8vICBcdFx0XHRcdGZsaXBwZXIuYWRkQ2xhc3MoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcbi8vICBcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdmbGlwcGVyLXRyaWdnZXJfaGlkZGVuJyk7XHJcbi8vICBcdFx0XHR9IGVsc2Uge1xyXG4vLyAgXHRcdFx0XHRmbGlwcGVyLnJlbW92ZUNsYXNzKCdmbGlwcGVyX3R1cm5lZCcpO1xyXG4vLyAgXHRcdFx0XHQkKCcuZmxpcHBlci10cmlnZ2VyX2JhY2snKS5yZW1vdmVDbGFzcygnZmxpcHBlci10cmlnZ2VyX2hpZGRlbicpO1xyXG4vLyAgXHRcdFx0fVxyXG5cclxuLy8gXHRcdH0pO1xyXG5cclxuLy8gXHR9KSgpXHJcblxyXG4vLyB9KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmxpcHBlci10cmlnZ2VyJyksXHJcblx0XHRcdGk7XHJcblx0XHRmb3IoaSBpbiB0cmlnZ2VyKSB7XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgdHJpZ2dlcltpXS5hZGRFdmVudExpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSBjb250aW51ZTtcclxuXHJcblx0XHRcdHRyaWdnZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdCBcdFx0XHR2YXIgZmxpcElkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpcC1pZCcpO1xyXG5cdCBcdFx0XHR2YXIgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyW2RhdGEtZmxpcC1pZCA9ICcgKyBmbGlwSWQgKyAnXScpO1xyXG5cdCBcdFx0XHRpZighZmxpcHBlcikgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHQgXHRcdFx0aWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaXBwZXItdHJpZ2dlcl9iYWNrJykpIHtcclxuIFx0XHRcdFx0XHRmbGlwcGVyLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcbiBcdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdmbGlwcGVyLXRyaWdnZXJfaGlkZGVuJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGZsaXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcHBlcl90dXJuZWQnKTtcclxuIFx0IFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXItdHJpZ2dlcl9iYWNrW2RhdGEtZmxpcC1pZCA9ICcgKyBmbGlwSWQgKyAnXScpLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSkoKVxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ0bk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLW1lbnUnKSxcclxuXHRcdFx0aTtcclxuXHRcdGZvcih2YXIgaSBpbiBidG5NZW51KXtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBidG5NZW51W2ldLmFkZEV2ZW50TGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0YnRuTWVudVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0dmFyIG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuXHRcdFx0XHRpZighbmF2KSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmKCFuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXZfb3BlbicpKSB7XHJcblx0XHRcdFx0XHRuYXYuY2xhc3NMaXN0LmFkZCgnbmF2X29wZW4nKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLW1lbnVfY3Jvc3MnKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnbmF2X19idG4tbWVudV9maXhlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X29wZW4nKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLW1lbnVfY3Jvc3MnKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X19idG4tbWVudV9maXhlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pKClcclxuXHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuLy8gQkxVUlx0XHJcblx0dmFyIGJsdXIgPSAoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBiZ0ltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1pbWcnKVswXSxcclxuXHRcdFx0Zm9ybUJsdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtX193cmFwLWJsdXInKVswXTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cclxuXHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdGlmKCFiZ0ltZyB8fCAhZm9ybUJsdXIpIHJldHVybjtcclxuXHJcblx0XHRcdFx0aWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgKyAxICE9IDApIHtcclxuXHRcdFx0XHRcdGZvcm1CbHVyLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX3dyYXAtYmx1cl9hbHQnKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBwb3NMZWZ0ID0gYmdJbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIGZvcm1CbHVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXHJcblx0XHRcdFx0XHRwb3NUb3AgPSAgYmdJbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gZm9ybUJsdXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuXHRcdFx0XHQvL2Zvcm1CbHVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGJnSW1nLnNyYyArICcpJztcclxuXHRcdFx0XHRmb3JtQmx1ci5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0LzEwICsgJ3JlbScgKyAnICcgKyBwb3NUb3AvMTAgKyAncmVtJztcclxuXHRcdFx0XHRmb3JtQmx1ci5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IGJnSW1nLmNsaWVudFdpZHRoLzEwICsgJ3JlbScgKyAnICcgKyBiZ0ltZy5jbGllbnRIZWlnaHQvMTAgKyAncmVtJztcdFxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fSkoKTtcclxuXHJcblx0Ymx1ci5pbml0KCk7XHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGJsdXIuaW5pdC5iaW5kKGJsdXIpKTtcclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYmx1ci5pbml0LmJpbmQoYmx1cikpO1xyXG5cclxuLy9QYXJhbGxheFxyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBiZ0ltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1pbWcnKVswXSxcclxuXHRcdFx0bGVhZjEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdlX19mb290ZXItYmctbGVhZi0xJylbMF0sXHJcblx0XHRcdGxlYWYyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWxlYWYtMicpWzBdLFxyXG5cdFx0XHRsZWFmMyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1sZWFmLTMnKVswXTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cclxuXHRcdFx0bW92ZTogZnVuY3Rpb24oZWxlbWVudCwgc3BlZWRTaGlmdCwgc3BlZWREcm9wLCBzcGVlZFJvdGF0ZSkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcclxuXHRcdFx0XHRcdHBhZ2VIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxyXG5cdFx0XHRcdFx0Y2xpZW50SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxzY3JvbGxUb3AsXHJcblx0XHRcdFx0XHR0b3AgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgd2luZG93LmJvZHkuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpLFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtO1xyXG5cclxuXHRcdFx0XHRcdHRyYW5zZm9ybSAgPSBzcGVlZFNoaWZ0ID8gJ3RyYW5zbGF0ZVgoJyArICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogMTAwMCAqIHNwZWVkU2hpZnQgKyAnJSknIDogJyc7IFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtICs9IHNwZWVkRHJvcCA/ICd0cmFuc2xhdGVZKCcgKyAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIDEwMDAgKiBzcGVlZERyb3AgKyAnJSknIDogJyc7IFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtICs9ICd0cmFuc2xhdGVaKDApJzsgXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm0gKz0gc3BlZWRSb3RhdGUgPyAncm90YXRlKCcgKyAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIHNwZWVkUm90YXRlICogMzYwICsgJ2RlZyknIDogJyc7XHJcblxyXG5cdFx0XHRcdFx0aWYodHJhbnNmb3JtID09PSAndHJhbnNsYXRlWigwKScpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5ib3R0b20gPSAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIDEwMCArICclJztcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5tb3pUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUubXNUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYobGVhZjEpIHRoaXMubW92ZShsZWFmMSwgMSwgMC43NSwgMC41KTtcclxuXHRcdFx0XHRpZihsZWFmMikgdGhpcy5tb3ZlKGxlYWYyLCAxLCAyLCAxKTtcclxuXHRcdFx0XHRpZihsZWFmMykgdGhpcy5tb3ZlKGxlYWYzLCAxLCA0LCAyKTtcclxuXHRcdFx0XHRpZihiZ0ltZykgdGhpcy5tb3ZlKGJnSW1nLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuXHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH0pKCk7XHRcclxuXHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBhcmFsbGF4LmluaXQuYmluZChwYXJhbGxheCkpO1xyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcbnZhciBtYXAsXHJcblx0c3R5bGVNYXAgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogXCIxMDBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZjAwMDBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjJmMmYyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsLnRlcnJhaW5cIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAtMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQ1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODZhNzdhXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuXHJcblx0dmFyIG15TGF0TG5nID0ge2xhdDogNjAuMDY1NjUxLCBsbmc6IDMwLjMxMjI0OX07XHJcblxyXG5cdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcblx0XHRjZW50ZXI6IG15TGF0TG5nLFxyXG5cdFx0em9vbTogMTUsXHJcblx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcblx0XHRwYW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgXHR6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgXHR6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgXHRcdHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfQ0VOVEVSXHJcbiAgICBcdH0sXHJcbiAgICAgIFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICBcdG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIGRyYWdnYWJsZTogIShcIm9udG91Y2hlbmRcIiBpbiBkb2N1bWVudCksXHJcbiAgICAgICAgc3R5bGVzOiBzdHlsZU1hcFxyXG5cdH0pO1xyXG5cclxuXHR2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcblx0ICAgIHBvc2l0aW9uOiBteUxhdExuZyxcclxuXHQgICAgbWFwOiBtYXAsXHJcblx0ICAgIHRpdGxlOiAn0JzQvtGPINC70L7QutCw0YbQuNGPJ1xyXG5cdH0pO1xyXG5cclxuXHRtYXJrZXIuc2V0TWFwKG1hcCk7XHJcbn0iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0KGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8gZmlyc3QgYWRkIHJhZiBzaGltXHJcblx0XHQvLyBodHRwOi8vd3d3LnBhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XHJcblx0XHQgIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxyXG5cdFx0ICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHRcdCAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XHJcblx0XHQgICAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XHJcblx0XHQgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuXHRcdCAgICAgICAgICB9O1xyXG5cdFx0fSkoKTtcclxuXHJcblx0XHQvLyBtYWluIGZ1bmN0aW9uXHJcblx0XHRmdW5jdGlvbiBzY3JvbGxUb1koc2Nyb2xsVGFyZ2V0WSwgc3BlZWQsIGVhc2luZykge1xyXG5cdFx0ICAgIC8vIHNjcm9sbFRhcmdldFk6IHRoZSB0YXJnZXQgc2Nyb2xsWSBwcm9wZXJ0eSBvZiB0aGUgd2luZG93XHJcblx0XHQgICAgLy8gc3BlZWQ6IHRpbWUgaW4gcGl4ZWxzIHBlciBzZWNvbmRcclxuXHRcdCAgICAvLyBlYXNpbmc6IGVhc2luZyBlcXVhdGlvbiB0byB1c2VcclxuXHJcblx0XHQgICAgdmFyIHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSxcclxuXHRcdCAgICAgICAgc2Nyb2xsVGFyZ2V0WSA9IHNjcm9sbFRhcmdldFkgfHwgMCxcclxuXHRcdCAgICAgICAgc3BlZWQgPSBzcGVlZCB8fCAyMDAwLFxyXG5cdFx0ICAgICAgICBlYXNpbmcgPSBlYXNpbmcgfHwgJ2Vhc2VPdXRTaW5lJyxcclxuXHRcdCAgICAgICAgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuXHRcdCAgICAvLyBtaW4gdGltZSAuMSwgbWF4IHRpbWUgLjggc2Vjb25kc1xyXG5cdFx0ICAgIHZhciB0aW1lID0gTWF0aC5tYXgoLjEsIE1hdGgubWluKE1hdGguYWJzKHNjcm9sbFkgLSBzY3JvbGxUYXJnZXRZKSAvIHNwZWVkLCAuOCkpO1xyXG5cclxuXHRcdCAgICAvLyBlYXNpbmcgZXF1YXRpb25zIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2RhbnJvL2Vhc2luZy1qcy9ibG9iL21hc3Rlci9lYXNpbmcuanNcclxuXHRcdCAgICB2YXIgUElfRDIgPSBNYXRoLlBJIC8gMixcclxuXHRcdCAgICAgICAgZWFzaW5nRXF1YXRpb25zID0ge1xyXG5cdFx0ICAgICAgICAgICAgZWFzZU91dFNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5zaW4ocG9zICogKE1hdGguUEkgLyAyKSk7XHJcblx0XHQgICAgICAgICAgICB9LFxyXG5cdFx0ICAgICAgICAgICAgZWFzZUluT3V0U2luZTogZnVuY3Rpb24gKHBvcykge1xyXG5cdFx0ICAgICAgICAgICAgICAgIHJldHVybiAoLTAuNSAqIChNYXRoLmNvcyhNYXRoLlBJICogcG9zKSAtIDEpKTtcclxuXHRcdCAgICAgICAgICAgIH0sXHJcblx0XHQgICAgICAgICAgICBlYXNlSW5PdXRRdWludDogZnVuY3Rpb24gKHBvcykge1xyXG5cdFx0ICAgICAgICAgICAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsIDUpO1xyXG5cdFx0ICAgICAgICAgICAgICAgIH1cclxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKE1hdGgucG93KChwb3MgLSAyKSwgNSkgKyAyKTtcclxuXHRcdCAgICAgICAgICAgIH1cclxuXHRcdCAgICAgICAgfTtcclxuXHJcblx0XHQgICAgLy8gYWRkIGFuaW1hdGlvbiBsb29wXHJcblx0XHQgICAgZnVuY3Rpb24gdGljaygpIHtcclxuXHRcdCAgICAgICAgY3VycmVudFRpbWUgKz0gMSAvIDYwO1xyXG5cclxuXHRcdCAgICAgICAgdmFyIHAgPSBjdXJyZW50VGltZSAvIHRpbWU7XHJcblx0XHQgICAgICAgIHZhciB0ID0gZWFzaW5nRXF1YXRpb25zW2Vhc2luZ10ocCk7XHJcblxyXG5cdFx0ICAgICAgICBpZiAocCA8IDEpIHtcclxuXHRcdCAgICAgICAgICAgIHJlcXVlc3RBbmltRnJhbWUodGljayk7XHJcblx0XHQgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsWSArICgoc2Nyb2xsVGFyZ2V0WSAtIHNjcm9sbFkpICogdCkpO1xyXG5cdFx0ICAgICAgICB9IGVsc2Uge1xyXG5cdFx0ICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2Nyb2xsIGRvbmUnKTtcclxuXHRcdCAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxUYXJnZXRZKTtcclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgIH1cclxuXHJcblx0XHQgICAgLy8gY2FsbCBpdCBvbmNlIHRvIGdldCBzdGFydGVkXHJcblx0XHQgICAgdGljaygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2hyZWZePVwiI1wiXScpLFxyXG5cdFx0ICAgIHNwZWVkID0gMC41O1xyXG5cclxuXHRcdGZ1bmN0aW9uIGdldEVsZW1lbnRTY3JvbGxQb3NpdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZighZWxlbWVudCkgcmV0dXJuO1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcdFxyXG5cdFx0XHRcdGVsZW1lbnRJZCA9IGVsZW1lbnQuaHJlZi5tYXRjaCgvIyguKikvaSksXHJcblx0XHRcdFx0ZWxlbWVudE9mUGFnZTtcclxuXHJcblx0XHRcdFx0ZWxlbWVudE9mUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZFsxXSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdHJldHVybiBlbGVtZW50T2ZQYWdlID8gc2Nyb2xsVG9wICsgZWxlbWVudE9mUGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgOiAwO1xyXG5cdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGZvcih2YXIgaSBpbiBsaW5rKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZih0eXBlb2YgbGlua1tpXSAhPSAnb2JqZWN0JykgcmV0dXJuO1xyXG5cdFx0XHRcclxuXHRcdFx0bGlua1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHR2YXIgc2Nyb2xsVG8gPSBnZXRFbGVtZW50U2Nyb2xsUG9zaXRpb24odGhpcyksXHJcblx0XHRcdFx0XHRzdGFydCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdHNjcm9sbFRvWShzY3JvbGxUbywgMjAwMCk7XHJcblxyXG5cdFx0ICBcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHR9KSgpXHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuLy8gUFJFTE9BREVSXHRcclxuXHQoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyksXHJcblx0XHRcdGltZ3MgPSBbXSxcclxuXHRcdFx0dG90YWxJbWdzLFxyXG5cdFx0XHR0b3RhbExvYWRlZCA9IDAsXHJcblx0XHRcdHNob3dlZFBlcmNlbnRzID0gMCxcclxuXHRcdFxyXG5cdFx0XHRwcmVsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmVsb2FkZXInKVswXSxcclxuXHRcdFx0cHJlbG9hZGVyUGVyY2VudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmVsb2FkZXJfX3Byb2dyZXNzLXRleHQnKVswXSxcdFxyXG5cdFx0XHR0aW1lcjtcclxuXHJcblx0XHRpZighcHJlbG9hZGVyIHx8ICFwcmVsb2FkZXJQZXJjZW50cykgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSBpbiBlbGVtZW50cykge1xyXG5cdFx0XHRpZih0eXBlb2YgZWxlbWVudHNbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBpbWdVcmwgPSBudWxsO1xyXG5cclxuXHRcdFx0c3dpdGNoIChlbGVtZW50c1tpXS5ub2RlTmFtZSkge1xyXG5cdFx0XHQgIGNhc2UgJ0lNRyc6XHJcblx0XHRcdCAgICBpbWdVcmwgPSBlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cdFx0XHQgICAgYnJlYWs7XHJcblx0XHRcdCAgY2FzZSAnU1ZHJzogY2FzZSAnc3ZnJzpcclxuXHRcdFx0ICAgIHZhciBzdmdVc2UgPSBlbGVtZW50c1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndXNlJyk7XHJcblx0XHRcdCAgICBpZighc3ZnVXNlWzBdKSBicmVhaztcclxuXHRcdFx0ICAgIHZhciB1c2VIcmVmID0gc3ZnVXNlWzBdLmdldEF0dHJpYnV0ZSgneGxpbms6aHJlZicpO1xyXG5cdFx0XHQgICAgdXNlSHJlZiA9IHVzZUhyZWYubWF0Y2goLyguKj8pXFwuc3ZnLyk7XHJcblx0XHRcdCAgICBpbWdVcmwgPSAodXNlSHJlZiAhPT0gbnVsbCA/IHVzZUhyZWZbMF0gOiBudWxsKTtcclxuXHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0XHQgIGRlZmF1bHQ6XHJcblx0XHRcdCAgICBpZighZWxlbWVudHNbaV0ubm9kZU5hbWUpIGJyZWFrO1xyXG5cdFx0XHRcdHZhciBiZ0ltZyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudHNbaV0pLmJhY2tncm91bmRJbWFnZTtcclxuXHRcdFx0XHRpZihiZ0ltZyAhPSAnbm9uZScpIHtcclxuXHRcdFx0XHRcdGJnSW1nID0gYmdJbWcubWF0Y2goL3VybFxcKCguKj8pXFwpLyk7XHJcblx0XHRcdFx0XHRiZ0ltZyA9IChiZ0ltZyAhPT0gbnVsbCA/IGJnSW1nWzFdLnJlcGxhY2UoLygnfFwiKS9nLCcnKSA6IG51bGwpO1xyXG5cdFx0XHRcdFx0aW1nVXJsID0gYmdJbWc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihpbWdVcmwgIT09IG51bGwgJiYgaW1nVXJsICE9ICdub25lJyAmJiBpbWdzLmluZGV4T2YoaW1nVXJsKSA9PSAtMSkgaW1ncy5wdXNoKGltZ1VybCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG90YWxJbWdzID0gaW1ncy5sZW5ndGg7XHJcblxyXG5cdFx0Zm9yKGkgaW4gaW1ncykge1xyXG5cdFx0XHR2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdGltZy5zcmMgPSBpbWdzW2ldO1xyXG5cdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dG90YWxMb2FkZWQrKztcclxuXHRcdFx0ICBcdHNldFBlcmNlbnRzKHRvdGFsTG9hZGVkLCB0b3RhbEltZ3MpO1xyXG5cdFx0XHQgIFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC30LDQs9GA0YPQttC10L3QvicpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRpbWcub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHRvdGFsTG9hZGVkKys7XHJcblx0XHRcdCAgXHRzZXRQZXJjZW50cyh0b3RhbExvYWRlZCwgdG90YWxJbWdzKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbExvYWRlZCwgdG90YWxJbWdzKSB7XHJcblx0XHRcdHZhciBwZXJjZW50cyA9IE1hdGguY2VpbCh0b3RhbExvYWRlZCAvIHRvdGFsSW1ncyAqIDEwMCk7XHJcblxyXG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0cHJlbG9hZGVyUGVyY2VudHMudGV4dENvbnRlbnQgPSBzaG93ZWRQZXJjZW50cztcclxuXHJcblx0XHRcdGlmKHBlcmNlbnRzID49IDEwMCkge1xyXG5cdFx0XHRcdHByZWxvYWRlclBlcmNlbnRzLnRleHRDb250ZW50ID0gc2hvd2VkUGVyY2VudHMgPSAxMDA7XHJcblxyXG5cdFx0XHRcdGlmKHByZWxvYWRlcikge1xyXG5cdFx0XHRcdFx0cHJlbG9hZGVyLmNsYXNzTGlzdC5hZGQoJ3ByZWxvYWRlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uY2xhc3NMaXN0LmFkZCgnX2xvYWRlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHByZWxvYWRlclBlcmNlbnRzLnRleHRDb250ZW50ID0gc2hvd2VkUGVyY2VudHM7XHJcblx0XHRcdFx0XHRzaG93ZWRQZXJjZW50cysrO1xyXG5cclxuXHRcdFx0XHRcdGlmKHNob3dlZFBlcmNlbnRzID49IHBlcmNlbnRzKSB7XHJcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIDEwKTtcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdH0pKClcclxuXHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuLy8gU0xJREVSXHRcclxuXHQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyJyk7XHJcblxyXG5cdFx0aWYgKCFzbGlkZXIubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdFx0ZnVuY3Rpb24gU2xpZGVyKHJvb3QpIHtcclxuXHRcdFx0dGhpcy5zbGlkZXJSb290ID0gcm9vdDtcclxuXHJcblx0XHRcdHRoaXMuc2xpZGVySXRlbXMgPSBbXTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1OdW0gPSAwO1xyXG5cclxuXHRcdFx0dGhpcy5mbGFnID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyID0gZnVuY3Rpb24oaXRlbSwgbmFtZSkge1xyXG5cdFx0XHRcdHZhciBjbGFzc1ByZWZpeCA9ICdzbGlkZXJfX2l0ZW0tJyxcclxuXHRcdFx0XHRcdHZhbHVlO1xyXG5cclxuXHRcdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lKTtcclxuXHJcblx0XHRcdFx0aWYoIXZhbHVlKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc1ByZWZpeCArIG5hbWUpWzBdO1xyXG5cdFx0XHRcdFx0dmFsdWUgPSAodmFsdWUgPyB2YWx1ZS5pbm5lckhUTUwudHJpbSgpIDogbnVsbCk7XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuZ2VuSXRlbXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgaXRlbXMgPSB0aGlzLnNsaWRlclJvb3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19pdGVtJyksXHJcblx0XHRcdFx0XHRpLFxyXG5cdFx0XHRcdFx0c2xpZGVySXRlbTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0XHRmb3IoaSBpbiBpdGVtcykge1xyXG5cdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW1zW2ldICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcblx0XHRcdFx0XHRzbGlkZXJJdGVtID0ge1xyXG5cdFx0XHRcdFx0XHQndGl0bGUnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAndGl0bGUnKSxcclxuXHRcdFx0XHRcdFx0J2Rlc2NyJzogdGhpcy5nZXRWYWx1ZXNJdGVtc0hlbHBlcihpdGVtc1tpXSwgJ2Rlc2NyJyksXHJcblx0XHRcdFx0XHRcdCdpbWcnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAnaW1nJyksXHJcblx0XHRcdFx0XHRcdCdocmVmJzogdGhpcy5nZXRWYWx1ZXNJdGVtc0hlbHBlcihpdGVtc1tpXSwgJ2hyZWYnKSxcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXJJdGVtc1tpXSA9IHNsaWRlckl0ZW07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMudG90YWwgPSB0aGlzLnNsaWRlckl0ZW1zLmxlbmd0aDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuZ2VuSFRNTCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBibG9ja1BpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tQaWNJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja0Fib3V0VW5pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja1VuaXREZXNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0TGlua0hyZWYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcblx0XHRcdFx0XHRibG9ja05hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG5cdFx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG5cdFx0XHRcdFx0aTtcclxuXHJcblx0XHRcdFx0YmxvY2tQaWMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYycpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tQaWMgPSBibG9ja1BpYztcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljQWN0aXZlSXRlbSA9IGJsb2NrUGljLmFwcGVuZENoaWxkKGJsb2NrUGljSXRlbS5jbG9uZU5vZGUoKSk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtJyk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbSA9IGJsb2NrUGljLmFwcGVuZENoaWxkKGJsb2NrUGljSXRlbSk7XHRcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW0nKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHRcdFxyXG5cclxuXHRcdFx0XHRibG9ja0Fib3V0VW5pdC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2Fib3V0LXVuaXQnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRUaXRsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3VuaXQtdGl0bGUnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRUaXRsZUNudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250LmNsYXNzTGlzdC5hZGQoJ3RpdGxlX3dpdGgtbGluZScpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250LmNsYXNzTGlzdC5hZGQoJ3RpdGxlX3dpdGgtbGluZS11cHBlcicpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdERlc2NyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdW5pdC1kZXNjcicpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdExpbmsuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX191bml0LWxpbmsnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5jbGFzc0xpc3QuYWRkKCdidG5fd2l0aC1pY29uJyk7XHJcblx0XHRcdFx0YmxvY2tVbml0TGlua0hyZWYuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5pbm5lckhUTUwgPSAnPHN2ZyBjbGFzcz1cInN2Zy1pY29uIHN2Zy1pY29uX2xpbmtcIiByb2xlPVwiaW1nXCI+PHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiLi9hc3NldHMvaW1nL3Nwcml0ZS5zdmcjbGlua1wiPjwvdXNlPjwvc3ZnPjxzcGFuPtCf0L7RgdC80L7RgtGA0LXRgtGMINGB0LDQudGCPC9zcGFuPic7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZSA9IGJsb2NrQWJvdXRVbml0LmFwcGVuZENoaWxkKGJsb2NrVW5pdFRpdGxlKS5hcHBlbmRDaGlsZChibG9ja1VuaXRUaXRsZUNudCk7XHJcblx0XHRcdFx0YmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0VGl0bGUpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjciA9IGJsb2NrQWJvdXRVbml0LmFwcGVuZENoaWxkKGJsb2NrVW5pdERlc2NyKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rID0gYmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGluaykuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGlua0hyZWYpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tVbml0TGluay5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrTmF2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2Jyk7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bicpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub2ZvbGxvdycpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzbGlkZXJfX25hdi1pY29uXCI+PC9zcGFuPic7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0ID0gYmxvY2tOYXZCdG5QcmV2LmNsb25lTm9kZSgpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuTmV4dC5pbm5lckhUTUwgPSBibG9ja05hdkJ0blByZXYuaW5uZXJIVE1MO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5QcmV2ID0gYmxvY2tOYXYuYXBwZW5kQ2hpbGQoYmxvY2tOYXZCdG5QcmV2KTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuUHJldi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG5fcHJldicpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5OZXh0ID0gYmxvY2tOYXYuYXBwZW5kQ2hpbGQoYmxvY2tOYXZCdG5OZXh0KTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuTmV4dC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG5fbmV4dCcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tOYXZCdG4uYmluZCh7c2xpZGVyOiB0aGlzLCB0eXBlOiAnbmV4dCd9KSk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja05hdkJ0blByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTmF2QnRuLmJpbmQoe3NsaWRlcjogdGhpcywgdHlwZTogJ3ByZXYnfSkpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlclJvb3QuYXBwZW5kQ2hpbGQoYmxvY2tQaWMpO1xyXG5cdFx0XHRcdHRoaXMuc2xpZGVyUm9vdC5hcHBlbmRDaGlsZChibG9ja0Fib3V0VW5pdCk7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXJSb290LmFwcGVuZENoaWxkKGJsb2NrTmF2KTtcdFxyXG5cclxuXHRcdFx0XHR2YXIgJHRoYXQgPSB0aGlzO1xyXG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGxvYWRlZFNsaWRlcyA9IDA7XHJcblxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gbGlzdGVuTG9hZGVkKGxvYWRlZCwgdG90YWwpIHtcclxuXHRcdFx0XHRcdFx0aWYobG9hZGVkID09IHRvdGFsKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgkdGhhdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Zm9yKGkgaW4gJHRoYXQuc2xpZGVySXRlbXMpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNsaWRlckl0ZW0gPSAkdGhhdC5zbGlkZXJJdGVtc1tpXSxcclxuXHRcdFx0XHRcdFx0XHRzbGlkZUltZyA9IG5ldyBJbWFnZSgpLFxyXG5cdFx0XHRcdFx0XHRcdHNsaWRlVGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRzbGlkZVRodW1iLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYicpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcuc3JjID0gc2xpZGVySXRlbS5pbWc7XHJcblx0XHRcdFx0XHRcdHNsaWRlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC30LDQs9GA0YPQttC10L3QviDQsiDRgdC70LDQudC00LXRgCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0bG9hZGVkU2xpZGVzKys7XHJcblx0XHRcdFx0XHRcdFx0XHRsaXN0ZW5Mb2FkZWQobG9hZGVkU2xpZGVzLCAkdGhhdC50b3RhbCk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC90LUg0LfQsNCz0YDRg9C20LXQvdC+INCyINGB0LvQsNC50LTQtdGAJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRsb2FkZWRTbGlkZXMrKztcclxuXHRcdFx0XHRcdFx0XHRcdGxpc3RlbkxvYWRlZChsb2FkZWRTbGlkZXMsICR0aGF0LnRvdGFsKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvY2tOYXZCdG5OZXh0LmFwcGVuZENoaWxkKHNsaWRlVGh1bWIpLmFwcGVuZENoaWxkKHNsaWRlSW1nKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvY2tOYXZCdG5QcmV2LmFwcGVuZENoaWxkKHNsaWRlVGh1bWIuY2xvbmVOb2RlKCkpLmFwcGVuZENoaWxkKHNsaWRlSW1nLmNsb25lTm9kZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGN1cnJlbnROZXcsIHR5cGUpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuY3VycmVudEl0ZW1OdW0sXHJcblx0XHRcdFx0XHRuZXh0ID0gdGhpcy5nZXROZXh0TnVtKGN1cnJlbnQpLFxyXG5cdFx0XHRcdFx0cHJldiA9IHRoaXMuZ2V0UHJldk51bShjdXJyZW50KSxcclxuXHRcdFx0XHRcdG5leHROZXcgPSB0aGlzLmdldE5leHROdW0oY3VycmVudE5ldyksXHJcblx0XHRcdFx0XHRwcmV2TmV3ID0gdGhpcy5nZXRQcmV2TnVtKGN1cnJlbnROZXcpLFxyXG5cdFx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dCA6IHByZXYpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKTtcclxuXHRcdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dCA6IHByZXYpXS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQodHlwZSA9PSAnbmV4dCcgPyAkdGhhdC5ibG9ja05hdkJ0bk5leHQgOiAkdGhhdC5ibG9ja05hdkJ0blByZXYpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYicpWyh0eXBlID09ICduZXh0JyA/IG5leHROZXcgOiBwcmV2TmV3KV0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYtYnRuLXRodW1iX2FjdGl2ZScpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKVswXS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iX3VuYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5zZXRBY3RpdmVJbmZvID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG5cclxuXHRcdFx0XHR2YXIgYWN0aXZlU2xpZGUgPSB0aGlzLnNsaWRlckl0ZW1zW2N1cnJlbnRdO1xyXG5cclxuXHRcdFx0XHRpZihhY3RpdmVTbGlkZS50aXRsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZS5pbm5lckhUTUwgPSBhY3RpdmVTbGlkZS50aXRsZTtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0VGl0bGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0VGl0bGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYWN0aXZlU2xpZGUuZGVzY3IpIHtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3IuaW5uZXJIVE1MID0gYWN0aXZlU2xpZGUuZGVzY3I7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYWN0aXZlU2xpZGUuaHJlZikge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFjdGl2ZVNsaWRlLmhyZWYpO1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLnNldEFjdGl2ZVBpYyA9IGZ1bmN0aW9uKGN1cnJlbnQsIGJsb2NrUGljSXRlbSkge1xyXG5cdFx0XHRcdHZhciBhY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVySXRlbXNbY3VycmVudF0sXHJcblx0XHRcdFx0ICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHRcdGltZy5zcmMgPSBhY3RpdmVTbGlkZS5pbWc7XHJcblxyXG5cdFx0XHRcdFx0aWYoYmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbV9oaWRkZW4nKTtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmFwcGVuZENoaWxkKGltZykucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHJcblx0XHRcdFx0XHRcdGJsb2NrUGljSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1fdmlzaWJsZScpO1x0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJsb2NrUGljSXRlbS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmNsaWNrTmF2QnRuID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0aWYodGhpcy5zbGlkZXIuZmxhZykge1xyXG5cclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuc2xpZGVyLmN1cnJlbnRJdGVtTnVtLFxyXG5cdFx0XHRcdFx0Y3VycmVudE5ldyA9ICh0aGlzLnR5cGUgPT0gJ25leHQnID8gdGhpcy5zbGlkZXIuZ2V0TmV4dE51bShjdXJyZW50KSA6IHRoaXMuc2xpZGVyLmdldFByZXZOdW0oY3VycmVudCkpO1x0XHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuZmxhZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuYW5pbWF0aW9uRG9uZShbXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLmNoYW5nZVNsaWRlKGN1cnJlbnROZXcsICduZXh0JyksXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLmNoYW5nZVNsaWRlKGN1cnJlbnROZXcsICdwcmV2JyksXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLnNldEFjdGl2ZVBpYyhjdXJyZW50TmV3LCB0aGlzLnNsaWRlci5ibG9ja1BpY0FjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdFx0XHR0aGlzLnNsaWRlci5zZXRBY3RpdmVQaWMoY3VycmVudE5ldywgdGhpcy5zbGlkZXIuYmxvY2tQaWNEaXNhY3RpdmVJdGVtKVxyXG5cdFx0XHRcdFx0XSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuc2V0QWN0aXZlSW5mbyhjdXJyZW50TmV3KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5jdXJyZW50SXRlbU51bSA9IGN1cnJlbnROZXc7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmdldE5leHROdW0gPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcblx0XHRcdFx0Y3VycmVudCsrO1xyXG4gICAgICAgICAgICBcdHJldHVybiAoY3VycmVudCA+IHRoaXMudG90YWwgLSAxID8gMCA6IGN1cnJlbnQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5nZXRQcmV2TnVtID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG4gICAgICAgICAgICBcdGN1cnJlbnQtLTtcclxuICAgICAgICAgICAgXHRyZXR1cm4gKGN1cnJlbnQgPCAwID8gdGhpcy50b3RhbCAtIDEgOiBjdXJyZW50KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uRG9uZSA9IGZ1bmN0aW9uKGFycikge1xyXG5cdFx0XHRcdHZhciAkdGhhdCA9IHRoaXM7XHJcblx0XHRcdFx0UHJvbWlzZS5hbGwoYXJyKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuXHRcdFx0XHQgIFx0JHRoYXQuZmxhZyA9IHRydWU7XHJcblx0XHRcdFx0ICBcdGNvbnNvbGUubG9nKCdhaW1hdGlvbiBkb25lJyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5nZW5JdGVtcygpO1xyXG5cclxuXHRcdFx0XHRpZih0aGlzLnNsaWRlckl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHR0aGlzLmdlbkhUTUwoKS50aGVuKGZ1bmN0aW9uKHNsaWRlcikge1xyXG5cclxuXHRcdFx0XHRcdHNsaWRlci5zbGlkZXJSb290LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9sb2FkZWQnKTtcclxuXHJcblx0XHRcdFx0XHRzbGlkZXIuYW5pbWF0aW9uRG9uZShbXHJcblx0XHRcdFx0XHRcdHNsaWRlci5jaGFuZ2VTbGlkZShzbGlkZXIuY3VycmVudEl0ZW1OdW0sICduZXh0JyksXHJcblx0XHRcdFx0XHRcdHNsaWRlci5jaGFuZ2VTbGlkZShzbGlkZXIuY3VycmVudEl0ZW1OdW0sICdwcmV2JyksXHJcblx0XHRcdFx0XHRcdHNsaWRlci5zZXRBY3RpdmVQaWMoc2xpZGVyLmN1cnJlbnRJdGVtTnVtLCBzbGlkZXIuYmxvY2tQaWNBY3RpdmVJdGVtKSxcclxuXHRcdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZVBpYyhzbGlkZXIuY3VycmVudEl0ZW1OdW0sIHNsaWRlci5ibG9ja1BpY0Rpc2FjdGl2ZUl0ZW0pXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XSk7XHJcblxyXG5cdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZUluZm8oc2xpZGVyLmN1cnJlbnRJdGVtTnVtKTtcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygncmVhZHknKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH07XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcih2YXIgaSBpbiBzbGlkZXIpIHtcclxuXHRcdFx0aWYodHlwZW9mICBzbGlkZXJbaV0gIT0gJ29iamVjdCcpIGNvbnRpbnVlO1xyXG5cdFx0XHR2YXIgcyA9IG5ldyBTbGlkZXIoc2xpZGVyW2ldKTtcclxuXHRcdFx0cy5pbml0KCk7XHJcblx0XHR9XHJcblxyXG5cdH0pKClcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
