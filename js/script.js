let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

function mobileView() {
    return window.innerWidth <= 768;
}

function closeDropdown() {
    document.querySelectorAll('.header .navbar ul ul')
        .forEach(submenu => {
            submenu.style.removeProperty('display');
        });
}

function removeNavbar() {
    navbar.classList.remove('active');
    closeDropdown();
}

menuBtn.onclick = () => {
    navbar.classList.toggle('active');

    if (!navbar.classList.contains('active')) {
        closeDropdown();
    }
}

document.onclick = (e) => {
    if (mobileView() && navbar.classList.contains('active')) {
        if (e.target !== menuBtn && !navbar.contains(e.target)) {
            removeNavbar();
        }
    }
}

window.onscroll = () => {
    if (mobileView() && navbar.classList.contains('active')) {
        removeNavbar();
    }
}

document.querySelectorAll('.header .navbar a[href="#"]')
    .forEach(anchor => {
        anchor.onclick = (e) => {
            e.preventDefault();

            if (navbar.classList.contains('active') || mobileView()) {
                let parentLi = anchor.closest('li');
                let submenu = parentLi && parentLi.querySelector('ul');

                if (submenu) {
                    let siblings = parentLi.parentNode.querySelectorAll('ul');

                    siblings.forEach(sub => {
                        if (sub !== submenu) {
                            sub.style.removeProperty('display');
                        }
                    });

                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        }
    });

let resizeTimer;
window.onresize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!mobileView()) {
            removeNavbar();
        }
    }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
    if (!mobileView()) {
        removeNavbar();
    }
});
