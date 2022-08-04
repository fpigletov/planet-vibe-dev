'use strict';

export function homeSlider() {
    new Swiper('.slider-home__body ', {  
        loop: true,
        grabCursor: true,
        setWrapperSize: false,
        speed: 1200,
        width: null, 
        parallax: true,
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

export function productsSlider() {
    new Swiper('.products__slider', {  
        loop: true,
        grabCursor: true,
        spaceBetween: 20,  
        speed: 800,
        watchSlidesProgress: true,
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

export function reviewsSlider() {
    new Swiper('.reviews__slider', {  
        loop: true, 
        grabCursor: true,
        spaceBetween: 20,
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
        spaceBetween: 20,   
        watchSlidesProgress: true,
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