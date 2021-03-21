const menuToggle = document.querySelector('.mobile-menu-toggle');
const menu = document.querySelector('.mobile-menu');

const toggleMobileMenu = (e) => {
    if (e.target === menuToggle) {
        menuToggle.style.display = 'none';
        menu.style.display = 'block';
    }
    else {
        menuToggle.style.display = 'block';
        menu.style.display = 'none';
    }
} 

document.querySelector('body').addEventListener('click', toggleMobileMenu)