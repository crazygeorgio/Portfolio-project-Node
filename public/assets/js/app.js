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
        var trigger = document.querySelectorAll('.flipper-trigger'), btnBack = document.getElementsByClassName('flipper-trigger_back')[0], i;
        function turnFlipper(flipId) {
            var flipper = document.querySelector('.flipper[data-flip-id = ' + flipId + ']');
            if (!flipper)
                return false;
            if (flipper.classList.contains('flipper_turned')) {
                flipper.classList.remove('flipper_turned');
                if (btnBack)
                    btnBack.classList.remove('flipper-trigger_hidden');
            } else {
                flipper.classList.add('flipper_turned');
                if (btnBack)
                    btnBack.classList.add('flipper-trigger_hidden');
            }
        }
        for (i in trigger) {
            if (typeof trigger[i].addEventListener !== 'function')
                continue;
            trigger[i].addEventListener('click', function (e) {
                e.preventDefault();
                var flipId = this.getAttribute('data-flip-id');
                turnFlipper(flipId);
            });
        }
        if (window.location.hash.replace('#', '') == 'login') {
            turnFlipper('main');
        }
    }());
});
document.addEventListener('DOMContentLoaded', function () {
    //FORMS	
    var allForms = document.getElementsByTagName('form'), ajaxForms = document.getElementsByClassName('ajax-form'), i, forms = function () {
            var i, minLength = 3, tipClass = 'form__tip', tipClassVisible = 'form__tip_visible', messageClass = 'form__tip-message', messageText = {
                    'required': 'Поле не заполнено',
                    'pattern': 'Значение поля не соответствует формату'
                }, elementClassError = '_error';
            return {
                showTip: function (element, typeErr) {
                    var container = element.type === 'radio' ? element.parentNode.parentNode.parentNode : element.parentNode, tip = container.getElementsByClassName(tipClass)[0], typeMessageClass = messageClass + '_' + typeErr, message;
                    if (!tip) {
                        var tip = document.createElement('span');
                        tip.classList.add(tipClass);
                        container.appendChild(tip);
                    }
                    message = tip.getElementsByClassName(typeMessageClass)[0];
                    if (!message) {
                        message = document.createElement('span');
                        message.classList.add(messageClass);
                        message.classList.add(typeMessageClass);
                        message.innerHTML = messageText[typeErr];
                        tip.appendChild(message);
                    }
                    tip.classList.add(tipClassVisible);
                },
                hideTip: function (element, typeErr) {
                    var container = element.type === 'radio' ? element.parentNode.parentNode.parentNode : element.parentNode, tip = container.getElementsByClassName(tipClass)[0], typeMessageClass = messageClass + '_' + typeErr, message;
                    if (!tip)
                        return;
                    message = tip.getElementsByClassName(typeMessageClass)[0];
                    if (message) {
                        tip.removeChild(message);
                    }
                    if (!tip.getElementsByClassName(messageClass).length) {
                        tip.classList.remove(tipClassVisible);
                    }
                },
                clearOnFocus: function () {
                    this.classList.remove(elementClassError);
                },
                triggerTip: function (element, cond, typeErr) {
                    if (cond) {
                        this.showTip(element, typeErr);
                        return false;
                    } else {
                        this.hideTip(element, typeErr);
                        return true;
                    }
                },
                checkRequired: function (element) {
                    var typeErr = 'required', cond;
                    switch (element.type) {
                    case 'checkbox':
                        cond = element.required && !element.checked;
                        break;
                    case 'radio':
                        cond = element.required && !element.checked;
                        if (!element.required)
                            return true;
                        break;
                    default:
                        cond = element.required && element.value.length < 3;
                        break;
                    }
                    return this.triggerTip(element, cond, typeErr);
                },
                checkPattern: function (element) {
                    if (!element.value)
                        return true;
                    var typeErr = 'pattern', cond = element.pattern && !element.value.match(new RegExp(element.pattern, 'i'));
                    return this.triggerTip(element, cond, typeErr);
                },
                checkValidation: function (element, showStyleErr) {
                    var elementIsValid = true;
                    if (!this.checkRequired(element))
                        elementIsValid = false;
                    if (!this.checkPattern(element))
                        elementIsValid = false;
                    if (showStyleErr) {
                        if (!elementIsValid)
                            element.classList.add(elementClassError);
                        else
                            element.classList.remove(elementClassError);
                    }
                    return elementIsValid;
                },
                validateForm: function (form) {
                    var input = form.getElementsByTagName('input'), textarea = form.getElementsByTagName('textarea'), elements = [], formIsValid = true, $that = this;
                    for (i = 0; i < input.length; i++)
                        elements = elements.concat(input[i]);
                    for (i = 0; i < textarea.length; i++)
                        elements = elements.concat(textarea[i]);
                    for (i = 0; i < elements.length; i++) {
                        var elementValidation = $that.checkValidation(elements[i], true);
                        formIsValid = formIsValid ? elementValidation : formIsValid;
                        elements[i].onkeyup = elements[i].oninput = elements[i].onclick = function () {
                            $that.checkValidation(this);
                        };
                        elements[i].onpropertychange = function (e) {
                            if (e.propertyName == 'value')
                                $that.checkValidation(this);
                        };
                        elements[i].oncut = function () {
                            setTimeout($that.checkValidation(elements[i]), 0);
                        };
                        elements[i].addEventListener('focus', $that.clearOnFocus);
                        elements[i].addEventListener('click', $that.clearOnFocus);
                    }
                    form.addEventListener('reset', function (e) {
                        var tips = form.getElementsByClassName(tipClass);
                        for (i = 0; i < elements.length; i++) {
                            $that.clearOnFocus.bind(elements[i])();
                            elements[i].onkeyup = elements[i].oninput = elements[i].onclick = elements[i].onpropertychange = elements[i].oncut = null;
                        }
                        for (i = tips.length - 1; i >= 0; i--) {
                            tips[i].parentNode.removeChild(tips[i]);
                        }
                    });
                    return formIsValid;
                }
            };
        }();
    for (i = 0; i < allForms.length; i++) {
        allForms[i].noValidate = true;
        allForms[i].onsubmit = function (e) {
            return forms.validateForm(this);
        };
    }
    ;
    for (i = 0; i < ajaxForms.length; i++) {
        ajaxForms[i].onsubmit = function (e) {
            e.preventDefault();
            if (!forms.validateForm(this))
                return;
        };
    }
    ;
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
    if (!document.getElementById('map'))
        return;
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
var preloader = // PRELOADER	
function () {
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
            console.log(bgImg);
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
}();
window.onload = function () {
    preloader;
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cvYmxvZy5qcyIsImZsaXBwZXItdHJpZ2dlci9mbGlwcGVyLXRyaWdnZXIuanMiLCJmb3JtL2Zvcm0uanMiLCJtYXAvbWFwLmpzIiwibmF2L25hdi5qcyIsInBhZ2UvcGFnZV9fZm9vdGVyLmpzIiwicGFnZS9zY3JvbGwuanMiLCJwcmVsb2FkZXIvcHJlbG9hZGVyLmpzIiwic2xpZGVyL3NsaWRlci5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJibG9ja0Jsb2dNZW51IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIkJsb2dNZW51IiwiYmxvY2siLCJibG9nTWVudSIsImJsb2dXcmFwIiwicGFyZW50Tm9kZSIsImJsb2dDb250YWluZXIiLCJtb2JpbGVTdGF0dXMiLCJ0cmlnZ2VyTW9iaWxlTWVudSIsImJ1dHRvbkJsb2dNZW51IiwiJHRoYXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJib2R5IiwiZSIsImVsZW1lbnQiLCJ0YXJnZXQiLCJoaWRlIiwiY29udGFpbnMiLCJwYXJlbnRFbGVtZW50IiwiZml4ZWQiLCJjb250YWluZXIiLCJtZW51Iiwid3JhcCIsIndyYXBQb3MiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250YWluZXJIZWlnaHQiLCJtZW51SGVpZ2h0IiwiZml4ZWRTdGFydCIsImZpeGVkU3RvcCIsInNjcm9sbFRvcCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0IiwiZG9jdW1lbnRFbGVtZW50Iiwib2Zmc2V0SGVpZ2h0IiwidG9wIiwicGFyc2VGbG9hdCIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImNoZWNrQWN0aXZlIiwid2luSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJtZW51SXRlbXNMaW5rcyIsImJsb2dJdGVtSWQiLCJibG9nSXRlbSIsImFjdGl2ZUlkIiwibWluVG9wIiwiY3VycmVudFRvcCIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJtYXRjaCIsImdldEVsZW1lbnRCeUlkIiwiTWF0aCIsImFicyIsInBhdHRlcm4iLCJSZWdFeHAiLCJpbml0IiwiYmluZCIsInRyaWdnZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYnRuQmFjayIsInR1cm5GbGlwcGVyIiwiZmxpcElkIiwiZmxpcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsImxvY2F0aW9uIiwiaGFzaCIsInJlcGxhY2UiLCJhbGxGb3JtcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYWpheEZvcm1zIiwiZm9ybXMiLCJtaW5MZW5ndGgiLCJ0aXBDbGFzcyIsInRpcENsYXNzVmlzaWJsZSIsIm1lc3NhZ2VDbGFzcyIsIm1lc3NhZ2VUZXh0IiwiZWxlbWVudENsYXNzRXJyb3IiLCJzaG93VGlwIiwidHlwZUVyciIsInR5cGUiLCJ0aXAiLCJ0eXBlTWVzc2FnZUNsYXNzIiwibWVzc2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImlubmVySFRNTCIsImhpZGVUaXAiLCJyZW1vdmVDaGlsZCIsImNsZWFyT25Gb2N1cyIsInRyaWdnZXJUaXAiLCJjb25kIiwiY2hlY2tSZXF1aXJlZCIsInJlcXVpcmVkIiwiY2hlY2tlZCIsInZhbHVlIiwiY2hlY2tQYXR0ZXJuIiwiY2hlY2tWYWxpZGF0aW9uIiwic2hvd1N0eWxlRXJyIiwiZWxlbWVudElzVmFsaWQiLCJ2YWxpZGF0ZUZvcm0iLCJmb3JtIiwiaW5wdXQiLCJ0ZXh0YXJlYSIsImVsZW1lbnRzIiwiZm9ybUlzVmFsaWQiLCJjb25jYXQiLCJlbGVtZW50VmFsaWRhdGlvbiIsIm9ua2V5dXAiLCJvbmlucHV0Iiwib25jbGljayIsIm9ucHJvcGVydHljaGFuZ2UiLCJwcm9wZXJ0eU5hbWUiLCJvbmN1dCIsInNldFRpbWVvdXQiLCJ0aXBzIiwibm9WYWxpZGF0ZSIsIm9uc3VibWl0IiwibWFwIiwic3R5bGVNYXAiLCJpbml0TWFwIiwibXlMYXRMbmciLCJsYXQiLCJsbmciLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsIm1hcFR5cGVDb250cm9sIiwicGFuQ29udHJvbCIsInpvb21Db250cm9sIiwiem9vbUNvbnRyb2xPcHRpb25zIiwicG9zaXRpb24iLCJDb250cm9sUG9zaXRpb24iLCJSSUdIVF9DRU5URVIiLCJzdHJlZXRWaWV3Q29udHJvbCIsIm1hcFR5cGVJZCIsIk1hcFR5cGVJZCIsIlJPQURNQVAiLCJzY3JvbGx3aGVlbCIsImRyYWdnYWJsZSIsInN0eWxlcyIsIm1hcmtlciIsIk1hcmtlciIsInRpdGxlIiwic2V0TWFwIiwiYnRuTWVudSIsIm5hdiIsImJsdXIiLCJiZ0ltZyIsImZvcm1CbHVyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsInBvc0xlZnQiLCJsZWZ0IiwicG9zVG9wIiwic3R5bGUiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kU2l6ZSIsImNsaWVudFdpZHRoIiwicGFyYWxsYXgiLCJsZWFmMSIsImxlYWYyIiwibGVhZjMiLCJtb3ZlIiwic3BlZWRTaGlmdCIsInNwZWVkRHJvcCIsInNwZWVkUm90YXRlIiwicGFnZUhlaWdodCIsInNjcm9sbEhlaWdodCIsInRyYW5zZm9ybSIsImJvdHRvbSIsIndlYmtpdFRyYW5zZm9ybSIsIm1velRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwib1RyYW5zZm9ybSIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNjcm9sbFRvWSIsInNjcm9sbFRhcmdldFkiLCJzcGVlZCIsImVhc2luZyIsInNjcm9sbFkiLCJjdXJyZW50VGltZSIsInRpbWUiLCJtYXgiLCJtaW4iLCJQSV9EMiIsIlBJIiwiZWFzaW5nRXF1YXRpb25zIiwiZWFzZU91dFNpbmUiLCJwb3MiLCJzaW4iLCJlYXNlSW5PdXRTaW5lIiwiY29zIiwiZWFzZUluT3V0UXVpbnQiLCJwb3ciLCJ0aWNrIiwicCIsInQiLCJzY3JvbGxUbyIsImxpbmsiLCJnZXRFbGVtZW50U2Nyb2xsUG9zaXRpb24iLCJlbGVtZW50SWQiLCJocmVmIiwiZWxlbWVudE9mUGFnZSIsInN0YXJ0IiwicHJlbG9hZGVyIiwiaW1ncyIsInRvdGFsSW1ncyIsInRvdGFsTG9hZGVkIiwic2hvd2VkUGVyY2VudHMiLCJwcmVsb2FkZXJQZXJjZW50cyIsInRpbWVyIiwiaW1nVXJsIiwibm9kZU5hbWUiLCJzdmdVc2UiLCJ1c2VIcmVmIiwiYmFja2dyb3VuZEltYWdlIiwiY29uc29sZSIsImxvZyIsInB1c2giLCJpbWciLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsInNldFBlcmNlbnRzIiwib25lcnJvciIsInBlcmNlbnRzIiwiY2VpbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0Q29udGVudCIsInNldEludGVydmFsIiwic2xpZGVyIiwiU2xpZGVyIiwicm9vdCIsInNsaWRlclJvb3QiLCJzbGlkZXJJdGVtcyIsImN1cnJlbnRJdGVtTnVtIiwiZmxhZyIsImdldFZhbHVlc0l0ZW1zSGVscGVyIiwiaXRlbSIsIm5hbWUiLCJjbGFzc1ByZWZpeCIsInRyaW0iLCJnZW5JdGVtcyIsIml0ZW1zIiwic2xpZGVySXRlbSIsInRvdGFsIiwiZ2VuSFRNTCIsImJsb2NrUGljIiwiYmxvY2tQaWNJdGVtIiwiYmxvY2tBYm91dFVuaXQiLCJibG9ja1VuaXRUaXRsZSIsImJsb2NrVW5pdFRpdGxlQ250IiwiYmxvY2tVbml0RGVzY3IiLCJibG9ja1VuaXRMaW5rIiwiYmxvY2tVbml0TGlua0hyZWYiLCJibG9ja05hdiIsImJsb2NrTmF2QnRuUHJldiIsImJsb2NrTmF2QnRuTmV4dCIsImJsb2NrUGljQWN0aXZlSXRlbSIsImNsb25lTm9kZSIsImJsb2NrUGljRGlzYWN0aXZlSXRlbSIsInNldEF0dHJpYnV0ZSIsImRpc3BsYXkiLCJjbGlja05hdkJ0biIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZGVkU2xpZGVzIiwibGlzdGVuTG9hZGVkIiwibG9hZGVkIiwic2xpZGVJbWciLCJzbGlkZVRodW1iIiwiY2hhbmdlU2xpZGUiLCJjdXJyZW50TmV3IiwiY3VycmVudCIsIm5leHQiLCJnZXROZXh0TnVtIiwicHJldiIsImdldFByZXZOdW0iLCJuZXh0TmV3IiwicHJldk5ldyIsInNldEFjdGl2ZUluZm8iLCJhY3RpdmVTbGlkZSIsImRlc2NyIiwic2V0QWN0aXZlUGljIiwiYW5pbWF0aW9uRG9uZSIsImFyciIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwicyJdLCJtYXBwaW5ncyI6IjtBQUFBQSxRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQSxDQUFBLFlBQUE7QUFBQSxRQUVBLElBQUFDLGFBQUEsR0FBQUYsUUFBQSxDQUFBRyxzQkFBQSxDQUFBLGdCQUFBLEVBQUEsQ0FBQSxDQUFBLENBRkE7QUFBQSxRQUlBLElBQUEsQ0FBQUQsYUFBQTtBQUFBLFlBQUEsT0FKQTtBQUFBLFFBTUEsSUFBQUUsUUFBQSxHQUFBLFVBQUFDLEtBQUEsRUFBQTtBQUFBLFlBRUEsS0FBQUMsUUFBQSxHQUFBRCxLQUFBLENBRkE7QUFBQSxZQUlBLEtBQUFFLFFBQUEsR0FBQUYsS0FBQSxDQUFBRyxVQUFBLENBSkE7QUFBQSxZQU1BLEtBQUFDLGFBQUEsR0FBQUosS0FBQSxDQUFBRyxVQUFBLENBQUFBLFVBQUEsQ0FOQTtBQUFBLFlBUUEsS0FBQUUsWUFBQSxHQUFBLEtBQUEsQ0FSQTtBQUFBLFlBVUEsS0FBQUMsaUJBQUEsR0FBQSxZQUFBO0FBQUEsZ0JBRUEsSUFBQUMsY0FBQSxHQUFBWixRQUFBLENBQUFHLHNCQUFBLENBQUEsa0JBQUEsRUFBQSxDQUFBLENBQUEsRUFDQVUsS0FBQSxHQUFBLElBREEsQ0FGQTtBQUFBLGdCQUtBLElBQUEsQ0FBQUQsY0FBQTtBQUFBLG9CQUFBLE9BTEE7QUFBQSxnQkFPQUEsY0FBQSxDQUFBWCxnQkFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO0FBQUEsb0JBRUFZLEtBQUEsQ0FBQUgsWUFBQSxHQUFBLENBQUFHLEtBQUEsQ0FBQUgsWUFBQSxDQUZBO0FBQUEsb0JBR0EsSUFBQUcsS0FBQSxDQUFBSCxZQUFBLEVBQUE7QUFBQSx3QkFDQUUsY0FBQSxDQUFBRSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQURBO0FBQUEsd0JBRUFGLEtBQUEsQ0FBQU4sUUFBQSxDQUFBTyxTQUFBLENBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQUZBO0FBQUEscUJBQUEsTUFHQTtBQUFBLHdCQUNBSCxjQUFBLENBQUFFLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLG1CQUFBLEVBREE7QUFBQSx3QkFFQUgsS0FBQSxDQUFBTixRQUFBLENBQUFPLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLG1CQUFBLEVBRkE7QUFBQSxxQkFOQTtBQUFBLGlCQUFBLEVBUEE7QUFBQSxnQkFvQkFoQixRQUFBLENBQUFpQixJQUFBLENBQUFoQixnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBaUIsQ0FBQSxFQUFBO0FBQUEsb0JBRUEsSUFBQSxDQUFBTCxLQUFBLENBQUFILFlBQUE7QUFBQSx3QkFBQSxPQUZBO0FBQUEsb0JBR0EsSUFBQVMsT0FBQSxHQUFBRCxDQUFBLENBQUFFLE1BQUEsRUFDQUMsSUFBQSxHQUFBLElBREEsQ0FIQTtBQUFBLG9CQU1BLE9BQUFGLE9BQUEsRUFBQTtBQUFBLHdCQUNBLElBQUFBLE9BQUEsQ0FBQUwsU0FBQSxDQUFBUSxRQUFBLENBQUEsbUJBQUEsQ0FBQSxFQUFBO0FBQUEsNEJBQ0FELElBQUEsR0FBQSxLQUFBLENBREE7QUFBQSw0QkFFQSxNQUZBO0FBQUEseUJBQUE7QUFBQSw0QkFHQUYsT0FBQSxHQUFBQSxPQUFBLENBQUFJLGFBQUEsQ0FKQTtBQUFBLHFCQU5BO0FBQUEsb0JBYUEsSUFBQUYsSUFBQSxFQUFBO0FBQUEsd0JBQ0FSLEtBQUEsQ0FBQUgsWUFBQSxHQUFBLENBQUFHLEtBQUEsQ0FBQUgsWUFBQSxDQURBO0FBQUEsd0JBRUFFLGNBQUEsQ0FBQUUsU0FBQSxDQUFBRSxNQUFBLENBQUEsbUJBQUEsRUFGQTtBQUFBLHdCQUdBSCxLQUFBLENBQUFOLFFBQUEsQ0FBQU8sU0FBQSxDQUFBRSxNQUFBLENBQUEsbUJBQUEsRUFIQTtBQUFBLHFCQWJBO0FBQUEsaUJBQUEsRUFwQkE7QUFBQSxhQUFBLENBVkE7QUFBQSxZQXVEQSxLQUFBUSxLQUFBLEdBQUEsU0FBQUEsS0FBQSxDQUFBTixDQUFBLEVBQUE7QUFBQSxnQkFFQSxJQUFBTyxTQUFBLEdBQUEsS0FBQWhCLGFBQUEsRUFDQWlCLElBQUEsR0FBQSxLQUFBcEIsUUFEQSxFQUVBcUIsSUFBQSxHQUFBLEtBQUFwQixRQUZBLEVBR0FxQixPQUFBLEdBQUFELElBQUEsQ0FBQUUscUJBQUEsRUFIQSxFQUlBQyxlQUpBLEVBS0FDLFVBTEEsRUFNQUMsVUFOQSxFQU9BQyxTQVBBLEVBUUFDLFNBQUEsR0FBQUMsTUFBQSxDQUFBQyxXQUFBLElBQUFwQyxRQUFBLENBQUFxQyxlQUFBLENBQUFILFNBUkEsQ0FGQTtBQUFBLGdCQVlBSCxVQUFBLEdBQUFMLElBQUEsQ0FBQVksWUFBQSxDQVpBO0FBQUEsZ0JBYUFSLGVBQUEsR0FBQUwsU0FBQSxDQUFBYSxZQUFBLENBYkE7QUFBQSxnQkFjQU4sVUFBQSxHQUFBRSxTQUFBLEdBQUFOLE9BQUEsQ0FBQVcsR0FBQSxDQWRBO0FBQUEsZ0JBZUFOLFNBQUEsR0FBQUQsVUFBQSxHQUFBRixlQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBUyxVQUFBLENBQUFDLGdCQUFBLENBQUFoQixTQUFBLEVBQUFpQixVQUFBLENBQUEsR0FBQUYsVUFBQSxDQUFBQyxnQkFBQSxDQUFBaEIsU0FBQSxFQUFBa0IsYUFBQSxDQUFBLENBQUEsQ0FmQTtBQUFBLGdCQWlCQSxJQUFBVCxTQUFBLElBQUFGLFVBQUEsRUFBQTtBQUFBLG9CQUNBTixJQUFBLENBQUFaLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLHNCQUFBLEVBREE7QUFBQSxpQkFqQkE7QUFBQSxnQkFxQkEsSUFBQWtCLFNBQUEsR0FBQUYsVUFBQSxFQUFBO0FBQUEsb0JBQ0FOLElBQUEsQ0FBQVosU0FBQSxDQUFBRSxNQUFBLENBQUEsQ0FBQVksT0FBQSxDQUFBVyxHQUFBLEdBQUFOLFNBQUEsR0FBQUQsVUFBQSxHQUFBLDBCQUFBLEdBQUEsc0JBQUEsRUFEQTtBQUFBLG9CQUVBTixJQUFBLENBQUFaLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLENBQUFhLE9BQUEsQ0FBQVcsR0FBQSxHQUFBTixTQUFBLEdBQUFELFVBQUEsR0FBQSxzQkFBQSxHQUFBLDBCQUFBLEVBRkE7QUFBQSxpQkFyQkE7QUFBQSxhQUFBLENBdkRBO0FBQUEsWUFtRkEsS0FBQVksV0FBQSxHQUFBLFlBQUE7QUFBQSxnQkFFQSxJQUFBQyxTQUFBLEdBQUFWLE1BQUEsQ0FBQVcsV0FBQSxJQUFBOUMsUUFBQSxDQUFBcUMsZUFBQSxDQUFBVSxZQUFBLElBQUEvQyxRQUFBLENBQUFpQixJQUFBLENBQUE4QixZQUFBLEVBQ0FDLGNBQUEsR0FBQSxLQUFBMUMsUUFBQSxDQUFBSCxzQkFBQSxDQUFBLG9CQUFBLENBREEsRUFFQThDLFVBRkEsRUFHQUMsUUFIQSxFQUlBQyxRQUpBLEVBS0FDLE1BTEEsRUFNQUMsVUFOQSxFQU9BQyxDQVBBLENBRkE7QUFBQSxnQkFXQSxJQUFBTixjQUFBLENBQUFPLE1BQUEsSUFBQSxDQUFBO0FBQUEsb0JBQUEsT0FYQTtBQUFBLGdCQWFBLEtBQUFELENBQUEsSUFBQU4sY0FBQSxFQUFBO0FBQUEsb0JBRUEsSUFBQSxPQUFBQSxjQUFBLENBQUFNLENBQUEsQ0FBQSxLQUFBLFFBQUE7QUFBQSx3QkFBQSxTQUZBO0FBQUEsb0JBSUFMLFVBQUEsR0FBQUQsY0FBQSxDQUFBTSxDQUFBLEVBQUFFLFlBQUEsQ0FBQSxNQUFBLEVBQUFDLEtBQUEsQ0FBQSxRQUFBLEVBQUEsQ0FBQSxDQUFBLENBSkE7QUFBQSxvQkFLQVAsUUFBQSxHQUFBbEQsUUFBQSxDQUFBMEQsY0FBQSxDQUFBVCxVQUFBLENBQUEsQ0FMQTtBQUFBLG9CQU9BLElBQUEsQ0FBQUMsUUFBQTtBQUFBLHdCQUFBLFNBUEE7QUFBQSxvQkFTQUcsVUFBQSxHQUFBTSxJQUFBLENBQUFDLEdBQUEsQ0FBQVYsUUFBQSxDQUFBckIscUJBQUEsR0FBQVUsR0FBQSxDQUFBLENBVEE7QUFBQSxvQkFXQSxJQUFBLE9BQUFhLE1BQUEsS0FBQSxXQUFBLEVBQUE7QUFBQSx3QkFDQUEsTUFBQSxHQUFBQyxVQUFBLENBREE7QUFBQSx3QkFFQUYsUUFBQSxHQUFBRixVQUFBLENBRkE7QUFBQSx3QkFHQSxTQUhBO0FBQUEscUJBWEE7QUFBQSxvQkFpQkEsSUFBQUksVUFBQSxHQUFBRCxNQUFBLEVBQUE7QUFBQSx3QkFDQUEsTUFBQSxHQUFBQyxVQUFBLENBREE7QUFBQSx3QkFFQUYsUUFBQSxHQUFBRixVQUFBLENBRkE7QUFBQSxxQkFqQkE7QUFBQSxpQkFiQTtBQUFBLGdCQXFDQSxJQUFBRSxRQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBVSxPQUFBLEdBQUEsSUFBQUMsTUFBQSxDQUFBLE1BQUFYLFFBQUEsR0FBQSxHQUFBLEVBQUEsR0FBQSxDQUFBLENBREE7QUFBQSxvQkFFQSxLQUFBRyxDQUFBLElBQUFOLGNBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUEsT0FBQUEsY0FBQSxDQUFBTSxDQUFBLENBQUEsS0FBQSxRQUFBO0FBQUEsNEJBQUEsU0FEQTtBQUFBLHdCQUVBTixjQUFBLENBQUFNLENBQUEsRUFBQXhDLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLDJCQUFBLEVBRkE7QUFBQSx3QkFJQSxJQUFBZ0MsY0FBQSxDQUFBTSxDQUFBLEVBQUFFLFlBQUEsQ0FBQSxNQUFBLEVBQUFDLEtBQUEsQ0FBQUksT0FBQSxDQUFBLEVBQUE7QUFBQSw0QkFDQWIsY0FBQSxDQUFBTSxDQUFBLEVBQUF4QyxTQUFBLENBQUFDLEdBQUEsQ0FBQSwyQkFBQSxFQURBO0FBQUEseUJBSkE7QUFBQSxxQkFGQTtBQUFBLGlCQXJDQTtBQUFBLGFBQUEsQ0FuRkE7QUFBQSxZQXNJQSxLQUFBZ0QsSUFBQSxHQUFBLFlBQUE7QUFBQSxnQkFFQSxLQUFBbkIsV0FBQSxHQUZBO0FBQUEsZ0JBR0EsS0FBQWpDLGlCQUFBLEdBSEE7QUFBQSxnQkFJQXdCLE1BQUEsQ0FBQWxDLGdCQUFBLENBQUEsUUFBQSxFQUFBLEtBQUF1QixLQUFBLENBQUF3QyxJQUFBLENBQUE7QUFBQSxvQkFBQSxpQkFBQSxLQUFBdkQsYUFBQTtBQUFBLG9CQUFBLFlBQUEsS0FBQUgsUUFBQTtBQUFBLG9CQUFBLFlBQUEsS0FBQUMsUUFBQTtBQUFBLGlCQUFBLENBQUEsRUFKQTtBQUFBLGdCQUtBNEIsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQXVCLEtBQUEsQ0FBQXdDLElBQUEsQ0FBQTtBQUFBLG9CQUFBLGlCQUFBLEtBQUF2RCxhQUFBO0FBQUEsb0JBQUEsWUFBQSxLQUFBSCxRQUFBO0FBQUEsb0JBQUEsWUFBQSxLQUFBQyxRQUFBO0FBQUEsaUJBQUEsQ0FBQSxFQUxBO0FBQUEsZ0JBTUE0QixNQUFBLENBQUFsQyxnQkFBQSxDQUFBLFFBQUEsRUFBQSxLQUFBMkMsV0FBQSxDQUFBb0IsSUFBQSxDQUFBLEVBQUEsWUFBQSxLQUFBMUQsUUFBQSxFQUFBLENBQUEsRUFOQTtBQUFBLGdCQU9BNkIsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQTJDLFdBQUEsQ0FBQW9CLElBQUEsQ0FBQSxFQUFBLFlBQUEsS0FBQTFELFFBQUEsRUFBQSxDQUFBLEVBUEE7QUFBQSxhQUFBLENBdElBO0FBQUEsU0FBQSxDQU5BO0FBQUEsUUF3SkEsSUFBQW9CLElBQUEsR0FBQSxJQUFBdEIsUUFBQSxDQUFBRixhQUFBLENBQUEsQ0F4SkE7QUFBQSxRQXlKQXdCLElBQUEsQ0FBQXFDLElBQUEsR0F6SkE7QUFBQSxLQUFBLElBRkE7QUFBQSxDQUFBLEU7QUN5QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEvRCxRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQSxDQUFBLFlBQUE7QUFBQSxRQUNBLElBQUFnRSxPQUFBLEdBQUFqRSxRQUFBLENBQUFrRSxnQkFBQSxDQUFBLGtCQUFBLENBQUEsRUFDQUMsT0FBQSxHQUFBbkUsUUFBQSxDQUFBRyxzQkFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxDQURBLEVBRUFtRCxDQUZBLENBREE7QUFBQSxRQUtBLFNBQUFjLFdBQUEsQ0FBQUMsTUFBQSxFQUFBO0FBQUEsWUFFQSxJQUFBQyxPQUFBLEdBQUF0RSxRQUFBLENBQUF1RSxhQUFBLENBQUEsNkJBQUFGLE1BQUEsR0FBQSxHQUFBLENBQUEsQ0FGQTtBQUFBLFlBR0EsSUFBQSxDQUFBQyxPQUFBO0FBQUEsZ0JBQUEsT0FBQSxLQUFBLENBSEE7QUFBQSxZQUtBLElBQUFBLE9BQUEsQ0FBQXhELFNBQUEsQ0FBQVEsUUFBQSxDQUFBLGdCQUFBLENBQUEsRUFBQTtBQUFBLGdCQUNBZ0QsT0FBQSxDQUFBeEQsU0FBQSxDQUFBRSxNQUFBLENBQUEsZ0JBQUEsRUFEQTtBQUFBLGdCQUVBLElBQUFtRCxPQUFBO0FBQUEsb0JBQUFBLE9BQUEsQ0FBQXJELFNBQUEsQ0FBQUUsTUFBQSxDQUFBLHdCQUFBLEVBRkE7QUFBQSxhQUFBLE1BR0E7QUFBQSxnQkFDQXNELE9BQUEsQ0FBQXhELFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGdCQUFBLEVBREE7QUFBQSxnQkFFQSxJQUFBb0QsT0FBQTtBQUFBLG9CQUFBQSxPQUFBLENBQUFyRCxTQUFBLENBQUFDLEdBQUEsQ0FBQSx3QkFBQSxFQUZBO0FBQUEsYUFSQTtBQUFBLFNBTEE7QUFBQSxRQW9CQSxLQUFBdUMsQ0FBQSxJQUFBVyxPQUFBLEVBQUE7QUFBQSxZQUVBLElBQUEsT0FBQUEsT0FBQSxDQUFBWCxDQUFBLEVBQUFyRCxnQkFBQSxLQUFBLFVBQUE7QUFBQSxnQkFBQSxTQUZBO0FBQUEsWUFJQWdFLE9BQUEsQ0FBQVgsQ0FBQSxFQUFBckQsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsVUFBQWlCLENBQUEsRUFBQTtBQUFBLGdCQUVBQSxDQUFBLENBQUFzRCxjQUFBLEdBRkE7QUFBQSxnQkFHQSxJQUFBSCxNQUFBLEdBQUEsS0FBQWIsWUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUhBO0FBQUEsZ0JBSUFZLFdBQUEsQ0FBQUMsTUFBQSxFQUpBO0FBQUEsYUFBQSxFQUpBO0FBQUEsU0FwQkE7QUFBQSxRQWtDQSxJQUFBbEMsTUFBQSxDQUFBc0MsUUFBQSxDQUFBQyxJQUFBLENBQUFDLE9BQUEsQ0FBQSxHQUFBLEVBQUEsRUFBQSxLQUFBLE9BQUEsRUFBQTtBQUFBLFlBQ0FQLFdBQUEsQ0FBQSxNQUFBLEVBREE7QUFBQSxTQWxDQTtBQUFBLEtBQUEsSUFGQTtBQUFBLENBQUEsRTtBQ3pCQXBFLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFBQSxJQUdBO0FBQUEsUUFBQTJFLFFBQUEsR0FBQTVFLFFBQUEsQ0FBQTZFLG9CQUFBLENBQUEsTUFBQSxDQUFBLEVBQ0FDLFNBQUEsR0FBQTlFLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSxXQUFBLENBREEsRUFFQW1ELENBRkEsRUFHQXlCLEtBQUEsR0FBQSxZQUFBO0FBQUEsWUFFQSxJQUFBekIsQ0FBQSxFQUNBMEIsU0FBQSxHQUFBLENBREEsRUFFQUMsUUFBQSxHQUFBLFdBRkEsRUFHQUMsZUFBQSxHQUFBLG1CQUhBLEVBSUFDLFlBQUEsR0FBQSxtQkFKQSxFQUtBQyxXQUFBLEdBQUE7QUFBQSxvQkFDQSxZQUFBLG1CQURBO0FBQUEsb0JBRUEsV0FBQSx3Q0FGQTtBQUFBLGlCQUxBLEVBU0FDLGlCQUFBLEdBQUEsUUFUQSxDQUZBO0FBQUEsWUFhQSxPQUFBO0FBQUEsZ0JBRUFDLE9BQUEsRUFBQSxVQUFBbkUsT0FBQSxFQUFBb0UsT0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQTlELFNBQUEsR0FBQU4sT0FBQSxDQUFBcUUsSUFBQSxLQUFBLE9BQUEsR0FBQXJFLE9BQUEsQ0FBQVgsVUFBQSxDQUFBQSxVQUFBLENBQUFBLFVBQUEsR0FBQVcsT0FBQSxDQUFBWCxVQUFBLEVBQ0FpRixHQUFBLEdBQUFoRSxTQUFBLENBQUF0QixzQkFBQSxDQUFBOEUsUUFBQSxFQUFBLENBQUEsQ0FEQSxFQUVBUyxnQkFBQSxHQUFBUCxZQUFBLEdBQUEsR0FBQSxHQUFBSSxPQUZBLEVBR0FJLE9BSEEsQ0FEQTtBQUFBLG9CQU1BLElBQUEsQ0FBQUYsR0FBQSxFQUFBO0FBQUEsd0JBQ0EsSUFBQUEsR0FBQSxHQUFBekYsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLE1BQUEsQ0FBQSxDQURBO0FBQUEsd0JBRUFILEdBQUEsQ0FBQTNFLFNBQUEsQ0FBQUMsR0FBQSxDQUFBa0UsUUFBQSxFQUZBO0FBQUEsd0JBR0F4RCxTQUFBLENBQUFvRSxXQUFBLENBQUFKLEdBQUEsRUFIQTtBQUFBLHFCQU5BO0FBQUEsb0JBWUFFLE9BQUEsR0FBQUYsR0FBQSxDQUFBdEYsc0JBQUEsQ0FBQXVGLGdCQUFBLEVBQUEsQ0FBQSxDQUFBLENBWkE7QUFBQSxvQkFjQSxJQUFBLENBQUFDLE9BQUEsRUFBQTtBQUFBLHdCQUNBQSxPQUFBLEdBQUEzRixRQUFBLENBQUE0RixhQUFBLENBQUEsTUFBQSxDQUFBLENBREE7QUFBQSx3QkFFQUQsT0FBQSxDQUFBN0UsU0FBQSxDQUFBQyxHQUFBLENBQUFvRSxZQUFBLEVBRkE7QUFBQSx3QkFHQVEsT0FBQSxDQUFBN0UsU0FBQSxDQUFBQyxHQUFBLENBQUEyRSxnQkFBQSxFQUhBO0FBQUEsd0JBSUFDLE9BQUEsQ0FBQUcsU0FBQSxHQUFBVixXQUFBLENBQUFHLE9BQUEsQ0FBQSxDQUpBO0FBQUEsd0JBTUFFLEdBQUEsQ0FBQUksV0FBQSxDQUFBRixPQUFBLEVBTkE7QUFBQSxxQkFkQTtBQUFBLG9CQXVCQUYsR0FBQSxDQUFBM0UsU0FBQSxDQUFBQyxHQUFBLENBQUFtRSxlQUFBLEVBdkJBO0FBQUEsaUJBRkE7QUFBQSxnQkE0QkFhLE9BQUEsRUFBQSxVQUFBNUUsT0FBQSxFQUFBb0UsT0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQTlELFNBQUEsR0FBQU4sT0FBQSxDQUFBcUUsSUFBQSxLQUFBLE9BQUEsR0FBQXJFLE9BQUEsQ0FBQVgsVUFBQSxDQUFBQSxVQUFBLENBQUFBLFVBQUEsR0FBQVcsT0FBQSxDQUFBWCxVQUFBLEVBQ0FpRixHQUFBLEdBQUFoRSxTQUFBLENBQUF0QixzQkFBQSxDQUFBOEUsUUFBQSxFQUFBLENBQUEsQ0FEQSxFQUVBUyxnQkFBQSxHQUFBUCxZQUFBLEdBQUEsR0FBQSxHQUFBSSxPQUZBLEVBR0FJLE9BSEEsQ0FEQTtBQUFBLG9CQU1BLElBQUEsQ0FBQUYsR0FBQTtBQUFBLHdCQUFBLE9BTkE7QUFBQSxvQkFRQUUsT0FBQSxHQUFBRixHQUFBLENBQUF0RixzQkFBQSxDQUFBdUYsZ0JBQUEsRUFBQSxDQUFBLENBQUEsQ0FSQTtBQUFBLG9CQVVBLElBQUFDLE9BQUEsRUFBQTtBQUFBLHdCQUNBRixHQUFBLENBQUFPLFdBQUEsQ0FBQUwsT0FBQSxFQURBO0FBQUEscUJBVkE7QUFBQSxvQkFjQSxJQUFBLENBQUFGLEdBQUEsQ0FBQXRGLHNCQUFBLENBQUFnRixZQUFBLEVBQUE1QixNQUFBLEVBQUE7QUFBQSx3QkFDQWtDLEdBQUEsQ0FBQTNFLFNBQUEsQ0FBQUUsTUFBQSxDQUFBa0UsZUFBQSxFQURBO0FBQUEscUJBZEE7QUFBQSxpQkE1QkE7QUFBQSxnQkErQ0FlLFlBQUEsRUFBQSxZQUFBO0FBQUEsb0JBQ0EsS0FBQW5GLFNBQUEsQ0FBQUUsTUFBQSxDQUFBcUUsaUJBQUEsRUFEQTtBQUFBLGlCQS9DQTtBQUFBLGdCQW1EQWEsVUFBQSxFQUFBLFVBQUEvRSxPQUFBLEVBQUFnRixJQUFBLEVBQUFaLE9BQUEsRUFBQTtBQUFBLG9CQUNBLElBQUFZLElBQUEsRUFBQTtBQUFBLHdCQUNBLEtBQUFiLE9BQUEsQ0FBQW5FLE9BQUEsRUFBQW9FLE9BQUEsRUFEQTtBQUFBLHdCQUVBLE9BQUEsS0FBQSxDQUZBO0FBQUEscUJBQUEsTUFHQTtBQUFBLHdCQUNBLEtBQUFRLE9BQUEsQ0FBQTVFLE9BQUEsRUFBQW9FLE9BQUEsRUFEQTtBQUFBLHdCQUVBLE9BQUEsSUFBQSxDQUZBO0FBQUEscUJBSkE7QUFBQSxpQkFuREE7QUFBQSxnQkE2REFhLGFBQUEsRUFBQSxVQUFBakYsT0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQW9FLE9BQUEsR0FBQSxVQUFBLEVBQ0FZLElBREEsQ0FEQTtBQUFBLG9CQUlBLFFBQUFoRixPQUFBLENBQUFxRSxJQUFBO0FBQUEsb0JBQ0EsS0FBQSxVQUFBO0FBQUEsd0JBQ0FXLElBQUEsR0FBQWhGLE9BQUEsQ0FBQWtGLFFBQUEsSUFBQSxDQUFBbEYsT0FBQSxDQUFBbUYsT0FBQSxDQURBO0FBQUEsd0JBRUEsTUFIQTtBQUFBLG9CQUlBLEtBQUEsT0FBQTtBQUFBLHdCQUNBSCxJQUFBLEdBQUFoRixPQUFBLENBQUFrRixRQUFBLElBQUEsQ0FBQWxGLE9BQUEsQ0FBQW1GLE9BQUEsQ0FEQTtBQUFBLHdCQUVBLElBQUEsQ0FBQW5GLE9BQUEsQ0FBQWtGLFFBQUE7QUFBQSw0QkFBQSxPQUFBLElBQUEsQ0FGQTtBQUFBLHdCQUdBLE1BUEE7QUFBQSxvQkFRQTtBQUFBLHdCQUNBRixJQUFBLEdBQUFoRixPQUFBLENBQUFrRixRQUFBLElBQUFsRixPQUFBLENBQUFvRixLQUFBLENBQUFoRCxNQUFBLEdBQUEsQ0FBQSxDQURBO0FBQUEsd0JBRUEsTUFWQTtBQUFBLHFCQUpBO0FBQUEsb0JBaUJBLE9BQUEsS0FBQTJDLFVBQUEsQ0FBQS9FLE9BQUEsRUFBQWdGLElBQUEsRUFBQVosT0FBQSxDQUFBLENBakJBO0FBQUEsaUJBN0RBO0FBQUEsZ0JBaUZBaUIsWUFBQSxFQUFBLFVBQUFyRixPQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBLENBQUFBLE9BQUEsQ0FBQW9GLEtBQUE7QUFBQSx3QkFBQSxPQUFBLElBQUEsQ0FEQTtBQUFBLG9CQUdBLElBQUFoQixPQUFBLEdBQUEsU0FBQSxFQUNBWSxJQUFBLEdBQUFoRixPQUFBLENBQUEwQyxPQUFBLElBQUEsQ0FBQTFDLE9BQUEsQ0FBQW9GLEtBQUEsQ0FBQTlDLEtBQUEsQ0FBQSxJQUFBSyxNQUFBLENBQUEzQyxPQUFBLENBQUEwQyxPQUFBLEVBQUEsR0FBQSxDQUFBLENBREEsQ0FIQTtBQUFBLG9CQU1BLE9BQUEsS0FBQXFDLFVBQUEsQ0FBQS9FLE9BQUEsRUFBQWdGLElBQUEsRUFBQVosT0FBQSxDQUFBLENBTkE7QUFBQSxpQkFqRkE7QUFBQSxnQkEwRkFrQixlQUFBLEVBQUEsVUFBQXRGLE9BQUEsRUFBQXVGLFlBQUEsRUFBQTtBQUFBLG9CQUNBLElBQUFDLGNBQUEsR0FBQSxJQUFBLENBREE7QUFBQSxvQkFFQSxJQUFBLENBQUEsS0FBQVAsYUFBQSxDQUFBakYsT0FBQSxDQUFBO0FBQUEsd0JBQUF3RixjQUFBLEdBQUEsS0FBQSxDQUZBO0FBQUEsb0JBR0EsSUFBQSxDQUFBLEtBQUFILFlBQUEsQ0FBQXJGLE9BQUEsQ0FBQTtBQUFBLHdCQUFBd0YsY0FBQSxHQUFBLEtBQUEsQ0FIQTtBQUFBLG9CQUtBLElBQUFELFlBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUEsQ0FBQUMsY0FBQTtBQUFBLDRCQUFBeEYsT0FBQSxDQUFBTCxTQUFBLENBQUFDLEdBQUEsQ0FBQXNFLGlCQUFBLEVBQUE7QUFBQTtBQUFBLDRCQUNBbEUsT0FBQSxDQUFBTCxTQUFBLENBQUFFLE1BQUEsQ0FBQXFFLGlCQUFBLEVBRkE7QUFBQSxxQkFMQTtBQUFBLG9CQVVBLE9BQUFzQixjQUFBLENBVkE7QUFBQSxpQkExRkE7QUFBQSxnQkF1R0FDLFlBQUEsRUFBQSxVQUFBQyxJQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBQyxLQUFBLEdBQUFELElBQUEsQ0FBQWhDLG9CQUFBLENBQUEsT0FBQSxDQUFBLEVBQ0FrQyxRQUFBLEdBQUFGLElBQUEsQ0FBQWhDLG9CQUFBLENBQUEsVUFBQSxDQURBLEVBRUFtQyxRQUFBLEdBQUEsRUFGQSxFQUdBQyxXQUFBLEdBQUEsSUFIQSxFQUlBcEcsS0FBQSxHQUFBLElBSkEsQ0FEQTtBQUFBLG9CQU9BLEtBQUF5QyxDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUF3RCxLQUFBLENBQUF2RCxNQUFBLEVBQUFELENBQUEsRUFBQTtBQUFBLHdCQUFBMEQsUUFBQSxHQUFBQSxRQUFBLENBQUFFLE1BQUEsQ0FBQUosS0FBQSxDQUFBeEQsQ0FBQSxDQUFBLENBQUEsQ0FQQTtBQUFBLG9CQVFBLEtBQUFBLENBQUEsR0FBQSxDQUFBLEVBQUFBLENBQUEsR0FBQXlELFFBQUEsQ0FBQXhELE1BQUEsRUFBQUQsQ0FBQSxFQUFBO0FBQUEsd0JBQUEwRCxRQUFBLEdBQUFBLFFBQUEsQ0FBQUUsTUFBQSxDQUFBSCxRQUFBLENBQUF6RCxDQUFBLENBQUEsQ0FBQSxDQVJBO0FBQUEsb0JBVUEsS0FBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBMEQsUUFBQSxDQUFBekQsTUFBQSxFQUFBRCxDQUFBLEVBQUEsRUFBQTtBQUFBLHdCQUVBLElBQUE2RCxpQkFBQSxHQUFBdEcsS0FBQSxDQUFBNEYsZUFBQSxDQUFBTyxRQUFBLENBQUExRCxDQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsQ0FGQTtBQUFBLHdCQUdBMkQsV0FBQSxHQUFBQSxXQUFBLEdBQUFFLGlCQUFBLEdBQUFGLFdBQUEsQ0FIQTtBQUFBLHdCQUtBRCxRQUFBLENBQUExRCxDQUFBLEVBQUE4RCxPQUFBLEdBQUFKLFFBQUEsQ0FBQTFELENBQUEsRUFBQStELE9BQUEsR0FBQUwsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBZ0UsT0FBQSxHQUFBLFlBQUE7QUFBQSw0QkFDQXpHLEtBQUEsQ0FBQTRGLGVBQUEsQ0FBQSxJQUFBLEVBREE7QUFBQSx5QkFBQSxDQUxBO0FBQUEsd0JBUUFPLFFBQUEsQ0FBQTFELENBQUEsRUFBQWlFLGdCQUFBLEdBQUEsVUFBQXJHLENBQUEsRUFBQTtBQUFBLDRCQUNBLElBQUFBLENBQUEsQ0FBQXNHLFlBQUEsSUFBQSxPQUFBO0FBQUEsZ0NBQUEzRyxLQUFBLENBQUE0RixlQUFBLENBQUEsSUFBQSxFQURBO0FBQUEseUJBQUEsQ0FSQTtBQUFBLHdCQVdBTyxRQUFBLENBQUExRCxDQUFBLEVBQUFtRSxLQUFBLEdBQUEsWUFBQTtBQUFBLDRCQUNBQyxVQUFBLENBQUE3RyxLQUFBLENBQUE0RixlQUFBLENBQUFPLFFBQUEsQ0FBQTFELENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQURBO0FBQUEseUJBQUEsQ0FYQTtBQUFBLHdCQWVBMEQsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBckQsZ0JBQUEsQ0FBQSxPQUFBLEVBQUFZLEtBQUEsQ0FBQW9GLFlBQUEsRUFmQTtBQUFBLHdCQWdCQWUsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBckQsZ0JBQUEsQ0FBQSxPQUFBLEVBQUFZLEtBQUEsQ0FBQW9GLFlBQUEsRUFoQkE7QUFBQSxxQkFWQTtBQUFBLG9CQThCQVksSUFBQSxDQUFBNUcsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsVUFBQWlCLENBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUF5RyxJQUFBLEdBQUFkLElBQUEsQ0FBQTFHLHNCQUFBLENBQUE4RSxRQUFBLENBQUEsQ0FEQTtBQUFBLHdCQUVBLEtBQUEzQixDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUEwRCxRQUFBLENBQUF6RCxNQUFBLEVBQUFELENBQUEsRUFBQSxFQUFBO0FBQUEsNEJBQ0F6QyxLQUFBLENBQUFvRixZQUFBLENBQUFqQyxJQUFBLENBQUFnRCxRQUFBLENBQUExRCxDQUFBLENBQUEsSUFEQTtBQUFBLDRCQUVBMEQsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBOEQsT0FBQSxHQUFBSixRQUFBLENBQUExRCxDQUFBLEVBQUErRCxPQUFBLEdBQUFMLFFBQUEsQ0FBQTFELENBQUEsRUFBQWdFLE9BQUEsR0FBQU4sUUFBQSxDQUFBMUQsQ0FBQSxFQUFBaUUsZ0JBQUEsR0FBQVAsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBbUUsS0FBQSxHQUFBLElBQUEsQ0FGQTtBQUFBLHlCQUZBO0FBQUEsd0JBTUEsS0FBQW5FLENBQUEsR0FBQXFFLElBQUEsQ0FBQXBFLE1BQUEsR0FBQSxDQUFBLEVBQUFELENBQUEsSUFBQSxDQUFBLEVBQUFBLENBQUEsRUFBQSxFQUFBO0FBQUEsNEJBQ0FxRSxJQUFBLENBQUFyRSxDQUFBLEVBQUE5QyxVQUFBLENBQUF3RixXQUFBLENBQUEyQixJQUFBLENBQUFyRSxDQUFBLENBQUEsRUFEQTtBQUFBLHlCQU5BO0FBQUEscUJBQUEsRUE5QkE7QUFBQSxvQkF5Q0EsT0FBQTJELFdBQUEsQ0F6Q0E7QUFBQSxpQkF2R0E7QUFBQSxhQUFBLENBYkE7QUFBQSxTQUFBLEVBSEEsQ0FIQTtBQUFBLElBMEtBLEtBQUEzRCxDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUFzQixRQUFBLENBQUFyQixNQUFBLEVBQUFELENBQUEsRUFBQSxFQUFBO0FBQUEsUUFDQXNCLFFBQUEsQ0FBQXRCLENBQUEsRUFBQXNFLFVBQUEsR0FBQSxJQUFBLENBREE7QUFBQSxRQUVBaEQsUUFBQSxDQUFBdEIsQ0FBQSxFQUFBdUUsUUFBQSxHQUFBLFVBQUEzRyxDQUFBLEVBQUE7QUFBQSxZQUNBLE9BQUE2RCxLQUFBLENBQUE2QixZQUFBLENBQUEsSUFBQSxDQUFBLENBREE7QUFBQSxTQUFBLENBRkE7QUFBQSxLQTFLQTtBQUFBLElBK0tBLENBL0tBO0FBQUEsSUFpTEEsS0FBQXRELENBQUEsR0FBQSxDQUFBLEVBQUFBLENBQUEsR0FBQXdCLFNBQUEsQ0FBQXZCLE1BQUEsRUFBQUQsQ0FBQSxFQUFBLEVBQUE7QUFBQSxRQUNBd0IsU0FBQSxDQUFBeEIsQ0FBQSxFQUFBdUUsUUFBQSxHQUFBLFVBQUEzRyxDQUFBLEVBQUE7QUFBQSxZQUNBQSxDQUFBLENBQUFzRCxjQUFBLEdBREE7QUFBQSxZQUVBLElBQUEsQ0FBQU8sS0FBQSxDQUFBNkIsWUFBQSxDQUFBLElBQUEsQ0FBQTtBQUFBLGdCQUFBLE9BRkE7QUFBQSxTQUFBLENBREE7QUFBQSxLQWpMQTtBQUFBLElBc0xBLENBdExBO0FBQUEsQ0FBQSxFO0FDQUEsSUFBQWtCLEdBQUEsRUFDQUMsUUFBQSxHQUFBO0FBQUEsUUFDQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUE7QUFBQSxnQkFDQSxFQUNBLGNBQUEsSUFEQSxFQURBO0FBQUEsZ0JBSUEsRUFDQSxPQUFBLFNBREEsRUFKQTtBQUFBLGFBSEE7QUFBQSxTQURBO0FBQUEsUUFhQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLFVBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsS0FEQSxFQURBLENBSEE7QUFBQSxTQWJBO0FBQUEsUUFzQkE7QUFBQSxZQUNBLGVBQUEsS0FEQTtBQUFBLFlBRUEsZUFBQSxpQkFGQTtBQUFBLFlBR0EsV0FBQTtBQUFBLGdCQUNBLEVBQ0EsY0FBQSxJQURBLEVBREE7QUFBQSxnQkFJQSxFQUNBLE9BQUEsU0FEQSxFQUpBO0FBQUEsYUFIQTtBQUFBLFNBdEJBO0FBQUEsUUFrQ0E7QUFBQSxZQUNBLGVBQUEsZ0JBREE7QUFBQSxZQUVBLGVBQUEsa0JBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLFNBQUEsU0FEQSxFQURBLENBSEE7QUFBQSxTQWxDQTtBQUFBLFFBMkNBO0FBQUEsWUFDQSxlQUFBLHdCQURBO0FBQUEsWUFFQSxlQUFBLGtCQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxPQUFBLFNBREEsRUFEQSxDQUhBO0FBQUEsU0EzQ0E7QUFBQSxRQW9EQTtBQUFBLFlBQ0EsZUFBQSxXQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLFNBQUEsU0FEQSxFQURBLENBSEE7QUFBQSxTQXBEQTtBQUFBLFFBNkRBO0FBQUEsWUFDQSxlQUFBLDJCQURBO0FBQUEsWUFFQSxlQUFBLG9CQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxjQUFBLElBREEsRUFEQSxDQUhBO0FBQUEsU0E3REE7QUFBQSxRQXNFQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsS0FEQSxFQURBLENBSEE7QUFBQSxTQXRFQTtBQUFBLFFBK0VBO0FBQUEsWUFDQSxlQUFBLE1BREE7QUFBQSxZQUVBLGVBQUEsS0FGQTtBQUFBLFlBR0EsV0FBQTtBQUFBLGdCQUNBLEVBQ0EsY0FBQSxDQUFBLEdBREEsRUFEQTtBQUFBLGdCQUlBLEVBQ0EsYUFBQSxFQURBLEVBSkE7QUFBQSxhQUhBO0FBQUEsU0EvRUE7QUFBQSxRQTJGQTtBQUFBLFlBQ0EsZUFBQSxjQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsWUFEQSxFQURBLENBSEE7QUFBQSxTQTNGQTtBQUFBLFFBb0dBO0FBQUEsWUFDQSxlQUFBLGVBREE7QUFBQSxZQUVBLGVBQUEsYUFGQTtBQUFBLFlBR0EsV0FBQSxDQUNBLEVBQ0EsY0FBQSxLQURBLEVBREEsQ0FIQTtBQUFBLFNBcEdBO0FBQUEsUUE2R0E7QUFBQSxZQUNBLGVBQUEsU0FEQTtBQUFBLFlBRUEsZUFBQSxLQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxjQUFBLEtBREEsRUFEQSxDQUhBO0FBQUEsU0E3R0E7QUFBQSxRQXNIQTtBQUFBLFlBQ0EsZUFBQSxPQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUE7QUFBQSxnQkFDQSxFQUNBLFNBQUEsU0FEQSxFQURBO0FBQUEsZ0JBSUEsRUFDQSxjQUFBLElBREEsRUFKQTtBQUFBLGFBSEE7QUFBQSxTQXRIQTtBQUFBLEtBREEsQztBQXFJQSxTQUFBQyxPQUFBLEdBQUE7QUFBQSxJQUVBLElBQUEsQ0FBQWhJLFFBQUEsQ0FBQTBELGNBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQSxRQUFBLE9BRkE7QUFBQSxJQUlBLElBQUF1RSxRQUFBLEdBQUE7QUFBQSxRQUFBQyxHQUFBLEVBQUEsU0FBQTtBQUFBLFFBQUFDLEdBQUEsRUFBQSxTQUFBO0FBQUEsS0FBQSxDQUpBO0FBQUEsSUFNQUwsR0FBQSxHQUFBLElBQUFNLE1BQUEsQ0FBQUMsSUFBQSxDQUFBQyxHQUFBLENBQUF0SSxRQUFBLENBQUEwRCxjQUFBLENBQUEsS0FBQSxDQUFBLEVBQUE7QUFBQSxRQUNBNkUsTUFBQSxFQUFBTixRQURBO0FBQUEsUUFFQU8sSUFBQSxFQUFBLEVBRkE7QUFBQSxRQUdBQyxjQUFBLEVBQUEsS0FIQTtBQUFBLFFBSUFDLFVBQUEsRUFBQSxLQUpBO0FBQUEsUUFLQUMsV0FBQSxFQUFBLElBTEE7QUFBQSxRQU1BQyxrQkFBQSxFQUFBLEVBQ0FDLFFBQUEsRUFBQVQsTUFBQSxDQUFBQyxJQUFBLENBQUFTLGVBQUEsQ0FBQUMsWUFEQSxFQU5BO0FBQUEsUUFTQUMsaUJBQUEsRUFBQSxLQVRBO0FBQUEsUUFVQUMsU0FBQSxFQUFBYixNQUFBLENBQUFDLElBQUEsQ0FBQWEsU0FBQSxDQUFBQyxPQVZBO0FBQUEsUUFXQUMsV0FBQSxFQUFBLEtBWEE7QUFBQSxRQVlBQyxTQUFBLEVBQUEsQ0FBQSxpQkFBQXJKLFFBQUEsQ0FaQTtBQUFBLFFBYUFzSixNQUFBLEVBQUF2QixRQWJBO0FBQUEsS0FBQSxDQUFBLENBTkE7QUFBQSxJQXNCQSxJQUFBd0IsTUFBQSxHQUFBLElBQUFuQixNQUFBLENBQUFDLElBQUEsQ0FBQW1CLE1BQUEsQ0FBQTtBQUFBLFFBQ0FYLFFBQUEsRUFBQVosUUFEQTtBQUFBLFFBRUFILEdBQUEsRUFBQUEsR0FGQTtBQUFBLFFBR0EyQixLQUFBLEVBQUEsYUFIQTtBQUFBLEtBQUEsQ0FBQSxDQXRCQTtBQUFBLElBNEJBRixNQUFBLENBQUFHLE1BQUEsQ0FBQTVCLEdBQUEsRUE1QkE7QUFBQSxDO0FDcklBOUgsUUFBQSxDQUFBQyxnQkFBQSxDQUFBLGtCQUFBLEVBQUEsWUFBQTtBQUFBLElBRUEsQ0FBQSxZQUFBO0FBQUEsUUFDQSxJQUFBMEosT0FBQSxHQUFBM0osUUFBQSxDQUFBa0UsZ0JBQUEsQ0FBQSxXQUFBLENBQUEsRUFDQVosQ0FEQSxDQURBO0FBQUEsUUFHQSxTQUFBQSxDQUFBLElBQUFxRyxPQUFBLEVBQUE7QUFBQSxZQUVBLElBQUEsT0FBQUEsT0FBQSxDQUFBckcsQ0FBQSxFQUFBckQsZ0JBQUEsS0FBQSxVQUFBO0FBQUEsZ0JBQUEsU0FGQTtBQUFBLFlBSUEwSixPQUFBLENBQUFyRyxDQUFBLEVBQUFyRCxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBaUIsQ0FBQSxFQUFBO0FBQUEsZ0JBQ0FBLENBQUEsQ0FBQXNELGNBQUEsR0FEQTtBQUFBLGdCQUVBLElBQUFvRixHQUFBLEdBQUE1SixRQUFBLENBQUF1RSxhQUFBLENBQUEsTUFBQSxDQUFBLENBRkE7QUFBQSxnQkFHQSxJQUFBLENBQUFxRixHQUFBO0FBQUEsb0JBQUEsT0FBQSxLQUFBLENBSEE7QUFBQSxnQkFLQSxJQUFBLENBQUFBLEdBQUEsQ0FBQTlJLFNBQUEsQ0FBQVEsUUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsb0JBQ0FzSSxHQUFBLENBQUE5SSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxVQUFBLEVBREE7QUFBQSxvQkFFQSxLQUFBRCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxnQkFBQSxFQUZBO0FBQUEsb0JBR0EsS0FBQUQsU0FBQSxDQUFBQyxHQUFBLENBQUEscUJBQUEsRUFIQTtBQUFBLGlCQUFBLE1BSUE7QUFBQSxvQkFDQTZJLEdBQUEsQ0FBQTlJLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLFVBQUEsRUFEQTtBQUFBLG9CQUVBLEtBQUFGLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLGdCQUFBLEVBRkE7QUFBQSxvQkFHQSxLQUFBRixTQUFBLENBQUFFLE1BQUEsQ0FBQSxxQkFBQSxFQUhBO0FBQUEsaUJBVEE7QUFBQSxhQUFBLEVBSkE7QUFBQSxTQUhBO0FBQUEsS0FBQSxJQUZBO0FBQUEsQ0FBQSxFO0FDQUFoQixRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQTtBQUFBLFFBQUE0SixJQUFBLEdBQUEsWUFBQTtBQUFBLFFBQ0EsSUFBQUMsS0FBQSxHQUFBOUosUUFBQSxDQUFBRyxzQkFBQSxDQUFBLHFCQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQ0E0SixRQUFBLEdBQUEvSixRQUFBLENBQUFHLHNCQUFBLENBQUEsaUJBQUEsRUFBQSxDQUFBLENBREEsQ0FEQTtBQUFBLFFBSUEsT0FBQTtBQUFBLFlBRUE0RCxJQUFBLEVBQUEsWUFBQTtBQUFBLGdCQUVBLElBQUEsQ0FBQStGLEtBQUEsSUFBQSxDQUFBQyxRQUFBO0FBQUEsb0JBQUEsT0FGQTtBQUFBLGdCQUlBLElBQUFDLFNBQUEsQ0FBQUMsU0FBQSxDQUFBQyxPQUFBLENBQUEsU0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEVBQUE7QUFBQSxvQkFDQUgsUUFBQSxDQUFBakosU0FBQSxDQUFBQyxHQUFBLENBQUEscUJBQUEsRUFEQTtBQUFBLG9CQUVBLE9BRkE7QUFBQSxpQkFKQTtBQUFBLGdCQVNBLElBQUFvSixPQUFBLEdBQUFMLEtBQUEsQ0FBQWpJLHFCQUFBLEdBQUF1SSxJQUFBLEdBQUFMLFFBQUEsQ0FBQWxJLHFCQUFBLEdBQUF1SSxJQUFBLEVBQ0FDLE1BQUEsR0FBQVAsS0FBQSxDQUFBakkscUJBQUEsR0FBQVUsR0FBQSxHQUFBd0gsUUFBQSxDQUFBbEkscUJBQUEsR0FBQVUsR0FEQSxDQVRBO0FBQUEsZ0JBYUE7QUFBQSxnQkFBQXdILFFBQUEsQ0FBQU8sS0FBQSxDQUFBQyxrQkFBQSxHQUFBSixPQUFBLEdBQUEsRUFBQSxHQUFBLEtBQUEsR0FBQSxHQUFBLEdBQUFFLE1BQUEsR0FBQSxFQUFBLEdBQUEsS0FBQSxDQWJBO0FBQUEsZ0JBY0FOLFFBQUEsQ0FBQU8sS0FBQSxDQUFBRSxjQUFBLEdBQUFWLEtBQUEsQ0FBQVcsV0FBQSxHQUFBLEVBQUEsR0FBQSxLQUFBLEdBQUEsR0FBQSxHQUFBWCxLQUFBLENBQUEvRyxZQUFBLEdBQUEsRUFBQSxHQUFBLEtBQUEsQ0FkQTtBQUFBLGFBRkE7QUFBQSxTQUFBLENBSkE7QUFBQSxLQUFBLEVBQUEsQ0FGQTtBQUFBLElBOEJBOEcsSUFBQSxDQUFBOUYsSUFBQSxHQTlCQTtBQUFBLElBK0JBNUIsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUE0SixJQUFBLENBQUE5RixJQUFBLENBQUFDLElBQUEsQ0FBQTZGLElBQUEsQ0FBQSxFQS9CQTtBQUFBLElBZ0NBMUgsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUE0SixJQUFBLENBQUE5RixJQUFBLENBQUFDLElBQUEsQ0FBQTZGLElBQUEsQ0FBQSxFQWhDQTtBQUFBLElBbUNBO0FBQUEsUUFBQWEsUUFBQSxHQUFBLFlBQUE7QUFBQSxRQUVBLElBQUFaLEtBQUEsR0FBQTlKLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSxxQkFBQSxFQUFBLENBQUEsQ0FBQSxFQUNBd0ssS0FBQSxHQUFBM0ssUUFBQSxDQUFBRyxzQkFBQSxDQUFBLHdCQUFBLEVBQUEsQ0FBQSxDQURBLEVBRUF5SyxLQUFBLEdBQUE1SyxRQUFBLENBQUFHLHNCQUFBLENBQUEsd0JBQUEsRUFBQSxDQUFBLENBRkEsRUFHQTBLLEtBQUEsR0FBQTdLLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSx3QkFBQSxFQUFBLENBQUEsQ0FIQSxDQUZBO0FBQUEsUUFPQSxPQUFBO0FBQUEsWUFFQTJLLElBQUEsRUFBQSxVQUFBM0osT0FBQSxFQUFBNEosVUFBQSxFQUFBQyxTQUFBLEVBQUFDLFdBQUEsRUFBQTtBQUFBLGdCQUVBLElBQUEvSSxTQUFBLEdBQUFDLE1BQUEsQ0FBQUMsV0FBQSxJQUFBcEMsUUFBQSxDQUFBcUMsZUFBQSxDQUFBSCxTQUFBLEVBQ0FnSixVQUFBLEdBQUFsTCxRQUFBLENBQUFxQyxlQUFBLENBQUE4SSxZQURBLEVBRUFwSSxZQUFBLEdBQUEvQyxRQUFBLENBQUFxQyxlQUFBLENBQUFVLFlBRkEsRUFFQWIsU0FGQSxFQUdBSyxHQUFBLEdBQUFwQixPQUFBLENBQUFVLHFCQUFBLEdBQUFVLEdBQUEsR0FBQSxDQUFBSixNQUFBLENBQUFXLFdBQUEsSUFBQVgsTUFBQSxDQUFBbEIsSUFBQSxDQUFBOEIsWUFBQSxJQUFBL0MsUUFBQSxDQUFBcUMsZUFBQSxDQUFBVSxZQUFBLENBSEEsRUFJQXFJLFNBSkEsQ0FGQTtBQUFBLGdCQVFBQSxTQUFBLEdBQUFMLFVBQUEsR0FBQSxnQkFBQSxDQUFBLENBQUE3SSxTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQUgsVUFBQSxHQUFBLElBQUEsR0FBQSxFQUFBLENBUkE7QUFBQSxnQkFTQUssU0FBQSxJQUFBSixTQUFBLEdBQUEsZ0JBQUEsQ0FBQSxDQUFBOUksU0FBQSxHQUFBYSxZQUFBLENBQUEsR0FBQW1JLFVBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLEdBQUFGLFNBQUEsR0FBQSxJQUFBLEdBQUEsRUFBQSxDQVRBO0FBQUEsZ0JBVUFJLFNBQUEsSUFBQSxlQUFBLENBVkE7QUFBQSxnQkFXQUEsU0FBQSxJQUFBSCxXQUFBLEdBQUEsWUFBQSxDQUFBLENBQUEvSSxTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBRCxXQUFBLEdBQUEsR0FBQSxHQUFBLE1BQUEsR0FBQSxFQUFBLENBWEE7QUFBQSxnQkFhQSxJQUFBRyxTQUFBLEtBQUEsZUFBQSxFQUFBO0FBQUEsb0JBQ0FqSyxPQUFBLENBQUFtSixLQUFBLENBQUFlLE1BQUEsR0FBQSxDQUFBLENBQUFuSixTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLENBREE7QUFBQSxvQkFFQSxPQUZBO0FBQUEsaUJBYkE7QUFBQSxnQkFrQkEvSixPQUFBLENBQUFtSixLQUFBLENBQUFnQixlQUFBLEdBQUFGLFNBQUEsQ0FsQkE7QUFBQSxnQkFtQkFqSyxPQUFBLENBQUFtSixLQUFBLENBQUFpQixZQUFBLEdBQUFILFNBQUEsQ0FuQkE7QUFBQSxnQkFvQkFqSyxPQUFBLENBQUFtSixLQUFBLENBQUFjLFNBQUEsR0FBQUEsU0FBQSxDQXBCQTtBQUFBLGdCQXFCQWpLLE9BQUEsQ0FBQW1KLEtBQUEsQ0FBQWtCLFdBQUEsR0FBQUosU0FBQSxDQXJCQTtBQUFBLGdCQXNCQWpLLE9BQUEsQ0FBQW1KLEtBQUEsQ0FBQW1CLFVBQUEsR0FBQUwsU0FBQSxDQXRCQTtBQUFBLGFBRkE7QUFBQSxZQTRCQXJILElBQUEsRUFBQSxZQUFBO0FBQUEsZ0JBRUEsSUFBQTRHLEtBQUE7QUFBQSxvQkFBQSxLQUFBRyxJQUFBLENBQUFILEtBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFGQTtBQUFBLGdCQUdBLElBQUFDLEtBQUE7QUFBQSxvQkFBQSxLQUFBRSxJQUFBLENBQUFGLEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFIQTtBQUFBLGdCQUlBLElBQUFDLEtBQUE7QUFBQSxvQkFBQSxLQUFBQyxJQUFBLENBQUFELEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFKQTtBQUFBLGdCQUtBLElBQUFmLEtBQUE7QUFBQSxvQkFBQSxLQUFBZ0IsSUFBQSxDQUFBaEIsS0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUxBO0FBQUEsYUE1QkE7QUFBQSxTQUFBLENBUEE7QUFBQSxLQUFBLEVBQUEsQ0FuQ0E7QUFBQSxJQW1GQTNILE1BQUEsQ0FBQWxDLGdCQUFBLENBQUEsUUFBQSxFQUFBeUssUUFBQSxDQUFBM0csSUFBQSxDQUFBQyxJQUFBLENBQUEwRyxRQUFBLENBQUEsRUFuRkE7QUFBQSxDQUFBLEU7QUNBQTFLLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFBQSxJQUNBLENBQUEsWUFBQTtBQUFBLFFBSUE7QUFBQTtBQUFBLFFBQUFrQyxNQUFBLENBQUF1SixnQkFBQSxHQUFBLFlBQUE7QUFBQSxZQUNBLE9BQUF2SixNQUFBLENBQUF3SixxQkFBQSxJQUNBeEosTUFBQSxDQUFBeUosMkJBREEsSUFFQXpKLE1BQUEsQ0FBQTBKLHdCQUZBLElBR0EsVUFBQUMsUUFBQSxFQUFBO0FBQUEsZ0JBQ0EzSixNQUFBLENBQUF1RixVQUFBLENBQUFvRSxRQUFBLEVBQUEsT0FBQSxFQUFBLEVBREE7QUFBQSxhQUhBLENBREE7QUFBQSxTQUFBLEVBQUEsQ0FKQTtBQUFBLFFBY0E7QUFBQSxpQkFBQUMsU0FBQSxDQUFBQyxhQUFBLEVBQUFDLEtBQUEsRUFBQUMsTUFBQSxFQUFBO0FBQUEsWUFLQTtBQUFBO0FBQUE7QUFBQSxnQkFBQUMsT0FBQSxHQUFBaEssTUFBQSxDQUFBZ0ssT0FBQSxFQUNBSCxhQUFBLEdBQUFBLGFBQUEsSUFBQSxDQURBLEVBRUFDLEtBQUEsR0FBQUEsS0FBQSxJQUFBLElBRkEsRUFHQUMsTUFBQSxHQUFBQSxNQUFBLElBQUEsYUFIQSxFQUlBRSxXQUFBLEdBQUEsQ0FKQSxDQUxBO0FBQUEsWUFZQTtBQUFBLGdCQUFBQyxJQUFBLEdBQUExSSxJQUFBLENBQUEySSxHQUFBLENBQUEsR0FBQSxFQUFBM0ksSUFBQSxDQUFBNEksR0FBQSxDQUFBNUksSUFBQSxDQUFBQyxHQUFBLENBQUF1SSxPQUFBLEdBQUFILGFBQUEsSUFBQUMsS0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBWkE7QUFBQSxZQWVBO0FBQUEsZ0JBQUFPLEtBQUEsR0FBQTdJLElBQUEsQ0FBQThJLEVBQUEsR0FBQSxDQUFBLEVBQ0FDLGVBQUEsR0FBQTtBQUFBLG9CQUNBQyxXQUFBLEVBQUEsVUFBQUMsR0FBQSxFQUFBO0FBQUEsd0JBQ0EsT0FBQWpKLElBQUEsQ0FBQWtKLEdBQUEsQ0FBQUQsR0FBQSxHQUFBLENBQUFqSixJQUFBLENBQUE4SSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLHFCQURBO0FBQUEsb0JBSUFLLGFBQUEsRUFBQSxVQUFBRixHQUFBLEVBQUE7QUFBQSx3QkFDQSxPQUFBLENBQUEsR0FBQSxHQUFBLENBQUFqSixJQUFBLENBQUFvSixHQUFBLENBQUFwSixJQUFBLENBQUE4SSxFQUFBLEdBQUFHLEdBQUEsSUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLHFCQUpBO0FBQUEsb0JBT0FJLGNBQUEsRUFBQSxVQUFBSixHQUFBLEVBQUE7QUFBQSx3QkFDQSxJQUFBLENBQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSw0QkFDQSxPQUFBLE1BQUFqSixJQUFBLENBQUFzSixHQUFBLENBQUFMLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLHlCQURBO0FBQUEsd0JBSUEsT0FBQSxNQUFBLENBQUFqSixJQUFBLENBQUFzSixHQUFBLENBQUFMLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUpBO0FBQUEscUJBUEE7QUFBQSxpQkFEQSxDQWZBO0FBQUEsWUFnQ0E7QUFBQSxxQkFBQU0sSUFBQSxHQUFBO0FBQUEsZ0JBQ0FkLFdBQUEsSUFBQSxJQUFBLEVBQUEsQ0FEQTtBQUFBLGdCQUdBLElBQUFlLENBQUEsR0FBQWYsV0FBQSxHQUFBQyxJQUFBLENBSEE7QUFBQSxnQkFJQSxJQUFBZSxDQUFBLEdBQUFWLGVBQUEsQ0FBQVIsTUFBQSxFQUFBaUIsQ0FBQSxDQUFBLENBSkE7QUFBQSxnQkFNQSxJQUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsb0JBQ0F6QixnQkFBQSxDQUFBd0IsSUFBQSxFQURBO0FBQUEsb0JBRUEvSyxNQUFBLENBQUFrTCxRQUFBLENBQUEsQ0FBQSxFQUFBbEIsT0FBQSxHQUFBLENBQUFILGFBQUEsR0FBQUcsT0FBQSxDQUFBLEdBQUFpQixDQUFBLEVBRkE7QUFBQSxpQkFBQSxNQUdBO0FBQUEsb0JBRUE7QUFBQSxvQkFBQWpMLE1BQUEsQ0FBQWtMLFFBQUEsQ0FBQSxDQUFBLEVBQUFyQixhQUFBLEVBRkE7QUFBQSxpQkFUQTtBQUFBLGFBaENBO0FBQUEsWUFnREE7QUFBQSxZQUFBa0IsSUFBQSxHQWhEQTtBQUFBLFNBZEE7QUFBQSxRQWlFQSxJQUFBSSxJQUFBLEdBQUF0TixRQUFBLENBQUFrRSxnQkFBQSxDQUFBLGFBQUEsQ0FBQSxFQUNBK0gsS0FBQSxHQUFBLEdBREEsQ0FqRUE7QUFBQSxRQW9FQSxTQUFBc0Isd0JBQUEsQ0FBQXBNLE9BQUEsRUFBQTtBQUFBLFlBRUEsSUFBQSxDQUFBQSxPQUFBO0FBQUEsZ0JBQUEsT0FGQTtBQUFBLFlBR0EsSUFBQWUsU0FBQSxHQUFBQyxNQUFBLENBQUFDLFdBQUEsSUFBQXBDLFFBQUEsQ0FBQXFDLGVBQUEsQ0FBQUgsU0FBQSxFQUNBc0wsU0FBQSxHQUFBck0sT0FBQSxDQUFBc00sSUFBQSxDQUFBaEssS0FBQSxDQUFBLFFBQUEsQ0FEQSxFQUVBaUssYUFGQSxDQUhBO0FBQUEsWUFPQUEsYUFBQSxHQUFBMU4sUUFBQSxDQUFBMEQsY0FBQSxDQUFBOEosU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBUEE7QUFBQSxZQVNBLE9BQUFFLGFBQUEsR0FBQXhMLFNBQUEsR0FBQXdMLGFBQUEsQ0FBQTdMLHFCQUFBLEdBQUFVLEdBQUEsR0FBQSxDQUFBLENBVEE7QUFBQSxTQXBFQTtBQUFBLFFBaUZBLFNBQUFlLENBQUEsSUFBQWdLLElBQUEsRUFBQTtBQUFBLFlBRUEsSUFBQSxPQUFBQSxJQUFBLENBQUFoSyxDQUFBLENBQUEsSUFBQSxRQUFBO0FBQUEsZ0JBQUEsT0FGQTtBQUFBLFlBSUFnSyxJQUFBLENBQUFoSyxDQUFBLEVBQUFyRCxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBaUIsQ0FBQSxFQUFBO0FBQUEsZ0JBRUFBLENBQUEsQ0FBQXNELGNBQUEsR0FGQTtBQUFBLGdCQUlBLElBQUE2SSxRQUFBLEdBQUFFLHdCQUFBLENBQUEsSUFBQSxDQUFBLEVBQ0FJLEtBQUEsR0FBQSxJQURBLENBSkE7QUFBQSxnQkFPQTVCLFNBQUEsQ0FBQXNCLFFBQUEsRUFBQSxJQUFBLEVBUEE7QUFBQSxhQUFBLEVBSkE7QUFBQSxTQWpGQTtBQUFBLEtBQUEsSUFEQTtBQUFBLENBQUEsRTtBQ0FBLElBQUFPLFNBQUEsR0FDQTtBQUFBLFlBQUE7QUFBQSxJQUNBLElBQUE1RyxRQUFBLEdBQUFoSCxRQUFBLENBQUE2RSxvQkFBQSxDQUFBLEdBQUEsQ0FBQSxFQUNBZ0osSUFBQSxHQUFBLEVBREEsRUFFQUMsU0FGQSxFQUdBQyxXQUFBLEdBQUEsQ0FIQSxFQUlBQyxjQUFBLEdBQUEsQ0FKQSxFQU1BSixTQUFBLEdBQUE1TixRQUFBLENBQUFHLHNCQUFBLENBQUEsV0FBQSxFQUFBLENBQUEsQ0FOQSxFQU9BOE4saUJBQUEsR0FBQWpPLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSwwQkFBQSxFQUFBLENBQUEsQ0FQQSxFQVFBK04sS0FSQSxDQURBO0FBQUEsSUFXQSxJQUFBLENBQUFOLFNBQUEsSUFBQSxDQUFBSyxpQkFBQTtBQUFBLFFBQUEsT0FYQTtBQUFBLElBYUEsU0FBQTNLLENBQUEsSUFBQTBELFFBQUEsRUFBQTtBQUFBLFFBQ0EsSUFBQSxPQUFBQSxRQUFBLENBQUExRCxDQUFBLENBQUEsS0FBQSxRQUFBO0FBQUEsWUFBQSxTQURBO0FBQUEsUUFHQSxJQUFBNkssTUFBQSxHQUFBLElBQUEsQ0FIQTtBQUFBLFFBS0EsUUFBQW5ILFFBQUEsQ0FBQTFELENBQUEsRUFBQThLLFFBQUE7QUFBQSxRQUNBLEtBQUEsS0FBQTtBQUFBLFlBQ0FELE1BQUEsR0FBQW5ILFFBQUEsQ0FBQTFELENBQUEsRUFBQUUsWUFBQSxDQUFBLEtBQUEsQ0FBQSxDQURBO0FBQUEsWUFFQSxNQUhBO0FBQUEsUUFJQSxLQUFBLEtBQUEsQ0FKQTtBQUFBLFFBSUEsS0FBQSxLQUFBO0FBQUEsWUFDQSxJQUFBNkssTUFBQSxHQUFBckgsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBdUIsb0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FEQTtBQUFBLFlBRUEsSUFBQSxDQUFBd0osTUFBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLGdCQUFBLE1BRkE7QUFBQSxZQUdBLElBQUFDLE9BQUEsR0FBQUQsTUFBQSxDQUFBLENBQUEsRUFBQTdLLFlBQUEsQ0FBQSxZQUFBLENBQUEsQ0FIQTtBQUFBLFlBSUE4SyxPQUFBLEdBQUFBLE9BQUEsQ0FBQTdLLEtBQUEsQ0FBQSxZQUFBLENBQUEsQ0FKQTtBQUFBLFlBS0EwSyxNQUFBLEdBQUFHLE9BQUEsS0FBQSxJQUFBLEdBQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBTEE7QUFBQSxZQU1BLE1BVkE7QUFBQSxRQVdBO0FBQUEsWUFDQSxJQUFBLENBQUF0SCxRQUFBLENBQUExRCxDQUFBLEVBQUE4SyxRQUFBO0FBQUEsZ0JBQUEsTUFEQTtBQUFBLFlBRUEsSUFBQXRFLEtBQUEsR0FBQXJILGdCQUFBLENBQUF1RSxRQUFBLENBQUExRCxDQUFBLENBQUEsRUFBQWlMLGVBQUEsQ0FGQTtBQUFBLFlBR0FDLE9BQUEsQ0FBQUMsR0FBQSxDQUFBM0UsS0FBQSxFQUhBO0FBQUEsWUFJQSxJQUFBQSxLQUFBLElBQUEsTUFBQSxFQUFBO0FBQUEsZ0JBQ0FBLEtBQUEsR0FBQUEsS0FBQSxDQUFBckcsS0FBQSxDQUFBLGNBQUEsQ0FBQSxDQURBO0FBQUEsZ0JBRUFxRyxLQUFBLEdBQUFBLEtBQUEsS0FBQSxJQUFBLEdBQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUFuRixPQUFBLENBQUEsUUFBQSxFQUFBLEVBQUEsQ0FBQSxHQUFBLElBQUEsQ0FGQTtBQUFBLGdCQUdBd0osTUFBQSxHQUFBckUsS0FBQSxDQUhBO0FBQUEsYUFmQTtBQUFBLFNBTEE7QUFBQSxRQTJCQSxJQUFBcUUsTUFBQSxLQUFBLElBQUEsSUFBQUEsTUFBQSxJQUFBLE1BQUEsSUFBQU4sSUFBQSxDQUFBM0QsT0FBQSxDQUFBaUUsTUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBLFlBQUFOLElBQUEsQ0FBQWEsSUFBQSxDQUFBUCxNQUFBLEVBM0JBO0FBQUEsS0FiQTtBQUFBLElBMkNBTCxTQUFBLEdBQUFELElBQUEsQ0FBQXRLLE1BQUEsQ0EzQ0E7QUFBQSxJQTZDQSxLQUFBRCxDQUFBLElBQUF1SyxJQUFBLEVBQUE7QUFBQSxRQUNBLElBQUFjLEdBQUEsR0FBQSxJQUFBQyxLQUFBLEVBQUEsQ0FEQTtBQUFBLFFBRUFELEdBQUEsQ0FBQUUsR0FBQSxHQUFBaEIsSUFBQSxDQUFBdkssQ0FBQSxDQUFBLENBRkE7QUFBQSxRQUdBcUwsR0FBQSxDQUFBRyxNQUFBLEdBQUEsWUFBQTtBQUFBLFlBQ0FmLFdBQUEsR0FEQTtBQUFBLFlBRUFnQixXQUFBLENBQUFoQixXQUFBLEVBQUFELFNBQUEsRUFGQTtBQUFBLFlBR0FVLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLEtBQUFJLEdBQUEsR0FBQSxZQUFBLEVBSEE7QUFBQSxTQUFBLENBSEE7QUFBQSxRQVFBRixHQUFBLENBQUFLLE9BQUEsR0FBQSxZQUFBO0FBQUEsWUFDQWpCLFdBQUEsR0FEQTtBQUFBLFlBRUFnQixXQUFBLENBQUFoQixXQUFBLEVBQUFELFNBQUEsRUFGQTtBQUFBLFNBQUEsQ0FSQTtBQUFBLEtBN0NBO0FBQUEsSUEyREEsU0FBQWlCLFdBQUEsQ0FBQWhCLFdBQUEsRUFBQUQsU0FBQSxFQUFBO0FBQUEsUUFDQSxJQUFBbUIsUUFBQSxHQUFBdEwsSUFBQSxDQUFBdUwsSUFBQSxDQUFBbkIsV0FBQSxHQUFBRCxTQUFBLEdBQUEsR0FBQSxDQUFBLENBREE7QUFBQSxRQUdBcUIsYUFBQSxDQUFBakIsS0FBQSxFQUhBO0FBQUEsUUFJQUQsaUJBQUEsQ0FBQW1CLFdBQUEsR0FBQXBCLGNBQUEsQ0FKQTtBQUFBLFFBTUEsSUFBQWlCLFFBQUEsSUFBQSxHQUFBLEVBQUE7QUFBQSxZQUNBaEIsaUJBQUEsQ0FBQW1CLFdBQUEsR0FBQXBCLGNBQUEsR0FBQSxHQUFBLENBREE7QUFBQSxZQUdBLElBQUFKLFNBQUEsRUFBQTtBQUFBLGdCQUNBQSxTQUFBLENBQUE5TSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxrQkFBQSxFQURBO0FBQUEsZ0JBRUFmLFFBQUEsQ0FBQTZFLG9CQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQS9ELFNBQUEsQ0FBQUMsR0FBQSxDQUFBLFNBQUEsRUFGQTtBQUFBLGFBSEE7QUFBQSxTQUFBLE1BUUE7QUFBQSxZQUVBbU4sS0FBQSxHQUFBbUIsV0FBQSxDQUFBLFlBQUE7QUFBQSxnQkFFQXBCLGlCQUFBLENBQUFtQixXQUFBLEdBQUFwQixjQUFBLENBRkE7QUFBQSxnQkFHQUEsY0FBQSxHQUhBO0FBQUEsZ0JBS0EsSUFBQUEsY0FBQSxJQUFBaUIsUUFBQSxFQUFBO0FBQUEsb0JBQ0FFLGFBQUEsQ0FBQWpCLEtBQUEsRUFEQTtBQUFBLGlCQUxBO0FBQUEsYUFBQSxFQVFBLEVBUkEsQ0FBQSxDQUZBO0FBQUEsU0FkQTtBQUFBLEtBM0RBO0FBQUEsQ0FBQSxFQURBLEM7QUEyRkEvTCxNQUFBLENBQUEyTSxNQUFBLEdBQUEsWUFBQTtBQUFBLElBQ0FsQixTQUFBLENBREE7QUFBQSxDQUFBLEM7QUMzRkE1TixRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQTtBQUFBLEtBQUEsWUFBQTtBQUFBLFFBRUEsSUFBQXFQLE1BQUEsR0FBQXRQLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSxRQUFBLENBQUEsQ0FGQTtBQUFBLFFBSUEsSUFBQSxDQUFBbVAsTUFBQSxDQUFBL0wsTUFBQTtBQUFBLFlBQUEsT0FKQTtBQUFBLFFBTUEsU0FBQWdNLE1BQUEsQ0FBQUMsSUFBQSxFQUFBO0FBQUEsWUFDQSxLQUFBQyxVQUFBLEdBQUFELElBQUEsQ0FEQTtBQUFBLFlBR0EsS0FBQUUsV0FBQSxHQUFBLEVBQUEsQ0FIQTtBQUFBLFlBS0EsS0FBQUMsY0FBQSxHQUFBLENBQUEsQ0FMQTtBQUFBLFlBT0EsS0FBQUMsSUFBQSxHQUFBLEtBQUEsQ0FQQTtBQUFBLFlBU0EsS0FBQUMsb0JBQUEsR0FBQSxVQUFBQyxJQUFBLEVBQUFDLElBQUEsRUFBQTtBQUFBLGdCQUNBLElBQUFDLFdBQUEsR0FBQSxlQUFBLEVBQ0F6SixLQURBLENBREE7QUFBQSxnQkFJQUEsS0FBQSxHQUFBdUosSUFBQSxDQUFBdE0sWUFBQSxDQUFBLFVBQUF1TSxJQUFBLENBQUEsQ0FKQTtBQUFBLGdCQU1BLElBQUEsQ0FBQXhKLEtBQUEsRUFBQTtBQUFBLG9CQUNBQSxLQUFBLEdBQUF1SixJQUFBLENBQUEzUCxzQkFBQSxDQUFBNlAsV0FBQSxHQUFBRCxJQUFBLEVBQUEsQ0FBQSxDQUFBLENBREE7QUFBQSxvQkFFQXhKLEtBQUEsR0FBQUEsS0FBQSxHQUFBQSxLQUFBLENBQUFULFNBQUEsQ0FBQW1LLElBQUEsRUFBQSxHQUFBLElBQUEsQ0FGQTtBQUFBLGlCQU5BO0FBQUEsZ0JBV0EsT0FBQTFKLEtBQUEsQ0FYQTtBQUFBLGFBQUEsQ0FUQTtBQUFBLFlBdUJBLEtBQUEySixRQUFBLEdBQUEsWUFBQTtBQUFBLGdCQUNBLElBQUFDLEtBQUEsR0FBQSxLQUFBVixVQUFBLENBQUF0UCxzQkFBQSxDQUFBLGNBQUEsQ0FBQSxFQUNBbUQsQ0FEQSxFQUVBOE0sVUFGQSxDQURBO0FBQUEsZ0JBS0EsSUFBQSxDQUFBRCxLQUFBLENBQUE1TSxNQUFBO0FBQUEsb0JBQUEsT0FBQSxLQUFBLENBTEE7QUFBQSxnQkFPQSxLQUFBRCxDQUFBLElBQUE2TSxLQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBLE9BQUFBLEtBQUEsQ0FBQTdNLENBQUEsQ0FBQSxLQUFBLFFBQUE7QUFBQSx3QkFBQSxTQURBO0FBQUEsb0JBRUE4TSxVQUFBLEdBQUE7QUFBQSx3QkFDQSxTQUFBLEtBQUFQLG9CQUFBLENBQUFNLEtBQUEsQ0FBQTdNLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FEQTtBQUFBLHdCQUVBLFNBQUEsS0FBQXVNLG9CQUFBLENBQUFNLEtBQUEsQ0FBQTdNLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FGQTtBQUFBLHdCQUdBLE9BQUEsS0FBQXVNLG9CQUFBLENBQUFNLEtBQUEsQ0FBQTdNLENBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FIQTtBQUFBLHdCQUlBLFFBQUEsS0FBQXVNLG9CQUFBLENBQUFNLEtBQUEsQ0FBQTdNLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FKQTtBQUFBLHFCQUFBLENBRkE7QUFBQSxvQkFTQSxLQUFBb00sV0FBQSxDQUFBcE0sQ0FBQSxJQUFBOE0sVUFBQSxDQVRBO0FBQUEsaUJBUEE7QUFBQSxnQkFrQkEsS0FBQUMsS0FBQSxHQUFBLEtBQUFYLFdBQUEsQ0FBQW5NLE1BQUEsQ0FsQkE7QUFBQSxhQUFBLENBdkJBO0FBQUEsWUE0Q0EsS0FBQStNLE9BQUEsR0FBQSxZQUFBO0FBQUEsZ0JBQ0EsSUFBQUMsUUFBQSxHQUFBdlEsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUNBNEssWUFBQSxHQUFBeFEsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FEQSxFQUVBNkssY0FBQSxHQUFBelEsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FGQSxFQUdBOEssY0FBQSxHQUFBMVEsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FIQSxFQUlBK0ssaUJBQUEsR0FBQTNRLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxLQUFBLENBSkEsRUFLQWdMLGNBQUEsR0FBQTVRLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxLQUFBLENBTEEsRUFNQWlMLGFBQUEsR0FBQTdRLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxLQUFBLENBTkEsRUFPQWtMLGlCQUFBLEdBQUE5USxRQUFBLENBQUE0RixhQUFBLENBQUEsR0FBQSxDQVBBLEVBUUFtTCxRQUFBLEdBQUEvUSxRQUFBLENBQUE0RixhQUFBLENBQUEsS0FBQSxDQVJBLEVBU0FvTCxlQUFBLEdBQUFoUixRQUFBLENBQUE0RixhQUFBLENBQUEsR0FBQSxDQVRBLEVBVUFxTCxlQUFBLEdBQUFqUixRQUFBLENBQUE0RixhQUFBLENBQUEsR0FBQSxDQVZBLEVBV0F0QyxDQVhBLENBREE7QUFBQSxnQkFjQWlOLFFBQUEsQ0FBQXpQLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGtCQUFBLEVBZEE7QUFBQSxnQkFlQSxLQUFBd1AsUUFBQSxHQUFBQSxRQUFBLENBZkE7QUFBQSxnQkFnQkEsS0FBQVcsa0JBQUEsR0FBQVgsUUFBQSxDQUFBMUssV0FBQSxDQUFBMkssWUFBQSxDQUFBVyxTQUFBLEVBQUEsQ0FBQSxDQWhCQTtBQUFBLGdCQWlCQSxLQUFBRCxrQkFBQSxDQUFBcFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsdUJBQUEsRUFqQkE7QUFBQSxnQkFrQkEsS0FBQW1RLGtCQUFBLENBQUFwUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSwrQkFBQSxFQWxCQTtBQUFBLGdCQW1CQSxLQUFBcVEscUJBQUEsR0FBQWIsUUFBQSxDQUFBMUssV0FBQSxDQUFBMkssWUFBQSxDQUFBLENBbkJBO0FBQUEsZ0JBb0JBLEtBQUFZLHFCQUFBLENBQUF0USxTQUFBLENBQUFDLEdBQUEsQ0FBQSx1QkFBQSxFQXBCQTtBQUFBLGdCQXFCQSxLQUFBcVEscUJBQUEsQ0FBQXRRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLDhCQUFBLEVBckJBO0FBQUEsZ0JBdUJBMFAsY0FBQSxDQUFBM1AsU0FBQSxDQUFBQyxHQUFBLENBQUEsb0JBQUEsRUF2QkE7QUFBQSxnQkF3QkEyUCxjQUFBLENBQUE1UCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxvQkFBQSxFQXhCQTtBQUFBLGdCQXlCQTRQLGlCQUFBLENBQUE3UCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxPQUFBLEVBekJBO0FBQUEsZ0JBMEJBNFAsaUJBQUEsQ0FBQTdQLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGlCQUFBLEVBMUJBO0FBQUEsZ0JBMkJBNFAsaUJBQUEsQ0FBQTdQLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHVCQUFBLEVBM0JBO0FBQUEsZ0JBNEJBNlAsY0FBQSxDQUFBOVAsU0FBQSxDQUFBQyxHQUFBLENBQUEsb0JBQUEsRUE1QkE7QUFBQSxnQkE2QkE4UCxhQUFBLENBQUEvUCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQTdCQTtBQUFBLGdCQThCQStQLGlCQUFBLENBQUFoUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxLQUFBLEVBOUJBO0FBQUEsZ0JBK0JBK1AsaUJBQUEsQ0FBQWhRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGVBQUEsRUEvQkE7QUFBQSxnQkFnQ0ErUCxpQkFBQSxDQUFBTyxZQUFBLENBQUEsTUFBQSxFQUFBLEdBQUEsRUFoQ0E7QUFBQSxnQkFpQ0FQLGlCQUFBLENBQUFPLFlBQUEsQ0FBQSxRQUFBLEVBQUEsUUFBQSxFQWpDQTtBQUFBLGdCQWtDQVAsaUJBQUEsQ0FBQWhMLFNBQUEsR0FBQSxtTEFBQSxDQWxDQTtBQUFBLGdCQW9DQSxLQUFBNEssY0FBQSxHQUFBRCxjQUFBLENBQUE1SyxXQUFBLENBQUE2SyxjQUFBLEVBQUE3SyxXQUFBLENBQUE4SyxpQkFBQSxDQUFBLENBcENBO0FBQUEsZ0JBcUNBRixjQUFBLENBQUE1SyxXQUFBLENBQUE2SyxjQUFBLEVBQUFwRyxLQUFBLENBQUFnSCxPQUFBLEdBQUEsTUFBQSxDQXJDQTtBQUFBLGdCQXNDQSxLQUFBVixjQUFBLEdBQUFILGNBQUEsQ0FBQTVLLFdBQUEsQ0FBQStLLGNBQUEsQ0FBQSxDQXRDQTtBQUFBLGdCQXVDQSxLQUFBQSxjQUFBLENBQUF0RyxLQUFBLENBQUFnSCxPQUFBLEdBQUEsTUFBQSxDQXZDQTtBQUFBLGdCQXdDQSxLQUFBVCxhQUFBLEdBQUFKLGNBQUEsQ0FBQTVLLFdBQUEsQ0FBQWdMLGFBQUEsRUFBQWhMLFdBQUEsQ0FBQWlMLGlCQUFBLENBQUEsQ0F4Q0E7QUFBQSxnQkF5Q0EsS0FBQUQsYUFBQSxDQUFBclEsVUFBQSxDQUFBOEosS0FBQSxDQUFBZ0gsT0FBQSxHQUFBLE1BQUEsQ0F6Q0E7QUFBQSxnQkEyQ0FQLFFBQUEsQ0FBQWpRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGFBQUEsRUEzQ0E7QUFBQSxnQkE0Q0FpUSxlQUFBLENBQUFsUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxpQkFBQSxFQTVDQTtBQUFBLGdCQTZDQWlRLGVBQUEsQ0FBQUssWUFBQSxDQUFBLE1BQUEsRUFBQSxHQUFBLEVBN0NBO0FBQUEsZ0JBOENBTCxlQUFBLENBQUFLLFlBQUEsQ0FBQSxLQUFBLEVBQUEsVUFBQSxFQTlDQTtBQUFBLGdCQStDQUwsZUFBQSxDQUFBbEwsU0FBQSxHQUFBLHdDQUFBLENBL0NBO0FBQUEsZ0JBZ0RBbUwsZUFBQSxHQUFBRCxlQUFBLENBQUFHLFNBQUEsRUFBQSxDQWhEQTtBQUFBLGdCQWlEQUYsZUFBQSxDQUFBbkwsU0FBQSxHQUFBa0wsZUFBQSxDQUFBbEwsU0FBQSxDQWpEQTtBQUFBLGdCQWtEQSxLQUFBa0wsZUFBQSxHQUFBRCxRQUFBLENBQUFsTCxXQUFBLENBQUFtTCxlQUFBLENBQUEsQ0FsREE7QUFBQSxnQkFtREEsS0FBQUEsZUFBQSxDQUFBbFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsc0JBQUEsRUFuREE7QUFBQSxnQkFvREEsS0FBQWtRLGVBQUEsR0FBQUYsUUFBQSxDQUFBbEwsV0FBQSxDQUFBb0wsZUFBQSxDQUFBLENBcERBO0FBQUEsZ0JBcURBLEtBQUFBLGVBQUEsQ0FBQW5RLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHNCQUFBLEVBckRBO0FBQUEsZ0JBdURBLEtBQUFrUSxlQUFBLENBQUFoUixnQkFBQSxDQUFBLE9BQUEsRUFBQSxLQUFBc1IsV0FBQSxDQUFBdk4sSUFBQSxDQUFBO0FBQUEsb0JBQUFzTCxNQUFBLEVBQUEsSUFBQTtBQUFBLG9CQUFBOUosSUFBQSxFQUFBLE1BQUE7QUFBQSxpQkFBQSxDQUFBLEVBdkRBO0FBQUEsZ0JBd0RBLEtBQUF3TCxlQUFBLENBQUEvUSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxLQUFBc1IsV0FBQSxDQUFBdk4sSUFBQSxDQUFBO0FBQUEsb0JBQUFzTCxNQUFBLEVBQUEsSUFBQTtBQUFBLG9CQUFBOUosSUFBQSxFQUFBLE1BQUE7QUFBQSxpQkFBQSxDQUFBLEVBeERBO0FBQUEsZ0JBMERBLEtBQUFpSyxVQUFBLENBQUE1SixXQUFBLENBQUEwSyxRQUFBLEVBMURBO0FBQUEsZ0JBMkRBLEtBQUFkLFVBQUEsQ0FBQTVKLFdBQUEsQ0FBQTRLLGNBQUEsRUEzREE7QUFBQSxnQkE0REEsS0FBQWhCLFVBQUEsQ0FBQTVKLFdBQUEsQ0FBQWtMLFFBQUEsRUE1REE7QUFBQSxnQkE4REEsSUFBQWxRLEtBQUEsR0FBQSxJQUFBLENBOURBO0FBQUEsZ0JBK0RBLE9BQUEsSUFBQTJRLE9BQUEsQ0FBQSxVQUFBQyxPQUFBLEVBQUE7QUFBQSxvQkFFQSxJQUFBQyxZQUFBLEdBQUEsQ0FBQSxDQUZBO0FBQUEsb0JBSUEsU0FBQUMsWUFBQSxDQUFBQyxNQUFBLEVBQUF2QixLQUFBLEVBQUE7QUFBQSx3QkFDQSxJQUFBdUIsTUFBQSxJQUFBdkIsS0FBQSxFQUFBO0FBQUEsNEJBQ0FvQixPQUFBLENBQUE1USxLQUFBLEVBREE7QUFBQSx5QkFEQTtBQUFBLHFCQUpBO0FBQUEsb0JBUUEsQ0FSQTtBQUFBLG9CQVVBLEtBQUF5QyxDQUFBLElBQUF6QyxLQUFBLENBQUE2TyxXQUFBLEVBQUE7QUFBQSx3QkFDQSxJQUFBVSxVQUFBLEdBQUF2UCxLQUFBLENBQUE2TyxXQUFBLENBQUFwTSxDQUFBLENBQUEsRUFDQXVPLFFBQUEsR0FBQSxJQUFBakQsS0FBQSxFQURBLEVBRUFrRCxVQUFBLEdBQUE5UixRQUFBLENBQUE0RixhQUFBLENBQUEsTUFBQSxDQUZBLENBREE7QUFBQSx3QkFLQWtNLFVBQUEsQ0FBQWhSLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHVCQUFBLEVBTEE7QUFBQSx3QkFPQThRLFFBQUEsQ0FBQWhELEdBQUEsR0FBQXVCLFVBQUEsQ0FBQXpCLEdBQUEsQ0FQQTtBQUFBLHdCQVFBa0QsUUFBQSxDQUFBL0MsTUFBQSxHQUFBLFlBQUE7QUFBQSw0QkFDQU4sT0FBQSxDQUFBQyxHQUFBLENBQUEsS0FBQUksR0FBQSxHQUFBLHNCQUFBLEVBREE7QUFBQSw0QkFFQTZDLFlBQUEsR0FGQTtBQUFBLDRCQUdBQyxZQUFBLENBQUFELFlBQUEsRUFBQTdRLEtBQUEsQ0FBQXdQLEtBQUEsRUFIQTtBQUFBLHlCQUFBLENBUkE7QUFBQSx3QkFhQXdCLFFBQUEsQ0FBQTdDLE9BQUEsR0FBQSxZQUFBO0FBQUEsNEJBQ0FSLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLEtBQUFJLEdBQUEsR0FBQSx5QkFBQSxFQURBO0FBQUEsNEJBRUE2QyxZQUFBLEdBRkE7QUFBQSw0QkFHQUMsWUFBQSxDQUFBRCxZQUFBLEVBQUE3USxLQUFBLENBQUF3UCxLQUFBLEVBSEE7QUFBQSx5QkFBQSxDQWJBO0FBQUEsd0JBbUJBeFAsS0FBQSxDQUFBb1EsZUFBQSxDQUFBcEwsV0FBQSxDQUFBaU0sVUFBQSxFQUFBak0sV0FBQSxDQUFBZ00sUUFBQSxFQW5CQTtBQUFBLHdCQW9CQWhSLEtBQUEsQ0FBQW1RLGVBQUEsQ0FBQW5MLFdBQUEsQ0FBQWlNLFVBQUEsQ0FBQVgsU0FBQSxFQUFBLEVBQUF0TCxXQUFBLENBQUFnTSxRQUFBLENBQUFWLFNBQUEsRUFBQSxFQXBCQTtBQUFBLHFCQVZBO0FBQUEsaUJBQUEsQ0FBQSxDQS9EQTtBQUFBLGFBQUEsQ0E1Q0E7QUFBQSxZQWdKQSxLQUFBWSxXQUFBLEdBQUEsVUFBQUMsVUFBQSxFQUFBeE0sSUFBQSxFQUFBO0FBQUEsZ0JBQ0EsSUFBQXlNLE9BQUEsR0FBQSxLQUFBdEMsY0FBQSxFQUNBdUMsSUFBQSxHQUFBLEtBQUFDLFVBQUEsQ0FBQUYsT0FBQSxDQURBLEVBRUFHLElBQUEsR0FBQSxLQUFBQyxVQUFBLENBQUFKLE9BQUEsQ0FGQSxFQUdBSyxPQUFBLEdBQUEsS0FBQUgsVUFBQSxDQUFBSCxVQUFBLENBSEEsRUFJQU8sT0FBQSxHQUFBLEtBQUFGLFVBQUEsQ0FBQUwsVUFBQSxDQUpBLEVBS0FuUixLQUFBLEdBQUEsSUFMQSxDQURBO0FBQUEsZ0JBUUEsT0FBQSxJQUFBMlEsT0FBQSxDQUFBLFVBQUFDLE9BQUEsRUFBQTtBQUFBLG9CQUVBLENBQUFqTSxJQUFBLElBQUEsTUFBQSxHQUFBM0UsS0FBQSxDQUFBb1EsZUFBQSxHQUFBcFEsS0FBQSxDQUFBbVEsZUFBQSxDQUFBLENBQUE3USxzQkFBQSxDQUFBLHVCQUFBLEVBQUFxRixJQUFBLElBQUEsTUFBQSxHQUFBME0sSUFBQSxHQUFBRSxJQUFBLEVBQUF0UixTQUFBLENBQUFDLEdBQUEsQ0FBQSxnQ0FBQSxFQUZBO0FBQUEsb0JBR0EsQ0FBQXlFLElBQUEsSUFBQSxNQUFBLEdBQUEzRSxLQUFBLENBQUFvUSxlQUFBLEdBQUFwUSxLQUFBLENBQUFtUSxlQUFBLENBQUEsQ0FBQTdRLHNCQUFBLENBQUEsdUJBQUEsRUFBQXFGLElBQUEsSUFBQSxNQUFBLEdBQUEwTSxJQUFBLEdBQUFFLElBQUEsRUFBQXRSLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLDhCQUFBLEVBSEE7QUFBQSxvQkFJQSxDQUFBd0UsSUFBQSxJQUFBLE1BQUEsR0FBQTNFLEtBQUEsQ0FBQW9RLGVBQUEsR0FBQXBRLEtBQUEsQ0FBQW1RLGVBQUEsQ0FBQSxDQUFBN1Esc0JBQUEsQ0FBQSx1QkFBQSxFQUFBcUYsSUFBQSxJQUFBLE1BQUEsR0FBQThNLE9BQUEsR0FBQUMsT0FBQSxFQUFBelIsU0FBQSxDQUFBQyxHQUFBLENBQUEsOEJBQUEsRUFKQTtBQUFBLG9CQU1BLENBQUF5RSxJQUFBLElBQUEsTUFBQSxHQUFBM0UsS0FBQSxDQUFBb1EsZUFBQSxHQUFBcFEsS0FBQSxDQUFBbVEsZUFBQSxDQUFBLENBQUE3USxzQkFBQSxDQUFBLGdDQUFBLEVBQUEsQ0FBQSxFQUFBRixnQkFBQSxDQUFBLGVBQUEsRUFBQSxZQUFBO0FBQUEsd0JBQ0EsS0FBQWEsU0FBQSxDQUFBRSxNQUFBLENBQUEsZ0NBQUEsRUFEQTtBQUFBLHdCQUVBeVEsT0FBQSxDQUFBLElBQUEsRUFGQTtBQUFBLHFCQUFBLEVBTkE7QUFBQSxpQkFBQSxDQUFBLENBUkE7QUFBQSxhQUFBLENBaEpBO0FBQUEsWUF1S0EsS0FBQWUsYUFBQSxHQUFBLFVBQUFQLE9BQUEsRUFBQTtBQUFBLGdCQUVBLElBQUFRLFdBQUEsR0FBQSxLQUFBL0MsV0FBQSxDQUFBdUMsT0FBQSxDQUFBLENBRkE7QUFBQSxnQkFJQSxJQUFBUSxXQUFBLENBQUFoSixLQUFBLEVBQUE7QUFBQSxvQkFDQSxLQUFBaUgsY0FBQSxDQUFBNUssU0FBQSxHQUFBMk0sV0FBQSxDQUFBaEosS0FBQSxDQURBO0FBQUEsb0JBRUEsS0FBQWlILGNBQUEsQ0FBQWxRLFVBQUEsQ0FBQThKLEtBQUEsQ0FBQWdILE9BQUEsR0FBQSxFQUFBLENBRkE7QUFBQSxpQkFBQSxNQUdBO0FBQUEsb0JBQ0EsS0FBQVosY0FBQSxDQUFBbFEsVUFBQSxDQUFBOEosS0FBQSxDQUFBZ0gsT0FBQSxHQUFBLE1BQUEsQ0FEQTtBQUFBLGlCQVBBO0FBQUEsZ0JBV0EsSUFBQW1CLFdBQUEsQ0FBQUMsS0FBQSxFQUFBO0FBQUEsb0JBQ0EsS0FBQTlCLGNBQUEsQ0FBQTlLLFNBQUEsR0FBQTJNLFdBQUEsQ0FBQUMsS0FBQSxDQURBO0FBQUEsb0JBRUEsS0FBQTlCLGNBQUEsQ0FBQXRHLEtBQUEsQ0FBQWdILE9BQUEsR0FBQSxFQUFBLENBRkE7QUFBQSxpQkFBQSxNQUdBO0FBQUEsb0JBQ0EsS0FBQVYsY0FBQSxDQUFBdEcsS0FBQSxDQUFBZ0gsT0FBQSxHQUFBLE1BQUEsQ0FEQTtBQUFBLGlCQWRBO0FBQUEsZ0JBa0JBLElBQUFtQixXQUFBLENBQUFoRixJQUFBLEVBQUE7QUFBQSxvQkFDQSxLQUFBb0QsYUFBQSxDQUFBUSxZQUFBLENBQUEsTUFBQSxFQUFBb0IsV0FBQSxDQUFBaEYsSUFBQSxFQURBO0FBQUEsb0JBRUEsS0FBQW9ELGFBQUEsQ0FBQXJRLFVBQUEsQ0FBQThKLEtBQUEsQ0FBQWdILE9BQUEsR0FBQSxFQUFBLENBRkE7QUFBQSxpQkFBQSxNQUdBO0FBQUEsb0JBQ0EsS0FBQVQsYUFBQSxDQUFBclEsVUFBQSxDQUFBOEosS0FBQSxDQUFBZ0gsT0FBQSxHQUFBLE1BQUEsQ0FEQTtBQUFBLGlCQXJCQTtBQUFBLGFBQUEsQ0F2S0E7QUFBQSxZQWtNQSxLQUFBcUIsWUFBQSxHQUFBLFVBQUFWLE9BQUEsRUFBQXpCLFlBQUEsRUFBQTtBQUFBLGdCQUNBLElBQUFpQyxXQUFBLEdBQUEsS0FBQS9DLFdBQUEsQ0FBQXVDLE9BQUEsQ0FBQSxFQUNBdEQsR0FBQSxHQUFBM08sUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FEQSxDQURBO0FBQUEsZ0JBSUEsT0FBQSxJQUFBNEwsT0FBQSxDQUFBLFVBQUFDLE9BQUEsRUFBQTtBQUFBLG9CQUVBOUMsR0FBQSxDQUFBRSxHQUFBLEdBQUE0RCxXQUFBLENBQUE5RCxHQUFBLENBRkE7QUFBQSxvQkFJQSxJQUFBNkIsWUFBQSxDQUFBMVAsU0FBQSxDQUFBUSxRQUFBLENBQUEsK0JBQUEsQ0FBQSxFQUFBO0FBQUEsd0JBQ0FrUCxZQUFBLENBQUExUCxTQUFBLENBQUFFLE1BQUEsQ0FBQSwrQkFBQSxFQURBO0FBQUEsd0JBRUF3UCxZQUFBLENBQUExUCxTQUFBLENBQUFDLEdBQUEsQ0FBQSw4QkFBQSxFQUZBO0FBQUEsd0JBR0F5UCxZQUFBLENBQUExSyxTQUFBLEdBQUEsRUFBQSxDQUhBO0FBQUEscUJBQUEsTUFJQTtBQUFBLHdCQUNBMEssWUFBQSxDQUFBM0ssV0FBQSxDQUFBOEksR0FBQSxFQUFBbk8sVUFBQSxDQUFBTSxTQUFBLENBQUFFLE1BQUEsQ0FBQSw4QkFBQSxFQURBO0FBQUEsd0JBRUF3UCxZQUFBLENBQUExUCxTQUFBLENBQUFDLEdBQUEsQ0FBQSwrQkFBQSxFQUZBO0FBQUEscUJBUkE7QUFBQSxvQkFhQXlQLFlBQUEsQ0FBQXZRLGdCQUFBLENBQUEsZUFBQSxFQUFBLFlBQUE7QUFBQSx3QkFDQXdSLE9BQUEsR0FEQTtBQUFBLHFCQUFBLEVBYkE7QUFBQSxpQkFBQSxDQUFBLENBSkE7QUFBQSxhQUFBLENBbE1BO0FBQUEsWUEwTkEsS0FBQUYsV0FBQSxHQUFBLFVBQUFyUSxDQUFBLEVBQUE7QUFBQSxnQkFDQUEsQ0FBQSxDQUFBc0QsY0FBQSxHQURBO0FBQUEsZ0JBR0EsSUFBQSxLQUFBOEssTUFBQSxDQUFBTSxJQUFBLEVBQUE7QUFBQSxvQkFFQSxJQUFBcUMsT0FBQSxHQUFBLEtBQUEzQyxNQUFBLENBQUFLLGNBQUEsRUFDQXFDLFVBQUEsR0FBQSxLQUFBeE0sSUFBQSxJQUFBLE1BQUEsR0FBQSxLQUFBOEosTUFBQSxDQUFBNkMsVUFBQSxDQUFBRixPQUFBLENBQUEsR0FBQSxLQUFBM0MsTUFBQSxDQUFBK0MsVUFBQSxDQUFBSixPQUFBLENBREEsQ0FGQTtBQUFBLG9CQUtBLEtBQUEzQyxNQUFBLENBQUFNLElBQUEsR0FBQSxLQUFBLENBTEE7QUFBQSxvQkFNQSxLQUFBTixNQUFBLENBQUFzRCxhQUFBLENBQUE7QUFBQSx3QkFDQSxLQUFBdEQsTUFBQSxDQUFBeUMsV0FBQSxDQUFBQyxVQUFBLEVBQUEsTUFBQSxDQURBO0FBQUEsd0JBRUEsS0FBQTFDLE1BQUEsQ0FBQXlDLFdBQUEsQ0FBQUMsVUFBQSxFQUFBLE1BQUEsQ0FGQTtBQUFBLHdCQUdBLEtBQUExQyxNQUFBLENBQUFxRCxZQUFBLENBQUFYLFVBQUEsRUFBQSxLQUFBMUMsTUFBQSxDQUFBNEIsa0JBQUEsQ0FIQTtBQUFBLHdCQUlBLEtBQUE1QixNQUFBLENBQUFxRCxZQUFBLENBQUFYLFVBQUEsRUFBQSxLQUFBMUMsTUFBQSxDQUFBOEIscUJBQUEsQ0FKQTtBQUFBLHFCQUFBLEVBTkE7QUFBQSxvQkFhQSxLQUFBOUIsTUFBQSxDQUFBa0QsYUFBQSxDQUFBUixVQUFBLEVBYkE7QUFBQSxvQkFlQSxLQUFBMUMsTUFBQSxDQUFBSyxjQUFBLEdBQUFxQyxVQUFBLENBZkE7QUFBQSxpQkFIQTtBQUFBLGFBQUEsQ0ExTkE7QUFBQSxZQWtQQSxLQUFBRyxVQUFBLEdBQUEsVUFBQUYsT0FBQSxFQUFBO0FBQUEsZ0JBQ0FBLE9BQUEsR0FEQTtBQUFBLGdCQUVBLE9BQUFBLE9BQUEsR0FBQSxLQUFBNUIsS0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUE0QixPQUFBLENBRkE7QUFBQSxhQUFBLENBbFBBO0FBQUEsWUF1UEEsS0FBQUksVUFBQSxHQUFBLFVBQUFKLE9BQUEsRUFBQTtBQUFBLGdCQUNBQSxPQUFBLEdBREE7QUFBQSxnQkFFQSxPQUFBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLEtBQUE1QixLQUFBLEdBQUEsQ0FBQSxHQUFBNEIsT0FBQSxDQUZBO0FBQUEsYUFBQSxDQXZQQTtBQUFBLFlBNFBBLEtBQUFXLGFBQUEsR0FBQSxVQUFBQyxHQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBaFMsS0FBQSxHQUFBLElBQUEsQ0FEQTtBQUFBLGdCQUVBMlEsT0FBQSxDQUFBc0IsR0FBQSxDQUFBRCxHQUFBLEVBQUFFLElBQUEsQ0FBQSxVQUFBQyxPQUFBLEVBQUE7QUFBQSxvQkFDQW5TLEtBQUEsQ0FBQStPLElBQUEsR0FBQSxJQUFBLENBREE7QUFBQSxvQkFFQXBCLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLGVBQUEsRUFGQTtBQUFBLGlCQUFBLEVBRkE7QUFBQSxhQUFBLENBNVBBO0FBQUEsWUFvUUEsS0FBQTFLLElBQUEsR0FBQSxZQUFBO0FBQUEsZ0JBRUEsS0FBQW1NLFFBQUEsR0FGQTtBQUFBLGdCQUlBLElBQUEsS0FBQVIsV0FBQSxDQUFBbk0sTUFBQSxLQUFBLENBQUE7QUFBQSxvQkFBQSxPQUpBO0FBQUEsZ0JBTUEsS0FBQStNLE9BQUEsR0FBQXlDLElBQUEsQ0FBQSxVQUFBekQsTUFBQSxFQUFBO0FBQUEsb0JBRUFBLE1BQUEsQ0FBQUcsVUFBQSxDQUFBM08sU0FBQSxDQUFBQyxHQUFBLENBQUEsZUFBQSxFQUZBO0FBQUEsb0JBSUF1TyxNQUFBLENBQUFzRCxhQUFBLENBQUE7QUFBQSx3QkFDQXRELE1BQUEsQ0FBQXlDLFdBQUEsQ0FBQXpDLE1BQUEsQ0FBQUssY0FBQSxFQUFBLE1BQUEsQ0FEQTtBQUFBLHdCQUVBTCxNQUFBLENBQUF5QyxXQUFBLENBQUF6QyxNQUFBLENBQUFLLGNBQUEsRUFBQSxNQUFBLENBRkE7QUFBQSx3QkFHQUwsTUFBQSxDQUFBcUQsWUFBQSxDQUFBckQsTUFBQSxDQUFBSyxjQUFBLEVBQUFMLE1BQUEsQ0FBQTRCLGtCQUFBLENBSEE7QUFBQSx3QkFJQTVCLE1BQUEsQ0FBQXFELFlBQUEsQ0FBQXJELE1BQUEsQ0FBQUssY0FBQSxFQUFBTCxNQUFBLENBQUE4QixxQkFBQSxDQUpBO0FBQUEscUJBQUEsRUFKQTtBQUFBLG9CQVdBOUIsTUFBQSxDQUFBa0QsYUFBQSxDQUFBbEQsTUFBQSxDQUFBSyxjQUFBLEVBWEE7QUFBQSxvQkFhQW5CLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLE9BQUEsRUFiQTtBQUFBLGlCQUFBLEVBTkE7QUFBQSxhQUFBLENBcFFBO0FBQUEsU0FOQTtBQUFBLFFBcVNBLFNBQUFuTCxDQUFBLElBQUFnTSxNQUFBLEVBQUE7QUFBQSxZQUNBLElBQUEsT0FBQUEsTUFBQSxDQUFBaE0sQ0FBQSxDQUFBLElBQUEsUUFBQTtBQUFBLGdCQUFBLFNBREE7QUFBQSxZQUVBLElBQUEyUCxDQUFBLEdBQUEsSUFBQTFELE1BQUEsQ0FBQUQsTUFBQSxDQUFBaE0sQ0FBQSxDQUFBLENBQUEsQ0FGQTtBQUFBLFlBR0EyUCxDQUFBLENBQUFsUCxJQUFBLEdBSEE7QUFBQSxTQXJTQTtBQUFBLEtBQUEsSUFGQTtBQUFBLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgYmxvY2tCbG9nTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1saXN0JylbMF07XHJcblx0XHRcclxuXHRcdGlmKCFibG9ja0Jsb2dNZW51KSByZXR1cm47XHJcblxyXG5cdFx0dmFyIEJsb2dNZW51ID0gZnVuY3Rpb24oYmxvY2spIHtcclxuXHJcblx0XHRcdHRoaXMuYmxvZ01lbnUgPSBibG9jaztcclxuXHJcblx0XHRcdHRoaXMuYmxvZ1dyYXAgPSBibG9jay5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5ibG9nQ29udGFpbmVyID0gYmxvY2sucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5tb2JpbGVTdGF0dXMgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgYnV0dG9uQmxvZ01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nX19uYXYtYnV0dG9uJylbMF0sXHJcblx0XHRcdFx0XHQkdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdGlmKCFidXR0b25CbG9nTWVudSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRidXR0b25CbG9nTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdCR0aGF0Lm1vYmlsZVN0YXR1cyA9ICEkdGhhdC5tb2JpbGVTdGF0dXM7XHJcblx0XHRcdFx0XHRpZigkdGhhdC5tb2JpbGVTdGF0dXMpIHtcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbkJsb2dNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmJsb2dXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0XHRcdGlmKCEkdGhhdC5tb2JpbGVTdGF0dXMpIHJldHVybjtcclxuXHRcdFx0XHRcdHZhciBlbGVtZW50ID0gZS50YXJnZXQsXHJcblx0XHRcdFx0XHRcdGhpZGUgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdHdoaWxlKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ19zaG93ZWQtYmxvZy1tZW51JykpIHtcclxuXHRcdFx0XHRcdFx0XHRoaWRlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmKGhpZGUpIHtcclxuXHRcdFx0XHRcdFx0JHRoYXQubW9iaWxlU3RhdHVzID0gISR0aGF0Lm1vYmlsZVN0YXR1cztcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZml4ZWQgPSBmdW5jdGlvbiBmaXhlZChlKSB7XHJcblxyXG5cdFx0XHRcdHZhciBjb250YWluZXIgPSB0aGlzLmJsb2dDb250YWluZXIsXHJcblx0XHRcdFx0XHRtZW51ID0gdGhpcy5ibG9nTWVudSxcclxuXHRcdFx0XHRcdHdyYXAgPSB0aGlzLmJsb2dXcmFwLFxyXG5cdFx0XHRcdFx0d3JhcFBvcyA9IHdyYXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdFx0XHRjb250YWluZXJIZWlnaHQsXHJcblx0XHRcdFx0XHRtZW51SGVpZ2h0LFxyXG5cdFx0XHRcdFx0Zml4ZWRTdGFydCxcclxuXHRcdFx0XHRcdGZpeGVkU3RvcCxcclxuXHRcdFx0XHRcdHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRcdG1lbnVIZWlnaHQgPSBtZW51Lm9mZnNldEhlaWdodDtcclxuXHRcdFx0XHRcdGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdFx0XHRmaXhlZFN0YXJ0ID0gc2Nyb2xsVG9wICsgd3JhcFBvcy50b3A7XHJcblx0XHRcdFx0XHRmaXhlZFN0b3AgPSAgZml4ZWRTdGFydCArIGNvbnRhaW5lckhlaWdodCAtIChtZW51SGVpZ2h0ICsgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5wYWRkaW5nQm90dG9tKSk7XHJcblxyXG5cdFx0XHRcdGlmKHNjcm9sbFRvcCA8PSBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihzY3JvbGxUb3AgPiBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9pbi1ib3R0b20nIDogJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5hZGQoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9maXhlZCcgOiAnYmxvZ19fbmF2LWxpc3RfaW4tYm90dG9tJyk7XHRcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuY2hlY2tBY3RpdmUgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LFxyXG5cdFx0XHRcdFx0bWVudUl0ZW1zTGlua3MgPSB0aGlzLmJsb2dNZW51LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1pdGVtLWxuaycpLFxyXG5cdFx0XHRcdFx0YmxvZ0l0ZW1JZCxcclxuXHRcdFx0XHRcdGJsb2dJdGVtLFxyXG5cdFx0XHRcdFx0YWN0aXZlSWQsXHJcblx0XHRcdFx0XHRtaW5Ub3AsXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wLFxyXG5cdFx0XHRcdFx0aTtcclxuXHJcblx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3MubGVuZ3RoID09IDApIHJldHVybjtcclxuXHJcblx0XHRcdFx0Zm9yKGkgaW4gbWVudUl0ZW1zTGlua3MpIHtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRibG9nSXRlbUlkID0gbWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2goLyMoLiopL2kpWzFdO1xyXG5cdFx0XHRcdFx0YmxvZ0l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChibG9nSXRlbUlkKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYoIWJsb2dJdGVtKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wID0gTWF0aC5hYnMoYmxvZ0l0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWluVG9wID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHRtaW5Ub3AgPSBjdXJyZW50VG9wO1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVJZCA9IGJsb2dJdGVtSWQ7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fSBcclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50VG9wIDwgbWluVG9wKSB7XHJcblx0XHRcdFx0XHRcdG1pblRvcCA9IGN1cnJlbnRUb3A7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZUlkID0gYmxvZ0l0ZW1JZDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHRcdGlmKGFjdGl2ZUlkKSB7XHJcblx0XHRcdFx0XHR2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoJyMnICsgYWN0aXZlSWQgKyAnJCcsICdpJyk7XHJcblx0XHRcdFx0XHRmb3IoaSBpbiBtZW51SXRlbXNMaW5rcykge1xyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHRcdFx0bWVudUl0ZW1zTGlua3NbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZ19fbmF2LWl0ZW0tbG5rX2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2gocGF0dGVybikpIHtcclxuXHRcdFx0XHRcdFx0XHRtZW51SXRlbXNMaW5rc1tpXS5jbGFzc0xpc3QuYWRkKCdibG9nX19uYXYtaXRlbS1sbmtfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuY2hlY2tBY3RpdmUoKTtcdFxyXG5cdFx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUoKTtcclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5maXhlZC5iaW5kKHsnYmxvZ0NvbnRhaW5lcicgOiB0aGlzLmJsb2dDb250YWluZXIsICdibG9nTWVudScgOiB0aGlzLmJsb2dNZW51LCAnYmxvZ1dyYXAnIDogdGhpcy5ibG9nV3JhcH0pKTtcdFxyXG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpeGVkLmJpbmQoeydibG9nQ29udGFpbmVyJyA6IHRoaXMuYmxvZ0NvbnRhaW5lciwgJ2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnUsICdibG9nV3JhcCcgOiB0aGlzLmJsb2dXcmFwfSkpO1x0XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtZW51ID0gbmV3IEJsb2dNZW51KGJsb2NrQmxvZ01lbnUpO1xyXG5cdFx0bWVudS5pbml0KCk7XHJcblxyXG5cdH0pKClcclxufSk7IiwiLy8gJChmdW5jdGlvbigpe1xyXG5cclxuLy8gXHQvLyBGbGlwcGVyIHRyaWdnZXJcclxuLy8gXHQoZnVuY3Rpb24oKXtcclxuXHJcbi8vIFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZsaXBwZXItdHJpZ2dlcicsIGZ1bmN0aW9uKGUpe1xyXG4vLyBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICBcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4vLyAgXHRcdFx0dmFyIGZsaXBJZCA9ICQodGhpcykuYXR0cignZGF0YS1mbGlwLWlkJyk7XHJcbi8vICBcdFx0XHR2YXIgZmxpcHBlciA9ICQoJy5mbGlwcGVyW2RhdGEtZmxpcC1pZCA9ICcgKyBmbGlwSWQgKyAnXScpO1xyXG5cclxuLy8gIFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKCdmbGlwcGVyLXRyaWdnZXJfYmFjaycpKSB7XHJcbi8vICBcdFx0XHRcdGZsaXBwZXIuYWRkQ2xhc3MoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcbi8vICBcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdmbGlwcGVyLXRyaWdnZXJfaGlkZGVuJyk7XHJcbi8vICBcdFx0XHR9IGVsc2Uge1xyXG4vLyAgXHRcdFx0XHRmbGlwcGVyLnJlbW92ZUNsYXNzKCdmbGlwcGVyX3R1cm5lZCcpO1xyXG4vLyAgXHRcdFx0XHQkKCcuZmxpcHBlci10cmlnZ2VyX2JhY2snKS5yZW1vdmVDbGFzcygnZmxpcHBlci10cmlnZ2VyX2hpZGRlbicpO1xyXG4vLyAgXHRcdFx0fVxyXG5cclxuLy8gXHRcdH0pO1xyXG5cclxuLy8gXHR9KSgpXHJcblxyXG4vLyB9KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmxpcHBlci10cmlnZ2VyJyksXHJcblx0XHRcdGJ0bkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmbGlwcGVyLXRyaWdnZXJfYmFjaycpWzBdLFxyXG5cdFx0XHRpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHR1cm5GbGlwcGVyKGZsaXBJZCkge1xyXG5cdCBcdFx0XHRcclxuXHQgXHRcdFx0dmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcltkYXRhLWZsaXAtaWQgPSAnICsgZmxpcElkICsgJ10nKTtcclxuXHQgXHRcdFx0aWYoIWZsaXBwZXIpIHJldHVybiBmYWxzZTtcclxuXHJcblx0IFx0XHRcdGlmKGZsaXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVyX3R1cm5lZCcpKSB7XHJcblx0XHRcdFx0XHRmbGlwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcblx0XHRcdFx0XHRpZihidG5CYWNrKSBidG5CYWNrLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGZsaXBwZXIuY2xhc3NMaXN0LmFkZCgnZmxpcHBlcl90dXJuZWQnKTtcclxuIFx0XHRcdFx0XHRpZihidG5CYWNrKSBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0fVx0XHRcclxuXHJcblx0XHRmb3IoaSBpbiB0cmlnZ2VyKSB7XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgdHJpZ2dlcltpXS5hZGRFdmVudExpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSBjb250aW51ZTtcclxuXHJcblx0XHRcdHRyaWdnZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHZhciBmbGlwSWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlwLWlkJyk7XHJcblx0XHRcdFx0dHVybkZsaXBwZXIoZmxpcElkKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZih3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywnJykgPT0gJ2xvZ2luJykge1xyXG5cdFx0XHR0dXJuRmxpcHBlcignbWFpbicpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0fSkoKVxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuLy9GT1JNU1x0XHJcbnZhciBhbGxGb3JtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJyksXHJcblx0YWpheEZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWpheC1mb3JtJyksXHJcblx0aSxcclxuXHRmb3JtcyA9IChmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBpLFxyXG5cdFx0XHRtaW5MZW5ndGggPSAzLFxyXG5cdFx0XHR0aXBDbGFzcyA9ICdmb3JtX190aXAnLFxyXG5cdFx0XHR0aXBDbGFzc1Zpc2libGUgPSAnZm9ybV9fdGlwX3Zpc2libGUnLFxyXG5cdFx0XHRtZXNzYWdlQ2xhc3MgPSAnZm9ybV9fdGlwLW1lc3NhZ2UnLFxyXG5cdFx0XHRtZXNzYWdlVGV4dCA9IHtcclxuXHRcdFx0XHQncmVxdWlyZWQnIDogJ9Cf0L7Qu9C1INC90LUg0LfQsNC/0L7Qu9C90LXQvdC+JyxcclxuXHRcdFx0XHQncGF0dGVybicgOiAn0JfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQvdC1INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGE0L7RgNC80LDRgtGDJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbGVtZW50Q2xhc3NFcnJvciA9ICdfZXJyb3InO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRzaG93VGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcdFxyXG5cdFx0XHRcdFx0dHlwZU1lc3NhZ2VDbGFzcyA9IG1lc3NhZ2VDbGFzcyArICdfJyArIHR5cGVFcnIsXHJcblx0XHRcdFx0XHRtZXNzYWdlO1xyXG5cclxuXHRcdFx0XHRpZighdGlwKSB7XHJcblx0XHRcdFx0XHR2YXIgdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3MpO1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHRpcCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKCFtZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0bWVzc2FnZS5jbGFzc0xpc3QuYWRkKG1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmNsYXNzTGlzdC5hZGQodHlwZU1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmlubmVySFRNTCA9IG1lc3NhZ2VUZXh0W3R5cGVFcnJdO1xyXG5cclxuXHRcdFx0XHRcdHRpcC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3NWaXNpYmxlKTtcdFx0XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRoaWRlVGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcclxuXHRcdFx0XHRcdHR5cGVNZXNzYWdlQ2xhc3MgPSBtZXNzYWdlQ2xhc3MgKyAnXycgKyB0eXBlRXJyLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTtcclxuXHJcblx0XHRcdFx0aWYoIXRpcCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdHRpcC5yZW1vdmVDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0aWYoIXRpcC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG1lc3NhZ2VDbGFzcykubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHR0aXAuY2xhc3NMaXN0LnJlbW92ZSh0aXBDbGFzc1Zpc2libGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNsZWFyT25Gb2N1czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHRyaWdnZXJUaXA6IGZ1bmN0aW9uKGVsZW1lbnQsIGNvbmQsIHR5cGVFcnIpIHtcclxuXHRcdFx0XHRpZihjb25kKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNob3dUaXAoZWxlbWVudCwgdHlwZUVycik7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaGlkZVRpcChlbGVtZW50LCB0eXBlRXJyKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNoZWNrUmVxdWlyZWQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHR2YXIgdHlwZUVyciA9ICdyZXF1aXJlZCcsXHJcblx0XHRcdFx0XHRjb25kO1xyXG5cclxuXHRcdFx0XHRzd2l0Y2goZWxlbWVudC50eXBlKSB7XHJcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6IFxyXG5cdFx0XHRcdFx0XHRjb25kID0gKGVsZW1lbnQucmVxdWlyZWQgJiYgIWVsZW1lbnQuY2hlY2tlZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcclxuXHRcdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnJlcXVpcmVkICYmICFlbGVtZW50LmNoZWNrZWQpO1xyXG5cdFx0XHRcdFx0XHRpZighZWxlbWVudC5yZXF1aXJlZCkgcmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdGNvbmQgPSAoZWxlbWVudC5yZXF1aXJlZCAmJiBlbGVtZW50LnZhbHVlLmxlbmd0aCA8IDMpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRyaWdnZXJUaXAoZWxlbWVudCwgY29uZCwgdHlwZUVycik7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRjaGVja1BhdHRlcm46IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZighZWxlbWVudC52YWx1ZSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHRcdHZhciB0eXBlRXJyID0gJ3BhdHRlcm4nLFxyXG5cdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnBhdHRlcm4gJiYgIWVsZW1lbnQudmFsdWUubWF0Y2gobmV3IFJlZ0V4cChlbGVtZW50LnBhdHRlcm4sICdpJykpKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudHJpZ2dlclRpcChlbGVtZW50LCBjb25kLCB0eXBlRXJyKTtcdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Y2hlY2tWYWxpZGF0aW9uOiBmdW5jdGlvbihlbGVtZW50LCBzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHR2YXIgZWxlbWVudElzVmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdGlmKCF0aGlzLmNoZWNrUmVxdWlyZWQoZWxlbWVudCkpIGVsZW1lbnRJc1ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0aWYoIXRoaXMuY2hlY2tQYXR0ZXJuKGVsZW1lbnQpKSBlbGVtZW50SXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZihzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHRcdGlmKCFlbGVtZW50SXNWYWxpZCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBlbGVtZW50SXNWYWxpZDtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHZhbGlkYXRlRm9ybTogZnVuY3Rpb24oZm9ybSkge1xyXG5cdFx0XHRcdHZhciBpbnB1dCA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JyksXHJcblx0XHRcdFx0XHR0ZXh0YXJlYSA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHRhcmVhJyksXHJcblx0XHRcdFx0XHRlbGVtZW50cyA9IFtdLFxyXG5cdFx0XHRcdFx0Zm9ybUlzVmFsaWQgPSB0cnVlLFxyXG5cdFx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoaW5wdXRbaV0pO1xyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IHRleHRhcmVhLmxlbmd0aDsgaSsrKSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdCh0ZXh0YXJlYVtpXSk7XHJcblxyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVsZW1lbnRWYWxpZGF0aW9uID0gJHRoYXQuY2hlY2tWYWxpZGF0aW9uKGVsZW1lbnRzW2ldLCB0cnVlKTtcclxuXHRcdFx0XHRcdGZvcm1Jc1ZhbGlkID0gZm9ybUlzVmFsaWQgPyBlbGVtZW50VmFsaWRhdGlvbiA6IGZvcm1Jc1ZhbGlkO1xyXG5cclxuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLm9ua2V5dXAgPSBlbGVtZW50c1tpXS5vbmlucHV0ID0gZWxlbWVudHNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkdGhhdC5jaGVja1ZhbGlkYXRpb24odGhpcyk7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0ub25wcm9wZXJ0eWNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGUucHJvcGVydHlOYW1lID09ICd2YWx1ZScpICR0aGF0LmNoZWNrVmFsaWRhdGlvbih0aGlzKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmN1dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCR0aGF0LmNoZWNrVmFsaWRhdGlvbihlbGVtZW50c1tpXSksIDApOyBcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdHZhciB0aXBzID0gZm9ybS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKTtcclxuXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmNsZWFyT25Gb2N1cy5iaW5kKGVsZW1lbnRzW2ldKSgpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmtleXVwID0gZWxlbWVudHNbaV0ub25pbnB1dCA9IGVsZW1lbnRzW2ldLm9uY2xpY2sgPSBlbGVtZW50c1tpXS5vbnByb3BlcnR5Y2hhbmdlID0gZWxlbWVudHNbaV0ub25jdXQgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yKGkgPSB0aXBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHRcdHRpcHNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aXBzW2ldKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZvcm1Jc1ZhbGlkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KSgpXHJcblxyXG5cdGZvcihpID0gMDsgaSA8IGFsbEZvcm1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRhbGxGb3Jtc1tpXS5ub1ZhbGlkYXRlID0gdHJ1ZTtcclxuXHRcdGFsbEZvcm1zW2ldLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRyZXR1cm4gZm9ybXMudmFsaWRhdGVGb3JtKHRoaXMpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRmb3IoaSA9IDA7IGkgPCBhamF4Rm9ybXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGFqYXhGb3Jtc1tpXS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRpZighZm9ybXMudmFsaWRhdGVGb3JtKHRoaXMpKSByZXR1cm47XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cclxufSk7IiwidmFyIG1hcCxcclxuXHRzdHlsZU1hcCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIjEwMFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZjAwMDBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmMmYyZjJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5zdHJva2VcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4NmE3N2FcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbl07XHJcblxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG5cclxuICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykpIHJldHVybjtcclxuXHJcblx0dmFyIG15TGF0TG5nID0ge2xhdDogNjAuMDY1NjUxLCBsbmc6IDMwLjMxMjI0OX07XHJcblxyXG5cdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcblx0XHRjZW50ZXI6IG15TGF0TG5nLFxyXG5cdFx0em9vbTogMTUsXHJcblx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcblx0XHRwYW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgXHR6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgXHR6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgXHRcdHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfQ0VOVEVSXHJcbiAgICBcdH0sXHJcbiAgICAgIFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICBcdG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIGRyYWdnYWJsZTogIShcIm9udG91Y2hlbmRcIiBpbiBkb2N1bWVudCksXHJcbiAgICAgICAgc3R5bGVzOiBzdHlsZU1hcFxyXG5cdH0pO1xyXG5cclxuXHR2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcblx0ICAgIHBvc2l0aW9uOiBteUxhdExuZyxcclxuXHQgICAgbWFwOiBtYXAsXHJcblx0ICAgIHRpdGxlOiAn0JzQvtGPINC70L7QutCw0YbQuNGPJ1xyXG5cdH0pO1xyXG5cclxuXHRtYXJrZXIuc2V0TWFwKG1hcCk7XHJcbn0iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHJcblx0KGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYnRuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tbWVudScpLFxyXG5cdFx0XHRpO1xyXG5cdFx0Zm9yKHZhciBpIGluIGJ0bk1lbnUpe1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIGJ0bk1lbnVbaV0uYWRkRXZlbnRMaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykgY29udGludWU7XHJcblxyXG5cdFx0XHRidG5NZW51W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xyXG5cdFx0XHRcdGlmKCFuYXYpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYoIW5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ25hdl9vcGVuJykpIHtcclxuXHRcdFx0XHRcdG5hdi5jbGFzc0xpc3QuYWRkKCduYXZfb3BlbicpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdidG4tbWVudV9jcm9zcycpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCduYXZfX2J0bi1tZW51X2ZpeGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXZfb3BlbicpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tbWVudV9jcm9zcycpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX2J0bi1tZW51X2ZpeGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSkoKVxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4vLyBCTFVSXHRcclxuXHR2YXIgYmx1ciA9IChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJnSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWltZycpWzBdLFxyXG5cdFx0XHRmb3JtQmx1ciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm1fX3dyYXAtYmx1cicpWzBdO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0aWYoIWJnSW1nIHx8ICFmb3JtQmx1cikgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1RyaWRlbnQnKSArIDEgIT0gMCkge1xyXG5cdFx0XHRcdFx0Zm9ybUJsdXIuY2xhc3NMaXN0LmFkZCgnZm9ybV9fd3JhcC1ibHVyX2FsdCcpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHBvc0xlZnQgPSBiZ0ltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gZm9ybUJsdXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcclxuXHRcdFx0XHRcdHBvc1RvcCA9ICBiZ0ltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBmb3JtQmx1ci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG5cdFx0XHRcdC8vZm9ybUJsdXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgYmdJbWcuc3JjICsgJyknO1xyXG5cdFx0XHRcdGZvcm1CbHVyLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQvMTAgKyAncmVtJyArICcgJyArIHBvc1RvcC8xMCArICdyZW0nO1xyXG5cdFx0XHRcdGZvcm1CbHVyLnN0eWxlLmJhY2tncm91bmRTaXplID0gYmdJbWcuY2xpZW50V2lkdGgvMTAgKyAncmVtJyArICcgJyArIGJnSW1nLmNsaWVudEhlaWdodC8xMCArICdyZW0nO1x0XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KSgpO1xyXG5cclxuXHRibHVyLmluaXQoKTtcclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgYmx1ci5pbml0LmJpbmQoYmx1cikpO1xyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBibHVyLmluaXQuYmluZChibHVyKSk7XHJcblxyXG4vL1BhcmFsbGF4XHJcblx0dmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIGJnSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWltZycpWzBdLFxyXG5cdFx0XHRsZWFmMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1sZWFmLTEnKVswXSxcclxuXHRcdFx0bGVhZjIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdlX19mb290ZXItYmctbGVhZi0yJylbMF0sXHJcblx0XHRcdGxlYWYzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWxlYWYtMycpWzBdO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRtb3ZlOiBmdW5jdGlvbihlbGVtZW50LCBzcGVlZFNoaWZ0LCBzcGVlZERyb3AsIHNwZWVkUm90YXRlKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxyXG5cdFx0XHRcdFx0cGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXHJcblx0XHRcdFx0XHRjbGllbnRIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LHNjcm9sbFRvcCxcclxuXHRcdFx0XHRcdHRvcCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHdpbmRvdy5pbm5lckhlaWdodCB8fCB3aW5kb3cuYm9keS5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCksXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm07XHJcblxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtICA9IHNwZWVkU2hpZnQgPyAndHJhbnNsYXRlWCgnICsgKCAoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0KSAvIHBhZ2VIZWlnaHQgLSAxICkgKiAxMDAwICogc3BlZWRTaGlmdCArICclKScgOiAnJzsgXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm0gKz0gc3BlZWREcm9wID8gJ3RyYW5zbGF0ZVkoJyArICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogMTAwMCAqIHNwZWVkRHJvcCArICclKScgOiAnJzsgXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm0gKz0gJ3RyYW5zbGF0ZVooMCknOyBcclxuXHRcdFx0XHRcdHRyYW5zZm9ybSArPSBzcGVlZFJvdGF0ZSA/ICdyb3RhdGUoJyArICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogc3BlZWRSb3RhdGUgKiAzNjAgKyAnZGVnKScgOiAnJztcclxuXHJcblx0XHRcdFx0XHRpZih0cmFuc2Zvcm0gPT09ICd0cmFuc2xhdGVaKDApJykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLmJvdHRvbSA9ICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogMTAwICsgJyUnO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm1velRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5tc1RyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihsZWFmMSkgdGhpcy5tb3ZlKGxlYWYxLCAxLCAwLjc1LCAwLjUpO1xyXG5cdFx0XHRcdGlmKGxlYWYyKSB0aGlzLm1vdmUobGVhZjIsIDEsIDIsIDEpO1xyXG5cdFx0XHRcdGlmKGxlYWYzKSB0aGlzLm1vdmUobGVhZjMsIDEsIDQsIDIpO1xyXG5cdFx0XHRcdGlmKGJnSW1nKSB0aGlzLm1vdmUoYmdJbWcsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG5cdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fSkoKTtcdFxyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgcGFyYWxsYXguaW5pdC5iaW5kKHBhcmFsbGF4KSk7XHJcblxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdChmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vIGZpcnN0IGFkZCByYWYgc2hpbVxyXG5cdFx0Ly8gaHR0cDovL3d3dy5wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xyXG5cdFx0ICByZXR1cm4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcclxuXHRcdCAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcblx0XHQgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG5cdFx0ICAgICAgICAgIGZ1bmN0aW9uKCBjYWxsYmFjayApe1xyXG5cdFx0ICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcblx0XHQgICAgICAgICAgfTtcclxuXHRcdH0pKCk7XHJcblxyXG5cdFx0Ly8gbWFpbiBmdW5jdGlvblxyXG5cdFx0ZnVuY3Rpb24gc2Nyb2xsVG9ZKHNjcm9sbFRhcmdldFksIHNwZWVkLCBlYXNpbmcpIHtcclxuXHRcdCAgICAvLyBzY3JvbGxUYXJnZXRZOiB0aGUgdGFyZ2V0IHNjcm9sbFkgcHJvcGVydHkgb2YgdGhlIHdpbmRvd1xyXG5cdFx0ICAgIC8vIHNwZWVkOiB0aW1lIGluIHBpeGVscyBwZXIgc2Vjb25kXHJcblx0XHQgICAgLy8gZWFzaW5nOiBlYXNpbmcgZXF1YXRpb24gdG8gdXNlXHJcblxyXG5cdFx0ICAgIHZhciBzY3JvbGxZID0gd2luZG93LnNjcm9sbFksXHJcblx0XHQgICAgICAgIHNjcm9sbFRhcmdldFkgPSBzY3JvbGxUYXJnZXRZIHx8IDAsXHJcblx0XHQgICAgICAgIHNwZWVkID0gc3BlZWQgfHwgMjAwMCxcclxuXHRcdCAgICAgICAgZWFzaW5nID0gZWFzaW5nIHx8ICdlYXNlT3V0U2luZScsXHJcblx0XHQgICAgICAgIGN1cnJlbnRUaW1lID0gMDtcclxuXHJcblx0XHQgICAgLy8gbWluIHRpbWUgLjEsIG1heCB0aW1lIC44IHNlY29uZHNcclxuXHRcdCAgICB2YXIgdGltZSA9IE1hdGgubWF4KC4xLCBNYXRoLm1pbihNYXRoLmFicyhzY3JvbGxZIC0gc2Nyb2xsVGFyZ2V0WSkgLyBzcGVlZCwgLjgpKTtcclxuXHJcblx0XHQgICAgLy8gZWFzaW5nIGVxdWF0aW9ucyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5yby9lYXNpbmctanMvYmxvYi9tYXN0ZXIvZWFzaW5nLmpzXHJcblx0XHQgICAgdmFyIFBJX0QyID0gTWF0aC5QSSAvIDIsXHJcblx0XHQgICAgICAgIGVhc2luZ0VxdWF0aW9ucyA9IHtcclxuXHRcdCAgICAgICAgICAgIGVhc2VPdXRTaW5lOiBmdW5jdGlvbiAocG9zKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKHBvcyAqIChNYXRoLlBJIC8gMikpO1xyXG5cdFx0ICAgICAgICAgICAgfSxcclxuXHRcdCAgICAgICAgICAgIGVhc2VJbk91dFNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gKC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHBvcykgLSAxKSk7XHJcblx0XHQgICAgICAgICAgICB9LFxyXG5cdFx0ICAgICAgICAgICAgZWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHRcdCAgICAgICAgICAgICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge1xyXG5cdFx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3cocG9zLCA1KTtcclxuXHRcdCAgICAgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdygocG9zIC0gMiksIDUpICsgMik7XHJcblx0XHQgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgIH07XHJcblxyXG5cdFx0ICAgIC8vIGFkZCBhbmltYXRpb24gbG9vcFxyXG5cdFx0ICAgIGZ1bmN0aW9uIHRpY2soKSB7XHJcblx0XHQgICAgICAgIGN1cnJlbnRUaW1lICs9IDEgLyA2MDtcclxuXHJcblx0XHQgICAgICAgIHZhciBwID0gY3VycmVudFRpbWUgLyB0aW1lO1xyXG5cdFx0ICAgICAgICB2YXIgdCA9IGVhc2luZ0VxdWF0aW9uc1tlYXNpbmddKHApO1xyXG5cclxuXHRcdCAgICAgICAgaWYgKHAgPCAxKSB7XHJcblx0XHQgICAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKHRpY2spO1xyXG5cdFx0ICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFkgKyAoKHNjcm9sbFRhcmdldFkgLSBzY3JvbGxZKSAqIHQpKTtcclxuXHRcdCAgICAgICAgfSBlbHNlIHtcclxuXHRcdCAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3Njcm9sbCBkb25lJyk7XHJcblx0XHQgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsVGFyZ2V0WSk7XHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIC8vIGNhbGwgaXQgb25jZSB0byBnZXQgc3RhcnRlZFxyXG5cdFx0ICAgIHRpY2soKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tocmVmXj1cIiNcIl0nKSxcclxuXHRcdCAgICBzcGVlZCA9IDAuNTtcclxuXHJcblx0XHRmdW5jdGlvbiBnZXRFbGVtZW50U2Nyb2xsUG9zaXRpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoIWVsZW1lbnQpIHJldHVybjtcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCksXHRcclxuXHRcdFx0XHRlbGVtZW50SWQgPSBlbGVtZW50LmhyZWYubWF0Y2goLyMoLiopL2kpLFxyXG5cdFx0XHRcdGVsZW1lbnRPZlBhZ2U7XHJcblxyXG5cdFx0XHRcdGVsZW1lbnRPZlBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWRbMV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZWxlbWVudE9mUGFnZSA/IHNjcm9sbFRvcCArIGVsZW1lbnRPZlBhZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDogMDtcclxuXHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRmb3IodmFyIGkgaW4gbGluaykge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYodHlwZW9mIGxpbmtbaV0gIT0gJ29iamVjdCcpIHJldHVybjtcclxuXHRcdFx0XHJcblx0XHRcdGxpbmtbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0dmFyIHNjcm9sbFRvID0gZ2V0RWxlbWVudFNjcm9sbFBvc2l0aW9uKHRoaXMpLFxyXG5cdFx0XHRcdFx0c3RhcnQgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRzY3JvbGxUb1koc2Nyb2xsVG8sIDIwMDApO1xyXG5cclxuXHRcdCAgXHR9KTtcclxuXHRcdH1cclxuXHJcblx0fSkoKVxyXG59KTsiLCJ2YXIgcHJlbG9hZGVyID0gLy8gUFJFTE9BREVSXHRcclxuXHQoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyksXHJcblx0XHRcdGltZ3MgPSBbXSxcclxuXHRcdFx0dG90YWxJbWdzLFxyXG5cdFx0XHR0b3RhbExvYWRlZCA9IDAsXHJcblx0XHRcdHNob3dlZFBlcmNlbnRzID0gMCxcclxuXHRcdFxyXG5cdFx0XHRwcmVsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmVsb2FkZXInKVswXSxcclxuXHRcdFx0cHJlbG9hZGVyUGVyY2VudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmVsb2FkZXJfX3Byb2dyZXNzLXRleHQnKVswXSxcdFxyXG5cdFx0XHR0aW1lcjtcclxuXHJcblx0XHRpZighcHJlbG9hZGVyIHx8ICFwcmVsb2FkZXJQZXJjZW50cykgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSBpbiBlbGVtZW50cykge1xyXG5cdFx0XHRpZih0eXBlb2YgZWxlbWVudHNbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBpbWdVcmwgPSBudWxsO1xyXG5cclxuXHRcdFx0c3dpdGNoIChlbGVtZW50c1tpXS5ub2RlTmFtZSkge1xyXG5cdFx0XHQgIGNhc2UgJ0lNRyc6XHJcblx0XHRcdCAgICBpbWdVcmwgPSBlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cdFx0XHQgICAgYnJlYWs7XHJcblx0XHRcdCAgY2FzZSAnU1ZHJzogY2FzZSAnc3ZnJzpcclxuXHRcdFx0ICAgIHZhciBzdmdVc2UgPSBlbGVtZW50c1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndXNlJyk7XHJcblx0XHRcdCAgICBpZighc3ZnVXNlWzBdKSBicmVhaztcclxuXHRcdFx0ICAgIHZhciB1c2VIcmVmID0gc3ZnVXNlWzBdLmdldEF0dHJpYnV0ZSgneGxpbms6aHJlZicpO1xyXG5cdFx0XHQgICAgdXNlSHJlZiA9IHVzZUhyZWYubWF0Y2goLyguKj8pXFwuc3ZnLyk7XHJcblx0XHRcdCAgICBpbWdVcmwgPSAodXNlSHJlZiAhPT0gbnVsbCA/IHVzZUhyZWZbMF0gOiBudWxsKTtcclxuXHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0XHQgIGRlZmF1bHQ6XHJcblx0XHRcdCAgICBpZighZWxlbWVudHNbaV0ubm9kZU5hbWUpIGJyZWFrO1xyXG5cdFx0XHRcdHZhciBiZ0ltZyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudHNbaV0pLmJhY2tncm91bmRJbWFnZTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhiZ0ltZyk7XHJcblx0XHRcdFx0aWYoYmdJbWcgIT0gJ25vbmUnKSB7XHJcblx0XHRcdFx0XHRiZ0ltZyA9IGJnSW1nLm1hdGNoKC91cmxcXCgoLio/KVxcKS8pO1xyXG5cdFx0XHRcdFx0YmdJbWcgPSAoYmdJbWcgIT09IG51bGwgPyBiZ0ltZ1sxXS5yZXBsYWNlKC8oJ3xcIikvZywnJykgOiBudWxsKTtcclxuXHRcdFx0XHRcdGltZ1VybCA9IGJnSW1nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoaW1nVXJsICE9PSBudWxsICYmIGltZ1VybCAhPSAnbm9uZScgJiYgaW1ncy5pbmRleE9mKGltZ1VybCkgPT0gLTEpIGltZ3MucHVzaChpbWdVcmwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvdGFsSW1ncyA9IGltZ3MubGVuZ3RoO1xyXG5cclxuXHRcdGZvcihpIGluIGltZ3MpIHtcclxuXHRcdFx0dmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRpbWcuc3JjID0gaW1nc1tpXTtcclxuXHRcdFx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHRvdGFsTG9hZGVkKys7XHJcblx0XHRcdCAgXHRzZXRQZXJjZW50cyh0b3RhbExvYWRlZCwgdG90YWxJbWdzKTtcclxuXHRcdFx0ICBcdGNvbnNvbGUubG9nKHRoaXMuc3JjICsgJyDQt9Cw0LPRgNGD0LbQtdC90L4nKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0aW1nLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR0b3RhbExvYWRlZCsrO1xyXG5cdFx0XHQgIFx0c2V0UGVyY2VudHModG90YWxMb2FkZWQsIHRvdGFsSW1ncyk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWxMb2FkZWQsIHRvdGFsSW1ncykge1xyXG5cdFx0XHR2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwodG90YWxMb2FkZWQgLyB0b3RhbEltZ3MgKiAxMDApO1xyXG5cclxuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdHByZWxvYWRlclBlcmNlbnRzLnRleHRDb250ZW50ID0gc2hvd2VkUGVyY2VudHM7XHJcblxyXG5cdFx0XHRpZihwZXJjZW50cyA+PSAxMDApIHtcclxuXHRcdFx0XHRwcmVsb2FkZXJQZXJjZW50cy50ZXh0Q29udGVudCA9IHNob3dlZFBlcmNlbnRzID0gMTAwO1xyXG5cclxuXHRcdFx0XHRpZihwcmVsb2FkZXIpIHtcclxuXHRcdFx0XHRcdHByZWxvYWRlci5jbGFzc0xpc3QuYWRkKCdwcmVsb2FkZXJfaGlkZGVuJyk7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLmNsYXNzTGlzdC5hZGQoJ19sb2FkZWQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHR0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRwcmVsb2FkZXJQZXJjZW50cy50ZXh0Q29udGVudCA9IHNob3dlZFBlcmNlbnRzO1xyXG5cdFx0XHRcdFx0c2hvd2VkUGVyY2VudHMrKztcclxuXHJcblx0XHRcdFx0XHRpZihzaG93ZWRQZXJjZW50cyA+PSBwZXJjZW50cykge1xyXG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCAxMCk7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH0pKCk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0cHJlbG9hZGVyO1xyXG59IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4vLyBTTElERVJcdFxyXG5cdChmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXInKTtcclxuXHJcblx0XHRpZiAoIXNsaWRlci5sZW5ndGgpIHJldHVybjtcclxuXHJcblx0XHRmdW5jdGlvbiBTbGlkZXIocm9vdCkge1xyXG5cdFx0XHR0aGlzLnNsaWRlclJvb3QgPSByb290O1xyXG5cclxuXHRcdFx0dGhpcy5zbGlkZXJJdGVtcyA9IFtdO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5jdXJyZW50SXRlbU51bSA9IDA7XHJcblxyXG5cdFx0XHR0aGlzLmZsYWcgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMuZ2V0VmFsdWVzSXRlbXNIZWxwZXIgPSBmdW5jdGlvbihpdGVtLCBuYW1lKSB7XHJcblx0XHRcdFx0dmFyIGNsYXNzUHJlZml4ID0gJ3NsaWRlcl9faXRlbS0nLFxyXG5cdFx0XHRcdFx0dmFsdWU7XHJcblxyXG5cdFx0XHRcdHZhbHVlID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIG5hbWUpO1xyXG5cclxuXHRcdFx0XHRpZighdmFsdWUpIHtcclxuXHRcdFx0XHRcdHZhbHVlID0gaXRlbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzUHJlZml4ICsgbmFtZSlbMF07XHJcblx0XHRcdFx0XHR2YWx1ZSA9ICh2YWx1ZSA/IHZhbHVlLmlubmVySFRNTC50cmltKCkgOiBudWxsKTtcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5nZW5JdGVtcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBpdGVtcyA9IHRoaXMuc2xpZGVyUm9vdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX2l0ZW0nKSxcclxuXHRcdFx0XHRcdGksXHJcblx0XHRcdFx0XHRzbGlkZXJJdGVtO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGZvcihpIGluIGl0ZW1zKSB7XHJcblx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbXNbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHRcdHNsaWRlckl0ZW0gPSB7XHJcblx0XHRcdFx0XHRcdCd0aXRsZSc6IHRoaXMuZ2V0VmFsdWVzSXRlbXNIZWxwZXIoaXRlbXNbaV0sICd0aXRsZScpLFxyXG5cdFx0XHRcdFx0XHQnZGVzY3InOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAnZGVzY3InKSxcclxuXHRcdFx0XHRcdFx0J2ltZyc6IHRoaXMuZ2V0VmFsdWVzSXRlbXNIZWxwZXIoaXRlbXNbaV0sICdpbWcnKSxcclxuXHRcdFx0XHRcdFx0J2hyZWYnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAnaHJlZicpLFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlckl0ZW1zW2ldID0gc2xpZGVySXRlbTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy50b3RhbCA9IHRoaXMuc2xpZGVySXRlbXMubGVuZ3RoO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5nZW5IVE1MID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGJsb2NrUGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja1BpY0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRcdGJsb2NrQWJvdXRVbml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja1VuaXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0VGl0bGVDbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRcdGJsb2NrVW5pdERlc2NyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja1VuaXRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKSxcclxuXHRcdFx0XHRcdGJsb2NrTmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja05hdkJ0blByZXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcblx0XHRcdFx0XHRibG9ja05hdkJ0bk5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcblx0XHRcdFx0XHRpO1xyXG5cclxuXHRcdFx0XHRibG9ja1BpYy5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljJyk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1BpYyA9IGJsb2NrUGljO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tQaWNBY3RpdmVJdGVtID0gYmxvY2tQaWMuYXBwZW5kQ2hpbGQoYmxvY2tQaWNJdGVtLmNsb25lTm9kZSgpKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljQWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW0nKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljQWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1fdmlzaWJsZScpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tQaWNEaXNhY3RpdmVJdGVtID0gYmxvY2tQaWMuYXBwZW5kQ2hpbGQoYmxvY2tQaWNJdGVtKTtcdFxyXG5cdFx0XHRcdHRoaXMuYmxvY2tQaWNEaXNhY3RpdmVJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbScpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tQaWNEaXNhY3RpdmVJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbV9oaWRkZW4nKTtcdFx0XHJcblxyXG5cdFx0XHRcdGJsb2NrQWJvdXRVbml0LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fYWJvdXQtdW5pdCcpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdW5pdC10aXRsZScpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250LmNsYXNzTGlzdC5hZGQoJ3RpdGxlJyk7XHJcblx0XHRcdFx0YmxvY2tVbml0VGl0bGVDbnQuY2xhc3NMaXN0LmFkZCgndGl0bGVfd2l0aC1saW5lJyk7XHJcblx0XHRcdFx0YmxvY2tVbml0VGl0bGVDbnQuY2xhc3NMaXN0LmFkZCgndGl0bGVfd2l0aC1saW5lLXVwcGVyJyk7XHJcblx0XHRcdFx0YmxvY2tVbml0RGVzY3IuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX191bml0LWRlc2NyJyk7XHJcblx0XHRcdFx0YmxvY2tVbml0TGluay5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3VuaXQtbGluaycpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdExpbmtIcmVmLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdExpbmtIcmVmLmNsYXNzTGlzdC5hZGQoJ2J0bl93aXRoLWljb24nKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdExpbmtIcmVmLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdExpbmtIcmVmLmlubmVySFRNTCA9ICc8c3ZnIGNsYXNzPVwic3ZnLWljb24gc3ZnLWljb25fbGlua1wiIHJvbGU9XCJpbWdcIj48dXNlIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhsaW5rOmhyZWY9XCIuL2Fzc2V0cy9pbWcvc3ByaXRlLnN2ZyNsaW5rXCI+PC91c2U+PC9zdmc+PHNwYW4+0J/QvtGB0LzQvtGC0YDQtdGC0Ywg0YHQsNC50YI8L3NwYW4+JztcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdFRpdGxlID0gYmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0VGl0bGUpLmFwcGVuZENoaWxkKGJsb2NrVW5pdFRpdGxlQ250KTtcclxuXHRcdFx0XHRibG9ja0Fib3V0VW5pdC5hcHBlbmRDaGlsZChibG9ja1VuaXRUaXRsZSkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyID0gYmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0RGVzY3IpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsgPSBibG9ja0Fib3V0VW5pdC5hcHBlbmRDaGlsZChibG9ja1VuaXRMaW5rKS5hcHBlbmRDaGlsZChibG9ja1VuaXRMaW5rSHJlZik7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcblx0XHRcdFx0YmxvY2tOYXYuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYnKTtcclxuXHRcdFx0XHRibG9ja05hdkJ0blByZXYuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYtYnRuJyk7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2LnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2LnNldEF0dHJpYnV0ZSgncmVsJywgJ25vZm9sbG93Jyk7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNsaWRlcl9fbmF2LWljb25cIj48L3NwYW4+JztcclxuXHRcdFx0XHRibG9ja05hdkJ0bk5leHQgPSBibG9ja05hdkJ0blByZXYuY2xvbmVOb2RlKCk7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0LmlubmVySFRNTCA9IGJsb2NrTmF2QnRuUHJldi5pbm5lckhUTUw7XHJcblx0XHRcdFx0dGhpcy5ibG9ja05hdkJ0blByZXYgPSBibG9ja05hdi5hcHBlbmRDaGlsZChibG9ja05hdkJ0blByZXYpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5QcmV2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bl9wcmV2Jyk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja05hdkJ0bk5leHQgPSBibG9ja05hdi5hcHBlbmRDaGlsZChibG9ja05hdkJ0bk5leHQpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5OZXh0LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bl9uZXh0Jyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja05hdkJ0bi5iaW5kKHtzbGlkZXI6IHRoaXMsIHR5cGU6ICduZXh0J30pKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tOYXZCdG4uYmluZCh7c2xpZGVyOiB0aGlzLCB0eXBlOiAncHJldid9KSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVyUm9vdC5hcHBlbmRDaGlsZChibG9ja1BpYyk7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXJSb290LmFwcGVuZENoaWxkKGJsb2NrQWJvdXRVbml0KTtcclxuXHRcdFx0XHR0aGlzLnNsaWRlclJvb3QuYXBwZW5kQ2hpbGQoYmxvY2tOYXYpO1x0XHJcblxyXG5cdFx0XHRcdHZhciAkdGhhdCA9IHRoaXM7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgbG9hZGVkU2xpZGVzID0gMDtcclxuXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBsaXN0ZW5Mb2FkZWQobG9hZGVkLCB0b3RhbCkge1xyXG5cdFx0XHRcdFx0XHRpZihsb2FkZWQgPT0gdG90YWwpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKCR0aGF0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRmb3IoaSBpbiAkdGhhdC5zbGlkZXJJdGVtcykge1xyXG5cdFx0XHRcdFx0XHR2YXIgc2xpZGVySXRlbSA9ICR0aGF0LnNsaWRlckl0ZW1zW2ldLFxyXG5cdFx0XHRcdFx0XHRcdHNsaWRlSW1nID0gbmV3IEltYWdlKCksXHJcblx0XHRcdFx0XHRcdFx0c2xpZGVUaHVtYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcblx0XHRcdFx0XHRcdHNsaWRlVGh1bWIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYtYnRuLXRodW1iJyk7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRzbGlkZUltZy5zcmMgPSBzbGlkZXJJdGVtLmltZztcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnNyYyArICcg0LfQsNCz0YDRg9C20LXQvdC+INCyINGB0LvQsNC50LTQtdGAJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRsb2FkZWRTbGlkZXMrKztcclxuXHRcdFx0XHRcdFx0XHRcdGxpc3RlbkxvYWRlZChsb2FkZWRTbGlkZXMsICR0aGF0LnRvdGFsKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRzbGlkZUltZy5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnNyYyArICcg0L3QtSDQt9Cw0LPRgNGD0LbQtdC90L4g0LIg0YHQu9Cw0LnQtNC10YAnKTtcclxuXHRcdFx0XHRcdFx0XHRcdGxvYWRlZFNsaWRlcysrO1xyXG5cdFx0XHRcdFx0XHRcdFx0bGlzdGVuTG9hZGVkKGxvYWRlZFNsaWRlcywgJHRoYXQudG90YWwpO1xyXG5cdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHQkdGhhdC5ibG9ja05hdkJ0bk5leHQuYXBwZW5kQ2hpbGQoc2xpZGVUaHVtYikuYXBwZW5kQ2hpbGQoc2xpZGVJbWcpO1xyXG5cdFx0XHRcdFx0XHQkdGhhdC5ibG9ja05hdkJ0blByZXYuYXBwZW5kQ2hpbGQoc2xpZGVUaHVtYi5jbG9uZU5vZGUoKSkuYXBwZW5kQ2hpbGQoc2xpZGVJbWcuY2xvbmVOb2RlKCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmNoYW5nZVNsaWRlID0gZnVuY3Rpb24oY3VycmVudE5ldywgdHlwZSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50ID0gdGhpcy5jdXJyZW50SXRlbU51bSxcclxuXHRcdFx0XHRcdG5leHQgPSB0aGlzLmdldE5leHROdW0oY3VycmVudCksXHJcblx0XHRcdFx0XHRwcmV2ID0gdGhpcy5nZXRQcmV2TnVtKGN1cnJlbnQpLFxyXG5cdFx0XHRcdFx0bmV4dE5ldyA9IHRoaXMuZ2V0TmV4dE51bShjdXJyZW50TmV3KSxcclxuXHRcdFx0XHRcdHByZXZOZXcgPSB0aGlzLmdldFByZXZOdW0oY3VycmVudE5ldyksXHJcblx0XHRcdFx0XHQkdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcblxyXG5cdFx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWInKVsodHlwZSA9PSAnbmV4dCcgPyBuZXh0IDogcHJldildLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYl91bmFjdGl2ZScpO1xyXG5cdFx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWInKVsodHlwZSA9PSAnbmV4dCcgPyBuZXh0IDogcHJldildLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYl9hY3RpdmUnKTtcclxuXHRcdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dE5ldyA6IHByZXZOZXcpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHQodHlwZSA9PSAnbmV4dCcgPyAkdGhhdC5ibG9ja05hdkJ0bk5leHQgOiAkdGhhdC5ibG9ja05hdkJ0blByZXYpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYl91bmFjdGl2ZScpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0aGlzKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLnNldEFjdGl2ZUluZm8gPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcblxyXG5cdFx0XHRcdHZhciBhY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVySXRlbXNbY3VycmVudF07XHJcblxyXG5cdFx0XHRcdGlmKGFjdGl2ZVNsaWRlLnRpdGxlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdFRpdGxlLmlubmVySFRNTCA9IGFjdGl2ZVNsaWRlLnRpdGxlO1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZS5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZS5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihhY3RpdmVTbGlkZS5kZXNjcikge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjci5pbm5lckhUTUwgPSBhY3RpdmVTbGlkZS5kZXNjcjtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3Iuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihhY3RpdmVTbGlkZS5ocmVmKSB7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgYWN0aXZlU2xpZGUuaHJlZik7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0TGluay5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuc2V0QWN0aXZlUGljID0gZnVuY3Rpb24oY3VycmVudCwgYmxvY2tQaWNJdGVtKSB7XHJcblx0XHRcdFx0dmFyIGFjdGl2ZVNsaWRlID0gdGhpcy5zbGlkZXJJdGVtc1tjdXJyZW50XSxcclxuXHRcdFx0XHQgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcblxyXG5cdFx0XHRcdFx0aW1nLnNyYyA9IGFjdGl2ZVNsaWRlLmltZztcclxuXHJcblx0XHRcdFx0XHRpZihibG9ja1BpY0l0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1fdmlzaWJsZScpKSB7XHJcblx0XHRcdFx0XHRcdGJsb2NrUGljSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1fdmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtX2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uaW5uZXJIVE1MID0gJyc7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uYXBwZW5kQ2hpbGQoaW1nKS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9faW5pdC1waWMtaXRlbV9oaWRkZW4nKTtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbV92aXNpYmxlJyk7XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuY2xpY2tOYXZCdG4gPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRpZih0aGlzLnNsaWRlci5mbGFnKSB7XHJcblxyXG5cdFx0XHRcdHZhciBjdXJyZW50ID0gdGhpcy5zbGlkZXIuY3VycmVudEl0ZW1OdW0sXHJcblx0XHRcdFx0XHRjdXJyZW50TmV3ID0gKHRoaXMudHlwZSA9PSAnbmV4dCcgPyB0aGlzLnNsaWRlci5nZXROZXh0TnVtKGN1cnJlbnQpIDogdGhpcy5zbGlkZXIuZ2V0UHJldk51bShjdXJyZW50KSk7XHRcclxuXHRcdFx0XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5mbGFnID0gZmFsc2U7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5hbmltYXRpb25Eb25lKFtcclxuXHRcdFx0XHRcdFx0dGhpcy5zbGlkZXIuY2hhbmdlU2xpZGUoY3VycmVudE5ldywgJ25leHQnKSxcclxuXHRcdFx0XHRcdFx0dGhpcy5zbGlkZXIuY2hhbmdlU2xpZGUoY3VycmVudE5ldywgJ3ByZXYnKSxcclxuXHRcdFx0XHRcdFx0dGhpcy5zbGlkZXIuc2V0QWN0aXZlUGljKGN1cnJlbnROZXcsIHRoaXMuc2xpZGVyLmJsb2NrUGljQWN0aXZlSXRlbSksXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLnNldEFjdGl2ZVBpYyhjdXJyZW50TmV3LCB0aGlzLnNsaWRlci5ibG9ja1BpY0Rpc2FjdGl2ZUl0ZW0pXHJcblx0XHRcdFx0XHRdKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5zZXRBY3RpdmVJbmZvKGN1cnJlbnROZXcpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVyLmN1cnJlbnRJdGVtTnVtID0gY3VycmVudE5ldztcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuZ2V0TmV4dE51bSA9IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuXHRcdFx0XHRjdXJyZW50Kys7XHJcbiAgICAgICAgICAgIFx0cmV0dXJuIChjdXJyZW50ID4gdGhpcy50b3RhbCAtIDEgPyAwIDogY3VycmVudCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmdldFByZXZOdW0gPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIFx0Y3VycmVudC0tO1xyXG4gICAgICAgICAgICBcdHJldHVybiAoY3VycmVudCA8IDAgPyB0aGlzLnRvdGFsIC0gMSA6IGN1cnJlbnQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5hbmltYXRpb25Eb25lID0gZnVuY3Rpb24oYXJyKSB7XHJcblx0XHRcdFx0dmFyICR0aGF0ID0gdGhpcztcclxuXHRcdFx0XHRQcm9taXNlLmFsbChhcnIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xyXG5cdFx0XHRcdCAgXHQkdGhhdC5mbGFnID0gdHJ1ZTtcclxuXHRcdFx0XHQgIFx0Y29uc29sZS5sb2coJ2FpbWF0aW9uIGRvbmUnKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR0aGlzLmdlbkl0ZW1zKCk7XHJcblxyXG5cdFx0XHRcdGlmKHRoaXMuc2xpZGVySXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdHRoaXMuZ2VuSFRNTCgpLnRoZW4oZnVuY3Rpb24oc2xpZGVyKSB7XHJcblxyXG5cdFx0XHRcdFx0c2xpZGVyLnNsaWRlclJvb3QuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2xvYWRlZCcpO1xyXG5cclxuXHRcdFx0XHRcdHNsaWRlci5hbmltYXRpb25Eb25lKFtcclxuXHRcdFx0XHRcdFx0c2xpZGVyLmNoYW5nZVNsaWRlKHNsaWRlci5jdXJyZW50SXRlbU51bSwgJ25leHQnKSxcclxuXHRcdFx0XHRcdFx0c2xpZGVyLmNoYW5nZVNsaWRlKHNsaWRlci5jdXJyZW50SXRlbU51bSwgJ3ByZXYnKSxcclxuXHRcdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZVBpYyhzbGlkZXIuY3VycmVudEl0ZW1OdW0sIHNsaWRlci5ibG9ja1BpY0FjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXIuc2V0QWN0aXZlUGljKHNsaWRlci5jdXJyZW50SXRlbU51bSwgc2xpZGVyLmJsb2NrUGljRGlzYWN0aXZlSXRlbSlcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdKTtcclxuXHJcblx0XHRcdFx0XHRzbGlkZXIuc2V0QWN0aXZlSW5mbyhzbGlkZXIuY3VycmVudEl0ZW1OdW0pO1xyXG5cclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdyZWFkeScpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0fTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKHZhciBpIGluIHNsaWRlcikge1xyXG5cdFx0XHRpZih0eXBlb2YgIHNsaWRlcltpXSAhPSAnb2JqZWN0JykgY29udGludWU7XHJcblx0XHRcdHZhciBzID0gbmV3IFNsaWRlcihzbGlkZXJbaV0pO1xyXG5cdFx0XHRzLmluaXQoKTtcclxuXHRcdH1cclxuXHJcblx0fSkoKVxyXG5cclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
