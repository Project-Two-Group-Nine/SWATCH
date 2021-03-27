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

body.addEventListener('click', toggleMobileMenu);