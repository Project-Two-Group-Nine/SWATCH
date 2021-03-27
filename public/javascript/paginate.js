const pageList = document.querySelector('.pagination');
const pageTotal = parseInt(pageList.dataset.pagetotal);
console.log(pageTotal);

/*
const category = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
*/

// construct url to allow pagination for product category routes '/:id'
const constructUrl = () => {
    const currentUrlArray = window.location.toString().split('/');
    let baseUrl = '';
    if (currentUrlArray[currentUrlArray.length - 2] === 'products') {
        let category  = currentUrlArray[currentUrlArray.length - 1];
        category = category.split('?')[0];
        baseUrl = `/products/${category}`;
    }
    else {
        baseUrl = '/';
    }
    return baseUrl;
}

const getPageEl = (text, isActive, destination) => {
    
    let pageEl = document.createElement('li');
    let pageLink = document.createElement('a');
    let baseUrl = constructUrl();
    pageLink.textContent = text;
    pageLink.href = `${baseUrl}?page=${destination}`;
    if (isActive) {
        pageLink.classList.add('active');
    }
    pageEl.appendChild(pageLink);
    return pageEl;
}

const paginate = (pages) => {
    let url = document.location.href;
    url = url.split('=');
    let currentPage = parseInt(url[url.length - 1]);
    if (!currentPage) {
        currentPage = 1;
    }

    // page number list elements
    const firstPageEl = getPageEl('First', false, '1');
    const prevPageEl = getPageEl('Prev', false, currentPage - 1);
    const prevTwoPageEl = getPageEl(currentPage - 2, false, currentPage - 2);
    const prevOnePageEl = getPageEl(currentPage - 1, false, currentPage - 1);
    const currentPageEl = getPageEl(currentPage, true, currentPage);
    const nextOnePageEl = getPageEl(currentPage + 1, false, currentPage + 1);
    const nextTwoPageEl = getPageEl(currentPage + 2, false, currentPage + 2);
    const nextPageEl = getPageEl('Next', false, currentPage + 1);
    const lastPageEl = getPageEl('Last', false, pageTotal);

    if (currentPage < 3) {
        if (currentPage === 2) {
            pageList.appendChild(firstPageEl);
            pageList.appendChild(prevPageEl);
            pageList.appendChild(prevOnePageEl);
        }
        pageList.appendChild(currentPageEl);
        pageList.appendChild(nextOnePageEl);
        pageList.appendChild(nextTwoPageEl);
        pageList.appendChild(nextPageEl);
        pageList.appendChild(lastPageEl);
    }
    else if (currentPage > pageTotal - 2) {
        pageList.appendChild(firstPageEl);
        pageList.appendChild(prevPageEl);
        pageList.appendChild(prevTwoPageEl);
        pageList.appendChild(prevOnePageEl);
        pageList.appendChild(currentPageEl);
        if (currentPage === pageTotal - 1) {
            pageList.appendChild(nextOnePageEl);
            pageList.appendChild(nextPageEl);
            pageList.appendChild(lastPageEl);
        }
    }
    else {
        pageList.appendChild(firstPageEl);
        pageList.appendChild(prevPageEl);
        pageList.appendChild(prevTwoPageEl);
        pageList.appendChild(prevOnePageEl);
        pageList.appendChild(currentPageEl);
        pageList.appendChild(nextOnePageEl);
        pageList.appendChild(nextTwoPageEl);
        pageList.appendChild(nextPageEl);
        pageList.appendChild(lastPageEl);
    };
};

paginate(pageTotal);