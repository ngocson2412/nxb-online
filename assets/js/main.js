/*============================Menu Table===================
- 1, init
- 2, scroll
- 3, Menu Aim Master
- 4, Lazy Loading Image
- 5, Message reply
- 6, Password show
- 7, Author Modal
- 8, quality Control
- 9, active Choine
- 10, checkout
- 11, Typical
- 12, checkout cart-mb
- 13, Owl Slider
- 14, Select 2 Filter Partner
- 15, checkout click order
- 16, Home Slider
- 17, Home Slider Mobile
- 18, checkout cart-mbv2
- 19, Checkout Modal
- 20, MegaMenu Modal
- 21, Fix Pagination 
- 23, Sweet Alert
- 24, FixScrollbarOpenCheckoutModal
- 25, FiX Input Control Mobile
*/
/* ============================= 1, init  ============================= */
$(document).ready(function() {
    scroll.init();
    menuComponent.init()
    lazy_load.init()
    select_2.init()
    reply_comment.init()
    password_show.init()
    modalAuthor.init();
    qualityControl.init();
    optionsDetail.init();
    checkout.init()
    typicalSilder.init();
    cartmobile.init();
    owl.init();
    orderProduct.init();
    homeSilder.init();
    homeSilderMobile.init();
    cartmobilev2.init();
    checkoutModal.init()
    megaMenuOverlay.init();
    readMorePayment.init();
    sweetAlert.init();
    fixScrollBarCheckout.init();
    viewmore.init();
    fixInputControlMobile.init();
});

/* ============================= 2, Scroll ============================= */
const scroll = {
    init: function() {
        this.goToTop();
    },
    goToTop: function() {
        var btn = $('.scroll__to-top');
        $(window).scroll(function() {
            if ($(window).scrollTop() > 80) {
                btn.show();
            } else {
                btn.hide();
            }
        });
        btn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, '300');
        });
    },
}

/* ============================= 3, Menu Aim Master  ============================= */
const menuComponent = {
    init: function() {
        this.setupMenu()
        this.toggleCategory()
        this.mainMenuMobile()
        this.subMenuMobile()
        this.subMenuMobileLv2()
    },
    setupMenu: function() {
        var $menu = $(".dropdown-menu");
        $menu.menuAim({
            activate: activateSubmenu,
            deactivate: deactivateSubmenu
        });

        function activateSubmenu(row) {
            var $row = $(row),
                submenuId = $row.data("submenuId"),
                $submenu = $("#" + submenuId),
                height = $menu.outerHeight(),
                width = $menu.outerWidth();

            $submenu.css({
                display: "block",
                top: -1,
                left: width - 3,
                height: height - 4
            });

            $row.find("a").addClass("maintainHover");
        }

        function deactivateSubmenu(row) {
            var $row = $(row),
                submenuId = $row.data("submenuId"),
                $submenu = $("#" + submenuId);

            $submenu.css("display", "none");
            $row.find("a").removeClass("maintainHover");
        }
        $(".dropdown-menu li").click(function(e) {
            e.stopPropagation();
        });

        $('.menu__category .dropdown-menu').mouseleave(function() {
            $(".popover").css("display", "none");
            $("a.maintainHover").removeClass("maintainHover");
        })

        // $('.menu__category .dropdown-menu > li').mouseenter(function(e) {
        //     activateSubmenu(e.currentTarget)
        // })

        $(document).click(function() {
            $(".popover").css("display", "none");
            $("a.maintainHover").removeClass("maintainHover");
        });
    },
    toggleCategory: function() {
        const categoryBtn = $('.menu__category');
        if(categoryBtn.hasClass('menu__index')) {
            categoryBtn.addClass('active');
        }
        else {
            categoryBtn.hover(() => {
                categoryBtn.toggleClass('active');
            })
        }
    },
    mainMenuMobile: function() {
        const body = document.querySelector('body')
        const menuBtn = document.querySelector('.header__button.menu')
        const menuWrap = document.querySelector('.menu__list-mobile')
        const menuOverlay = document.querySelector('.menu__list__overlay')
        if (menuBtn && menuOverlay) {
            menuBtn.addEventListener('click', () => {
                menuWrap.classList.add('active')
                body.classList.add('modal-open')
            })
            menuOverlay.addEventListener('click', () => {
                menuWrap.classList.remove('active')
                body.classList.remove('modal-open')
            })
        }
    },
    subMenuMobile: function() {
        const categoryLink = $(".menu__list-mobile .menu__list__wrap > li a")
        categoryLink.bind("click", function (e) {
            const isExistSubmenu = $(this).parent().find(".popover__submenu")
            if (isExistSubmenu.length !=0) {
                e.preventDefault();
                $(this).parent().toggleClass('active');
                isExistSubmenu.slideToggle("fast");
            }
        })
    },
    subMenuMobileLv2: function() {
        const categoryLink = $(".menu__list-mobile .popover__submenu li > .category__link")
        categoryLink.bind("click", function (e) {
            const isExistSubmenu = $(this).parent().find(".submenu__item")
            if (isExistSubmenu.length !=0) {
                e.preventDefault();
                isExistSubmenu.slideToggle("fast", function () {
                    if (isExistSubmenu.css('display') == 'none') {
                        $(this).parent().removeClass('active');
                    } else {
                        $(this).parent().addClass('active');
                    }
                })
            }
        })
    },
}

