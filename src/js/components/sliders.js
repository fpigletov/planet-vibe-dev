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



