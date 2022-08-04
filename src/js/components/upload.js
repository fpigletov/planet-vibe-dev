'use strict';

export function uploadFromDB() {

    const adventuresBody = document.querySelector('.adventures__wrapper');
    const productsBody = document.querySelector('.products__wrapper');
    const packagesBody = document.querySelector('.packages__wrapper');
    const reviewsBody = document.querySelector('.reviews__wrapper');
    const blogBody = document.querySelector('.blog__wrapper');

    //Adventures
    function loadingAdventures() {
        fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
            .then(response => response.json())
            .then((data) => {

                adventuresBody.innerHTML = '';

                for (let i = 0; i < data.adventures.length; i++) {
                    
                    let advItem = data.adventures[i];
                    
                    adventuresBody.innerHTML += `
                        <article data-adv-id="${advItem.id}" class="adventures__item item-adventures">
                            <div class="item-adventures__image">
                                <picture>
                                    <source srcset="${advItem.mainImageWebp}" type="image/webp">
                                    <img loading="lazy" src="${advItem.mainImageJpg}" alt="${advItem.mainImageAlt}">
                                </picture>
                            </div>
                            <div class="item-adventures__content">
                                <a href="#" class="item-adventures__title open-adventures-btn">${advItem.title}</a>
                                <p class="item-adventures__descr">${advItem.descr}</p>
                                <button type="button" class="item-adventures__btn btn open-adventures-btn">Read more</button>
                            </div>
                        </article>
                    `;
                }

                ScrollTrigger.refresh();
            })
            .catch(err => alert(err));
    }

    if (adventuresBody) {
        loadingAdventures();
    }

    //Products
    function loadingProducts() {
        fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
            .then(response => response.json())
            .then((data) => {

                productsBody.innerHTML = '';

                for (let i = 0; i < data.products.length; i++) {
                    
                    let prodItem = data.products[i];
                    
                    productsBody.innerHTML += `
                        <li data-prod-id="${prodItem.id}" class="products__item item-products swiper-slide">
                            <div class="item-products__image">
                                <picture>
                                    <source srcset="${prodItem.mainImageWebp}" type="image/webp">
                                    <img loading="lazy" src="${prodItem.mainImageJpg}" alt="${prodItem.mainImageAlt}">
                                </picture>                        
                                <div class="item-products__icons">
                                    <button data-prod-id="${prodItem.id}" type="button" class="item-products__btn icon-cart add-btn" aria-label="Add to cart"></button>
                                    <button data-prod-id="${prodItem.id}" type="button" class="item-products__btn show-product icon-eye" aria-label="Show Product"></button>                            
                                </div>
                            </div>                         
                            <div class="item-products__content">
                                <h3 class="item-products__title">${prodItem.title}</h3>
                                <div class="item-products__footer">
                                    <div class="item-products__price">$${prodItem.price}</div>
                                    <div class="item-products__stars">
                                        <span class="${Object.values(prodItem.icons)[0]}"></span>
                                        <span class="${Object.values(prodItem.icons)[1]}"></span>
                                        <span class="${Object.values(prodItem.icons)[2]}"></span>
                                        <span class="${Object.values(prodItem.icons)[3]}"></span>
                                        <span class="${Object.values(prodItem.icons)[4]}"></span>
                                    </div>
                                </div>
                            </div>                            
                        </li>
                    `;
                }
                ScrollTrigger.refresh();
            })
            .catch(err => alert(err));
    }

    if (productsBody) {
        loadingProducts();
    }

    //Packages
    function loadingPackages() {
        fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
            .then(response => response.json())
            .then((data) => {
                
                packagesBody.innerHTML = '';

                for (let i = 0; i < data.packages.length; i++) {
                    
                    let packItem = data.packages[i];
                    
                    packagesBody.innerHTML += `
                        <article data-pack-id="${packItem.id}" class="packages__item item-packages">
                            <div class="item-packages__image">
                                <picture>
                                    <source srcset="${packItem.mainImageWebp}" type="image/webp">
                                    <img loading="lazy" src="${packItem.mainImageJpg}" alt="${packItem.mainImageAlt}">
                                </picture>
                            </div>
                            <div class="item-packages__content">
                                <h4 class="item-packages__title">${packItem.title}</h4>
                                <p class="item-packages__descr">${packItem.descr}</p>
                                <span class="item-packages__price">$${packItem.price}</span>
                                <button type="button" class="item-packages__btn btn">Explore now</button>
                            </div>
                        </article>
                    `;
                }

                ScrollTrigger.refresh();
            })
            .catch(err => alert(err));
    }

    if (packagesBody) {
        loadingPackages();
    }


    //Reviews
    function loadingReviews() {
        fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
            .then(response => response.json())
            .then((data) => {
                
                reviewsBody.innerHTML = '';

                for (let i = 0; i < data.reviews.length; i++) {
                    
                    let revItem = data.reviews[i];
                    
                    reviewsBody.innerHTML += `
                        <li data-rev-id="${revItem.id}" class="reviews__item item-reviews swiper-slide">
                            <p class="item-reviews__text">${revItem.text}</p>
                            <div class="item-reviews__user">
                                <div class="item-reviews__image">
                                    <picture>
                                        <source srcset="${revItem.mainImageWebp}" type="image/webp">
                                        <img loading="lazy" src="${revItem.mainImageJpg}" alt="${revItem.mainImageAlt}">
                                    </picture>                            
                                </div>
                                <div class="item-reviews__info">
                                    <h3 class="item-reviews__name">${revItem.name}</h3>
                                    <span class="item-reviews__date">${revItem.date}</span>  
                                </div>
                            </div>
                        </li>
                    `;
                }

                ScrollTrigger.refresh();
            })
            .catch(err => alert(err));
    }

    if (reviewsBody) {
        loadingReviews();
    }

    //Blog
    function loadingBlog() {
        fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
            .then(response => response.json())
            .then((data) => {
                
                blogBody.innerHTML = '';

                for (let i = 0; i < data.blog.length; i++) {
                    
                    let blogItem = data.blog[i];
                    
                    blogBody.innerHTML += `
                        <article data-blog-id="${blogItem.id}" class="blog__item item-blog swiper-slide">
                            <div class="item-blog__image">
                                <picture>
                                    <source srcset="${blogItem.mainImageWebp}" type="image/webp">
                                    <img loading="lazy" src="${blogItem.mainImageJpg}" alt="${blogItem.mainImageAlt}">
                                </picture>
                                <div class="item-blog__icons">
                                    <span class="item-blog__icon icon-calendar">${blogItem.date}</span>
                                    <span class="item-blog__icon icon-user-2">${blogItem.user}</span>
                                </div>
                            </div>                               
                            <div class="item-blog__content">
                                <h4 class="item-blog__title">${blogItem.title}</h4>                        
                                <button type="button" class="item-blog__btn btn">Read more</button>
                            </div>
                        </article>
                    `;
                }

                ScrollTrigger.refresh();
            })
            .catch(err => alert(err));
    }

    if (blogBody) {
        loadingBlog();
    }
}