/* ============================= 4, Lazy Loading Image ============================= */
const lazy_load = {
    init: function() {
        this.lazy_loading();
    },
    lazy_loading: function() {
        $(document).ready(function() {
            const myLazyLoad = new LazyLoad({
                elements_selector: ".lazy",
                threshold: 0
            });
            myLazyLoad.update();
        })
    }
}

/* ============================= 5, Message reply ============================= */
const reply_comment = {
    init: function() {
        this.reply_comment();
    },
    reply_comment: function() {
        const click_reply = document.querySelectorAll(".comment-box .content__reply-name");
        const show_reply = document.querySelector(".comment-box .comment__reply");
        if (click_reply && show_reply) {
            click_reply.forEach((item, index) => item.addEventListener("click", () => {
                show_reply.classList.toggle("active");
            }))
        }
    }
}

/* ============================= 6, Password show ============================= */
const password_show = {
    init: function() {
        this.show();
    },
    show: function() {
        $(".icon__small").bind("click", function() {
            let input = $(this).parent().find("input.nxb__pw");
            if (input.attr('type') === "password") {
                input.attr('type', 'text');
            } else {
                input.attr('type', 'password');
            }
        })
    }
}

/* ============================= 7, Author Modal ============================= */
const modalAuthor = {
    init: function() {
        this.showModal();
    },
    showModal: function() {
        const btnShow = $('.author-list__more-list');
        const modalOverlay = $('.list__overlay');
        const listContent = $('.list__content');
        const btnClose = $('.list__content-btn');
        btnShow.click(function() {
            modalOverlay.addClass('list__overlay--show');
            listContent.addClass('list__content--show');
            $("body").addClass("modal-open");
        })
        btnClose.add(modalOverlay).on('click', function(e) {
            modalOverlay.removeClass('list__overlay--show');
            listContent.removeClass('list__content--show');
            e.stopPropagation();
            $("body").removeClass("modal-open");
        });
    }
}

/* ============================= 8, quality Control ============================= */
const qualityControl = {
    init: function() {
        this.setupQuanlity('.js-qty-increase-2', '.js-qty-decrease-2', '.js-product-qty-2')
    },
    setupQuanlity: function(increase, decrease, quality) {
        var minVal = 1,
            maxVal = 12;
        $(increase).on('click', function() {
            var $parentElm = $(this).parents(".option-wrap");

            var value = $parentElm.find(quality).val();
            if (value < maxVal) {
                value++;
            }
            $parentElm.find(quality).val(value);
        });
        // Decrease product quantity on cart page
        $(decrease).on('click', function() {
            var $parentElm = $(this).parents(".option-wrap");

            var value = $parentElm.find(quality).val();
            if (value > 1) {
                value--;
            }
            $parentElm.find(quality).val(value);
        });
    },
}

