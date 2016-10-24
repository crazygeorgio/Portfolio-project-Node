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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cvYmxvZy5qcyIsImZsaXBwZXItdHJpZ2dlci9mbGlwcGVyLXRyaWdnZXIuanMiLCJmb3JtL2Zvcm0uanMiLCJuYXYvbmF2LmpzIiwicGFnZS9wYWdlX19mb290ZXIuanMiLCJwYWdlL3Njcm9sbC5qcyIsInByZWxvYWRlci9wcmVsb2FkZXIuanMiLCJzbGlkZXIvc2xpZGVyLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJsb2NrQmxvZ01lbnUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQmxvZ01lbnUiLCJibG9jayIsImJsb2dNZW51IiwiYmxvZ1dyYXAiLCJwYXJlbnROb2RlIiwiYmxvZ0NvbnRhaW5lciIsIm1vYmlsZVN0YXR1cyIsInRyaWdnZXJNb2JpbGVNZW51IiwiYnV0dG9uQmxvZ01lbnUiLCIkdGhhdCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImJvZHkiLCJlIiwiZWxlbWVudCIsInRhcmdldCIsImhpZGUiLCJjb250YWlucyIsInBhcmVudEVsZW1lbnQiLCJmaXhlZCIsImNvbnRhaW5lciIsIm1lbnUiLCJ3cmFwIiwid3JhcFBvcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNvbnRhaW5lckhlaWdodCIsIm1lbnVIZWlnaHQiLCJmaXhlZFN0YXJ0IiwiZml4ZWRTdG9wIiwic2Nyb2xsVG9wIiwid2luZG93IiwicGFnZVlPZmZzZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJvZmZzZXRIZWlnaHQiLCJ0b3AiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiY2hlY2tBY3RpdmUiLCJ3aW5IZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsIm1lbnVJdGVtc0xpbmtzIiwiYmxvZ0l0ZW1JZCIsImJsb2dJdGVtIiwiYWN0aXZlSWQiLCJtaW5Ub3AiLCJjdXJyZW50VG9wIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsIm1hdGNoIiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXRoIiwiYWJzIiwicGF0dGVybiIsIlJlZ0V4cCIsImluaXQiLCJiaW5kIiwidHJpZ2dlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidG5CYWNrIiwidHVybkZsaXBwZXIiLCJmbGlwSWQiLCJmbGlwcGVyIiwicXVlcnlTZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwibG9jYXRpb24iLCJoYXNoIiwicmVwbGFjZSIsImFsbEZvcm1zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhamF4Rm9ybXMiLCJmb3JtcyIsIm1pbkxlbmd0aCIsInRpcENsYXNzIiwidGlwQ2xhc3NWaXNpYmxlIiwibWVzc2FnZUNsYXNzIiwibWVzc2FnZVRleHQiLCJlbGVtZW50Q2xhc3NFcnJvciIsInNob3dUaXAiLCJ0eXBlRXJyIiwidHlwZSIsInRpcCIsInR5cGVNZXNzYWdlQ2xhc3MiLCJtZXNzYWdlIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiaW5uZXJIVE1MIiwiaGlkZVRpcCIsInJlbW92ZUNoaWxkIiwiY2xlYXJPbkZvY3VzIiwidHJpZ2dlclRpcCIsImNvbmQiLCJjaGVja1JlcXVpcmVkIiwicmVxdWlyZWQiLCJjaGVja2VkIiwidmFsdWUiLCJjaGVja1BhdHRlcm4iLCJjaGVja1ZhbGlkYXRpb24iLCJzaG93U3R5bGVFcnIiLCJlbGVtZW50SXNWYWxpZCIsInZhbGlkYXRlRm9ybSIsImZvcm0iLCJpbnB1dCIsInRleHRhcmVhIiwiZWxlbWVudHMiLCJmb3JtSXNWYWxpZCIsImNvbmNhdCIsImVsZW1lbnRWYWxpZGF0aW9uIiwib25rZXl1cCIsIm9uaW5wdXQiLCJvbmNsaWNrIiwib25wcm9wZXJ0eWNoYW5nZSIsInByb3BlcnR5TmFtZSIsIm9uY3V0Iiwic2V0VGltZW91dCIsInRpcHMiLCJub1ZhbGlkYXRlIiwib25zdWJtaXQiLCJidG5NZW51IiwibmF2IiwiYmx1ciIsImJnSW1nIiwiZm9ybUJsdXIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpbmRleE9mIiwicG9zTGVmdCIsImxlZnQiLCJwb3NUb3AiLCJzdHlsZSIsImJhY2tncm91bmRQb3NpdGlvbiIsImJhY2tncm91bmRTaXplIiwiY2xpZW50V2lkdGgiLCJwYXJhbGxheCIsImxlYWYxIiwibGVhZjIiLCJsZWFmMyIsIm1vdmUiLCJzcGVlZFNoaWZ0Iiwic3BlZWREcm9wIiwic3BlZWRSb3RhdGUiLCJwYWdlSGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwidHJhbnNmb3JtIiwiYm90dG9tIiwid2Via2l0VHJhbnNmb3JtIiwibW96VHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJvVHJhbnNmb3JtIiwibWFwIiwic3R5bGVNYXAiLCJpbml0TWFwIiwibXlMYXRMbmciLCJsYXQiLCJsbmciLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsIm1hcFR5cGVDb250cm9sIiwicGFuQ29udHJvbCIsInpvb21Db250cm9sIiwiem9vbUNvbnRyb2xPcHRpb25zIiwicG9zaXRpb24iLCJDb250cm9sUG9zaXRpb24iLCJSSUdIVF9DRU5URVIiLCJzdHJlZXRWaWV3Q29udHJvbCIsIm1hcFR5cGVJZCIsIk1hcFR5cGVJZCIsIlJPQURNQVAiLCJzY3JvbGx3aGVlbCIsImRyYWdnYWJsZSIsInN0eWxlcyIsIm1hcmtlciIsIk1hcmtlciIsInRpdGxlIiwic2V0TWFwIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbGxiYWNrIiwic2Nyb2xsVG9ZIiwic2Nyb2xsVGFyZ2V0WSIsInNwZWVkIiwiZWFzaW5nIiwic2Nyb2xsWSIsImN1cnJlbnRUaW1lIiwidGltZSIsIm1heCIsIm1pbiIsIlBJX0QyIiwiUEkiLCJlYXNpbmdFcXVhdGlvbnMiLCJlYXNlT3V0U2luZSIsInBvcyIsInNpbiIsImVhc2VJbk91dFNpbmUiLCJjb3MiLCJlYXNlSW5PdXRRdWludCIsInBvdyIsInRpY2siLCJwIiwidCIsInNjcm9sbFRvIiwibGluayIsImdldEVsZW1lbnRTY3JvbGxQb3NpdGlvbiIsImVsZW1lbnRJZCIsImhyZWYiLCJlbGVtZW50T2ZQYWdlIiwic3RhcnQiLCJpbWdzIiwidG90YWxJbWdzIiwidG90YWxMb2FkZWQiLCJzaG93ZWRQZXJjZW50cyIsInByZWxvYWRlciIsInByZWxvYWRlclBlcmNlbnRzIiwidGltZXIiLCJpbWdVcmwiLCJub2RlTmFtZSIsInN2Z1VzZSIsInVzZUhyZWYiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwdXNoIiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJzZXRQZXJjZW50cyIsImNvbnNvbGUiLCJsb2ciLCJvbmVycm9yIiwicGVyY2VudHMiLCJjZWlsIiwiY2xlYXJJbnRlcnZhbCIsInRleHRDb250ZW50Iiwic2V0SW50ZXJ2YWwiLCJzbGlkZXIiLCJTbGlkZXIiLCJyb290Iiwic2xpZGVyUm9vdCIsInNsaWRlckl0ZW1zIiwiY3VycmVudEl0ZW1OdW0iLCJmbGFnIiwiZ2V0VmFsdWVzSXRlbXNIZWxwZXIiLCJpdGVtIiwibmFtZSIsImNsYXNzUHJlZml4IiwidHJpbSIsImdlbkl0ZW1zIiwiaXRlbXMiLCJzbGlkZXJJdGVtIiwidG90YWwiLCJnZW5IVE1MIiwiYmxvY2tQaWMiLCJibG9ja1BpY0l0ZW0iLCJibG9ja0Fib3V0VW5pdCIsImJsb2NrVW5pdFRpdGxlIiwiYmxvY2tVbml0VGl0bGVDbnQiLCJibG9ja1VuaXREZXNjciIsImJsb2NrVW5pdExpbmsiLCJibG9ja1VuaXRMaW5rSHJlZiIsImJsb2NrTmF2IiwiYmxvY2tOYXZCdG5QcmV2IiwiYmxvY2tOYXZCdG5OZXh0IiwiYmxvY2tQaWNBY3RpdmVJdGVtIiwiY2xvbmVOb2RlIiwiYmxvY2tQaWNEaXNhY3RpdmVJdGVtIiwic2V0QXR0cmlidXRlIiwiZGlzcGxheSIsImNsaWNrTmF2QnRuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJsb2FkZWRTbGlkZXMiLCJsaXN0ZW5Mb2FkZWQiLCJsb2FkZWQiLCJzbGlkZUltZyIsInNsaWRlVGh1bWIiLCJjaGFuZ2VTbGlkZSIsImN1cnJlbnROZXciLCJjdXJyZW50IiwibmV4dCIsImdldE5leHROdW0iLCJwcmV2IiwiZ2V0UHJldk51bSIsIm5leHROZXciLCJwcmV2TmV3Iiwic2V0QWN0aXZlSW5mbyIsImFjdGl2ZVNsaWRlIiwiZGVzY3IiLCJzZXRBY3RpdmVQaWMiLCJhbmltYXRpb25Eb25lIiwiYXJyIiwiYWxsIiwidGhlbiIsInJlc3VsdHMiLCJzIl0sIm1hcHBpbmdzIjoiO0FBQUFBLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFBQSxJQUVBLENBQUEsWUFBQTtBQUFBLFFBRUEsSUFBQUMsYUFBQSxHQUFBRixRQUFBLENBQUFHLHNCQUFBLENBQUEsZ0JBQUEsRUFBQSxDQUFBLENBQUEsQ0FGQTtBQUFBLFFBSUEsSUFBQSxDQUFBRCxhQUFBO0FBQUEsWUFBQSxPQUpBO0FBQUEsUUFNQSxJQUFBRSxRQUFBLEdBQUEsVUFBQUMsS0FBQSxFQUFBO0FBQUEsWUFFQSxLQUFBQyxRQUFBLEdBQUFELEtBQUEsQ0FGQTtBQUFBLFlBSUEsS0FBQUUsUUFBQSxHQUFBRixLQUFBLENBQUFHLFVBQUEsQ0FKQTtBQUFBLFlBTUEsS0FBQUMsYUFBQSxHQUFBSixLQUFBLENBQUFHLFVBQUEsQ0FBQUEsVUFBQSxDQU5BO0FBQUEsWUFRQSxLQUFBRSxZQUFBLEdBQUEsS0FBQSxDQVJBO0FBQUEsWUFVQSxLQUFBQyxpQkFBQSxHQUFBLFlBQUE7QUFBQSxnQkFFQSxJQUFBQyxjQUFBLEdBQUFaLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSxrQkFBQSxFQUFBLENBQUEsQ0FBQSxFQUNBVSxLQUFBLEdBQUEsSUFEQSxDQUZBO0FBQUEsZ0JBS0EsSUFBQSxDQUFBRCxjQUFBO0FBQUEsb0JBQUEsT0FMQTtBQUFBLGdCQU9BQSxjQUFBLENBQUFYLGdCQUFBLENBQUEsT0FBQSxFQUFBLFlBQUE7QUFBQSxvQkFFQVksS0FBQSxDQUFB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Q0FBQTNPLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGVBQUEsRUFGQTtBQUFBLG9CQUlBdU8sTUFBQSxDQUFBc0QsYUFBQSxDQUFBO0FBQUEsd0JBQ0F0RCxNQUFBLENBQUF5QyxXQUFBLENBQUF6QyxNQUFBLENBQUFLLGNBQUEsRUFBQSxNQUFBLENBREE7QUFBQSx3QkFFQUwsTUFBQSxDQUFBeUMsV0FBQSxDQUFBekMsTUFBQSxDQUFBSyxjQUFBLEVBQUEsTUFBQSxDQUZBO0FBQUEsd0JBR0FMLE1BQUEsQ0FBQXFELFlBQUEsQ0FBQXJELE1BQUEsQ0FBQUssY0FBQSxFQUFBTCxNQUFBLENBQUE0QixrQkFBQSxDQUhBO0FBQUEsd0JBSUE1QixNQUFBLENBQUFxRCxZQUFBLENBQUFyRCxNQUFBLENBQUFLLGNBQUEsRUFBQUwsTUFBQSxDQUFBOEIscUJBQUEsQ0FKQTtBQUFBLHFCQUFBLEVBSkE7QUFBQSxvQkFXQTlCLE1BQUEsQ0FBQWtELGFBQUEsQ0FBQWxELE1BQUEsQ0FBQUssY0FBQSxFQVhBO0FBQUEsb0JBYUFiLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLE9BQUEsRUFiQTtBQUFBLGlCQUFBLEVBTkE7QUFBQSxhQUFBLENBcFFBO0FBQUEsU0FOQTtBQUFBLFFBcVNBLFNBQUF6TCxDQUFBLElBQUFnTSxNQUFBLEVBQUE7QUFBQSxZQUNBLElBQUEsT0FBQUEsTUFBQSxDQUFBaE0sQ0FBQSxDQUFBLElBQUEsUUFBQTtBQUFBLGdCQUFBLFNBREE7QUFBQSxZQUVBLElBQUEyUCxDQUFBLEdBQUEsSUFBQTFELE1BQUEsQ0FBQUQsTUFBQSxDQUFBaE0sQ0FBQSxDQUFBLENBQUEsQ0FGQTtBQUFBLFlBR0EyUCxDQUFBLENBQUFsUCxJQUFBLEdBSEE7QUFBQSxTQXJTQTtBQUFBLEtBQUEsSUFGQTtBQUFBLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgYmxvY2tCbG9nTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1saXN0JylbMF07XHJcblx0XHRcclxuXHRcdGlmKCFibG9ja0Jsb2dNZW51KSByZXR1cm47XHJcblxyXG5cdFx0dmFyIEJsb2dNZW51ID0gZnVuY3Rpb24oYmxvY2spIHtcclxuXHJcblx0XHRcdHRoaXMuYmxvZ01lbnUgPSBibG9jaztcclxuXHJcblx0XHRcdHRoaXMuYmxvZ1dyYXAgPSBibG9jay5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5ibG9nQ29udGFpbmVyID0gYmxvY2sucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5tb2JpbGVTdGF0dXMgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgYnV0dG9uQmxvZ01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nX19uYXYtYnV0dG9uJylbMF0sXHJcblx0XHRcdFx0XHQkdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdGlmKCFidXR0b25CbG9nTWVudSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRidXR0b25CbG9nTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdCR0aGF0Lm1vYmlsZVN0YXR1cyA9ICEkdGhhdC5tb2JpbGVTdGF0dXM7XHJcblx0XHRcdFx0XHRpZigkdGhhdC5tb2JpbGVTdGF0dXMpIHtcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbkJsb2dNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmJsb2dXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0XHRcdGlmKCEkdGhhdC5tb2JpbGVTdGF0dXMpIHJldHVybjtcclxuXHRcdFx0XHRcdHZhciBlbGVtZW50ID0gZS50YXJnZXQsXHJcblx0XHRcdFx0XHRcdGhpZGUgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdHdoaWxlKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ19zaG93ZWQtYmxvZy1tZW51JykpIHtcclxuXHRcdFx0XHRcdFx0XHRoaWRlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmKGhpZGUpIHtcclxuXHRcdFx0XHRcdFx0JHRoYXQubW9iaWxlU3RhdHVzID0gISR0aGF0Lm1vYmlsZVN0YXR1cztcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZml4ZWQgPSBmdW5jdGlvbiBmaXhlZChlKSB7XHJcblxyXG5cdFx0XHRcdHZhciBjb250YWluZXIgPSB0aGlzLmJsb2dDb250YWluZXIsXHJcblx0XHRcdFx0XHRtZW51ID0gdGhpcy5ibG9nTWVudSxcclxuXHRcdFx0XHRcdHdyYXAgPSB0aGlzLmJsb2dXcmFwLFxyXG5cdFx0XHRcdFx0d3JhcFBvcyA9IHdyYXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdFx0XHRjb250YWluZXJIZWlnaHQsXHJcblx0XHRcdFx0XHRtZW51SGVpZ2h0LFxyXG5cdFx0XHRcdFx0Zml4ZWRTdGFydCxcclxuXHRcdFx0XHRcdGZpeGVkU3RvcCxcclxuXHRcdFx0XHRcdHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRcdG1lbnVIZWlnaHQgPSBtZW51Lm9mZnNldEhlaWdodDtcclxuXHRcdFx0XHRcdGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdFx0XHRmaXhlZFN0YXJ0ID0gc2Nyb2xsVG9wICsgd3JhcFBvcy50b3A7XHJcblx0XHRcdFx0XHRmaXhlZFN0b3AgPSAgZml4ZWRTdGFydCArIGNvbnRhaW5lckhlaWdodCAtIChtZW51SGVpZ2h0ICsgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5wYWRkaW5nQm90dG9tKSk7XHJcblxyXG5cdFx0XHRcdGlmKHNjcm9sbFRvcCA8PSBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihzY3JvbGxUb3AgPiBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9pbi1ib3R0b20nIDogJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5hZGQoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9maXhlZCcgOiAnYmxvZ19fbmF2LWxpc3RfaW4tYm90dG9tJyk7XHRcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuY2hlY2tBY3RpdmUgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LFxyXG5cdFx0XHRcdFx0bWVudUl0ZW1zTGlua3MgPSB0aGlzLmJsb2dNZW51LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1pdGVtLWxuaycpLFxyXG5cdFx0XHRcdFx0YmxvZ0l0ZW1JZCxcclxuXHRcdFx0XHRcdGJsb2dJdGVtLFxyXG5cdFx0XHRcdFx0YWN0aXZlSWQsXHJcblx0XHRcdFx0XHRtaW5Ub3AsXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wLFxyXG5cdFx0XHRcdFx0aTtcclxuXHJcblx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3MubGVuZ3RoID09IDApIHJldHVybjtcclxuXHJcblx0XHRcdFx0Zm9yKGkgaW4gbWVudUl0ZW1zTGlua3MpIHtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRibG9nSXRlbUlkID0gbWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2goLyMoLiopL2kpWzFdO1xyXG5cdFx0XHRcdFx0YmxvZ0l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChibG9nSXRlbUlkKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYoIWJsb2dJdGVtKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wID0gTWF0aC5hYnMoYmxvZ0l0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWluVG9wID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHRtaW5Ub3AgPSBjdXJyZW50VG9wO1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVJZCA9IGJsb2dJdGVtSWQ7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fSBcclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50VG9wIDwgbWluVG9wKSB7XHJcblx0XHRcdFx0XHRcdG1pblRvcCA9IGN1cnJlbnRUb3A7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZUlkID0gYmxvZ0l0ZW1JZDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHRcdGlmKGFjdGl2ZUlkKSB7XHJcblx0XHRcdFx0XHR2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoJyMnICsgYWN0aXZlSWQgKyAnJCcsICdpJyk7XHJcblx0XHRcdFx0XHRmb3IoaSBpbiBtZW51SXRlbXNMaW5rcykge1xyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHRcdFx0bWVudUl0ZW1zTGlua3NbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZ19fbmF2LWl0ZW0tbG5rX2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2gocGF0dGVybikpIHtcclxuXHRcdFx0XHRcdFx0XHRtZW51SXRlbXNMaW5rc1tpXS5jbGFzc0xpc3QuYWRkKCdibG9nX19uYXYtaXRlbS1sbmtfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuY2hlY2tBY3RpdmUoKTtcdFxyXG5cdFx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUoKTtcclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5maXhlZC5iaW5kKHsnYmxvZ0NvbnRhaW5lcicgOiB0aGlzLmJsb2dDb250YWluZXIsICdibG9nTWVudScgOiB0aGlzLmJsb2dNZW51LCAnYmxvZ1dyYXAnIDogdGhpcy5ibG9nV3JhcH0pKTtcdFxyXG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpeGVkLmJpbmQoeydibG9nQ29udGFpbmVyJyA6IHRoaXMuYmxvZ0NvbnRhaW5lciwgJ2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnUsICdibG9nV3JhcCcgOiB0aGlzLmJsb2dXcmFwfSkpO1x0XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtZW51ID0gbmV3IEJsb2dNZW51KGJsb2NrQmxvZ01lbnUpO1xyXG5cdFx0bWVudS5pbml0KCk7XHJcblxyXG5cdH0pKClcclxufSk7IiwiLy8gJChmdW5jdGlvbigpe1xyXG5cclxuLy8gXHQvLyBGbGlwcGVyIHRyaWdnZXJcclxuLy8gXHQoZnVuY3Rpb24oKXtcclxuXHJcbi8vIFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZsaXBwZXItdHJpZ2dlcicsIGZ1bmN0aW9uKGUpe1xyXG4vLyBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICBcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4vLyAgXHRcdFx0dmFyIGZsaXBJZCA9ICQodGhpcykuYXR0cignZGF0YS1mbGlwLWlkJyk7XHJcbi8vICBcdFx0XHR2YXIgZmxpcHBlciA9ICQoJy5mbGlwcGVyW2RhdGEtZmxpcC1pZCA9ICcgKyBmbGlwSWQgKyAnXScpO1xyXG5cclxuLy8gIFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKCdmbGlwcGVyLXRyaWdnZXJfYmFjaycpKSB7XHJcbi8vICBcdFx0XHRcdGZsaXBwZXIuYWRkQ2xhc3MoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcbi8vICBcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdmbGlwcGVyLXRyaWdnZXJfaGlkZGVuJyk7XHJcbi8vICBcdFx0XHR9IGVsc2Uge1xyXG4vLyAgXHRcdFx0XHRmbGlwcGVyLnJlbW92ZUNsYXNzKCdmbGlwcGVyX3R1cm5lZCcpO1xyXG4vLyAgXHRcdFx0XHQkKCcuZmxpcHBlci10cmlnZ2VyX2JhY2snKS5yZW1vdmVDbGFzcygnZmxpcHBlci10cmlnZ2VyX2hpZGRlbicpO1xyXG4vLyAgXHRcdFx0fVxyXG5cclxuLy8gXHRcdH0pO1xyXG5cclxuLy8gXHR9KSgpXHJcblxyXG4vLyB9KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmxpcHBlci10cmlnZ2VyJyksXHJcblx0XHRcdGJ0bkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmbGlwcGVyLXRyaWdnZXJfYmFjaycpWzBdLFxyXG5cdFx0XHRpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHR1cm5GbGlwcGVyKGZsaXBJZCkge1xyXG5cdCBcdFx0XHRcclxuXHQgXHRcdFx0dmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcltkYXRhLWZsaXAtaWQgPSAnICsgZmxpcElkICsgJ10nKTtcclxuXHQgXHRcdFx0aWYoIWZsaXBwZXIpIHJldHVybiBmYWxzZTtcclxuXHJcblx0IFx0XHRcdGlmKGZsaXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVyX3R1cm5lZCcpKSB7XHJcblx0XHRcdFx0XHRmbGlwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcblx0XHRcdFx0XHRpZihidG5CYWNrKSBidG5CYWNrLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGZsaXBwZXIuY2xhc3NMaXN0LmFkZCgnZmxpcHBlcl90dXJuZWQnKTtcclxuIFx0XHRcdFx0XHRpZihidG5CYWNrKSBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0fVx0XHRcclxuXHJcblx0XHRmb3IoaSBpbiB0cmlnZ2VyKSB7XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgdHJpZ2dlcltpXS5hZGRFdmVudExpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSBjb250aW51ZTtcclxuXHJcblx0XHRcdHRyaWdnZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHZhciBmbGlwSWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlwLWlkJyk7XHJcblx0XHRcdFx0dHVybkZsaXBwZXIoZmxpcElkKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZih3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywnJykgPT0gJ2xvZ2luJykge1xyXG5cdFx0XHR0dXJuRmxpcHBlcignbWFpbicpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0fSkoKVxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuLy9GT1JNU1x0XHJcbnZhciBhbGxGb3JtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJyksXHJcblx0YWpheEZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWpheC1mb3JtJyksXHJcblx0aSxcclxuXHRmb3JtcyA9IChmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBpLFxyXG5cdFx0XHRtaW5MZW5ndGggPSAzLFxyXG5cdFx0XHR0aXBDbGFzcyA9ICdmb3JtX190aXAnLFxyXG5cdFx0XHR0aXBDbGFzc1Zpc2libGUgPSAnZm9ybV9fdGlwX3Zpc2libGUnLFxyXG5cdFx0XHRtZXNzYWdlQ2xhc3MgPSAnZm9ybV9fdGlwLW1lc3NhZ2UnLFxyXG5cdFx0XHRtZXNzYWdlVGV4dCA9IHtcclxuXHRcdFx0XHQncmVxdWlyZWQnIDogJ9Cf0L7Qu9C1INC90LUg0LfQsNC/0L7Qu9C90LXQvdC+JyxcclxuXHRcdFx0XHQncGF0dGVybicgOiAn0JfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQvdC1INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGE0L7RgNC80LDRgtGDJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbGVtZW50Q2xhc3NFcnJvciA9ICdfZXJyb3InO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRzaG93VGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcdFxyXG5cdFx0XHRcdFx0dHlwZU1lc3NhZ2VDbGFzcyA9IG1lc3NhZ2VDbGFzcyArICdfJyArIHR5cGVFcnIsXHJcblx0XHRcdFx0XHRtZXNzYWdlO1xyXG5cclxuXHRcdFx0XHRpZighdGlwKSB7XHJcblx0XHRcdFx0XHR2YXIgdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3MpO1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHRpcCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKCFtZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0bWVzc2FnZS5jbGFzc0xpc3QuYWRkKG1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmNsYXNzTGlzdC5hZGQodHlwZU1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmlubmVySFRNTCA9IG1lc3NhZ2VUZXh0W3R5cGVFcnJdO1xyXG5cclxuXHRcdFx0XHRcdHRpcC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3NWaXNpYmxlKTtcdFx0XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRoaWRlVGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcclxuXHRcdFx0XHRcdHR5cGVNZXNzYWdlQ2xhc3MgPSBtZXNzYWdlQ2xhc3MgKyAnXycgKyB0eXBlRXJyLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTtcclxuXHJcblx0XHRcdFx0aWYoIXRpcCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdHRpcC5yZW1vdmVDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0aWYoIXRpcC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG1lc3NhZ2VDbGFzcykubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHR0aXAuY2xhc3NMaXN0LnJlbW92ZSh0aXBDbGFzc1Zpc2libGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNsZWFyT25Gb2N1czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHRyaWdnZXJUaXA6IGZ1bmN0aW9uKGVsZW1lbnQsIGNvbmQsIHR5cGVFcnIpIHtcclxuXHRcdFx0XHRpZihjb25kKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNob3dUaXAoZWxlbWVudCwgdHlwZUVycik7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaGlkZVRpcChlbGVtZW50LCB0eXBlRXJyKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNoZWNrUmVxdWlyZWQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHR2YXIgdHlwZUVyciA9ICdyZXF1aXJlZCcsXHJcblx0XHRcdFx0XHRjb25kO1xyXG5cclxuXHRcdFx0XHRzd2l0Y2goZWxlbWVudC50eXBlKSB7XHJcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6IFxyXG5cdFx0XHRcdFx0XHRjb25kID0gKGVsZW1lbnQucmVxdWlyZWQgJiYgIWVsZW1lbnQuY2hlY2tlZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcclxuXHRcdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnJlcXVpcmVkICYmICFlbGVtZW50LmNoZWNrZWQpO1xyXG5cdFx0XHRcdFx0XHRpZighZWxlbWVudC5yZXF1aXJlZCkgcmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdGNvbmQgPSAoZWxlbWVudC5yZXF1aXJlZCAmJiBlbGVtZW50LnZhbHVlLmxlbmd0aCA8IDMpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRyaWdnZXJUaXAoZWxlbWVudCwgY29uZCwgdHlwZUVycik7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRjaGVja1BhdHRlcm46IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZighZWxlbWVudC52YWx1ZSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHRcdHZhciB0eXBlRXJyID0gJ3BhdHRlcm4nLFxyXG5cdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnBhdHRlcm4gJiYgIWVsZW1lbnQudmFsdWUubWF0Y2gobmV3IFJlZ0V4cChlbGVtZW50LnBhdHRlcm4sICdpJykpKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudHJpZ2dlclRpcChlbGVtZW50LCBjb25kLCB0eXBlRXJyKTtcdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Y2hlY2tWYWxpZGF0aW9uOiBmdW5jdGlvbihlbGVtZW50LCBzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHR2YXIgZWxlbWVudElzVmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdGlmKCF0aGlzLmNoZWNrUmVxdWlyZWQoZWxlbWVudCkpIGVsZW1lbnRJc1ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0aWYoIXRoaXMuY2hlY2tQYXR0ZXJuKGVsZW1lbnQpKSBlbGVtZW50SXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZihzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHRcdGlmKCFlbGVtZW50SXNWYWxpZCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBlbGVtZW50SXNWYWxpZDtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHZhbGlkYXRlRm9ybTogZnVuY3Rpb24oZm9ybSkge1xyXG5cdFx0XHRcdHZhciBpbnB1dCA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JyksXHJcblx0XHRcdFx0XHR0ZXh0YXJlYSA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHRhcmVhJyksXHJcblx0XHRcdFx0XHRlbGVtZW50cyA9IFtdLFxyXG5cdFx0XHRcdFx0Zm9ybUlzVmFsaWQgPSB0cnVlLFxyXG5cdFx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoaW5wdXRbaV0pO1xyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IHRleHRhcmVhLmxlbmd0aDsgaSsrKSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdCh0ZXh0YXJlYVtpXSk7XHJcblxyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVsZW1lbnRWYWxpZGF0aW9uID0gJHRoYXQuY2hlY2tWYWxpZGF0aW9uKGVsZW1lbnRzW2ldLCB0cnVlKTtcclxuXHRcdFx0XHRcdGZvcm1Jc1ZhbGlkID0gZm9ybUlzVmFsaWQgPyBlbGVtZW50VmFsaWRhdGlvbiA6IGZvcm1Jc1ZhbGlkO1xyXG5cclxuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLm9ua2V5dXAgPSBlbGVtZW50c1tpXS5vbmlucHV0ID0gZWxlbWVudHNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkdGhhdC5jaGVja1ZhbGlkYXRpb24odGhpcyk7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0ub25wcm9wZXJ0eWNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGUucHJvcGVydHlOYW1lID09ICd2YWx1ZScpICR0aGF0LmNoZWNrVmFsaWRhdGlvbih0aGlzKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmN1dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCR0aGF0LmNoZWNrVmFsaWRhdGlvbihlbGVtZW50c1tpXSksIDApOyBcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdHZhciB0aXBzID0gZm9ybS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKTtcclxuXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmNsZWFyT25Gb2N1cy5iaW5kKGVsZW1lbnRzW2ldKSgpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmtleXVwID0gZWxlbWVudHNbaV0ub25pbnB1dCA9IGVsZW1lbnRzW2ldLm9uY2xpY2sgPSBlbGVtZW50c1tpXS5vbnByb3BlcnR5Y2hhbmdlID0gZWxlbWVudHNbaV0ub25jdXQgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yKGkgPSB0aXBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHRcdHRpcHNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aXBzW2ldKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZvcm1Jc1ZhbGlkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KSgpXHJcblxyXG5cdGZvcihpID0gMDsgaSA8IGFsbEZvcm1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRhbGxGb3Jtc1tpXS5ub1ZhbGlkYXRlID0gdHJ1ZTtcclxuXHRcdGFsbEZvcm1zW2ldLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRyZXR1cm4gZm9ybXMudmFsaWRhdGVGb3JtKHRoaXMpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRmb3IoaSA9IDA7IGkgPCBhamF4Rm9ybXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGFqYXhGb3Jtc1tpXS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRpZighZm9ybXMudmFsaWRhdGVGb3JtKHRoaXMpKSByZXR1cm47XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ0bk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLW1lbnUnKSxcclxuXHRcdFx0aTtcclxuXHRcdGZvcih2YXIgaSBpbiBidG5NZW51KXtcclxuXHJcblx0XHRcdGlmKHR5cGVvZiBidG5NZW51W2ldLmFkZEV2ZW50TGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0YnRuTWVudVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0dmFyIG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuXHRcdFx0XHRpZighbmF2KSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmKCFuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXZfb3BlbicpKSB7XHJcblx0XHRcdFx0XHRuYXYuY2xhc3NMaXN0LmFkZCgnbmF2X29wZW4nKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLW1lbnVfY3Jvc3MnKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnbmF2X19idG4tbWVudV9maXhlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X29wZW4nKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLW1lbnVfY3Jvc3MnKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X19idG4tbWVudV9maXhlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pKClcclxuXHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuLy8gQkxVUlx0XHJcblx0dmFyIGJsdXIgPSAoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBiZ0ltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1pbWcnKVswXSxcclxuXHRcdFx0Zm9ybUJsdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtX193cmFwLWJsdXInKVswXTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cclxuXHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdGlmKCFiZ0ltZyB8fCAhZm9ybUJsdXIpIHJldHVybjtcclxuXHJcblx0XHRcdFx0aWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgKyAxICE9IDApIHtcclxuXHRcdFx0XHRcdGZvcm1CbHVyLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX3dyYXAtYmx1cl9hbHQnKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBwb3NMZWZ0ID0gYmdJbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIGZvcm1CbHVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXHJcblx0XHRcdFx0XHRwb3NUb3AgPSAgYmdJbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gZm9ybUJsdXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuXHRcdFx0XHQvL2Zvcm1CbHVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGJnSW1nLnNyYyArICcpJztcclxuXHRcdFx0XHRmb3JtQmx1ci5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0LzEwICsgJ3JlbScgKyAnICcgKyBwb3NUb3AvMTAgKyAncmVtJztcclxuXHRcdFx0XHRmb3JtQmx1ci5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IGJnSW1nLmNsaWVudFdpZHRoLzEwICsgJ3JlbScgKyAnICcgKyBiZ0ltZy5jbGllbnRIZWlnaHQvMTAgKyAncmVtJztcdFxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fSkoKTtcclxuXHJcblx0Ymx1ci5pbml0KCk7XHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGJsdXIuaW5pdC5iaW5kKGJsdXIpKTtcclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYmx1ci5pbml0LmJpbmQoYmx1cikpO1xyXG5cclxuLy9QYXJhbGxheFxyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBiZ0ltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1pbWcnKVswXSxcclxuXHRcdFx0bGVhZjEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdlX19mb290ZXItYmctbGVhZi0xJylbMF0sXHJcblx0XHRcdGxlYWYyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWxlYWYtMicpWzBdLFxyXG5cdFx0XHRsZWFmMyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1sZWFmLTMnKVswXTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cclxuXHRcdFx0bW92ZTogZnVuY3Rpb24oZWxlbWVudCwgc3BlZWRTaGlmdCwgc3BlZWREcm9wLCBzcGVlZFJvdGF0ZSkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcclxuXHRcdFx0XHRcdHBhZ2VIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxyXG5cdFx0XHRcdFx0Y2xpZW50SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxzY3JvbGxUb3AsXHJcblx0XHRcdFx0XHR0b3AgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgd2luZG93LmJvZHkuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpLFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtO1xyXG5cclxuXHRcdFx0XHRcdHRyYW5zZm9ybSAgPSBzcGVlZFNoaWZ0ID8gJ3RyYW5zbGF0ZVgoJyArICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogMTAwMCAqIHNwZWVkU2hpZnQgKyAnJSknIDogJyc7IFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtICs9IHNwZWVkRHJvcCA/ICd0cmFuc2xhdGVZKCcgKyAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIDEwMDAgKiBzcGVlZERyb3AgKyAnJSknIDogJyc7IFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtICs9ICd0cmFuc2xhdGVaKDApJzsgXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm0gKz0gc3BlZWRSb3RhdGUgPyAncm90YXRlKCcgKyAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIHNwZWVkUm90YXRlICogMzYwICsgJ2RlZyknIDogJyc7XHJcblxyXG5cdFx0XHRcdFx0aWYodHJhbnNmb3JtID09PSAndHJhbnNsYXRlWigwKScpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5ib3R0b20gPSAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIDEwMCArICclJztcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5tb3pUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUubXNUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYobGVhZjEpIHRoaXMubW92ZShsZWFmMSwgMSwgMC43NSwgMC41KTtcclxuXHRcdFx0XHRpZihsZWFmMikgdGhpcy5tb3ZlKGxlYWYyLCAxLCAyLCAxKTtcclxuXHRcdFx0XHRpZihsZWFmMykgdGhpcy5tb3ZlKGxlYWYzLCAxLCA0LCAyKTtcclxuXHRcdFx0XHRpZihiZ0ltZykgdGhpcy5tb3ZlKGJnSW1nLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuXHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH0pKCk7XHRcclxuXHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBhcmFsbGF4LmluaXQuYmluZChwYXJhbGxheCkpO1xyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcbnZhciBtYXAsXHJcblx0c3R5bGVNYXAgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogXCIxMDBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZjAwMDBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjJmMmYyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsLnRlcnJhaW5cIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAtMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQ1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODZhNzdhXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuXHJcblx0dmFyIG15TGF0TG5nID0ge2xhdDogNjAuMDY1NjUxLCBsbmc6IDMwLjMxMjI0OX07XHJcblxyXG5cdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcblx0XHRjZW50ZXI6IG15TGF0TG5nLFxyXG5cdFx0em9vbTogMTUsXHJcblx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcblx0XHRwYW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgXHR6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgXHR6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgXHRcdHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfQ0VOVEVSXHJcbiAgICBcdH0sXHJcbiAgICAgIFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICBcdG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIGRyYWdnYWJsZTogIShcIm9udG91Y2hlbmRcIiBpbiBkb2N1bWVudCksXHJcbiAgICAgICAgc3R5bGVzOiBzdHlsZU1hcFxyXG5cdH0pO1xyXG5cclxuXHR2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcblx0ICAgIHBvc2l0aW9uOiBteUxhdExuZyxcclxuXHQgICAgbWFwOiBtYXAsXHJcblx0ICAgIHRpdGxlOiAn0JzQvtGPINC70L7QutCw0YbQuNGPJ1xyXG5cdH0pO1xyXG5cclxuXHRtYXJrZXIuc2V0TWFwKG1hcCk7XHJcbn0iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0KGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8gZmlyc3QgYWRkIHJhZiBzaGltXHJcblx0XHQvLyBodHRwOi8vd3d3LnBhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XHJcblx0XHQgIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxyXG5cdFx0ICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHRcdCAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XHJcblx0XHQgICAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XHJcblx0XHQgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuXHRcdCAgICAgICAgICB9O1xyXG5cdFx0fSkoKTtcclxuXHJcblx0XHQvLyBtYWluIGZ1bmN0aW9uXHJcblx0XHRmdW5jdGlvbiBzY3JvbGxUb1koc2Nyb2xsVGFyZ2V0WSwgc3BlZWQsIGVhc2luZykge1xyXG5cdFx0ICAgIC8vIHNjcm9sbFRhcmdldFk6IHRoZSB0YXJnZXQgc2Nyb2xsWSBwcm9wZXJ0eSBvZiB0aGUgd2luZG93XHJcblx0XHQgICAgLy8gc3BlZWQ6IHRpbWUgaW4gcGl4ZWxzIHBlciBzZWNvbmRcclxuXHRcdCAgICAvLyBlYXNpbmc6IGVhc2luZyBlcXVhdGlvbiB0byB1c2VcclxuXHJcblx0XHQgICAgdmFyIHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSxcclxuXHRcdCAgICAgICAgc2Nyb2xsVGFyZ2V0WSA9IHNjcm9sbFRhcmdldFkgfHwgMCxcclxuXHRcdCAgICAgICAgc3BlZWQgPSBzcGVlZCB8fCAyMDAwLFxyXG5cdFx0ICAgICAgICBlYXNpbmcgPSBlYXNpbmcgfHwgJ2Vhc2VPdXRTaW5lJyxcclxuXHRcdCAgICAgICAgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuXHRcdCAgICAvLyBtaW4gdGltZSAuMSwgbWF4IHRpbWUgLjggc2Vjb25kc1xyXG5cdFx0ICAgIHZhciB0aW1lID0gTWF0aC5tYXgoLjEsIE1hdGgubWluKE1hdGguYWJzKHNjcm9sbFkgLSBzY3JvbGxUYXJnZXRZKSAvIHNwZWVkLCAuOCkpO1xyXG5cclxuXHRcdCAgICAvLyBlYXNpbmcgZXF1YXRpb25zIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2RhbnJvL2Vhc2luZy1qcy9ibG9iL21hc3Rlci9lYXNpbmcuanNcclxuXHRcdCAgICB2YXIgUElfRDIgPSBNYXRoLlBJIC8gMixcclxuXHRcdCAgICAgICAgZWFzaW5nRXF1YXRpb25zID0ge1xyXG5cdFx0ICAgICAgICAgICAgZWFzZU91dFNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5zaW4ocG9zICogKE1hdGguUEkgLyAyKSk7XHJcblx0XHQgICAgICAgICAgICB9LFxyXG5cdFx0ICAgICAgICAgICAgZWFzZUluT3V0U2luZTogZnVuY3Rpb24gKHBvcykge1xyXG5cdFx0ICAgICAgICAgICAgICAgIHJldHVybiAoLTAuNSAqIChNYXRoLmNvcyhNYXRoLlBJICogcG9zKSAtIDEpKTtcclxuXHRcdCAgICAgICAgICAgIH0sXHJcblx0XHQgICAgICAgICAgICBlYXNlSW5PdXRRdWludDogZnVuY3Rpb24gKHBvcykge1xyXG5cdFx0ICAgICAgICAgICAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsIDUpO1xyXG5cdFx0ICAgICAgICAgICAgICAgIH1cclxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKE1hdGgucG93KChwb3MgLSAyKSwgNSkgKyAyKTtcclxuXHRcdCAgICAgICAgICAgIH1cclxuXHRcdCAgICAgICAgfTtcclxuXHJcblx0XHQgICAgLy8gYWRkIGFuaW1hdGlvbiBsb29wXHJcblx0XHQgICAgZnVuY3Rpb24gdGljaygpIHtcclxuXHRcdCAgICAgICAgY3VycmVudFRpbWUgKz0gMSAvIDYwO1xyXG5cclxuXHRcdCAgICAgICAgdmFyIHAgPSBjdXJyZW50VGltZSAvIHRpbWU7XHJcblx0XHQgICAgICAgIHZhciB0ID0gZWFzaW5nRXF1YXRpb25zW2Vhc2luZ10ocCk7XHJcblxyXG5cdFx0ICAgICAgICBpZiAocCA8IDEpIHtcclxuXHRcdCAgICAgICAgICAgIHJlcXVlc3RBbmltRnJhbWUodGljayk7XHJcblx0XHQgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsWSArICgoc2Nyb2xsVGFyZ2V0WSAtIHNjcm9sbFkpICogdCkpO1xyXG5cdFx0ICAgICAgICB9IGVsc2Uge1xyXG5cdFx0ICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2Nyb2xsIGRvbmUnKTtcclxuXHRcdCAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxUYXJnZXRZKTtcclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgIH1cclxuXHJcblx0XHQgICAgLy8gY2FsbCBpdCBvbmNlIHRvIGdldCBzdGFydGVkXHJcblx0XHQgICAgdGljaygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2hyZWZePVwiI1wiXScpLFxyXG5cdFx0ICAgIHNwZWVkID0gMC41O1xyXG5cclxuXHRcdGZ1bmN0aW9uIGdldEVsZW1lbnRTY3JvbGxQb3NpdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZighZWxlbWVudCkgcmV0dXJuO1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcdFxyXG5cdFx0XHRcdGVsZW1lbnRJZCA9IGVsZW1lbnQuaHJlZi5tYXRjaCgvIyguKikvaSksXHJcblx0XHRcdFx0ZWxlbWVudE9mUGFnZTtcclxuXHJcblx0XHRcdFx0ZWxlbWVudE9mUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZFsxXSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdHJldHVybiBlbGVtZW50T2ZQYWdlID8gc2Nyb2xsVG9wICsgZWxlbWVudE9mUGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgOiAwO1xyXG5cdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGZvcih2YXIgaSBpbiBsaW5rKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZih0eXBlb2YgbGlua1tpXSAhPSAnb2JqZWN0JykgcmV0dXJuO1xyXG5cdFx0XHRcclxuXHRcdFx0bGlua1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHR2YXIgc2Nyb2xsVG8gPSBnZXRFbGVtZW50U2Nyb2xsUG9zaXRpb24odGhpcyksXHJcblx0XHRcdFx0XHRzdGFydCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdHNjcm9sbFRvWShzY3JvbGxUbywgMjAwMCk7XHJcblxyXG5cdFx0ICBcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHR9KSgpXHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuLy8gUFJFTE9BREVSXHRcclxuXHQoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyksXHJcblx0XHRcdGltZ3MgPSBbXSxcclxuXHRcdFx0dG90YWxJbWdzLFxyXG5cdFx0XHR0b3RhbExvYWRlZCA9IDAsXHJcblx0XHRcdHNob3dlZFBlcmNlbnRzID0gMCxcclxuXHRcdFxyXG5cdFx0XHRwcmVsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmVsb2FkZXInKVswXSxcclxuXHRcdFx0cHJlbG9hZGVyUGVyY2VudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmVsb2FkZXJfX3Byb2dyZXNzLXRleHQnKVswXSxcdFxyXG5cdFx0XHR0aW1lcjtcclxuXHJcblx0XHRpZighcHJlbG9hZGVyIHx8ICFwcmVsb2FkZXJQZXJjZW50cykgcmV0dXJuO1xyXG5cclxuXHRcdGZvcih2YXIgaSBpbiBlbGVtZW50cykge1xyXG5cdFx0XHRpZih0eXBlb2YgZWxlbWVudHNbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBpbWdVcmwgPSBudWxsO1xyXG5cclxuXHRcdFx0c3dpdGNoIChlbGVtZW50c1tpXS5ub2RlTmFtZSkge1xyXG5cdFx0XHQgIGNhc2UgJ0lNRyc6XHJcblx0XHRcdCAgICBpbWdVcmwgPSBlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cdFx0XHQgICAgYnJlYWs7XHJcblx0XHRcdCAgY2FzZSAnU1ZHJzogY2FzZSAnc3ZnJzpcclxuXHRcdFx0ICAgIHZhciBzdmdVc2UgPSBlbGVtZW50c1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndXNlJyk7XHJcblx0XHRcdCAgICBpZighc3ZnVXNlWzBdKSBicmVhaztcclxuXHRcdFx0ICAgIHZhciB1c2VIcmVmID0gc3ZnVXNlWzBdLmdldEF0dHJpYnV0ZSgneGxpbms6aHJlZicpO1xyXG5cdFx0XHQgICAgdXNlSHJlZiA9IHVzZUhyZWYubWF0Y2goLyguKj8pXFwuc3ZnLyk7XHJcblx0XHRcdCAgICBpbWdVcmwgPSAodXNlSHJlZiAhPT0gbnVsbCA/IHVzZUhyZWZbMF0gOiBudWxsKTtcclxuXHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0XHQgIGRlZmF1bHQ6XHJcblx0XHRcdCAgICBpZighZWxlbWVudHNbaV0ubm9kZU5hbWUpIGJyZWFrO1xyXG5cdFx0XHRcdHZhciBiZ0ltZyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudHNbaV0pLmJhY2tncm91bmRJbWFnZTtcclxuXHRcdFx0XHRpZihiZ0ltZyAhPSAnbm9uZScpIHtcclxuXHRcdFx0XHRcdGJnSW1nID0gYmdJbWcubWF0Y2goL3VybFxcKCguKj8pXFwpLyk7XHJcblx0XHRcdFx0XHRiZ0ltZyA9IChiZ0ltZyAhPT0gbnVsbCA/IGJnSW1nWzFdLnJlcGxhY2UoLygnfFwiKS9nLCcnKSA6IG51bGwpO1xyXG5cdFx0XHRcdFx0aW1nVXJsID0gYmdJbWc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihpbWdVcmwgIT09IG51bGwgJiYgaW1nVXJsICE9ICdub25lJyAmJiBpbWdzLmluZGV4T2YoaW1nVXJsKSA9PSAtMSkgaW1ncy5wdXNoKGltZ1VybCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG90YWxJbWdzID0gaW1ncy5sZW5ndGg7XHJcblxyXG5cdFx0Zm9yKGkgaW4gaW1ncykge1xyXG5cdFx0XHR2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdGltZy5zcmMgPSBpbWdzW2ldO1xyXG5cdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dG90YWxMb2FkZWQrKztcclxuXHRcdFx0ICBcdHNldFBlcmNlbnRzKHRvdGFsTG9hZGVkLCB0b3RhbEltZ3MpO1xyXG5cdFx0XHQgIFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC30LDQs9GA0YPQttC10L3QvicpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRpbWcub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHRvdGFsTG9hZGVkKys7XHJcblx0XHRcdCAgXHRzZXRQZXJjZW50cyh0b3RhbExvYWRlZCwgdG90YWxJbWdzKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbExvYWRlZCwgdG90YWxJbWdzKSB7XHJcblx0XHRcdHZhciBwZXJjZW50cyA9IE1hdGguY2VpbCh0b3RhbExvYWRlZCAvIHRvdGFsSW1ncyAqIDEwMCk7XHJcblxyXG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0cHJlbG9hZGVyUGVyY2VudHMudGV4dENvbnRlbnQgPSBzaG93ZWRQZXJjZW50cztcclxuXHJcblx0XHRcdGlmKHBlcmNlbnRzID49IDEwMCkge1xyXG5cdFx0XHRcdHByZWxvYWRlclBlcmNlbnRzLnRleHRDb250ZW50ID0gc2hvd2VkUGVyY2VudHMgPSAxMDA7XHJcblxyXG5cdFx0XHRcdGlmKHByZWxvYWRlcikge1xyXG5cdFx0XHRcdFx0cHJlbG9hZGVyLmNsYXNzTGlzdC5hZGQoJ3ByZWxvYWRlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uY2xhc3NMaXN0LmFkZCgnX2xvYWRlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHByZWxvYWRlclBlcmNlbnRzLnRleHRDb250ZW50ID0gc2hvd2VkUGVyY2VudHM7XHJcblx0XHRcdFx0XHRzaG93ZWRQZXJjZW50cysrO1xyXG5cclxuXHRcdFx0XHRcdGlmKHNob3dlZFBlcmNlbnRzID49IHBlcmNlbnRzKSB7XHJcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIDEwKTtcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdH0pKClcclxuXHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuLy8gU0xJREVSXHRcclxuXHQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyJyk7XHJcblxyXG5cdFx0aWYgKCFzbGlkZXIubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdFx0ZnVuY3Rpb24gU2xpZGVyKHJvb3QpIHtcclxuXHRcdFx0dGhpcy5zbGlkZXJSb290ID0gcm9vdDtcclxuXHJcblx0XHRcdHRoaXMuc2xpZGVySXRlbXMgPSBbXTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1OdW0gPSAwO1xyXG5cclxuXHRcdFx0dGhpcy5mbGFnID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyID0gZnVuY3Rpb24oaXRlbSwgbmFtZSkge1xyXG5cdFx0XHRcdHZhciBjbGFzc1ByZWZpeCA9ICdzbGlkZXJfX2l0ZW0tJyxcclxuXHRcdFx0XHRcdHZhbHVlO1xyXG5cclxuXHRcdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lKTtcclxuXHJcblx0XHRcdFx0aWYoIXZhbHVlKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc1ByZWZpeCArIG5hbWUpWzBdO1xyXG5cdFx0XHRcdFx0dmFsdWUgPSAodmFsdWUgPyB2YWx1ZS5pbm5lckhUTUwudHJpbSgpIDogbnVsbCk7XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuZ2VuSXRlbXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgaXRlbXMgPSB0aGlzLnNsaWRlclJvb3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19pdGVtJyksXHJcblx0XHRcdFx0XHRpLFxyXG5cdFx0XHRcdFx0c2xpZGVySXRlbTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0XHRmb3IoaSBpbiBpdGVtcykge1xyXG5cdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW1zW2ldICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcblx0XHRcdFx0XHRzbGlkZXJJdGVtID0ge1xyXG5cdFx0XHRcdFx0XHQndGl0bGUnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAndGl0bGUnKSxcclxuXHRcdFx0XHRcdFx0J2Rlc2NyJzogdGhpcy5nZXRWYWx1ZXNJdGVtc0hlbHBlcihpdGVtc1tpXSwgJ2Rlc2NyJyksXHJcblx0XHRcdFx0XHRcdCdpbWcnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAnaW1nJyksXHJcblx0XHRcdFx0XHRcdCdocmVmJzogdGhpcy5nZXRWYWx1ZXNJdGVtc0hlbHBlcihpdGVtc1tpXSwgJ2hyZWYnKSxcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXJJdGVtc1tpXSA9IHNsaWRlckl0ZW07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMudG90YWwgPSB0aGlzLnNsaWRlckl0ZW1zLmxlbmd0aDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuZ2VuSFRNTCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBibG9ja1BpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tQaWNJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja0Fib3V0VW5pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja1VuaXREZXNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0TGlua0hyZWYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcblx0XHRcdFx0XHRibG9ja05hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG5cdFx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG5cdFx0XHRcdFx0aTtcclxuXHJcblx0XHRcdFx0YmxvY2tQaWMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYycpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tQaWMgPSBibG9ja1BpYztcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljQWN0aXZlSXRlbSA9IGJsb2NrUGljLmFwcGVuZENoaWxkKGJsb2NrUGljSXRlbS5jbG9uZU5vZGUoKSk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtJyk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbSA9IGJsb2NrUGljLmFwcGVuZENoaWxkKGJsb2NrUGljSXRlbSk7XHRcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW0nKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHRcdFxyXG5cclxuXHRcdFx0XHRibG9ja0Fib3V0VW5pdC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2Fib3V0LXVuaXQnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRUaXRsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3VuaXQtdGl0bGUnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRUaXRsZUNudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250LmNsYXNzTGlzdC5hZGQoJ3RpdGxlX3dpdGgtbGluZScpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250LmNsYXNzTGlzdC5hZGQoJ3RpdGxlX3dpdGgtbGluZS11cHBlcicpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdERlc2NyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdW5pdC1kZXNjcicpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdExpbmsuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX191bml0LWxpbmsnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5jbGFzc0xpc3QuYWRkKCdidG5fd2l0aC1pY29uJyk7XHJcblx0XHRcdFx0YmxvY2tVbml0TGlua0hyZWYuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5pbm5lckhUTUwgPSAnPHN2ZyBjbGFzcz1cInN2Zy1pY29uIHN2Zy1pY29uX2xpbmtcIiByb2xlPVwiaW1nXCI+PHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiLi9hc3NldHMvaW1nL3Nwcml0ZS5zdmcjbGlua1wiPjwvdXNlPjwvc3ZnPjxzcGFuPtCf0L7RgdC80L7RgtGA0LXRgtGMINGB0LDQudGCPC9zcGFuPic7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZSA9IGJsb2NrQWJvdXRVbml0LmFwcGVuZENoaWxkKGJsb2NrVW5pdFRpdGxlKS5hcHBlbmRDaGlsZChibG9ja1VuaXRUaXRsZUNudCk7XHJcblx0XHRcdFx0YmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0VGl0bGUpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjciA9IGJsb2NrQWJvdXRVbml0LmFwcGVuZENoaWxkKGJsb2NrVW5pdERlc2NyKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rID0gYmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGluaykuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGlua0hyZWYpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tVbml0TGluay5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrTmF2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2Jyk7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bicpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub2ZvbGxvdycpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzbGlkZXJfX25hdi1pY29uXCI+PC9zcGFuPic7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0ID0gYmxvY2tOYXZCdG5QcmV2LmNsb25lTm9kZSgpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuTmV4dC5pbm5lckhUTUwgPSBibG9ja05hdkJ0blByZXYuaW5uZXJIVE1MO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5QcmV2ID0gYmxvY2tOYXYuYXBwZW5kQ2hpbGQoYmxvY2tOYXZCdG5QcmV2KTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuUHJldi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG5fcHJldicpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5OZXh0ID0gYmxvY2tOYXYuYXBwZW5kQ2hpbGQoYmxvY2tOYXZCdG5OZXh0KTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuTmV4dC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG5fbmV4dCcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tOYXZCdG4uYmluZCh7c2xpZGVyOiB0aGlzLCB0eXBlOiAnbmV4dCd9KSk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja05hdkJ0blByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTmF2QnRuLmJpbmQoe3NsaWRlcjogdGhpcywgdHlwZTogJ3ByZXYnfSkpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlclJvb3QuYXBwZW5kQ2hpbGQoYmxvY2tQaWMpO1xyXG5cdFx0XHRcdHRoaXMuc2xpZGVyUm9vdC5hcHBlbmRDaGlsZChibG9ja0Fib3V0VW5pdCk7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXJSb290LmFwcGVuZENoaWxkKGJsb2NrTmF2KTtcdFxyXG5cclxuXHRcdFx0XHR2YXIgJHRoYXQgPSB0aGlzO1xyXG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGxvYWRlZFNsaWRlcyA9IDA7XHJcblxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gbGlzdGVuTG9hZGVkKGxvYWRlZCwgdG90YWwpIHtcclxuXHRcdFx0XHRcdFx0aWYobG9hZGVkID09IHRvdGFsKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgkdGhhdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Zm9yKGkgaW4gJHRoYXQuc2xpZGVySXRlbXMpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNsaWRlckl0ZW0gPSAkdGhhdC5zbGlkZXJJdGVtc1tpXSxcclxuXHRcdFx0XHRcdFx0XHRzbGlkZUltZyA9IG5ldyBJbWFnZSgpLFxyXG5cdFx0XHRcdFx0XHRcdHNsaWRlVGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRzbGlkZVRodW1iLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYicpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcuc3JjID0gc2xpZGVySXRlbS5pbWc7XHJcblx0XHRcdFx0XHRcdHNsaWRlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC30LDQs9GA0YPQttC10L3QviDQsiDRgdC70LDQudC00LXRgCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0bG9hZGVkU2xpZGVzKys7XHJcblx0XHRcdFx0XHRcdFx0XHRsaXN0ZW5Mb2FkZWQobG9hZGVkU2xpZGVzLCAkdGhhdC50b3RhbCk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC90LUg0LfQsNCz0YDRg9C20LXQvdC+INCyINGB0LvQsNC50LTQtdGAJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRsb2FkZWRTbGlkZXMrKztcclxuXHRcdFx0XHRcdFx0XHRcdGxpc3RlbkxvYWRlZChsb2FkZWRTbGlkZXMsICR0aGF0LnRvdGFsKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvY2tOYXZCdG5OZXh0LmFwcGVuZENoaWxkKHNsaWRlVGh1bWIpLmFwcGVuZENoaWxkKHNsaWRlSW1nKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvY2tOYXZCdG5QcmV2LmFwcGVuZENoaWxkKHNsaWRlVGh1bWIuY2xvbmVOb2RlKCkpLmFwcGVuZENoaWxkKHNsaWRlSW1nLmNsb25lTm9kZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGN1cnJlbnROZXcsIHR5cGUpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuY3VycmVudEl0ZW1OdW0sXHJcblx0XHRcdFx0XHRuZXh0ID0gdGhpcy5nZXROZXh0TnVtKGN1cnJlbnQpLFxyXG5cdFx0XHRcdFx0cHJldiA9IHRoaXMuZ2V0UHJldk51bShjdXJyZW50KSxcclxuXHRcdFx0XHRcdG5leHROZXcgPSB0aGlzLmdldE5leHROdW0oY3VycmVudE5ldyksXHJcblx0XHRcdFx0XHRwcmV2TmV3ID0gdGhpcy5nZXRQcmV2TnVtKGN1cnJlbnROZXcpLFxyXG5cdFx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dCA6IHByZXYpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKTtcclxuXHRcdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dCA6IHByZXYpXS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQodHlwZSA9PSAnbmV4dCcgPyAkdGhhdC5ibG9ja05hdkJ0bk5leHQgOiAkdGhhdC5ibG9ja05hdkJ0blByZXYpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYicpWyh0eXBlID09ICduZXh0JyA/IG5leHROZXcgOiBwcmV2TmV3KV0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYtYnRuLXRodW1iX2FjdGl2ZScpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKVswXS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iX3VuYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5zZXRBY3RpdmVJbmZvID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG5cclxuXHRcdFx0XHR2YXIgYWN0aXZlU2xpZGUgPSB0aGlzLnNsaWRlckl0ZW1zW2N1cnJlbnRdO1xyXG5cclxuXHRcdFx0XHRpZihhY3RpdmVTbGlkZS50aXRsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZS5pbm5lckhUTUwgPSBhY3RpdmVTbGlkZS50aXRsZTtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0VGl0bGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0VGl0bGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYWN0aXZlU2xpZGUuZGVzY3IpIHtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3IuaW5uZXJIVE1MID0gYWN0aXZlU2xpZGUuZGVzY3I7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYWN0aXZlU2xpZGUuaHJlZikge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFjdGl2ZVNsaWRlLmhyZWYpO1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLnNldEFjdGl2ZVBpYyA9IGZ1bmN0aW9uKGN1cnJlbnQsIGJsb2NrUGljSXRlbSkge1xyXG5cdFx0XHRcdHZhciBhY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVySXRlbXNbY3VycmVudF0sXHJcblx0XHRcdFx0ICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHRcdGltZy5zcmMgPSBhY3RpdmVTbGlkZS5pbWc7XHJcblxyXG5cdFx0XHRcdFx0aWYoYmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbV9oaWRkZW4nKTtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmFwcGVuZENoaWxkKGltZykucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHJcblx0XHRcdFx0XHRcdGJsb2NrUGljSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1fdmlzaWJsZScpO1x0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJsb2NrUGljSXRlbS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmNsaWNrTmF2QnRuID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0aWYodGhpcy5zbGlkZXIuZmxhZykge1xyXG5cclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuc2xpZGVyLmN1cnJlbnRJdGVtTnVtLFxyXG5cdFx0XHRcdFx0Y3VycmVudE5ldyA9ICh0aGlzLnR5cGUgPT0gJ25leHQnID8gdGhpcy5zbGlkZXIuZ2V0TmV4dE51bShjdXJyZW50KSA6IHRoaXMuc2xpZGVyLmdldFByZXZOdW0oY3VycmVudCkpO1x0XHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuZmxhZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuYW5pbWF0aW9uRG9uZShbXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLmNoYW5nZVNsaWRlKGN1cnJlbnROZXcsICduZXh0JyksXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLmNoYW5nZVNsaWRlKGN1cnJlbnROZXcsICdwcmV2JyksXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLnNldEFjdGl2ZVBpYyhjdXJyZW50TmV3LCB0aGlzLnNsaWRlci5ibG9ja1BpY0FjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdFx0XHR0aGlzLnNsaWRlci5zZXRBY3RpdmVQaWMoY3VycmVudE5ldywgdGhpcy5zbGlkZXIuYmxvY2tQaWNEaXNhY3RpdmVJdGVtKVxyXG5cdFx0XHRcdFx0XSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuc2V0QWN0aXZlSW5mbyhjdXJyZW50TmV3KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5jdXJyZW50SXRlbU51bSA9IGN1cnJlbnROZXc7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmdldE5leHROdW0gPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcblx0XHRcdFx0Y3VycmVudCsrO1xyXG4gICAgICAgICAgICBcdHJldHVybiAoY3VycmVudCA+IHRoaXMudG90YWwgLSAxID8gMCA6IGN1cnJlbnQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5nZXRQcmV2TnVtID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG4gICAgICAgICAgICBcdGN1cnJlbnQtLTtcclxuICAgICAgICAgICAgXHRyZXR1cm4gKGN1cnJlbnQgPCAwID8gdGhpcy50b3RhbCAtIDEgOiBjdXJyZW50KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uRG9uZSA9IGZ1bmN0aW9uKGFycikge1xyXG5cdFx0XHRcdHZhciAkdGhhdCA9IHRoaXM7XHJcblx0XHRcdFx0UHJvbWlzZS5hbGwoYXJyKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuXHRcdFx0XHQgIFx0JHRoYXQuZmxhZyA9IHRydWU7XHJcblx0XHRcdFx0ICBcdGNvbnNvbGUubG9nKCdhaW1hdGlvbiBkb25lJyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5nZW5JdGVtcygpO1xyXG5cclxuXHRcdFx0XHRpZih0aGlzLnNsaWRlckl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHR0aGlzLmdlbkhUTUwoKS50aGVuKGZ1bmN0aW9uKHNsaWRlcikge1xyXG5cclxuXHRcdFx0XHRcdHNsaWRlci5zbGlkZXJSb290LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9sb2FkZWQnKTtcclxuXHJcblx0XHRcdFx0XHRzbGlkZXIuYW5pbWF0aW9uRG9uZShbXHJcblx0XHRcdFx0XHRcdHNsaWRlci5jaGFuZ2VTbGlkZShzbGlkZXIuY3VycmVudEl0ZW1OdW0sICduZXh0JyksXHJcblx0XHRcdFx0XHRcdHNsaWRlci5jaGFuZ2VTbGlkZShzbGlkZXIuY3VycmVudEl0ZW1OdW0sICdwcmV2JyksXHJcblx0XHRcdFx0XHRcdHNsaWRlci5zZXRBY3RpdmVQaWMoc2xpZGVyLmN1cnJlbnRJdGVtTnVtLCBzbGlkZXIuYmxvY2tQaWNBY3RpdmVJdGVtKSxcclxuXHRcdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZVBpYyhzbGlkZXIuY3VycmVudEl0ZW1OdW0sIHNsaWRlci5ibG9ja1BpY0Rpc2FjdGl2ZUl0ZW0pXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XSk7XHJcblxyXG5cdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZUluZm8oc2xpZGVyLmN1cnJlbnRJdGVtTnVtKTtcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygncmVhZHknKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH07XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcih2YXIgaSBpbiBzbGlkZXIpIHtcclxuXHRcdFx0aWYodHlwZW9mICBzbGlkZXJbaV0gIT0gJ29iamVjdCcpIGNvbnRpbnVlO1xyXG5cdFx0XHR2YXIgcyA9IG5ldyBTbGlkZXIoc2xpZGVyW2ldKTtcclxuXHRcdFx0cy5pbml0KCk7XHJcblx0XHR9XHJcblxyXG5cdH0pKClcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
