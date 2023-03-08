'use strict';

//Modals 
export function modal(triggerElement, contentSelector) {
    
        const modal = document.querySelector('.modal');
        const header = document.querySelector('.header');
        const wrapper = document.querySelector('.wrapper');
        const modalCloseBtn = modal.querySelector('.modal__close');
        const modalContent = modal.querySelector(contentSelector);                    
        const scrollWidth = window.innerWidth - wrapper.offsetWidth + 'px';
        const resultsBody = document.querySelector('.search-modal__results');
        let lastFocusedEl;

        const openModal = () => {
            modal.classList.add('active');
            modalContent.classList.add('active');
            modalContent.scrollTop = 0;
            document.body.style.overflow = 'hidden';            
            lastFocusedEl = document.activeElement;

            Array.from(document.body.children).forEach(item => {
                if (item !== modal) {
                    item.inert = true;
                }
            });        

            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                document.body.style.paddingRight = '';
                header.style.paddingRight = '';
            } else {
                document.body.style.paddingRight = scrollWidth;
                header.style.paddingRight = scrollWidth;
            }
        };

        const closeModal = () => { 
            modal.classList.remove('active');
            modalContent.scrollTop = 0;
            modalContent.classList.remove('active');
            document.body.style.overflow = '';   
            document.body.style.paddingRight = 0;
            header.style.paddingRight = 0;

            if (resultsBody) {
                resultsBody.innerHTML = '';
            }

            Array.from(document.body.children).forEach(item => {
                if (item !== modal) {
                    item.inert = false;
                }
            });
        };

        document.addEventListener('click', (e) => {
            const target = e.target;


            if (target.classList.contains(triggerElement)) {
                e.preventDefault(); 
                openModal();
            }

            if (e.target === modal && modal.classList.contains('active') &&
                modalContent.classList.contains('active')) {
                closeModal();
                lastFocusedEl.focus();
            }

            if (target.classList.contains('to-products')) {             
                closeModal();
                document.querySelector('.item-products__btn').focus();
            }

            if (target.classList.contains('products-link')) {            
                e.preventDefault();
                closeModal();
                document.querySelector('.item-products__btn').focus();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('active') && modalContent.classList.contains('active')) {
                closeModal();
                lastFocusedEl.focus();
            }
        });
        
        modalCloseBtn.addEventListener('click', () => {
            if (modal.classList.contains('active') && modalContent.classList.contains('active')) {
                closeModal();
                lastFocusedEl.focus();
            }
        });
}

