const body = document.querySelector('body');
const menuToggle = document.querySelector('.mobile-menu-toggle');
const menu = document.querySelector('.mobile-menu');
const navSecondary = document.querySelector('.nav-secondary');

const toggleMobileMenu = (e) => {
    if (e.target === menuToggle) {
        menuToggle.style.visibility = 'hidden';
        menu.style.display = 'block';
    }
    else {
        menuToggle.style.visibility = 'visible';
        menu.style.display = 'none';
    }
}

const showHoverMenu = (e) => {
    if (e.target.classList.contains('hover-link')) {
        const hoverMenu = e.target.nextElementSibling;
        hoverMenu.style.display = 'block';
    }
}

const hideHoverMenu = (e) => {
    const hoverMenus = document.getElementsByClassName('hover-menu');
    for (let i = 0; i < hoverMenus.length; i++) {
        hoverMenus[i].style.display = 'none';
    }
}

body.addEventListener('click', toggleMobileMenu);
navSecondary.addEventListener('mouseover', showHoverMenu);
navSecondary.addEventListener('mouseleave', hideHoverMenu);
body.addEventListener('click', showHoverMenu);
body.addEventListener('click', hideHoverMenu);