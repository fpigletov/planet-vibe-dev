'use strict';

import { homeSlider } from './components/sliders';
import { checkoutLogic } from './components/checkout';
import { uploadFromDB } from './components/upload';
import { modal } from './components/modules';
import { loadingModals } from './components/modules';
import { searchLogic } from './components/search';
import { blocksAnimation } from './components/animation';

window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const wrapper = document.querySelector('.wrapper');
    const headerItems = document.querySelectorAll('.header__item');
    const headerMenu = document.querySelector('.header__navbar');
    const burgerBtn = document.querySelector('.header__burger');
    const headerUserBtn = document.querySelector('.header__user');
    const headerSearchBtn = document.querySelector('.header__search');
    const headerIcons = document.querySelector('.header__icons');
    const headerCart = document.querySelector('.header__cart');
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    const home = document.querySelector('.home');
    const about = document.querySelector('.about');
    const products = document.querySelector('.products');
    const packages = document.querySelector('.packages');
    const reviews = document.querySelector('.reviews');
    const blog = document.querySelector('.blog');
    const scrollWidth = window.innerWidth - wrapper.offsetWidth + 'px';  
    const elems = document.body.querySelectorAll('*');    
    const heasderMenuElems = headerMenu.querySelectorAll('*');

    //Animation
    blocksAnimation();

    //Header 
    function activeHeader() {
        if (window.scrollY > (window.innerHeight * 2)) {
			header.classList.add('active');
		} else {
			header.classList.remove('active');
		}		
    }

    window.addEventListener('scroll', activeHeader);

    function headerMenuActions() {
        if (headerMenu.classList.contains('active')) {
            document.body.style.paddingRight = scrollWidth;
            header.style.paddingRight = scrollWidth;
        } else {
            document.body.style.paddingRight = '';
            header.style.paddingRight = '';
        }
    }

    burgerBtn.addEventListener('click', () => {
        let duration = 1;
        headerMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
        document.body.classList.toggle('overflow-active');

        headerMenuActions();

        headerItems.forEach(item => {
            item.classList.toggle('header-item-active');
            duration += 0.2;
            item.style.animationDuration = duration + 's';
        });
        
        headerIcons.classList.toggle('header-item-active');
        headerIcons.style.animationDuration = '2.4s';
            
        let burgerAL = burgerBtn.getAttribute('aria-label');
        burgerAL === 'Open menu' ? burgerBtn.setAttribute('aria-label', 'Close menu') : burgerBtn.setAttribute('aria-label', 'Open menu');
    });

    function removeMenuAnimation() {
        if (headerIcons.classList.contains('header-item-active')) {
            headerIcons.classList.remove('header-item-active');
        }
        
        headerItems.forEach(item => {
            if (item.classList.contains('header-item-active')) {
                item.classList.remove('header-item-active');
            }
        });

        if (document.body.classList.contains('overflow-active')) {            
            document.body.classList.remove('overflow-active');
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            if (burgerBtn.classList.contains('active')) {
                burgerBtn.classList.remove('active');
            }

            if (headerMenu.classList.contains('active')) {
                headerMenu.classList.remove('active');
            }

            headerMenuActions();

            removeMenuAnimation();
        }
    });

     //Smooth Scroll
    function smoothScroll(element) {
        let elementTopOffset = 0;

        if (viewportWidth > 480) {
            elementTopOffset = element.offsetTop - 70;
        } else {
            elementTopOffset = element.offsetTop - 65;
        }

        window.scroll({
            left: 0,
            top: elementTopOffset,
            behavior: 'smooth'
        });
    }

    function removeClasses() {
        if (headerMenu.classList.contains('active')) {
            headerMenu.classList.remove('active');        
        }

        if (burgerBtn.classList.contains('active')) {
            burgerBtn.classList.remove('active');       
        }

        if (document.body.classList.contains('overflow-active')) {            
            document.body.classList.remove('overflow-active');
        }
    }

    document.addEventListener('click', (e) => {
        const target = e.target;
        
        //Burger Menu        
        if (headerMenu.classList.contains('active') || burgerBtn.classList.contains('active')) {            
            if (!target.closest('.header__burger') && !target.closest('.header__navbar')) {
                headerMenu.classList.remove('active');
                burgerBtn.classList.remove('active');

                removeMenuAnimation();

                headerMenuActions();
            }
        } 
        
        //Smooth Scroll
        if (target.classList.contains('home-link')) {            
            e.preventDefault();
            removeClasses();
            smoothScroll(home);
            headerMenuActions();
        }

        if (target.classList.contains('about-link')) {            
            e.preventDefault();
            removeClasses();
            smoothScroll(about);
            headerMenuActions();
            document.querySelector('.about__btn').focus();
        }

        if (target.classList.contains('products-link')) {            
            e.preventDefault();
            removeClasses();
            smoothScroll(products);
            headerMenuActions();
            document.querySelector('.item-products__btn').focus();
        }

        if (target.classList.contains('packages-link')) {            
            e.preventDefault();
            removeClasses();
            smoothScroll(packages);
            headerMenuActions();
            document.querySelector('.item-packages__btn').focus();
        }

        if (target.classList.contains('reviews-link')) {            
            e.preventDefault();
            removeClasses();
            smoothScroll(reviews);
            headerMenuActions();
        }

        if (target.classList.contains('blog-link')) {            
            e.preventDefault();
            removeClasses();
            smoothScroll(blog);
            headerMenuActions();
            document.querySelector('.item-blog__btn').focus();
        }

        if (target.classList.contains('header__user') || target.classList.contains('header__search')) {            
            e.preventDefault();
            removeClasses();
        }
    });

    //Header Dinamic Adaptiv
    function dinamicAdaptiv() {
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
        if (viewportWidth <= 480) {            
            headerIcons.append(headerUserBtn, headerSearchBtn);
        } else {
            headerCart.before(headerUserBtn);
            headerCart.after(headerSearchBtn);
        }
    }
    
    window.addEventListener('load', () => {
        dinamicAdaptiv();        
        activeHeader();
    });

    window.addEventListener('resize', dinamicAdaptiv);

    //Search Modal
    modal('header__search', '.modal__search');
    searchLogic();

    //Ask a question Modal
    modal('ask-link', '.modal__ask');

    //login Modal
    modal('login-link', '.modal__login'); 

    //Checkout Modal
    modal('checkout-link', '.modal__checkout'); 

    //Adventures Modal
    modal('open-adventures-btn', '.modal__content');

    //Packages Modal
    modal('item-packages__btn', '.modal__content');

    //Blog Modal
    modal('item-blog__btn', '.modal__content');

    //About Modal
    modal('about__btn', '.modal__content');

    //Product Modal
    modal('show-product', '.product-modal');

    //Loading Modals
    loadingModals();

    //Home Slider
    homeSlider();

    //Load from DB
    uploadFromDB();

    //Checkout
    checkoutLogic();

    //Checkout Select
    const select = document.querySelector('.form-modal__select');
    const choices = new Choices(select, {
        shouldSort: false,
        position: 'bottom',
        searchEnabled: false,
    });
});







