/*============================Menu Table===================
- 1, init
- 2, scroll
- 3, Menu Aim Master
*/
/* ============================= 1, init  ============================= */
$(document).ready(function () {
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

});

/* ============================= 2, Scroll ============================= */
const scroll = {
    init: function () {
        this.goToTop();
    },
    goToTop: function () {
        var btn = $('.scroll__to-top');
        $(window).scroll(function () {
            if ($(window).scrollTop() > 80) {
                btn.show();
            } else {
                btn.hide();
            }
        });
        btn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, '300');
        });
    }
}
 
/* ============================= 3, Menu Aim Master  ============================= */
const menuComponent = {
    init: function () {
        this.setupMenu()
        this.toggleCategory()
        this.subMenuMobile()
        this.mainMenuMobile()
    },
    setupMenu: function () {
        var $menu = $(".dropdown-menu");
        $menu.menuAim({
            activate: activateSubmenu,
            deactivate: deactivateSubmenu
        });
        function activateSubmenu(row) {
            console.log(row)
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
        $(".dropdown-menu li").click(function (e) {
            e.stopPropagation();
        });

        $('.menu__category .dropdown-menu').mouseleave(function () {
            $(".popover").css("display", "none");
            $("a.maintainHover").removeClass("maintainHover");
        })

        $('.menu__category .dropdown-menu > li').mouseenter(function (e) {
            activateSubmenu(e.currentTarget)
        })

        $(document).click(function () {
            $(".popover").css("display", "none");
            $("a.maintainHover").removeClass("maintainHover");
        });
    },
    toggleCategory: function() {
        const categoryBtn = $('.menu__category')
        categoryBtn.click(() => {
            categoryBtn.toggleClass('active')
        })
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
        const categoryLink = document.querySelectorAll('.menu__list-mobile .menu__list__wrap > li')
        categoryLink.forEach((item, index) => item.addEventListener('click', (e) => {
            e.preventDefault()
            item.classList.toggle('active')
        }))
    },
}

/* ============================= 4, Lazy Loading Image ============================= */
const lazy_load = {
    init:function(){
        this.lazy_loading();
    },
    lazy_loading: function(){
        $(document).ready(function(){
            const myLazyLoad = new LazyLoad({
                elements_selector: ".lazy",
                threshold: 0
            });
            myLazyLoad.update();
        })
    }
}

/* ============================= 5, Message reply ============================= */
const reply_comment ={
    init:function(){
        this.reply_comment();
    },
    reply_comment :function(){
        const click_reply = document.querySelectorAll(".comment-box .content__reply-name");
        const show_reply = document.querySelector(".comment-box .comment__reply");
        if(click_reply && show_reply){
            click_reply.forEach((item,index)=> item.addEventListener("click",() =>{
                show_reply.classList.toggle("active");
            }))
        }
    }
}

/* ============================= 5, Password show ============================= */
const password_show = {
    init:function(){
        this.show();
    },
    show: function(){
        $(".icon__small").bind("click", function () {
            let input = $(this).parent().find("input.nxb__pw");
            if(input.attr('type') === "password") {
                input.attr('type', 'text');
            } else {
                input.attr('type', 'password');
            }
        })
    }
}

/* ============================= 6, Author Modal ============================= */
const modalAuthor = {
    init:function(){
        this.showModal();
    },
    showModal: function() {
        const btnShow = $('.author-list__more-list');
        const modalOverlay = $('.list__overlay');
        const listContent = $('.list__content');
        const btnClose = $('.list__content-btn');
        btnShow.click(function(){
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

/* ============================= 7, quality Control ============================= */
const qualityControl = {
    init: function () {
      this.setupQuanlity('.js-qty-increase', '.js-qty-decrease', '.js-product-qty');
      this.setupQuanlity('.js-qty-increase-2', '.js-qty-decrease-2', '.js-product-qty-2')
    },
    setupQuanlity: function(increase, decrease, quality) {
      let value = 1
      const max = 12
      const min = 1
      const increaseBtn = document.querySelectorAll(increase)
      const decreaseBtn = document.querySelectorAll(decrease)
      const qualityView = document.querySelectorAll(quality)
      if (increaseBtn && decreaseBtn && qualityView) {
        increaseBtn.forEach((item, index) => item.addEventListener('click', () => {
          if (value < max) {
            value++
            qualityView[index].innerHTML = value
          }
        }))

        decreaseBtn.forEach((item, index) => item.addEventListener('click', () => {
          if (value > min) {
            value--
            qualityView[index].innerHTML = value
          }
        }))
      }
    },
  }

/* ============================= 8, active Choine  ============================= */
const optionsDetail = {
    init: function() {
      this.setupDetail('.category-li', '.category-li__item');
    },
    setupDetail: function(main, options) {
      const wrap = document.querySelector(main)
      if (wrap) {
        const optionsBtn = wrap.querySelectorAll(options)
        optionsBtn.forEach((item, index) => item.addEventListener('click', () => {
          optionsBtn.forEach(btn => btn.classList.remove('active'))
          item.classList.add('active')
        }))
      }
    }
  }

/* ============================= 8, checkout ============================= */
const checkout = {
    init:function(){
        this.count();
        this.tabPayment();
        this.clickSettime();
        this.removeProduct()
    },
    count: function() {
        $('.num-in .plus').click(function () {
            let number= $(this).closest('.num-in').attr('number-product');
            if(number==0){
                $(this).off('click');
            }else{
                let th = $(this).closest('.num-in').find('.in-num');    	
                th.val(+th.val() + 1);
            }	
          });
          $('.num-in .minus').click(function () {
            let number= $(this).closest('.num-in').attr('number-product');
            if(number==0){
                $(this).off('click');
            }else{
                let th = $(this).closest('.num-in').find('.in-num');    	
                if (th.val() > 1){
                    th.val(+th.val() - 1);
                }      
            }
        });
    },
    tabPayment:function(){
        $('.payment-group .paymentMethod .method').click(function(){
            $('.payment-group .paymentMethod .method').removeClass('active');
            $(this).addClass('active');
        })
    },
    clickSettime:function(){
        $('.click-show-dropdow').click(function(){
            $(this).find(".dropdow").toggleClass('active');
        })
        $('.click-show-dropdow .dropdow li').click(function(){
            $(this).parent().parent().find('.valua-time').attr("value", $(this).text());
        })
        
    },
    removeProduct:function(){
        $( ".section-checkout__left-item .left-item__delete" ).click(function() {

            $($(this).attr("data-id")).fadeOut( "slow", function() {
                  $($(this).attr("data-id")).remove();
            });
            $( this ).fadeOut( "slow", function() {
              $( this ).remove();
            });
        });
    }
}

/* ============================= 7, Typical Slider============================= */
const typicalSilder = {
    init:function(){
        this.typicalSilder();
    },
    typicalSilder: function() {
       $('.typical__slider').owlCarousel({
            loop:true,
            margin:30,
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:3
                },
                1000:{
                    items:6
                }
            },
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 300,
            nav:true,
            dots: true,
            navText: ["<img src='./assets/images/typical-book/prev.svg'>","<img src='./assets/images/typical-book/next.svg'>"]
        })
    }
}

/* ============================= 9, checkout cart-mb ============================= */
const cartmobile = {
    init:function(){
        this.clickbtn();
    },
    clickbtn:function(){
        $('.time-cart-mb').click(function(e){
            $(this).closest('.time-cart-mb').find('.modal-radio').addClass('active');
            e.stopPropagation();
        })
        $('.modal-radio__content-group').click(function(e){
            $(this).parents().find('.time-cart-mb').find('.valua-time').attr("value", $.trim($(this).text()));
            $('.modal-radio').removeClass('active');
            e.stopPropagation();
        })

    }
}

/* ============================= 8, Owl Slider============================= */
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

/* ============================= 9, Select 2 Filter Partner ============================= */
const select_2 = {
    init:function(){
        this.select2()
        this.select2Mobile()
    },
    select2:function(){
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
    select2Mobile: function(){
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

/* ============================= 10, checkout click order ============================= */
const orderProduct = {
    init:function(){
        this.clickOrder();
    },
    clickOrder:function(){
        $('.btn-order').click(function(e){
          e.preventDefault();
          $('#snackbar').addClass('show')
          setTimeout(function(){ $('#snackbar').removeClass('show') }, 3000);
        })
    }
}

/* ============================= 11, Home Slider ============================= */
const homeSilder = {
    init: function () {
        this.homeSlider();
    },
    homeSlider: function () {
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
            smartSpeed: 500,
            mouseDrag: true,
            nav: true,
            navText: ["<img src='./assets/images/home-slider/back.svg'>","<img src='./assets/images/home-slider/next.svg'>"],
            autoWidth: false,
            margin: 0,
        });
      $owl.trigger('refresh.owl.carousel');
    }
}

/* ============================= 12, Home Slider Mobile ============================= */
const homeSilderMobile = {
    init: function () {
        this.homeSliderMb();
    },
    homeSliderMb: function () {
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
