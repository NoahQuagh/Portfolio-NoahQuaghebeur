const sections = document.querySelectorAll('section[id]');
const items    = document.querySelectorAll('.nav-item');
const itemsSb  = document.querySelectorAll('.sb-item');

function setActive() {
    let current = '';

    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) {
            current = s.id;
        }
    });

    const getTarget = (el) => {
        const anchor = el.tagName === 'A' ? el : el.querySelector('a');
        return el.getAttribute('onclick') || (anchor ? anchor.getAttribute('href') || anchor.getAttribute('onclick') : '');
    };

    items.forEach(item => {
        const fn = getTarget(item);
        item.classList.toggle('active', current !== '' && fn.includes(current));
    });

    itemsSb.forEach(item => {
        const fn = getTarget(item);
        item.classList.toggle('active', current !== '' && fn.includes(current));
    });
}

window.addEventListener('scroll', setActive, { passive: true });

document.addEventListener('DOMContentLoaded', setActive);

function smothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}