/* ============================= 9, active Choine  ============================= */
const optionsDetail = {
    init: function() {
        this.setupDetail('.category-li', '.category-li__item');
    },
    setupDetail: function(main, options) {
        const wrap = document.querySelector(main)
        if (wrap) {
            const optionsBtn = wrap.querySelectorAll(options)
            optionsBtn.forEach((item, index) => item.addEventListener('click', () => {
                item.classList.toggle('active')
            }))
        }
    }
}

/* ============================= 10, checkout ============================= */
const checkout = {
    init: function() {
        this.count();
        this.tabPayment();
        this.clickSettime();
        this.removeProduct();
        this.onchange();
    },
    count: function() {
        $('.num-in .plus').click(function() {
            let number = $(this).closest('.num-in').attr('number-product');
            if (number == 0) {
                $(this).off('click');
            } else {
                let th = $(this).closest('.num-in').find('.in-num');
                th.val(+th.val() + 1);
            }
        });
        $('.num-in .minus').click(function() {
            let number = $(this).closest('.num-in').attr('number-product');
            if (number == 0) {
                $(this).off('click');
            } else {
                let th = $(this).closest('.num-in').find('.in-num');
                if (th.val() > 1) {
                    th.val(+th.val() - 1);
                }
            }
        });
    },
    tabPayment: function() {
        $('.payment-group .paymentMethod .method').click(function() {
            $('.payment-group .paymentMethod .method').removeClass('active');
            $(this).addClass('active');
        })
    },
    clickSettime: function() {
        $('.click-show-dropdow').click(function() {
            $(this).find(".dropdow").toggleClass('active');
        })
        $('.click-show-dropdow .dropdow li').click(function() {
            let valuatext=$(this).find('.get-valua-text').text();
            let valuaNumber=$(this).find('.get-valua-number').attr('value');
            $(this).parent().parent().find('.valua-time').attr("value", $.trim(valuaNumber));
            $(this).parent().parent().find('.time-text').text($.trim(valuatext));
            if($(this).parent().parent().find('.adress')){
                $(this).parent().parent().find('.adress').addClass('active');
            }
        })

    },
    removeProduct: function() {
        $(".section-checkout__left-item .left-item__delete").click(function() {

            $($(this).attr("data-id")).fadeOut("slow", function() {
                $($(this).attr("data-id")).remove();
            });
            $(this).fadeOut("slow", function() {
                $(this).remove();
            });
        });
    },
    onchange:function(){
        $('.select-option').change(function(){
            $(this).css({"color": "#02010E", "font-size": "16px","font-weight":"500"});
        })
    }
}

/* ============================= 11, Typical Slider============================= */
const typicalSilder = {
    init: function() {
        this.typicalSilder();
        this.typicalBookSliderMb()
    },
    typicalSilder: function() {
        $('.typical__slider').owlCarousel({
            loop: true,
            margin: 30,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                },
                769: {
                    items: 4
                },
                1000: {
                    items: 6
                },
                1025: {
                    items: 5
                },
                1200: {
                    items: 6
                },
            },
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 300,
            nav: true,
            dots: true,
            navText: ["<img src='./assets/images/typical-book/prev.svg'>", "<img src='./assets/images/typical-book/next.svg'>"]
        })
    },
    typicalBookSliderMb: function() {
        $('.typical__book__carousel').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 300,
            margin: 20,
            responsive: {
                0: {
                    items: 2
                },
                425: {
                    items: 3
                },
            },
            nav: false,
            dots: false,
        })
    },
}

/* ============================= 12, checkout cart-mb ============================= */
const cartmobile = {
    init: function() {
        this.clickbtn();
    },
    clickbtn: function() {
        $('.time-cart-mb').click(function(e) {
            $(this).next().addClass('active');
            e.stopPropagation();
        })
        $('.modal-radio__content-group').click(function(e) {
            let valuaNum=$(this).find('.radio-input').attr('valua');
            let valuaText=$(this).find('.text').text();
            $(this).parents('.modal-radio').prev().find('.valua-time').attr("valua",$.trim(valuaNum));
            $(this).parents('.modal-radio').prev().find('.time-text').text($.trim(valuaText));
            $('.modal-radio').removeClass('active');
            e.stopPropagation();
        })
        $('.modal-radio').click(function() {
            $(this).removeClass('active');
        })
    }
}

