'use strict';

export function blocksAnimation() {

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
        markers: false
    });
    
    //Start
    gsap.from('.wrapper', {
        opacity: 0,
        delay: 0.5,
        duration: 2
    });

    
    
    function adaptiveAnimation(start) {

        //Home
        gsap.timeline({
            scrollTrigger: {
                trigger: '.home',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        }).fromTo('.home__content', {
            width: 0,
            height: 0,
            borderRadius: '100%',
            duration: 1,
            delay: 0.7,
        },
            {
                width: '100vw',
                height: '100vh',
                borderRadius: 0,
                duration: 1,
                delay: 0.7
            })
            .from('.header', {
                height: '100%',
                duration: 1
            }, '-=1')
            .from('.header__body', {
                scale: 0,
                opacity: 0,
                duration: 1,
                height: '100%'
            }, '-=1');
        
        //  Adventures        
        gsap.timeline({
            scrollTrigger: {
                trigger: '.main__adventures',
                start: start,
                end: 'center bottom',
                toggleActions: 'restart none none reverse'
            }
        }).from('.adventures__title', {
            duration: 1.5,
            opacity: 0,
            y: '300%',
        })
            .from('.adventures__wrapper', {
                duration: 1.5,
                opacity: 0,
                y: '50%'
            }, '-=1.5');

        //About
        gsap.timeline({
            scrollTrigger: {
                trigger: '.main__about',
                start: start,
                end: 'bottom bottom',
                toggleActions: 'restart none none reverse',
            }
        })
            .from('.about__image', {
                duration: 1.5,
                opacity: 0,
                x: '-200%',
            })
            .from('.about__content', {
                duration: 1.5,
                opacity: 0,
                x: '200%'
            }, '-=1.5');

        //Products
        gsap.timeline({
            scrollTrigger: {
                trigger: '.main__products',
                start: start,
                end: 'bottom bottom',
                toggleActions: 'restart none none reverse',
            }
        })
            .from('.products__title', {
                duration: 1.5,
                opacity: 0,
                y: '300%'
            
            })
            .from('.products__slider', {
                duration: 1.5,
                opacity: 0,
                y: '50%'
            }, '-=1.5')
            .from('.products__arrows', {
                duration: 1.5,
                opacity: 0,
                y: '1000%'
            }, '-=1.5');

        //Packages
        gsap.timeline({
            scrollTrigger: {
                trigger: '.main__packages',
                start: start,
                end: 'bottom bottom',
                toggleActions: 'restart none none reverse',
            }
        })    
        .from('.packages__title', {        
            duration: 1.5,
            opacity: 0,
            y: '300%'
            
        })
        .from('.packages__wrapper', {
            duration: 1.5,
            opacity: 0,
            y: '20%'
        }, '-=1.5');

        //Reviews
        gsap.timeline({
            scrollTrigger: {
                trigger: '.main__reviews',
                start: 'top 70%',
                end: 'bottom bottom',
                toggleActions: 'restart none none reverse',
                // scrub: 1,
            }
        })    
        .from('.reviews__title', {        
            duration: 1.5,
            opacity: 0,
            y: '300%'
            
        })
        .from('.reviews__wrapper', {
            duration: 1.5,
            opacity: 0,
            y: '50%'
        }, '-=1.5');

        //Subscribe
        gsap.timeline({
            scrollTrigger: {
                trigger: '.main__subscribe',
                start: 'top 70%',
                end: 'bottom bottom',
                toggleActions: 'restart none none reverse',
                // scrub: 1,
            }
        })    
        .from('.subscribe__title', {        
            duration: 1.5,
            opacity: 0,
            y: '300%'
            
        })
        .from('.subscribe__text', {
            duration: 1.5,
            opacity: 0,
            y: '200%'
        }, '-=1.2')
        .from('.subscribe__form', {
            duration: 1.5,
            opacity: 0,
            y: '200%'
        }, '-=0.9');

        //Blog
        gsap.timeline({
            scrollTrigger: {
                trigger: '.main__blog',
                start: 'top 70%',
                end: 'bottom bottom',
                toggleActions: 'restart none none reverse',
                // scrub: 1,
            }
        })    
        .from('.blog__title', {        
            duration: 1.5,
            opacity: 0,
            y: '300%'
            
        })
        .from('.blog__slider', {
            duration: 1.5,
            opacity: 0,
            y: '50%'
        }, '-=1.5');

        //Footer
        gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 70%',
                end: 'bottom bottom',
                toggleActions: 'restart none none reverse',
                // scrub: 1,
            }
        })    
            .from('.footer__column', {   
            stagger: 0.2,
            duration: 1.5,
            opacity: 0,
            y: '200%'
            
        })
        .from('.footer__credit', {
            duration: 1.5,
            opacity: 0,        
            y: '300%'
        }, '-=0.5');

    }
    
    ScrollTrigger.matchMedia({
        "(min-width: 993px)": function () {

            adaptiveAnimation('top center');

        },
        "(max-width: 992px)": function () {

            adaptiveAnimation('top 70%');
            
        }
    });        
}