export function loadingModals() {

    const contentModal = document.querySelector('.modal__content');

    //Open Product Modal
    function openProductModal(id, imageJpg, imageWebp, alt, title, descr, key, value, stars, price) {
        const productImage = document.querySelector('.product-modal__image');
        const productStars = document.querySelector('.product-modal__stars');        
        const columnLeft = document.querySelector('.product-modal__column_left');        
        const columnRight = document.querySelector('.product-modal__column_right');        
        const productDescr = document.querySelector('.product-modal__descr');        
        const productBtn = document.querySelector('.product-modal__btn');        

        productImage.innerHTML = '';

        productImage.innerHTML = `
            <picture>
                <source srcset="${imageWebp}" type="image/webp">
                <img loading="lazy" src="${imageJpg}" alt="${alt}">
            </picture>
        `;
        
        document.querySelector('.product-modal__title').textContent = title;
        document.querySelector('.product-modal__price').textContent = price;

        productStars.innerHTML = '';
        
        for (let i = 0; i < stars.length; i++) {            
            productStars.innerHTML += `
                <span class="${stars[i].className}"></span>
            `;
        }

        columnLeft.innerHTML = '';
        columnRight.innerHTML = '';
        

        for (let j = 0; j < key.length; j++) {
            
            columnLeft.innerHTML += `
                <span>${key[j].textContent}</span>
            `;            
        }

        for (let l = 0; l < value.length; l++) {    
            columnRight.innerHTML += `
                <span>${value[l].textContent}</span>
            `;
        }
        
        productDescr.innerHTML = '';
        
        for (let k = 0; k < descr.length; k++) {

            productDescr.innerHTML += `
                <p>${descr[k].textContent}</p>
            `;

        }

        productBtn.classList.add('add-btn');
        productBtn.setAttribute('data-prod-id', id);
    }

    //Open Content Modal
    function openContentModal(imageJpg, imageWebp, alt, title, descr, addition) {
        contentModal.innerHTML = '';

        contentModal.innerHTML = `
            <div class="content-modal__wrapper" data-simplebar>
                <div class="content-modal__image">
                    <picture>
                        <source srcset="${imageWebp}" type="image/webp">
                        <img loading="lazy" src="${imageJpg}" alt="${alt}">
                    </picture>
                </div>
                <div class="content-modal__body">
                    <div class="content-modal__top">
                        <h3 class="content-modal__title">${title}</h3>
                        <span class="content-modal__addition">${addition ? addition : ''}</span> 
                    </div>
                    <p class="content-modal__descr">${descr}</p>
                </div>
            </div>
        `;
    }

    document.addEventListener('click', (e) => {
        const target = e.target;

        //Adventures Modal
        if (target.classList.contains('open-adventures-btn')) {            
            e.preventDefault();            
            
            const itemId = e.target.closest('.item-adventures').dataset.advId;
            const item = document.querySelector(`[data-adv-id="${itemId}"]`);  
            const itemImgJpg = item.querySelector('.item-adventures__image img').getAttribute('src');
            const itemImgWebp = item.querySelector('.item-adventures__image source').getAttribute('srcset');
            const itemImageAlt = item.querySelector('.item-adventures__image img').getAttribute('alt');

            const itemTitle = item.querySelector('.item-adventures__title').textContent;
            const itemText = item.querySelector('.item-adventures__text').textContent;
            
            openContentModal(itemImgJpg, itemImgWebp, itemImageAlt, itemTitle, itemText);  
                
        }

        //Packages Modal
        if (target.classList.contains('item-packages__btn')) {            
            e.preventDefault();            
            const itemId = e.target.closest('.item-packages').dataset.packId;
            const item = document.querySelector(`[data-pack-id="${itemId}"]`);  
            const itemImgJpg = item.querySelector('.item-packages__image img').getAttribute('src');
            const itemImgWebp = item.querySelector('.item-packages__image source').getAttribute('srcset');
            const itemImageAlt = item.querySelector('.item-packages__image img').getAttribute('alt');
            const itemTitle = item.querySelector('.item-packages__title').textContent;
            const itemText = item.querySelector('.item-packages__text').textContent;
            const itemPrice = item.querySelector('.item-packages__price').textContent;
            
            openContentModal(itemImgJpg, itemImgWebp, itemImageAlt, itemTitle, itemText, itemPrice);
        }

        //Blog Modal
        if (target.classList.contains('item-blog__btn')) {            
            e.preventDefault();            
            const itemId = e.target.closest('.item-blog').dataset.blogId;
            const item = document.querySelector(`[data-blog-id="${itemId}"]`);  
            const itemImgJpg = item.querySelector('.item-blog__image img').getAttribute('src');
            const itemImgWebp = item.querySelector('.item-blog__image source').getAttribute('srcset');
            const itemImageAlt = item.querySelector('.item-blog__image img').getAttribute('alt');
            const itemTitle = item.querySelector('.item-blog__title').textContent;
            const itemText = item.querySelector('.item-blog__descr').textContent;
            const itemDate = item.querySelector('.item-blog__icon.icon-calendar').textContent;
            
            openContentModal(itemImgJpg, itemImgWebp, itemImageAlt, itemTitle, itemText, itemDate);
                
        }

        //About
        if (target.classList.contains('about__btn')) {            
            e.preventDefault(); 

            const itemImgJpg = document.querySelector('.about__image img').getAttribute('src');
            const itemImgWebp = document.querySelector('.about__image source').getAttribute('srcset');
            const itemImageAlt = document.querySelector('.about__image img').getAttribute('alt');
            const itemTitle = document.querySelector('.about__title').textContent;
            const itemText = document.querySelector('.about__descr').textContent;            
            
            openContentModal(itemImgJpg, itemImgWebp, itemImageAlt, itemTitle, itemText);               
        }

        //Product Modal
        if (target.classList.contains('show-product')) { 
            e.preventDefault();     
            
            const itemId = e.target.dataset.prodId;
            const product = document.querySelector(`[data-prod-id="${itemId}"]`);
            const productImgJpg = product.querySelector('.item-products__image img').getAttribute('src');
            const productImgWebp = product.querySelector('.item-products__image source').getAttribute('srcset');
            const productImageAlt = product.querySelector('.item-products__image img').getAttribute('alt');
            const productTitle = product.querySelector('.item-products__title').textContent;
            const productDescr = product.querySelectorAll('.item-products__descr span');
            const productKeys = product.querySelectorAll('.spec-product__key');
            const productValue = product.querySelectorAll('.spec-product__value');
            const productStars = product.querySelectorAll('.item-products__stars span');
            const productPrice = product.querySelector('.item-products__price').textContent;
            
            
            openProductModal(itemId, productImgJpg, productImgWebp, productImageAlt, productTitle, productDescr, productKeys, productValue, productStars, productPrice);  
                
        }
    });
}