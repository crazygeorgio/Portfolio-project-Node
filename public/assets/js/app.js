'use strict';
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
// PRELOADER	
var preloader = function () {
    var elements = document.getElementsByTagName('*'), totalImgs, html = document.getElementsByTagName('html')[0], preloader = document.getElementsByClassName('preloader')[0], preloaderPercents = document.getElementsByClassName('preloader__progress-text')[0], timer;
    if (!preloader || !preloaderPercents)
        return;
    html.classList.remove('_loaded');
    return {
        totalLoaded: 0,
        showedPercents: 0,
        getImgs: function () {
            var imgs = [];
            for (var i in elements) {
                if (typeof elements[i] !== 'object')
                    continue;
                var imgUrl = null;
                switch (elements[i].nodeName) {
                case 'IMG':
                    imgUrl = elements[i].getAttribute('src');
                    break;
                /*case 'SVG': case 'svg':
				    var svgUse = elements[i].getElementsByTagName('use');
				    if(!svgUse[0]) break;
				    var useHref = svgUse[0].getAttribute('xlink:href');
				    useHref = useHref.match(/(.*?)\.svg/);
				    imgUrl = (useHref !== null ? useHref[0] : null);
				    break;*/
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
            return imgs;
        },
        loadImgs: function () {
            var imgs = this.getImgs(), totalImgs = imgs.length, $that = this;
            for (i in imgs) {
                var img = new Image();
                img.src = imgs[i];
                img.onload = function () {
                    $that.totalLoaded++;
                    $that.setPercents($that.totalLoaded, totalImgs);
                    console.log(this.src + ' загружено');
                };
                img.onerror = function () {
                    $that.totalLoaded++;
                    $that.setPercents($that.totalLoaded, totalImgs);
                };
            }
        },
        setPercents: function (totalLoaded, totalImgs) {
            var percents = Math.ceil(totalLoaded / totalImgs * 100), $that = this;
            clearInterval(timer);
            preloaderPercents.textContent = this.showedPercents;
            if (percents >= 100) {
                preloaderPercents.textContent = this.showedPercents = 100;
                if (preloader) {
                    preloader.classList.add('preloader_hidden');
                    html.classList.remove('_init');
                    html.classList.add('_loaded');
                }
            } else {
                timer = setInterval(function () {
                    preloaderPercents.textContent = $that.showedPercents;
                    $that.showedPercents++;
                    if ($that.showedPercents >= percents) {
                        clearInterval(timer);
                    }
                }, 10);
            }
        },
        init: function () {
            this.loadImgs();
        }
    };
}();
var stylesheet = loadCSS(preloadStyle ? preloadStyle : null, document.getElementsByClassName('page')[0]);
onloadCSS(stylesheet, function () {
    preloader.init();
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cvYmxvZy5qcyIsImZsaXBwZXItdHJpZ2dlci9mbGlwcGVyLXRyaWdnZXIuanMiLCJmb3JtL2Zvcm0uanMiLCJtYXAvbWFwLmpzIiwibmF2L25hdi5qcyIsInBhZ2UvcGFnZV9fZm9vdGVyLmpzIiwicGFnZS9zY3JvbGwuanMiLCJwcmVsb2FkZXIvcHJlbG9hZGVyLmpzIiwic2xpZGVyL3NsaWRlci5qcyJdLCJuYW1lcyI6WyJibG9ja0Jsb2dNZW51IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQmxvZ01lbnUiLCJibG9jayIsImJsb2dNZW51IiwiYmxvZ1dyYXAiLCJwYXJlbnROb2RlIiwiYmxvZ0NvbnRhaW5lciIsIm1vYmlsZVN0YXR1cyIsInRyaWdnZXJNb2JpbGVNZW51IiwiYnV0dG9uQmxvZ01lbnUiLCIkdGhhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJib2R5IiwiZSIsImVsZW1lbnQiLCJ0YXJnZXQiLCJoaWRlIiwiY29udGFpbnMiLCJwYXJlbnRFbGVtZW50IiwiZml4ZWQiLCJjb250YWluZXIiLCJtZW51Iiwid3JhcCIsIndyYXBQb3MiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250YWluZXJIZWlnaHQiLCJtZW51SGVpZ2h0IiwiZml4ZWRTdGFydCIsImZpeGVkU3RvcCIsInNjcm9sbFRvcCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0IiwiZG9jdW1lbnRFbGVtZW50Iiwib2Zmc2V0SGVpZ2h0IiwidG9wIiwicGFyc2VGbG9hdCIsImdldENvbXB1dGVkU3R5bGUiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImNoZWNrQWN0aXZlIiwid2luSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJtZW51SXRlbXNMaW5rcyIsImJsb2dJdGVtSWQiLCJibG9nSXRlbSIsImFjdGl2ZUlkIiwibWluVG9wIiwiY3VycmVudFRvcCIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJtYXRjaCIsImdldEVsZW1lbnRCeUlkIiwiTWF0aCIsImFicyIsInBhdHRlcm4iLCJSZWdFeHAiLCJpbml0IiwiYmluZCIsInRyaWdnZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYnRuQmFjayIsInR1cm5GbGlwcGVyIiwiZmxpcElkIiwiZmxpcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsImxvY2F0aW9uIiwiaGFzaCIsInJlcGxhY2UiLCJhbGxGb3JtcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYWpheEZvcm1zIiwiZm9ybXMiLCJtaW5MZW5ndGgiLCJ0aXBDbGFzcyIsInRpcENsYXNzVmlzaWJsZSIsIm1lc3NhZ2VDbGFzcyIsIm1lc3NhZ2VUZXh0IiwiZWxlbWVudENsYXNzRXJyb3IiLCJzaG93VGlwIiwidHlwZUVyciIsInR5cGUiLCJ0aXAiLCJ0eXBlTWVzc2FnZUNsYXNzIiwibWVzc2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImlubmVySFRNTCIsImhpZGVUaXAiLCJyZW1vdmVDaGlsZCIsImNsZWFyT25Gb2N1cyIsInRyaWdnZXJUaXAiLCJjb25kIiwiY2hlY2tSZXF1aXJlZCIsInJlcXVpcmVkIiwiY2hlY2tlZCIsInZhbHVlIiwiY2hlY2tQYXR0ZXJuIiwiY2hlY2tWYWxpZGF0aW9uIiwic2hvd1N0eWxlRXJyIiwiZWxlbWVudElzVmFsaWQiLCJ2YWxpZGF0ZUZvcm0iLCJmb3JtIiwiaW5wdXQiLCJ0ZXh0YXJlYSIsImVsZW1lbnRzIiwiZm9ybUlzVmFsaWQiLCJjb25jYXQiLCJlbGVtZW50VmFsaWRhdGlvbiIsIm9ua2V5dXAiLCJvbmlucHV0Iiwib25jbGljayIsIm9ucHJvcGVydHljaGFuZ2UiLCJwcm9wZXJ0eU5hbWUiLCJvbmN1dCIsInNldFRpbWVvdXQiLCJ0aXBzIiwibm9WYWxpZGF0ZSIsIm9uc3VibWl0IiwibWFwIiwic3R5bGVNYXAiLCJpbml0TWFwIiwibXlMYXRMbmciLCJsYXQiLCJsbmciLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsIm1hcFR5cGVDb250cm9sIiwicGFuQ29udHJvbCIsInpvb21Db250cm9sIiwiem9vbUNvbnRyb2xPcHRpb25zIiwicG9zaXRpb24iLCJDb250cm9sUG9zaXRpb24iLCJSSUdIVF9DRU5URVIiLCJzdHJlZXRWaWV3Q29udHJvbCIsIm1hcFR5cGVJZCIsIk1hcFR5cGVJZCIsIlJPQURNQVAiLCJzY3JvbGx3aGVlbCIsImRyYWdnYWJsZSIsInN0eWxlcyIsIm1hcmtlciIsIk1hcmtlciIsInRpdGxlIiwic2V0TWFwIiwiYnRuTWVudSIsIm5hdiIsImJsdXIiLCJiZ0ltZyIsImZvcm1CbHVyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsInBvc0xlZnQiLCJsZWZ0IiwicG9zVG9wIiwic3R5bGUiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kU2l6ZSIsImNsaWVudFdpZHRoIiwicGFyYWxsYXgiLCJsZWFmMSIsImxlYWYyIiwibGVhZjMiLCJtb3ZlIiwic3BlZWRTaGlmdCIsInNwZWVkRHJvcCIsInNwZWVkUm90YXRlIiwicGFnZUhlaWdodCIsInNjcm9sbEhlaWdodCIsInRyYW5zZm9ybSIsImJvdHRvbSIsIndlYmtpdFRyYW5zZm9ybSIsIm1velRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwib1RyYW5zZm9ybSIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNjcm9sbFRvWSIsInNjcm9sbFRhcmdldFkiLCJzcGVlZCIsImVhc2luZyIsInNjcm9sbFkiLCJjdXJyZW50VGltZSIsInRpbWUiLCJtYXgiLCJtaW4iLCJQSV9EMiIsIlBJIiwiZWFzaW5nRXF1YXRpb25zIiwiZWFzZU91dFNpbmUiLCJwb3MiLCJzaW4iLCJlYXNlSW5PdXRTaW5lIiwiY29zIiwiZWFzZUluT3V0UXVpbnQiLCJwb3ciLCJ0aWNrIiwicCIsInQiLCJzY3JvbGxUbyIsImxpbmsiLCJnZXRFbGVtZW50U2Nyb2xsUG9zaXRpb24iLCJlbGVtZW50SWQiLCJocmVmIiwiZWxlbWVudE9mUGFnZSIsInN0YXJ0IiwicHJlbG9hZGVyIiwidG90YWxJbWdzIiwiaHRtbCIsInByZWxvYWRlclBlcmNlbnRzIiwidGltZXIiLCJ0b3RhbExvYWRlZCIsInNob3dlZFBlcmNlbnRzIiwiZ2V0SW1ncyIsImltZ3MiLCJpbWdVcmwiLCJub2RlTmFtZSIsImJhY2tncm91bmRJbWFnZSIsInB1c2giLCJsb2FkSW1ncyIsImltZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwic2V0UGVyY2VudHMiLCJjb25zb2xlIiwibG9nIiwib25lcnJvciIsInBlcmNlbnRzIiwiY2VpbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0Q29udGVudCIsInNldEludGVydmFsIiwic3R5bGVzaGVldCIsImxvYWRDU1MiLCJwcmVsb2FkU3R5bGUiLCJvbmxvYWRDU1MiLCJzbGlkZXIiLCJTbGlkZXIiLCJyb290Iiwic2xpZGVyUm9vdCIsInNsaWRlckl0ZW1zIiwiY3VycmVudEl0ZW1OdW0iLCJmbGFnIiwiZ2V0VmFsdWVzSXRlbXNIZWxwZXIiLCJpdGVtIiwibmFtZSIsImNsYXNzUHJlZml4IiwidHJpbSIsImdlbkl0ZW1zIiwiaXRlbXMiLCJzbGlkZXJJdGVtIiwidG90YWwiLCJnZW5IVE1MIiwiYmxvY2tQaWMiLCJibG9ja1BpY0l0ZW0iLCJibG9ja0Fib3V0VW5pdCIsImJsb2NrVW5pdFRpdGxlIiwiYmxvY2tVbml0VGl0bGVDbnQiLCJibG9ja1VuaXREZXNjciIsImJsb2NrVW5pdExpbmsiLCJibG9ja1VuaXRMaW5rSHJlZiIsImJsb2NrTmF2IiwiYmxvY2tOYXZCdG5QcmV2IiwiYmxvY2tOYXZCdG5OZXh0IiwiYmxvY2tQaWNBY3RpdmVJdGVtIiwiY2xvbmVOb2RlIiwiYmxvY2tQaWNEaXNhY3RpdmVJdGVtIiwic2V0QXR0cmlidXRlIiwiZGlzcGxheSIsImNsaWNrTmF2QnRuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJsb2FkZWRTbGlkZXMiLCJsaXN0ZW5Mb2FkZWQiLCJsb2FkZWQiLCJzbGlkZUltZyIsInNsaWRlVGh1bWIiLCJjaGFuZ2VTbGlkZSIsImN1cnJlbnROZXciLCJjdXJyZW50IiwibmV4dCIsImdldE5leHROdW0iLCJwcmV2IiwiZ2V0UHJldk51bSIsIm5leHROZXciLCJwcmV2TmV3Iiwic2V0QWN0aXZlSW5mbyIsImFjdGl2ZVNsaWRlIiwiZGVzY3IiLCJzZXRBY3RpdmVQaWMiLCJhbmltYXRpb25Eb25lIiwiYXJyIiwiYWxsIiwidGhlbiIsInJlc3VsdHMiLCJzIl0sIm1hcHBpbmdzIjoiO0FBQUEsQ0FBQSxZQUFBO0FBQUEsSUFFQSxJQUFBQSxhQUFBLEdBQUFDLFFBQUEsQ0FBQUMsc0JBQUEsQ0FBQSxnQkFBQSxFQUFBLENBQUEsQ0FBQSxDQUZBO0FBQUEsSUFJQSxJQUFBLENBQUFGLGFBQUE7QUFBQSxRQUFBLE9BSkE7QUFBQSxJQU1BLElBQUFHLFFBQUEsR0FBQSxVQUFBQyxLQUFBLEVBQUE7QUFBQSxRQUVBLEtBQUFDLFFBQUEsR0FBQUQsS0FBQSxDQUZBO0FBQUEsUUFJQSxLQUFBRSxRQUFBLEdBQUFGLEtBQUEsQ0FBQUcsVUFBQSxDQUpBO0FBQUEsUUFNQSxLQUFBQyxhQUFBLEdBQUFKLEtBQUEsQ0FBQUcsVUFBQSxDQUFBQSxVQUFBLENBTkE7QUFBQSxRQVFBLEtBQUFFLFlBQUEsR0FBQSxLQUFBLENBUkE7QUFBQSxRQVVBLEtBQUFDLGlCQUFBLEdBQUEsWUFBQTtBQUFBLFlBRUEsSUFBQUMsY0FBQSxHQUFBVixRQUFBLENBQUFDLHNCQUFBLENBQUEsa0JBQUEsRUFBQSxDQUFBLENBQUEsRUFDQVUsS0FBQSxHQUFBLElBREEsQ0FGQTtBQUFBLFlBS0EsSUFBQSxDQUFBRCxjQUFBO0FBQUEsZ0JBQUEsT0FMQTtBQUFBLFlBT0FBLGNBQUEsQ0FBQUUsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsWUFBQTtBQUFBLGdCQUVBRCxLQUFBLENBQUFILFlBQUEsR0FBQSxDQUFBRyxLQUFBLENBQUFILFlBQUEsQ0FGQTtBQUFBLGdCQUdBLElBQUFHLEtBQUEsQ0FBQUgsWUFBQSxFQUFBO0FBQUEsb0JBQ0FFLGNBQUEsQ0FBQUcsU0FBQSxDQUFBQyxHQUFBLENBQUEsbUJBQUEsRUFEQTtBQUFBLG9CQUVBSCxLQUFBLENBQUFOLFFBQUEsQ0FBQVEsU0FBQSxDQUFBQyxHQUFBLENBQUEsbUJBQUEsRUFGQTtBQUFBLGlCQUFBLE1BR0E7QUFBQSxvQkFDQUosY0FBQSxDQUFBRyxTQUFBLENBQUFFLE1BQUEsQ0FBQSxtQkFBQSxFQURBO0FBQUEsb0JBRUFKLEtBQUEsQ0FBQU4sUUFBQSxDQUFBUSxTQUFBLENBQUFFLE1BQUEsQ0FBQSxtQkFBQSxFQUZBO0FBQUEsaUJBTkE7QUFBQSxhQUFBLEVBUEE7QUFBQSxZQW9CQWYsUUFBQSxDQUFBZ0IsSUFBQSxDQUFBSixnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBSyxDQUFBLEVBQUE7QUFBQSxnQkFFQSxJQUFBLENBQUFOLEtBQUEsQ0FBQUgsWUFBQTtBQUFBLG9CQUFBLE9BRkE7QUFBQSxnQkFHQSxJQUFBVSxPQUFBLEdBQUFELENBQUEsQ0FBQUUsTUFBQSxFQUNBQyxJQUFBLEdBQUEsSUFEQSxDQUhBO0FBQUEsZ0JBTUEsT0FBQUYsT0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQUEsT0FBQSxDQUFBTCxTQUFBLENBQUFRLFFBQUEsQ0FBQSxtQkFBQSxDQUFBLEVBQUE7QUFBQSx3QkFDQUQsSUFBQSxHQUFBLEtBQUEsQ0FEQTtBQUFBLHdCQUVBLE1BRkE7QUFBQSxxQkFBQTtBQUFBLHdCQUdBRixPQUFBLEdBQUFBLE9BQUEsQ0FBQUksYUFBQSxDQUpBO0FBQUEsaUJBTkE7QUFBQSxnQkFhQSxJQUFBRixJQUFBLEVBQUE7QUFBQSxvQkFDQVQsS0FBQSxDQUFBSCxZQUFBLEdBQUEsQ0FBQUcsS0FBQSxDQUFBSCxZQUFBLENBREE7QUFBQSxvQkFFQUUsY0FBQSxDQUFBRyxTQUFBLENBQUFFLE1BQUEsQ0FBQSxtQkFBQSxFQUZBO0FBQUEsb0JBR0FKLEtBQUEsQ0FBQU4sUUFBQSxDQUFBUSxTQUFBLENBQUFFLE1BQUEsQ0FBQSxtQkFBQSxFQUhBO0FBQUEsaUJBYkE7QUFBQSxhQUFBLEVBcEJBO0FBQUEsU0FBQSxDQVZBO0FBQUEsUUF1REEsS0FBQVEsS0FBQSxHQUFBLFNBQUFBLEtBQUEsQ0FBQU4sQ0FBQSxFQUFBO0FBQUEsWUFFQSxJQUFBTyxTQUFBLEdBQUEsS0FBQWpCLGFBQUEsRUFDQWtCLElBQUEsR0FBQSxLQUFBckIsUUFEQSxFQUVBc0IsSUFBQSxHQUFBLEtBQUFyQixRQUZBLEVBR0FzQixPQUFBLEdBQUFELElBQUEsQ0FBQUUscUJBQUEsRUFIQSxFQUlBQyxlQUpBLEVBS0FDLFVBTEEsRUFNQUMsVUFOQSxFQU9BQyxTQVBBLEVBUUFDLFNBQUEsR0FBQUMsTUFBQSxDQUFBQyxXQUFBLElBQUFuQyxRQUFBLENBQUFvQyxlQUFBLENBQUFILFNBUkEsQ0FGQTtBQUFBLFlBWUFILFVBQUEsR0FBQUwsSUFBQSxDQUFBWSxZQUFBLENBWkE7QUFBQSxZQWFBUixlQUFBLEdBQUFMLFNBQUEsQ0FBQWEsWUFBQSxDQWJBO0FBQUEsWUFjQU4sVUFBQSxHQUFBRSxTQUFBLEdBQUFOLE9BQUEsQ0FBQVcsR0FBQSxDQWRBO0FBQUEsWUFlQU4sU0FBQSxHQUFBRCxVQUFBLEdBQUFGLGVBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFTLFVBQUEsQ0FBQUMsZ0JBQUEsQ0FBQWhCLFNBQUEsRUFBQWlCLFVBQUEsQ0FBQSxHQUFBRixVQUFBLENBQUFDLGdCQUFBLENBQUFoQixTQUFBLEVBQUFrQixhQUFBLENBQUEsQ0FBQSxDQWZBO0FBQUEsWUFpQkEsSUFBQVQsU0FBQSxJQUFBRixVQUFBLEVBQUE7QUFBQSxnQkFDQU4sSUFBQSxDQUFBWixTQUFBLENBQUFFLE1BQUEsQ0FBQSxzQkFBQSxFQURBO0FBQUEsYUFqQkE7QUFBQSxZQXFCQSxJQUFBa0IsU0FBQSxHQUFBRixVQUFBLEVBQUE7QUFBQSxnQkFDQU4sSUFBQSxDQUFBWixTQUFBLENBQUFFLE1BQUEsQ0FBQSxDQUFBWSxPQUFBLENBQUFXLEdBQUEsR0FBQU4sU0FBQSxHQUFBRCxVQUFBLEdBQUEsMEJBQUEsR0FBQSxzQkFBQSxFQURBO0FBQUEsZ0JBRUFOLElBQUEsQ0FBQVosU0FBQSxDQUFBQyxHQUFBLENBQUEsQ0FBQWEsT0FBQSxDQUFBVyxHQUFBLEdBQUFOLFNBQUEsR0FBQUQsVUFBQSxHQUFBLHNCQUFBLEdBQUEsMEJBQUEsRUFGQTtBQUFBLGFBckJBO0FBQUEsU0FBQSxDQXZEQTtBQUFBLFFBbUZBLEtBQUFZLFdBQUEsR0FBQSxZQUFBO0FBQUEsWUFFQSxJQUFBQyxTQUFBLEdBQUFWLE1BQUEsQ0FBQVcsV0FBQSxJQUFBN0MsUUFBQSxDQUFBb0MsZUFBQSxDQUFBVSxZQUFBLElBQUE5QyxRQUFBLENBQUFnQixJQUFBLENBQUE4QixZQUFBLEVBQ0FDLGNBQUEsR0FBQSxLQUFBM0MsUUFBQSxDQUFBSCxzQkFBQSxDQUFBLG9CQUFBLENBREEsRUFFQStDLFVBRkEsRUFHQUMsUUFIQSxFQUlBQyxRQUpBLEVBS0FDLE1BTEEsRUFNQUMsVUFOQSxFQU9BQyxDQVBBLENBRkE7QUFBQSxZQVdBLElBQUFOLGNBQUEsQ0FBQU8sTUFBQSxJQUFBLENBQUE7QUFBQSxnQkFBQSxPQVhBO0FBQUEsWUFhQSxLQUFBRCxDQUFBLElBQUFOLGNBQUEsRUFBQTtBQUFBLGdCQUVBLElBQUEsT0FBQUEsY0FBQSxDQUFBTSxDQUFBLENBQUEsS0FBQSxRQUFBO0FBQUEsb0JBQUEsU0FGQTtBQUFBLGdCQUlBTCxVQUFBLEdBQUFELGNBQUEsQ0FBQU0sQ0FBQSxFQUFBRSxZQUFBLENBQUEsTUFBQSxFQUFBQyxLQUFBLENBQUEsUUFBQSxFQUFBLENBQUEsQ0FBQSxDQUpBO0FBQUEsZ0JBS0FQLFFBQUEsR0FBQWpELFFBQUEsQ0FBQXlELGNBQUEsQ0FBQVQsVUFBQSxDQUFBLENBTEE7QUFBQSxnQkFPQSxJQUFBLENBQUFDLFFBQUE7QUFBQSxvQkFBQSxTQVBBO0FBQUEsZ0JBU0FHLFVBQUEsR0FBQU0sSUFBQSxDQUFBQyxHQUFBLENBQUFWLFFBQUEsQ0FBQXJCLHFCQUFBLEdBQUFVLEdBQUEsQ0FBQSxDQVRBO0FBQUEsZ0JBV0EsSUFBQSxPQUFBYSxNQUFBLEtBQUEsV0FBQSxFQUFBO0FBQUEsb0JBQ0FBLE1BQUEsR0FBQUMsVUFBQSxDQURBO0FBQUEsb0JBRUFGLFFBQUEsR0FBQUYsVUFBQSxDQUZBO0FBQUEsb0JBR0EsU0FIQTtBQUFBLGlCQVhBO0FBQUEsZ0JBaUJBLElBQUFJLFVBQUEsR0FBQUQsTUFBQSxFQUFBO0FBQUEsb0JBQ0FBLE1BQUEsR0FBQUMsVUFBQSxDQURBO0FBQUEsb0JBRUFGLFFBQUEsR0FBQUYsVUFBQSxDQUZBO0FBQUEsaUJBakJBO0FBQUEsYUFiQTtBQUFBLFlBcUNBLElBQUFFLFFBQUEsRUFBQTtBQUFBLGdCQUNBLElBQUFVLE9BQUEsR0FBQSxJQUFBQyxNQUFBLENBQUEsTUFBQVgsUUFBQSxHQUFBLEdBQUEsRUFBQSxHQUFBLENBQUEsQ0FEQTtBQUFBLGdCQUVBLEtBQUFHLENBQUEsSUFBQU4sY0FBQSxFQUFBO0FBQUEsb0JBQ0EsSUFBQSxPQUFBQSxjQUFBLENBQUFNLENBQUEsQ0FBQSxLQUFBLFFBQUE7QUFBQSx3QkFBQSxTQURBO0FBQUEsb0JBRUFOLGNBQUEsQ0FBQU0sQ0FBQSxFQUFBeEMsU0FBQSxDQUFBRSxNQUFBLENBQUEsMkJBQUEsRUFGQTtBQUFBLG9CQUlBLElBQUFnQyxjQUFBLENBQUFNLENBQUEsRUFBQUUsWUFBQSxDQUFBLE1BQUEsRUFBQUMsS0FBQSxDQUFBSSxPQUFBLENBQUEsRUFBQTtBQUFBLHdCQUNBYixjQUFBLENBQUFNLENBQUEsRUFBQXhDLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLDJCQUFBLEVBREE7QUFBQSxxQkFKQTtBQUFBLGlCQUZBO0FBQUEsYUFyQ0E7QUFBQSxTQUFBLENBbkZBO0FBQUEsUUFzSUEsS0FBQWdELElBQUEsR0FBQSxZQUFBO0FBQUEsWUFFQSxLQUFBbkIsV0FBQSxHQUZBO0FBQUEsWUFHQSxLQUFBbEMsaUJBQUEsR0FIQTtBQUFBLFlBSUF5QixNQUFBLENBQUF0QixnQkFBQSxDQUFBLFFBQUEsRUFBQSxLQUFBVyxLQUFBLENBQUF3QyxJQUFBLENBQUE7QUFBQSxnQkFBQSxpQkFBQSxLQUFBeEQsYUFBQTtBQUFBLGdCQUFBLFlBQUEsS0FBQUgsUUFBQTtBQUFBLGdCQUFBLFlBQUEsS0FBQUMsUUFBQTtBQUFBLGFBQUEsQ0FBQSxFQUpBO0FBQUEsWUFLQTZCLE1BQUEsQ0FBQXRCLGdCQUFBLENBQUEsUUFBQSxFQUFBLEtBQUFXLEtBQUEsQ0FBQXdDLElBQUEsQ0FBQTtBQUFBLGdCQUFBLGlCQUFBLEtBQUF4RCxhQUFBO0FBQUEsZ0JBQUEsWUFBQSxLQUFBSCxRQUFBO0FBQUEsZ0JBQUEsWUFBQSxLQUFBQyxRQUFBO0FBQUEsYUFBQSxDQUFBLEVBTEE7QUFBQSxZQU1BNkIsTUFBQSxDQUFBdEIsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQStCLFdBQUEsQ0FBQW9CLElBQUEsQ0FBQSxFQUFBLFlBQUEsS0FBQTNELFFBQUEsRUFBQSxDQUFBLEVBTkE7QUFBQSxZQU9BOEIsTUFBQSxDQUFBdEIsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQStCLFdBQUEsQ0FBQW9CLElBQUEsQ0FBQSxFQUFBLFlBQUEsS0FBQTNELFFBQUEsRUFBQSxDQUFBLEVBUEE7QUFBQSxTQUFBLENBdElBO0FBQUEsS0FBQSxDQU5BO0FBQUEsSUF3SkEsSUFBQXFCLElBQUEsR0FBQSxJQUFBdkIsUUFBQSxDQUFBSCxhQUFBLENBQUEsQ0F4SkE7QUFBQSxJQXlKQTBCLElBQUEsQ0FBQXFDLElBQUEsR0F6SkE7QUFBQSxDQUFBLEk7QUNBQSxDQUFBLFlBQUE7QUFBQSxJQUNBLElBQUFFLE9BQUEsR0FBQWhFLFFBQUEsQ0FBQWlFLGdCQUFBLENBQUEsa0JBQUEsQ0FBQSxFQUNBQyxPQUFBLEdBQUFsRSxRQUFBLENBQUFDLHNCQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLENBREEsRUFFQW9ELENBRkEsQ0FEQTtBQUFBLElBS0EsU0FBQWMsV0FBQSxDQUFBQyxNQUFBLEVBQUE7QUFBQSxRQUVBLElBQUFDLE9BQUEsR0FBQXJFLFFBQUEsQ0FBQXNFLGFBQUEsQ0FBQSw2QkFBQUYsTUFBQSxHQUFBLEdBQUEsQ0FBQSxDQUZBO0FBQUEsUUFHQSxJQUFBLENBQUFDLE9BQUE7QUFBQSxZQUFBLE9BQUEsS0FBQSxDQUhBO0FBQUEsUUFLQSxJQUFBQSxPQUFBLENBQUF4RCxTQUFBLENBQUFRLFFBQUEsQ0FBQSxnQkFBQSxDQUFBLEVBQUE7QUFBQSxZQUNBZ0QsT0FBQSxDQUFBeEQsU0FBQSxDQUFBRSxNQUFBLENBQUEsZ0JBQUEsRUFEQTtBQUFBLFlBRUEsSUFBQW1ELE9BQUE7QUFBQSxnQkFBQUEsT0FBQSxDQUFBckQsU0FBQSxDQUFBRSxNQUFBLENBQUEsd0JBQUEsRUFGQTtBQUFBLFNBQUEsTUFHQTtBQUFBLFlBQ0FzRCxPQUFBLENBQUF4RCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxnQkFBQSxFQURBO0FBQUEsWUFFQSxJQUFBb0QsT0FBQTtBQUFBLGdCQUFBQSxPQUFBLENBQUFyRCxTQUFBLENBQUFDLEdBQUEsQ0FBQSx3QkFBQSxFQUZBO0FBQUEsU0FSQTtBQUFBLEtBTEE7QUFBQSxJQW9CQSxLQUFBdUMsQ0FBQSxJQUFBVyxPQUFBLEVBQUE7QUFBQSxRQUVBLElBQUEsT0FBQUEsT0FBQSxDQUFBWCxDQUFBLEVBQUF6QyxnQkFBQSxLQUFBLFVBQUE7QUFBQSxZQUFBLFNBRkE7QUFBQSxRQUlBb0QsT0FBQSxDQUFBWCxDQUFBLEVBQUF6QyxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBSyxDQUFBLEVBQUE7QUFBQSxZQUVBQSxDQUFBLENBQUFzRCxjQUFBLEdBRkE7QUFBQSxZQUdBLElBQUFILE1BQUEsR0FBQSxLQUFBYixZQUFBLENBQUEsY0FBQSxDQUFBLENBSEE7QUFBQSxZQUlBWSxXQUFBLENBQUFDLE1BQUEsRUFKQTtBQUFBLFNBQUEsRUFKQTtBQUFBLEtBcEJBO0FBQUEsSUFrQ0EsSUFBQWxDLE1BQUEsQ0FBQXNDLFFBQUEsQ0FBQUMsSUFBQSxDQUFBQyxPQUFBLENBQUEsR0FBQSxFQUFBLEVBQUEsS0FBQSxPQUFBLEVBQUE7QUFBQSxRQUNBUCxXQUFBLENBQUEsTUFBQSxFQURBO0FBQUEsS0FsQ0E7QUFBQSxDQUFBLEk7QUNDQTtBQUFBLElBQUFRLFFBQUEsR0FBQTNFLFFBQUEsQ0FBQTRFLG9CQUFBLENBQUEsTUFBQSxDQUFBLEVBQ0FDLFNBQUEsR0FBQTdFLFFBQUEsQ0FBQUMsc0JBQUEsQ0FBQSxXQUFBLENBREEsRUFFQW9ELENBRkEsRUFHQXlCLEtBQUEsR0FBQSxZQUFBO0FBQUEsUUFFQSxJQUFBekIsQ0FBQSxFQUNBMEIsU0FBQSxHQUFBLENBREEsRUFFQUMsUUFBQSxHQUFBLFdBRkEsRUFHQUMsZUFBQSxHQUFBLG1CQUhBLEVBSUFDLFlBQUEsR0FBQSxtQkFKQSxFQUtBQyxXQUFBLEdBQUE7QUFBQSxnQkFDQSxZQUFBLG1CQURBO0FBQUEsZ0JBRUEsV0FBQSx3Q0FGQTtBQUFBLGFBTEEsRUFTQUMsaUJBQUEsR0FBQSxRQVRBLENBRkE7QUFBQSxRQWFBLE9BQUE7QUFBQSxZQUVBQyxPQUFBLEVBQUEsVUFBQW5FLE9BQUEsRUFBQW9FLE9BQUEsRUFBQTtBQUFBLGdCQUNBLElBQUE5RCxTQUFBLEdBQUFOLE9BQUEsQ0FBQXFFLElBQUEsS0FBQSxPQUFBLEdBQUFyRSxPQUFBLENBQUFaLFVBQUEsQ0FBQUEsVUFBQSxDQUFBQSxVQUFBLEdBQUFZLE9BQUEsQ0FBQVosVUFBQSxFQUNBa0YsR0FBQSxHQUFBaEUsU0FBQSxDQUFBdkIsc0JBQUEsQ0FBQStFLFFBQUEsRUFBQSxDQUFBLENBREEsRUFFQVMsZ0JBQUEsR0FBQVAsWUFBQSxHQUFBLEdBQUEsR0FBQUksT0FGQSxFQUdBSSxPQUhBLENBREE7QUFBQSxnQkFNQSxJQUFBLENBQUFGLEdBQUEsRUFBQTtBQUFBLG9CQUNBLElBQUFBLEdBQUEsR0FBQXhGLFFBQUEsQ0FBQTJGLGFBQUEsQ0FBQSxNQUFBLENBQUEsQ0FEQTtBQUFBLG9CQUVBSCxHQUFBLENBQUEzRSxTQUFBLENBQUFDLEdBQUEsQ0FBQWtFLFFBQUEsRUFGQTtBQUFBLG9CQUdBeEQsU0FBQSxDQUFBb0UsV0FBQSxDQUFBSixHQUFBLEVBSEE7QUFBQSxpQkFOQTtBQUFBLGdCQVlBRSxPQUFBLEdBQUFGLEdBQUEsQ0FBQXZGLHNCQUFBLENBQUF3RixnQkFBQSxFQUFBLENBQUEsQ0FBQSxDQVpBO0FBQUEsZ0JBY0EsSUFBQSxDQUFBQyxPQUFBLEVBQUE7QUFBQSxvQkFDQUEsT0FBQSxHQUFBMUYsUUFBQSxDQUFBMkYsYUFBQSxDQUFBLE1BQUEsQ0FBQSxDQURBO0FBQUEsb0JBRUFELE9BQUEsQ0FBQTdFLFNBQUEsQ0FBQUMsR0FBQSxDQUFBb0UsWUFBQSxFQUZBO0FBQUEsb0JBR0FRLE9BQUEsQ0FBQTdFLFNBQUEsQ0FBQUMsR0FBQSxDQUFBMkUsZ0JBQUEsRUFIQTtBQUFBLG9CQUlBQyxPQUFBLENBQUFHLFNBQUEsR0FBQVYsV0FBQSxDQUFBRyxPQUFBLENBQUEsQ0FKQTtBQUFBLG9CQU1BRSxHQUFBLENBQUFJLFdBQUEsQ0FBQUYsT0FBQSxFQU5BO0FBQUEsaUJBZEE7QUFBQSxnQkF1QkFGLEdBQUEsQ0FBQTNFLFNBQUEsQ0FBQUMsR0FBQSxDQUFBbUUsZUFBQSxFQXZCQTtBQUFBLGFBRkE7QUFBQSxZQTRCQWEsT0FBQSxFQUFBLFVBQUE1RSxPQUFBLEVBQUFvRSxPQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBOUQsU0FBQSxHQUFBTixPQUFBLENBQUFxRSxJQUFBLEtBQUEsT0FBQSxHQUFBckUsT0FBQSxDQUFBWixVQUFBLENBQUFBLFVBQUEsQ0FBQUEsVUFBQSxHQUFBWSxPQUFBLENBQUFaLFVBQUEsRUFDQWtGLEdBQUEsR0FBQWhFLFNBQUEsQ0FBQXZCLHNCQUFBLENBQUErRSxRQUFBLEVBQUEsQ0FBQSxDQURBLEVBRUFTLGdCQUFBLEdBQUFQLFlBQUEsR0FBQSxHQUFBLEdBQUFJLE9BRkEsRUFHQUksT0FIQSxDQURBO0FBQUEsZ0JBTUEsSUFBQSxDQUFBRixHQUFBO0FBQUEsb0JBQUEsT0FOQTtBQUFBLGdCQVFBRSxPQUFBLEdBQUFGLEdBQUEsQ0FBQXZGLHNCQUFBLENBQUF3RixnQkFBQSxFQUFBLENBQUEsQ0FBQSxDQVJBO0FBQUEsZ0JBVUEsSUFBQUMsT0FBQSxFQUFBO0FBQUEsb0JBQ0FGLEdBQUEsQ0FBQU8sV0FBQSxDQUFBTCxPQUFBLEVBREE7QUFBQSxpQkFWQTtBQUFBLGdCQWNBLElBQUEsQ0FBQUYsR0FBQSxDQUFBdkYsc0JBQUEsQ0FBQWlGLFlBQUEsRUFBQTVCLE1BQUEsRUFBQTtBQUFBLG9CQUNBa0MsR0FBQSxDQUFBM0UsU0FBQSxDQUFBRSxNQUFBLENBQUFrRSxlQUFBLEVBREE7QUFBQSxpQkFkQTtBQUFBLGFBNUJBO0FBQUEsWUErQ0FlLFlBQUEsRUFBQSxZQUFBO0FBQUEsZ0JBQ0EsS0FBQW5GLFNBQUEsQ0FBQUUsTUFBQSxDQUFBcUUsaUJBQUEsRUFEQTtBQUFBLGFBL0NBO0FBQUEsWUFtREFhLFVBQUEsRUFBQSxVQUFBL0UsT0FBQSxFQUFBZ0YsSUFBQSxFQUFBWixPQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBWSxJQUFBLEVBQUE7QUFBQSxvQkFDQSxLQUFBYixPQUFBLENBQUFuRSxPQUFBLEVBQUFvRSxPQUFBLEVBREE7QUFBQSxvQkFFQSxPQUFBLEtBQUEsQ0FGQTtBQUFBLGlCQUFBLE1BR0E7QUFBQSxvQkFDQSxLQUFBUSxPQUFBLENBQUE1RSxPQUFBLEVBQUFvRSxPQUFBLEVBREE7QUFBQSxvQkFFQSxPQUFBLElBQUEsQ0FGQTtBQUFBLGlCQUpBO0FBQUEsYUFuREE7QUFBQSxZQTZEQWEsYUFBQSxFQUFBLFVBQUFqRixPQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBb0UsT0FBQSxHQUFBLFVBQUEsRUFDQVksSUFEQSxDQURBO0FBQUEsZ0JBSUEsUUFBQWhGLE9BQUEsQ0FBQXFFLElBQUE7QUFBQSxnQkFDQSxLQUFBLFVBQUE7QUFBQSxvQkFDQVcsSUFBQSxHQUFBaEYsT0FBQSxDQUFBa0YsUUFBQSxJQUFBLENBQUFsRixPQUFBLENBQUFtRixPQUFBLENBREE7QUFBQSxvQkFFQSxNQUhBO0FBQUEsZ0JBSUEsS0FBQSxPQUFBO0FBQUEsb0JBQ0FILElBQUEsR0FBQWhGLE9BQUEsQ0FBQWtGLFFBQUEsSUFBQSxDQUFBbEYsT0FBQSxDQUFBbUYsT0FBQSxDQURBO0FBQUEsb0JBRUEsSUFBQSxDQUFBbkYsT0FBQSxDQUFBa0YsUUFBQTtBQUFBLHdCQUFBLE9BQUEsSUFBQSxDQUZBO0FBQUEsb0JBR0EsTUFQQTtBQUFBLGdCQVFBO0FBQUEsb0JBQ0FGLElBQUEsR0FBQWhGLE9BQUEsQ0FBQWtGLFFBQUEsSUFBQWxGLE9BQUEsQ0FBQW9GLEtBQUEsQ0FBQWhELE1BQUEsR0FBQSxDQUFBLENBREE7QUFBQSxvQkFFQSxNQVZBO0FBQUEsaUJBSkE7QUFBQSxnQkFpQkEsT0FBQSxLQUFBMkMsVUFBQSxDQUFBL0UsT0FBQSxFQUFBZ0YsSUFBQSxFQUFBWixPQUFBLENBQUEsQ0FqQkE7QUFBQSxhQTdEQTtBQUFBLFlBaUZBaUIsWUFBQSxFQUFBLFVBQUFyRixPQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBLENBQUFBLE9BQUEsQ0FBQW9GLEtBQUE7QUFBQSxvQkFBQSxPQUFBLElBQUEsQ0FEQTtBQUFBLGdCQUdBLElBQUFoQixPQUFBLEdBQUEsU0FBQSxFQUNBWSxJQUFBLEdBQUFoRixPQUFBLENBQUEwQyxPQUFBLElBQUEsQ0FBQTFDLE9BQUEsQ0FBQW9GLEtBQUEsQ0FBQTlDLEtBQUEsQ0FBQSxJQUFBSyxNQUFBLENBQUEzQyxPQUFBLENBQUEwQyxPQUFBLEVBQUEsR0FBQSxDQUFBLENBREEsQ0FIQTtBQUFBLGdCQU1BLE9BQUEsS0FBQXFDLFVBQUEsQ0FBQS9FLE9BQUEsRUFBQWdGLElBQUEsRUFBQVosT0FBQSxDQUFBLENBTkE7QUFBQSxhQWpGQTtBQUFBLFlBMEZBa0IsZUFBQSxFQUFBLFVBQUF0RixPQUFBLEVBQUF1RixZQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBQyxjQUFBLEdBQUEsSUFBQSxDQURBO0FBQUEsZ0JBRUEsSUFBQSxDQUFBLEtBQUFQLGFBQUEsQ0FBQWpGLE9BQUEsQ0FBQTtBQUFBLG9CQUFBd0YsY0FBQSxHQUFBLEtBQUEsQ0FGQTtBQUFBLGdCQUdBLElBQUEsQ0FBQSxLQUFBSCxZQUFBLENBQUFyRixPQUFBLENBQUE7QUFBQSxvQkFBQXdGLGNBQUEsR0FBQSxLQUFBLENBSEE7QUFBQSxnQkFLQSxJQUFBRCxZQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBLENBQUFDLGNBQUE7QUFBQSx3QkFBQXhGLE9BQUEsQ0FBQUwsU0FBQSxDQUFBQyxHQUFBLENBQUFzRSxpQkFBQSxFQUFBO0FBQUE7QUFBQSx3QkFDQWxFLE9BQUEsQ0FBQUwsU0FBQSxDQUFBRSxNQUFBLENBQUFxRSxpQkFBQSxFQUZBO0FBQUEsaUJBTEE7QUFBQSxnQkFVQSxPQUFBc0IsY0FBQSxDQVZBO0FBQUEsYUExRkE7QUFBQSxZQXVHQUMsWUFBQSxFQUFBLFVBQUFDLElBQUEsRUFBQTtBQUFBLGdCQUNBLElBQUFDLEtBQUEsR0FBQUQsSUFBQSxDQUFBaEMsb0JBQUEsQ0FBQSxPQUFBLENBQUEsRUFDQWtDLFFBQUEsR0FBQUYsSUFBQSxDQUFBaEMsb0JBQUEsQ0FBQSxVQUFBLENBREEsRUFFQW1DLFFBQUEsR0FBQSxFQUZBLEVBR0FDLFdBQUEsR0FBQSxJQUhBLEVBSUFyRyxLQUFBLEdBQUEsSUFKQSxDQURBO0FBQUEsZ0JBT0EsS0FBQTBDLENBQUEsR0FBQSxDQUFBLEVBQUFBLENBQUEsR0FBQXdELEtBQUEsQ0FBQXZELE1BQUEsRUFBQUQsQ0FBQSxFQUFBO0FBQUEsb0JBQUEwRCxRQUFBLEdBQUFBLFFBQUEsQ0FBQUUsTUFBQSxDQUFBSixLQUFBLENBQUF4RCxDQUFBLENBQUEsQ0FBQSxDQVBBO0FBQUEsZ0JBUUEsS0FBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBeUQsUUFBQSxDQUFBeEQsTUFBQSxFQUFBRCxDQUFBLEVBQUE7QUFBQSxvQkFBQTBELFFBQUEsR0FBQUEsUUFBQSxDQUFBRSxNQUFBLENBQUFILFFBQUEsQ0FBQXpELENBQUEsQ0FBQSxDQUFBLENBUkE7QUFBQSxnQkFVQSxLQUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUEwRCxRQUFBLENBQUF6RCxNQUFBLEVBQUFELENBQUEsRUFBQSxFQUFBO0FBQUEsb0JBRUEsSUFBQTZELGlCQUFBLEdBQUF2RyxLQUFBLENBQUE2RixlQUFBLENBQUFPLFFBQUEsQ0FBQTFELENBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQSxDQUZBO0FBQUEsb0JBR0EyRCxXQUFBLEdBQUFBLFdBQUEsR0FBQUUsaUJBQUEsR0FBQUYsV0FBQSxDQUhBO0FBQUEsb0JBS0FELFFBQUEsQ0FBQTFELENBQUEsRUFBQThELE9BQUEsR0FBQUosUUFBQSxDQUFBMUQsQ0FBQSxFQUFBK0QsT0FBQSxHQUFBTCxRQUFBLENBQUExRCxDQUFBLEVBQUFnRSxPQUFBLEdBQUEsWUFBQTtBQUFBLHdCQUNBMUcsS0FBQSxDQUFBNkYsZUFBQSxDQUFBLElBQUEsRUFEQTtBQUFBLHFCQUFBLENBTEE7QUFBQSxvQkFRQU8sUUFBQSxDQUFBMUQsQ0FBQSxFQUFBaUUsZ0JBQUEsR0FBQSxVQUFBckcsQ0FBQSxFQUFBO0FBQUEsd0JBQ0EsSUFBQUEsQ0FBQSxDQUFBc0csWUFBQSxJQUFBLE9BQUE7QUFBQSw0QkFBQTVHLEtBQUEsQ0FBQTZGLGVBQUEsQ0FBQSxJQUFBLEVBREE7QUFBQSxxQkFBQSxDQVJBO0FBQUEsb0JBV0FPLFFBQUEsQ0FBQTFELENBQUEsRUFBQW1FLEtBQUEsR0FBQSxZQUFBO0FBQUEsd0JBQ0FDLFVBQUEsQ0FBQTlHLEtBQUEsQ0FBQTZGLGVBQUEsQ0FBQU8sUUFBQSxDQUFBMUQsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBREE7QUFBQSxxQkFBQSxDQVhBO0FBQUEsb0JBZUEwRCxRQUFBLENBQUExRCxDQUFBLEVBQUF6QyxnQkFBQSxDQUFBLE9BQUEsRUFBQUQsS0FBQSxDQUFBcUYsWUFBQSxFQWZBO0FBQUEsb0JBZ0JBZSxRQUFBLENBQUExRCxDQUFBLEVBQUF6QyxnQkFBQSxDQUFBLE9BQUEsRUFBQUQsS0FBQSxDQUFBcUYsWUFBQSxFQWhCQTtBQUFBLGlCQVZBO0FBQUEsZ0JBOEJBWSxJQUFBLENBQUFoRyxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBSyxDQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBeUcsSUFBQSxHQUFBZCxJQUFBLENBQUEzRyxzQkFBQSxDQUFBK0UsUUFBQSxDQUFBLENBREE7QUFBQSxvQkFFQSxLQUFBM0IsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBMEQsUUFBQSxDQUFBekQsTUFBQSxFQUFBRCxDQUFBLEVBQUEsRUFBQTtBQUFBLHdCQUNBMUMsS0FBQSxDQUFBcUYsWUFBQSxDQUFBakMsSUFBQSxDQUFBZ0QsUUFBQSxDQUFBMUQsQ0FBQSxDQUFBLElBREE7QUFBQSx3QkFFQTBELFFBQUEsQ0FBQTFELENBQUEsRUFBQThELE9BQUEsR0FBQUosUUFBQSxDQUFBMUQsQ0FBQSxFQUFBK0QsT0FBQSxHQUFBTCxRQUFBLENBQUExRCxDQUFBLEVBQUFnRSxPQUFBLEdBQUFOLFFBQUEsQ0FBQTFELENBQUEsRUFBQWlFLGdCQUFBLEdBQUFQLFFBQUEsQ0FBQTFELENBQUEsRUFBQW1FLEtBQUEsR0FBQSxJQUFBLENBRkE7QUFBQSxxQkFGQTtBQUFBLG9CQU1BLEtBQUFuRSxDQUFBLEdBQUFxRSxJQUFBLENBQUFwRSxNQUFBLEdBQUEsQ0FBQSxFQUFBRCxDQUFBLElBQUEsQ0FBQSxFQUFBQSxDQUFBLEVBQUEsRUFBQTtBQUFBLHdCQUNBcUUsSUFBQSxDQUFBckUsQ0FBQSxFQUFBL0MsVUFBQSxDQUFBeUYsV0FBQSxDQUFBMkIsSUFBQSxDQUFBckUsQ0FBQSxDQUFBLEVBREE7QUFBQSxxQkFOQTtBQUFBLGlCQUFBLEVBOUJBO0FBQUEsZ0JBeUNBLE9BQUEyRCxXQUFBLENBekNBO0FBQUEsYUF2R0E7QUFBQSxTQUFBLENBYkE7QUFBQSxLQUFBLEVBSEEsQztBQXVLQSxLQUFBM0QsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBc0IsUUFBQSxDQUFBckIsTUFBQSxFQUFBRCxDQUFBLEVBQUEsRUFBQTtBQUFBLElBQ0FzQixRQUFBLENBQUF0QixDQUFBLEVBQUFzRSxVQUFBLEdBQUEsSUFBQSxDQURBO0FBQUEsSUFFQWhELFFBQUEsQ0FBQXRCLENBQUEsRUFBQXVFLFFBQUEsR0FBQSxVQUFBM0csQ0FBQSxFQUFBO0FBQUEsUUFDQSxPQUFBNkQsS0FBQSxDQUFBNkIsWUFBQSxDQUFBLElBQUEsQ0FBQSxDQURBO0FBQUEsS0FBQSxDQUZBO0FBQUEsQztBQUtBLEM7QUFFQSxLQUFBdEQsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBd0IsU0FBQSxDQUFBdkIsTUFBQSxFQUFBRCxDQUFBLEVBQUEsRUFBQTtBQUFBLElBQ0F3QixTQUFBLENBQUF4QixDQUFBLEVBQUF1RSxRQUFBLEdBQUEsVUFBQTNHLENBQUEsRUFBQTtBQUFBLFFBQ0FBLENBQUEsQ0FBQXNELGNBQUEsR0FEQTtBQUFBLFFBRUEsSUFBQSxDQUFBTyxLQUFBLENBQUE2QixZQUFBLENBQUEsSUFBQSxDQUFBO0FBQUEsWUFBQSxPQUZBO0FBQUEsS0FBQSxDQURBO0FBQUEsQztBQUtBLEM7QUNwTEEsSUFBQWtCLEdBQUEsRUFDQUMsUUFBQSxHQUFBO0FBQUEsUUFDQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUE7QUFBQSxnQkFDQSxFQUNBLGNBQUEsSUFEQSxFQURBO0FBQUEsZ0JBSUEsRUFDQSxPQUFBLFNBREEsRUFKQTtBQUFBLGFBSEE7QUFBQSxTQURBO0FBQUEsUUFhQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLFVBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsS0FEQSxFQURBLENBSEE7QUFBQSxTQWJBO0FBQUEsUUFzQkE7QUFBQSxZQUNBLGVBQUEsS0FEQTtBQUFBLFlBRUEsZUFBQSxpQkFGQTtBQUFBLFlBR0EsV0FBQTtBQUFBLGdCQUNBLEVBQ0EsY0FBQSxJQURBLEVBREE7QUFBQSxnQkFJQSxFQUNBLE9BQUEsU0FEQSxFQUpBO0FBQUEsYUFIQTtBQUFBLFNBdEJBO0FBQUEsUUFrQ0E7QUFBQSxZQUNBLGVBQUEsZ0JBREE7QUFBQSxZQUVBLGVBQUEsa0JBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLFNBQUEsU0FEQSxFQURBLENBSEE7QUFBQSxTQWxDQTtBQUFBLFFBMkNBO0FBQUEsWUFDQSxlQUFBLHdCQURBO0FBQUEsWUFFQSxlQUFBLGtCQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxPQUFBLFNBREEsRUFEQSxDQUhBO0FBQUEsU0EzQ0E7QUFBQSxRQW9EQTtBQUFBLFlBQ0EsZUFBQSxXQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLFNBQUEsU0FEQSxFQURBLENBSEE7QUFBQSxTQXBEQTtBQUFBLFFBNkRBO0FBQUEsWUFDQSxlQUFBLDJCQURBO0FBQUEsWUFFQSxlQUFBLG9CQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxjQUFBLElBREEsRUFEQSxDQUhBO0FBQUEsU0E3REE7QUFBQSxRQXNFQTtBQUFBLFlBQ0EsZUFBQSxLQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsS0FEQSxFQURBLENBSEE7QUFBQSxTQXRFQTtBQUFBLFFBK0VBO0FBQUEsWUFDQSxlQUFBLE1BREE7QUFBQSxZQUVBLGVBQUEsS0FGQTtBQUFBLFlBR0EsV0FBQTtBQUFBLGdCQUNBLEVBQ0EsY0FBQSxDQUFBLEdBREEsRUFEQTtBQUFBLGdCQUlBLEVBQ0EsYUFBQSxFQURBLEVBSkE7QUFBQSxhQUhBO0FBQUEsU0EvRUE7QUFBQSxRQTJGQTtBQUFBLFlBQ0EsZUFBQSxjQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUEsQ0FDQSxFQUNBLGNBQUEsWUFEQSxFQURBLENBSEE7QUFBQSxTQTNGQTtBQUFBLFFBb0dBO0FBQUEsWUFDQSxlQUFBLGVBREE7QUFBQSxZQUVBLGVBQUEsYUFGQTtBQUFBLFlBR0EsV0FBQSxDQUNBLEVBQ0EsY0FBQSxLQURBLEVBREEsQ0FIQTtBQUFBLFNBcEdBO0FBQUEsUUE2R0E7QUFBQSxZQUNBLGVBQUEsU0FEQTtBQUFBLFlBRUEsZUFBQSxLQUZBO0FBQUEsWUFHQSxXQUFBLENBQ0EsRUFDQSxjQUFBLEtBREEsRUFEQSxDQUhBO0FBQUEsU0E3R0E7QUFBQSxRQXNIQTtBQUFBLFlBQ0EsZUFBQSxPQURBO0FBQUEsWUFFQSxlQUFBLEtBRkE7QUFBQSxZQUdBLFdBQUE7QUFBQSxnQkFDQSxFQUNBLFNBQUEsU0FEQSxFQURBO0FBQUEsZ0JBSUEsRUFDQSxjQUFBLElBREEsRUFKQTtBQUFBLGFBSEE7QUFBQSxTQXRIQTtBQUFBLEtBREEsQztBQXFJQSxTQUFBQyxPQUFBLEdBQUE7QUFBQSxJQUVBLElBQUEsQ0FBQS9ILFFBQUEsQ0FBQXlELGNBQUEsQ0FBQSxLQUFBLENBQUE7QUFBQSxRQUFBLE9BRkE7QUFBQSxJQUlBLElBQUF1RSxRQUFBLEdBQUE7QUFBQSxRQUFBQyxHQUFBLEVBQUEsU0FBQTtBQUFBLFFBQUFDLEdBQUEsRUFBQSxTQUFBO0FBQUEsS0FBQSxDQUpBO0FBQUEsSUFNQUwsR0FBQSxHQUFBLElBQUFNLE1BQUEsQ0FBQUMsSUFBQSxDQUFBQyxHQUFBLENBQUFySSxRQUFBLENBQUF5RCxjQUFBLENBQUEsS0FBQSxDQUFBLEVBQUE7QUFBQSxRQUNBNkUsTUFBQSxFQUFBTixRQURBO0FBQUEsUUFFQU8sSUFBQSxFQUFBLEVBRkE7QUFBQSxRQUdBQyxjQUFBLEVBQUEsS0FIQTtBQUFBLFFBSUFDLFVBQUEsRUFBQSxLQUpBO0FBQUEsUUFLQUMsV0FBQSxFQUFBLElBTEE7QUFBQSxRQU1BQyxrQkFBQSxFQUFBLEVBQ0FDLFFBQUEsRUFBQVQsTUFBQSxDQUFBQyxJQUFBLENBQUFTLGVBQUEsQ0FBQUMsWUFEQSxFQU5BO0FBQUEsUUFTQUMsaUJBQUEsRUFBQSxLQVRBO0FBQUEsUUFVQUMsU0FBQSxFQUFBYixNQUFBLENBQUFDLElBQUEsQ0FBQWEsU0FBQSxDQUFBQyxPQVZBO0FBQUEsUUFXQUMsV0FBQSxFQUFBLEtBWEE7QUFBQSxRQVlBQyxTQUFBLEVBQUEsQ0FBQSxpQkFBQXBKLFFBQUEsQ0FaQTtBQUFBLFFBYUFxSixNQUFBLEVBQUF2QixRQWJBO0FBQUEsS0FBQSxDQUFBLENBTkE7QUFBQSxJQXNCQSxJQUFBd0IsTUFBQSxHQUFBLElBQUFuQixNQUFBLENBQUFDLElBQUEsQ0FBQW1CLE1BQUEsQ0FBQTtBQUFBLFFBQ0FYLFFBQUEsRUFBQVosUUFEQTtBQUFBLFFBRUFILEdBQUEsRUFBQUEsR0FGQTtBQUFBLFFBR0EyQixLQUFBLEVBQUEsYUFIQTtBQUFBLEtBQUEsQ0FBQSxDQXRCQTtBQUFBLElBNEJBRixNQUFBLENBQUFHLE1BQUEsQ0FBQTVCLEdBQUEsRUE1QkE7QUFBQSxDO0FDcElBLENBQUEsWUFBQTtBQUFBLElBQ0EsSUFBQTZCLE9BQUEsR0FBQTFKLFFBQUEsQ0FBQWlFLGdCQUFBLENBQUEsV0FBQSxDQUFBLEVBQ0FaLENBREEsQ0FEQTtBQUFBLElBR0EsU0FBQUEsQ0FBQSxJQUFBcUcsT0FBQSxFQUFBO0FBQUEsUUFFQSxJQUFBLE9BQUFBLE9BQUEsQ0FBQXJHLENBQUEsRUFBQXpDLGdCQUFBLEtBQUEsVUFBQTtBQUFBLFlBQUEsU0FGQTtBQUFBLFFBSUE4SSxPQUFBLENBQUFyRyxDQUFBLEVBQUF6QyxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBSyxDQUFBLEVBQUE7QUFBQSxZQUNBQSxDQUFBLENBQUFzRCxjQUFBLEdBREE7QUFBQSxZQUVBLElBQUFvRixHQUFBLEdBQUEzSixRQUFBLENBQUFzRSxhQUFBLENBQUEsTUFBQSxDQUFBLENBRkE7QUFBQSxZQUdBLElBQUEsQ0FBQXFGLEdBQUE7QUFBQSxnQkFBQSxPQUFBLEtBQUEsQ0FIQTtBQUFBLFlBS0EsSUFBQSxDQUFBQSxHQUFBLENBQUE5SSxTQUFBLENBQUFRLFFBQUEsQ0FBQSxVQUFBLENBQUEsRUFBQTtBQUFBLGdCQUNBc0ksR0FBQSxDQUFBOUksU0FBQSxDQUFBQyxHQUFBLENBQUEsVUFBQSxFQURBO0FBQUEsZ0JBRUEsS0FBQUQsU0FBQSxDQUFBQyxHQUFBLENBQUEsZ0JBQUEsRUFGQTtBQUFBLGdCQUdBLEtBQUFELFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHFCQUFBLEVBSEE7QUFBQSxhQUFBLE1BSUE7QUFBQSxnQkFDQTZJLEdBQUEsQ0FBQTlJLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLFVBQUEsRUFEQTtBQUFBLGdCQUVBLEtBQUFGLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLGdCQUFBLEVBRkE7QUFBQSxnQkFHQSxLQUFBRixTQUFBLENBQUFFLE1BQUEsQ0FBQSxxQkFBQSxFQUhBO0FBQUEsYUFUQTtBQUFBLFNBQUEsRUFKQTtBQUFBLEtBSEE7QUFBQSxDQUFBLEk7QUNBQTtBQUFBLElBQUE2SSxJQUFBLEdBQUEsWUFBQTtBQUFBLElBQ0EsSUFBQUMsS0FBQSxHQUFBN0osUUFBQSxDQUFBQyxzQkFBQSxDQUFBLHFCQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQ0E2SixRQUFBLEdBQUE5SixRQUFBLENBQUFDLHNCQUFBLENBQUEsaUJBQUEsRUFBQSxDQUFBLENBREEsQ0FEQTtBQUFBLElBSUEsT0FBQTtBQUFBLFFBRUE2RCxJQUFBLEVBQUEsWUFBQTtBQUFBLFlBRUEsSUFBQSxDQUFBK0YsS0FBQSxJQUFBLENBQUFDLFFBQUE7QUFBQSxnQkFBQSxPQUZBO0FBQUEsWUFJQSxJQUFBQyxTQUFBLENBQUFDLFNBQUEsQ0FBQUMsT0FBQSxDQUFBLFNBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBO0FBQUEsZ0JBQ0FILFFBQUEsQ0FBQWpKLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHFCQUFBLEVBREE7QUFBQSxnQkFFQSxPQUZBO0FBQUEsYUFKQTtBQUFBLFlBU0EsSUFBQW9KLE9BQUEsR0FBQUwsS0FBQSxDQUFBakkscUJBQUEsR0FBQXVJLElBQUEsR0FBQUwsUUFBQSxDQUFBbEkscUJBQUEsR0FBQXVJLElBQUEsRUFDQUMsTUFBQSxHQUFBUCxLQUFBLENBQUFqSSxxQkFBQSxHQUFBVSxHQUFBLEdBQUF3SCxRQUFBLENBQUFsSSxxQkFBQSxHQUFBVSxHQURBLENBVEE7QUFBQSxZQVlBd0gsUUFBQSxDQUFBTyxLQUFBLENBQUFDLGtCQUFBLEdBQUFKLE9BQUEsR0FBQSxFQUFBLEdBQUEsS0FBQSxHQUFBLEdBQUEsR0FBQUUsTUFBQSxHQUFBLEVBQUEsR0FBQSxLQUFBLENBWkE7QUFBQSxZQWFBTixRQUFBLENBQUFPLEtBQUEsQ0FBQUUsY0FBQSxHQUFBVixLQUFBLENBQUFXLFdBQUEsR0FBQSxFQUFBLEdBQUEsS0FBQSxHQUFBLEdBQUEsR0FBQVgsS0FBQSxDQUFBL0csWUFBQSxHQUFBLEVBQUEsR0FBQSxLQUFBLENBYkE7QUFBQSxTQUZBO0FBQUEsS0FBQSxDQUpBO0FBQUEsQ0FBQSxFQUFBLEM7QUEyQkE4RyxJQUFBLENBQUE5RixJQUFBLEc7QUFDQTVCLE1BQUEsQ0FBQXRCLGdCQUFBLENBQUEsUUFBQSxFQUFBZ0osSUFBQSxDQUFBOUYsSUFBQSxDQUFBQyxJQUFBLENBQUE2RixJQUFBLENBQUEsRTtBQUNBMUgsTUFBQSxDQUFBdEIsZ0JBQUEsQ0FBQSxRQUFBLEVBQUFnSixJQUFBLENBQUE5RixJQUFBLENBQUFDLElBQUEsQ0FBQTZGLElBQUEsQ0FBQSxFO0FBR0E7QUFBQSxJQUFBYSxRQUFBLEdBQUEsWUFBQTtBQUFBLElBRUEsSUFBQVosS0FBQSxHQUFBN0osUUFBQSxDQUFBQyxzQkFBQSxDQUFBLHFCQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQ0F5SyxLQUFBLEdBQUExSyxRQUFBLENBQUFDLHNCQUFBLENBQUEsd0JBQUEsRUFBQSxDQUFBLENBREEsRUFFQTBLLEtBQUEsR0FBQTNLLFFBQUEsQ0FBQUMsc0JBQUEsQ0FBQSx3QkFBQSxFQUFBLENBQUEsQ0FGQSxFQUdBMkssS0FBQSxHQUFBNUssUUFBQSxDQUFBQyxzQkFBQSxDQUFBLHdCQUFBLEVBQUEsQ0FBQSxDQUhBLENBRkE7QUFBQSxJQU9BLE9BQUE7QUFBQSxRQUVBNEssSUFBQSxFQUFBLFVBQUEzSixPQUFBLEVBQUE0SixVQUFBLEVBQUFDLFNBQUEsRUFBQUMsV0FBQSxFQUFBO0FBQUEsWUFFQSxJQUFBL0ksU0FBQSxHQUFBQyxNQUFBLENBQUFDLFdBQUEsSUFBQW5DLFFBQUEsQ0FBQW9DLGVBQUEsQ0FBQUgsU0FBQSxFQUNBZ0osVUFBQSxHQUFBakwsUUFBQSxDQUFBb0MsZUFBQSxDQUFBOEksWUFEQSxFQUVBcEksWUFBQSxHQUFBOUMsUUFBQSxDQUFBb0MsZUFBQSxDQUFBVSxZQUZBLEVBRUFiLFNBRkEsRUFHQUssR0FBQSxHQUFBcEIsT0FBQSxDQUFBVSxxQkFBQSxHQUFBVSxHQUFBLEdBQUEsQ0FBQUosTUFBQSxDQUFBVyxXQUFBLElBQUFYLE1BQUEsQ0FBQWxCLElBQUEsQ0FBQThCLFlBQUEsSUFBQTlDLFFBQUEsQ0FBQW9DLGVBQUEsQ0FBQVUsWUFBQSxDQUhBLEVBSUFxSSxTQUpBLENBRkE7QUFBQSxZQVFBQSxTQUFBLEdBQUFMLFVBQUEsR0FBQSxnQkFBQSxDQUFBLENBQUE3SSxTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQUgsVUFBQSxHQUFBLElBQUEsR0FBQSxFQUFBLENBUkE7QUFBQSxZQVNBSyxTQUFBLElBQUFKLFNBQUEsR0FBQSxnQkFBQSxDQUFBLENBQUE5SSxTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQUYsU0FBQSxHQUFBLElBQUEsR0FBQSxFQUFBLENBVEE7QUFBQSxZQVVBSSxTQUFBLElBQUEsZUFBQSxDQVZBO0FBQUEsWUFXQUEsU0FBQSxJQUFBSCxXQUFBLEdBQUEsWUFBQSxDQUFBLENBQUEvSSxTQUFBLEdBQUFhLFlBQUEsQ0FBQSxHQUFBbUksVUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBRCxXQUFBLEdBQUEsR0FBQSxHQUFBLE1BQUEsR0FBQSxFQUFBLENBWEE7QUFBQSxZQWFBLElBQUFHLFNBQUEsS0FBQSxlQUFBLEVBQUE7QUFBQSxnQkFDQWpLLE9BQUEsQ0FBQW1KLEtBQUEsQ0FBQWUsTUFBQSxHQUFBLENBQUEsQ0FBQW5KLFNBQUEsR0FBQWEsWUFBQSxDQUFBLEdBQUFtSSxVQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsQ0FEQTtBQUFBLGdCQUVBLE9BRkE7QUFBQSxhQWJBO0FBQUEsWUFrQkEvSixPQUFBLENBQUFtSixLQUFBLENBQUFnQixlQUFBLEdBQUFGLFNBQUEsQ0FsQkE7QUFBQSxZQW1CQWpLLE9BQUEsQ0FBQW1KLEtBQUEsQ0FBQWlCLFlBQUEsR0FBQUgsU0FBQSxDQW5CQTtBQUFBLFlBb0JBakssT0FBQSxDQUFBbUosS0FBQSxDQUFBYyxTQUFBLEdBQUFBLFNBQUEsQ0FwQkE7QUFBQSxZQXFCQWpLLE9BQUEsQ0FBQW1KLEtBQUEsQ0FBQWtCLFdBQUEsR0FBQUosU0FBQSxDQXJCQTtBQUFBLFlBc0JBakssT0FBQSxDQUFBbUosS0FBQSxDQUFBbUIsVUFBQSxHQUFBTCxTQUFBLENBdEJBO0FBQUEsU0FGQTtBQUFBLFFBNEJBckgsSUFBQSxFQUFBLFlBQUE7QUFBQSxZQUVBLElBQUE0RyxLQUFBO0FBQUEsZ0JBQUEsS0FBQUcsSUFBQSxDQUFBSCxLQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBRkE7QUFBQSxZQUdBLElBQUFDLEtBQUE7QUFBQSxnQkFBQSxLQUFBRSxJQUFBLENBQUFGLEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFIQTtBQUFBLFlBSUEsSUFBQUMsS0FBQTtBQUFBLGdCQUFBLEtBQUFDLElBQUEsQ0FBQUQsS0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUpBO0FBQUEsWUFLQSxJQUFBZixLQUFBO0FBQUEsZ0JBQUEsS0FBQWdCLElBQUEsQ0FBQWhCLEtBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFMQTtBQUFBLFNBNUJBO0FBQUEsS0FBQSxDQVBBO0FBQUEsQ0FBQSxFQUFBLEM7QUFnREEzSCxNQUFBLENBQUF0QixnQkFBQSxDQUFBLFFBQUEsRUFBQTZKLFFBQUEsQ0FBQTNHLElBQUEsQ0FBQUMsSUFBQSxDQUFBMEcsUUFBQSxDQUFBLEU7QUNqRkEsQ0FBQSxZQUFBO0FBQUEsSUFJQTtBQUFBO0FBQUEsSUFBQXZJLE1BQUEsQ0FBQXVKLGdCQUFBLEdBQUEsWUFBQTtBQUFBLFFBQ0EsT0FBQXZKLE1BQUEsQ0FBQXdKLHFCQUFBLElBQ0F4SixNQUFBLENBQUF5SiwyQkFEQSxJQUVBekosTUFBQSxDQUFBMEosd0JBRkEsSUFHQSxVQUFBQyxRQUFBLEVBQUE7QUFBQSxZQUNBM0osTUFBQSxDQUFBdUYsVUFBQSxDQUFBb0UsUUFBQSxFQUFBLE9BQUEsRUFBQSxFQURBO0FBQUEsU0FIQSxDQURBO0FBQUEsS0FBQSxFQUFBLENBSkE7QUFBQSxJQWNBO0FBQUEsYUFBQUMsU0FBQSxDQUFBQyxhQUFBLEVBQUFDLEtBQUEsRUFBQUMsTUFBQSxFQUFBO0FBQUEsUUFLQTtBQUFBO0FBQUE7QUFBQSxZQUFBQyxPQUFBLEdBQUFoSyxNQUFBLENBQUFnSyxPQUFBLEVBQ0FILGFBQUEsR0FBQUEsYUFBQSxJQUFBLENBREEsRUFFQUMsS0FBQSxHQUFBQSxLQUFBLElBQUEsSUFGQSxFQUdBQyxNQUFBLEdBQUFBLE1BQUEsSUFBQSxhQUhBLEVBSUFFLFdBQUEsR0FBQSxDQUpBLENBTEE7QUFBQSxRQVlBO0FBQUEsWUFBQUMsSUFBQSxHQUFBMUksSUFBQSxDQUFBMkksR0FBQSxDQUFBLEdBQUEsRUFBQTNJLElBQUEsQ0FBQTRJLEdBQUEsQ0FBQTVJLElBQUEsQ0FBQUMsR0FBQSxDQUFBdUksT0FBQSxHQUFBSCxhQUFBLElBQUFDLEtBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQVpBO0FBQUEsUUFlQTtBQUFBLFlBQUFPLEtBQUEsR0FBQTdJLElBQUEsQ0FBQThJLEVBQUEsR0FBQSxDQUFBLEVBQ0FDLGVBQUEsR0FBQTtBQUFBLGdCQUNBQyxXQUFBLEVBQUEsVUFBQUMsR0FBQSxFQUFBO0FBQUEsb0JBQ0EsT0FBQWpKLElBQUEsQ0FBQWtKLEdBQUEsQ0FBQUQsR0FBQSxHQUFBLENBQUFqSixJQUFBLENBQUE4SSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLGlCQURBO0FBQUEsZ0JBSUFLLGFBQUEsRUFBQSxVQUFBRixHQUFBLEVBQUE7QUFBQSxvQkFDQSxPQUFBLENBQUEsR0FBQSxHQUFBLENBQUFqSixJQUFBLENBQUFvSixHQUFBLENBQUFwSixJQUFBLENBQUE4SSxFQUFBLEdBQUFHLEdBQUEsSUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLGlCQUpBO0FBQUEsZ0JBT0FJLGNBQUEsRUFBQSxVQUFBSixHQUFBLEVBQUE7QUFBQSxvQkFDQSxJQUFBLENBQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSx3QkFDQSxPQUFBLE1BQUFqSixJQUFBLENBQUFzSixHQUFBLENBQUFMLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLHFCQURBO0FBQUEsb0JBSUEsT0FBQSxNQUFBLENBQUFqSixJQUFBLENBQUFzSixHQUFBLENBQUFMLEdBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUpBO0FBQUEsaUJBUEE7QUFBQSxhQURBLENBZkE7QUFBQSxRQWdDQTtBQUFBLGlCQUFBTSxJQUFBLEdBQUE7QUFBQSxZQUNBZCxXQUFBLElBQUEsSUFBQSxFQUFBLENBREE7QUFBQSxZQUdBLElBQUFlLENBQUEsR0FBQWYsV0FBQSxHQUFBQyxJQUFBLENBSEE7QUFBQSxZQUlBLElBQUFlLENBQUEsR0FBQVYsZUFBQSxDQUFBUixNQUFBLEVBQUFpQixDQUFBLENBQUEsQ0FKQTtBQUFBLFlBTUEsSUFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUFBLGdCQUNBekIsZ0JBQUEsQ0FBQXdCLElBQUEsRUFEQTtBQUFBLGdCQUVBL0ssTUFBQSxDQUFBa0wsUUFBQSxDQUFBLENBQUEsRUFBQWxCLE9BQUEsR0FBQSxDQUFBSCxhQUFBLEdBQUFHLE9BQUEsQ0FBQSxHQUFBaUIsQ0FBQSxFQUZBO0FBQUEsYUFBQSxNQUdBO0FBQUEsZ0JBRUE7QUFBQSxnQkFBQWpMLE1BQUEsQ0FBQWtMLFFBQUEsQ0FBQSxDQUFBLEVBQUFyQixhQUFBLEVBRkE7QUFBQSxhQVRBO0FBQUEsU0FoQ0E7QUFBQSxRQWdEQTtBQUFBLFFBQUFrQixJQUFBLEdBaERBO0FBQUEsS0FkQTtBQUFBLElBaUVBLElBQUFJLElBQUEsR0FBQXJOLFFBQUEsQ0FBQWlFLGdCQUFBLENBQUEsYUFBQSxDQUFBLEVBQ0ErSCxLQUFBLEdBQUEsR0FEQSxDQWpFQTtBQUFBLElBb0VBLFNBQUFzQix3QkFBQSxDQUFBcE0sT0FBQSxFQUFBO0FBQUEsUUFFQSxJQUFBLENBQUFBLE9BQUE7QUFBQSxZQUFBLE9BRkE7QUFBQSxRQUdBLElBQUFlLFNBQUEsR0FBQUMsTUFBQSxDQUFBQyxXQUFBLElBQUFuQyxRQUFBLENBQUFvQyxlQUFBLENBQUFILFNBQUEsRUFDQXNMLFNBQUEsR0FBQXJNLE9BQUEsQ0FBQXNNLElBQUEsQ0FBQWhLLEtBQUEsQ0FBQSxRQUFBLENBREEsRUFFQWlLLGFBRkEsQ0FIQTtBQUFBLFFBT0FBLGFBQUEsR0FBQXpOLFFBQUEsQ0FBQXlELGNBQUEsQ0FBQThKLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQVBBO0FBQUEsUUFTQSxPQUFBRSxhQUFBLEdBQUF4TCxTQUFBLEdBQUF3TCxhQUFBLENBQUE3TCxxQkFBQSxHQUFBVSxHQUFBLEdBQUEsQ0FBQSxDQVRBO0FBQUEsS0FwRUE7QUFBQSxJQWlGQSxTQUFBZSxDQUFBLElBQUFnSyxJQUFBLEVBQUE7QUFBQSxRQUVBLElBQUEsT0FBQUEsSUFBQSxDQUFBaEssQ0FBQSxDQUFBLElBQUEsUUFBQTtBQUFBLFlBQUEsT0FGQTtBQUFBLFFBSUFnSyxJQUFBLENBQUFoSyxDQUFBLEVBQUF6QyxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBSyxDQUFBLEVBQUE7QUFBQSxZQUVBQSxDQUFBLENBQUFzRCxjQUFBLEdBRkE7QUFBQSxZQUlBLElBQUE2SSxRQUFBLEdBQUFFLHdCQUFBLENBQUEsSUFBQSxDQUFBLEVBQ0FJLEtBQUEsR0FBQSxJQURBLENBSkE7QUFBQSxZQU9BNUIsU0FBQSxDQUFBc0IsUUFBQSxFQUFBLElBQUEsRUFQQTtBQUFBLFNBQUEsRUFKQTtBQUFBLEtBakZBO0FBQUEsQ0FBQSxJO0FDQ0E7QUFBQSxJQUFBTyxTQUFBLEdBQUEsWUFBQTtBQUFBLElBRUEsSUFBQTVHLFFBQUEsR0FBQS9HLFFBQUEsQ0FBQTRFLG9CQUFBLENBQUEsR0FBQSxDQUFBLEVBQ0FnSixTQURBLEVBRUFDLElBQUEsR0FBQTdOLFFBQUEsQ0FBQTRFLG9CQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsQ0FGQSxFQUlBK0ksU0FBQSxHQUFBM04sUUFBQSxDQUFBQyxzQkFBQSxDQUFBLFdBQUEsRUFBQSxDQUFBLENBSkEsRUFLQTZOLGlCQUFBLEdBQUE5TixRQUFBLENBQUFDLHNCQUFBLENBQUEsMEJBQUEsRUFBQSxDQUFBLENBTEEsRUFNQThOLEtBTkEsQ0FGQTtBQUFBLElBVUEsSUFBQSxDQUFBSixTQUFBLElBQUEsQ0FBQUcsaUJBQUE7QUFBQSxRQUFBLE9BVkE7QUFBQSxJQVlBRCxJQUFBLENBQUFoTixTQUFBLENBQUFFLE1BQUEsQ0FBQSxTQUFBLEVBWkE7QUFBQSxJQWNBLE9BQUE7QUFBQSxRQUVBaU4sV0FBQSxFQUFBLENBRkE7QUFBQSxRQUlBQyxjQUFBLEVBQUEsQ0FKQTtBQUFBLFFBTUFDLE9BQUEsRUFBQSxZQUFBO0FBQUEsWUFFQSxJQUFBQyxJQUFBLEdBQUEsRUFBQSxDQUZBO0FBQUEsWUFJQSxTQUFBOUssQ0FBQSxJQUFBMEQsUUFBQSxFQUFBO0FBQUEsZ0JBQ0EsSUFBQSxPQUFBQSxRQUFBLENBQUExRCxDQUFBLENBQUEsS0FBQSxRQUFBO0FBQUEsb0JBQUEsU0FEQTtBQUFBLGdCQUdBLElBQUErSyxNQUFBLEdBQUEsSUFBQSxDQUhBO0FBQUEsZ0JBS0EsUUFBQXJILFFBQUEsQ0FBQTFELENBQUEsRUFBQWdMLFFBQUE7QUFBQSxnQkFDQSxLQUFBLEtBQUE7QUFBQSxvQkFDQUQsTUFBQSxHQUFBckgsUUFBQSxDQUFBMUQsQ0FBQSxFQUFBRSxZQUFBLENBQUEsS0FBQSxDQUFBLENBREE7QUFBQSxvQkFFQSxNQUhBO0FBQUEsZ0JBV0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUNBLElBQUEsQ0FBQXdELFFBQUEsQ0FBQTFELENBQUEsRUFBQWdMLFFBQUE7QUFBQSx3QkFBQSxNQURBO0FBQUEsb0JBRUEsSUFBQXhFLEtBQUEsR0FBQXJILGdCQUFBLENBQUF1RSxRQUFBLENBQUExRCxDQUFBLENBQUEsRUFBQWlMLGVBQUEsQ0FGQTtBQUFBLG9CQUdBLElBQUF6RSxLQUFBLElBQUEsTUFBQSxFQUFBO0FBQUEsd0JBQ0FBLEtBQUEsR0FBQUEsS0FBQSxDQUFBckcsS0FBQSxDQUFBLGNBQUEsQ0FBQSxDQURBO0FBQUEsd0JBRUFxRyxLQUFBLEdBQUFBLEtBQUEsS0FBQSxJQUFBLEdBQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUFuRixPQUFBLENBQUEsUUFBQSxFQUFBLEVBQUEsQ0FBQSxHQUFBLElBQUEsQ0FGQTtBQUFBLHdCQUdBMEosTUFBQSxHQUFBdkUsS0FBQSxDQUhBO0FBQUEscUJBZEE7QUFBQSxpQkFMQTtBQUFBLGdCQTBCQSxJQUFBdUUsTUFBQSxLQUFBLElBQUEsSUFBQUEsTUFBQSxJQUFBLE1BQUEsSUFBQUQsSUFBQSxDQUFBbEUsT0FBQSxDQUFBbUUsTUFBQSxLQUFBLENBQUEsQ0FBQTtBQUFBLG9CQUFBRCxJQUFBLENBQUFJLElBQUEsQ0FBQUgsTUFBQSxFQTFCQTtBQUFBLGFBSkE7QUFBQSxZQWlDQSxPQUFBRCxJQUFBLENBakNBO0FBQUEsU0FOQTtBQUFBLFFBMkNBSyxRQUFBLEVBQUEsWUFBQTtBQUFBLFlBRUEsSUFBQUwsSUFBQSxHQUFBLEtBQUFELE9BQUEsRUFBQSxFQUNBTixTQUFBLEdBQUFPLElBQUEsQ0FBQTdLLE1BREEsRUFFQTNDLEtBQUEsR0FBQSxJQUZBLENBRkE7QUFBQSxZQU1BLEtBQUEwQyxDQUFBLElBQUE4SyxJQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBTSxHQUFBLEdBQUEsSUFBQUMsS0FBQSxFQUFBLENBREE7QUFBQSxnQkFFQUQsR0FBQSxDQUFBRSxHQUFBLEdBQUFSLElBQUEsQ0FBQTlLLENBQUEsQ0FBQSxDQUZBO0FBQUEsZ0JBR0FvTCxHQUFBLENBQUFHLE1BQUEsR0FBQSxZQUFBO0FBQUEsb0JBQ0FqTyxLQUFBLENBQUFxTixXQUFBLEdBREE7QUFBQSxvQkFFQXJOLEtBQUEsQ0FBQWtPLFdBQUEsQ0FBQWxPLEtBQUEsQ0FBQXFOLFdBQUEsRUFBQUosU0FBQSxFQUZBO0FBQUEsb0JBR0FrQixPQUFBLENBQUFDLEdBQUEsQ0FBQSxLQUFBSixHQUFBLEdBQUEsWUFBQSxFQUhBO0FBQUEsaUJBQUEsQ0FIQTtBQUFBLGdCQVFBRixHQUFBLENBQUFPLE9BQUEsR0FBQSxZQUFBO0FBQUEsb0JBQ0FyTyxLQUFBLENBQUFxTixXQUFBLEdBREE7QUFBQSxvQkFFQXJOLEtBQUEsQ0FBQWtPLFdBQUEsQ0FBQWxPLEtBQUEsQ0FBQXFOLFdBQUEsRUFBQUosU0FBQSxFQUZBO0FBQUEsaUJBQUEsQ0FSQTtBQUFBLGFBTkE7QUFBQSxTQTNDQTtBQUFBLFFBaUVBaUIsV0FBQSxFQUFBLFVBQUFiLFdBQUEsRUFBQUosU0FBQSxFQUFBO0FBQUEsWUFDQSxJQUFBcUIsUUFBQSxHQUFBdkwsSUFBQSxDQUFBd0wsSUFBQSxDQUFBbEIsV0FBQSxHQUFBSixTQUFBLEdBQUEsR0FBQSxDQUFBLEVBQ0FqTixLQUFBLEdBQUEsSUFEQSxDQURBO0FBQUEsWUFJQXdPLGFBQUEsQ0FBQXBCLEtBQUEsRUFKQTtBQUFBLFlBS0FELGlCQUFBLENBQUFzQixXQUFBLEdBQUEsS0FBQW5CLGNBQUEsQ0FMQTtBQUFBLFlBT0EsSUFBQWdCLFFBQUEsSUFBQSxHQUFBLEVBQUE7QUFBQSxnQkFDQW5CLGlCQUFBLENBQUFzQixXQUFBLEdBQUEsS0FBQW5CLGNBQUEsR0FBQSxHQUFBLENBREE7QUFBQSxnQkFHQSxJQUFBTixTQUFBLEVBQUE7QUFBQSxvQkFDQUEsU0FBQSxDQUFBOU0sU0FBQSxDQUFBQyxHQUFBLENBQUEsa0JBQUEsRUFEQTtBQUFBLG9CQUVBK00sSUFBQSxDQUFBaE4sU0FBQSxDQUFBRSxNQUFBLENBQUEsT0FBQSxFQUZBO0FBQUEsb0JBR0E4TSxJQUFBLENBQUFoTixTQUFBLENBQUFDLEdBQUEsQ0FBQSxTQUFBLEVBSEE7QUFBQSxpQkFIQTtBQUFBLGFBQUEsTUFTQTtBQUFBLGdCQUVBaU4sS0FBQSxHQUFBc0IsV0FBQSxDQUFBLFlBQUE7QUFBQSxvQkFFQXZCLGlCQUFBLENBQUFzQixXQUFBLEdBQUF6TyxLQUFBLENBQUFzTixjQUFBLENBRkE7QUFBQSxvQkFHQXROLEtBQUEsQ0FBQXNOLGNBQUEsR0FIQTtBQUFBLG9CQUtBLElBQUF0TixLQUFBLENBQUFzTixjQUFBLElBQUFnQixRQUFBLEVBQUE7QUFBQSx3QkFDQUUsYUFBQSxDQUFBcEIsS0FBQSxFQURBO0FBQUEscUJBTEE7QUFBQSxpQkFBQSxFQVFBLEVBUkEsQ0FBQSxDQUZBO0FBQUEsYUFoQkE7QUFBQSxTQWpFQTtBQUFBLFFBZ0dBakssSUFBQSxFQUFBLFlBQUE7QUFBQSxZQUVBLEtBQUEwSyxRQUFBLEdBRkE7QUFBQSxTQWhHQTtBQUFBLEtBQUEsQ0FkQTtBQUFBLENBQUEsRUFBQSxDO0FBd0hBLElBQUFjLFVBQUEsR0FBQUMsT0FBQSxDQUFBQyxZQUFBLEdBQUFBLFlBQUEsR0FBQSxJQUFBLEVBQUF4UCxRQUFBLENBQUFDLHNCQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEM7QUFDQXdQLFNBQUEsQ0FBQUgsVUFBQSxFQUFBLFlBQUE7QUFBQSxJQUNBM0IsU0FBQSxDQUFBN0osSUFBQSxHQURBO0FBQUEsQ0FBQSxFO0FDekhBO0FBQUEsQ0FBQSxZQUFBO0FBQUEsSUFFQSxJQUFBNEwsTUFBQSxHQUFBMVAsUUFBQSxDQUFBQyxzQkFBQSxDQUFBLFFBQUEsQ0FBQSxDQUZBO0FBQUEsSUFJQSxJQUFBLENBQUF5UCxNQUFBLENBQUFwTSxNQUFBO0FBQUEsUUFBQSxPQUpBO0FBQUEsSUFNQSxTQUFBcU0sTUFBQSxDQUFBQyxJQUFBLEVBQUE7QUFBQSxRQUNBLEtBQUFDLFVBQUEsR0FBQUQsSUFBQSxDQURBO0FBQUEsUUFHQSxLQUFBRSxXQUFBLEdBQUEsRUFBQSxDQUhBO0FBQUEsUUFLQSxLQUFBQyxjQUFBLEdBQUEsQ0FBQSxDQUxBO0FBQUEsUUFPQSxLQUFBQyxJQUFBLEdBQUEsS0FBQSxDQVBBO0FBQUEsUUFTQSxLQUFBQyxvQkFBQSxHQUFBLFVBQUFDLElBQUEsRUFBQUMsSUFBQSxFQUFBO0FBQUEsWUFDQSxJQUFBQyxXQUFBLEdBQUEsZUFBQSxFQUNBOUosS0FEQSxDQURBO0FBQUEsWUFJQUEsS0FBQSxHQUFBNEosSUFBQSxDQUFBM00sWUFBQSxDQUFBLFVBQUE0TSxJQUFBLENBQUEsQ0FKQTtBQUFBLFlBTUEsSUFBQSxDQUFBN0osS0FBQSxFQUFBO0FBQUEsZ0JBQ0FBLEtBQUEsR0FBQTRKLElBQUEsQ0FBQWpRLHNCQUFBLENBQUFtUSxXQUFBLEdBQUFELElBQUEsRUFBQSxDQUFBLENBQUEsQ0FEQTtBQUFBLGdCQUVBN0osS0FBQSxHQUFBQSxLQUFBLEdBQUFBLEtBQUEsQ0FBQVQsU0FBQSxDQUFBd0ssSUFBQSxFQUFBLEdBQUEsSUFBQSxDQUZBO0FBQUEsYUFOQTtBQUFBLFlBV0EsT0FBQS9KLEtBQUEsQ0FYQTtBQUFBLFNBQUEsQ0FUQTtBQUFBLFFBdUJBLEtBQUFnSyxRQUFBLEdBQUEsWUFBQTtBQUFBLFlBQ0EsSUFBQUMsS0FBQSxHQUFBLEtBQUFWLFVBQUEsQ0FBQTVQLHNCQUFBLENBQUEsY0FBQSxDQUFBLEVBQ0FvRCxDQURBLEVBRUFtTixVQUZBLENBREE7QUFBQSxZQUtBLElBQUEsQ0FBQUQsS0FBQSxDQUFBak4sTUFBQTtBQUFBLGdCQUFBLE9BQUEsS0FBQSxDQUxBO0FBQUEsWUFPQSxLQUFBRCxDQUFBLElBQUFrTixLQUFBLEVBQUE7QUFBQSxnQkFDQSxJQUFBLE9BQUFBLEtBQUEsQ0FBQWxOLENBQUEsQ0FBQSxLQUFBLFFBQUE7QUFBQSxvQkFBQSxTQURBO0FBQUEsZ0JBRUFtTixVQUFBLEdBQUE7QUFBQSxvQkFDQSxTQUFBLEtBQUFQLG9CQUFBLENBQUFNLEtBQUEsQ0FBQWxOLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FEQTtBQUFBLG9CQUVBLFNBQUEsS0FBQTRNLG9CQUFBLENBQUFNLEtBQUEsQ0FBQWxOLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FGQTtBQUFBLG9CQUdBLE9BQUEsS0FBQTRNLG9CQUFBLENBQUFNLEtBQUEsQ0FBQWxOLENBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FIQTtBQUFBLG9CQUlBLFFBQUEsS0FBQTRNLG9CQUFBLENBQUFNLEtBQUEsQ0FBQWxOLENBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FKQTtBQUFBLGlCQUFBLENBRkE7QUFBQSxnQkFTQSxLQUFBeU0sV0FBQSxDQUFBek0sQ0FBQSxJQUFBbU4sVUFBQSxDQVRBO0FBQUEsYUFQQTtBQUFBLFlBa0JBLEtBQUFDLEtBQUEsR0FBQSxLQUFBWCxXQUFBLENBQUF4TSxNQUFBLENBbEJBO0FBQUEsU0FBQSxDQXZCQTtBQUFBLFFBNENBLEtBQUFvTixPQUFBLEdBQUEsWUFBQTtBQUFBLFlBQ0EsSUFBQUMsUUFBQSxHQUFBM1EsUUFBQSxDQUFBMkYsYUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUNBaUwsWUFBQSxHQUFBNVEsUUFBQSxDQUFBMkYsYUFBQSxDQUFBLEtBQUEsQ0FEQSxFQUVBa0wsY0FBQSxHQUFBN1EsUUFBQSxDQUFBMkYsYUFBQSxDQUFBLEtBQUEsQ0FGQSxFQUdBbUwsY0FBQSxHQUFBOVEsUUFBQSxDQUFBMkYsYUFBQSxDQUFBLEtBQUEsQ0FIQSxFQUlBb0wsaUJBQUEsR0FBQS9RLFFBQUEsQ0FBQTJGLGFBQUEsQ0FBQSxLQUFBLENBSkEsRUFLQXFMLGNBQUEsR0FBQWhSLFFBQUEsQ0FBQTJGLGFBQUEsQ0FBQSxLQUFBLENBTEEsRUFNQXNMLGFBQUEsR0FBQWpSLFFBQUEsQ0FBQTJGLGFBQUEsQ0FBQSxLQUFBLENBTkEsRUFPQXVMLGlCQUFBLEdBQUFsUixRQUFBLENBQUEyRixhQUFBLENBQUEsR0FBQSxDQVBBLEVBUUF3TCxRQUFBLEdBQUFuUixRQUFBLENBQUEyRixhQUFBLENBQUEsS0FBQSxDQVJBLEVBU0F5TCxlQUFBLEdBQUFwUixRQUFBLENBQUEyRixhQUFBLENBQUEsR0FBQSxDQVRBLEVBVUEwTCxlQUFBLEdBQUFyUixRQUFBLENBQUEyRixhQUFBLENBQUEsR0FBQSxDQVZBLEVBV0F0QyxDQVhBLENBREE7QUFBQSxZQWNBc04sUUFBQSxDQUFBOVAsU0FBQSxDQUFBQyxHQUFBLENBQUEsa0JBQUEsRUFkQTtBQUFBLFlBZUEsS0FBQTZQLFFBQUEsR0FBQUEsUUFBQSxDQWZBO0FBQUEsWUFnQkEsS0FBQVcsa0JBQUEsR0FBQVgsUUFBQSxDQUFBL0ssV0FBQSxDQUFBZ0wsWUFBQSxDQUFBVyxTQUFBLEVBQUEsQ0FBQSxDQWhCQTtBQUFBLFlBaUJBLEtBQUFELGtCQUFBLENBQUF6USxTQUFBLENBQUFDLEdBQUEsQ0FBQSx1QkFBQSxFQWpCQTtBQUFBLFlBa0JBLEtBQUF3USxrQkFBQSxDQUFBelEsU0FBQSxDQUFBQyxHQUFBLENBQUEsK0JBQUEsRUFsQkE7QUFBQSxZQW1CQSxLQUFBMFEscUJBQUEsR0FBQWIsUUFBQSxDQUFBL0ssV0FBQSxDQUFBZ0wsWUFBQSxDQUFBLENBbkJBO0FBQUEsWUFvQkEsS0FBQVkscUJBQUEsQ0FBQTNRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHVCQUFBLEVBcEJBO0FBQUEsWUFxQkEsS0FBQTBRLHFCQUFBLENBQUEzUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSw4QkFBQSxFQXJCQTtBQUFBLFlBdUJBK1AsY0FBQSxDQUFBaFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsb0JBQUEsRUF2QkE7QUFBQSxZQXdCQWdRLGNBQUEsQ0FBQWpRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLG9CQUFBLEVBeEJBO0FBQUEsWUF5QkFpUSxpQkFBQSxDQUFBbFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsT0FBQSxFQXpCQTtBQUFBLFlBMEJBaVEsaUJBQUEsQ0FBQWxRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGlCQUFBLEVBMUJBO0FBQUEsWUEyQkFpUSxpQkFBQSxDQUFBbFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsdUJBQUEsRUEzQkE7QUFBQSxZQTRCQWtRLGNBQUEsQ0FBQW5RLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLG9CQUFBLEVBNUJBO0FBQUEsWUE2QkFtUSxhQUFBLENBQUFwUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQTdCQTtBQUFBLFlBOEJBb1EsaUJBQUEsQ0FBQXJRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLEtBQUEsRUE5QkE7QUFBQSxZQStCQW9RLGlCQUFBLENBQUFyUSxTQUFBLENBQUFDLEdBQUEsQ0FBQSxlQUFBLEVBL0JBO0FBQUEsWUFnQ0FvUSxpQkFBQSxDQUFBTyxZQUFBLENBQUEsTUFBQSxFQUFBLEdBQUEsRUFoQ0E7QUFBQSxZQWlDQVAsaUJBQUEsQ0FBQU8sWUFBQSxDQUFBLFFBQUEsRUFBQSxRQUFBLEVBakNBO0FBQUEsWUFrQ0FQLGlCQUFBLENBQUFyTCxTQUFBLEdBQUEsbUxBQUEsQ0FsQ0E7QUFBQSxZQW9DQSxLQUFBaUwsY0FBQSxHQUFBRCxjQUFBLENBQUFqTCxXQUFBLENBQUFrTCxjQUFBLEVBQUFsTCxXQUFBLENBQUFtTCxpQkFBQSxDQUFBLENBcENBO0FBQUEsWUFxQ0FGLGNBQUEsQ0FBQWpMLFdBQUEsQ0FBQWtMLGNBQUEsRUFBQXpHLEtBQUEsQ0FBQXFILE9BQUEsR0FBQSxNQUFBLENBckNBO0FBQUEsWUFzQ0EsS0FBQVYsY0FBQSxHQUFBSCxjQUFBLENBQUFqTCxXQUFBLENBQUFvTCxjQUFBLENBQUEsQ0F0Q0E7QUFBQSxZQXVDQSxLQUFBQSxjQUFBLENBQUEzRyxLQUFBLENBQUFxSCxPQUFBLEdBQUEsTUFBQSxDQXZDQTtBQUFBLFlBd0NBLEtBQUFULGFBQUEsR0FBQUosY0FBQSxDQUFBakwsV0FBQSxDQUFBcUwsYUFBQSxFQUFBckwsV0FBQSxDQUFBc0wsaUJBQUEsQ0FBQSxDQXhDQTtBQUFBLFlBeUNBLEtBQUFELGFBQUEsQ0FBQTNRLFVBQUEsQ0FBQStKLEtBQUEsQ0FBQXFILE9BQUEsR0FBQSxNQUFBLENBekNBO0FBQUEsWUEyQ0FQLFFBQUEsQ0FBQXRRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGFBQUEsRUEzQ0E7QUFBQSxZQTRDQXNRLGVBQUEsQ0FBQXZRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGlCQUFBLEVBNUNBO0FBQUEsWUE2Q0FzUSxlQUFBLENBQUFLLFlBQUEsQ0FBQSxNQUFBLEVBQUEsR0FBQSxFQTdDQTtBQUFBLFlBOENBTCxlQUFBLENBQUFLLFlBQUEsQ0FBQSxLQUFBLEVBQUEsVUFBQSxFQTlDQTtBQUFBLFlBK0NBTCxlQUFBLENBQUF2TCxTQUFBLEdBQUEsd0NBQUEsQ0EvQ0E7QUFBQSxZQWdEQXdMLGVBQUEsR0FBQUQsZUFBQSxDQUFBRyxTQUFBLEVBQUEsQ0FoREE7QUFBQSxZQWlEQUYsZUFBQSxDQUFBeEwsU0FBQSxHQUFBdUwsZUFBQSxDQUFBdkwsU0FBQSxDQWpEQTtBQUFBLFlBa0RBLEtBQUF1TCxlQUFBLEdBQUFELFFBQUEsQ0FBQXZMLFdBQUEsQ0FBQXdMLGVBQUEsQ0FBQSxDQWxEQTtBQUFBLFlBbURBLEtBQUFBLGVBQUEsQ0FBQXZRLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLHNCQUFBLEVBbkRBO0FBQUEsWUFvREEsS0FBQXVRLGVBQUEsR0FBQUYsUUFBQSxDQUFBdkwsV0FBQSxDQUFBeUwsZUFBQSxDQUFBLENBcERBO0FBQUEsWUFxREEsS0FBQUEsZUFBQSxDQUFBeFEsU0FBQSxDQUFBQyxHQUFBLENBQUEsc0JBQUEsRUFyREE7QUFBQSxZQXVEQSxLQUFBdVEsZUFBQSxDQUFBelEsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsS0FBQStRLFdBQUEsQ0FBQTVOLElBQUEsQ0FBQTtBQUFBLGdCQUFBMkwsTUFBQSxFQUFBLElBQUE7QUFBQSxnQkFBQW5LLElBQUEsRUFBQSxNQUFBO0FBQUEsYUFBQSxDQUFBLEVBdkRBO0FBQUEsWUF3REEsS0FBQTZMLGVBQUEsQ0FBQXhRLGdCQUFBLENBQUEsT0FBQSxFQUFBLEtBQUErUSxXQUFBLENBQUE1TixJQUFBLENBQUE7QUFBQSxnQkFBQTJMLE1BQUEsRUFBQSxJQUFBO0FBQUEsZ0JBQUFuSyxJQUFBLEVBQUEsTUFBQTtBQUFBLGFBQUEsQ0FBQSxFQXhEQTtBQUFBLFlBMERBLEtBQUFzSyxVQUFBLENBQUFqSyxXQUFBLENBQUErSyxRQUFBLEVBMURBO0FBQUEsWUEyREEsS0FBQWQsVUFBQSxDQUFBakssV0FBQSxDQUFBaUwsY0FBQSxFQTNEQTtBQUFBLFlBNERBLEtBQUFoQixVQUFBLENBQUFqSyxXQUFBLENBQUF1TCxRQUFBLEVBNURBO0FBQUEsWUE4REEsSUFBQXhRLEtBQUEsR0FBQSxJQUFBLENBOURBO0FBQUEsWUErREEsT0FBQSxJQUFBaVIsT0FBQSxDQUFBLFVBQUFDLE9BQUEsRUFBQTtBQUFBLGdCQUVBLElBQUFDLFlBQUEsR0FBQSxDQUFBLENBRkE7QUFBQSxnQkFJQSxTQUFBQyxZQUFBLENBQUFDLE1BQUEsRUFBQXZCLEtBQUEsRUFBQTtBQUFBLG9CQUNBLElBQUF1QixNQUFBLElBQUF2QixLQUFBLEVBQUE7QUFBQSx3QkFDQW9CLE9BQUEsQ0FBQWxSLEtBQUEsRUFEQTtBQUFBLHFCQURBO0FBQUEsaUJBSkE7QUFBQSxnQkFRQSxDQVJBO0FBQUEsZ0JBVUEsS0FBQTBDLENBQUEsSUFBQTFDLEtBQUEsQ0FBQW1QLFdBQUEsRUFBQTtBQUFBLG9CQUNBLElBQUFVLFVBQUEsR0FBQTdQLEtBQUEsQ0FBQW1QLFdBQUEsQ0FBQXpNLENBQUEsQ0FBQSxFQUNBNE8sUUFBQSxHQUFBLElBQUF2RCxLQUFBLEVBREEsRUFFQXdELFVBQUEsR0FBQWxTLFFBQUEsQ0FBQTJGLGFBQUEsQ0FBQSxNQUFBLENBRkEsQ0FEQTtBQUFBLG9CQUtBdU0sVUFBQSxDQUFBclIsU0FBQSxDQUFBQyxHQUFBLENBQUEsdUJBQUEsRUFMQTtBQUFBLG9CQU9BbVIsUUFBQSxDQUFBdEQsR0FBQSxHQUFBNkIsVUFBQSxDQUFBL0IsR0FBQSxDQVBBO0FBQUEsb0JBUUF3RCxRQUFBLENBQUFyRCxNQUFBLEdBQUEsWUFBQTtBQUFBLHdCQUNBRSxPQUFBLENBQUFDLEdBQUEsQ0FBQSxLQUFBSixHQUFBLEdBQUEsc0JBQUEsRUFEQTtBQUFBLHdCQUVBbUQsWUFBQSxHQUZBO0FBQUEsd0JBR0FDLFlBQUEsQ0FBQUQsWUFBQSxFQUFBblIsS0FBQSxDQUFBOFAsS0FBQSxFQUhBO0FBQUEscUJBQUEsQ0FSQTtBQUFBLG9CQWFBd0IsUUFBQSxDQUFBakQsT0FBQSxHQUFBLFlBQUE7QUFBQSx3QkFDQUYsT0FBQSxDQUFBQyxHQUFBLENBQUEsS0FBQUosR0FBQSxHQUFBLHlCQUFBLEVBREE7QUFBQSx3QkFFQW1ELFlBQUEsR0FGQTtBQUFBLHdCQUdBQyxZQUFBLENBQUFELFlBQUEsRUFBQW5SLEtBQUEsQ0FBQThQLEtBQUEsRUFIQTtBQUFBLHFCQUFBLENBYkE7QUFBQSxvQkFtQkE5UCxLQUFBLENBQUEwUSxlQUFBLENBQUF6TCxXQUFBLENBQUFzTSxVQUFBLEVBQUF0TSxXQUFBLENBQUFxTSxRQUFBLEVBbkJBO0FBQUEsb0JBb0JBdFIsS0FBQSxDQUFBeVEsZUFBQSxDQUFBeEwsV0FBQSxDQUFBc00sVUFBQSxDQUFBWCxTQUFBLEVBQUEsRUFBQTNMLFdBQUEsQ0FBQXFNLFFBQUEsQ0FBQVYsU0FBQSxFQUFBLEVBcEJBO0FBQUEsaUJBVkE7QUFBQSxhQUFBLENBQUEsQ0EvREE7QUFBQSxTQUFBLENBNUNBO0FBQUEsUUFnSkEsS0FBQVksV0FBQSxHQUFBLFVBQUFDLFVBQUEsRUFBQTdNLElBQUEsRUFBQTtBQUFBLFlBQ0EsSUFBQThNLE9BQUEsR0FBQSxLQUFBdEMsY0FBQSxFQUNBdUMsSUFBQSxHQUFBLEtBQUFDLFVBQUEsQ0FBQUYsT0FBQSxDQURBLEVBRUFHLElBQUEsR0FBQSxLQUFBQyxVQUFBLENBQUFKLE9BQUEsQ0FGQSxFQUdBSyxPQUFBLEdBQUEsS0FBQUgsVUFBQSxDQUFBSCxVQUFBLENBSEEsRUFJQU8sT0FBQSxHQUFBLEtBQUFGLFVBQUEsQ0FBQUwsVUFBQSxDQUpBLEVBS0F6UixLQUFBLEdBQUEsSUFMQSxDQURBO0FBQUEsWUFRQSxPQUFBLElBQUFpUixPQUFBLENBQUEsVUFBQUMsT0FBQSxFQUFBO0FBQUEsZ0JBRUEsQ0FBQXRNLElBQUEsSUFBQSxNQUFBLEdBQUE1RSxLQUFBLENBQUEwUSxlQUFBLEdBQUExUSxLQUFBLENBQUF5USxlQUFBLENBQUEsQ0FBQW5SLHNCQUFBLENBQUEsdUJBQUEsRUFBQXNGLElBQUEsSUFBQSxNQUFBLEdBQUErTSxJQUFBLEdBQUFFLElBQUEsRUFBQTNSLFNBQUEsQ0FBQUMsR0FBQSxDQUFBLGdDQUFBLEVBRkE7QUFBQSxnQkFHQSxDQUFBeUUsSUFBQSxJQUFBLE1BQUEsR0FBQTVFLEtBQUEsQ0FBQTBRLGVBQUEsR0FBQTFRLEtBQUEsQ0FBQXlRLGVBQUEsQ0FBQSxDQUFBblIsc0JBQUEsQ0FBQSx1QkFBQSxFQUFBc0YsSUFBQSxJQUFBLE1BQUEsR0FBQStNLElBQUEsR0FBQUUsSUFBQSxFQUFBM1IsU0FBQSxDQUFBRSxNQUFBLENBQUEsOEJBQUEsRUFIQTtBQUFBLGdCQUlBLENBQUF3RSxJQUFBLElBQUEsTUFBQSxHQUFBNUUsS0FBQSxDQUFBMFEsZUFBQSxHQUFBMVEsS0FBQSxDQUFBeVEsZUFBQSxDQUFBLENBQUFuUixzQkFBQSxDQUFBLHVCQUFBLEVBQUFzRixJQUFBLElBQUEsTUFBQSxHQUFBbU4sT0FBQSxHQUFBQyxPQUFBLEVBQUE5UixTQUFBLENBQUFDLEdBQUEsQ0FBQSw4QkFBQSxFQUpBO0FBQUEsZ0JBTUEsQ0FBQXlFLElBQUEsSUFBQSxNQUFBLEdBQUE1RSxLQUFBLENBQUEwUSxlQUFBLEdBQUExUSxLQUFBLENBQUF5USxlQUFBLENBQUEsQ0FBQW5SLHNCQUFBLENBQUEsZ0NBQUEsRUFBQSxDQUFBLEVBQUFXLGdCQUFBLENBQUEsZUFBQSxFQUFBLFlBQUE7QUFBQSxvQkFDQSxLQUFBQyxTQUFBLENBQUFFLE1BQUEsQ0FBQSxnQ0FBQSxFQURBO0FBQUEsb0JBRUE4USxPQUFBLENBQUEsSUFBQSxFQUZBO0FBQUEsaUJBQUEsRUFOQTtBQUFBLGFBQUEsQ0FBQSxDQVJBO0FBQUEsU0FBQSxDQWhKQTtBQUFBLFFBdUtBLEtBQUFlLGFBQUEsR0FBQSxVQUFBUCxPQUFBLEVBQUE7QUFBQSxZQUVBLElBQUFRLFdBQUEsR0FBQSxLQUFBL0MsV0FBQSxDQUFBdUMsT0FBQSxDQUFBLENBRkE7QUFBQSxZQUlBLElBQUFRLFdBQUEsQ0FBQXJKLEtBQUEsRUFBQTtBQUFBLGdCQUNBLEtBQUFzSCxjQUFBLENBQUFqTCxTQUFBLEdBQUFnTixXQUFBLENBQUFySixLQUFBLENBREE7QUFBQSxnQkFFQSxLQUFBc0gsY0FBQSxDQUFBeFEsVUFBQSxDQUFBK0osS0FBQSxDQUFBcUgsT0FBQSxHQUFBLEVBQUEsQ0FGQTtBQUFBLGFBQUEsTUFHQTtBQUFBLGdCQUNBLEtBQUFaLGNBQUEsQ0FBQXhRLFVBQUEsQ0FBQStKLEtBQUEsQ0FBQXFILE9BQUEsR0FBQSxNQUFBLENBREE7QUFBQSxhQVBBO0FBQUEsWUFXQSxJQUFBbUIsV0FBQSxDQUFBQyxLQUFBLEVBQUE7QUFBQSxnQkFDQSxLQUFBOUIsY0FBQSxDQUFBbkwsU0FBQSxHQUFBZ04sV0FBQSxDQUFBQyxLQUFBLENBREE7QUFBQSxnQkFFQSxLQUFBOUIsY0FBQSxDQUFBM0csS0FBQSxDQUFBcUgsT0FBQSxHQUFBLEVBQUEsQ0FGQTtBQUFBLGFBQUEsTUFHQTtBQUFBLGdCQUNBLEtBQUFWLGNBQUEsQ0FBQTNHLEtBQUEsQ0FBQXFILE9BQUEsR0FBQSxNQUFBLENBREE7QUFBQSxhQWRBO0FBQUEsWUFrQkEsSUFBQW1CLFdBQUEsQ0FBQXJGLElBQUEsRUFBQTtBQUFBLGdCQUNBLEtBQUF5RCxhQUFBLENBQUFRLFlBQUEsQ0FBQSxNQUFBLEVBQUFvQixXQUFBLENBQUFyRixJQUFBLEVBREE7QUFBQSxnQkFFQSxLQUFBeUQsYUFBQSxDQUFBM1EsVUFBQSxDQUFBK0osS0FBQSxDQUFBcUgsT0FBQSxHQUFBLEVBQUEsQ0FGQTtBQUFBLGFBQUEsTUFHQTtBQUFBLGdCQUNBLEtBQUFULGFBQUEsQ0FBQTNRLFVBQUEsQ0FBQStKLEtBQUEsQ0FBQXFILE9BQUEsR0FBQSxNQUFBLENBREE7QUFBQSxhQXJCQTtBQUFBLFNBQUEsQ0F2S0E7QUFBQSxRQWtNQSxLQUFBcUIsWUFBQSxHQUFBLFVBQUFWLE9BQUEsRUFBQXpCLFlBQUEsRUFBQTtBQUFBLFlBQ0EsSUFBQWlDLFdBQUEsR0FBQSxLQUFBL0MsV0FBQSxDQUFBdUMsT0FBQSxDQUFBLEVBQ0E1RCxHQUFBLEdBQUF6TyxRQUFBLENBQUEyRixhQUFBLENBQUEsS0FBQSxDQURBLENBREE7QUFBQSxZQUlBLE9BQUEsSUFBQWlNLE9BQUEsQ0FBQSxVQUFBQyxPQUFBLEVBQUE7QUFBQSxnQkFFQXBELEdBQUEsQ0FBQUUsR0FBQSxHQUFBa0UsV0FBQSxDQUFBcEUsR0FBQSxDQUZBO0FBQUEsZ0JBSUEsSUFBQW1DLFlBQUEsQ0FBQS9QLFNBQUEsQ0FBQVEsUUFBQSxDQUFBLCtCQUFBLENBQUEsRUFBQTtBQUFBLG9CQUNBdVAsWUFBQSxDQUFBL1AsU0FBQSxDQUFBRSxNQUFBLENBQUEsK0JBQUEsRUFEQTtBQUFBLG9CQUVBNlAsWUFBQSxDQUFBL1AsU0FBQSxDQUFBQyxHQUFBLENBQUEsOEJBQUEsRUFGQTtBQUFBLG9CQUdBOFAsWUFBQSxDQUFBL0ssU0FBQSxHQUFBLEVBQUEsQ0FIQTtBQUFBLGlCQUFBLE1BSUE7QUFBQSxvQkFDQStLLFlBQUEsQ0FBQWhMLFdBQUEsQ0FBQTZJLEdBQUEsRUFBQW5PLFVBQUEsQ0FBQU8sU0FBQSxDQUFBRSxNQUFBLENBQUEsOEJBQUEsRUFEQTtBQUFBLG9CQUVBNlAsWUFBQSxDQUFBL1AsU0FBQSxDQUFBQyxHQUFBLENBQUEsK0JBQUEsRUFGQTtBQUFBLGlCQVJBO0FBQUEsZ0JBYUE4UCxZQUFBLENBQUFoUSxnQkFBQSxDQUFBLGVBQUEsRUFBQSxZQUFBO0FBQUEsb0JBQ0FpUixPQUFBLEdBREE7QUFBQSxpQkFBQSxFQWJBO0FBQUEsYUFBQSxDQUFBLENBSkE7QUFBQSxTQUFBLENBbE1BO0FBQUEsUUEwTkEsS0FBQUYsV0FBQSxHQUFBLFVBQUExUSxDQUFBLEVBQUE7QUFBQSxZQUNBQSxDQUFBLENBQUFzRCxjQUFBLEdBREE7QUFBQSxZQUdBLElBQUEsS0FBQW1MLE1BQUEsQ0FBQU0sSUFBQSxFQUFBO0FBQUEsZ0JBRUEsSUFBQXFDLE9BQUEsR0FBQSxLQUFBM0MsTUFBQSxDQUFBSyxjQUFBLEVBQ0FxQyxVQUFBLEdBQUEsS0FBQTdNLElBQUEsSUFBQSxNQUFBLEdBQUEsS0FBQW1LLE1BQUEsQ0FBQTZDLFVBQUEsQ0FBQUYsT0FBQSxDQUFBLEdBQUEsS0FBQTNDLE1BQUEsQ0FBQStDLFVBQUEsQ0FBQUosT0FBQSxDQURBLENBRkE7QUFBQSxnQkFLQSxLQUFBM0MsTUFBQSxDQUFBTSxJQUFBLEdBQUEsS0FBQSxDQUxBO0FBQUEsZ0JBTUEsS0FBQU4sTUFBQSxDQUFBc0QsYUFBQSxDQUFBO0FBQUEsb0JBQ0EsS0FBQXRELE1BQUEsQ0FBQXlDLFdBQUEsQ0FBQUMsVUFBQSxFQUFBLE1BQUEsQ0FEQTtBQUFBLG9CQUVBLEtBQUExQyxNQUFBLENBQUF5QyxXQUFBLENBQUFDLFVBQUEsRUFBQSxNQUFBLENBRkE7QUFBQSxvQkFHQSxLQUFBMUMsTUFBQSxDQUFBcUQsWUFBQSxDQUFBWCxVQUFBLEVBQUEsS0FBQTFDLE1BQUEsQ0FBQTRCLGtCQUFBLENBSEE7QUFBQSxvQkFJQSxLQUFBNUIsTUFBQSxDQUFBcUQsWUFBQSxDQUFBWCxVQUFBLEVBQUEsS0FBQTFDLE1BQUEsQ0FBQThCLHFCQUFBLENBSkE7QUFBQSxpQkFBQSxFQU5BO0FBQUEsZ0JBYUEsS0FBQTlCLE1BQUEsQ0FBQWtELGFBQUEsQ0FBQVIsVUFBQSxFQWJBO0FBQUEsZ0JBZUEsS0FBQTFDLE1BQUEsQ0FBQUssY0FBQSxHQUFBcUMsVUFBQSxDQWZBO0FBQUEsYUFIQTtBQUFBLFNBQUEsQ0ExTkE7QUFBQSxRQWtQQSxLQUFBRyxVQUFBLEdBQUEsVUFBQUYsT0FBQSxFQUFBO0FBQUEsWUFDQUEsT0FBQSxHQURBO0FBQUEsWUFFQSxPQUFBQSxPQUFBLEdBQUEsS0FBQTVCLEtBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBNEIsT0FBQSxDQUZBO0FBQUEsU0FBQSxDQWxQQTtBQUFBLFFBdVBBLEtBQUFJLFVBQUEsR0FBQSxVQUFBSixPQUFBLEVBQUE7QUFBQSxZQUNBQSxPQUFBLEdBREE7QUFBQSxZQUVBLE9BQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsS0FBQTVCLEtBQUEsR0FBQSxDQUFBLEdBQUE0QixPQUFBLENBRkE7QUFBQSxTQUFBLENBdlBBO0FBQUEsUUE0UEEsS0FBQVcsYUFBQSxHQUFBLFVBQUFDLEdBQUEsRUFBQTtBQUFBLFlBQ0EsSUFBQXRTLEtBQUEsR0FBQSxJQUFBLENBREE7QUFBQSxZQUVBaVIsT0FBQSxDQUFBc0IsR0FBQSxDQUFBRCxHQUFBLEVBQUFFLElBQUEsQ0FBQSxVQUFBQyxPQUFBLEVBQUE7QUFBQSxnQkFDQXpTLEtBQUEsQ0FBQXFQLElBQUEsR0FBQSxJQUFBLENBREE7QUFBQSxnQkFFQWxCLE9BQUEsQ0FBQUMsR0FBQSxDQUFBLGVBQUEsRUFGQTtBQUFBLGFBQUEsRUFGQTtBQUFBLFNBQUEsQ0E1UEE7QUFBQSxRQW9RQSxLQUFBakwsSUFBQSxHQUFBLFlBQUE7QUFBQSxZQUVBLEtBQUF3TSxRQUFBLEdBRkE7QUFBQSxZQUlBLElBQUEsS0FBQVIsV0FBQSxDQUFBeE0sTUFBQSxLQUFBLENBQUE7QUFBQSxnQkFBQSxPQUpBO0FBQUEsWUFNQSxLQUFBb04sT0FBQSxHQUFBeUMsSUFBQSxDQUFBLFVBQUF6RCxNQUFBLEVBQUE7QUFBQSxnQkFFQUEsTUFBQSxDQUFBRyxVQUFBLENBQUFoUCxTQUFBLENBQUFDLEdBQUEsQ0FBQSxlQUFBLEVBRkE7QUFBQSxnQkFJQTRPLE1BQUEsQ0FBQXNELGFBQUEsQ0FBQTtBQUFBLG9CQUNBdEQsTUFBQSxDQUFBeUMsV0FBQSxDQUFBekMsTUFBQSxDQUFBSyxjQUFBLEVBQUEsTUFBQSxDQURBO0FBQUEsb0JBRUFMLE1BQUEsQ0FBQXlDLFdBQUEsQ0FBQXpDLE1BQUEsQ0FBQUssY0FBQSxFQUFBLE1BQUEsQ0FGQTtBQUFBLG9CQUdBTCxNQUFBLENBQUFxRCxZQUFBLENBQUFyRCxNQUFBLENBQUFLLGNBQUEsRUFBQUwsTUFBQSxDQUFBNEIsa0JBQUEsQ0FIQTtBQUFBLG9CQUlBNUIsTUFBQSxDQUFBcUQsWUFBQSxDQUFBckQsTUFBQSxDQUFBSyxjQUFBLEVBQUFMLE1BQUEsQ0FBQThCLHFCQUFBLENBSkE7QUFBQSxpQkFBQSxFQUpBO0FBQUEsZ0JBV0E5QixNQUFBLENBQUFrRCxhQUFBLENBQUFsRCxNQUFBLENBQUFLLGNBQUEsRUFYQTtBQUFBLGdCQWFBakIsT0FBQSxDQUFBQyxHQUFBLENBQUEsT0FBQSxFQWJBO0FBQUEsYUFBQSxFQU5BO0FBQUEsU0FBQSxDQXBRQTtBQUFBLEtBTkE7QUFBQSxJQXFTQSxTQUFBMUwsQ0FBQSxJQUFBcU0sTUFBQSxFQUFBO0FBQUEsUUFDQSxJQUFBLE9BQUFBLE1BQUEsQ0FBQXJNLENBQUEsQ0FBQSxJQUFBLFFBQUE7QUFBQSxZQUFBLFNBREE7QUFBQSxRQUVBLElBQUFnUSxDQUFBLEdBQUEsSUFBQTFELE1BQUEsQ0FBQUQsTUFBQSxDQUFBck0sQ0FBQSxDQUFBLENBQUEsQ0FGQTtBQUFBLFFBR0FnUSxDQUFBLENBQUF2UCxJQUFBLEdBSEE7QUFBQSxLQXJTQTtBQUFBLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XHJcblxyXG5cdHZhciBibG9ja0Jsb2dNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYmxvZ19fbmF2LWxpc3QnKVswXTtcclxuXHRcclxuXHRpZighYmxvY2tCbG9nTWVudSkgcmV0dXJuO1xyXG5cclxuXHR2YXIgQmxvZ01lbnUgPSBmdW5jdGlvbihibG9jaykge1xyXG5cclxuXHRcdHRoaXMuYmxvZ01lbnUgPSBibG9jaztcclxuXHJcblx0XHR0aGlzLmJsb2dXcmFwID0gYmxvY2sucGFyZW50Tm9kZTtcclxuXHJcblx0XHR0aGlzLmJsb2dDb250YWluZXIgPSBibG9jay5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcblxyXG5cdFx0dGhpcy5tb2JpbGVTdGF0dXMgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLnRyaWdnZXJNb2JpbGVNZW51ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgYnV0dG9uQmxvZ01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nX19uYXYtYnV0dG9uJylbMF0sXHJcblx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0aWYoIWJ1dHRvbkJsb2dNZW51KSByZXR1cm47XHJcblxyXG5cdFx0XHRidXR0b25CbG9nTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHQkdGhhdC5tb2JpbGVTdGF0dXMgPSAhJHRoYXQubW9iaWxlU3RhdHVzO1xyXG5cdFx0XHRcdGlmKCR0aGF0Lm1vYmlsZVN0YXR1cykge1xyXG5cdFx0XHRcdFx0YnV0dG9uQmxvZ01lbnUuY2xhc3NMaXN0LmFkZCgnX3Nob3dlZC1ibG9nLW1lbnUnKTtcclxuXHRcdFx0XHRcdCR0aGF0LmJsb2dXcmFwLmNsYXNzTGlzdC5hZGQoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJ1dHRvbkJsb2dNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHJcblx0XHRcdFx0XHQkdGhhdC5ibG9nV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfc2hvd2VkLWJsb2ctbWVudScpO1x0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdFx0aWYoISR0aGF0Lm1vYmlsZVN0YXR1cykgcmV0dXJuO1xyXG5cdFx0XHRcdHZhciBlbGVtZW50ID0gZS50YXJnZXQsXHJcblx0XHRcdFx0XHRoaWRlID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0d2hpbGUoZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0aWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ19zaG93ZWQtYmxvZy1tZW51JykpIHtcclxuXHRcdFx0XHRcdFx0aGlkZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH0gZWxzZSBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoaGlkZSkge1xyXG5cdFx0XHRcdFx0JHRoYXQubW9iaWxlU3RhdHVzID0gISR0aGF0Lm1vYmlsZVN0YXR1cztcclxuXHRcdFx0XHRcdGJ1dHRvbkJsb2dNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ19zaG93ZWQtYmxvZy1tZW51Jyk7XHJcblx0XHRcdFx0XHQkdGhhdC5ibG9nV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfc2hvd2VkLWJsb2ctbWVudScpO1x0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZml4ZWQgPSBmdW5jdGlvbiBmaXhlZChlKSB7XHJcblxyXG5cdFx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5ibG9nQ29udGFpbmVyLFxyXG5cdFx0XHRcdG1lbnUgPSB0aGlzLmJsb2dNZW51LFxyXG5cdFx0XHRcdHdyYXAgPSB0aGlzLmJsb2dXcmFwLFxyXG5cdFx0XHRcdHdyYXBQb3MgPSB3cmFwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0XHRcdGNvbnRhaW5lckhlaWdodCxcclxuXHRcdFx0XHRtZW51SGVpZ2h0LFxyXG5cdFx0XHRcdGZpeGVkU3RhcnQsXHJcblx0XHRcdFx0Zml4ZWRTdG9wLFxyXG5cdFx0XHRcdHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRtZW51SGVpZ2h0ID0gbWVudS5vZmZzZXRIZWlnaHQ7XHJcblx0XHRcdFx0Y29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuXHRcdFx0XHRmaXhlZFN0YXJ0ID0gc2Nyb2xsVG9wICsgd3JhcFBvcy50b3A7XHJcblx0XHRcdFx0Zml4ZWRTdG9wID0gIGZpeGVkU3RhcnQgKyBjb250YWluZXJIZWlnaHQgLSAobWVudUhlaWdodCArIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikucGFkZGluZ0JvdHRvbSkpO1xyXG5cclxuXHRcdFx0aWYoc2Nyb2xsVG9wIDw9IGZpeGVkU3RhcnQpIHtcclxuXHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHNjcm9sbFRvcCA+IGZpeGVkU3RhcnQpIHtcclxuXHRcdFx0XHRtZW51LmNsYXNzTGlzdC5yZW1vdmUoLXdyYXBQb3MudG9wIDwgZml4ZWRTdG9wIC0gZml4ZWRTdGFydCA/ICdibG9nX19uYXYtbGlzdF9pbi1ib3R0b20nIDogJ2Jsb2dfX25hdi1saXN0X2ZpeGVkJyk7XHJcblx0XHRcdFx0bWVudS5jbGFzc0xpc3QuYWRkKC13cmFwUG9zLnRvcCA8IGZpeGVkU3RvcCAtIGZpeGVkU3RhcnQgPyAnYmxvZ19fbmF2LWxpc3RfZml4ZWQnIDogJ2Jsb2dfX25hdi1saXN0X2luLWJvdHRvbScpO1x0XHJcblx0XHRcdH0gXHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmNoZWNrQWN0aXZlID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR2YXIgd2luSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsXHJcblx0XHRcdFx0bWVudUl0ZW1zTGlua3MgPSB0aGlzLmJsb2dNZW51LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2dfX25hdi1pdGVtLWxuaycpLFxyXG5cdFx0XHRcdGJsb2dJdGVtSWQsXHJcblx0XHRcdFx0YmxvZ0l0ZW0sXHJcblx0XHRcdFx0YWN0aXZlSWQsXHJcblx0XHRcdFx0bWluVG9wLFxyXG5cdFx0XHRcdGN1cnJlbnRUb3AsXHJcblx0XHRcdFx0aTtcclxuXHJcblx0XHRcdGlmKG1lbnVJdGVtc0xpbmtzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG5cdFx0XHRmb3IoaSBpbiBtZW51SXRlbXNMaW5rcykge1xyXG5cclxuXHRcdFx0XHRpZih0eXBlb2YgbWVudUl0ZW1zTGlua3NbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0YmxvZ0l0ZW1JZCA9IG1lbnVJdGVtc0xpbmtzW2ldLmdldEF0dHJpYnV0ZSgnaHJlZicpLm1hdGNoKC8jKC4qKS9pKVsxXTtcclxuXHRcdFx0XHRibG9nSXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJsb2dJdGVtSWQpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKCFibG9nSXRlbSkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdGN1cnJlbnRUb3AgPSBNYXRoLmFicyhibG9nSXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xyXG5cclxuXHRcdFx0XHRpZih0eXBlb2YgbWluVG9wID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0bWluVG9wID0gY3VycmVudFRvcDtcclxuXHRcdFx0XHRcdGFjdGl2ZUlkID0gYmxvZ0l0ZW1JZDtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH0gXHJcblxyXG5cdFx0XHRcdGlmKGN1cnJlbnRUb3AgPCBtaW5Ub3ApIHtcclxuXHRcdFx0XHRcdG1pblRvcCA9IGN1cnJlbnRUb3A7XHJcblx0XHRcdFx0XHRhY3RpdmVJZCA9IGJsb2dJdGVtSWQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVx0XHJcblxyXG5cdFx0XHRpZihhY3RpdmVJZCkge1xyXG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnIycgKyBhY3RpdmVJZCArICckJywgJ2knKTtcclxuXHRcdFx0XHRmb3IoaSBpbiBtZW51SXRlbXNMaW5rcykge1xyXG5cdFx0XHRcdFx0aWYodHlwZW9mIG1lbnVJdGVtc0xpbmtzW2ldICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcblx0XHRcdFx0XHRtZW51SXRlbXNMaW5rc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdibG9nX19uYXYtaXRlbS1sbmtfYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYobWVudUl0ZW1zTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykubWF0Y2gocGF0dGVybikpIHtcclxuXHRcdFx0XHRcdFx0bWVudUl0ZW1zTGlua3NbaV0uY2xhc3NMaXN0LmFkZCgnYmxvZ19fbmF2LWl0ZW0tbG5rX2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNoZWNrQWN0aXZlKCk7XHRcclxuXHRcdFx0dGhpcy50cmlnZ2VyTW9iaWxlTWVudSgpO1xyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5maXhlZC5iaW5kKHsnYmxvZ0NvbnRhaW5lcicgOiB0aGlzLmJsb2dDb250YWluZXIsICdibG9nTWVudScgOiB0aGlzLmJsb2dNZW51LCAnYmxvZ1dyYXAnIDogdGhpcy5ibG9nV3JhcH0pKTtcdFxyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5maXhlZC5iaW5kKHsnYmxvZ0NvbnRhaW5lcicgOiB0aGlzLmJsb2dDb250YWluZXIsICdibG9nTWVudScgOiB0aGlzLmJsb2dNZW51LCAnYmxvZ1dyYXAnIDogdGhpcy5ibG9nV3JhcH0pKTtcdFxyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5jaGVja0FjdGl2ZS5iaW5kKHsnYmxvZ01lbnUnIDogdGhpcy5ibG9nTWVudX0pKTtcclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2hlY2tBY3RpdmUuYmluZCh7J2Jsb2dNZW51JyA6IHRoaXMuYmxvZ01lbnV9KSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHR2YXIgbWVudSA9IG5ldyBCbG9nTWVudShibG9ja0Jsb2dNZW51KTtcclxuXHRtZW51LmluaXQoKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdHZhciB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZsaXBwZXItdHJpZ2dlcicpLFxyXG5cdFx0YnRuQmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZsaXBwZXItdHJpZ2dlcl9iYWNrJylbMF0sXHJcblx0XHRpO1xyXG5cclxuXHRmdW5jdGlvbiB0dXJuRmxpcHBlcihmbGlwSWQpIHtcclxuIFx0XHRcdFxyXG4gXHRcdFx0dmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcltkYXRhLWZsaXAtaWQgPSAnICsgZmxpcElkICsgJ10nKTtcclxuIFx0XHRcdGlmKCFmbGlwcGVyKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gXHRcdFx0aWYoZmxpcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsaXBwZXJfdHVybmVkJykpIHtcclxuXHRcdFx0XHRmbGlwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcblx0XHRcdFx0aWYoYnRuQmFjaykgYnRuQmFjay5jbGFzc0xpc3QucmVtb3ZlKCdmbGlwcGVyLXRyaWdnZXJfaGlkZGVuJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRmbGlwcGVyLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXJfdHVybmVkJyk7XHJcblx0XHRcdFx0XHRpZihidG5CYWNrKSBidG5CYWNrLmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZXItdHJpZ2dlcl9oaWRkZW4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHR9XHRcdFxyXG5cclxuXHRmb3IoaSBpbiB0cmlnZ2VyKSB7XHJcblxyXG5cdFx0aWYodHlwZW9mIHRyaWdnZXJbaV0uYWRkRXZlbnRMaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykgY29udGludWU7XHJcblxyXG5cdFx0dHJpZ2dlcltpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dmFyIGZsaXBJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWZsaXAtaWQnKTtcclxuXHRcdFx0dHVybkZsaXBwZXIoZmxpcElkKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0aWYod2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsJycpID09ICdsb2dpbicpIHtcclxuXHRcdHR1cm5GbGlwcGVyKCdtYWluJyk7XHJcblx0fVxyXG5cclxuXHJcbn0pKCk7IiwiLy9GT1JNU1x0XHJcbnZhciBhbGxGb3JtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJyksXHJcblx0YWpheEZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWpheC1mb3JtJyksXHJcblx0aSxcclxuXHRmb3JtcyA9IChmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBpLFxyXG5cdFx0XHRtaW5MZW5ndGggPSAzLFxyXG5cdFx0XHR0aXBDbGFzcyA9ICdmb3JtX190aXAnLFxyXG5cdFx0XHR0aXBDbGFzc1Zpc2libGUgPSAnZm9ybV9fdGlwX3Zpc2libGUnLFxyXG5cdFx0XHRtZXNzYWdlQ2xhc3MgPSAnZm9ybV9fdGlwLW1lc3NhZ2UnLFxyXG5cdFx0XHRtZXNzYWdlVGV4dCA9IHtcclxuXHRcdFx0XHQncmVxdWlyZWQnIDogJ9Cf0L7Qu9C1INC90LUg0LfQsNC/0L7Qu9C90LXQvdC+JyxcclxuXHRcdFx0XHQncGF0dGVybicgOiAn0JfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQvdC1INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGE0L7RgNC80LDRgtGDJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbGVtZW50Q2xhc3NFcnJvciA9ICdfZXJyb3InO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblxyXG5cdFx0XHRzaG93VGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcdFxyXG5cdFx0XHRcdFx0dHlwZU1lc3NhZ2VDbGFzcyA9IG1lc3NhZ2VDbGFzcyArICdfJyArIHR5cGVFcnIsXHJcblx0XHRcdFx0XHRtZXNzYWdlO1xyXG5cclxuXHRcdFx0XHRpZighdGlwKSB7XHJcblx0XHRcdFx0XHR2YXIgdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3MpO1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHRpcCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKCFtZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0XHRcdFx0bWVzc2FnZS5jbGFzc0xpc3QuYWRkKG1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmNsYXNzTGlzdC5hZGQodHlwZU1lc3NhZ2VDbGFzcyk7XHJcblx0XHRcdFx0XHRtZXNzYWdlLmlubmVySFRNTCA9IG1lc3NhZ2VUZXh0W3R5cGVFcnJdO1xyXG5cclxuXHRcdFx0XHRcdHRpcC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0dGlwLmNsYXNzTGlzdC5hZGQodGlwQ2xhc3NWaXNpYmxlKTtcdFx0XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRoaWRlVGlwOiBmdW5jdGlvbihlbGVtZW50LCB0eXBlRXJyKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IChlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgPyBlbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlIDogZWxlbWVudC5wYXJlbnROb2RlKSxcclxuXHRcdFx0XHRcdHRpcCA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKVswXSxcclxuXHRcdFx0XHRcdHR5cGVNZXNzYWdlQ2xhc3MgPSBtZXNzYWdlQ2xhc3MgKyAnXycgKyB0eXBlRXJyLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTtcclxuXHJcblx0XHRcdFx0aWYoIXRpcCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRtZXNzYWdlID0gdGlwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZU1lc3NhZ2VDbGFzcylbMF07XHJcblxyXG5cdFx0XHRcdGlmKG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdHRpcC5yZW1vdmVDaGlsZChtZXNzYWdlKTtcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdFx0aWYoIXRpcC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG1lc3NhZ2VDbGFzcykubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHR0aXAuY2xhc3NMaXN0LnJlbW92ZSh0aXBDbGFzc1Zpc2libGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNsZWFyT25Gb2N1czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHRyaWdnZXJUaXA6IGZ1bmN0aW9uKGVsZW1lbnQsIGNvbmQsIHR5cGVFcnIpIHtcclxuXHRcdFx0XHRpZihjb25kKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNob3dUaXAoZWxlbWVudCwgdHlwZUVycik7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaGlkZVRpcChlbGVtZW50LCB0eXBlRXJyKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNoZWNrUmVxdWlyZWQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHR2YXIgdHlwZUVyciA9ICdyZXF1aXJlZCcsXHJcblx0XHRcdFx0XHRjb25kO1xyXG5cclxuXHRcdFx0XHRzd2l0Y2goZWxlbWVudC50eXBlKSB7XHJcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6IFxyXG5cdFx0XHRcdFx0XHRjb25kID0gKGVsZW1lbnQucmVxdWlyZWQgJiYgIWVsZW1lbnQuY2hlY2tlZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcclxuXHRcdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnJlcXVpcmVkICYmICFlbGVtZW50LmNoZWNrZWQpO1xyXG5cdFx0XHRcdFx0XHRpZighZWxlbWVudC5yZXF1aXJlZCkgcmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdGNvbmQgPSAoZWxlbWVudC5yZXF1aXJlZCAmJiBlbGVtZW50LnZhbHVlLmxlbmd0aCA8IDMpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRyaWdnZXJUaXAoZWxlbWVudCwgY29uZCwgdHlwZUVycik7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRjaGVja1BhdHRlcm46IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZighZWxlbWVudC52YWx1ZSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHRcdHZhciB0eXBlRXJyID0gJ3BhdHRlcm4nLFxyXG5cdFx0XHRcdFx0Y29uZCA9IChlbGVtZW50LnBhdHRlcm4gJiYgIWVsZW1lbnQudmFsdWUubWF0Y2gobmV3IFJlZ0V4cChlbGVtZW50LnBhdHRlcm4sICdpJykpKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudHJpZ2dlclRpcChlbGVtZW50LCBjb25kLCB0eXBlRXJyKTtcdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Y2hlY2tWYWxpZGF0aW9uOiBmdW5jdGlvbihlbGVtZW50LCBzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHR2YXIgZWxlbWVudElzVmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdGlmKCF0aGlzLmNoZWNrUmVxdWlyZWQoZWxlbWVudCkpIGVsZW1lbnRJc1ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0aWYoIXRoaXMuY2hlY2tQYXR0ZXJuKGVsZW1lbnQpKSBlbGVtZW50SXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZihzaG93U3R5bGVFcnIpIHtcclxuXHRcdFx0XHRcdGlmKCFlbGVtZW50SXNWYWxpZCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGVsZW1lbnRDbGFzc0Vycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBlbGVtZW50SXNWYWxpZDtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHZhbGlkYXRlRm9ybTogZnVuY3Rpb24oZm9ybSkge1xyXG5cdFx0XHRcdHZhciBpbnB1dCA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JyksXHJcblx0XHRcdFx0XHR0ZXh0YXJlYSA9IGZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHRhcmVhJyksXHJcblx0XHRcdFx0XHRlbGVtZW50cyA9IFtdLFxyXG5cdFx0XHRcdFx0Zm9ybUlzVmFsaWQgPSB0cnVlLFxyXG5cdFx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoaW5wdXRbaV0pO1xyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IHRleHRhcmVhLmxlbmd0aDsgaSsrKSBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdCh0ZXh0YXJlYVtpXSk7XHJcblxyXG5cdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVsZW1lbnRWYWxpZGF0aW9uID0gJHRoYXQuY2hlY2tWYWxpZGF0aW9uKGVsZW1lbnRzW2ldLCB0cnVlKTtcclxuXHRcdFx0XHRcdGZvcm1Jc1ZhbGlkID0gZm9ybUlzVmFsaWQgPyBlbGVtZW50VmFsaWRhdGlvbiA6IGZvcm1Jc1ZhbGlkO1xyXG5cclxuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLm9ua2V5dXAgPSBlbGVtZW50c1tpXS5vbmlucHV0ID0gZWxlbWVudHNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkdGhhdC5jaGVja1ZhbGlkYXRpb24odGhpcyk7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0ub25wcm9wZXJ0eWNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGUucHJvcGVydHlOYW1lID09ICd2YWx1ZScpICR0aGF0LmNoZWNrVmFsaWRhdGlvbih0aGlzKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmN1dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCR0aGF0LmNoZWNrVmFsaWRhdGlvbihlbGVtZW50c1tpXSksIDApOyBcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAkdGhhdC5jbGVhck9uRm9jdXMpO1xyXG5cdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdHZhciB0aXBzID0gZm9ybS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRpcENsYXNzKTtcclxuXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdCR0aGF0LmNsZWFyT25Gb2N1cy5iaW5kKGVsZW1lbnRzW2ldKSgpO1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50c1tpXS5vbmtleXVwID0gZWxlbWVudHNbaV0ub25pbnB1dCA9IGVsZW1lbnRzW2ldLm9uY2xpY2sgPSBlbGVtZW50c1tpXS5vbnByb3BlcnR5Y2hhbmdlID0gZWxlbWVudHNbaV0ub25jdXQgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yKGkgPSB0aXBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHRcdHRpcHNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aXBzW2ldKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZvcm1Jc1ZhbGlkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9KSgpO1xyXG5cclxuXHRmb3IoaSA9IDA7IGkgPCBhbGxGb3Jtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0YWxsRm9ybXNbaV0ubm9WYWxpZGF0ZSA9IHRydWU7XHJcblx0XHRhbGxGb3Jtc1tpXS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0cmV0dXJuIGZvcm1zLnZhbGlkYXRlRm9ybSh0aGlzKTtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0Zm9yKGkgPSAwOyBpIDwgYWpheEZvcm1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRhamF4Rm9ybXNbaV0ub25zdWJtaXQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0aWYoIWZvcm1zLnZhbGlkYXRlRm9ybSh0aGlzKSkgcmV0dXJuO1xyXG5cdFx0fTtcclxuXHR9O1xyXG4iLCJ2YXIgbWFwLFxyXG5cdHN0eWxlTWFwID0gW1xyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZjAwMDBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiMTAwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM0NDQ0NDRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJodWVcIjogXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbC50ZXJyYWluXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LnN0cm9rZVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiA0NVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzg2YTc3YVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXTtcclxuXHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcblxyXG4gICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSkgcmV0dXJuO1xyXG5cclxuXHR2YXIgbXlMYXRMbmcgPSB7bGF0OiA2MC4wNjU2NTEsIGxuZzogMzAuMzEyMjQ5fTtcclxuXHJcblx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuXHRcdGNlbnRlcjogbXlMYXRMbmcsXHJcblx0XHR6b29tOiAxNSxcclxuXHRcdG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuXHRcdHBhbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICBcdHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICBcdHpvb21Db250cm9sT3B0aW9uczoge1xyXG4gICAgICBcdFx0cG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9DRU5URVJcclxuICAgIFx0fSxcclxuICAgICAgXHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAgIFx0bWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgZHJhZ2dhYmxlOiAhKFwib250b3VjaGVuZFwiIGluIGRvY3VtZW50KSxcclxuICAgICAgICBzdHlsZXM6IHN0eWxlTWFwXHJcblx0fSk7XHJcblxyXG5cdHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuXHQgICAgcG9zaXRpb246IG15TGF0TG5nLFxyXG5cdCAgICBtYXA6IG1hcCxcclxuXHQgICAgdGl0bGU6ICfQnNC+0Y8g0LvQvtC60LDRhtC40Y8nXHJcblx0fSk7XHJcblxyXG5cdG1hcmtlci5zZXRNYXAobWFwKTtcclxufSIsIlxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgYnRuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tbWVudScpLFxyXG5cdFx0aTtcclxuXHRmb3IodmFyIGkgaW4gYnRuTWVudSl7XHJcblxyXG5cdFx0aWYodHlwZW9mIGJ0bk1lbnVbaV0uYWRkRXZlbnRMaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykgY29udGludWU7XHJcblxyXG5cdFx0YnRuTWVudVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xyXG5cdFx0XHRpZighbmF2KSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHRpZighbmF2LmNsYXNzTGlzdC5jb250YWlucygnbmF2X29wZW4nKSkge1xyXG5cdFx0XHRcdG5hdi5jbGFzc0xpc3QuYWRkKCduYXZfb3BlbicpO1xyXG5cdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLW1lbnVfY3Jvc3MnKTtcclxuXHRcdFx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ25hdl9fYnRuLW1lbnVfZml4ZWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X29wZW4nKTtcclxuXHRcdFx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1tZW51X2Nyb3NzJyk7XHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX2J0bi1tZW51X2ZpeGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0fVxyXG59KSgpIiwiLy8gQkxVUlx0XHJcbnZhciBibHVyID0gKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGJnSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWltZycpWzBdLFxyXG5cdFx0Zm9ybUJsdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtX193cmFwLWJsdXInKVswXTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHJcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdGlmKCFiZ0ltZyB8fCAhZm9ybUJsdXIpIHJldHVybjtcclxuXHJcblx0XHRcdGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudCcpICsgMSAhPSAwKSB7XHJcblx0XHRcdFx0Zm9ybUJsdXIuY2xhc3NMaXN0LmFkZCgnZm9ybV9fd3JhcC1ibHVyX2FsdCcpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHBvc0xlZnQgPSBiZ0ltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gZm9ybUJsdXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcclxuXHRcdFx0XHRwb3NUb3AgPSAgYmdJbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gZm9ybUJsdXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuXHRcdFx0Zm9ybUJsdXIuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdC8xMCArICdyZW0nICsgJyAnICsgcG9zVG9wLzEwICsgJ3JlbSc7XHJcblx0XHRcdGZvcm1CbHVyLnN0eWxlLmJhY2tncm91bmRTaXplID0gYmdJbWcuY2xpZW50V2lkdGgvMTAgKyAncmVtJyArICcgJyArIGJnSW1nLmNsaWVudEhlaWdodC8xMCArICdyZW0nO1x0XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59KSgpO1xyXG5cclxuYmx1ci5pbml0KCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBibHVyLmluaXQuYmluZChibHVyKSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBibHVyLmluaXQuYmluZChibHVyKSk7XHJcblxyXG4vL1BhcmFsbGF4XHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbigpe1xyXG5cclxuXHR2YXIgYmdJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdlX19mb290ZXItYmctaW1nJylbMF0sXHJcblx0XHRsZWFmMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2VfX2Zvb3Rlci1iZy1sZWFmLTEnKVswXSxcclxuXHRcdGxlYWYyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnZV9fZm9vdGVyLWJnLWxlYWYtMicpWzBdLFxyXG5cdFx0bGVhZjMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdlX19mb290ZXItYmctbGVhZi0zJylbMF07XHJcblxyXG5cdHJldHVybiB7XHJcblxyXG5cdFx0bW92ZTogZnVuY3Rpb24oZWxlbWVudCwgc3BlZWRTaGlmdCwgc3BlZWREcm9wLCBzcGVlZFJvdGF0ZSkge1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxyXG5cdFx0XHRcdHBhZ2VIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxyXG5cdFx0XHRcdGNsaWVudEhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsc2Nyb2xsVG9wLFxyXG5cdFx0XHRcdHRvcCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHdpbmRvdy5pbm5lckhlaWdodCB8fCB3aW5kb3cuYm9keS5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCksXHJcblx0XHRcdFx0dHJhbnNmb3JtO1xyXG5cclxuXHRcdFx0XHR0cmFuc2Zvcm0gID0gc3BlZWRTaGlmdCA/ICd0cmFuc2xhdGVYKCcgKyAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIDEwMDAgKiBzcGVlZFNoaWZ0ICsgJyUpJyA6ICcnOyBcclxuXHRcdFx0XHR0cmFuc2Zvcm0gKz0gc3BlZWREcm9wID8gJ3RyYW5zbGF0ZVkoJyArICggKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCkgLyBwYWdlSGVpZ2h0IC0gMSApICogMTAwMCAqIHNwZWVkRHJvcCArICclKScgOiAnJzsgXHJcblx0XHRcdFx0dHJhbnNmb3JtICs9ICd0cmFuc2xhdGVaKDApJzsgXHJcblx0XHRcdFx0dHJhbnNmb3JtICs9IHNwZWVkUm90YXRlID8gJ3JvdGF0ZSgnICsgKCAoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0KSAvIHBhZ2VIZWlnaHQgLSAxICkgKiBzcGVlZFJvdGF0ZSAqIDM2MCArICdkZWcpJyA6ICcnO1xyXG5cclxuXHRcdFx0XHRpZih0cmFuc2Zvcm0gPT09ICd0cmFuc2xhdGVaKDApJykge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5ib3R0b20gPSAoIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQpIC8gcGFnZUhlaWdodCAtIDEgKSAqIDEwMCArICclJztcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUubW96VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUubXNUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gdHJhbnNmb3JtO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZihsZWFmMSkgdGhpcy5tb3ZlKGxlYWYxLCAxLCAwLjc1LCAwLjUpO1xyXG5cdFx0XHRpZihsZWFmMikgdGhpcy5tb3ZlKGxlYWYyLCAxLCAyLCAxKTtcclxuXHRcdFx0aWYobGVhZjMpIHRoaXMubW92ZShsZWFmMywgMSwgNCwgMik7XHJcblx0XHRcdGlmKGJnSW1nKSB0aGlzLm1vdmUoYmdJbWcsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG5cdFx0XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0pKCk7XHRcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBwYXJhbGxheC5pbml0LmJpbmQocGFyYWxsYXgpKTsiLCIoZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8gZmlyc3QgYWRkIHJhZiBzaGltXHJcblx0Ly8gaHR0cDovL3d3dy5wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXHJcblx0d2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcclxuXHQgIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxyXG5cdCAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcblx0ICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcclxuXHQgICAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XHJcblx0ICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcblx0ICAgICAgICAgIH07XHJcblx0fSkoKTtcclxuXHJcblx0Ly8gbWFpbiBmdW5jdGlvblxyXG5cdGZ1bmN0aW9uIHNjcm9sbFRvWShzY3JvbGxUYXJnZXRZLCBzcGVlZCwgZWFzaW5nKSB7XHJcblx0ICAgIC8vIHNjcm9sbFRhcmdldFk6IHRoZSB0YXJnZXQgc2Nyb2xsWSBwcm9wZXJ0eSBvZiB0aGUgd2luZG93XHJcblx0ICAgIC8vIHNwZWVkOiB0aW1lIGluIHBpeGVscyBwZXIgc2Vjb25kXHJcblx0ICAgIC8vIGVhc2luZzogZWFzaW5nIGVxdWF0aW9uIHRvIHVzZVxyXG5cclxuXHQgICAgdmFyIHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSxcclxuXHQgICAgICAgIHNjcm9sbFRhcmdldFkgPSBzY3JvbGxUYXJnZXRZIHx8IDAsXHJcblx0ICAgICAgICBzcGVlZCA9IHNwZWVkIHx8IDIwMDAsXHJcblx0ICAgICAgICBlYXNpbmcgPSBlYXNpbmcgfHwgJ2Vhc2VPdXRTaW5lJyxcclxuXHQgICAgICAgIGN1cnJlbnRUaW1lID0gMDtcclxuXHJcblx0ICAgIC8vIG1pbiB0aW1lIC4xLCBtYXggdGltZSAuOCBzZWNvbmRzXHJcblx0ICAgIHZhciB0aW1lID0gTWF0aC5tYXgoLjEsIE1hdGgubWluKE1hdGguYWJzKHNjcm9sbFkgLSBzY3JvbGxUYXJnZXRZKSAvIHNwZWVkLCAuOCkpO1xyXG5cclxuXHQgICAgLy8gZWFzaW5nIGVxdWF0aW9ucyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5yby9lYXNpbmctanMvYmxvYi9tYXN0ZXIvZWFzaW5nLmpzXHJcblx0ICAgIHZhciBQSV9EMiA9IE1hdGguUEkgLyAyLFxyXG5cdCAgICAgICAgZWFzaW5nRXF1YXRpb25zID0ge1xyXG5cdCAgICAgICAgICAgIGVhc2VPdXRTaW5lOiBmdW5jdGlvbiAocG9zKSB7XHJcblx0ICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbihwb3MgKiAoTWF0aC5QSSAvIDIpKTtcclxuXHQgICAgICAgICAgICB9LFxyXG5cdCAgICAgICAgICAgIGVhc2VJbk91dFNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHQgICAgICAgICAgICAgICAgcmV0dXJuICgtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiBwb3MpIC0gMSkpO1xyXG5cdCAgICAgICAgICAgIH0sXHJcblx0ICAgICAgICAgICAgZWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uIChwb3MpIHtcclxuXHQgICAgICAgICAgICAgICAgaWYgKChwb3MgLz0gMC41KSA8IDEpIHtcclxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsIDUpO1xyXG5cdCAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3coKHBvcyAtIDIpLCA1KSArIDIpO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH07XHJcblxyXG5cdCAgICAvLyBhZGQgYW5pbWF0aW9uIGxvb3BcclxuXHQgICAgZnVuY3Rpb24gdGljaygpIHtcclxuXHQgICAgICAgIGN1cnJlbnRUaW1lICs9IDEgLyA2MDtcclxuXHJcblx0ICAgICAgICB2YXIgcCA9IGN1cnJlbnRUaW1lIC8gdGltZTtcclxuXHQgICAgICAgIHZhciB0ID0gZWFzaW5nRXF1YXRpb25zW2Vhc2luZ10ocCk7XHJcblxyXG5cdCAgICAgICAgaWYgKHAgPCAxKSB7XHJcblx0ICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZSh0aWNrKTtcclxuXHQgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsWSArICgoc2Nyb2xsVGFyZ2V0WSAtIHNjcm9sbFkpICogdCkpO1xyXG5cdCAgICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzY3JvbGwgZG9uZScpO1xyXG5cdCAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxUYXJnZXRZKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfVxyXG5cclxuXHQgICAgLy8gY2FsbCBpdCBvbmNlIHRvIGdldCBzdGFydGVkXHJcblx0ICAgIHRpY2soKTtcclxuXHR9XHJcblxyXG5cdHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2hyZWZePVwiI1wiXScpLFxyXG5cdCAgICBzcGVlZCA9IDAuNTtcclxuXHJcblx0ZnVuY3Rpb24gZ2V0RWxlbWVudFNjcm9sbFBvc2l0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFxyXG5cdFx0aWYoIWVsZW1lbnQpIHJldHVybjtcclxuXHRcdHZhciBzY3JvbGxUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApLFx0XHJcblx0XHRcdGVsZW1lbnRJZCA9IGVsZW1lbnQuaHJlZi5tYXRjaCgvIyguKikvaSksXHJcblx0XHRcdGVsZW1lbnRPZlBhZ2U7XHJcblxyXG5cdFx0XHRlbGVtZW50T2ZQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkWzFdKTtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gZWxlbWVudE9mUGFnZSA/IHNjcm9sbFRvcCArIGVsZW1lbnRPZlBhZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDogMDtcclxuXHRcclxuXHR9XHJcblx0XHJcblx0Zm9yKHZhciBpIGluIGxpbmspIHtcclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mIGxpbmtbaV0gIT0gJ29iamVjdCcpIHJldHVybjtcclxuXHRcdFxyXG5cdFx0bGlua1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdHZhciBzY3JvbGxUbyA9IGdldEVsZW1lbnRTY3JvbGxQb3NpdGlvbih0aGlzKSxcclxuXHRcdFx0XHRzdGFydCA9IG51bGw7XHJcblxyXG5cdFx0XHRzY3JvbGxUb1koc2Nyb2xsVG8sIDIwMDApO1xyXG5cclxuXHQgIFx0fSk7XHJcblx0fVxyXG5cclxufSkoKTsiLCIvLyBQUkVMT0FERVJcdFxyXG52YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpLFxyXG5cdFx0dG90YWxJbWdzLFxyXG5cdFx0aHRtbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0sXHJcblx0XHJcblx0XHRwcmVsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmVsb2FkZXInKVswXSxcclxuXHRcdHByZWxvYWRlclBlcmNlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJlbG9hZGVyX19wcm9ncmVzcy10ZXh0JylbMF0sXHRcclxuXHRcdHRpbWVyO1xyXG5cclxuXHRcdGlmKCFwcmVsb2FkZXIgfHwgIXByZWxvYWRlclBlcmNlbnRzKSByZXR1cm47XHJcblxyXG5cdFx0aHRtbC5jbGFzc0xpc3QucmVtb3ZlKCdfbG9hZGVkJyk7XHJcblxyXG5cdHJldHVybiB7XHJcblxyXG5cdFx0dG90YWxMb2FkZWQ6IDAsXHJcblxyXG5cdFx0c2hvd2VkUGVyY2VudHM6IDAsXHJcblxyXG5cdFx0Z2V0SW1nczogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR2YXIgaW1ncyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yKHZhciBpIGluIGVsZW1lbnRzKSB7XHJcblx0XHRcdFx0aWYodHlwZW9mIGVsZW1lbnRzW2ldICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIGltZ1VybCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdHN3aXRjaCAoZWxlbWVudHNbaV0ubm9kZU5hbWUpIHtcclxuXHRcdFx0XHQgIGNhc2UgJ0lNRyc6XHJcblx0XHRcdFx0ICAgIGltZ1VybCA9IGVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcblx0XHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0XHRcdCAgLypjYXNlICdTVkcnOiBjYXNlICdzdmcnOlxyXG5cdFx0XHRcdCAgICB2YXIgc3ZnVXNlID0gZWxlbWVudHNbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VzZScpO1xyXG5cdFx0XHRcdCAgICBpZighc3ZnVXNlWzBdKSBicmVhaztcclxuXHRcdFx0XHQgICAgdmFyIHVzZUhyZWYgPSBzdmdVc2VbMF0uZ2V0QXR0cmlidXRlKCd4bGluazpocmVmJyk7XHJcblx0XHRcdFx0ICAgIHVzZUhyZWYgPSB1c2VIcmVmLm1hdGNoKC8oLio/KVxcLnN2Zy8pO1xyXG5cdFx0XHRcdCAgICBpbWdVcmwgPSAodXNlSHJlZiAhPT0gbnVsbCA/IHVzZUhyZWZbMF0gOiBudWxsKTtcclxuXHRcdFx0XHQgICAgYnJlYWs7Ki9cclxuXHRcdFx0XHQgIGRlZmF1bHQ6XHJcblx0XHRcdFx0ICAgIGlmKCFlbGVtZW50c1tpXS5ub2RlTmFtZSkgYnJlYWs7XHJcblx0XHRcdFx0XHR2YXIgYmdJbWcgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnRzW2ldKS5iYWNrZ3JvdW5kSW1hZ2U7XHJcblx0XHRcdFx0XHRpZihiZ0ltZyAhPSAnbm9uZScpIHtcclxuXHRcdFx0XHRcdFx0YmdJbWcgPSBiZ0ltZy5tYXRjaCgvdXJsXFwoKC4qPylcXCkvKTtcclxuXHRcdFx0XHRcdFx0YmdJbWcgPSAoYmdJbWcgIT09IG51bGwgPyBiZ0ltZ1sxXS5yZXBsYWNlKC8oJ3xcIikvZywnJykgOiBudWxsKTtcclxuXHRcdFx0XHRcdFx0aW1nVXJsID0gYmdJbWc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihpbWdVcmwgIT09IG51bGwgJiYgaW1nVXJsICE9ICdub25lJyAmJiBpbWdzLmluZGV4T2YoaW1nVXJsKSA9PSAtMSkgaW1ncy5wdXNoKGltZ1VybCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBpbWdzO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0bG9hZEltZ3M6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dmFyIGltZ3MgPSB0aGlzLmdldEltZ3MoKSxcclxuXHRcdFx0XHR0b3RhbEltZ3MgPSBpbWdzLmxlbmd0aCxcclxuXHRcdFx0XHQkdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRmb3IoaSBpbiBpbWdzKSB7XHJcblx0XHRcdFx0dmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRcdGltZy5zcmMgPSBpbWdzW2ldO1xyXG5cdFx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCR0aGF0LnRvdGFsTG9hZGVkKys7XHJcblx0XHRcdFx0ICBcdCR0aGF0LnNldFBlcmNlbnRzKCR0aGF0LnRvdGFsTG9hZGVkLCB0b3RhbEltZ3MpO1xyXG5cdFx0XHRcdCAgXHRjb25zb2xlLmxvZyh0aGlzLnNyYyArICcg0LfQsNCz0YDRg9C20LXQvdC+Jyk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRpbWcub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JHRoYXQudG90YWxMb2FkZWQrKztcclxuXHRcdFx0XHQgIFx0JHRoYXQuc2V0UGVyY2VudHMoJHRoYXQudG90YWxMb2FkZWQsIHRvdGFsSW1ncyk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0UGVyY2VudHM6IGZ1bmN0aW9uKHRvdGFsTG9hZGVkLCB0b3RhbEltZ3MpIHtcclxuXHRcdFx0dmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKHRvdGFsTG9hZGVkIC8gdG90YWxJbWdzICogMTAwKSxcclxuXHRcdFx0XHQkdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0cHJlbG9hZGVyUGVyY2VudHMudGV4dENvbnRlbnQgPSB0aGlzLnNob3dlZFBlcmNlbnRzO1xyXG5cclxuXHRcdFx0aWYocGVyY2VudHMgPj0gMTAwKSB7XHJcblx0XHRcdFx0cHJlbG9hZGVyUGVyY2VudHMudGV4dENvbnRlbnQgPSB0aGlzLnNob3dlZFBlcmNlbnRzID0gMTAwO1xyXG5cclxuXHRcdFx0XHRpZihwcmVsb2FkZXIpIHtcclxuXHRcdFx0XHRcdHByZWxvYWRlci5jbGFzc0xpc3QuYWRkKCdwcmVsb2FkZXJfaGlkZGVuJyk7XHJcblx0XHRcdFx0XHRodG1sLmNsYXNzTGlzdC5yZW1vdmUoJ19pbml0Jyk7XHJcblx0XHRcdFx0XHRodG1sLmNsYXNzTGlzdC5hZGQoJ19sb2FkZWQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHR0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRwcmVsb2FkZXJQZXJjZW50cy50ZXh0Q29udGVudCA9ICR0aGF0LnNob3dlZFBlcmNlbnRzO1xyXG5cdFx0XHRcdFx0JHRoYXQuc2hvd2VkUGVyY2VudHMrKztcclxuXHJcblx0XHRcdFx0XHRpZigkdGhhdC5zaG93ZWRQZXJjZW50cyA+PSBwZXJjZW50cykge1xyXG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCAxMCk7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dGhpcy5sb2FkSW1ncygpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufSkoKTtcclxuXHJcbnZhciBzdHlsZXNoZWV0ID0gbG9hZENTUyhwcmVsb2FkU3R5bGUgPyBwcmVsb2FkU3R5bGUgOiBudWxsLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdlJylbMF0pO1xyXG5vbmxvYWRDU1Moc3R5bGVzaGVldCwgZnVuY3Rpb24oKSB7XHJcbiAgICBwcmVsb2FkZXIuaW5pdCgpO1xyXG59KTsiLCIvLyBTTElERVJcdFxyXG4oZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcicpO1xyXG5cclxuXHRpZiAoIXNsaWRlci5sZW5ndGgpIHJldHVybjtcclxuXHJcblx0ZnVuY3Rpb24gU2xpZGVyKHJvb3QpIHtcclxuXHRcdHRoaXMuc2xpZGVyUm9vdCA9IHJvb3Q7XHJcblxyXG5cdFx0dGhpcy5zbGlkZXJJdGVtcyA9IFtdO1xyXG5cdFx0XHJcblx0XHR0aGlzLmN1cnJlbnRJdGVtTnVtID0gMDtcclxuXHJcblx0XHR0aGlzLmZsYWcgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyID0gZnVuY3Rpb24oaXRlbSwgbmFtZSkge1xyXG5cdFx0XHR2YXIgY2xhc3NQcmVmaXggPSAnc2xpZGVyX19pdGVtLScsXHJcblx0XHRcdFx0dmFsdWU7XHJcblxyXG5cdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lKTtcclxuXHJcblx0XHRcdGlmKCF2YWx1ZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gaXRlbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzUHJlZml4ICsgbmFtZSlbMF07XHJcblx0XHRcdFx0dmFsdWUgPSAodmFsdWUgPyB2YWx1ZS5pbm5lckhUTUwudHJpbSgpIDogbnVsbCk7XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdlbkl0ZW1zID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpdGVtcyA9IHRoaXMuc2xpZGVyUm9vdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX2l0ZW0nKSxcclxuXHRcdFx0XHRpLFxyXG5cdFx0XHRcdHNsaWRlckl0ZW07XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0Zm9yKGkgaW4gaXRlbXMpIHtcclxuXHRcdFx0XHRpZih0eXBlb2YgaXRlbXNbaV0gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdFx0XHRzbGlkZXJJdGVtID0ge1xyXG5cdFx0XHRcdFx0J3RpdGxlJzogdGhpcy5nZXRWYWx1ZXNJdGVtc0hlbHBlcihpdGVtc1tpXSwgJ3RpdGxlJyksXHJcblx0XHRcdFx0XHQnZGVzY3InOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAnZGVzY3InKSxcclxuXHRcdFx0XHRcdCdpbWcnOiB0aGlzLmdldFZhbHVlc0l0ZW1zSGVscGVyKGl0ZW1zW2ldLCAnaW1nJyksXHJcblx0XHRcdFx0XHQnaHJlZic6IHRoaXMuZ2V0VmFsdWVzSXRlbXNIZWxwZXIoaXRlbXNbaV0sICdocmVmJyksXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXJJdGVtc1tpXSA9IHNsaWRlckl0ZW07XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy50b3RhbCA9IHRoaXMuc2xpZGVySXRlbXMubGVuZ3RoO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdlbkhUTUwgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGJsb2NrUGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0YmxvY2tQaWNJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0YmxvY2tBYm91dFVuaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRibG9ja1VuaXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdGJsb2NrVW5pdFRpdGxlQ250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0YmxvY2tVbml0RGVzY3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRibG9ja1VuaXRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0YmxvY2tVbml0TGlua0hyZWYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcblx0XHRcdFx0YmxvY2tOYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRibG9ja05hdkJ0blByZXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcblx0XHRcdFx0YmxvY2tOYXZCdG5OZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG5cdFx0XHRcdGk7XHJcblxyXG5cdFx0XHRibG9ja1BpYy5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljJyk7XHJcblx0XHRcdHRoaXMuYmxvY2tQaWMgPSBibG9ja1BpYztcclxuXHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0gPSBibG9ja1BpYy5hcHBlbmRDaGlsZChibG9ja1BpY0l0ZW0uY2xvbmVOb2RlKCkpO1xyXG5cdFx0XHR0aGlzLmJsb2NrUGljQWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW0nKTtcclxuXHRcdFx0dGhpcy5ibG9ja1BpY0FjdGl2ZUl0ZW0uY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0dGhpcy5ibG9ja1BpY0Rpc2FjdGl2ZUl0ZW0gPSBibG9ja1BpYy5hcHBlbmRDaGlsZChibG9ja1BpY0l0ZW0pO1x0XHJcblx0XHRcdHRoaXMuYmxvY2tQaWNEaXNhY3RpdmVJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbScpO1xyXG5cdFx0XHR0aGlzLmJsb2NrUGljRGlzYWN0aXZlSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHRcdFxyXG5cclxuXHRcdFx0YmxvY2tBYm91dFVuaXQuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19hYm91dC11bml0Jyk7XHJcblx0XHRcdGJsb2NrVW5pdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdW5pdC10aXRsZScpO1xyXG5cdFx0XHRibG9ja1VuaXRUaXRsZUNudC5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xyXG5cdFx0XHRibG9ja1VuaXRUaXRsZUNudC5jbGFzc0xpc3QuYWRkKCd0aXRsZV93aXRoLWxpbmUnKTtcclxuXHRcdFx0YmxvY2tVbml0VGl0bGVDbnQuY2xhc3NMaXN0LmFkZCgndGl0bGVfd2l0aC1saW5lLXVwcGVyJyk7XHJcblx0XHRcdGJsb2NrVW5pdERlc2NyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdW5pdC1kZXNjcicpO1xyXG5cdFx0XHRibG9ja1VuaXRMaW5rLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fdW5pdC1saW5rJyk7XHJcblx0XHRcdGJsb2NrVW5pdExpbmtIcmVmLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xyXG5cdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5jbGFzc0xpc3QuYWRkKCdidG5fd2l0aC1pY29uJyk7XHJcblx0XHRcdGJsb2NrVW5pdExpbmtIcmVmLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XHJcblx0XHRcdGJsb2NrVW5pdExpbmtIcmVmLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG5cdFx0XHRibG9ja1VuaXRMaW5rSHJlZi5pbm5lckhUTUwgPSAnPHN2ZyBjbGFzcz1cInN2Zy1pY29uIHN2Zy1pY29uX2xpbmtcIiByb2xlPVwiaW1nXCI+PHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiLi9hc3NldHMvaW1nL3Nwcml0ZS5zdmcjbGlua1wiPjwvdXNlPjwvc3ZnPjxzcGFuPtCf0L7RgdC80L7RgtGA0LXRgtGMINGB0LDQudGCPC9zcGFuPic7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLmJsb2NrVW5pdFRpdGxlID0gYmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0VGl0bGUpLmFwcGVuZENoaWxkKGJsb2NrVW5pdFRpdGxlQ250KTtcclxuXHRcdFx0YmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0VGl0bGUpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3IgPSBibG9ja0Fib3V0VW5pdC5hcHBlbmRDaGlsZChibG9ja1VuaXREZXNjcik7XHJcblx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rID0gYmxvY2tBYm91dFVuaXQuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGluaykuYXBwZW5kQ2hpbGQoYmxvY2tVbml0TGlua0hyZWYpO1xyXG5cdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuXHRcdFx0YmxvY2tOYXYuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYnKTtcclxuXHRcdFx0YmxvY2tOYXZCdG5QcmV2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bicpO1xyXG5cdFx0XHRibG9ja05hdkJ0blByZXYuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuXHRcdFx0YmxvY2tOYXZCdG5QcmV2LnNldEF0dHJpYnV0ZSgncmVsJywgJ25vZm9sbG93Jyk7XHJcblx0XHRcdGJsb2NrTmF2QnRuUHJldi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzbGlkZXJfX25hdi1pY29uXCI+PC9zcGFuPic7XHJcblx0XHRcdGJsb2NrTmF2QnRuTmV4dCA9IGJsb2NrTmF2QnRuUHJldi5jbG9uZU5vZGUoKTtcclxuXHRcdFx0YmxvY2tOYXZCdG5OZXh0LmlubmVySFRNTCA9IGJsb2NrTmF2QnRuUHJldi5pbm5lckhUTUw7XHJcblx0XHRcdHRoaXMuYmxvY2tOYXZCdG5QcmV2ID0gYmxvY2tOYXYuYXBwZW5kQ2hpbGQoYmxvY2tOYXZCdG5QcmV2KTtcclxuXHRcdFx0dGhpcy5ibG9ja05hdkJ0blByZXYuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19uYXYtYnRuX3ByZXYnKTtcclxuXHRcdFx0dGhpcy5ibG9ja05hdkJ0bk5leHQgPSBibG9ja05hdi5hcHBlbmRDaGlsZChibG9ja05hdkJ0bk5leHQpO1xyXG5cdFx0XHR0aGlzLmJsb2NrTmF2QnRuTmV4dC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX25hdi1idG5fbmV4dCcpO1xyXG5cclxuXHRcdFx0dGhpcy5ibG9ja05hdkJ0bk5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTmF2QnRuLmJpbmQoe3NsaWRlcjogdGhpcywgdHlwZTogJ25leHQnfSkpO1xyXG5cdFx0XHR0aGlzLmJsb2NrTmF2QnRuUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tOYXZCdG4uYmluZCh7c2xpZGVyOiB0aGlzLCB0eXBlOiAncHJldid9KSk7XHJcblxyXG5cdFx0XHR0aGlzLnNsaWRlclJvb3QuYXBwZW5kQ2hpbGQoYmxvY2tQaWMpO1xyXG5cdFx0XHR0aGlzLnNsaWRlclJvb3QuYXBwZW5kQ2hpbGQoYmxvY2tBYm91dFVuaXQpO1xyXG5cdFx0XHR0aGlzLnNsaWRlclJvb3QuYXBwZW5kQ2hpbGQoYmxvY2tOYXYpO1x0XHJcblxyXG5cdFx0XHR2YXIgJHRoYXQgPSB0aGlzO1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHR2YXIgbG9hZGVkU2xpZGVzID0gMDtcclxuXHJcblx0XHRcdFx0ZnVuY3Rpb24gbGlzdGVuTG9hZGVkKGxvYWRlZCwgdG90YWwpIHtcclxuXHRcdFx0XHRcdGlmKGxvYWRlZCA9PSB0b3RhbCkge1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKCR0aGF0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRmb3IoaSBpbiAkdGhhdC5zbGlkZXJJdGVtcykge1xyXG5cdFx0XHRcdFx0dmFyIHNsaWRlckl0ZW0gPSAkdGhhdC5zbGlkZXJJdGVtc1tpXSxcclxuXHRcdFx0XHRcdFx0c2xpZGVJbWcgPSBuZXcgSW1hZ2UoKSxcclxuXHRcdFx0XHRcdFx0c2xpZGVUaHVtYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcblx0XHRcdFx0XHRzbGlkZVRodW1iLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYicpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRzbGlkZUltZy5zcmMgPSBzbGlkZXJJdGVtLmltZztcclxuXHRcdFx0XHRcdHNsaWRlSW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc3JjICsgJyDQt9Cw0LPRgNGD0LbQtdC90L4g0LIg0YHQu9Cw0LnQtNC10YAnKTtcclxuXHRcdFx0XHRcdFx0XHRsb2FkZWRTbGlkZXMrKztcclxuXHRcdFx0XHRcdFx0XHRsaXN0ZW5Mb2FkZWQobG9hZGVkU2xpZGVzLCAkdGhhdC50b3RhbCk7XHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRzbGlkZUltZy5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zcmMgKyAnINC90LUg0LfQsNCz0YDRg9C20LXQvdC+INCyINGB0LvQsNC50LTQtdGAJyk7XHJcblx0XHRcdFx0XHRcdFx0bG9hZGVkU2xpZGVzKys7XHJcblx0XHRcdFx0XHRcdFx0bGlzdGVuTG9hZGVkKGxvYWRlZFNsaWRlcywgJHRoYXQudG90YWwpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdCR0aGF0LmJsb2NrTmF2QnRuTmV4dC5hcHBlbmRDaGlsZChzbGlkZVRodW1iKS5hcHBlbmRDaGlsZChzbGlkZUltZyk7XHJcblx0XHRcdFx0XHQkdGhhdC5ibG9ja05hdkJ0blByZXYuYXBwZW5kQ2hpbGQoc2xpZGVUaHVtYi5jbG9uZU5vZGUoKSkuYXBwZW5kQ2hpbGQoc2xpZGVJbWcuY2xvbmVOb2RlKCkpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGN1cnJlbnROZXcsIHR5cGUpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnRJdGVtTnVtLFxyXG5cdFx0XHRcdG5leHQgPSB0aGlzLmdldE5leHROdW0oY3VycmVudCksXHJcblx0XHRcdFx0cHJldiA9IHRoaXMuZ2V0UHJldk51bShjdXJyZW50KSxcclxuXHRcdFx0XHRuZXh0TmV3ID0gdGhpcy5nZXROZXh0TnVtKGN1cnJlbnROZXcpLFxyXG5cdFx0XHRcdHByZXZOZXcgPSB0aGlzLmdldFByZXZOdW0oY3VycmVudE5ldyksXHJcblx0XHRcdFx0JHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuXHJcblx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWInKVsodHlwZSA9PSAnbmV4dCcgPyBuZXh0IDogcHJldildLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYl91bmFjdGl2ZScpO1xyXG5cdFx0XHRcdCh0eXBlID09ICduZXh0JyA/ICR0aGF0LmJsb2NrTmF2QnRuTmV4dCA6ICR0aGF0LmJsb2NrTmF2QnRuUHJldikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX19uYXYtYnRuLXRodW1iJylbKHR5cGUgPT0gJ25leHQnID8gbmV4dCA6IHByZXYpXS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfYWN0aXZlJyk7XHJcblx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWInKVsodHlwZSA9PSAnbmV4dCcgPyBuZXh0TmV3IDogcHJldk5ldyldLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYl9hY3RpdmUnKTtcclxuXHRcdFx0XHJcblx0XHRcdFx0KHR5cGUgPT0gJ25leHQnID8gJHRoYXQuYmxvY2tOYXZCdG5OZXh0IDogJHRoYXQuYmxvY2tOYXZCdG5QcmV2KS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfX25hdi1idG4tdGh1bWJfdW5hY3RpdmUnKVswXS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcl9fbmF2LWJ0bi10aHVtYl91bmFjdGl2ZScpO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh0aGlzKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5zZXRBY3RpdmVJbmZvID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG5cclxuXHRcdFx0dmFyIGFjdGl2ZVNsaWRlID0gdGhpcy5zbGlkZXJJdGVtc1tjdXJyZW50XTtcclxuXHJcblx0XHRcdGlmKGFjdGl2ZVNsaWRlLnRpdGxlKSB7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRUaXRsZS5pbm5lckhUTUwgPSBhY3RpdmVTbGlkZS50aXRsZTtcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdFRpdGxlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tVbml0VGl0bGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihhY3RpdmVTbGlkZS5kZXNjcikge1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tVbml0RGVzY3IuaW5uZXJIVE1MID0gYWN0aXZlU2xpZGUuZGVzY3I7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjci5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXREZXNjci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihhY3RpdmVTbGlkZS5ocmVmKSB7XHJcblx0XHRcdFx0dGhpcy5ibG9ja1VuaXRMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFjdGl2ZVNsaWRlLmhyZWYpO1xyXG5cdFx0XHRcdHRoaXMuYmxvY2tVbml0TGluay5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmJsb2NrVW5pdExpbmsucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnNldEFjdGl2ZVBpYyA9IGZ1bmN0aW9uKGN1cnJlbnQsIGJsb2NrUGljSXRlbSkge1xyXG5cdFx0XHR2YXIgYWN0aXZlU2xpZGUgPSB0aGlzLnNsaWRlckl0ZW1zW2N1cnJlbnRdLFxyXG5cdFx0XHQgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG5cclxuXHRcdFx0XHRpbWcuc3JjID0gYWN0aXZlU2xpZGUuaW1nO1xyXG5cclxuXHRcdFx0XHRpZihibG9ja1BpY0l0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1fdmlzaWJsZScpKSB7XHJcblx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19pbml0LXBpYy1pdGVtX3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdGJsb2NrUGljSXRlbS5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2luaXQtcGljLWl0ZW1faGlkZGVuJyk7XHJcblx0XHRcdFx0XHRibG9ja1BpY0l0ZW0uaW5uZXJIVE1MID0gJyc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJsb2NrUGljSXRlbS5hcHBlbmRDaGlsZChpbWcpLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19pbml0LXBpYy1pdGVtX2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0YmxvY2tQaWNJdGVtLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9faW5pdC1waWMtaXRlbV92aXNpYmxlJyk7XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRibG9ja1BpY0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5jbGlja05hdkJ0biA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0aWYodGhpcy5zbGlkZXIuZmxhZykge1xyXG5cclxuXHRcdFx0dmFyIGN1cnJlbnQgPSB0aGlzLnNsaWRlci5jdXJyZW50SXRlbU51bSxcclxuXHRcdFx0XHRjdXJyZW50TmV3ID0gKHRoaXMudHlwZSA9PSAnbmV4dCcgPyB0aGlzLnNsaWRlci5nZXROZXh0TnVtKGN1cnJlbnQpIDogdGhpcy5zbGlkZXIuZ2V0UHJldk51bShjdXJyZW50KSk7XHRcclxuXHRcdFxyXG5cdFx0XHRcdHRoaXMuc2xpZGVyLmZsYWcgPSBmYWxzZTtcclxuXHRcdFx0XHR0aGlzLnNsaWRlci5hbmltYXRpb25Eb25lKFtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVyLmNoYW5nZVNsaWRlKGN1cnJlbnROZXcsICduZXh0JyksXHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5jaGFuZ2VTbGlkZShjdXJyZW50TmV3LCAncHJldicpLFxyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXIuc2V0QWN0aXZlUGljKGN1cnJlbnROZXcsIHRoaXMuc2xpZGVyLmJsb2NrUGljQWN0aXZlSXRlbSksXHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlci5zZXRBY3RpdmVQaWMoY3VycmVudE5ldywgdGhpcy5zbGlkZXIuYmxvY2tQaWNEaXNhY3RpdmVJdGVtKVxyXG5cdFx0XHRcdF0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlci5zZXRBY3RpdmVJbmZvKGN1cnJlbnROZXcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlci5jdXJyZW50SXRlbU51bSA9IGN1cnJlbnROZXc7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdldE5leHROdW0gPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcblx0XHRcdGN1cnJlbnQrKztcclxuICAgICAgICBcdHJldHVybiAoY3VycmVudCA+IHRoaXMudG90YWwgLSAxID8gMCA6IGN1cnJlbnQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmdldFByZXZOdW0gPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcbiAgICAgICAgXHRjdXJyZW50LS07XHJcbiAgICAgICAgXHRyZXR1cm4gKGN1cnJlbnQgPCAwID8gdGhpcy50b3RhbCAtIDEgOiBjdXJyZW50KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5hbmltYXRpb25Eb25lID0gZnVuY3Rpb24oYXJyKSB7XHJcblx0XHRcdHZhciAkdGhhdCA9IHRoaXM7XHJcblx0XHRcdFByb21pc2UuYWxsKGFycikudGhlbihmdW5jdGlvbihyZXN1bHRzKSB7XHJcblx0XHRcdCAgXHQkdGhhdC5mbGFnID0gdHJ1ZTtcclxuXHRcdFx0ICBcdGNvbnNvbGUubG9nKCdhaW1hdGlvbiBkb25lJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdHRoaXMuZ2VuSXRlbXMoKTtcclxuXHJcblx0XHRcdGlmKHRoaXMuc2xpZGVySXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG5cdFx0XHR0aGlzLmdlbkhUTUwoKS50aGVuKGZ1bmN0aW9uKHNsaWRlcikge1xyXG5cclxuXHRcdFx0XHRzbGlkZXIuc2xpZGVyUm9vdC5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfbG9hZGVkJyk7XHJcblxyXG5cdFx0XHRcdHNsaWRlci5hbmltYXRpb25Eb25lKFtcclxuXHRcdFx0XHRcdHNsaWRlci5jaGFuZ2VTbGlkZShzbGlkZXIuY3VycmVudEl0ZW1OdW0sICduZXh0JyksXHJcblx0XHRcdFx0XHRzbGlkZXIuY2hhbmdlU2xpZGUoc2xpZGVyLmN1cnJlbnRJdGVtTnVtLCAncHJldicpLFxyXG5cdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZVBpYyhzbGlkZXIuY3VycmVudEl0ZW1OdW0sIHNsaWRlci5ibG9ja1BpY0FjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdFx0c2xpZGVyLnNldEFjdGl2ZVBpYyhzbGlkZXIuY3VycmVudEl0ZW1OdW0sIHNsaWRlci5ibG9ja1BpY0Rpc2FjdGl2ZUl0ZW0pXHRcdFx0XHRcdFxyXG5cdFx0XHRcdF0pO1xyXG5cclxuXHRcdFx0XHRzbGlkZXIuc2V0QWN0aXZlSW5mbyhzbGlkZXIuY3VycmVudEl0ZW1OdW0pO1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZygncmVhZHknKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH07XHJcblxyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBpIGluIHNsaWRlcikge1xyXG5cdFx0aWYodHlwZW9mICBzbGlkZXJbaV0gIT0gJ29iamVjdCcpIGNvbnRpbnVlO1xyXG5cdFx0dmFyIHMgPSBuZXcgU2xpZGVyKHNsaWRlcltpXSk7XHJcblx0XHRzLmluaXQoKTtcclxuXHR9XHJcblxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
