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
    modalAuthor.init()
    typicalSilder.init();
    cartmobile.init();
    owl.init();
    orderProduct.init();
    homeSilder.init();
    homeSilderMobile.init();
    cartmobilev2.init();
    checkoutModal.init()
    megaMenuOverlay.init();
    modalOrderDetail.init();
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
                isExistSubmenu.slideToggle("slow");
            }
        })
    },
    subMenuMobileLv2: function() {
        const categoryLink = $(".menu__list-mobile .popover__submenu li > .category__link")
        categoryLink.bind("click", function (e) {
            const isExistSubmenu = $(this).parent().find(".submenu__item")
            if (isExistSubmenu.length !=0) {
                e.preventDefault();
                isExistSubmenu.slideToggle("slow", function () {
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
        })
        btnClose.add(modalOverlay).on('click', function(e) {
            modalOverlay.removeClass('list__overlay--show');
            listContent.removeClass('list__content--show');
            e.stopPropagation();
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
            $(this).css({"color": "#4f4f4f", "font-size": "16px","font-weight":"500"});
        })
    }
}

/* ============================= 11, Typical Slider============================= */
const typicalSilder = {
    init: function() {
        this.typicalSilder();
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
                    items: 3
                },
                1000: {
                    items: 6
                }
            },
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 300,
            nav: true,
            dots: true,
            navText: ["<img src='./assets/images/typical-book/prev.svg'>", "<img src='./assets/images/typical-book/next.svg'>"]
        })
    }
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
            e.preventDefault();
            $('#snackbar').addClass('show')
            setTimeout(function() { $('#snackbar').removeClass('show') }, 3000);
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
        overlay.css('height', wrap.height());
        menu.mouseover(function() {
            overlay.show();
        })
        menu.mouseout(function() {
            overlay.hide();
        })
    }
}
/* ============================= 21, modal orderDetail  ============================= */
const modalOrderDetail = {
    init: function() {
        this.orderDetail();
    },
    orderDetail:function() {
        $('.see').click(function(){
            $('.modal-orderDetail-ovelay').addClass('active');
            $('.modal-orderDetail').addClass('active');
            $('html').css({"overflow": "hidden"})
        })
        $('.orderDetail-content__close').click(function(){
            $('.modal-orderDetail-ovelay').removeClass('active');
            $('.modal-orderDetail').removeClass('active');
            $('html').css({"overflow": "unset"})

        })
        $('.modal-orderDetail-ovelay').click(function(){
            $(this).removeClass('active');
            $('.modal-orderDetail').removeClass('active');
            $('html').css({"overflow": "unset"})
        })
    }
}
