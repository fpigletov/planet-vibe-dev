'use strict';

export function checkoutLogic() {

    //Products
    const cartList = document.querySelector('.cart-content__list');
    const cart = document.querySelector('.header__cart');
    const cartBtn = cart.querySelector('.cart-header__btn');
    const cartQuantity = cartBtn.querySelector('span');    
    const cartBody = document.querySelector('.header__cart');        
    const cartTotalPrice = document.querySelector('.cart-content__total span');
    const checkout = document.querySelector('.modal__checkout');    
    const checkoutContent = document.querySelector('.order-checkout'); 
    const modal = document.querySelector('.modal');
    const modalMessage = modal.querySelector('.modal__message'); 
    const header = document.querySelector('.header'); 

    // Local Storage
    function updateStorage() {
        let cartListContent = cartList.innerHTML;
        localStorage.setItem('planetCartProducts', cartListContent); 
    }

    function currentStorageState() {
        if (localStorage.getItem('planetCartProducts') !== null) {
            cartList.innerHTML = localStorage.getItem('planetCartProducts');
        }
    }

    currentStorageState();

    //Show Cart
    function showCart() {
        if (cartList.children.length > 0) {
            cartQuantity.classList.add('active');  
            cartBody.classList.add('active');
        } else {
            cartQuantity.classList.remove('active');  
            cartBody.classList.remove('active');
        }
    }

    //ShowCart Quantity
    function showCartQuantity() { 
        const cartProductQuantity = document.querySelectorAll('.cart-content__quantity span');  
        const cartItem = document.querySelector('.cart-content__item');
        let totalQuantity = 0;

        if (cartItem) {
            cartProductQuantity.forEach(item => {
                totalQuantity += +item.textContent;
            });

            cartQuantity.textContent = totalQuantity;

            showCart();
        }
    }

    showCartQuantity();

    function normalNumber(item) {
        return Number(item.replace(/\D/g, ''));
    }

    //Count Cart Total
    function countCartTotal() {  
        const cartProductPrice = document.querySelectorAll('.cart-content__price');
        const total = [];  
        
        cartProductPrice.forEach(item => {              
            total.push(normalNumber(item.textContent));
        });

        if (total.length > 0) {
            cartTotalPrice.textContent = '$' + (total.reduce((a, b) => a + b));
        }
    }

    countCartTotal();

    function generateCartItem(imgJpg, imgWebp, alt, title, price, id) {
        return `
            <li class="cart-content__item" data-cart-id="${id}">
                <div class="cart-content__image">
                    <picture>
                        <source srcset="${imgWebp}" type="image/webp">
                        <img loading="lazy" src="${imgJpg}" alt="${alt}">
                    </picture>  
                </div>
                <div class="cart-content__info">
                    <h4 class="cart-content__title">${title}</h4>
                    <span class="cart-content__price">$${price}</span>
                </div>
                <div class="cart-content__quantity"><span>1</span></div>
                <button type="button" class="cart-content__remove icon-trash" aria-label="Remove product"></button>
            </li>
        `;
    }

    // Add Product to Cart
    function addToCart(currentBtn, id, productAdd = true) {
    
        fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
            .then(response => response.json())
            .then((data) => {
                const item = data.products[id];
                
                const cartProduct = document.querySelector(`[data-cart-id="${id}"]`);             

                if (productAdd) {
                    if (!cartProduct) {

                        cartList.insertAdjacentHTML('beforeend', generateCartItem(item.mainImageJpg, item.mainImageWebp, item.mainImageAlt, item.title, item.price, item.id));

                    } else {
                        const cartProductQuantity = cartProduct.querySelector('.cart-content__quantity span');
                        const cartProductPrice = cartProduct.querySelector('.cart-content__price');

                        cartProductQuantity.textContent = ++cartProductQuantity.textContent;
                        cartProductPrice.textContent = '$' + (+cartProductQuantity.textContent * item.price);
                    }

                    //Unhold Button
                    currentBtn.classList.remove('hold');
                } else {    //Remove Product
                    const cartProductQuantity = cartProduct.querySelector('.cart-content__quantity span');
                    const cartProductPrice = cartProduct.querySelector('.cart-content__price');
                    cartProductQuantity.textContent = --cartProductQuantity.textContent;

                    //Total Product Price
                    cartProductPrice.textContent = '$' + (+cartProductQuantity.textContent * +item.price);
                    
                    cartQuantity.textContent = --cartQuantity.textContent;

                    //Remove Cart Product
                    if (!parseInt(cartProductQuantity.textContent)) {
                        cartProduct.remove();
                    }
                }
                countCartTotal();
                showCartQuantity();
                showCart();        
            
                updateStorage(); 
            })
            .catch(err => alert(err));
    }

    //Triggers
    document.addEventListener('click', (e) => {        
        const target = e.target;   
                
        //Add Product To Cart
        if (target.classList.contains('add-btn')) {
            e.preventDefault();
            const productId = target.dataset.prodId;
            target.classList.add('hold');
            addToCart(target, productId);
        }

        //Delete Cart Product
        if (target.classList.contains('cart-content__remove')) {           
            const productId = target.closest('.cart-content__item').dataset.cartId;
            addToCart(target, productId, false);
        }

        //Add Product To Checkout
        if (target.classList.contains('checkout-link')) {
            addToCheckout();
        }

        //Delete Checkout Product
        if (target.classList.contains('item-checkout__close')) {
            const checkoutProduct = target.closest('.order-checkout__item');  
            const productId = checkoutProduct.dataset.checkoutId;
            const productTotal = checkoutProduct.querySelector('.item-checkout__total span');
            const checkoutTotal = document.querySelector('.order-checkout__total span');
            
            checkoutProduct.remove();
            document.querySelector(`[data-cart-id="${productId}"]`).remove();
            cartQuantity.textContent -= +checkoutProduct.querySelector('.item-checkout__quantity').textContent;

            updateStorage(); 
            
            checkoutTotal.textContent = '$' + (normalNumber(checkoutTotal.textContent) - normalNumber(productTotal.textContent));
            
            if (cartList.children.length < 1) {
                changeCheckoutContent();
                cartQuantity.classList.remove('active');
                cartBody.classList.remove('active');
            }
        }
    });

    // Genetare Checkout Item
    function generateCheckoutItem(img, alt, title, quantity, price, totalPrice, id) {

        return `<li class="order-checkout__item item-checkout" data-checkout-id="${id}">
                    <div class="item-checkout__wrapper">
                        <div class="item-checkout__image">
                            <img src="${img}" alt="${alt}">
                        </div>
                        <div class="item-checkout__content">
                            <div class="item-checkout__top">
                                <button type="button" class="item-checkout__close icon-close" aria-label="Remove product"></button>
                            </div>
                            <div class="item-checkout__body">
                                <div class="item-checkout__descr">
                                    <h4 class="item-checkout__title">${title}</h4>
                                    <div class="item-checkout__footer">
                                        <div class="item-checkout__price">
                                            $${price}
                                        </div>
                                        <div class="item-checkout__quantity"><span>${quantity}</span></div>
                                    </div>
                                </div>
                            <div class="item-checkout__total">Total:<span>${totalPrice}<span></div>
                        </div>                        
                    </div>                    
                </li>`;
    }

    function changeCheckoutContent() {
        checkoutContent.innerHTML = `
            <div class="order-checkout__empty empty-checkout">
                <div class="empty-checkout__text">Your cart is empty.</div>
                <div class="empty-checkout__link empty-link">Go to <a href="#" class="to-products products-link">Products</a></div>
            </div>
        `;
    }

    function addToCheckout() {
        

        if (cartList.children.length > 0) {
            if (checkout) {
                checkoutContent.innerHTML = `
                    <div class="order-checkout__title">Your order:</div>
                    <ul class="order-checkout__items"></ul>
                    <div class="order-checkout__footer">
                        <div class="order-checkout__total">
                            Total: <span> 0</span>                                 
                        </div>
                        <button type="submit" class="order-checkout__btn btn">Place Order</button>
                    </div>
                `;

                const cartProduct = cartList.querySelectorAll('.cart-content__item');
                const cartTotalPrice = document.querySelector('.cart-content__total span');
                const checkoutTotalPrice = checkout.querySelector('.order-checkout__total span');
                const checkoutProductsBody = checkout.querySelector('.order-checkout__items');

                cartProduct.forEach(item => {
                    const cartId = item.dataset.cartId;

                    fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
                        .then(response => response.json())
                        .then((data) => {
                            const product = data.products[cartId];
                            const cartTotalPrice = item.querySelector('.cart-content__price').textContent;   
                            const cartQuantity = item.querySelector('.cart-content__quantity span').textContent;
                        
                            checkoutProductsBody.insertAdjacentHTML('beforeend', generateCheckoutItem(product.mainImageJpg, product.mainImageAlt, product.title, cartQuantity, product.price, cartTotalPrice, cartId));
                        })
                        .catch(err => alert(err));
                });                
                checkoutTotalPrice.textContent = cartTotalPrice.textContent;
            }

        } else {
            if (checkout) {
                changeCheckoutContent();                
            }            
        }
    }

    addToCheckout();
    
    //Validation

    // Inputmask    
    const selector = document.querySelectorAll('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(selector);

    // Close Modal With Delay
    const closeModalWithDelay = (delay) => {
        setTimeout(() => {            
            modal.classList.remove('active');            
            modalMessage.classList.remove('active');
            document.body.style.overflow = '';
            modalMessage.textContent = '';
            document.body.style.paddingRight = '';
            header.style.paddingRight = '';  

            Array.from(document.body.children).forEach(item => {
                if (item !== modal) {
                    item.inert = false;
                }
            });     

            document.querySelector('.header__logo').focus();
        }, delay);
    };

    // Create Random Number
    const randomNumber = Math.random().toString().slice(2, 10);

    function clearCheckout() {
        const checkoutProducts = document.querySelectorAll('.order-checkout__items');
        const cartProducts = document.querySelectorAll('.cart-content__item');

        checkoutProducts.forEach(item => {
            item.remove(); 
        });

        cartProducts.forEach(item => {
            item.remove();
        });

        updateStorage();           

        changeCheckoutContent();

        cartQuantity.textContent = 0;
        cartQuantity.classList.remove('active');
        cartBody.classList.remove('active');
    }

    // Status Messages
    const statusMessage = {
        checkoutSuccess: `Your order №${randomNumber} has been successfully placed. 
        Thank you.`,        
        callbackSuccess: 'Confirmation has been sent by email.',
        contactSuccess: 'Our manager will contact you soon.',
        fail: 'Something went wrong... Try again please.',
        loading: 'Loading...'
    };

    // POST
    const postData = async (url, data, contentSelector) => {
        document.querySelector(contentSelector).classList.remove('active');    
        
        if (!modal.classList.contains('active')) {
            modal.classList.add('active');
        }        
        
        modalMessage.classList.add('active');
        modalMessage.textContent = statusMessage.loading;

        let result = await fetch(url, {
            method: 'POST',
            body: data
        });
        
        return await result.text();
    };

    // Validate And Post Forms    
    function validateForms(formSelector, rules, messages, url, delay, successMessage) {

        new window.JustValidate(formSelector, {
            rules: rules,
            colorWrong: '#ee2c2d',
            messages: messages,
            submitHandler: function (form) {
                let formData = new FormData(form);                
                
                postData(url, formData, formSelector)
                    .then((data) => {
                        modalMessage.textContent = successMessage; 
                        
                        if (formSelector === '.modal__checkout') {
                            clearCheckout();
                        }
                    }).catch((data) => {

                        modalMessage.textContent = statusMessage.fail;  
                    }).finally(() => {

                        form.reset();
                        closeModalWithDelay(delay);
                    });
            }
        });
    }

    // Login
    validateForms('.modal__login',
        {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            },
        },
        {
            email: {
                required: 'Enter your Email',
                email: 'Wrong format'
            },
            password: {
                required: 'Enter your password'
            }
        },
        'resources/server.php');
    
    // Ask a question
    validateForms('.modal__ask',
        {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true
            },
            text: {
                required: true
            }
        },
        {
            email: {
                required: 'Enter your Email',
                email: 'Wrong format'
            },
            name: {
                required: 'Enter your name'
            },
            text: {
                required: 'Enter your question'
            }
        },
        'resources/server.php', 5000, statusMessage.contactSuccess);
    
    // Subscribe
    validateForms('.subscribe__form',
        {
            email: {
                required: true,
                email: true
            }
        },
        {
            email: {
                required: 'Enter your Email',
                email: 'Wrong format'
            }
        },
        'resources/server.php', 5000, statusMessage.callbackSuccess);
    
    // Checkout
    validateForms('.modal__checkout',
        {
            fullname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            },            
            address: {
                required: true
            },
        },
        {
            fullname: {
                required: 'Enter your fullname',
            },
            email: {
                required: 'Enter your email',
                email: 'Wrong format'
            },
            phone: {
                required: 'Enter your phone number'
            },
            address: {
                required: 'Enter your address'
            }
        },
        'resources/server.php', 5000, statusMessage.checkoutSuccess);

}



