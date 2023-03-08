'use strict';

export function homeSlider() {
    new Swiper('.slider-home__body ', {  
        loop: true,
        grabCursor: true,
        setWrapperSize: false,
        speed: 1200,
        width: null, 
        parallax: true,
        autoplay: {
            delay: 5000,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        navigation: {
            nextEl: '.slider-home__arrow_next',
            prevEl: '.slider-home__arrow_prev',
        },  
    });
}

export function productSlider() {
    new Swiper('.products__slider', {  
        loop: true,
        grabCursor: true,
        spaceBetween: 20,  
        speed: 800,
        watchSlidesProgress: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.products__arrow_next',
            prevEl: '.products__arrow_prev',
        },  
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            480: {
                slidesPerView: 2.2,
            },
            768: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
}

export function reviewSlider() {
    new Swiper('.reviews__slider', {  
        loop: true, 
        grabCursor: true,
        spaceBetween: 20,
        speed: 800,
        autoplay: {
            delay: 5000,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        breakpoints: {
            0: {
            slidesPerView: 1.2,
            },
            520: {
            slidesPerView: 2.2,
            },
            992: {
            slidesPerView: 3,
            },
        },
    });
}

export function blogSlider() {
    new Swiper('.blog__slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        watchSlidesProgress: true,
        speed: 800,
        autoplay: {
            delay: 5000,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            576: {
                slidesPerView: 2.2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
}



