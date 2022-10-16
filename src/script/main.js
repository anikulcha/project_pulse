$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        adaptiveHeight: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-arrow.svg" alt="previous"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right-solid.svg" alt="nextuous"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
            
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleClass(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        }); 
    };

    toggleClass('.catalog-item__link')
    toggleClass('.catalog-item__back')

    // modal

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('fast')
    })
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut()
    })
    // $('.button_mini').on('click', function(){
    //     $('.overlay, #order').fadeIn('fast')
    // })
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal_descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast')
        })
    })

    // $('#consultation-form').validate();

    // $('#consultation form').validate({
    //     rules:{
    //         name: {
    //             required: true,
    //             minlength: 2,
    //         },
    //         phone: 'required',
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "имя..",
    //             minlength: jQuery.validator.format("введите {0} букав")
    //         },
    //         phone: "введи номер телефона", 
    //         email: {
    //           required: "Тебе необходимо ввести почту, по которой с тобой свяжутся",
    //           email: "нормально напиши"
    //         }
    //     }
    // });
    // $('#order form').validate();

    function validationForm(form) {
        $(form).validate({
            rules:{
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "имя..",
                    minlength: jQuery.validator.format("введите {0} букав")
                },
                phone: "введи номер телефона", 
                email: {
                  required: "Тебе необходимо ввести почту, по которой с тобой свяжутся",
                  email: "нормально напиши"
                }
            }
        });
    };

    validationForm('#consultation form');
    validationForm('#order form');
    validationForm('#consultation-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99")
    
    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/",
            data: $(this).serialize()
        }).done(function(){
            $(this.find("input").val(""));
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger(reset);
        });
        return false;
    })

    $(window).scroll(function(){
        if($(this).scrollTop() > 900){
            $('.pageUp').fadeIn('slow')
        } else $('.pageUp').fadeOut('slow')
    })

});