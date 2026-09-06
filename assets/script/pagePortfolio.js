const sections = document.querySelectorAll('section[id]');
const items    = document.querySelectorAll('.sb-item');

function setActive() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    items.forEach(item => {
        const fn = item.getAttribute('onclick') ?? '';
        item.classList.toggle('active', fn.includes(current));
    });
}

window.addEventListener('scroll', setActive, { passive: true });

function scrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}