/* ============================= 13, Owl Slider============================= */
const owl = {
    init: function() {
        this.latestNewsSlider();
    },
    latestNewsSlider: function() {
        $(".latest-news__body-box").owlCarousel({
            items: 1,
            responsive: {
                1200: {
                    item: 1
                },
                992: {
                    items: 1
                },
                768: {
                    items: 1
                },
                480: {
                    items: 1
                },
                0: {
                    items: 1
                }
            },
            loop: true,
            rewind: false,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 300,
            dots: false,
            dotsEach: false,
            nav: true,
            navText: ['<img src="assets/images/latest-news/left.svg">', '<img src="assets/images/latest-news/right.svg">'],
            autoWidth: false,
            margin: 20,
        });
    }
}

/* ============================= 14, Select 2 Filter Partner ============================= */
const select_2 = {
    init: function() {
        this.select2()
        this.select2Mobile()
    },
    select2: function() {
        $(document).ready(function() {
            var data = [];
            $(".mySelect").select2({
                data: data,
                dropdownParent: $(".box-select"),
                placeholder: 'Hà Nội',
                dropdownPosition: 'below',
            });
            $('#single').one('select2:open', function(e) {
                $('input.select2-search__field').prop('placeholder', 'Tìm tác giả theo tên');
            });
            $(".author-select").select2({
                dropdownParent: $(".author-type"),
                placeholder: 'Tìm tác giả theo tên',
                dropdownPosition: 'below',
            });
        });
    },
    select2Mobile: function() {
        const body = $('body')
        const filterBtn = $('#btn-filter')
        const filterBox = $('.filter__menu')
        const filterOverlay = $('.box-overlay')
        const cancleBtn = $('.filter__menu-icon')
        const closeBtn = $('.mobile__close')

        if (filterBtn && filterOverlay && cancleBtn && closeBtn) {
            filterBtn.click(() => {
                filterBox.addClass('active')
                body.addClass('modal-open')
            })
            filterOverlay.click(() => {
                filterBox.removeClass('active')
                body.removeClass('modal-open')
            })
            cancleBtn.click(() => {
                filterBox.removeClass('active')
                body.removeClass('modal-open')
            })
            closeBtn.click(() => {
                filterBox.removeClass('active')
                body.removeClass('modal-open')
            })
        }
    }
}

/* ============================= 15, checkout click order ============================= */
const orderProduct = {
    init: function() {
        this.clickOrder();
    },
    clickOrder: function() {
        $('.btn-order').click(function(e) {
            // e.preventDefault();
            // $('#snackbar').addClass('show')
            // setTimeout(function() { $('#snackbar').removeClass('show') }, 3000);
        })
    }
}

/* ============================= 16, Home Slider ============================= */
const homeSilder = {
    init: function() {
        this.homeSlider();
    },
    homeSlider: function() {
        var $owl = $(".home-slider__inner .owl-carousel").owlCarousel({
            items: 1,
            responsive: {
                1024: {
                    item: 1
                },
                991: {
                    items: 1
                },
                768: {
                    items: 1
                },
                320: {
                    items: 1
                },
                0: {
                    items: 1
                }
            },
            loop: true,
            rewind: false,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 600,
            mouseDrag: true,
            nav: true,
            navText: ["<img src='./assets/images/home-slider/back.svg'>", "<img src='./assets/images/home-slider/next.svg'>"],
            autoWidth: false,
            margin: 10,
        });
        $owl.trigger('refresh.owl.carousel');
    }
}

