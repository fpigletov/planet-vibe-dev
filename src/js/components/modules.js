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
            
            console.log(lastFocusedEl);
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
            console.log(lastFocusedEl);
        };

        document.addEventListener('click', (e) => {
            const target = e.target;


            if (target.classList.contains(triggerElement)) {
                e.preventDefault(); 
                openModal();
            }

            if (e.target === modal && modal.classList.contains('active') && modalContent.classList.contains('active')) {
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
    function openProductModal(id, imageJpg, imageWebp, alt, title, descr, spec, stars, price) {
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
        document.querySelector('.product-modal__price').textContent = '$' + price;

        productStars.innerHTML = '';
        
        for (let i = 0; i < Object.values(stars).length; i++) {

            productStars.innerHTML += `
                <span class="${Object.values(stars)[i]}"></span>
            `;
        }

        columnLeft.innerHTML = '';
        columnRight.innerHTML = '';

        for (let j = 0; j < Object.values(spec).length; j++) {

            columnLeft.innerHTML += `
                <span>${Object.keys(spec)[j]}:</span>
            `;

            columnRight.innerHTML += `
                <span>${Object.values(spec)[j]}</span>
            `;
        }
        
        productDescr.innerHTML = '';
        
        for (let k = 0; k < Object.values(descr).length; k++) {

            productDescr.innerHTML += `
                <p>${Object.values(descr)[k]}</p>
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

            fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
                .then(response => response.json())
                .then((data) => {
                    const item = data.adventures[itemId];
                    openContentModal(item.mainImageJpg, item.mainImageWebp, item.mainImageAlt, item.title, item.text);  
                })
                .catch(err => alert(err));
        }

        //Packages Modal
        if (target.classList.contains('item-packages__btn')) {            
            e.preventDefault();            
            const itemId = e.target.closest('.item-packages').dataset.packId;

            fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
                .then(response => response.json())
                .then((data) => {
                    const item = data.packages[itemId];
                    const price = '$' + item.price;
                    openContentModal(item.mainImageJpg, item.mainImageWebp, item.mainImageAlt, item.title, item.text, price);
                })
                .catch(err => alert(err));
        }

        //Blog Modal
        if (target.classList.contains('item-blog__btn')) {            
            e.preventDefault();            
            const itemId = e.target.closest('.item-blog').dataset.blogId;

            fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
                .then(response => response.json())
                .then((data) => {
                    const item = data.blog[itemId];
                    openContentModal(item.mainImageJpg, item.mainImageWebp, item.mainImageAlt, item.title, item.descr, item.date);  
                })
                .catch(err => alert(err));
        }

        //About
        if (target.classList.contains('about__btn')) {            
            e.preventDefault(); 

            fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
                .then(response => response.json())
                .then((data) => {
                    const item = data.about;
                    openContentModal(item.mainImageJpg, item.mainImageWebp, item.mainImageAlt, item.title, item.descr);  
                })
                .catch(err => alert(err));
        }

        //Product Modal
        if (target.classList.contains('show-product')) { 
            e.preventDefault();     
            
            const itemId = e.target.dataset.prodId;

            fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
                .then(response => response.json())
                .then((data) => {
                    const item = data.products[itemId];
                    openProductModal(item.id, item.mainImageJpg, item.mainImageWebp, item.mainImageAlt, item.title, item.descr, item.spec, item.icons, item.price);  
                })
                .catch(err => alert(err));
        }
    });
}