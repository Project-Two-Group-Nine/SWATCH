const pageList = document.querySelector('.pagination');
const pageTotal = pageList.dataset.pagetotal;

const getPageEl = (text, isActive, destination) => {
    let pageEl = document.createElement('li');
    let pageLink = document.createElement('a');
    pageLink.textContent = text;
    pageLink.href = `/?page=${destination}`;
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

    if (currentPage === '1') {
        pageList.appendChild(getPageEl('1', true, '1'));
        pageList.appendChild(getPageEl('Next', false, '2'));
    }
    else if (currentPage === pageTotal) {
        pageList.appendChild(getPageEl('Prev', false, parseInt(currentPage) - 1));
        pageList.appendChild(getPageEl(currentPage, true, currentPage));
    }
    else {
        pageList.appendChild(getPageEl('Prev', false, parseInt(currentPage) - 1));
        pageList.appendChild(getPageEl(currentPage, true, currentPage));
        pageList.appendChild(getPageEl('Next', false, parseInt(currentPage) + 1));
    };
};

paginate(pageTotal);