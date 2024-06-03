document.addEventListener('DOMContentLoaded', () => {
    const slideElements = document.querySelectorAll('.slide-in');
    const openSound = document.getElementById('open-sound');
    const closeSound = document.getElementById('close-sound');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };
    const handleScrollAnimation = () => {
        slideElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                if (!el.classList.contains('active')) {
                    hideScrollElement(el);
                }
            }
        });
    };
    const toggleDropdown = (element) => { //PAAAAAIIIIINNNNNNN
        const content = element.querySelector('.dropdown-content');
        if (element.classList.contains('active')) {
            element.classList.remove('active');
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            closeSound.play();
            setTimeout(() => {
                handleScrollAnimation();
            }, 500);
        } else {
            element.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            openSound.play();
            displayScrollElement(element);
            setTimeout(() => {
                handleScrollAnimation();
            }, 500);
        }
    };
    slideElements.forEach((element) => {
        element.addEventListener('click', () => {
            toggleDropdown(element);
        });
    });
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    handleScrollAnimation();
});