/* ============================= 17, Home Slider Mobile ============================= */
const homeSilderMobile = {
    init: function() {
        this.homeSliderMb();
    },
    homeSliderMb: function() {
        var $owl = $(".home-sliderMb__inner .owl-carousel").owlCarousel({
            items: 1,
            responsive: {
                1024: {
                    item: 1
                },
                991: {
                    items: 1
                },
                768: {
                    items: 1
                },
                320: {
                    items: 1
                },
                0: {
                    items: 1
                }
            },
            loop: true,
            lazyLoad: true,
            rewind: false,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 500,
            mouseDrag: true,
            nav: false,
            autoWidth: false,
            margin: 0,
        });
        $owl.trigger('refresh.owl.carousel');
    }
}
/* ============================= 18, checkout cart-mbv2 ============================= */
const cartmobilev2 = {
    init: function() {
        this.countmb();
    },
    countmb: function() {
        let elementNum = $('.num-in')
        for (let i = 0; i < elementNum.length; i++) {
            if ($(elementNum[i]).attr('number-product') == 0) {
                $(elementNum[i]).addClass('hide');
                $(elementNum[i]).find('.in-num').attr('disabled', true);
                $(elementNum[i]).parents('.left-item__desc-item');
                if ($(elementNum[i]).parents('.left-item__desc-item')) {
                    $(elementNum[i]).parents('.left-item__desc-item').find('span.color-33').addClass('colorHide');
                }
            }
        }
    }
}
/* ============================= 19, Checkout Modal  ============================= */
const checkoutModal = {
    init: function() {
        this.setupModal()
    },
    setupModal: function() {
        const modal = $('.checkout__modal__wrapper')
        const openModal = $('.js-checkout-modal-open')
        const overlay = $('.checkout__modal__wrapper .checkout__modal__overlay')
        const closeModal = $('.checkout__modal__wrapper .checkout__modal__close')

        openModal.click(() => {
            modal.addClass('active')
        })
        overlay.click(() => {
            modal.removeClass('active')
        })
        closeModal.click(() => {
            modal.removeClass('active')
        })
    },
}
/* ============================= 20, MegaMenu Overlay  ============================= */
const megaMenuOverlay = {
    init: function() {
        this.overlayMega();
    },
    overlayMega:function() {
        const wrap = $('.wrapper');
        const menu = $('.dropdown-menu');
        const overlay = $('.menu__component-overlay');
        const menuBtn = $('.menu__category');
        overlay.css('height', wrap.height());
        menu.mouseover(function() {
            overlay.show();
        })
        menu.mouseout(function() {
            overlay.hide();
        })
        menuBtn.mouseover(function() {
            overlay.show();
        })
        menuBtn.mouseout(function() {
            overlay.hide();
        })
    }
}
 /* ============================= 21, Read More Payment  ============================= */
 const readMorePayment = {
     init:function(){
         this.readMorePayment();
     },
     readMorePayment:function(){
        const moreRead = document.querySelector('.content-more');
        const clickBtn = document.querySelector('.load-more-btn');
        const opt = document.querySelector('.btn_readmore');
        const detailBtn = $('.btn-readmore__detail');
        if(moreRead && clickBtn && opt){
            clickBtn.addEventListener('click',()=>{
                moreRead.classList.toggle('load-more-active');
                var hClass = $(moreRead).hasClass('load-more-active');
                console.log(hClass)
                if(!hClass){
                    clickBtn.innerHTML = 'Thu Gọn <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3541 11.3541C14.3076 11.4006 14.2525 11.4376 14.1917 11.4628C14.131 11.488 14.0659 11.501 14.0001 11.501C13.9343 11.501 13.8692 11.488 13.8084 11.4628C13.7477 11.4376 13.6925 11.4006 13.6461 11.3541L8.00008 5.70708L2.35408 11.3541C2.3076 11.4006 2.25241 11.4374 2.19167 11.4626C2.13093 11.4878 2.06583 11.5007 2.00008 11.5007C1.93434 11.5007 1.86924 11.4878 1.8085 11.4626C1.74776 11.4374 1.69257 11.4006 1.64608 11.3541C1.5996 11.3076 1.56272 11.2524 1.53756 11.1917C1.5124 11.1309 1.49945 11.0658 1.49945 11.0001C1.49945 10.9343 1.5124 10.8692 1.53756 10.8085C1.56272 10.7478 1.5996 10.6926 1.64608 10.6461L7.64608 4.64608C7.69253 4.59952 7.74771 4.56258 7.80845 4.53737C7.8692 4.51216 7.93432 4.49919 8.00008 4.49919C8.06585 4.49919 8.13097 4.51216 8.19172 4.53737C8.25246 4.56258 8.30764 4.59952 8.35408 4.64608L14.3541 10.6461C14.4006 10.6925 14.4376 10.7477 14.4628 10.8084C14.488 10.8692 14.501 10.9343 14.501 11.0001C14.501 11.0659 14.488 11.131 14.4628 11.1917C14.4376 11.2525 14.4006 11.3076 14.3541 11.3541Z" fill="white"/></svg>';
                    opt.classList.remove('active');
                }else{
                    $(clickBtn).html(`Xem đầy đủ <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.64592 4.64592C1.69236 4.59935 1.74754 4.56241 1.80828 4.5372C1.86903 4.512 1.93415 4.49902 1.99992 4.49902C2.06568 4.49902 2.13081 4.512 2.19155 4.5372C2.2523 4.56241 2.30747 4.59935 2.35392 4.64592L7.99992 10.2929L13.6459 4.64592C13.6924 4.59943 13.7476 4.56255 13.8083 4.53739C13.8691 4.51223 13.9342 4.49929 13.9999 4.49929C14.0657 4.49929 14.1308 4.51223 14.1915 4.53739C14.2522 4.56255 14.3074 4.59943 14.3539 4.64592C14.4004 4.6924 14.4373 4.74759 14.4624 4.80833C14.4876 4.86907 14.5005 4.93417 14.5005 4.99992C14.5005 5.06566 14.4876 5.13076 14.4624 5.1915C14.4373 5.25224 14.4004 5.30743 14.3539 5.35392L8.35392 11.3539C8.30747 11.4005 8.2523 11.4374 8.19155 11.4626C8.1308 11.4878 8.06568 11.5008 7.99992 11.5008C7.93415 11.5008 7.86903 11.4878 7.80828 11.4626C7.74754 11.4374 7.69236 11.4005 7.64592 11.3539L1.64592 5.35392C1.59935 5.30747 1.56241 5.2523 1.5372 5.19155C1.512 5.13081 1.49902 5.06568 1.49902 4.99992C1.49902 4.93415 1.512 4.86903 1.5372 4.80828C1.56241 4.74754 1.59935 4.69236 1.64592 4.64592Z" fill="white"/></svg>`); 
                    opt.classList.add('active');
                }
            })
        }
        detailBtn.click(function() {
            if(!$(this).hasClass('active')) {
                $(this).css('top', '-44px');
            }
            if($(this).hasClass('active')) {
                $(this).css('top', '-75px');
            }
        })
     }
 }

