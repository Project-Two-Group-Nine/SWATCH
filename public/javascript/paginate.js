const pageList = document.querySelector('.pagination');
const pageTotal = pageList.dataset.pagetotal;

const getPageEl = (text, isActive, destination) => {
    let pageEl = document.createElement('li');
    let pageLink = document.createElement('a');
    pageLink.textContent = text;
    pageLink.href = '/';
    if (isActive) {
        pageLink.classList.add('active');
    }
    pageEl.appendChild(pageLink);
    return pageEl;
}

const paginate = (pages) => {
    let url = document.location.href;
    url = url.split('=');
    let currentPage = url[url.length - 1];

    let nextPageEl = document.createElement('li');
    let nextPageLink = document.createElement('a');
    nextPageLink.textContent = "Next";
    nextPageLink.href = '/';
    nextPageEl.appendChild(nextPageLink);

    let prevPageEl = document.createElement('li');
    let prevPageLink = document.createElement('a');
    prevPageLink.textContent = "Prev";
    prevPageLink.href = '/';
    prevPageEl.appendChild(prevPageLink);

    let pageEl = document.createElement('li');
    let pageLink = document.createElement('a');
    pageLink.textContent = currentPage;
    pageLink.classList.add('active');
    pageLink.href = '/';
    pageEl.appendChild(pageLink);

    if (currentPage === '1') {
        // pageList.appendChild(pageEl);
        // pageList.appendChild(nextPageEl);
        getPageEl('1', true, '/');
        getPageEl('Next', false, '/');
    }
    else if (curentPage === pageTotal) {
        // pageList.appendChild(prevPageEl);
        // pageList.appendChild(pageEl);
        getPageEl('1', true, '/');
        getPageEl('Next', false, '/');
    }
    else {
        pageList.appendChild(prevPageEl);
        pageList.appendChild(pageEl);
        pageList.appendChild(nextPageEl);
    };
};

paginate(pageTotal);