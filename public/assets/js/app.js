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
document.addEventListener('DOMContentLoaded', function () {
    // PRELOADER	
    (function () {
        var elements = document.getElementsByTagName('*'), imgs = [], totalImgs, totalLoaded = 0, showedPercents = 0, preloader = document.getElementsByClassName('preloader')[0], preloaderPercents = document.getElementsByClassName('preloader__progress-text')[0], timer;
        setTimeout(function () {
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
        }, 700);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cvYmxvZy5qcyIsImZsaXBwZXItdHJpZ2dlci9mbGlwcGVyLXRyaWdnZXIuanMiLCJmb3JtL2Zvcm0uanMiLCJtYXAvbWFwLmpzIiwibmF2L25hdi5qcyIsInBhZ2UvcGFnZV9fZm9vdGVyLmpzIiwicGFnZS9zY3JvbGwuanMiLCJwcmVsb2FkZXIvcHJlbG9hZGVyLmpzIiwic2xpZGVyL3NsaWRlci5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJibG9ja0Jsb2dNZW51IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIkJsb2dNZW51IiwiYmxvY2siLCJibG9nTWVudSIsImJsb2dXcmFwIiwicGFyZW50Tm9kZSIsImJsb2dDb250YWluZXIiLCJtb2JpbGVTdGF0dXMiLCJ0cmlnZ2VyTW9iaWxlTWVudSIsImJ1dHRvbkJsb2dNZW51IiwiJHRoYXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJib2R5IiwiZSIsImVsZW1lbnQiLCJ0YXJnZXQiLCJoaWRlIiwiY29udGFpbnMiLCJwYXJlbnRFbGVtZW50IiwiZml4ZWQiLCJjb250YWluZXIiLCJtZW51Iiwid3JhcCIsIndyYXBQb3MiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250YWluZXJIZWlnaHQiLCJtZW51SGVpZ2h0IiwiZml4ZWRTdGFydCIsImZpeGVkU3RvcCIsInNjcm9sbFRvcCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0IiwiZG9jdW1lbnRFbGVtZW50Iiwib2Zmc2V0SGVpZ2h0IiwidG9wIiwicGFyc2VGbG9hdCIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImNoZWNrQWN0aXZlIiwid2luSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJtZW51SXRlbXNMaW5rcyIsImJsb2dJdGVtSWQiLCJibG9nSXRlbSIsImFjdGl2ZUlkIiwibWluVG9wIiwiY3VycmVudFRvcCIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJtYXRjaCIsImdldEVsZW1lbnRCeUlkIiwiTWF0aCIsImFicyIsInBhdHRlcm4iLCJSZWdFeHAiLCJpbml0IiwiYmluZCIsInRyaWdnZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYnRuQmFjayIsInR1cm5GbGlwcGVyIiwiZmxpcElkIiwiZmxpcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsImxvY2F0aW9uIiwiaGFzaCIsInJlcGxhY2UiLCJhbGxGb3JtcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYWpheEZvcm1zIiwiZm9ybXMiLCJtaW5MZW5ndGgiLCJ0aXBDbGFzcyIsInRpcENsYXNzVmlzaWJsZSIsIm1lc3NhZ2VDbGFzcyIsIm1lc3NhZ2VUZXh0IiwiZWxlbWVudENsYXNzRXJyb3IiLCJzaG93VGlwIiwidHlwZUVyciIsInR5cGUiLCJ0aXAiLCJ0eXBlTWVzc2FnZUNsYXNzIiwibWVzc2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImlubmVySFRNTCIsImhpZGVUaXAiLCJyZW1vdmVDaGlsZCIsImNsZWFyT25Gb2N1cyIsInRyaWdnZXJUaXAiLCJjb25kIiwiY2hlY2tSZXF1aXJlZCIsInJlcXVpcmVkIiwiY2hlY2tlZCIsInZhbHVlIiwiY2hlY2tQYXR0ZXJuIiwiY2hlY2tWYWxpZGF0aW9uIiwic2hvd1N0eWxlRXJyIiwiZWxlbWVudElzVmFsaWQiLCJ2YWxpZGF0ZUZvcm0iLCJmb3JtIiwiaW5wdXQiLCJ0ZXh0YXJlYSIsImVsZW1lbnRzIiwiZm9ybUlzVmFsaWQiLCJjb25jYXQiLCJlbGVtZW50VmFsaWRhdGlvbiIsIm9ua2V5dXAiLCJvbmlucHV0Iiwib25jbGljayIsIm9ucHJvcGVydHljaGFuZ2UiLCJwcm9wZXJ0eU5hbWUiLCJvbmN1dCIsInNldFRpbWVvdXQiLCJ0aXBzIiwibm9WYWxpZGF0ZSIsIm9uc3VibWl0IiwibWFwIiwic3R5bGVNYXAiLCJpbml0TWFwIiwibXlMYXRMbmciLCJsYXQiLCJsbmciLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsIm1hcFR5cGVDb250cm9sIiwicGFuQ29udHJvbCIsInpvb21Db250cm9sIiwiem9vbUNvbnRyb2xPcHRpb25zIiwicG9zaXRpb24iLCJDb250cm9sUG9zaXRpb24iLCJSSUdIVF9DRU5URVIiLCJzdHJlZXRWaWV3Q29udHJvbCIsIm1hcFR5cGVJZCIsIk1hcFR5cGVJZCIsIlJPQURNQVAiLCJzY3JvbGx3aGVlbCIsImRyYWdnYWJsZSIsInN0eWxlcyIsIm1hcmtlciIsIk1hcmtlciIsInRpdGxlIiwic2V0TWFwIiwiYnRuTWVudSIsIm5hdiIsImJsdXIiLCJiZ0ltZyIsImZvcm1CbHVyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsInBvc0xlZnQiLCJsZWZ0IiwicG9zVG9wIiwic3R5bGUiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kU2l6ZSIsImNsaWVudFdpZHRoIiwicGFyYWxsYXgiLCJsZWFmMSIsImxlYWYyIiwibGVhZjMiLCJtb3ZlIiwic3BlZWRTaGlmdCIsInNwZWVkRHJvcCIsInNwZWVkUm90YXRlIiwicGFnZUhlaWdodCIsInNjcm9sbEhlaWdodCIsInRyYW5zZm9ybSIsImJvdHRvbSIsIndlYmtpdFRyYW5zZm9ybSIsIm1velRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwib1RyYW5zZm9ybSIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNjcm9sbFRvWSIsInNjcm9sbFRhcmdldFkiLCJzcGVlZCIsImVhc2luZyIsInNjcm9sbFkiLCJjdXJyZW50VGltZSIsInRpbWUiLCJtYXgiLCJtaW4iLCJQSV9EMiIsIlBJIiwiZWFzaW5nRXF1YXRpb25zIiwiZWFzZU91dFNpbmUiLCJwb3MiLCJzaW4iLCJlYXNlSW5PdXRTaW5lIiwiY29zIiwiZWFzZUluT3V0UXVpbnQiLCJwb3ciLCJ0aWNrIiwicCIsInQiLCJzY3JvbGxUbyIsImxpbmsiLCJnZXRFbGVtZW50U2Nyb2xsUG9zaXRpb24iLCJlbGVtZW50SWQiLCJocmVmIiwiZWxlbWVudE9mUGFnZSIsInN0YXJ0IiwiaW1ncyIsInRvdGFsSW1ncyIsInRvdGFsTG9hZGVkIiwic2hvd2VkUGVyY2VudHMiLCJwcmVsb2FkZXIiLCJwcmVsb2FkZXJQZXJjZW50cyIsInRpbWVyIiwiaW1nVXJsIiwibm9kZU5hbWUiLCJzdmdVc2UiLCJ1c2VIcmVmIiwiYmFja2dyb3VuZEltYWdlIiwicHVzaCIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwic2V0UGVyY2VudHMiLCJjb25zb2xlIiwibG9nIiwib25lcnJvciIsInBlcmNlbnRzIiwiY2VpbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0Q29udGVudCIsInNldEludGVydmFsIiwic2xpZGVyIiwiU2xpZGVyIiwicm9vdCIsInNsaWRlclJvb3QiLCJzbGlkZXJJdGVtcyIsImN1cnJlbnRJdGVtTnVtIiwiZmxhZyIsImdldFZhbHVlc0l0ZW1zSGVscGVyIiwiaXRlbSIsIm5hbWUiLCJjbGFzc1ByZWZpeCIsInRyaW0iLCJnZW5JdGVtcyIsIml0ZW1zIiwic2xpZGVySXRlbSIsInRvdGFsIiwiZ2VuSFRNTCIsImJsb2NrUGljIiwiYmxvY2tQaWNJdGVtIiwiYmxvY2tBYm91dFVuaXQiLCJibG9ja1VuaXRUaXRsZSIsImJsb2NrVW5pdFRpdGxlQ250IiwiYmxvY2tVbml0RGVzY3IiLCJibG9ja1VuaXRMaW5rIiwiYmxvY2tVbml0TGlua0hyZWYiLCJibG9ja05hdiIsImJsb2NrTmF2QnRuUHJldiIsImJsb2NrTmF2QnRuTmV4dCIsImJsb2NrUGljQWN0aXZlSXRlbSIsImNsb25lTm9kZSIsImJsb2NrUGljRGlzYWN0aXZlSXRlbSIsInNldEF0dHJpYnV0ZSIsImRpc3BsYXkiLCJjbGlja05hdkJ0biIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZGVkU2xpZGVzIiwibGlzdGVuTG9hZGVkIiwibG9hZGVkIiwic2xpZGVJbWciLCJzbGlkZVRodW1iIiwiY2hhbmdlU2xpZGUiLCJjdXJyZW50TmV3IiwiY3VycmVudCIsIm5leHQiLCJnZXROZXh0TnVtIiwicHJldiIsImdldFByZXZOdW0iLCJuZXh0TmV3IiwicHJldk5ldyIsInNldEFjdGl2ZUluZm8iLCJhY3RpdmVTbGlkZSIsImRlc2NyIiwic2V0QWN0aXZlUGljIiwiYW5pbWF0aW9uRG9uZSIsImFyciIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwicyJdLCJtYXBwaW5ncyI6IjtBQUFBQSxRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQSxDQUFBLFlBQUE7QUFBQSxRQUVBLElBQUFDLGFBQUEsR0FBQUYsUUFBQSxDQUFBRyxzQkFBQSxDQUFBLGdCQUFBLEVBQUEsQ0FBQSxDQUFBLENBRkE7QUFBQSxRQUlBLElBQUEsQ0FBQUQsYUFBQTtBQUFBLFlBQUEsT0FKQTtBQUFBLFFBTUEsSUFBQUUsUUFBQSxHQUFBLFVBQUFDLEtBQUEsRUFBQTtBQUFBLFlBRUEsS0FBQUMsUUFBQSxHQUFBRCxLQUFBLENBRkE7QUFBQSxZQUlBLEtBQUFFLFFBQUEsR0FBQUYsS0FBQSxDQUFBRyxVQUFBLENBSkE7QUFBQSxZQU1BLEtBQUFDLGFBQUEsR0FBQUosS0FBQSxDQUFBRyxVQUFBLENBQUFBLFVBQUEsQ0FOQTtBQUFBLFlBUUEsS0FBQUUsWUFBQSxHQUFBLEtBQUEsQ0FSQTtBQUFBLFlBVUEsS0FBQUMsaUJBQUEsR0FBQSxZQUFBO0FBQUEsZ0JBRUEsSUFBQUMsY0FBQSxHQUFBWixRQUFBLENBQUFHLHNCQUFBLENBQUEsa0JBQUEsRUFBQSxDQUFBLENBQUEsRUFDQVUsS0FBQSxHQUFBLElBREEsQ0FGQTtBQUFBLGdCQUtBLElBQUEsQ0FBQUQsY0FBQTtBQUFBLG9CQUFBLE9BTEE7QUFBQSxnQkFPQUEsY0FBQSxDQUFBWCxnQkFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO0FBQUEsb0JBRUFZLEtBQUEsQ0FBQUgsWUFBQSxHQUFBLENBQUFHLEtBQUEsQ0FBQUgsWUFBQSxDQUZBO0FBQUEsb0JBR0EsSUFBQUcsS0FBQSxDQUFBSCxZQUFBLEVBQUE7QUFBQSx3QkFDQUUsY0FBQSxDQUFBRSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQURBO0FBQUEsd0JBRUFGLEtBQUEsQ0FBQU4sUUFBQSxDQUFBTyxTQUFBLENBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQUZBO0FBQUEscUJBQUEsTUFHQTtBQUFBLHdCQUNBSCxjQUFBLENBQUFFLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLG1CQUFBLEVBREE7QUFBQSx3QkFFQUgsS0FBQSxDQUFBTixRQUFBLENBQUFPLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLG1CQUFBLEVBRkE7QUFBQSxxQkFOQTtBQUFBLGlCQUFBLEVBUEE7QUFBQSxnQkFvQkFoQixRQUFBLENBQUFpQixJQUFBLENBQUFoQixnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBaUIsQ0FBQSxFQUFBO0FBQUEsb0JBRUEsSUFBQSxDQUFBTCxLQUFBLENBQUFILFlBQUE7QUFBQSx3QkFBQSxPQUZBO0FBQUEsb0JBR0EsSUFBQVMsT0FBQSxHQUFBRCxDQUFBLENBQUFFLE1BQUEsRUFDQUMsSUFBQSxHQUFBLElBREEsQ0FIQTtBQUFBLG9CQU1BLE9BQUFGLE9BQUEsRUFBQTtBQUFBLHdCQUNBLElBQUFBLE9BQUEsQ0FBQUwsU0FBQSxDQUFBUSxRQUFBLENBQUEsbUJBQUEsQ0FBQSxFQUFBO0FBQUEsNEJBQ0FELElBQUEsR0FBQSxLQUFBLENBREE7QUFBQSw0QkFFQSxNQUZBO0FBQUEseUJBQUE7QUFBQSw0QkFHQUYsT0FBQSxHQUFBQSxPQUFBLENBQUFJLGFBQUEsQ0FKQTtBQUFBLHFCQU5BO0FBQUEsb0JBYUEsSUFBQUYsSUFBQSxFQUFBO0FBQUEsd0JBQ0FSLEtBQUEsQ0FBQUgsWUFBQSxHQUFBLENBQUFHLEtBQUEsQ0FBQUgsWUFBQSxDQURBO0FBQUEsd0JBRUFFLGNBQUEsQ0FBQUUsU0FBQSxDQUFBRSxNQUFBLENBQUEsbUJBQUEsRUFGQTtBQUFBLHdCQUdBSCxLQUFBLENBQUFOLFFBQUEsQ0FBQU8sU0FBQSxDQUFBRSxNQUFBLENBQUEsbUJBQUEsRUFIQTtBQUFBLHFCQWJBO0FBQUEsaUJBQUEsRUFwQkE7QUFBQSxhQUFBLENBVkE7QUFBQSxZQXVEQSxLQUFBUSxLQUFBLEdBQUEsU0FBQUEsS0FBQSxDQUFBTixDQUFBLEVBQUE7QUFBQSxnQkFFQSxJQUFBTyxTQUFBLEdBQUEsS0FBQWhCLGFBQUEsRUFDQWlCLElBQUEsR0FBQSxLQUFBcEIsUUFEQSxFQUVBcUIsSUFBQSxHQUFBLEtBQUFwQixRQUZBLEVBR0FxQixPQUFBLEdBQUFELElBQUEsQ0FBQUUscUJBQUEsRUFIQSxFQUlBQyxlQUpBLEVBS0FDLFVBTEEsRUFNQUMsVUFOQSxFQU9BQyxTQVBBLEVBUUFDLFNBQUEsR0FBQUMsTUFBQSxDQUFBQyxXQUFBLElBQUFwQyxRQUFBLENBQUFxQyxlQUFBLENBQUFILFNBUkEsQ0FGQTtBQUFBLGdCQVlBSCxVQUFBLEdBQUFMLElBQUEsQ0FBQVksWUFBQSxDQVpBO0FBQUEsZ0JBYUFSLGVBQUEsR0FBQUwsU0FBQSxDQUFBYSxZQUFBLENBYkE7QUFBQSxnQkFjQU4sVUFBQSxHQUFBRSxTQUFBLEdBQUFOLE9BQUEsQ0FBQVcsR0FBQSxDQWRBO0FBQUEsZ0JBZUFOLFNBQUEsR0FBQUQsVUFBQSxHQUFBRixlQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBUyxVQUFBLENBQUFDLGdCQUFBLENBQUFoQixTQUFBLEVBQUFpQixVQUFBLENBQUEsR0FBQUYsVUFBQSxDQUFBQyxnQkFBQSxDQUFBaEIsU0FBQSxFQUFBa0IsYUFBQSxDQUFBLENBQUEsQ0FmQTtBQUFBLGdCQWlCQSxJQUFBVCxTQUFBLElBQUFGLFVBQUEsRUFBQTtBQUFBLG9CQUNBTixJQUFBLENBQUFaLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLHNCQUFBLEVBREE7QUFBQSxpQkFqQkE7QUFBQSxnQkFxQkEsSUFBQWtCLFNBQUEsR0FBQUYsVUFBQSxFQUFBO0FBQUEsb0JBQ0FOLElBQUEsQ0FBQVosU0FBQSxDQUFBRSxNQUFBLENBQUEsQ0FBQVksT0FBQSxDQUFBVyxHQUFBLEdBQUFOLFNBQUEsR0FBQUQsVUFBQSxHQUFBLDBCQUFBLEdBQUEsc0JBQUEsRUFEQTtBQUFBLG9CQUVBTixJQUFBLENBQUFaLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLENBQUFhLE9BQUEsQ0FBQVcsR0FBQSxHQUFBTixTQUFBLEdBQUFELFVBQUEsR0FBQSxzQkFBQSxHQUFBLDBCQUFBLEVBRkE7QUFBQSxpQkFyQkE7QUFBQSxhQUFBLENBdkRBO0FBQUEsWUFtRkEsS0FBQVksV0FBQSxHQUFBLFlBQUE7QUFBQSxnQkFFQSxJQUFBQyxTQUFBLEdBQUFWLE1BQUEsQ0FBQVcsV0FBQSxJQUFBOUMsUUFBQSxDQUFBcUMsZUFBQSxDQUFBVSxZQUFBLElBQUEvQyxRQUFBLENBQUFpQixJQUFBLENBQUE4QixZQUFBLEVBQ0FDLGNBQUEsR0FBQSxLQUFBMUMsUUFBQSxDQUFBSCxzQkFBQSxDQUFBLG9CQUFBLENBREEsRUFFQThDLFVBRkEsRUFHQUMsUUFIQSxFQUlBQyxRQUpBLEVBS0FDLE1BTEEsRUFNQUMsVUFOQSxFQU9BQyxDQVBBLENBRkE7QUFBQSxnQkFXQSxJQUFBTixjQUFBLENBQUFPLE1BQUEsSUFBQSxDQUFBO0FBQUEsb0JBQUEsT0FYQTtBQUFBLGdCQWFBLEtBQUFELENBQUEsSUFBQU4sY0FBQSxFQUFBO0FBQUEsb0JBRUEsSUFBQSxPQUFBQSxjQUFBLENBQUFNLENBQUEsQ0FBQSxLQUFBLFFBQUE7QUFBQSx3QkFBQSxTQUZBO0FBQUEsb0JBSUFMLFVBQUEsR0FBQUQsY0FBQSxDQUFBTSxDQUFBLEVBQUFFLFlBQUEsQ0FBQSxNQUFBLEVBQUFDLEtBQUEsQ0FBQSxRQUFBLEVBQUEsQ0FBQSxDQUFBLENBSkE7QUFBQSxvQkFLQVAsUUFBQSxHQUFBbEQsUUFBQSxDQUFBMEQsY0FBQSxDQUFBVCxVQUFBLENBQUEsQ0FMQTtBQUFBLG9CQU9BLElBQUEsQ0FBQUMsUUFBQTtBQUFBLHdCQUFBLFNBUEE7QUFBQSxvQkFTQUcsVUFBQSxHQUFBTSxJQUFBLENBQUFDLEdBQUEsQ0FBQVYsUUFBQSxDQUFBckIscUJBQUEsR0FBQVUsR0FBQSxDQUFBLENBVEE7QUFBQSxvQkFXQSxJQUFBLE9BQUFhLE1BQUEsS0FBQSxXQUFBLEVBQUE7QUFBQSx3QkFDQUEsTUFBQSxHQUFBQyxVQUFBLENBREE7QUFBQSx3QkFFQUYsUUFBQSxHQUFBRixVQUFBLENBRkE7QUFBQSx3QkFHQSxTQUhBO0FBQUEscUJBWEE7QUFBQSxvQkFpQkEsSUFBQUksVUFBQSxHQUFBRCxNQUFBLEVBQUE7QUFBQSx3QkFDQUEsTUFBQSxHQUFBQyxVQUFBLENBREE7QUFBQSx3QkFFQUYsUUFBQSxHQUFBRixVQUFBLENBRkE7QUFBQSxxQkFqQkE7QUFBQSxpQkFiQTtBQUFBLGdCQXFDQSxJQUFBRSxRQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBVSxPQUFBLEdBQUEsSUFBQUMsTUFBQSxDQUFBLE1BQUFYLFFBQUEsR0FBQSxHQUFBLEVBQUEsR0FBQSxDQUFBLENBREE7QUFBQSxvQkFFQSxLQUFBRyxDQUFBLElBQUFOLGNBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUEsT0FBQUEsY0FBQSxDQUFBTSxDQUFBLENBQUEsS0FBQSxRQUFBO0FBQUEsNEJBQUEsU0FEQTtBQUFBLHdCQUVBTixjQUFBLENBQUFNLENBQUEsRUFBQXhDLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLDJCQUFBLEVBRkE7QUFBQSx3QkFJQSxJQUFBZ0MsY0FBQSxDQUFBTSxDQUFBLEVBQUFFLFlBQUEsQ0FBQSxNQUFBLEVBQUFDLEtBQUEsQ0FBQUksT0FBQSxDQUFBLEVBQUE7QUFBQSw0QkFDQWIsY0FBQSxDQUFBTSxDQUFBLEVBQUF4QyxTQUFBLENBQUFDLEdBQUEsQ0FBQSwyQkFBQSxFQURBO0FBQUEseUJBSkE7QUFBQSxxQkFGQTtBQUFBLGlCQXJDQTtBQUFBLGFBQUEsQ0FuRkE7QUFBQSxZQXNJQSxLQUFBZ0QsSUFBQSxHQUFBLFlBQUE7QUFBQSxnQkFFQSxLQUFBbkIsV0FBQSxHQUZBO0FBQUEsZ0JBR0EsS0FBQWpDLGlCQUFBLEdBSEE7QUFBQSxnQkFJQXdCLE1BQUEsQ0FBQWxDLGdCQUFBLENBQUEsUUFBQSxFQUFBLEtBQUF1QixLQUFBLENBQUF3QyxJQUFBLENBQUE7QUFBQSxvQkFBQSxpQkFBQSxLQUFBdkQsYUFBQTtBQUFBLG9CQUFBLFlBQUEsS0FBQUgsUUFBQTtBQUFBLG9CQUFBLFlBQUEsS0FBQUMsUUFBQTtBQUFBLGlCQUFBLENBQUEsRUFKQTtBQUFBLGdCQUtBNEIsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQXVCLEtBQUEsQ0FBQXdDLElBQUEsQ0FBQTtBQUFBLG9CQUFBLGlCQUFBLEtBQUF2RCxhQUFBO0FBQUEsb0JBQUEsWUFBQSxLQUFBSCxRQUFBO0FBQUEsb0JBQUEsWUFBQSxLQUFBQyxRQUFBO0FBQUEsaUJBQUEsQ0FBQSxFQUxBO0FBQUEsZ0JBTUE0QixNQUFBLENBQUFsQyxnQkFBQSxDQUFBLFFBQUEsRUFBQSxLQUFBMkMsV0FBQSxDQUFBb0IsSUFBQSxDQUFBLEVBQUEsWUFBQSxLQUFBMUQsUUFBQSxFQUFBLENBQUEsRUFOQTtBQUFBLGdCQU9BNkIsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQTJDLFdBQUEsQ0FBQW9CLElBQUEsQ0FBQSxFQUFBLFlBQUEsS0FBQTFELFFBQUEsRUFBQSxDQUFBLEVBUEE7QUFBQSxhQUFBLENBdElBO0FBQUEsU0FBQSxDQU5BO0FBQUEsUUF3SkEsSUFBQW9CLElBQUEsR0FBQSxJQUFBdEIsUUFBQSxDQUFBRixhQUFBLENBQUEsQ0F4SkE7QUFBQSxRQXlKQXdCLElBQUEsQ0FBQXFDLElBQUEsR0F6SkE7QUFBQSxLQUFBLElBRkE7QUFBQSxDQUFBLEU7QUN5QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEvRCxRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQSxDQUFBLFlBQUE7QUFBQSxRQUNBLElBQUFnRSxPQUFBLEdBQUFqRSxRQUFBLENBQUFrRSxnQkFBQSxDQUFBLGtCQUFBLENBQUEsRUFDQUMsT0FBQSxHQUFBbkUsUUFBQSxDQUFBRyxzQkFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxDQURBLEVBRUFtRCxDQUZBLENBREE7QUFBQSxRQUtBLFNBQUFjLFdBQUEsQ0FBQUMsTUFBQSxFQUFBO0FBQUEsWUFFQSxJQUFBQyxPQUFBLEdBQUF0RSxRQUFBLENBQUF1RSxhQUFBLENBQUEsNkJBQUFGLE1BQUEsR0FBQSxHQUFBLENBQUEsQ0FGQTtBQUFBLFlBR0EsSUFBQSxDQUFBQyxPQUFBO0FBQUEsZ0JBQUEsT0FBQSxLQUFBLENBSEE7QUFBQSxZQUtBLElBQUFBLE9BQUEsQ0FBQXhELFNBQUEsQ0FBQVEsUUFBQSxDQUFBLGdCQUFBLENBQUEsRUFBQTtBQUFBLGdCQUNBZ0QsT0FBQSxDQUFBeEQsU0FBQSxDQUFBRSxNQUFBLENBQUEsZ0JBQUEsRUFEQTtBQUFBLGdCQUVBLElBQUFtRCxPQUFBO0FBQUEsb0JBQUFBLE9BQUEsQ0FBQXJELFNBQUEsQ0FBQUUsTUFBQSxDQUFBLHdCQUFBLEVBRkE7QUFBQSxhQUFBLE1BR0E7QUFBQSxnQkFDQXNELE9BQUEsQ0FBQXhELFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGdCQUFBLEVBREE7QUFBQSxnQkFFQSxJQUFBb0QsT0FBQTtBQUFBLG9CQUFBQSxPQUFBLENBQUFyRCxTQUFBLENBQUFDLEdBQUEsQ0FBQSx3QkFBQSxFQUZBO0FBQUEsYUFSQTtBQUFBLFNBTEE7QUFBQSxRQW9CQSxLQUFBdUMsQ0FBQSxJQUFBVyxPQUFBLEVBQUE7QUFBQSxZQUVBLElBQUEsT0FBQUEsT0FBQSxDQUFBWCxDQUFBLEVBQUFyRCxnQkFBQSxLQUFBLFVBQUE7QUFBQSxnQkFBQSxTQUZBO0FBQUEsWUFJQWdFLE9BQUEsQ0FBQVgsQ0FBQSxFQUFBckQsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsVUFBQWlCLENBQUEsRUFBQTtBQUFBLGdCQUVBQSxDQUFBLENBQUFzRCxjQUFBLEdBRkE7QUFBQSxnQkFHQSxJQUFBSCxNQUFBLEdBQUEsS0FBQWIsWUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUhBO0FBQUEsZ0JBSUFZLFdBQUEsQ0FBQUMsTUFBQSxFQUpBO0FBQUEsYUFBQSxFQUpBO0FBQUEsU0FwQkE7QUFBQSxRQWtDQSxJQUFBbEMsTUFBQSxDQUFBc0MsUUFBQSxDQUFBQyxJQUFBLENBQUFDLE9BQUEsQ0FBQSxHQUFBLEVBQUEsRUFBQSxLQUFBLE9BQUEsRUFBQTtBQUFBLFlBQ0FQLFdBQUEsQ0FBQSxNQUFBLEVBREE7QUFBQSxTQWxDQTtBQUFBLEtBQUEsSUFGQTtBQUFBLENBQUEsRTtBQ3pCQXBFLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFBQSxJQUdBO0FBQUEsUUFBQTJFLFFBQUEsR0FBQTVFLFFBQUEsQ0FBQTZFLG9CQUFBLENBQUEsTUFBQSxDQUFBLEVBQ0FDLFNBQUEsR0FBQTlFLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSxXQUFBLENBREEsRUFFQW1ELENBRkEsRUFHQXlCLEtBQUEsR0FBQSxZQUFBO0FBQUEsWUFFQSxJQUFBekIsQ0FBQSxFQUNBMEIsU0FBQSxHQUFBLENBREEsRUFFQUMsUUFBQSxHQUFBLFdBRkEsRUFHQUMsZUFBQSxHQUFBLG1CQUhBLEVBSUFDLFlBQUEsR0FBQSxtQkFKQSxFQUtBQyxXQUFBLEdBQUE7QUFBQSxvQkFDQSxZQUFBLG1CQURBO0FBQUEsb0JBRUEsV0FBQSx3Q0FGQTtBQUFBLGlCQUxBLEVBU0FDLGlCQUFBLEdBQUEsUUFUQSxDQUZBO0FBQUEsWUFhQSxPQUFBO0FBQUEsZ0JBRUFDLE9BQUEsRUFBQSxVQUFBbkUsT0FBQSxFQUFBb0UsT0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQTlELFNBQUEsR0FBQU4sT0FBQSxDQUFBcUUsSUFBQSxLQUFBLE9BQUEsR0FBQXJFLE9BQUEsQ0FBQVgsVUFBQSxDQUFBQSxVQUFBLENBQUFBLFVBQUEsR0FBQVcsT0FBQSxDQUFBWCxVQUFBLEVBQ0FpRixHQUFBLEdBQUFoRSxTQUFBLENBQUF0QixzQkFBQSxDQUFBOEUsUUFBQSxFQUFBLENBQUEsQ0FEQSxFQUVBUyxnQkFBQSxHQUFBUCxZQUFBLEdBQUEsR0FBQSxHQUFBSSxPQUZBLEVBR0FJLE9BSEEsQ0FEQTtBQUFBLG9CQU1BLElBQUEsQ0FBQUYsR0FBQSxFQUFBO0FBQUEsd0JBQ0EsSUFBQUEsR0FBQSxHQUFBekYsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLE1BQUEsQ0FBQSxDQURBO0FBQUEsd0JBRUFILEdBQUEsQ0FBQTNFLFNBQUEsQ0FBQUMsR0FBQSxDQUFBa0UsUUFBQSxFQUZBO0FBQUEsd0JBR0F4RCxTQUFBLENBQUFvRSxXQUFBLENBQUFKLEdBQUEsRUFIQTtBQUFBLHFCQU5BO0FBQUEsb0JBWUFFLE9BQUEsR0FBQUYsR0FBQSxDQUFBdEYsc0JBQUEsQ0FBQXVGLGdCQUFBLEVBQUEsQ0FBQSxDQUFBLENBWkE7QUFBQSxvQkFjQSxJQUFBLENBQUFDLE9BQUEsRUFBQTtBQUFBLHdCQUNBQSxPQUFBLEdBQUEzRixRQUFBLENBQUE0RixhQUFBLENBQUEsTUFBQSxDQUFBLENBREE7QUFBQSx3QkFFQUQsT0FBQSxDQUFBN0UsU0FBQSxDQUFBQyxHQUFBLENBQUFvRSxZQUFBLEVBRkE7QUFBQSx3QkFHQVEsT0FBQSxDQUFBN0UsU0FBQSxDQUFBQyxHQUFBLENBQUEyRSxnQkFBQSxFQUhBO0FBQUEsd0JBSUFDLE9BQUEsQ0FBQUcsU0FBQSxHQUFBVixXQUFBLENBQUFHLE9BQUEsQ0FBQSxDQUpBO0FBQUEsd0JBTUFFLEdBQUEsQ0FBQUksV0FBQSxDQUFBRixPQUFBLEVBTkE7QUFBQSxxQkFkQTtBQUFBLG9CQXVCQUYsR0FBQSxDQUFBM0UsU0FBQSxDQUFBQyxHQUFBLENBQUFtRSxlQUFBLEVBdkJBO0FBQUEsaUJBRkE7QUFBQSxnQkE0QkFhLE9BQUEsRUFBQSxVQUFBNUUsT0FBQSxFQUFBb0UsT0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQTlELFNBQUEsR0FBQU4sT0FBQSxDQUFBcUUsSUFBQSxLQUFBLE9BQUEsR0FBQXJFLE9BQUEsQ0FBQVgsVUFBQSxDQUFBQSxVQUFBLENBQUFBLFVBQUEsR0FBQVcsT0FBQSxDQUFBWCxVQUFBLEVBQ0FpRixHQUFBLEdBQUFoRSxTQUFBLENBQUF0QixzQkFBQSxDQUFBOEUsUUFBQSxFQUFBLENBQUEsQ0FEQSxFQUVBUyxnQkFBQSxHQUFBUCxZQUFBLEdBQUEsR0FBQSxHQUFBSSxPQUZBLEVBR0FJLE9BSEEsQ0FEQTtBQUFBLG9CQU1BLElBQUEsQ0FBQUYsR0FBQTtBQUFBLHdCQUFBLE9BTkE7QUFBQSxvQkFRQUUsT0FBQSxHQUFBRixHQUFBLENBQUF0RixzQkFBQSxDQUFBdUYsZ0JBQUEsRUFBQSxDQUFBLENBQUEsQ0FSQTtBQUFBLG9CQVVBLElBQUFDLE9BQUEsRUFBQTtBQUFBLHdCQUNBRixHQUFBLENBQUFPLFdBQUEsQ0FBQUwsT0FBQSxFQURBO0FBQUEscUJBVkE7QUFBQSxvQkFjQSxJQUFBLENBQUFGLEdBQUEsQ0FBQXRGLHNCQUFBLENBQUFnRixZQUFBLEVBQUE1QixNQUFBLEVBQUE7QUFBQSx3QkFDQWtDLEdBQUEsQ0FBQTNFLFNBQUEsQ0FBQUUsTUFBQSxDQUFBa0UsZUFBQSxFQURBO0FBQUEscUJBZEE7QUFBQSxpQkE1QkE7QUFBQSxnQkErQ0FlLFlBQUEsRUFBQSxZQUFBO0FBQUEsb0JBQ0EsS0FBQW5GLFNBQUEsQ0FBQUUsTUFBQSxDQUFBcUUsaUJBQUEsRUFEQTtBQUFBLGlCQS9DQTtBQUFBLGdCQW1EQWEsVUFBQSxFQUFBLFVBQUEvRSxPQUFBLEVBQUFnRixJQUFBLEVBQUFaLE9BQUEsRUFBQTtBQUFBLG9CQUNBLElBQUFZLElBQUEsRUFBQTtBQUFBLHdCQUNBLEtBQUFiLE9BQUEsQ0FBQW5FLE9BQUEsRUFBQW9FLE9BQUEsRUFEQTtBQUFBLHdCQUVBLE9BQUEsS0FBQSxDQUZBO0FBQUEscUJBQUEsTUFHQTtBQUFBLHdCQUNBLEtBQUFRLE9BQUEsQ0FBQTVFLE9BQUEsRUFBQW9FLE9BQUEsRUFEQTtBQUFBLHdCQUVBLE9BQUEsSUFBQSxDQUZBO0FBQUEscUJBSkE7QUFBQSxpQkFuREE7QUFBQSxnQkE2REFhLGFBQUEsRUFBQSxVQUFBakYsT0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQW9FLE9BQUEsR0FBQSxVQUFBLEVBQ0FZLElBREEsQ0FEQTtBQUFBLG9CQUlBLFFBQUFoRixPQUFBLENBQUFxRSxJQUFBO0FBQUEsb0JBQ0EsS0FBQSxVQUFBO0FBQUEsd0JBQ0FXLElBQUEsR0FBQWhGLE9BQUEsQ0FBQWtGLFFBQUEsSUFBQSxDQUFBbEYsT0FBQSxDQUFBbUYsT0FBQSxDQURBO0FBQUEsd0JBRUEsTUFIQTtBQUFBLG9CQUlBLEtBQUEsT0FBQTtBQUFBLHdCQUNBSCxJQUFBLEdBQUFoRixPQUFBLENBQUFrRixRQUFBLElBQUEsQ0FBQWxGLE9BQUEsQ0FBQW1GLE9BQUEsQ0FEQTtBQUFBLHdCQUVBLElBQUEsQ0FBQW5GLE9BQUEsQ0FBQWtGLFFBQUE7QUFBQSw0QkFBQSxPQUFBLElBQUEsQ0FGQTtBQUFBLHdCQUdBLE1BUEE7QUFBQSxvQkFRQTtBQUFBLHdCQUNBRixJQUFBLEdBQUFoRixPQUFBLENBQUFrRixRQUFBLElBQUFsRixPQUFBLENBQUFvRixLQUFBLENBQUFoRCxNQUFBLEdBQUEsQ0FBQSxDQURBO0FBQUEsd0JBRUEsTUFWQTtBQUFBLHFCQUpBO0FBQUEsb0JBaUJBLE9BQUEsS0FBQTJDLFVBQUEsQ0FBQS9FLE9BQUEsRUFBQWdGLElBQUEsRUFBQVosT0FBQSxDQUFBLENBakJBO0FBQUEsaUJBN0RBO0FBQUEsZ0JBaUZBaUIsWUFBQSxFQUFBLFVBQUFyRixPQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBLENBQUFBLE9BQUEsQ0FBQW9GLEtBQUE7QUFBQSx3QkFBQSxPQUFBLElBQUEsQ0FEQTtBQUFBLG9CQUdBLElBQUFoQixPQUFBLEdBQUEsU0FBQSxFQUNBWSxJQUFBLEdBQUFoRixPQUFBLENBQUEwQyxPQUFBLElBQUEsQ0FBQTFDLE9BQUEsQ0FBQW9GLEtBQUEsQ0FBQTlDLEtBQUEsQ0FBQSxJQUFBSyxNQUFBLENBQUEzQyxPQUFBLENBQUEwQyxPQUFBLEVBQUEsR0FBQSxDQUFBLENBREEsQ0FIQTtBQUFBLG9CQU1BLE9BQUEsS0FBQXFDLFVBQUEsQ0FBQS9FLE9BQUEsRUFBQWdGLElBQUEsRUFBQVosT0FBQSxDQUFBLENBTkE7QUFBQSxpQkFqRkE7QUFBQSxnQkEwRkFrQixlQUFBLEVBQUEsVUFBQXRGLE9BQUEsRUFBQXVGLFlBQUEsRUFBQTtBQUFBLG9CQUNBLElBQUFDLGNBQUEsR0FBQSxJQUFBLENBREE7QUFBQSxvQkFFQSxJQUFBLENBQUEsS0FBQVAsYUFBQSxDQUFBakYsT0FBQSxDQUFBO0FBQUEsd0JBQUF3RixjQUFBLEdBQUEsS0FBQSxDQUZBO0FBQUEsb0JBR0EsSUFBQSxDQUFBLEtBQUFILFlBQUEsQ0FBQXJGLE9BQUEsQ0FBQTtBQUFBLHdCQUFBd0YsY0FBQSxHQUFBLEtBQUEsQ0FIQTtBQUFBLG9CQUtBLElBQUFELFlBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUEsQ0FBQUMsY0FBQTtBQUFBLDRCQUFBeEYsT0FBQSxDQUFBTCxTQUFBLENBQUFDLEdBQUEsQ0FBQXNFLGlCQUFBLEVBQUE7QUFBQTtBQUFBLDRCQUNBbEUsT0FBQSxDQUFBTCxTQUFBLENBQUFFLE1BQUEsQ0FBQXFFLGlCQUFBLEVBRkE7QUFBQSxxQkFMQTtBQUFBLG9CQVVBLE9BQUFzQixjQUFBLENBVkE7QUFBQSxpQkExRkE7QUFBQSxnQkF1R0FDLFlBQUEsRUFBQSxVQUFBQyxJQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBQyxLQUFBLEdBQUFELElBQUEsQ0FBQWhDLG9CQUFBLENBQUEsT0FBQSxDQUFBLEVBQ0FrQyxRQUFBLEdBQUFGLElBQUEsQ0FBQWhDLG9CQUFBLENBQUEsVUFBQSxDQURBLEVBRUFtQyxRQUFBLEdBQUEsRUFGQSxFQUdBQyxXQUFBLEdBQUEsSUFIQSxFQUlBcEcsS0FBQSxHQUFBLElBSkEsQ0FEQTtBQUFBLG9CQU9BLEtBQUF5QyxDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUF3RCxLQUFBLENBQUF2RCxNQUFBLEVBQUFELENBQUEsRUFBQTtBQUFBLHdCQUFBMEQsUUFBQSxHQUFBQSxRQUFBLENBQUFFLE1BQUEsQ0FBQUosS0FBQSxDQUFBeEQsQ0FBQSxDQUFBLENBQUEsQ0FQQTtBQUFBLG9CQVFBLEtBQUFBLENBQUEsR0FBQSxDQUFBLEVBQUFBLENBQUEsR0FBQXlELFFBQUEsQ0FBQXhELE1BQUEsRUFBQUQsQ0FBQSxFQUFBO0FBQUEsd0JBQUEwRCxRQUFBLEdBQUFBLFFBQUEsQ0FBQUUsTUFBQSxDQUFBSCxRQUFBLENBQUF6RCxDQUFBLENBQUEsQ0FBQSxDQVJBO0FBQUEsb0JBVUEsS0FBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBMEQsUUFBQSxDQUFBekQsTUFBQSxFQUFBRCxDQUFBLEVBQUEsRUFBQTtBQUFBLHdCQUVBLElBQUE2RCxpQkFBQSxHQUFBdEcsS0FBQSxDQUFBNEYsZUFBQSxDQUFBTyxRQUFBLENBQUExRCxDQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsQ0FGQTtBQUFBLHdCQUdBMkQsV0FBQSxHQUFBQSxXQUFBLEdBQUFFLGlCQUFBLEdBQUFGLFdBQUEsQ0FIQTtBQUFBLHdCQUtBRCxRQUFBLENBQUExRCxDQUFBLEVBQUE4RCxPQUFBLEdBQUFKLFFBQUEsQ0FBQTFELENBQUEsRUFBQStELE9BQUEsR0FBQUwsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBZ0UsT0FBQSxHQUFBLFlBQUE7QUFBQSw0QkFDQXpHLEtBQUEsQ0FBQTRGLGVBQUEsQ0FBQSxJQUFBLEVBREE7QUFBQSx5QkFBQSxDQUxBO0FBQUEsd0JBUUFPLFFBQUEsQ0FBQTFELENBQUEsRUFBQWlFLGdCQUFBLEdBQUEsVUFBQXJHLENBQUEsRUFBQTtBQUFBLDRCQUNBLElBQUFBLENBQUEsQ0FBQXNHLFlBQUEsSUFBQSxPQUFBO0FBQUEsZ0NBQUEzRyxLQUFBLENBQUE0RixlQUFBLENBQUEsSUFBQSxFQURBO0FBQUEseUJBQUEsQ0FSQTtBQUFBLHdCQVdBTyxRQUFBLENBQUExRCxDQUFBLEVBQUFtRSxLQUFBLEdBQUEsWUFBQTtBQUFBLDRCQUNBQyxVQUFBLENBQUE3RyxLQUFBLENBQUE0RixlQUFBLENBQUFPLFFBQUEsQ0FBQTFELENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQURBO0FBQUEseUJBQUEsQ0FYQTtBQUFBLHdCQWVBMEQsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBckQsZ0JBQUEsQ0FBQSxPQUFBLEVBQUFZLEtBQUEsQ0FBQW9GLFlBQUEsRUFmQTtBQUFBLHdCQWdCQWUsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBckQsZ0JBQUEsQ0FBQSxPQUFBLEVBQUFZLEtBQUEsQ0FBQW9GLFlBQUEsRUFoQkE7QUFBQSxxQkFWQTtBQUFBLG9CQThCQVksSUFBQSxDQUFBNUcsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsVUFBQWlCLENBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUF5RyxJQUFBLEdBQUFkLElBQUEsQ0FBQTFHLHNCQUFBLENBQUE4RSxRQUFBLENBQUEsQ0FEQTtBQUFBLHdCQUVBLEtBQUEzQixDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUEwRCxRQUFBLENBQUF6RCxNQUFBLEVBQUFELENBQUEsRUFBQSxFQUFBO0FBQUEsNEJBQ0F6QyxLQUFBLENBQUFvRixZQUFBLENBQUFqQyxJQUFBLENBQUFnRCxRQUFBLENBQUExRCxDQUFBLENBQUEsSUFEQTtBQUFBLDRCQUVBMEQsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBOEQsT0FBQSxHQUFBSixRQUFBLENBQUExRCxDQUFBLEVBQUErRCxPQUFBLEdBQUFMLFFBQUEsQ0FBQTFELENBQUEsRUFBQWdFLE9BQUEsR0FBQU4sUUFBQSxDQUFBMUQsQ0FBQSxFQUFBaUUsZ0JBQUEsR0FBQVAsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBbUUsS0FBQSxHQUFBLElBQUEsQ0FGQTtBQUFBLHlCQUZBO0FBQUEsd0JBTUEsS0FBQW5FLENBQUEsR0FBQXFFLElBQUEsQ0FBQXBFLE1BQUEsR0FBQSxDQUFBLEVBQUFELENBQUEsSUFBQSxDQUFBLEVBQUFBLENBQUEsRUFBQSxFQUFBO0FBQUEsNEJBQ0FxRSxJQUFBLENBQUFyRSxDQUFBLEVBQUE5QyxVQUFBLENBQUF3RixXQUFBLENBQUEyQixJQUFBLENBQUFyRSxDQUFBLENBQUEsRUFEQTtBQUFBLHlCQU5BO0FBQUEscUJBQUEsRUE5QkE7QUFBQSxvQkF5Q0EsT0FBQTJELFdBQUEsQ0F6Q0E7QUFBQSxpQkF2R0E7QUFBQSxhQUFBLENBYkE7QUFBQSxTQUFBLEVBSEEsQ0FIQTtBQUFBLElBMEtBLEtBQUEzRCxDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUFzQixRQUFBLENBQUFyQixNQUFBLEVBQUFELENBQUEsRUFBQSxFQUFBO0FBQUEsUUFDQXNCLFFBQUEsQ0FBQXRCLENBQUEsRUFBQXNFLFVBQUEsR0FBQSxJQUFBLENBREE7QUFBQSxRQUVBaEQsUUFBQSxDQUFBdEIsQ0FBQSxFQUFBdUUsUUFBQSxHQUFBLFVBQUEzRyxDQUFBLEVBQUE7QUFBQSxZQUNBLE9BQUE2RCxLQUFBLENBQUE2QixZQUFBLENBQUEsSUFBQSxDQUFBLENBREE7QUFBQSxTQUFBLENBRkE7QUFBQSxLQTFLQTtBQUFBLElBK0tBLENBL0tBO0FBQUEsSUFpTEEsS0FBQXRELENBQUEsR0FBQSxDQUFBLEVBQUFBLENBQUEsR0FBQXdCLFNBQUEsQ0FBQXZCLE1BQUEsRUFBQUQsQ0FBQSxFQUFBLEVBQUE7QUFBQSxRQUNBd0IsU0FBQSxDQUFBeEIsQ0FBQSxFQUFBdUUsUUFBQSxHQUFBLFVBQUEzRyxDQUFBLEVBQUE7QUFBQSxZQUNBQSxDQUFBLENBQUFzRCxjQUFBLEdBREE7QUFBQSxZQUVBLElBQUEsQ0FBQU8sS0FBQSxDQUFBNkIsWUFBQSxDQUFBLElBQUEsQ0FBQTtBQUFBLGdCQUFBLE9BRkE7QUFBQSxTQUFBLENBREE7QUFBQSxLQWpMQTtBQUFBLElBc0xBLENBdExBO0FBQUEsQ0FBQSxFO0FDQUEsSUFBQWtCLEdBQUEsRUFDQUMsUUFBQSxHQUFBO0FBQUEsUUFDQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUE7QUFBQSxnQkFDQSxFQUNBLGNBQUEsSUFEQSxFQURBO0FBQUEsZ0JBSUEsRUFDQSxPQUFBLFNBREEsRUFKQTtBQUFBLGFBSEE7QUFBQSxTQURBO0FBQUEsUUFhQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLFVBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsS0FEQSxFQURBLENBSEE7QUFBQSxTQWJBO0FBQUEsUUFzQkE7QUFBQSxZQUNBLGVBQUEsS0FEQTtBQUFBLFlBRUEsZUFBQSxpQkFGQTtBQUFBLFlBR0EsV0FBQTtBQUFBLGdCQUNBLEVBQ0EsY0FBQSxJQURBLEVBREE7QUFBQSxnQkFJQSxFQUNBLE9BQUEsU0FEQSxFQUpBO0FBQUEsYUFIQTtBQUFBLFNBdEJBO0FBQUEsUUFrQ0E7QUFBQSxZQUNBLGVBQUEsZ0JBREE7QUFBQSxZQUVBLGVBQUEsa0JBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLFNBQUEsU0FEQSxFQURBLENBSEE7QUFBQSxTQWxDQTtBQUFBLFFBMkNBO0FBQUEsWUFDQSxlQUFBLHdCQURBO0FBQUEsWUFFQSxlQUFBLGtCQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxPQUFBLFNBREEsRUFEQSxDQUhBO0FBQUEsU0EzQ0E7QUFBQSxRQW9EQTtBQUFBLFlBQ0EsZUFBQSxXQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLFNBQUEsU0FEQSxFQURBLENBSEE7QUFBQSxTQXBEQTtBQUFBLFFBNkRBO0FBQUEsWUFDQSxlQUFBLDJCQURBO0FBQUEsWUFFQSxlQUFBLG9CQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxjQUFBLElBREEsRUFEQSxDQUhBO0FBQUEsU0E3REE7QUFBQSxRQXNFQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsS0FEQSxFQURBLENBSEE7QUFBQSxTQXRFQTtBQUFBLFFBK0VBO0FBQUEsWUFDQSxlQUFBLE1BREE7QUFBQSxZQUVBLGVBQUEsS0FGQTtBQUFBLFlBR0EsV0FBQTtBQUFBLGdCQUNBLEVBQ0EsY0FBQSxDQUFBLEdBREEsRUFEQTtBQUFBLGdCQUlBLEVBQ0EsYUFBQSxFQURBLEVBSkE7QUFBQSxhQUhBO0FBQUEsU0EvRUE7QUFBQSxRQTJGQTtBQUFBLFlBQ0EsZUFBQSxjQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsWUFEQSxFQURBLENBSEE7QUFBQSxTQTNGQTtBQUFBLFFBb0dBO0FBQUEsWUFDQSxlQUFBLGVBREE7QUFBQSxZQUVBLGVBQUEsYUFGQTtBQUFBLFlBR0EsV0FBQSxDQUNBLEVBQ0EsY0FBQSxLQURBLEVBREEsQ0FIQTtBQUFBLFNBcEdBO0FBQUEsUUE2R0E7QUFBQSxZQUNBLGVBQUEsU0FEQTtBQUFBLFlBRUEsZUFBQSxLQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxjQUFBLEtBREEsRUFEQSxDQUhBO0FBQUEsU0E3R0E7QUFBQSxRQXNIQTtBQUFBLFlBQ0EsZUFBQSxPQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUE7QUFBQSxnQkFDQSxFQUNBLFNBQUEsU0FEQSxFQURBO0FBQUEsZ0JBSUEsRUFDQSxjQUFBLElBREEsRUFKQTtBQUFBLGFBSEE7QUFBQSxTQXRIQTtBQUFBLEtBREEsQztBQXFJQSxTQUFBQyxPQUFBLEdBQUE7QUFBQSxJQUVBLElBQUEsQ0FBQWhJLFFBQUEsQ0FBQTBELGNBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQSxRQUFBLE9BRkE7QUFBQSxJQUlBLElBQUF1RSxRQUFBLEdBQUE7QUFBQSxRQUFBQyxHQUFBLEVBQUEsU0FBQTtBQUFBLFFBQUFDLEdBQUEsRUFBQSxTQUFBO0FBQUEsS0FBQSxDQUpBO0FBQUEsSUFNQUwsR0FBQSxHQUFBLElBQUFNLE1BQUEsQ0FBQUMsSUFBQSxDQUFBQyxHQUFBLENBQUF0SSxRQUFBLENBQUEwRCxjQUFBLENBQUEsS0FBQSxDQUFBLEVBQUE7QUFBQSxRQUNBNkUsTUFBQSxFQUFBTixRQURBO0FBQUEsUUFFQU8sSUFBQSxFQUFBLEVBRkE7QUFBQSxRQUdBQyxjQUFBLEVBQUEsS0FIQTtBQUFBLFFBSUFDLFVBQUEsRUFBQSxLQUpBO0FBQUEsUUFLQUMsV0FBQSxFQUFBLElBTEE7QUFBQSxRQU1BQyxrQkFBQSxFQUFBLEVBQ0FDLFFBQUEsRUFBQVQsTUFBQSxDQUFBQyxJQUFBLENBQUFTLGVBQUEsQ0FBQUMsWUFEQSxFQU5BO0FBQUEsUUFTQUMsaUJBQUEsRUFBQSxLQVRBO0FBQUEsUUFVQUMsU0FBQSxFQUFBYixNQUFBLENBQUFDLElBQUEsQ0FBQWEsU0FBQSxDQUFBQyxPQVZBO0FBQUEsUUFXQUMsV0FBQSxFQUFBLEtBWEE7QUFBQSxRQVlBQyxTQUFBLEVBQUEsQ0FBQSxpQkFBQXJKLFFBQUEsQ0FaQTtBQUFBLFFBYUFzSixNQUFBLEVBQUF2QixRQWJBO0FBQUEsS0FBQSxDQUFBLENBTkE7QUFBQSxJQXNCQSxJQUFBd0IsTUFBQSxHQUFBLElBQUFuQixNQUFBLENBQUFDLElBQUEsQ0FBQW1CLE1BQUEsQ0FBQTtBQUFBLFFBQ0FYLFFBQUEsRUFBQVosUUFEQTtBQUFBLFFBRUFILEdBQUEsRUFBQUEsR0FGQTtBQUFBLFFBR0EyQixLQUFBLEVBQUEsYUFIQTtBQUFBLEtBQUEsQ0FBQSxDQXRCQTtBQUFBLElBNEJBRixNQUFBLENBQUFHLE1BQUEsQ0FBQTVCLEdBQUEsRUE1QkE7QUFBQSxDO0FDcklBOUgsUUFBQSxDQUFBQyxnQkFBQSxDQUFBLGtCQUFBLEVBQUEsWUFBQTtBQUFBLElBRUEsQ0FBQSxZQUFBO0FBQUEsUUFDQSxJQUFBMEosT0FBQSxHQUFBM0osUUFBQSxDQUFBa0UsZ0JBQUEsQ0FBQSxXQUFBLENBQUEsRUFDQVosQ0FEQSxDQURBO0FBQUEsUUFHQSxTQUFBQSxDQUFBLElBQUFxRyxPQUFBLEVBQUE7QUFBQSxZQUVBLElBQUEsT0FBQUEsT0FBQSxDQUFBckcsQ0FBQSxFQUFBckQsZ0JBQUEsS0FBQSxVQUFBO0FBQUEsZ0JBQUEsU0FGQTtBQUFBLFlBSUEwSixPQUFBLENBQUFyRyxDQUFBLEVBQUFyRCxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBaUIsQ0FBQSxFQUFBO0FBQUEsZ0JBQ0FBLENBQUEsQ0FBQXNELGNBQUEsR0FEQTtBQUFBLGdCQUVBLElBQUFvRixHQUFBLEdBQUE1SixRQUFBLENBQUF1RSxhQUFBLENBQUEsTUFBQSxDQUFBLENBRkE7QUFBQSxnQkFHQSxJQUFBLENBQUFxRixHQUFBO0FBQUEsb0JBQUEsT0FBQSxLQUFBLENBSEE7QUFBQSxnQkFLQSxJQUFBLENBQUFBLEdBQUEsQ0FBQTlJLFNBQUEsQ0FBQVEsUUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsb0JBQ0FzSSxHQUFBLENBQUE5SSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxVQUFBLEVBREE7QUFBQSxvQkFFQSxLQUFBRCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxnQkFBQSxFQUZBO0FBQUEsb0JBR0EsS0FBQUQsU0FBQSxDQUFBQyxHQUFBLENBQUEscUJBQUEsRUFIQTtBQUFBLGlCQUFBLE1BSUE7QUFBQSxvQkFDQTZJLEdBQUEsQ0FBQTlJLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLFVBQUEsRUFEQTtBQUFBLG9CQUVBLEtBQUFGLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLGdCQUFBLEVBRkE7QUFBQSxvQkFHQSxLQUFBRixTQUFBLENBQUFFLE1BQUEsQ0FBQSxxQkFBQSxFQUhBO0FBQUEsaUJBVEE7QUFBQSxhQUFBLEVBSkE7QUFBQSxTQUhBO0FBQUEsS0FBQSxJQUZBO0FBQUEsQ0FBQSxFO0FDQUFoQixRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUEsSUFFQTtBQUFBLFFBQUE0SixJQUFBLEdBQUEsWUFBQTtBQUFBLFFBQ0EsSUFBQUMsS0FBQSxHQUFBOUosUUFBQSxDQUFBRyxzQkFBQSxDQUFBLHFCQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQ0E0SixRQUFBLEdBQUEvSixRQUFBLENBQUFHLHNCQUFBLENBQUEsaUJBQUEsRUFBQSxDQUFBLENBREEsQ0FEQTtBQUFBLFFBSUEsT0FBQTtBQUFBLFlBRUE0RCxJQUFBLEVBQUEsWUFBQTtBQUFBLGdCQUVBLElBQUEsQ0FBQStGLEtBQUEsSUFBQSxDQUFBQyxRQUFBO0FBQUEsb0JBQUEsT0FGQTtBQUFBLGdCQUlBLElBQUFDLFNBQUEsQ0FBQUMsU0FBQSxDQUFBQyxPQUFBLENBQUEsU0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEVBQUE7QUFBQSxvQkFDQUgsUUFBQSxDQUFBakosU0FBQSxDQUFBQyxHQUFBLENBQUEscUJBQUEsRUFEQTtBQUFBLG9CQUVBLE9BRkE7QUFBQSxpQkFKQTtBQUFBLGdCQVNBLElBQUFvSixPQUFBLEdBQUFMLEtBQUEsQ0FBQWpJLHFCQUFBLEdBQUF1SSxJQUFBLEdBQUFMLFFBQUEsQ0FBQWxJLHFCQUFBLEdBQUF1SSxJQUFBLEVBQ0FDLE1BQUEsR0FBQVAsS0FBQSxDQUFBakkscUJBQUEsR0FBQVUsR0FBQSxHQUFBd0gsUUFBQSxDQUFBbEkscUJBQUEsR0FBQVUsR0FEQSxDQVRBO0FBQUEsZ0JBYUE7QUFBQSxnQkFBQXdILFFBQUEsQ0FBQU8sS0FBQSxDQUFBQyxrQkFBQSxHQUFBSixPQUFBLEdBQUEsRUFBQSxHQUFBLEtBQUEsR0FBQSxHQUFBLEdBQUFFLE1BQUEsR0FBQSxFQUFBLEdBQUEsS0FBQSxDQWJBO0FBQUEsZ0JBY0FOLFFBQUEsQ0FBQU8sS0FBQSxDQUFBRSxjQUFBLEdBQUFWLEtBQUEsQ0FBQVcsV0FBQSxHQUFBLEVBQUEsR0FBQSxLQUFBLEdBQUEsR0FBQSxHQUFBWCxLQUFBLENBQUEvRyxZQUFBLEdBQUEsRUFBQSxHQUFBLEtBQUEsQ0FkQTtBQUFBLGFBRkE7QUFBQSxTQUFBLENBSkE7QUFBQSxLQUFBLEVBQUEsQ0FGQTtBQUFBLElBOEJBOEcsSUFBQSxDQUFBOUYsSUFBQSxHQTlCQTtBQUFBLElBK0JBNUIsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUE0SixJQUFBLENBQUE5RixJQUFBLENBQUFDLElBQUEsQ0FBQTZGLElBQUEsQ0FBQSxFQS9CQTtBQUFBLElBZ0NBMUgsTUFBQSxDQUFBbEMsZ0JBQUEsQ0FBQSxRQUFBLEVBQUE0SixJQUFBLENBQUE5RixJQUFBLENBQUFDLElBQUEsQ0FBQTZGLElBQUEsQ0FBQSxFQWhDQTtBQUFBLElBbUNBO0FBQUEsUUFBQWEsUUFBQSxHQUFBLFlBQUE7QUFBQSxRQUVBLElBQUFaLEtBQUEsR0FBQTlKLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSxxQkFBQSxFQUFBLENBQUEsQ0FBQSxFQUNBd0ssS0FBQSxHQUFBM0ssUUFBQSxDQUFBRyxzQkFBQSxDQUFBLHdCQUFBLEVBQUEsQ0FBQSxDQURBLEVBRUF5SyxLQUFBLEdBQUE1SyxRQUFBLENBQUFHLHNCQUFBLENBQUEsd0JBQUEsRUFBQSxDQUFBLENBRkEsRUFHQTBLLEtBQUEsR0FBQTdLLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSx3QkFBQSxFQUFBLENBQUEsQ0FIQSxDQUZBO0FBQUEsUUFPQSxPQUFBO0FBQUEsWUFFQTJLLElBQUEsRUFBQSxVQUFBM0osT0FBQSxFQUFBNEosVUFBQSxFQUFBQyxTQUFBLEVBQUFDLFdBQUEsRUFBQTtBQUFBLGdCQUVBLElBQUEvSSxTQUFBLEdBQUFDLE1BQUEsQ0FBQUMsV0FBQSxJQUFBcEMsUUFBQSxDQUFBcUMsZUFBQSxDQUFBSCxTQUFBLEVBQ0FnSixVQUFBLEdBQUFsTCxRQUFBLENBQUFxQyxlQUFBLENBQUE4SSxZQURBLEVBRUFwSSxZQUFBLEdBQUEvQyxRQUFBLENBQUFxQyxlQUFBLENBQUFVLFlBRkEsRUFFQWIsU0FGQSxFQUdBSyxHQUFBLEdBQUFwQixPQUFBLENBQUFVLHFCQUFBLEdBQUFVLEdBQUEsR0FBQSxDQUFBSixNQUFBLENBQUFXLFdBQUEsSUFBQVgsTUFBQSxDQUFBbEIsSUFBQSxDQUFBOEIsWUFBQSxJQUFBL0MsUUFBQSxDQUFBcUMsZUFBQSxDQUFBVSxZQUFBLENBSEEsRUFJQXFJLFNBSkEsQ0FGQTtBQUFBLGdCQVFBQSxTQUFBLEdBQUFMLFVBQUEsR0FBQSxnQkFBQSxDQUFBLENBQUE3SSxTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQUgsVUFBQSxHQUFBLElBQUEsR0FBQSxFQUFBLENBUkE7QUFBQSxnQkFTQUssU0FBQSxJQUFBSixTQUFBLEdBQUEsZ0JBQUEsQ0FBQSxDQUFBOUksU0FBQSxHQUFBYSxZQUFBLENBQUEsR0FBQW1JLFVBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLEdBQUFGLFNBQUEsR0FBQSxJQUFBLEdBQUEsRUFBQSxDQVRBO0FBQUEsZ0JBVUFJLFNBQUEsSUFBQSxlQUFBLENBVkE7QUFBQSxnQkFXQUEsU0FBQSxJQUFBSCxXQUFBLEdBQUEsWUFBQSxDQUFBLENBQUEvSSxTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBRCxXQUFBLEdBQUEsR0FBQSxHQUFBLE1BQUEsR0FBQSxFQUFBLENBWEE7QUFBQSxnQkFhQSxJQUFBRyxTQUFBLEtBQUEsZUFBQSxFQUFBO0FBQUEsb0JBQ0FqSyxPQUFBLENBQUFtSixLQUFBLENBQUFlLE1BQUEsR0FBQSxDQUFBLENBQUFuSixTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLENBREE7QUFBQSxvQkFFQSxPQUZBO0FBQUEsaUJBYkE7QUFBQSxnQkFrQkEvSixPQUFBLENBQUFtSixLQUFBLENBQUFnQixlQUFBLEdBQUFGLFNBQUEsQ0FsQkE7QUFBQSxnQkFtQkFqSyxPQUFBLENBQUFtSixLQUFBLENBQUFpQixZQUFBLEdBQUFILFNBQUEsQ0FuQkE7QUFBQSxnQkFvQkFqSyxPQUFBLENBQUFtSixLQUFBLENBQUFjLFNBQUEsR0FBQUEsU0FBQSxDQXBCQTtBQUFBLGdCQXFCQWpLLE9BQUEsQ0FBQW1KLEtBQUEsQ0FBQWtCLFdBQUEsR0FBQUosU0FBQSxDQXJCQTtBQUFBLGdCQXNCQWpLLE9BQUEsQ0FBQW1KLEtBQUEsQ0FBQW1CLFVBQUEsR0FBQUwsU0FBQSxDQXRCQTtBQUFBLGFBRkE7QUFBQSxZQTRCQXJILElBQUEsRUFBQSxZQUFBO0FBQUEsZ0JBRUEsSUFBQTRHLEtBQUE7QUFBQSxvQkFBQSxLQUFBRyxJQUFBLENBQUFILEtBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFGQTtBQUFBLGdCQUdBLElBQUFDLEtBQUE7QUFBQSxvQkFBQSxLQUFBRSxJQUFBLENBQUFGLEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFIQTtBQUFBLGdCQUlBLElBQUFDLEtBQUE7QUFBQSxvQkFBQSxLQUFBQyxJQUFBLENBQUFELEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFKQTtBQUFBLGdCQUtBLElBQUFmLEtBQUE7QUFBQSxvQkFBQSxLQUFBZ0IsSUFBQSxDQUFBaEIsS0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUxBO0FBQUEsYUE1QkE7QUFBQSxTQUFBLENBUEE7QUFBQSxLQUFBLEVBQUEsQ0FuQ0E7QUFBQSxJQW1GQTNILE1BQUEsQ0FBQWxDLGdCQUFBLENBQUEsUUFBQSxFQUFBeUssUUFBQSxDQUFBM0csSUFBQSxDQUFBQyxJQUFBLENBQUEwRyxRQUFBLENBQUEsRUFuRkE7QUFBQSxDQUFBLEU7QUNBQTFLLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFBQSxJQUNBLENBQUEsWUFBQTtBQUFBLFFBSUE7QUFBQTtBQUFBLFFBQUFrQyxNQUFBLENBQUF1SixnQkFBQSxHQUFBLFlBQUE7QUFBQSxZQUNBLE9BQUF2SixNQUFBLENBQUF3SixxQkFBQSxJQUNBeEosTUFBQSxDQUFBeUosMkJBREEsSUFFQXpKLE1BQUEsQ0FBQTBKLHdCQUZBLElBR0EsVUFBQUMsUUFBQSxFQUFBO0FBQUEsZ0JBQ0EzSixNQUFBLENBQUF1RixVQUFBLENBQUFvRSxRQUFBLEVBQUEsT0FBQSxFQUFBLEVBREE7QUFBQSxhQUhBLENBREE7QUFBQSxTQUFBLEVBQUEsQ0FKQTtBQUFBLFFBY0E7QUFBQSxpQkFBQUMsU0FBQSxDQUFBQyxhQUFBLEVBQUFDLEtBQUEsRUFBQUMsTUFBQSxFQUFBO0FBQUEsWUFLQTtBQUFBO0FBQUE7QUFBQSxnQkFBQUMsT0FBQSxHQUFBaEssTUFBQSxDQUFBZ0ssT0FBQSxFQUNBSCxhQUFBLEdBQUFBLGFBQUEsSUFBQSxDQURBLEVBRUFDLEtBQUEsR0FBQUEsS0FBQSxJQUFBLElBRkEsRUFHQUMsTUFBQSxHQUFBQSxNQUFBLElBQUEsYUFIQSxFQUlBRSxXQUFBLEdBQUEsQ0FKQSxDQUxBO0FBQUEsWUFZQTtBQUFBLGdCQUFBQyxJQUFBLEdBQUExSSxJQUFBLENBQUEySSxHQUFBLENBQUEsR0FBQSxFQUFBM0ksSUFBQSxDQUFBNEksR0FBQSxDQUFBNUksSUFBQSxDQUFBQyxHQUFBLENBQUF1SSxPQUFBLEdBQUFILGFBQUEsSUFBQUMsS0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBWkE7QUFBQSxZQWVBO0FBQUEsZ0JBQUFPLEtBQUEsR0FBQTdJLElBQUEsQ0FBQThJLEVBQUEsR0FBQSxDQUFBLEVBQ0FDLGVBQUEsR0FBQTtBQUFBLG9CQUNBQyxXQUFBLEVBQUEsVUFBQUMsR0FBQSxFQUFBO0FBQUEsd0JBQ0EsT0FBQWpKLElBQUEsQ0FBQWtKLEdBQUEsQ0FBQUQsR0FBQSxHQUFBLENBQUFqSixJQUFBLENBQUE4SSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLHFCQURBO0FBQUEsb0JBSUFLLGFBQUEsRUFBQSxVQUFBRixHQUFBLEVBQUE7QUFBQSx3QkFDQSxPQUFBLENBQUEsR0FBQSxHQUFBLENBQUFqSixJQUFBLENBQUFvSixHQUFBLENBQUFwSixJQUFBLENBQUE4SSxFQUFBLEdBQUFHLEdBQUEsSUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLHFCQUpBO0FBQUEsb0JBT0FJLGNBQUEsRUFBQSxVQUFBSixHQUFBLEVBQUE7QUFBQSx3QkFDQSxJQUFBLENBQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSw0QkFDQSxPQUFBLE1BQUFqSixJQUFBLENBQUFzSixHQUFBLENBQUFMLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLHlCQURBO0FBQUEsd0JBSUEsT0FBQSxNQUFBLENBQUFqSixJQUFBLENBQUFzSixHQUFBLENBQUFMLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUpBO0FBQUEscUJBUEE7QUFBQSxpQkFEQSxDQWZBO0FBQUEsWUFnQ0E7QUFBQSxxQkFBQU0sSUFBQSxHQUFBO0FBQUEsZ0JBQ0FkLFdBQUEsSUFBQSxJQUFBLEVBQUEsQ0FEQTtBQUFBLGdCQUdBLElBQUFlLENBQUEsR0FBQWYsV0FBQSxHQUFBQyxJQUFBLENBSEE7QUFBQSxnQkFJQSxJQUFBZSxDQUFBLEdBQUFWLGVBQUEsQ0FBQVIsTUFBQSxFQUFBaUIsQ0FBQSxDQUFBLENBSkE7QUFBQSxnQkFNQSxJQUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsb0JBQ0F6QixnQkFBQSxDQUFBd0IsSUFBQSxFQURBO0FBQUEsb0JBRUEvSyxNQUFBLENBQUFrTCxRQUFBLENBQUEsQ0FBQSxFQUFBbEIsT0FBQSxHQUFBLENBQUFILGFBQUEsR0FBQUcsT0FBQSxDQUFBLEdBQUFpQixDQUFBLEVBRkE7QUFBQSxpQkFBQSxNQUdBO0FBQUEsb0JBRUE7QUFBQSxvQkFBQWpMLE1BQUEsQ0FBQWtMLFFBQUEsQ0FBQSxDQUFBLEVBQUFyQixhQUFBLEVBRkE7QUFBQSxpQkFUQTtBQUFBLGFBaENBO0FBQUEsWUFnREE7QUFBQSxZQUFBa0IsSUFBQSxHQWhEQTtBQUFBLFNBZEE7QUFBQSxRQWlFQSxJQUFBSSxJQUFBLEdBQUF0TixRQUFBLENBQUFrRSxnQkFBQSxDQUFBLGFBQUEsQ0FBQSxFQUNBK0gsS0FBQSxHQUFBLEdBREEsQ0FqRUE7QUFBQSxRQW9FQSxTQUFBc0Isd0JBQUEsQ0FBQXBNLE9BQUEsRUFBQTtBQUFBLFlBRUEsSUFBQSxDQUFBQSxPQUFBO0FBQUEsZ0JBQUEsT0FGQTtBQUFBLFlBR0EsSUFBQWUsU0FBQSxHQUFBQyxNQUFBLENBQUFDLFdBQUEsSUFBQXBDLFFBQUEsQ0FBQXFDLGVBQUEsQ0FBQUgsU0FBQSxFQUNBc0wsU0FBQSxHQUFBck0sT0FBQSxDQUFBc00sSUFBQSxDQUFBaEssS0FBQSxDQUFBLFFBQUEsQ0FEQSxFQUVBaUssYUFGQSxDQUhBO0FBQUEsWUFPQUEsYUFBQSxHQUFBMU4sUUFBQSxDQUFBMEQsY0FBQSxDQUFBOEosU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBUEE7QUFBQSxZQVNBLE9BQUFFLGFBQUEsR0FBQXhMLFNBQUEsR0FBQXdMLGFBQUEsQ0FBQTdMLHFCQUFBLEdBQUFVLEdBQUEsR0FBQSxDQUFBLENBVEE7QUFBQSxTQXBFQTtBQUFBLFFBaUZBLFNBQUFlLENBQUEsSUFBQWdLLElBQUEsRUFBQTtBQUFBLFlBRUEsSUFBQSxPQUFBQSxJQUFBLENBQUFoSyxDQUFBLENBQUEsSUFBQSxRQUFBO0FBQUEsZ0JBQUEsT0FGQTtBQUFBLFlBSUFnSyxJQUFBLENBQUFoSyxDQUFBLEVBQUFyRCxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBaUIsQ0FBQSxFQUFBO0FBQUEsZ0JBRUFBLENBQUEsQ0FBQXNELGNBQUEsR0FGQTtBQUFBLGdCQUlBLElBQUE2SSxRQUFBLEdBQUFFLHdCQUFBLENBQUEsSUFBQSxDQUFBLEVBQ0FJLEtBQUEsR0FBQSxJQURBLENBSkE7QUFBQSxnQkFPQTVCLFNBQUEsQ0FBQXNCLFFBQUEsRUFBQSxJQUFBLEVBUEE7QUFBQSxhQUFBLEVBSkE7QUFBQSxTQWpGQTtBQUFBLEtBQUEsSUFEQTtBQUFBLENBQUEsRTtBQ0FBck4sUUFBQSxDQUFBQyxnQkFBQSxDQUFBLGtCQUFBLEVBQUEsWUFBQTtBQUFBLElBRUE7QUFBQSxLQUFBLFlBQUE7QUFBQSxRQUNBLElBQUErRyxRQUFBLEdBQUFoSCxRQUFBLENBQUE2RSxvQkFBQSxDQUFBLEdBQUEsQ0FBQSxFQUNBK0ksSUFBQSxHQUFBLEVBREEsRUFFQUMsU0FGQSxFQUdBQyxXQUFBLEdBQUEsQ0FIQSxFQUlBQyxjQUFBLEdBQUEsQ0FKQSxFQU1BQyxTQUFBLEdBQUFoTyxRQUFBLENBQUFHLHNCQUFBLENBQUEsV0FBQSxFQUFBLENBQUEsQ0FOQSxFQU9BOE4saUJBQUEsR0FBQWpPLFFBQUEsQ0FBQUcsc0JBQUEsQ0FBQSwwQkFBQSxFQUFBLENBQUEsQ0FQQSxFQVFBK04sS0FSQSxDQURBO0FBQUEsUUFXQXhHLFVBQUEsQ0FBQSxZQUFBO0FBQUEsWUFFQSxJQUFBLENBQUFzRyxTQUFBLElBQUEsQ0FBQUMsaUJBQUE7QUFBQSxnQkFBQSxPQUZBO0FBQUEsWUFJQSxTQUFBM0ssQ0FBQSxJQUFBMEQsUUFBQSxFQUFBO0FBQUEsZ0JBQ0EsSUFBQSxPQUFBQSxRQUFBLENBQUExRCxDQUFBLENBQUEsS0FBQSxRQUFBO0FBQUEsb0JBQUEsU0FEQTtBQUFBLGdCQUdBLElBQUE2SyxNQUFBLEdBQUEsSUFBQSxDQUhBO0FBQUEsZ0JBS0EsUUFBQW5ILFFBQUEsQ0FBQTFELENBQUEsRUFBQThLLFFBQUE7QUFBQSxnQkFDQSxLQUFBLEtBQUE7QUFBQSxvQkFDQUQsTUFBQSxHQUFBbkgsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBRSxZQUFBLENBQUEsS0FBQSxDQUFBLENBREE7QUFBQSxvQkFFQSxNQUhBO0FBQUEsZ0JBSUEsS0FBQSxLQUFBLENBSkE7QUFBQSxnQkFJQSxLQUFBLEtBQUE7QUFBQSxvQkFDQSxJQUFBNkssTUFBQSxHQUFBckgsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBdUIsb0JBQUEsQ0FBQSxLQUFBLENBQUEsQ0FEQTtBQUFBLG9CQUVBLElBQUEsQ0FBQXdKLE1BQUEsQ0FBQSxDQUFBLENBQUE7QUFBQSx3QkFBQSxNQUZBO0FBQUEsb0JBR0EsSUFBQUMsT0FBQSxHQUFBRCxNQUFBLENBQUEsQ0FBQSxFQUFBN0ssWUFBQSxDQUFBLFlBQUEsQ0FBQSxDQUhBO0FBQUEsb0JBSUE4SyxPQUFBLEdBQUFBLE9BQUEsQ0FBQTdLLEtBQUEsQ0FBQSxZQUFBLENBQUEsQ0FKQTtBQUFBLG9CQUtBMEssTUFBQSxHQUFBRyxPQUFBLEtBQUEsSUFBQSxHQUFBQSxPQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUxBO0FBQUEsb0JBTUEsTUFWQTtBQUFBLGdCQVdBO0FBQUEsb0JBQ0EsSUFBQSxDQUFBdEgsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBOEssUUFBQTtBQUFBLHdCQUFBLE1BREE7QUFBQSxvQkFFQSxJQUFBdEUsS0FBQSxHQUFBckgsZ0JBQUEsQ0FBQXVFLFFBQUEsQ0FBQTFELENBQUEsQ0FBQSxFQUFBaUwsZUFBQSxDQUZBO0FBQUEsb0JBR0EsSUFBQXpFLEtBQUEsSUFBQSxNQUFBLEVBQUE7QUFBQSx3QkFDQUEsS0FBQSxHQUFBQSxLQUFBLENBQUFyRyxLQUFBLENBQUEsY0FBQSxDQUFBLENBREE7QUFBQSx3QkFFQXFHLEtBQUEsR0FBQUEsS0FBQSxLQUFBLElBQUEsR0FBQUEsS0FBQSxDQUFBLENBQUEsRUFBQW5GLE9BQUEsQ0FBQSxRQUFBLEVBQUEsRUFBQSxDQUFBLEdBQUEsSUFBQSxDQUZBO0FBQUEsd0JBR0F3SixNQUFBLEdBQUFyRSxLQUFBLENBSEE7QUFBQSxxQkFkQTtBQUFBLGlCQUxBO0FBQUEsZ0JBMEJBLElBQUFxRSxNQUFBLEtBQUEsSUFBQSxJQUFBQSxNQUFBLElBQUEsTUFBQSxJQUFBUCxJQUFBLENBQUExRCxPQUFBLENBQUFpRSxNQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQUEsb0JBQUFQLElBQUEsQ0FBQVksSUFBQSxDQUFBTCxNQUFBLEVBMUJBO0FBQUEsYUFKQTtBQUFBLFlBaUNBTixTQUFBLEdBQUFELElBQUEsQ0FBQXJLLE1BQUEsQ0FqQ0E7QUFBQSxZQW1DQSxLQUFBRCxDQUFBLElBQUFzSyxJQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBYSxHQUFBLEdBQUEsSUFBQUMsS0FBQSxFQUFBLENBREE7QUFBQSxnQkFFQUQsR0FBQSxDQUFBRSxHQUFBLEdBQUFmLElBQUEsQ0FBQXRLLENBQUEsQ0FBQSxDQUZBO0FBQUEsZ0JBR0FtTCxHQUFBLENBQUFHLE1BQUEsR0FBQSxZQUFBO0FBQUEsb0JBQ0FkLFdBQUEsR0FEQTtBQUFBLG9CQUVBZSxXQUFBLENBQUFmLFdBQUEsRUFBQUQsU0FBQSxFQUZBO0FBQUEsb0JBR0FpQixPQUFBLENBQUFDLEdBQUEsQ0FBQSxLQUFBSixHQUFBLEdBQUEsWUFBQSxFQUhBO0FBQUEsaUJBQUEsQ0FIQTtBQUFBLGdCQVFBRixHQUFBLENBQUFPLE9BQUEsR0FBQSxZQUFBO0FBQUEsb0JBQ0FsQixXQUFBLEdBREE7QUFBQSxvQkFFQWUsV0FBQSxDQUFBZixXQUFBLEVBQUFELFNBQUEsRUFGQTtBQUFBLGlCQUFBLENBUkE7QUFBQSxhQW5DQTtBQUFBLFlBaURBLFNBQUFnQixXQUFBLENBQUFmLFdBQUEsRUFBQUQsU0FBQSxFQUFBO0FBQUEsZ0JBQ0EsSUFBQW9CLFFBQUEsR0FBQXRMLElBQUEsQ0FBQXVMLElBQUEsQ0FBQXBCLFdBQUEsR0FBQUQsU0FBQSxHQUFBLEdBQUEsQ0FBQSxDQURBO0FBQUEsZ0JBR0FzQixhQUFBLENBQUFqQixLQUFBLEVBSEE7QUFBQSxnQkFJQUQsaUJBQUEsQ0FBQW1CLFdBQUEsR0FBQXJCLGNBQUEsQ0FKQTtBQUFBLGdCQU1BLElBQUFrQixRQUFBLElBQUEsR0FBQSxFQUFBO0FBQUEsb0JBQ0FoQixpQkFBQSxDQUFBbUIsV0FBQSxHQUFBckIsY0FBQSxHQUFBLEdBQUEsQ0FEQTtBQUFBLG9CQUdBLElBQUFDLFNBQUEsRUFBQTtBQUFBLHdCQUNBQSxTQUFBLENBQUFsTixTQUFBLENBQUFDLEdBQUEsQ0FBQSxrQkFBQSxFQURBO0FBQUEsd0JBRUFmLFFBQUEsQ0FBQTZFLG9CQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQS9ELFNBQUEsQ0FBQUMsR0FBQSxDQUFBLFNBQUEsRUFGQTtBQUFBLHFCQUhBO0FBQUEsaUJBQUEsTUFRQTtBQUFBLG9CQUVBbU4sS0FBQSxHQUFBbUIsV0FBQSxDQUFBLFlBQUE7QUFBQSx3QkFFQXBCLGlCQUFBLENBQUFtQixXQUFBLEdBQUFyQixjQUFBLENBRkE7QUFBQSx3QkFHQUEsY0FBQSxHQUhBO0FBQUEsd0JBS0EsSUFBQUEsY0FBQSxJQUFBa0IsUUFBQSxFQUFBO0FBQUEsNEJBQ0FFLGFBQUEsQ0FBQWpCLEtBQUEsRUFEQTtBQUFBLHlCQUxBO0FBQUEscUJBQUEsRUFRQSxFQVJBLENBQUEsQ0FGQTtBQUFBLGlCQWRBO0FBQUEsYUFqREE7QUFBQSxTQUFBLEVBNkVBLEdBN0VBLEVBWEE7QUFBQSxLQUFBLElBRkE7QUFBQSxDQUFBLEU7QUNBQWxPLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFBQSxJQUVBO0FBQUEsS0FBQSxZQUFBO0FBQUEsUUFFQSxJQUFBcVAsTUFBQSxHQUFBdFAsUUFBQSxDQUFBRyxzQkFBQSxDQUFBLFFBQUEsQ0FBQSxDQUZBO0FBQUEsUUFJQSxJQUFBLENBQUFtUCxNQUFBLENBQUEvTCxNQUFBO0FBQUEsWUFBQSxPQUpBO0FBQUEsUUFNQSxTQUFBZ00sTUFBQSxDQUFBQyxJQUFBLEVBQUE7QUFBQSxZQUNBLEtBQUFDLFVBQUEsR0FBQUQsSUFBQSxDQURBO0FBQUEsWUFHQSxLQUFBRSxXQUFBLEdBQUEsRUFBQSxDQUhBO0FBQUEsWUFLQSxLQUFBQyxjQUFBLEdBQUEsQ0FBQSxDQUxBO0FBQUEsWUFPQSxLQUFBQyxJQUFBLEdBQUEsS0FBQSxDQVBBO0FBQUEsWUFTQSxLQUFBQyxvQkFBQSxHQUFBLFVBQUFDLElBQUEsRUFBQUMsSUFBQSxFQUFBO0FBQUEsZ0JBQ0EsSUFBQUMsV0FBQSxHQUFBLGVBQUEsRUFDQXpKLEtBREEsQ0FEQTtBQUFBLGdCQUlBQSxLQUFBLEdBQUF1SixJQUFBLENBQUF0TSxZQUFBLENBQUEsVUFBQXVNLElBQUEsQ0FBQSxDQUpBO0FBQUEsZ0JBTUEsSUFBQSxDQUFBeEosS0FBQSxFQUFBO0FBQUEsb0JBQ0FBLEtBQUEsR0FBQXVKLElBQUEsQ0FBQTNQLHNCQUFBLENBQUE2UCxXQUFBLEdBQUFELElBQUEsRUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLG9CQUVBeEosS0FBQSxHQUFBQSxLQUFBLEdBQUFBLEtBQUEsQ0FBQVQsU0FBQSxDQUFBbUssSUFBQSxFQUFBLEdBQUEsSUFBQSxDQUZBO0FBQUEsaUJBTkE7QUFBQSxnQkFXQSxPQUFBMUosS0FBQSxDQVhBO0FBQUEsYUFBQSxDQVRBO0FBQUEsWUF1QkEsS0FBQTJKLFFBQUEsR0FBQSxZQUFBO0FBQUEsZ0JBQ0EsSUFBQUMsS0FBQSxHQUFBLEtBQUFWLFVBQUEsQ0FBQXRQLHNCQUFBLENBQUEsY0FBQSxDQUFBLEVBQ0FtRCxDQURBLEVBRUE4TSxVQUZBLENBREE7QUFBQSxnQkFLQSxJQUFBLENBQUFELEtBQUEsQ0FBQTVNLE1BQUE7QUFBQSxvQkFBQSxPQUFBLEtBQUEsQ0FMQTtBQUFBLGdCQU9BLEtBQUFELENBQUEsSUFBQTZNLEtBQUEsRUFBQTtBQUFBLG9CQUNBLElBQUEsT0FBQUEsS0FBQSxDQUFBN00sQ0FBQSxDQUFBLEtBQUEsUUFBQTtBQUFBLHdCQUFBLFNBREE7QUFBQSxvQkFFQThNLFVBQUEsR0FBQTtBQUFBLHdCQUNBLFNBQUEsS0FBQVAsb0JBQUEsQ0FBQU0sS0FBQSxDQUFBN00sQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQURBO0FBQUEsd0JBRUEsU0FBQSxLQUFBdU0sb0JBQUEsQ0FBQU0sS0FBQSxDQUFBN00sQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQUZBO0FBQUEsd0JBR0EsT0FBQSxLQUFBdU0sb0JBQUEsQ0FBQU0sS0FBQSxDQUFBN00sQ0FBQSxDQUFBLEVBQUEsS0FBQSxDQUhBO0FBQUEsd0JBSUEsUUFBQSxLQUFBdU0sb0JBQUEsQ0FBQU0sS0FBQSxDQUFBN00sQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUpBO0FBQUEscUJBQUEsQ0FGQTtBQUFBLG9CQVNBLEtBQUFvTSxXQUFBLENBQUFwTSxDQUFBLElBQUE4TSxVQUFBLENBVEE7QUFBQSxpQkFQQTtBQUFBLGdCQWtCQSxLQUFBQyxLQUFBLEdBQUEsS0FBQVgsV0FBQSxDQUFBbk0sTUFBQSxDQWxCQTtBQUFBLGFBQUEsQ0F2QkE7QUFBQSxZQTRDQSxLQUFBK00sT0FBQSxHQUFBLFlBQUE7QUFBQSxnQkFDQSxJQUFBQyxRQUFBLEdBQUF2USxRQUFBLENBQUE0RixhQUFBLENBQUEsS0FBQSxDQUFBLEVBQ0E0SyxZQUFBLEdBQUF4USxRQUFBLENBQUE0RixhQUFBLENBQUEsS0FBQSxDQURBLEVBRUE2SyxjQUFBLEdBQUF6USxRQUFBLENBQUE0RixhQUFBLENBQUEsS0FBQSxDQUZBLEVBR0E4SyxjQUFBLEdBQUExUSxRQUFBLENBQUE0RixhQUFBLENBQUEsS0FBQSxDQUhBLEVBSUErSyxpQkFBQSxHQUFBM1EsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FKQSxFQUtBZ0wsY0FBQSxHQUFBNVEsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FMQSxFQU1BaUwsYUFBQSxHQUFBN1EsUUFBQSxDQUFBNEYsYUFBQSxDQUFBLEtBQUEsQ0FOQSxFQU9Ba0wsaUJBQUEsR0FBQTlRLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxHQUFBLENBUEEsRUFRQW1MLFFBQUEsR0FBQS9RLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxLQUFBLENBUkEsRUFTQW9MLGVBQUEsR0FBQWhSLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxHQUFBLENBVEEsRUFVQXFMLGVBQUEsR0FBQWpSLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxHQUFBLENBVkEsRUFXQXRDLENBWEEsQ0FEQTtBQUFBLGdCQWNBaU4sUUFBQSxDQUFBelAsU0FBQSxDQUFBQyxHQUFBLENBQUEsa0JBQUEsRUFkQTtBQUFBLGdCQWVBLEtBQUF3UCxRQUFBLEdBQUFBLFFBQUEsQ0FmQTtBQUFBLGdCQWdCQSxLQUFBVyxrQkFBQSxHQUFBWCxRQUFBLENBQUExSyxXQUFBLENBQUEySyxZQUFBLENBQUFXLFNBQUEsRUFBQSxDQUFBLENBaEJBO0FBQUEsZ0JBaUJBLEtBQUFELGtCQUFBLENBQUFwUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSx1QkFBQSxFQWpCQTtBQUFBLGdCQWtCQSxLQUFBbVEsa0JBQUEsQ0FBQXBRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLCtCQUFBLEVBbEJBO0FBQUEsZ0JBbUJBLEtBQUFxUSxxQkFBQSxHQUFBYixRQUFBLENBQUExSyxXQUFBLENBQUEySyxZQUFBLENBQUEsQ0FuQkE7QUFBQSxnQkFvQkEsS0FBQVkscUJBQUEsQ0FBQXRRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHVCQUFBLEVBcEJBO0FBQUEsZ0JBcUJBLEtBQUFxUSxxQkFBQSxDQUFBdFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsOEJBQUEsRUFyQkE7QUFBQSxnQkF1QkEwUCxjQUFBLENBQUEzUCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxvQkFBQSxFQXZCQTtBQUFBLGdCQXdCQTJQLGNBQUEsQ0FBQTVQLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLG9CQUFBLEVBeEJBO0FBQUEsZ0JBeUJBNFAsaUJBQUEsQ0FBQTdQLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLE9BQUEsRUF6QkE7QUFBQSxnQkEwQkE0UCxpQkFBQSxDQUFBN1AsU0FBQSxDQUFBQyxHQUFBLENBQUEsaUJBQUEsRUExQkE7QUFBQSxnQkEyQkE0UCxpQkFBQSxDQUFBN1AsU0FBQSxDQUFBQyxHQUFBLENBQUEsdUJBQUEsRUEzQkE7QUFBQSxnQkE0QkE2UCxjQUFBLENBQUE5UCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxvQkFBQSxFQTVCQTtBQUFBLGdCQTZCQThQLGFBQUEsQ0FBQS9QLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLG1CQUFBLEVBN0JBO0FBQUEsZ0JBOEJBK1AsaUJBQUEsQ0FBQWhRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLEtBQUEsRUE5QkE7QUFBQSxnQkErQkErUCxpQkFBQSxDQUFBaFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsZUFBQSxFQS9CQTtBQUFBLGdCQWdDQStQLGlCQUFBLENBQUFPLFlBQUEsQ0FBQSxNQUFBLEVBQUEsR0FBQSxFQWhDQTtBQUFBLGdCQWlDQVAsaUJBQUEsQ0FBQU8sWUFBQSxDQUFBLFFBQUEsRUFBQSxRQUFBLEVBakNBO0FBQUEsZ0JBa0NBUCxpQkFBQSxDQUFBaEwsU0FBQSxHQUFBLG1MQUFBLENBbENBO0FBQUEsZ0JBb0NBLEtBQUE0SyxjQUFBLEdBQUFELGNBQUEsQ0FBQTVLLFdBQUEsQ0FBQTZLLGNBQUEsRUFBQTdLLFdBQUEsQ0FBQThLLGlCQUFBLENBQUEsQ0FwQ0E7QUFBQSxnQkFxQ0FGLGNBQUEsQ0FBQTVLLFdBQUEsQ0FBQTZLLGNBQUEsRUFBQXBHLEtBQUEsQ0FBQWdILE9BQUEsR0FBQSxNQUFBLENBckNBO0FBQUEsZ0JBc0NBLEtBQUFWLGNBQUEsR0FBQUgsY0FBQSxDQUFBNUssV0FBQSxDQUFBK0ssY0FBQSxDQUFBLENBdENBO0FBQUEsZ0JBdUNBLEtBQUFBLGNBQUEsQ0FBQXRHLEtBQUEsQ0FBQWdILE9BQUEsR0FBQSxNQUFBLENBdkNBO0FBQUEsZ0JBd0NBLEtBQUFULGFBQUEsR0FBQUosY0FBQSxDQUFBNUssV0FBQSxDQUFBZ0wsYUFBQSxFQUFBaEwsV0FBQSxDQUFBaUwsaUJBQUEsQ0FBQSxDQXhDQTtBQUFBLGdCQXlDQSxLQUFBRCxhQUFBLENBQUFyUSxVQUFBLENBQUE4SixLQUFBLENBQUFnSCxPQUFBLEdBQUEsTUFBQSxDQXpDQTtBQUFBLGdCQTJDQVAsUUFBQSxDQUFBalEsU0FBQSxDQUFBQyxHQUFBLENBQUEsYUFBQSxFQTNDQTtBQUFBLGdCQTRDQWlRLGVBQUEsQ0FBQWxRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGlCQUFBLEVBNUNBO0FBQUEsZ0JBNkNBaVEsZUFBQSxDQUFBSyxZQUFBLENBQUEsTUFBQSxFQUFBLEdBQUEsRUE3Q0E7QUFBQSxnQkE4Q0FMLGVBQUEsQ0FBQUssWUFBQSxDQUFBLEtBQUEsRUFBQSxVQUFBLEVBOUNBO0FBQUEsZ0JBK0NBTCxlQUFBLENBQUFsTCxTQUFBLEdBQUEsd0NBQUEsQ0EvQ0E7QUFBQSxnQkFnREFtTCxlQUFBLEdBQUFELGVBQUEsQ0FBQUcsU0FBQSxFQUFBLENBaERBO0FBQUEsZ0JBaURBRixlQUFBLENBQUFuTCxTQUFBLEdBQUFrTCxlQUFBLENBQUFsTCxTQUFBLENBakRBO0FBQUEsZ0JBa0RBLEtBQUFrTCxlQUFBLEdBQUFELFFBQUEsQ0FBQWxMLFdBQUEsQ0FBQW1MLGVBQUEsQ0FBQSxDQWxEQTtBQUFBLGdCQW1EQSxLQUFBQSxlQUFBLENBQUFsUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxzQkFBQSxFQW5EQTtBQUFBLGdCQW9EQSxLQUFBa1EsZUFBQSxHQUFBRixRQUFBLENBQUFsTCxXQUFBLENBQUFvTCxlQUFBLENBQUEsQ0FwREE7QUFBQSxnQkFxREEsS0FBQUEsZUFBQSxDQUFBblEsU0FBQSxDQUFBQyxHQUFBLENBQUEsc0JBQUEsRUFyREE7QUFBQSxnQkF1REEsS0FBQWtRLGVBQUEsQ0FBQWhSLGdCQUFBLENBQUEsT0FBQSxFQUFBLEtBQUFzUixXQUFBLENBQUF2TixJQUFBLENBQUE7QUFBQSxvQkFBQXNMLE1BQUEsRUFBQSxJQUFBO0FBQUEsb0JBQUE5SixJQUFBLEVBQUEsTUFBQTtBQUFBLGlCQUFBLENBQUEsRUF2REE7QUFBQSxnQkF3REEsS0FBQXdMLGVBQUEsQ0FBQS9RLGdCQUFBLENBQUEsT0FBQSxFQUFBLEtBQUFzUixXQUFBLENBQUF2TixJQUFBLENBQUE7QUFBQSxvQkFBQXNMLE1BQUEsRUFBQSxJQUFBO0FBQUEsb0JBQUE5SixJQUFBLEVBQUEsTUFBQTtBQUFBLGlCQUFBLENBQUEsRUF4REE7QUFBQSxnQkEwREEsS0FBQWlLLFVBQUEsQ0FBQTVKLFdBQUEsQ0FBQTBLLFFBQUEsRUExREE7QUFBQSxnQkEyREEsS0FBQWQsVUFBQSxDQUFBNUosV0FBQSxDQUFBNEssY0FBQSxFQTNEQTtBQUFBLGdCQTREQSxLQUFBaEIsVUFBQSxDQUFBNUosV0FBQSxDQUFBa0wsUUFBQSxFQTVEQTtBQUFBLGdCQThEQSxJQUFBbFEsS0FBQSxHQUFBLElBQUEsQ0E5REE7QUFBQSxnQkErREEsT0FBQSxJQUFBMlEsT0FBQSxDQUFBLFVBQUFDLE9BQUEsRUFBQTtBQUFBLG9CQUVBLElBQUFDLFlBQUEsR0FBQSxDQUFBLENBRkE7QUFBQSxvQkFJQSxTQUFBQyxZQUFBLENBQUFDLE1BQUEsRUFBQXZCLEtBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUF1QixNQUFBLElBQUF2QixLQUFBLEVBQUE7QUFBQSw0QkFDQW9CLE9BQUEsQ0FBQTVRLEtBQUEsRUFEQTtBQUFBLHlCQURBO0FBQUEscUJBSkE7QUFBQSxvQkFRQSxDQVJBO0FBQUEsb0JBVUEsS0FBQXlDLENBQUEsSUFBQXpDLEtBQUEsQ0FBQTZPLFdBQUEsRUFBQTtBQUFBLHdCQUNBLElBQUFVLFVBQUEsR0FBQXZQLEtBQUEsQ0FBQTZPLFdBQUEsQ0FBQXBNLENBQUEsQ0FBQSxFQUNBdU8sUUFBQSxHQUFBLElBQUFuRCxLQUFBLEVBREEsRUFFQW9ELFVBQUEsR0FBQTlSLFFBQUEsQ0FBQTRGLGFBQUEsQ0FBQSxNQUFBLENBRkEsQ0FEQTtBQUFBLHdCQUtBa00sVUFBQSxDQUFBaFIsU0FBQSxDQUFBQyxHQUFBLENBQUEsdUJBQUEsRUFMQTtBQUFBLHdCQU9BOFEsUUFBQSxDQUFBbEQsR0FBQSxHQUFBeUIsVUFBQSxDQUFBM0IsR0FBQSxDQVBBO0FBQUEsd0JBUUFvRCxRQUFBLENBQUFqRCxNQUFBLEdBQUEsWUFBQTtBQUFBLDRCQUNBRSxPQUFBLENBQUFDLEdBQUEsQ0FBQSxLQUFBSixHQUFBLEdBQUEsc0JBQUEsRUFEQTtBQUFBLDRCQUVBK0MsWUFBQSxHQUZBO0FBQUEsNEJBR0FDLFlBQUEsQ0FBQUQsWUFBQSxFQUFBN1EsS0FBQSxDQUFBd1AsS0FBQSxFQUhBO0FBQUEseUJBQUEsQ0FSQTtBQUFBLHdCQWFBd0IsUUFBQSxDQUFBN0MsT0FBQSxHQUFBLFlBQUE7QUFBQSw0QkFDQUYsT0FBQSxDQUFBQyxHQUFBLENBQUEsS0FBQUosR0FBQSxHQUFBLHlCQUFBLEVBREE7QUFBQSw0QkFFQStDLFlBQUEsR0FGQTtBQUFBLDRCQUdBQyxZQUFBLENBQUFELFlBQUEsRUFBQTdRLEtBQUEsQ0FBQXdQLEtBQUEsRUFIQTtBQUFBLHlCQUFBLENBYkE7QUFBQSx3QkFtQkF4UCxLQUFBLENBQUFvUSxlQUFBLENBQUFwTCxXQUFBLENBQUFpTSxVQUFBLEVBQUFqTSxXQUFBLENBQUFnTSxRQUFBLEVBbkJBO0FBQUEsd0JBb0JBaFIsS0FBQSxDQUFBbVEsZUFBQSxDQUFBbkwsV0FBQSxDQUFBaU0sVUFBQSxDQUFBWCxTQUFBLEVBQUEsRUFBQXRMLFdBQUEsQ0FBQWdNLFFBQUEsQ0FBQVYsU0FBQSxFQUFBLEVBcEJBO0FBQUEscUJBVkE7QUFBQSxpQkFBQSxDQUFBLENBL0RBO0FBQUEsYUFBQSxDQTVDQTtBQUFBLFlBZ0pBLEtBQUFZLFdBQUEsR0FBQSxVQUFBQyxVQUFBLEVBQUF4TSxJQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBeU0sT0FBQSxHQUFBLEtBQUF0QyxjQUFBLEVBQ0F1QyxJQUFBLEdBQUEsS0FBQUMsVUFBQSxDQUFBRixPQUFBLENBREEsRUFFQUcsSUFBQSxHQUFBLEtBQUFDLFVBQUEsQ0FBQUosT0FBQSxDQUZBLEVBR0FLLE9BQUEsR0FBQSxLQUFBSCxVQUFBLENBQUFILFVBQUEsQ0FIQSxFQUlBTyxPQUFBLEdBQUEsS0FBQUYsVUFBQSxDQUFBTCxVQUFBLENBSkEsRUFLQW5SLEtBQUEsR0FBQSxJQUxBLENBREE7QUFBQSxnQkFRQSxPQUFBLElBQUEyUSxPQUFBLENBQUEsVUFBQUMsT0FBQSxFQUFBO0FBQUEsb0JBRUEsQ0FBQWpNLElBQUEsSUFBQSxNQUFBLEdBQUEzRSxLQUFBLENBQUFvUSxlQUFBLEdBQUFwUSxLQUFBLENBQUFtUSxlQUFBLENBQUEsQ0FBQTdRLHNCQUFBLENBQUEsdUJBQUEsRUFBQXFGLElBQUEsSUFBQSxNQUFBLEdBQUEwTSxJQUFBLEdBQUFFLElBQUEsRUFBQXRSLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGdDQUFBLEVBRkE7QUFBQSxvQkFHQSxDQUFBeUUsSUFBQSxJQUFBLE1BQUEsR0FBQTNFLEtBQUEsQ0FBQW9RLGVBQUEsR0FBQXBRLEtBQUEsQ0FBQW1RLGVBQUEsQ0FBQSxDQUFBN1Esc0JBQUEsQ0FBQSx1QkFBQSxFQUFBcUYsSUFBQSxJQUFBLE1BQUEsR0FBQTBNLElBQUEsR0FBQUUsSUFBQSxFQUFBdFIsU0FBQSxDQUFBRSxNQUFBLENBQUEsOEJBQUEsRUFIQTtBQUFBLG9CQUlBLENBQUF3RSxJQUFBLElBQUEsTUFBQSxHQUFBM0UsS0FBQSxDQUFBb1EsZUFBQSxHQUFBcFEsS0FBQSxDQUFBbVEsZUFBQSxDQUFBLENBQUE3USxzQkFBQSxDQUFBLHVCQUFBLEVBQUFxRixJQUFBLElBQUEsTUFBQSxHQUFBOE0sT0FBQSxHQUFBQyxPQUFBLEVBQUF6UixTQUFBLENBQUFDLEdBQUEsQ0FBQSw4QkFBQSxFQUpBO0FBQUEsb0JBTUEsQ0FBQXlFLElBQUEsSUFBQSxNQUFBLEdBQUEzRSxLQUFBLENBQUFvUSxlQUFBLEdBQUFwUSxLQUFBLENBQUFtUSxlQUFBLENBQUEsQ0FBQTdRLHNCQUFBLENBQUEsZ0NBQUEsRUFBQSxDQUFBLEVBQUFGLGdCQUFBLENBQUEsZUFBQSxFQUFBLFlBQUE7QUFBQSx3QkFDQSxLQUFBYSxTQUFBLENBQUFFLE1BQUEsQ0FBQSxnQ0FBQSxFQURBO0FBQUEsd0JBRUF5USxPQUFBLENBQUEsSUFBQSxFQUZBO0FBQUEscUJBQUEsRUFOQTtBQUFBLGlCQUFBLENBQUEsQ0FSQTtBQUFBLGFBQUEsQ0FoSkE7QUFBQSxZQXVLQSxLQUFBZSxhQUFBLEdBQUEsVUFBQVAsT0FBQSxFQUFBO0FBQUEsZ0JBRUEsSUFBQVEsV0FBQSxHQUFBLEtBQUEvQyxXQUFBLENBQUF1QyxPQUFBLENBQUEsQ0FGQTtBQUFBLGdCQUlBLElBQUFRLFdBQUEsQ0FBQWhKLEtBQUEsRUFBQTtBQUFBLG9CQUNBLEtBQUFpSCxjQUFBLENBQUE1SyxTQUFBLEdBQUEyTSxXQUFBLENBQUFoSixLQUFBLENBREE7QUFBQSxvQkFFQSxLQUFBaUgsY0FBQSxDQUFBbFEsVUFBQSxDQUFBOEosS0FBQSxDQUFBZ0gsT0FBQSxHQUFBLEVBQUEsQ0FGQTtBQUFBLGlCQUFBLE1BR0E7QUFBQSxvQkFDQSxLQUFBWixjQUFBLENBQUFsUSxVQUFBLENBQUE4SixLQUFBLENBQUFnSCxPQUFBLEdBQUEsTUFBQSxDQURBO0FBQUEsaUJBUEE7QUFBQSxnQkFXQSxJQUFBbUIsV0FBQSxDQUFBQyxLQUFBLEVBQUE7QUFBQSxvQkFDQSxLQUFBOUIsY0FBQSxDQUFBOUssU0FBQSxHQUFBMk0sV0FBQSxDQUFBQyxLQUFBLENBREE7QUFBQSxvQkFFQSxLQUFBOUIsY0FBQSxDQUFBdEcsS0FBQSxDQUFBZ0gsT0FBQSxHQUFBLEVBQUEsQ0FGQTtBQUFBLGlCQUFBLE1BR0E7QUFBQSxvQkFDQSxLQUFBVixjQUFBLENBQUF0RyxLQUFBLENBQUFnSCxPQUFBLEdBQUEsTUFBQSxDQURBO0FBQUEsaUJBZEE7QUFBQSxnQkFrQkEsSUFBQW1CLFdBQUEsQ0FBQWhGLElBQUEsRUFBQTtBQUFBLG9CQUNBLEtBQUFvRCxhQUFBLENBQUFRLFlBQUEsQ0FBQSxNQUFBLEVBQUFvQixXQUFBLENBQUFoRixJQUFBLEVBREE7QUFBQSxvQkFFQSxLQUFBb0QsYUFBQSxDQUFBclEsVUFBQSxDQUFBOEosS0FBQSxDQUFBZ0gsT0FBQSxHQUFBLEVBQUEsQ0FGQTtBQUFBLGlCQUFBLE1BR0E7QUFBQSxvQkFDQSxLQUFBVCxhQUFBLENBQUFyUSxVQUFBLENBQUE4SixLQUFBLENBQUFnSCxPQUFBLEdBQUEsTUFBQSxDQURBO0FBQUEsaUJBckJBO0FBQUEsYUFBQSxDQXZLQTtBQUFBLFlBa01BLEtBQUFxQixZQUFBLEdBQUEsVUFBQVYsT0FBQSxFQUFBekIsWUFBQSxFQUFBO0FBQUEsZ0JBQ0EsSUFBQWlDLFdBQUEsR0FBQSxLQUFBL0MsV0FBQSxDQUFBdUMsT0FBQSxDQUFBLEVBQ0F4RCxHQUFBLEdBQUF6TyxRQUFBLENBQUE0RixhQUFBLENBQUEsS0FBQSxDQURBLENBREE7QUFBQSxnQkFJQSxPQUFBLElBQUE0TCxPQUFBLENBQUEsVUFBQUMsT0FBQSxFQUFBO0FBQUEsb0JBRUFoRCxHQUFBLENBQUFFLEdBQUEsR0FBQThELFdBQUEsQ0FBQWhFLEdBQUEsQ0FGQTtBQUFBLG9CQUlBLElBQUErQixZQUFBLENBQUExUCxTQUFBLENBQUFRLFFBQUEsQ0FBQSwrQkFBQSxDQUFBLEVBQUE7QUFBQSx3QkFDQWtQLFlBQUEsQ0FBQTFQLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLCtCQUFBLEVBREE7QUFBQSx3QkFFQXdQLFlBQUEsQ0FBQTFQLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLDhCQUFBLEVBRkE7QUFBQSx3QkFHQXlQLFlBQUEsQ0FBQTFLLFNBQUEsR0FBQSxFQUFBLENBSEE7QUFBQSxxQkFBQSxNQUlBO0FBQUEsd0JBQ0EwSyxZQUFBLENBQUEzSyxXQUFBLENBQUE0SSxHQUFBLEVBQUFqTyxVQUFBLENBQUFNLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLDhCQUFBLEVBREE7QUFBQSx3QkFFQXdQLFlBQUEsQ0FBQTFQLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLCtCQUFBLEVBRkE7QUFBQSxxQkFSQTtBQUFBLG9CQWFBeVAsWUFBQSxDQUFBdlEsZ0JBQUEsQ0FBQSxlQUFBLEVBQUEsWUFBQTtBQUFBLHdCQUNBd1IsT0FBQSxHQURBO0FBQUEscUJBQUEsRUFiQTtBQUFBLGlCQUFBLENBQUEsQ0FKQTtBQUFBLGFBQUEsQ0FsTUE7QUFBQSxZQTBOQSxLQUFBRixXQUFBLEdBQUEsVUFBQXJRLENBQUEsRUFBQTtBQUFBLGdCQUNBQSxDQUFBLENBQUFzRCxjQUFBLEdBREE7QUFBQSxnQkFHQSxJQUFBLEtBQUE4SyxNQUFBLENBQUFNLElBQUEsRUFBQTtBQUFBLG9CQUVBLElBQUFxQyxPQUFBLEdBQUEsS0FBQTNDLE1BQUEsQ0FBQUssY0FBQSxFQUNBcUMsVUFBQSxHQUFBLEtBQUF4TSxJQUFBLElBQUEsTUFBQSxHQUFBLEtBQUE4SixNQUFBLENBQUE2QyxVQUFBLENBQUFGLE9BQUEsQ0FBQSxHQUFBLEtBQUEzQyxNQUFBLENBQUErQyxVQUFBLENBQUFKLE9BQUEsQ0FEQSxDQUZBO0FBQUEsb0JBS0EsS0FBQTNDLE1BQUEsQ0FBQU0sSUFBQSxHQUFBLEtBQUEsQ0FMQTtBQUFBLG9CQU1BLEtBQUFOLE1BQUEsQ0FBQXNELGFBQUEsQ0FBQTtBQUFBLHdCQUNBLEtBQUF0RCxNQUFBLENBQUF5QyxXQUFBLENBQUFDLFVBQUEsRUFBQSxNQUFBLENBREE7QUFBQSx3QkFFQSxLQUFBMUMsTUFBQSxDQUFBeUMsV0FBQSxDQUFBQyxVQUFBLEVBQUEsTUFBQSxDQUZBO0FBQUEsd0JBR0EsS0FBQTFDLE1BQUEsQ0FBQXFELFlBQUEsQ0FBQVgsVUFBQSxFQUFBLEtBQUExQyxNQUFBLENBQUE0QixrQkFBQSxDQUhBO0FBQUEsd0JBSUEsS0FBQTVCLE1BQUEsQ0FBQXFELFlBQUEsQ0FBQVgsVUFBQSxFQUFBLEtBQUExQyxNQUFBLENBQUE4QixxQkFBQSxDQUpBO0FBQUEscUJBQUEsRUFOQTtBQUFBLG9CQWFBLEtBQUE5QixNQUFBLENBQUFrRCxhQUFBLENBQUFSLFVBQUEsRUFiQTtBQUFBLG9CQWVBLEtBQUExQyxNQUFBLENBQUFLLGNBQUEsR0FBQXFDLFVBQUEsQ0FmQTtBQUFBLGlCQUhBO0FBQUEsYUFBQSxDQTFOQTtBQUFBLFlBa1BBLEtBQUFHLFVBQUEsR0FBQSxVQUFBRixPQUFBLEVBQUE7QUFBQSxnQkFDQUEsT0FBQSxHQURBO0FBQUEsZ0JBRUEsT0FBQUEsT0FBQSxHQUFBLEtBQUE1QixLQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQTRCLE9BQUEsQ0FGQTtBQUFBLGFBQUEsQ0FsUEE7QUFBQSxZQXVQQSxLQUFBSSxVQUFBLEdBQUEsVUFBQUosT0FBQSxFQUFBO0FBQUEsZ0JBQ0FBLE9BQUEsR0FEQTtBQUFBLGdCQUVBLE9BQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsS0FBQTVCLEtBQUEsR0FBQSxDQUFBLEdBQUE0QixPQUFBLENBRkE7QUFBQSxhQUFBLENBdlBBO0FBQUEsWUE0UEEsS0FBQVcsYUFBQSxHQUFBLFVBQUFDLEdBQUEsRUFBQTtBQUFBLGdCQUNBLElBQUFoUyxLQUFBLEdBQUEsSUFBQSxDQURBO0FBQUEsZ0JBRUEyUSxPQUFBLENBQUFzQixHQUFBLENBQUFELEdBQUEsRUFBQUUsSUFBQSxDQUFBLFVBQUFDLE9BQUEsRUFBQTtBQUFBLG9CQUNBblMsS0FBQSxDQUFBK08sSUFBQSxHQUFBLElBQUEsQ0FEQTtBQUFBLG9CQUVBZCxPQUFBLENBQUFDLEdBQUEsQ0FBQSxlQUFBLEVBRkE7QUFBQSxpQkFBQSxFQUZBO0FBQUEsYUFBQSxDQTVQQTtBQUFBLFlBb1FBLEtBQUFoTCxJQUFBLEdBQUEsWUFBQTtBQUFBLGdCQUVBLEtBQUFtTSxRQUFBLEdBRkE7QUFBQSxnQkFJQSxJQUFBLEtBQUFSLFdBQUEsQ0FBQW5NLE1BQUEsS0FBQSxDQUFBO0FBQUEsb0JBQUEsT0FKQTtBQUFBLGdCQU1BLEtBQUErTSxPQUFBLEdBQUF5QyxJQUFBLENBQUEsVUFBQXpELE1BQUEsRUFBQTtBQUFBLG9CQUVBQSxNQUFBLENBQUFHLFVBQUEsQ0FBQTNPLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGVBQUEsRUFGQTtBQUFBLG9CQUlBdU8sTUFBQSxDQUFBc0QsYUFBQSxDQUFBO0FBQUEsd0JBQ0F0RCxNQUFBLENBQUF5QyxXQUFBLENBQUF6QyxNQUFBLENBQUFLLGNBQUEsRUFBQSxNQUFBLENBREE7QUFBQSx3QkFFQUwsTUFBQSxDQUFBeUMsV0FBQSxDQUFBekMsTUFBQSxDQUFBSyxjQUFBLEVBQUEsTUFBQSxDQUZBO0FBQUEsd0JBR0FMLE1BQUEsQ0FBQXFELFlBQUEsQ0FBQXJELE1BQUEsQ0FBQUssY0FBQSxFQUFBTCxNQUFBLENBQUE0QixrQkFBQSxDQUhBO0FBQUEsd0JBSUE1QixNQUFBLENBQUFxRCxZQUFBLENBQUFyRCxNQUFBLENBQUFLLGNBQUEsRUFBQUwsTUFBQSxDQUFBOEIscUJBQUEsQ0FKQTtBQUFBLHFCQUFBLEVBSkE7QUFBQSxvQkFXQTlCLE1BQUEsQ0FBQWtELGFBQUEsQ0FBQWxELE1BQUEsQ0FBQUssY0FBQSxFQVhBO0FBQUEsb0JBYUFiLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLE9BQUEsRUFiQTtBQUFBLGlCQUFBLEVBTkE7QUFBQSxhQUFBLENBcFFBO0FBQUEsU0FOQTtBQUFBLFFBcVNBLFNBQUF6TCxDQUFBLElBQUFnTSxNQUFBLEVBQUE7QUFBQSxZQUNBLElBQUEsT0FBQUEsTUFBQSxDQUFBaE0sQ0FBQSxDQUFBLElBQUEsUUFBQTtBQUFBLGdCQUFBLFNBREE7QUFBQSxZQUVBLElBQUEyUCxDQUFBLEdBQUEsSUFBQTFELE1BQUEsQ0FBQUQsTUFBQSxDQUFBaE0sQ0FBQSxDQUFBLENBQUEsQ0FGQTtBQUFBLFlBR0EyUCxDQUFBLENBQUFsUCxJQUFBLEdBSEE7QUFBQSxTQXJTQTtBQUFBLEtBQUEsSUFGQTtBQUFBLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgYmxvY2tCbG9nTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1saXN0JylbMF07XHJcblx0XHRcclxuXHRcdGlmKCFibG9ja0Jsb2dNZW51KSByZXR1cm47XHJcblxyXG5cdFx0dmFyIEJsb2dNZW51ID0gZnVuY3Rpb24oYmxvY2spIHtcclxuXHJcblx0XHRcdHRoaXMuYmxvZ01lbnUgPSBibG9jaztcclxuXHJcblx0XHRcdHRoaXMuYmxvZ1dyYXAgPSBibG9jay5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5ibG9nQ29udGFpbmVyID0gYmxvY2sucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5tb2JpbGVTdGF0dXMgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgYnV0dG9uQmxvZ01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nX19uYXYtYnV0dG9uJylbMF0sXHJcblx0XHRcdFx0XHQkdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdGlmKCFidXR0b25CbG9nTWVudSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRidXR0b25CbG9nTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdCR0aGF0Lm1vYmlsZVN0YXR1cyA9ICEkdGhhdC5tb2JpbGVTdGF0dXM7XHJcblx0XHRcdFx0XHRpZigkdGhhdC5tb2JpbGVTdGF0dXMpIHtcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGJ1dHRvbkJsb2dNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmJsb2dXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0XHRcdGlmKCEkdGhhdC5tb2JpbGVTdGF0dXMpIHJldHVybjtcclxuXHRcdFx0XHRcdHZhciBlbGVtZW50ID0gZS50YXJnZXQsXHJcblx0XHRcdFx0XHRcdGhpZGUgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdHdoaWxlKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ19zaG93ZWQtYmxvZy1tZW51JykpIHtcclxuXHRcdFx0XHRcdFx0XHRoaWRlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmKGhpZGUpIHtcclxuXHRcdFx0XHRcdFx0JHRoYXQubW9iaWxlU3RhdHVzID0gISR0aGF0Lm1vYmlsZVN0YXR1cztcclxuXHRcdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvZ1dyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZml4ZWQgPSBmdW5jdGlvbiBmaXhlZChlKSB7XHJcblxyXG5cdFx0XHRcdHZhciBjb250YWluZXIgPSB0aGlzLmJsb2dDb250YWluZXIsXHJcblx0XHRcdFx0XHRtZW51ID0gdGhpcy5ibG9nTWVudSxcclxuXHRcdFx0XHRcdHdyYXAgPSB0aGlzLmJsb2dXcmFwLFxyXG5cdFx0XHRcdFx0d3JhcFBvcyA9IHdyYXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRcdFx0XHRjb250YWluZXJIZWlnaHQsXHJcblx0XHRcdFx0XHRtZW51SGVpZ2h0LFxyXG5cdFx0XHRcdFx0Zml4ZWRTdGFydCxcclxuXHRcdFx0XHRcdGZpeGVkU3RvcCxcclxuXHRcdFx0XHRcdHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRcdG1lbnVIZWlnaHQgPSBtZW51Lm9mZnNldEhlaWdodDtcclxuXHRcdFx0XHRcdGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdFx0XHRmaXhlZFN0YXJ0ID0gc2Nyb2xsVG9wICsgd3JhcFBvcy50b3A7XHJcblx0XHRcdFx0XHRmaXhlZFN0b3AgPSAgZml4ZWRTdGFydCArIGNvbnRhaW5lckhlaWdodCAtIChtZW51SGVpZ2h0ICsgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5wYWRkaW5nQm90dG9tKSk7XHJcblxyXG5cdFx0XHRcdGlmKHNjcm9sbFRvcCA8PSBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihzY3JvbGxUb3AgPiBmaXhlZFN0YXJ0KSB7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9pbi1ib3R0b20nIDogJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0XHRtZW51LmNsYXNzTGlzdC5hZGQoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9maXhlZCcgOiAnYmxvZ19fbmF2LWxpc3RfaW4tYm90dG9tJyk7XHRcclxuXHRcdFx0XHR9IFxyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuY2hlY2tBY3RpdmUgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyIHdpbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LFxyXG5cdFx0XHRcdFx0bWVudUl0ZW1zTGlua3MgPSB0aGlzLmJsb2dNZW51LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1pdGVtLWxuaycpLFxyXG5cdFx0XHRcdFx0YmxvZ0l0ZW1JZCxcclxuXHRcdFx0XHRcdGJsb2dJdGVtLFxyXG5cdFx0XHRcdFx0YWN0aXZlSWQsXHJcblx0XHRcdFx0XHRtaW5Ub3AsXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wLFxyXG5cdFx0XHRcdFx0aTtcclxuXHJcblx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3MubGVuZ3RoID09IDApIHJldHVybjtcclxuXHJcblx0XHRcdFx0Zm9yKGkgaW4gbWVudUl0ZW1zTGlua3MpIHtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRibG9nSXRlbUlkID0gbWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2goLyMoLiopL2kpWzFdO1xyXG5cdFx0XHRcdFx0YmxvZ0l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChibG9nSXRlbUlkKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYoIWJsb2dJdGVtKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRjdXJyZW50VG9wID0gTWF0aC5hYnMoYmxvZ0l0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWluVG9wID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHRtaW5Ub3AgPSBjdXJyZW50VG9wO1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVJZCA9IGJsb2dJdGVtSWQ7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fSBcclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50VG9wIDwgbWluVG9wKSB7XHJcblx0XHRcdFx0XHRcdG1pblRvcCA9IGN1cnJlbnRUb3A7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZUlkID0gYmxvZ0l0ZW1JZDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHRcdGlmKGFjdGl2ZUlkKSB7XHJcblx0XHRcdFx0XHR2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoJyMnICsgYWN0aXZlSWQgKyAnJCcsICdpJyk7XHJcblx0XHRcdFx0XHRmb3IoaSBpbiBtZW51SXRlbXNMaW5rcykge1xyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHRcdFx0bWVudUl0ZW1zTGlua3NbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZ19fbmF2LWl0ZW0tbG5rX2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2gocGF0dGVybikpIHtcclxuXHRcdFx0XHRcdFx0XHRtZW51SXRlbXNMaW5rc1tpXS5jbGFzc0xpc3QuYWRkKCdibG9nX19uYXYtaXRlbS1sbmtfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuY2hlY2tBY3RpdmUoKTtcdFxyXG5cdFx0XHRcdHRoaXMudHJpZ2dlck1vYmlsZU1lbnUoKTtcclxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5maXhlZC5iaW5kKHsnYmxvZ0NvbnRhaW5lcicgOiB0aGlzLmJsb2dDb250YWluZXIsICdibG9nTWVudScgOiB0aGlzLmJsb2dNZW51LCAnYmxvZ1dyYXAnIDogdGhpcy5ibG9nV3JhcH0pKTtcdFxyXG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpeGVkLmJpbmQoeydibG9nQ29udGFpbmVyJyA6IHRoaXMuYmxvZ0NvbnRhaW5lciwgJ2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnUsICdibG9nV3JhcCcgOiB0aGlzLmJsb2dXcmFwfSkpO1x0XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtZW51ID0gbmV3IEJsb2dNZW51KGJsb2NrQmxvZ01lbnUpO1xyXG5cdFx0bWVudS5pbml0KCk7XHJcblxyXG5cdH0pKClcclxufSk7IiwiLy8gJChmdW5jdGlvbigpe1xyXG5cclxuLy8gXHQvLyBGbGlwcGVyIHRyaWdnZXJcclxuLy8gXHQoZnVuY3Rpb24oKXtcclxuXHJcbi8vIFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZsaXBwZXItdHJpZ2dlcicsIGZ1bmN0aW9uKGUpe1xyXG4vLyBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICBcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4vLyAgXHRcdFx0dmFyIGZsaXBJZCA9ICQodGhpcykuYXR0cignZGF0YS1mbGlwLWlkJyk7XHJcbi8vICBcdFx0XHR2YXIgZmxpcHBlciA9ICQoJy5mbGlwcGVyW2RhdGEtZmxpcC1pZCA9ICcgKyBmbGlwSWQgKyAnXScpO1xyXG5cclxuLy8gIFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKCdmbGlwcGVyLXRyaWdnZXJfYmFjaycpKSB7XHJcbi8vICBcdFx0XHRcdGZsaXBwZXIuYWRkQ2xhc3MoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcbi8vICBcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdmbGlwcGVyLXRyaWdnZXJfaGlkZGVuJyk7XHJcbi8vICBcdFx0XHR9IGVsc2Uge1xyXG4vLyAgXHRcdFx0XHRmbGlwcGVyLnJlbW92ZUNsYXNzKCdmbGlwcGVyX3R1cm5lZCcpO1xyXG4vLyAgXHRcdFx0XHQkKCcuZmxpcHBlci10cmlnZ2VyX2JhY2snKS5yZW1vdmVDbGFzcygnZmxpcHBlci10cmlnZ2VyX2hpZGRlbicpO1xyXG4vLyAgXHRcdFx0fVxyXG5cclxuLy8gXHRcdH0pO1xyXG5cclxuLy8gXHR9KSgpXHJcblxyXG4vLyB9KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmxpcHBlci10cmlnZ2VyJyksXHJcblx0XHRcdGJ0bkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmbGlwcGVyLXRyaWdnZXJfYmFjaycpWzBdLFxyXG5cdFx0XHRpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHR1cm5GbGlwcGVyKGZsaXBJZCkge1xyXG5cdCBcdFx0XHRcclxuXHQgXHRcdFx0dmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcltkYXRhLWZsaXAtaWQgPSAnICsgZmxpcElkICsgJ10nKTtcclxuXHQgXHRcdFx0aWYoIWZsaXBwZXIpIHJldHVybiBmYWxzZTtcclxuXHJcblx0IFx0XHRcdGlmKGZsaXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGlwcGVyX3R1cm5lZCcpKSB7XHJcblx0XHRcdFx0XHRmbGlwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcblx0XHRcdFx0XHRpZihidG5CYWNrKSBidG5CYWNrLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGZsaXBwZXIuY2xhc3NMaXN0LmFkZCgnZmxpcHBlcl90dXJuZWQnKTtcclxuIFx0XHRcdFx0XHRpZihidG5CYWNrKSBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0fVx0XHRcclxuXHJcblx0XHRmb3IoaSBpbiB0cmlnZ2VyKSB7XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgdHJpZ2dlcltpXS5hZGRFdmVudExpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSBjb250aW51ZTtcclxuXHJcblx0XHRcdHRyaWdnZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHZhciBmbGlwSWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlwLWlkJyk7XHJcblx0XHRcdFx0dHVybkZsaXBwZXIoZmxpcElkKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZih3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywnJykgPT0gJ2xvZ2luJykge1xyXG5cdFx0XHR0dXJuRmxpcHBlcignbWFpbicpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0fSkoKVxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuLy9GT1JNU1x0XHJcbnZhciBhbGxGb3JtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJyksXHJcblx0YWpheEZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWpheC1mb3JtJyksXHJcblx0aSxcclxuXHRmb3JtcyA9IChmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBpLFxyXG5cdFx0XHRtaW5MZW5ndGggPSAzLFxyXG5cdFx0XHR0aXBDbGFzcyA9ICdmb3JtX190aXAnLFxyXG5cdFx0XHR0aXBDbGFzc1Zpc2libGUgPSAnZm9ybV9fdGlwX3Zpc2libGUnLFxyXG5cdFx0XHRtZXNzYWdlQ2xhc3MgPSAnZm9ybV9fdGlwLW1lc3NhZ2UnLFxyXG5cdFx0XHRtZXNzYWdlVGV4dCA9IHtcclxuXHRcdFx0XHQncmVxdWlyZWQnIDogJ9Cf0L7Qu9C1INC90LUg0LfQsNC/0L7Qu9C90LXQvdC+JyxcclxuXHRcdFx0XHQncGF0dGVybicgOiAn0JfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQvdC1INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGE0L7RgNC80LDRgtGDJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbGVtZW50Q2xhc3NFcnJvciA9ICdfZXJyb3InO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRzaG93VGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcdFxyXG5cdFx0XHRcdFx0dHlwZU1lc3NhZ2VDbGFzcyA9IG1lc3NhZ2VDbGFzcyArICdfJyArIHR5cGVFcnIsXHJcblx0XHRcdFx0XHRtZXNzYWdlO1xyXG5cclxuXHRcdFx0XHRpZighdGlwKSB7XHJcblx0XHRcdFx0XHR2YXIgdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3MpO1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHRpcCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKCFtZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0bWVzc2FnZS5jbGFzc0xpc3QuYWRkKG1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmNsYXNzTGlzdC5hZGQodHlwZU1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmlubmVySFRNTCA9IG1lc3NhZ2VUZXh0W3R5cGVFcnJdO1xyXG5cclxuXHRcdFx0XHRcdHRpcC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3NWaXNpYmxlKTtcdFx0XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRoaWRlVGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcclxuXHRcdFx0XHRcdHR5cGVNZXNzYWdlQ2xhc3MgPSBtZXNzYWdlQ2xhc3MgKyAnXycgKyB0eXBlRXJyLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTtcclxuXHJcblx0XHRcdFx0aWYoIXRpcCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdHRpcC5yZW1vdmVDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0aWYoIXRpcC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG1lc3NhZ2VDbGFzcykubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHR0aXAuY2xhc3NMaXN0LnJlbW92ZSh0aXBDbGFzc1Zpc2libGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNsZWFyT25Gb2N1czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHRyaWdnZXJUaXA6IGZ1bmN0aW9uKGVsZW1lbnQsIGNvbmQsIHR5cGVFcnIpIHtcclxuXHRcdFx0XHRpZihjb25kKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNob3dUaXAoZWxlbWVudCwgdHlwZUVycik7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaGlkZVRpcChlbGVtZW50LCB0eXBlRXJyKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNoZWNrUmVxdWlyZWQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHR2YXIgdHlwZUVyciA9ICdyZXF1aXJlZCcsXHJcblx0XHRcdFx0XHRjb25kO1xyXG5cclxuXHRcdFx0XHRzd2l0Y2goZWxlbWVudC50eXBlKSB7XHJcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6IFxyXG5cdFx0XHRcdFx0XHRjb25kID0gKGVsZW1lbnQucmVxdWlyZWQgJiYgIWVsZW1lbnQuY2hlY2tlZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcclxuXHRcdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnJlcXVpcmVkICYmICFlbGVtZW50LmNoZWNrZWQpO1xyXG5cdFx0XHRcdFx0XHRpZighZWxlbWVudC5yZXF1aXJlZCkgcmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdGNvbmQgPSAoZWxlbWVudC5yZXF1aXJlZCAmJiBlbGVtZW50LnZhbHVlLmxlbmd0aCA8IDMpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRyaWdnZXJUaXAoZWxlbWVudCwgY29uZCwgdHlwZUVycik7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRjaGVja1BhdHRlcm46IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZighZWxlbWVudC52YWx1ZSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHRcdHZhciB0eXBlRXJyID0gJ3BhdHRlcm4nLFxyXG5cdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnBhdHRlcm4gJiYgIWVsZW1lbnQudmFsdWUubWF0Y2gobmV3IFJlZ0V4cChlbGVtZW50LnBhdHRlcm4sICdpJykpKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudHJpZ2dlclRpcChlbGVtZW50LCBjb25kLCB0eXBlRXJyKTtcdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Y2hlY2tWYWxpZGF0aW9uOiBmdW5jdGlvbihlbGVtZW50LCBzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHR2YXIgZWxlbWVudElzVmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdGlmKCF0aGlzLmNoZWNrUmVxdWlyZWQoZWxlbWVudCkpIGVsZW1lbnRJc1ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0aWYoIXRoaXMuY2hlY2tQYXR0ZXJuKGVsZW1lbnQpKSBlbGVtZW50SXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZihzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHRcdGlmKCFlbGVtZW50SXNWYWxpZCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBlbGVtZW50SXNWYWxpZDtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHZhbGlkYXRlRm9ybTogZnVuY3Rpb24oZm9ybSkge1xyXG5cdFx0XHRcdHZhciBpbnB1dCA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JyksXHJcblx0XHRcdFx0XHR0ZXh0YXJlYSA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHRhcmVhJyksXHJcblx0XHRcdFx0XHRlbGVtZW50cyA9IFtdLFxyXG5cdFx0XHRcdFx0Zm9ybUlzVmFsaWQgPSB0cnVlLFxyXG5cdFx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoaW5wdXRbaV0pO1xyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IHRleHRhcmVhLmxlbmd0aDsgaSsrKSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdCh0ZXh0YXJlYVtpXSk7XHJcblxyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVsZW1lbnRWYWxpZGF0aW9uID0gJHRoYXQuY2hlY2tWYWxpZGF0aW9uKGVsZW1lbnRzW2ldLCB0cnVlKTtcclxuXHRcdFx0XHRcdGZvcm1Jc1ZhbGlkID0gZm9ybUlzVmFsaWQgPyBlbGVtZW50VmFsaWRhdGlvbiA6IGZvcm1Jc1ZhbGlkO1xyXG5cclxuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLm9ua2V5dXAgPSBlbGVtZW50c1tpXS5vbmlucHV0ID0gZWxlbWVudHNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkdGhhdC5jaGVja1ZhbGlkYXRpb24odGhpcyk7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0ub25wcm9wZXJ0eWNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGUucHJvcGVydHlOYW1lID09ICd2YWx1ZScpICR0aGF0LmNoZWNrVmFsaWRhdGlvbih0aGlzKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmN1dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCR0aGF0LmNoZWNrVmFsaWRhdGlvbihlbGVtZW50c1tpXSksIDApOyBcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdHZhciB0aXBzID0gZm9ybS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKTtcclxuXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmNsZWFyT25Gb2N1cy5iaW5kKGVsZW1lbnRzW2ldKSgpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmtleXVwID0gZWxlbWVudHNbaV0ub25pbnB1dCA9IGVsZW1lbnRzW2ldLm9uY2xpY2sgPSBlbGVtZW50c1tpXS5vbnByb3BlcnR5Y2hhbmdlID0gZWxlbWVudHNbaV0ub25jdXQgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yKGkgPSB0aXBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHRcdHRpcHNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aXBzW2ldKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZvcm1Jc1ZhbGlkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KSgpXHJcblxyXG5cdGZvcihpID0gMDsgaSA8IGFsbEZvcm1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRhbGxGb3Jtc1tpXS5ub1ZhbGlkYXRlID0gdHJ1ZTtcclxuXHRcdGFsbEZvcm1zW2ldLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRyZXR1cm4gZm9ybXMudmFsaWRhdGVGb3JtKHRoaXMpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRmb3IoaSA9IDA7IGkgPCBhamF4Rm9ybXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGFqYXhGb3Jtc1tpXS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRpZighZm9ybXMudmFsaWRhdGVGb3JtKHRoaXMpKSByZXR1cm47XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cclxufSk7IiwidmFyIG1hcCxcclxuXHRzdHlsZU1hcCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIjEwMFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZjAwMDBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmMmYyZjJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5zdHJva2VcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4NmE3N2FcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbl07XHJcblxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG5cclxuICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykpIHJldHVybjtcclxuXHJcblx0dmFyIG15TGF0TG5nID0ge2xhdDogNjAuMDY1NjUxLCBsbmc6IDMwLjMxMjI0OX07XHJcblxyXG5cdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcblx0XHRjZW50ZXI6IG15TGF0TG5nLFxyXG5cdFx0em9vbTogMTUsXHJcblx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcblx0XHRwYW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgXHR6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgXHR6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgXHRcdHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfQ0VOVEVSXHJcbiAgICBcdH0sXHJcbiAgICAgIFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICBcdG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIGRyYWdnYWJsZTogIShcIm9udG91Y2hlbmRcIiBpbiBkb2N1bWVudCksXHJcbiAgICAgICAgc3R5bGVzOiBzdHlsZU1hcFxyXG5cdH0pO1xyXG5cclxuXHR2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcblx0ICAgIHBvc2l0aW9uOiBteUxhdExuZyxcclxuXHQgICAgbWFwOiBtYXAsXHJcblx0ICAgIHRpdGxlOiAn0JzQvtGPINC70L7QutCw0YbQuNGPJ1xyXG5cdH0pO1xyXG5cclxuXHRtYXJrZXIuc2V0TWFwKG1hcCk7XHJcbn0iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0XHJcblx0KGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYnRuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tbWVudScpLFxyXG5cdFx0XHRpO1xyXG5cdFx0Zm9yKHZhciBpIGluIGJ0bk1lbnUpe1xyXG5cclxuXHRcdFx0aWYodHlwZW9mIGJ0bk1lbnVbaV0uYWRkRXZlbnRMaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykgY29udGludWU7XHJcblxyXG5cdFx0XHRidG5NZW51W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xyXG5cdFx0XHRcdGlmKCFuYXYpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYoIW5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ25hdl9vcGVuJykpIHtcclxuXHRcdFx0XHRcdG5hdi5jbGFzc0xpc3QuYWRkKCduYXZfb3BlbicpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdidG4tbWVudV9jcm9zcycpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCduYXZfX2J0bi1tZW51X2ZpeGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXZfb3BlbicpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tbWVudV9jcm9zcycpO1xyXG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX2J0bi1tZW51X2ZpeGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSkoKVxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4vLyBCTFVSXHRcclxuXHR2YXIgYmx1ciA9IChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJnSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWltZycpWzBdLFxyXG5cdFx0XHRmb3JtQmx1ciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm1fX3dyYXAtYmx1cicpWzBdO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0aWYoIWJnSW1nIHx8ICFmb3JtQmx1cikgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1RyaWRlbnQnKSArIDEgIT0gMCkge1xyXG5cdFx0XHRcdFx0Zm9ybUJsdXIuY2xhc3NMaXN0LmFkZCgnZm9ybV9fd3JhcC1ibHVyX2FsdCcpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHBvc0xlZnQgPSBiZ0ltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gZm9ybUJsdXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcclxuXHRcdFx0XHRcdHBvc1RvcCA9ICBiZ0ltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBmb3JtQmx1ci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG5cdFx0XHRcdC8vZm9ybUJsdXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgYmdJbWcuc3JjICsgJyknO1xyXG5cdFx0XHRcdGZvcm1CbHVyLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQvMTAgKyAncmVtJyArICcgJyArIHBvc1RvcC8xMCArICdyZW0nO1xyXG5cdFx0XHRcdGZvcm1CbHVyLnN0eWxlLmJhY2tncm91bmRTaXplID0gYmdJbWcuY2xpZW50V2lkdGgvMTAgKyAncmVtJyArICcgJyArIGJnSW1nLmNsaWVudEhlaWdodC8xMCArICdyZW0nO1x0XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KSgpO1xyXG5cclxuXHRibHVyLmluaXQoKTtcclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgYmx1ci5pbml0LmJpbmQoYmx1cikpO1xyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBibHVyLmluaXQuYmluZChibHVyKSk7XHJcblxyXG4vL1BhcmFsbGF4XHJcblx0dmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIGJnSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWltZycpWzBdLFxyXG5cdFx0XHRsZWFmMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1sZWFmLTEnKVswXSxcclxuXHRcdFx0bGVhZjIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdlX19mb290ZXItYmctbGVhZi0yJylbMF0sXHJcblx0XHRcdGxlYWYzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWxlYWYtMycpWzBdO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRtb3ZlOiBmdW5jdGlvbihlbGVtZW50LCBzcGVlZFNoaWZ0LCBzcGVlZERyb3AsIHNwZWVkUm90YXRlKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxyXG5cdFx0XHRcdFx0cGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXHJcblx0XHRcdFx0XHRjbGllbnRIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LHNjcm9sbFRvcCxcclxuXHRcdFx0XHRcdHRvcCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHdpbmRvdy5pbm5lckhlaWdodCB8fCB3aW5kb3cuYm9keS5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCksXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm07XHJcblxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtICA9IHNwZWVkU2hpZnQgPyAndHJhbnNsYXRlWCgnICsgKCAoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0KSAvIHBhZ2VIZWlnaHQgLSAxICkgKiAxMDAwICogc3BlZWRTaGlmdCArICclKScgOiAnJzsgXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm0gKz0gc3BlZWREcm9wID8gJ3RyYW5zbGF0ZVkoJyArICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogMTAwMCAqIHNwZWVkRHJvcCArICclKScgOiAnJzsgXHJcblx0XHRcdFx0XHR0cmFuc2Zvcm0gKz0gJ3RyYW5zbGF0ZVooMCknOyBcclxuXHRcdFx0XHRcdHRyYW5zZm9ybSArPSBzcGVlZFJvdGF0ZSA/ICdyb3RhdGUoJyArICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogc3BlZWRSb3RhdGUgKiAzNjAgKyAnZGVnKScgOiAnJztcclxuXHJcblx0XHRcdFx0XHRpZih0cmFuc2Zvcm0gPT09ICd0cmFuc2xhdGVaKDApJykge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLmJvdHRvbSA9ICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogMTAwICsgJyUnO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm1velRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5tc1RyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihsZWFmMSkgdGhpcy5tb3ZlKGxlYWYxLCAxLCAwLjc1LCAwLjUpO1xyXG5cdFx0XHRcdGlmKGxlYWYyKSB0aGlzLm1vdmUobGVhZjIsIDEsIDIsIDEpO1xyXG5cdFx0XHRcdGlmKGxlYWYzKSB0aGlzLm1vdmUobGVhZjMsIDEsIDQsIDIpO1xyXG5cdFx0XHRcdGlmKGJnSW1nKSB0aGlzLm1vdmUoYmdJbWcsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG5cdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fSkoKTtcdFxyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgcGFyYWxsYXguaW5pdC5iaW5kKHBhcmFsbGF4KSk7XHJcblxyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cdChmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vIGZpcnN0IGFkZCByYWYgc2hpbVxyXG5cdFx0Ly8gaHR0cDovL3d3dy5wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xyXG5cdFx0ICByZXR1cm4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcclxuXHRcdCAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcblx0XHQgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG5cdFx0ICAgICAgICAgIGZ1bmN0aW9uKCBjYWxsYmFjayApe1xyXG5cdFx0ICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcblx0XHQgICAgICAgICAgfTtcclxuXHRcdH0pKCk7XHJcblxyXG5cdFx0Ly8gbWFpbiBmdW5jdGlvblxyXG5cdFx0ZnVuY3Rpb24gc2Nyb2xsVG9ZKHNjcm9sbFRhcmdldFksIHNwZWVkLCBlYXNpbmcpIHtcclxuXHRcdCAgICAvLyBzY3JvbGxUYXJnZXRZOiB0aGUgdGFyZ2V0IHNjcm9sbFkgcHJvcGVydHkgb2YgdGhlIHdpbmRvd1xyXG5cdFx0ICAgIC8vIHNwZWVkOiB0aW1lIGluIHBpeGVscyBwZXIgc2Vjb25kXHJcblx0XHQgICAgLy8gZWFzaW5nOiBlYXNpbmcgZXF1YXRpb24gdG8gdXNlXHJcblxyXG5cdFx0ICAgIHZhciBzY3JvbGxZID0gd2luZG93LnNjcm9sbFksXHJcblx0XHQgICAgICAgIHNjcm9sbFRhcmdldFkgPSBzY3JvbGxUYXJnZXRZIHx8IDAsXHJcblx0XHQgICAgICAgIHNwZWVkID0gc3BlZWQgfHwgMjAwMCxcclxuXHRcdCAgICAgICAgZWFzaW5nID0gZWFzaW5nIHx8ICdlYXNlT3V0U2luZScsXHJcblx0XHQgICAgICAgIGN1cnJlbnRUaW1lID0gMDtcclxuXHJcblx0XHQgICAgLy8gbWluIHRpbWUgLjEsIG1heCB0aW1lIC44IHNlY29uZHNcclxuXHRcdCAgICB2YXIgdGltZSA9IE1hdGgubWF4KC4xLCBNYXRoLm1pbihNYXRoLmFicyhzY3JvbGxZIC0gc2Nyb2xsVGFyZ2V0WSkgLyBzcGVlZCwgLjgpKTtcclxuXHJcblx0XHQgICAgLy8gZWFzaW5nIGVxdWF0aW9ucyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5yby9lYXNpbmctanMvYmxvYi9tYXN0ZXIvZWFzaW5nLmpzXHJcblx0XHQgICAgdmFyIFBJX0QyID0gTWF0aC5QSSAvIDIsXHJcblx0XHQgICAgICAgIGVhc2luZ0VxdWF0aW9ucyA9IHtcclxuXHRcdCAgICAgICAgICAgIGVhc2VPdXRTaW5lOiBmdW5jdGlvbiAocG9zKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKHBvcyAqIChNYXRoLlBJIC8gMikpO1xyXG5cdFx0ICAgICAgICAgICAgfSxcclxuXHRcdCAgICAgICAgICAgIGVhc2VJbk91dFNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gKC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHBvcykgLSAxKSk7XHJcblx0XHQgICAgICAgICAgICB9LFxyXG5cdFx0ICAgICAgICAgICAgZWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHRcdCAgICAgICAgICAgICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge1xyXG5cdFx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3cocG9zLCA1KTtcclxuXHRcdCAgICAgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdygocG9zIC0gMiksIDUpICsgMik7XHJcblx0XHQgICAgICAgICAgICB9XHJcblx0XHQgICAgICAgIH07XHJcblxyXG5cdFx0ICAgIC8vIGFkZCBhbmltYXRpb24gbG9vcFxyXG5cdFx0ICAgIGZ1bmN0aW9uIHRpY2soKSB7XHJcblx0XHQgICAgICAgIGN1cnJlbnRUaW1lICs9IDEgLyA2MDtcclxuXHJcblx0XHQgICAgICAgIHZhciBwID0gY3VycmVudFRpbWUgLyB0aW1lO1xyXG5cdFx0ICAgICAgICB2YXIgdCA9IGVhc2luZ0VxdWF0aW9uc1tlYXNpbmddKHApO1xyXG5cclxuXHRcdCAgICAgICAgaWYgKHAgPCAxKSB7XHJcblx0XHQgICAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKHRpY2spO1xyXG5cdFx0ICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFkgKyAoKHNjcm9sbFRhcmdldFkgLSBzY3JvbGxZKSAqIHQpKTtcclxuXHRcdCAgICAgICAgfSBlbHNlIHtcclxuXHRcdCAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3Njcm9sbCBkb25lJyk7XHJcblx0XHQgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsVGFyZ2V0WSk7XHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9XHJcblxyXG5cdFx0ICAgIC8vIGNhbGwgaXQgb25jZSB0byBnZXQgc3RhcnRlZFxyXG5cdFx0ICAgIHRpY2soKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tocmVmXj1cIiNcIl0nKSxcclxuXHRcdCAgICBzcGVlZCA9IDAuNTtcclxuXHJcblx0XHRmdW5jdGlvbiBnZXRFbGVtZW50U2Nyb2xsUG9zaXRpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoIWVsZW1lbnQpIHJldHVybjtcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCksXHRcclxuXHRcdFx0XHRlbGVtZW50SWQgPSBlbGVtZW50LmhyZWYubWF0Y2goLyMoLiopL2kpLFxyXG5cdFx0XHRcdGVsZW1lbnRPZlBhZ2U7XHJcblxyXG5cdFx0XHRcdGVsZW1lbnRPZlBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWRbMV0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZWxlbWVudE9mUGFnZSA/IHNjcm9sbFRvcCArIGVsZW1lbnRPZlBhZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDogMDtcclxuXHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRmb3IodmFyIGkgaW4gbGluaykge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYodHlwZW9mIGxpbmtbaV0gIT0gJ29iamVjdCcpIHJldHVybjtcclxuXHRcdFx0XHJcblx0XHRcdGxpbmtbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0dmFyIHNjcm9sbFRvID0gZ2V0RWxlbWVudFNjcm9sbFBvc2l0aW9uKHRoaXMpLFxyXG5cdFx0XHRcdFx0c3RhcnQgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRzY3JvbGxUb1koc2Nyb2xsVG8sIDIwMDApO1xyXG5cclxuXHRcdCAgXHR9KTtcclxuXHRcdH1cclxuXHJcblx0fSkoKVxyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbi8vIFBSRUxPQURFUlx0XHJcblx0KGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpLFxyXG5cdFx0XHRpbWdzID0gW10sXHJcblx0XHRcdHRvdGFsSW1ncyxcclxuXHRcdFx0dG90YWxMb2FkZWQgPSAwLFxyXG5cdFx0XHRzaG93ZWRQZXJjZW50cyA9IDAsXHJcblx0XHRcclxuXHRcdFx0cHJlbG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJlbG9hZGVyJylbMF0sXHJcblx0XHRcdHByZWxvYWRlclBlcmNlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJlbG9hZGVyX19wcm9ncmVzcy10ZXh0JylbMF0sXHRcclxuXHRcdFx0dGltZXI7XHJcblxyXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGlmKCFwcmVsb2FkZXIgfHwgIXByZWxvYWRlclBlcmNlbnRzKSByZXR1cm47XHJcblxyXG5cdFx0Zm9yKHZhciBpIGluIGVsZW1lbnRzKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBlbGVtZW50c1tpXSAhPT0gJ29iamVjdCcpIGNvbnRpbnVlO1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGltZ1VybCA9IG51bGw7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGVsZW1lbnRzW2ldLm5vZGVOYW1lKSB7XHJcblx0XHRcdCAgY2FzZSAnSU1HJzpcclxuXHRcdFx0ICAgIGltZ1VybCA9IGVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcblx0XHRcdCAgICBicmVhaztcclxuXHRcdFx0ICBjYXNlICdTVkcnOiBjYXNlICdzdmcnOlxyXG5cdFx0XHQgICAgdmFyIHN2Z1VzZSA9IGVsZW1lbnRzW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1c2UnKTtcclxuXHRcdFx0ICAgIGlmKCFzdmdVc2VbMF0pIGJyZWFrO1xyXG5cdFx0XHQgICAgdmFyIHVzZUhyZWYgPSBzdmdVc2VbMF0uZ2V0QXR0cmlidXRlKCd4bGluazpocmVmJyk7XHJcblx0XHRcdCAgICB1c2VIcmVmID0gdXNlSHJlZi5tYXRjaCgvKC4qPylcXC5zdmcvKTtcclxuXHRcdFx0ICAgIGltZ1VybCA9ICh1c2VIcmVmICE9PSBudWxsID8gdXNlSHJlZlswXSA6IG51bGwpO1xyXG5cdFx0XHQgICAgYnJlYWs7XHJcblx0XHRcdCAgZGVmYXVsdDpcclxuXHRcdFx0ICAgIGlmKCFlbGVtZW50c1tpXS5ub2RlTmFtZSkgYnJlYWs7XHJcblx0XHRcdFx0dmFyIGJnSW1nID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50c1tpXSkuYmFja2dyb3VuZEltYWdlO1xyXG5cdFx0XHRcdGlmKGJnSW1nICE9ICdub25lJykge1xyXG5cdFx0XHRcdFx0YmdJbWcgPSBiZ0ltZy5tYXRjaCgvdXJsXFwoKC4qPylcXCkvKTtcclxuXHRcdFx0XHRcdGJnSW1nID0gKGJnSW1nICE9PSBudWxsID8gYmdJbWdbMV0ucmVwbGFjZSgvKCd8XCIpL2csJycpIDogbnVsbCk7XHJcblx0XHRcdFx0XHRpbWdVcmwgPSBiZ0ltZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGltZ1VybCAhPT0gbnVsbCAmJiBpbWdVcmwgIT0gJ25vbmUnICYmIGltZ3MuaW5kZXhPZihpbWdVcmwpID09IC0xKSBpbWdzLnB1c2goaW1nVXJsKTtcclxuXHRcdH1cclxuXHJcblx0XHR0b3RhbEltZ3MgPSBpbWdzLmxlbmd0aDtcclxuXHJcblx0XHRmb3IoaSBpbiBpbWdzKSB7XHJcblx0XHRcdHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdFx0aW1nLnNyYyA9IGltZ3NbaV07XHJcblx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR0b3RhbExvYWRlZCsrO1xyXG5cdFx0XHQgIFx0c2V0UGVyY2VudHModG90YWxMb2FkZWQsIHRvdGFsSW1ncyk7XHJcblx0XHRcdCAgXHRjb25zb2xlLmxvZyh0aGlzLnNyYyArICcg0LfQsNCz0YDRg9C20LXQvdC+Jyk7XHJcblx0XHRcdH07XHJcblx0XHRcdGltZy5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dG90YWxMb2FkZWQrKztcclxuXHRcdFx0ICBcdHNldFBlcmNlbnRzKHRvdGFsTG9hZGVkLCB0b3RhbEltZ3MpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsTG9hZGVkLCB0b3RhbEltZ3MpIHtcclxuXHRcdFx0dmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKHRvdGFsTG9hZGVkIC8gdG90YWxJbWdzICogMTAwKTtcclxuXHJcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRwcmVsb2FkZXJQZXJjZW50cy50ZXh0Q29udGVudCA9IHNob3dlZFBlcmNlbnRzO1xyXG5cclxuXHRcdFx0aWYocGVyY2VudHMgPj0gMTAwKSB7XHJcblx0XHRcdFx0cHJlbG9hZGVyUGVyY2VudHMudGV4dENvbnRlbnQgPSBzaG93ZWRQZXJjZW50cyA9IDEwMDtcclxuXHJcblx0XHRcdFx0aWYocHJlbG9hZGVyKSB7XHJcblx0XHRcdFx0XHRwcmVsb2FkZXIuY2xhc3NMaXN0LmFkZCgncHJlbG9hZGVyX2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5jbGFzc0xpc3QuYWRkKCdfbG9hZGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0dGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0cHJlbG9hZGVyUGVyY2VudHMudGV4dENvbnRlbnQgPSBzaG93ZWRQZXJjZW50cztcclxuXHRcdFx0XHRcdHNob3dlZFBlcmNlbnRzKys7XHJcblxyXG5cdFx0XHRcdFx0aWYoc2hvd2VkUGVyY2VudHMgPj0gcGVyY2VudHMpIHtcclxuXHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgMTApO1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG59LDcwMCk7XHJcblxyXG5cdH0pKClcclxuXHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuLy8gU0xJREVSXHRcclxuXHQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyJyk7XHJcblxyXG5cdFx0aWYgKCFzbGlkZXIubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdFx0ZnVuY3Rpb24gU2xpZGVyKHJvb3QpIHtcclxuXHRcdFx0dGhpcy5zbGlkZXJSb290ID0gcm9vdDtcclxuXHJcblx0XHRcdHRoaXMuc2xpZGVySXRlbXMgPSBbXTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuY3VycmVudEl0ZW1OdW0gPSAwO1xyXG5cclxuXHRcdFx0dGhpcy5mbGFnID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyID0gZnVuY3Rpb24oaXRlbSwgbmFtZSkge1xyXG5cdFx0XHRcdHZhciBjbGFzc1ByZWZpeCA9ICdzbGlkZXJfX2l0ZW0tJyxcclxuXHRcdFx0XHRcdHZhbHVlO1xyXG5cclxuXHRcdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lKTtcclxuXHJcblx0XHRcdFx0aWYoIXZhbHVlKSB7XHJcblx0XHRcdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc1ByZWZpeCArIG5hbWUpWzBdO1xyXG5cdFx0XHRcdFx0dmFsdWUgPSAodmFsdWUgPyB2YWx1ZS5pbm5lckhUTUwudHJpbSgpIDogbnVsbCk7XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuZ2VuSXRlbXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgaXRlbXMgPSB0aGlzLnNsaWRlclJvb3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19pdGVtJyksXHJcblx0XHRcdFx0XHRpLFxyXG5cdFx0XHRcdFx0c2xpZGVySXRlbTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0XHRmb3IoaSBpbiBpdGVtcykge1xyXG5cdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW1zW2ldICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcblx0XHRcdFx0XHRzbGlkZXJJdGVtID0ge1xyXG5cdFx0XHRcdFx0XHQndGl0bGUnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAndGl0bGUnKSxcclxuXHRcdFx0XHRcdFx0J2Rlc2NyJzogdGhpcy5nZXRWYWx1ZXNJdGVtc0hlbHBlcihpdGVtc1tpXSwgJ2Rlc2NyJyksXHJcblx0XHRcdFx0XHRcdCdpbWcnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAnaW1nJyksXHJcblx0XHRcdFx0XHRcdCdocmVmJzogdGhpcy5nZXRWYWx1ZXNJdGVtc0hlbHBlcihpdGVtc1tpXSwgJ2hyZWYnKSxcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXJJdGVtc1tpXSA9IHNsaWRlckl0ZW07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMudG90YWwgPSB0aGlzLnNsaWRlckl0ZW1zLmxlbmd0aDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuZ2VuSFRNTCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBibG9ja1BpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tQaWNJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja0Fib3V0VW5pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRibG9ja1VuaXREZXNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tVbml0TGlua0hyZWYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcblx0XHRcdFx0XHRibG9ja05hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG5cdFx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG5cdFx0XHRcdFx0aTtcclxuXHJcblx0XHRcdFx0YmxvY2tQaWMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYycpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tQaWMgPSBibG9ja1BpYztcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljQWN0aXZlSXRlbSA9IGJsb2NrUGljLmFwcGVuZENoaWxkKGJsb2NrUGljSXRlbS5jbG9uZU5vZGUoKSk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtJyk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbSA9IGJsb2NrUGljLmFwcGVuZENoaWxkKGJsb2NrUGljSXRlbSk7XHRcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW0nKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHRcdFxyXG5cclxuXHRcdFx0XHRibG9ja0Fib3V0VW5pdC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2Fib3V0LXVuaXQnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRUaXRsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX3VuaXQtdGl0bGUnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRUaXRsZUNudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250LmNsYXNzTGlzdC5hZGQoJ3RpdGxlX3dpdGgtbGluZScpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250LmNsYXNzTGlzdC5hZGQoJ3RpdGxlX3dpdGgtbGluZS11cHBlcicpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdERlc2NyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdW5pdC1kZXNjcicpO1xyXG5cdFx0XHRcdGJsb2NrVW5pdExpbmsuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX191bml0LWxpbmsnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5jbGFzc0xpc3QuYWRkKCdidG5fd2l0aC1pY29uJyk7XHJcblx0XHRcdFx0YmxvY2tVbml0TGlua0hyZWYuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5pbm5lckhUTUwgPSAnPHN2ZyBjbGFzcz1cInN2Zy1pY29uIHN2Zy1pY29uX2xpbmtcIiByb2xlPVwiaW1nXCI+PHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiLi9hc3NldHMvaW1nL3Nwcml0ZS5zdmcjbGlua1wiPjwvdXNlPjwvc3ZnPjxzcGFuPtCf0L7RgdC80L7RgtGA0LXRgtGMINGB0LDQudGCPC9zcGFuPic7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZSA9IGJsb2NrQWJvdXRVbml0LmFwcGVuZENoaWxkKGJsb2NrVW5pdFRpdGxlKS5hcHBlbmRDaGlsZChibG9ja1VuaXRUaXRsZUNudCk7XHJcblx0XHRcdFx0YmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0VGl0bGUpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjciA9IGJsb2NrQWJvdXRVbml0LmFwcGVuZENoaWxkKGJsb2NrVW5pdERlc2NyKTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rID0gYmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGluaykuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGlua0hyZWYpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tVbml0TGluay5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrTmF2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2Jyk7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5QcmV2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bicpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub2ZvbGxvdycpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuUHJldi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzbGlkZXJfX25hdi1pY29uXCI+PC9zcGFuPic7XHJcblx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0ID0gYmxvY2tOYXZCdG5QcmV2LmNsb25lTm9kZSgpO1xyXG5cdFx0XHRcdGJsb2NrTmF2QnRuTmV4dC5pbm5lckhUTUwgPSBibG9ja05hdkJ0blByZXYuaW5uZXJIVE1MO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5QcmV2ID0gYmxvY2tOYXYuYXBwZW5kQ2hpbGQoYmxvY2tOYXZCdG5QcmV2KTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuUHJldi5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG5fcHJldicpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tOYXZCdG5OZXh0ID0gYmxvY2tOYXYuYXBwZW5kQ2hpbGQoYmxvY2tOYXZCdG5OZXh0KTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuTmV4dC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG5fbmV4dCcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLmJsb2NrTmF2QnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tOYXZCdG4uYmluZCh7c2xpZGVyOiB0aGlzLCB0eXBlOiAnbmV4dCd9KSk7XHJcblx0XHRcdFx0dGhpcy5ibG9ja05hdkJ0blByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTmF2QnRuLmJpbmQoe3NsaWRlcjogdGhpcywgdHlwZTogJ3ByZXYnfSkpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlclJvb3QuYXBwZW5kQ2hpbGQoYmxvY2tQaWMpO1xyXG5cdFx0XHRcdHRoaXMuc2xpZGVyUm9vdC5hcHBlbmRDaGlsZChibG9ja0Fib3V0VW5pdCk7XHJcblx0XHRcdFx0dGhpcy5zbGlkZXJSb290LmFwcGVuZENoaWxkKGJsb2NrTmF2KTtcdFxyXG5cclxuXHRcdFx0XHR2YXIgJHRoYXQgPSB0aGlzO1xyXG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGxvYWRlZFNsaWRlcyA9IDA7XHJcblxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gbGlzdGVuTG9hZGVkKGxvYWRlZCwgdG90YWwpIHtcclxuXHRcdFx0XHRcdFx0aWYobG9hZGVkID09IHRvdGFsKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgkdGhhdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Zm9yKGkgaW4gJHRoYXQuc2xpZGVySXRlbXMpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNsaWRlckl0ZW0gPSAkdGhhdC5zbGlkZXJJdGVtc1tpXSxcclxuXHRcdFx0XHRcdFx0XHRzbGlkZUltZyA9IG5ldyBJbWFnZSgpLFxyXG5cdFx0XHRcdFx0XHRcdHNsaWRlVGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRzbGlkZVRodW1iLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYicpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcuc3JjID0gc2xpZGVySXRlbS5pbWc7XHJcblx0XHRcdFx0XHRcdHNsaWRlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC30LDQs9GA0YPQttC10L3QviDQsiDRgdC70LDQudC00LXRgCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0bG9hZGVkU2xpZGVzKys7XHJcblx0XHRcdFx0XHRcdFx0XHRsaXN0ZW5Mb2FkZWQobG9hZGVkU2xpZGVzLCAkdGhhdC50b3RhbCk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC90LUg0LfQsNCz0YDRg9C20LXQvdC+INCyINGB0LvQsNC50LTQtdGAJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRsb2FkZWRTbGlkZXMrKztcclxuXHRcdFx0XHRcdFx0XHRcdGxpc3RlbkxvYWRlZChsb2FkZWRTbGlkZXMsICR0aGF0LnRvdGFsKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvY2tOYXZCdG5OZXh0LmFwcGVuZENoaWxkKHNsaWRlVGh1bWIpLmFwcGVuZENoaWxkKHNsaWRlSW1nKTtcclxuXHRcdFx0XHRcdFx0JHRoYXQuYmxvY2tOYXZCdG5QcmV2LmFwcGVuZENoaWxkKHNsaWRlVGh1bWIuY2xvbmVOb2RlKCkpLmFwcGVuZENoaWxkKHNsaWRlSW1nLmNsb25lTm9kZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGN1cnJlbnROZXcsIHR5cGUpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuY3VycmVudEl0ZW1OdW0sXHJcblx0XHRcdFx0XHRuZXh0ID0gdGhpcy5nZXROZXh0TnVtKGN1cnJlbnQpLFxyXG5cdFx0XHRcdFx0cHJldiA9IHRoaXMuZ2V0UHJldk51bShjdXJyZW50KSxcclxuXHRcdFx0XHRcdG5leHROZXcgPSB0aGlzLmdldE5leHROdW0oY3VycmVudE5ldyksXHJcblx0XHRcdFx0XHRwcmV2TmV3ID0gdGhpcy5nZXRQcmV2TnVtKGN1cnJlbnROZXcpLFxyXG5cdFx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dCA6IHByZXYpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKTtcclxuXHRcdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dCA6IHByZXYpXS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQodHlwZSA9PSAnbmV4dCcgPyAkdGhhdC5ibG9ja05hdkJ0bk5leHQgOiAkdGhhdC5ibG9ja05hdkJ0blByZXYpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYicpWyh0eXBlID09ICduZXh0JyA/IG5leHROZXcgOiBwcmV2TmV3KV0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYtYnRuLXRodW1iX2FjdGl2ZScpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKVswXS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iX3VuYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5zZXRBY3RpdmVJbmZvID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG5cclxuXHRcdFx0XHR2YXIgYWN0aXZlU2xpZGUgPSB0aGlzLnNsaWRlckl0ZW1zW2N1cnJlbnRdO1xyXG5cclxuXHRcdFx0XHRpZihhY3RpdmVTbGlkZS50aXRsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZS5pbm5lckhUTUwgPSBhY3RpdmVTbGlkZS50aXRsZTtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0VGl0bGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0VGl0bGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYWN0aXZlU2xpZGUuZGVzY3IpIHtcclxuXHRcdFx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3IuaW5uZXJIVE1MID0gYWN0aXZlU2xpZGUuZGVzY3I7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdERlc2NyLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYWN0aXZlU2xpZGUuaHJlZikge1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFjdGl2ZVNsaWRlLmhyZWYpO1xyXG5cdFx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLnNldEFjdGl2ZVBpYyA9IGZ1bmN0aW9uKGN1cnJlbnQsIGJsb2NrUGljSXRlbSkge1xyXG5cdFx0XHRcdHZhciBhY3RpdmVTbGlkZSA9IHRoaXMuc2xpZGVySXRlbXNbY3VycmVudF0sXHJcblx0XHRcdFx0ICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHRcdGltZy5zcmMgPSBhY3RpdmVTbGlkZS5pbWc7XHJcblxyXG5cdFx0XHRcdFx0aWYoYmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5jb250YWlucygnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbV9oaWRkZW4nKTtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmFwcGVuZENoaWxkKGltZykucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHJcblx0XHRcdFx0XHRcdGJsb2NrUGljSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1fdmlzaWJsZScpO1x0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJsb2NrUGljSXRlbS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmNsaWNrTmF2QnRuID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0aWYodGhpcy5zbGlkZXIuZmxhZykge1xyXG5cclxuXHRcdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuc2xpZGVyLmN1cnJlbnRJdGVtTnVtLFxyXG5cdFx0XHRcdFx0Y3VycmVudE5ldyA9ICh0aGlzLnR5cGUgPT0gJ25leHQnID8gdGhpcy5zbGlkZXIuZ2V0TmV4dE51bShjdXJyZW50KSA6IHRoaXMuc2xpZGVyLmdldFByZXZOdW0oY3VycmVudCkpO1x0XHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuZmxhZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuYW5pbWF0aW9uRG9uZShbXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLmNoYW5nZVNsaWRlKGN1cnJlbnROZXcsICduZXh0JyksXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLmNoYW5nZVNsaWRlKGN1cnJlbnROZXcsICdwcmV2JyksXHJcblx0XHRcdFx0XHRcdHRoaXMuc2xpZGVyLnNldEFjdGl2ZVBpYyhjdXJyZW50TmV3LCB0aGlzLnNsaWRlci5ibG9ja1BpY0FjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdFx0XHR0aGlzLnNsaWRlci5zZXRBY3RpdmVQaWMoY3VycmVudE5ldywgdGhpcy5zbGlkZXIuYmxvY2tQaWNEaXNhY3RpdmVJdGVtKVxyXG5cdFx0XHRcdFx0XSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuc2V0QWN0aXZlSW5mbyhjdXJyZW50TmV3KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5jdXJyZW50SXRlbU51bSA9IGN1cnJlbnROZXc7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmdldE5leHROdW0gPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcblx0XHRcdFx0Y3VycmVudCsrO1xyXG4gICAgICAgICAgICBcdHJldHVybiAoY3VycmVudCA+IHRoaXMudG90YWwgLSAxID8gMCA6IGN1cnJlbnQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5nZXRQcmV2TnVtID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG4gICAgICAgICAgICBcdGN1cnJlbnQtLTtcclxuICAgICAgICAgICAgXHRyZXR1cm4gKGN1cnJlbnQgPCAwID8gdGhpcy50b3RhbCAtIDEgOiBjdXJyZW50KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uRG9uZSA9IGZ1bmN0aW9uKGFycikge1xyXG5cdFx0XHRcdHZhciAkdGhhdCA9IHRoaXM7XHJcblx0XHRcdFx0UHJvbWlzZS5hbGwoYXJyKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuXHRcdFx0XHQgIFx0JHRoYXQuZmxhZyA9IHRydWU7XHJcblx0XHRcdFx0ICBcdGNvbnNvbGUubG9nKCdhaW1hdGlvbiBkb25lJyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5nZW5JdGVtcygpO1xyXG5cclxuXHRcdFx0XHRpZih0aGlzLnNsaWRlckl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHR0aGlzLmdlbkhUTUwoKS50aGVuKGZ1bmN0aW9uKHNsaWRlcikge1xyXG5cclxuXHRcdFx0XHRcdHNsaWRlci5zbGlkZXJSb290LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9sb2FkZWQnKTtcclxuXHJcblx0XHRcdFx0XHRzbGlkZXIuYW5pbWF0aW9uRG9uZShbXHJcblx0XHRcdFx0XHRcdHNsaWRlci5jaGFuZ2VTbGlkZShzbGlkZXIuY3VycmVudEl0ZW1OdW0sICduZXh0JyksXHJcblx0XHRcdFx0XHRcdHNsaWRlci5jaGFuZ2VTbGlkZShzbGlkZXIuY3VycmVudEl0ZW1OdW0sICdwcmV2JyksXHJcblx0XHRcdFx0XHRcdHNsaWRlci5zZXRBY3RpdmVQaWMoc2xpZGVyLmN1cnJlbnRJdGVtTnVtLCBzbGlkZXIuYmxvY2tQaWNBY3RpdmVJdGVtKSxcclxuXHRcdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZVBpYyhzbGlkZXIuY3VycmVudEl0ZW1OdW0sIHNsaWRlci5ibG9ja1BpY0Rpc2FjdGl2ZUl0ZW0pXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XSk7XHJcblxyXG5cdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZUluZm8oc2xpZGVyLmN1cnJlbnRJdGVtTnVtKTtcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygncmVhZHknKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH07XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcih2YXIgaSBpbiBzbGlkZXIpIHtcclxuXHRcdFx0aWYodHlwZW9mICBzbGlkZXJbaV0gIT0gJ29iamVjdCcpIGNvbnRpbnVlO1xyXG5cdFx0XHR2YXIgcyA9IG5ldyBTbGlkZXIoc2xpZGVyW2ldKTtcclxuXHRcdFx0cy5pbml0KCk7XHJcblx0XHR9XHJcblxyXG5cdH0pKClcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
