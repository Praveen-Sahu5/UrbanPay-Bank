//javascript code for hamburgger 
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

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
    inputNumber.oninput = () => {
        if(inputNumber.value.length > inputNumber.maxLength) {
            inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
        };
    };

});




//javascript code of emi calculator
if (document.querySelector('.emi-calculator')) {

    let loanAmount = document.getElementById('amount');
    let loanInterest = document.getElementById('interest');
    let loanTenure = document.getElementById('loanTenure');
    let calculate = document.getElementById('calculate');

    calculate.onclick = (e) => {
        e.preventDefault();

        let isYear = document.getElementById('year').checked;
        let isMonth = document.getElementById('month').checked;
        let noOfMonths = 0;

        if (!isYear && !isMonth) {
            alert("Please select the loan tenure, either monthly or yearly");
        } else {
            if (isYear) {
                noOfMonths = loanTenure.value * 12;
            } else {
                noOfMonths = loanTenure.value;
            }

            let r = parseFloat(loanInterest.value) / 12 / 100;
            let p = parseFloat(loanAmount.value);
            let n = parseInt(noOfMonths);

            if (r === 0) {
                emi = p / n;
            } else {
                var emi = (p * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
            }

            let totalPayment = emi * n;
            let totalInterest = totalPayment - p;

            document.getElementById('emi').innerHTML = '₹ ' + Math.round(emi);
            document.getElementById('totalInterest').innerHTML = '₹ ' + Math.round(totalInterest);
            document.getElementById('totalPayment').innerHTML = '₹ ' + Math.round(totalPayment);
        }
    }
}



//javascript code for reviews section
if(document.querySelector('.reviews')) {
    let reviews_slider = document.querySelector('.reviews .reviews-slider');

    let first_slide = reviews_slider.querySelector('.slider:first-child').clientWidth + 20;
    let nextBtn = document.getElementById('next-btn');
    let prevBtn = document.getElementById('prev-btn');

    nextBtn.onclick = () => {
        reviews_slider.style.scrollBehavior = 'smooth';
        reviews_slider.scrollLeft += first_slide;
        if(reviews_slider.scrollLeft >= (reviews_slider.scrollWidth - reviews_slider.clientWidth - 5)) {
            reviews_slider.scrollLeft = 0;
        }
    }

    prevBtn.onclick = () => {
        reviews_slider.style.scrollBehavior = 'smooth';
        reviews_slider.scrollLeft -= first_slide;
        if(reviews_slider.scrollLeft <= 5) {
            let maxScroll = reviews_slider.scrollWidth - reviews_slider.clientWidth;
            reviews_slider.scrollLeft = maxScroll;
        }
    }
}