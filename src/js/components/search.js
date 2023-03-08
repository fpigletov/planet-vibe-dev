'use strict';

export function searchLogic() {
    const searchForm = document.querySelector('.search-modal__form');    
    const searchInput = document.querySelector('.search-modal__input');
    const resultsBody = document.querySelector('.search-modal__results');
    
    searchInput.addEventListener('input', (e) => {
        searchInput.value = searchInput.value.replace(/[^a-z]/ig, ''); 
    });

    searchForm.addEventListener('submit', (e) => {        
        e.preventDefault();

        search(searchInput.value);
        searchInput.value = '';
    });

    function falseResult() {
        resultsBody.innerHTML = '<div class="search-results__false">No results</div>';
    }

    function search(text) {         
        if (text === '') {

            falseResult();

        } else {

            resultsBody.innerHTML = '<ul class="search-results__body"></ul>';
            const results = document.querySelector('.search-results__body');

            
            const searchResults = document.querySelectorAll('.item-products__title');
            let filteredResults = [];
            searchResults.forEach(item => {
                
                if (item.textContent.toLowerCase().includes(text.toLowerCase())) {
                    filteredResults.push(item.textContent);
                }
            });  

            if (filteredResults.length > 0) {

                filteredResults.forEach(item => {

                    results.innerHTML += `
                        <li class="search-results__item">
                            <a href="#" class="search-results__link products-link">${item}</a>
                        </li>
                    `;
                });

            } else {

                falseResult();
                
            }
                
        }        
    }
}