/* ============================= 23, sweet Alert  ============================= */
const sweetAlert = {
    init:function() {
        this.alertPopUp();
        this.toastMessage();
    },
    alertPopUp:function() {
        $('.btn-alert').click(function() {
            var data = $(this).data('class');
            $(data).closest('.alert-modal-content').addClass('active');
            $('html').css({"overflow": "hidden"});
        })
        $('.close-modal').click(function(e){
            e.preventDefault();
            $('.alert-modal-content').removeClass('active');
            $('html').css({"overflow": "unset"});
            e.stopPropagation();
        })
        $('.alert-modal-content').click(function(){
            $('html').css({"overflow": "unset"});
            $(this).removeClass('active');
        })
        $('.alert-modal').click(function(e){
            e.stopPropagation()
        })
    },
    toastMessage:function() {
        $('.btn-toast-mess').click(function() {
            var data = $(this).data('class');
            $(data).closest('.toast-mess__wrap').addClass('active');
            setTimeout(function() { $(data).closest('.toast-mess__wrap').removeClass('active') }, 3000);
        })
    }
}
/* ============================= 24, FixScrollbarOpenCheckoutModal ============================= */
const fixScrollBarCheckout = {
    init:function() {
        this.fixScrollBar();
    },
    fixScrollBar:function() {
        var checkoutModal = $('.checkout__modal__wrapper');
        if(checkoutModal.hasClass('active')) {
            $("body").addClass("modal-open");
        } 
        checkoutModal.click(function(e) {
            if(!$(this).hasClass('active')) {
                $("body").removeClass('modal-open');
            }
        })
    }
}
/* ============================= 25, viewmore ============================= */
const viewmore = {
    init:function(){
        this.toggleviewmore();
    },
    toggleviewmore:function(){
        $(document).ready(function() {
            var partnerAuthor = $('.partner__author-resume');
            var partnerWraper = $('.partner__author-wrapper');
            $('[data-toggle="collapse"]').click(function() {
                partnerAuthor.toggleClass('show');
                partnerWraper.toggleClass('active');
              $(this).toggleClass( "active" );
              if ($(this).hasClass("active")) {
               $(this).html('Thu Gọn <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3541 11.3541C14.3076 11.4006 14.2525 11.4376 14.1917 11.4628C14.131 11.488 14.0659 11.501 14.0001 11.501C13.9343 11.501 13.8692 11.488 13.8084 11.4628C13.7477 11.4376 13.6925 11.4006 13.6461 11.3541L8.00008 5.70708L2.35408 11.3541C2.3076 11.4006 2.25241 11.4374 2.19167 11.4626C2.13093 11.4878 2.06583 11.5007 2.00008 11.5007C1.93434 11.5007 1.86924 11.4878 1.8085 11.4626C1.74776 11.4374 1.69257 11.4006 1.64608 11.3541C1.5996 11.3076 1.56272 11.2524 1.53756 11.1917C1.5124 11.1309 1.49945 11.0658 1.49945 11.0001C1.49945 10.9343 1.5124 10.8692 1.53756 10.8085C1.56272 10.7478 1.5996 10.6926 1.64608 10.6461L7.64608 4.64608C7.69253 4.59952 7.74771 4.56258 7.80845 4.53737C7.8692 4.51216 7.93432 4.49919 8.00008 4.49919C8.06585 4.49919 8.13097 4.51216 8.19172 4.53737C8.25246 4.56258 8.30764 4.59952 8.35408 4.64608L14.3541 10.6461C14.4006 10.6925 14.4376 10.7477 14.4628 10.8084C14.488 10.8692 14.501 10.9343 14.501 11.0001C14.501 11.0659 14.488 11.131 14.4628 11.1917C14.4376 11.2525 14.4006 11.3076 14.3541 11.3541Z" fill="white"/></svg>')
              } else {
                $(this).html('Xem đầy đủ <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.64592 4.64592C1.69236 4.59935 1.74754 4.56241 1.80828 4.5372C1.86903 4.512 1.93415 4.49902 1.99992 4.49902C2.06568 4.49902 2.13081 4.512 2.19155 4.5372C2.2523 4.56241 2.30747 4.59935 2.35392 4.64592L7.99992 10.2929L13.6459 4.64592C13.6924 4.59943 13.7476 4.56255 13.8083 4.53739C13.8691 4.51223 13.9342 4.49929 13.9999 4.49929C14.0657 4.49929 14.1308 4.51223 14.1915 4.53739C14.2522 4.56255 14.3074 4.59943 14.3539 4.64592C14.4004 4.6924 14.4373 4.74759 14.4624 4.80833C14.4876 4.86907 14.5005 4.93417 14.5005 4.99992C14.5005 5.06566 14.4876 5.13076 14.4624 5.1915C14.4373 5.25224 14.4004 5.30743 14.3539 5.35392L8.35392 11.3539C8.30747 11.4005 8.2523 11.4374 8.19155 11.4626C8.1308 11.4878 8.06568 11.5008 7.99992 11.5008C7.93415 11.5008 7.86903 11.4878 7.80828 11.4626C7.74754 11.4374 7.69236 11.4005 7.64592 11.3539L1.64592 5.35392C1.59935 5.30747 1.56241 5.2523 1.5372 5.19155C1.512 5.13081 1.49902 5.06568 1.49902 4.99992C1.49902 4.93415 1.512 4.86903 1.5372 4.80828C1.56241 4.74754 1.59935 4.69236 1.64592 4.64592Z" fill="white"/></svg>')
            }
            });     
            });
 }
}
/* ============================= 26, Fix Input Control Mobile ============================= */
const fixInputControlMobile = {
    init:function () {
        this.fixInputControlMobile();
    },
    fixInputControlMobile:function() {
        const input = $('.filter__menu-box .box-price__form .form-item .input-control');
        const menu = $('.filter__menu-box');
        input.focus(function() {
            $(".box__cancle-mobile").hide()
        })
        input.blur(function() {
            $(".box__cancle-mobile").show()
        })
    }
}
