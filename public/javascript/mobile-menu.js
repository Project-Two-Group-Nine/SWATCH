const menuToggle = document.querySelector('.mobile-menu-toggle');
const menu = document.querySelector('.mobile-menu');

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

document.querySelector('body').addEventListener('click', toggleMobileMenu)

const navSecondary = document.querySelector('.nav-secondary');

const showHoverMenu = (e) => {
    if (e.target.classList.contains('hover-link')) {
        console.log('hovered!');
        const hoverMenu = e.target.nextElementSibling;
        hoverMenu.style.display = 'block';
    }
}

const hideHoverMenu = (e) => {
    console.log('unhovered!');
    const hoverMenus = document.getElementsByClassName('hover-menu');
    for (let i = 0; i < hoverMenus.length; i++) {
        hoverMenus[i].style.display = 'none';
    }
}

navSecondary.addEventListener('mouseover', showHoverMenu);
navSecondary.addEventListener('mouseleave', hideHoverMenu);