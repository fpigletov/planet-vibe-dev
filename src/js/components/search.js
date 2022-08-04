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

            fetch('https://fpigletov-db.herokuapp.com/planet-vibe/')
                .then(response => response.json())
                .then((data) => {
                    const searchResults = data.products;
                    const filteredResults = searchResults.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));

                    if (filteredResults.length > 0) {

                        filteredResults.forEach(item => {

                            results.innerHTML += `
                                <li class="search-results__item">
                                    <a href="#" class="search-results__link products-link">${item.title}</a>
                                </li>
                            `;
                        });

                    } else {

                        falseResult();
                        
                    }
                })
                .catch(err => alert(err));
        }        
    }
}