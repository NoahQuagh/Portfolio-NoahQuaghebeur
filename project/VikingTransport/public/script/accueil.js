/* ─────────────────────────────────────────
   NAVIGATION — sliding indicator
───────────────────────────────────────── */
function navigation() {
    const navPills = document.getElementById('customNav');
    if (!navPills) return;

    const indicator = navPills.querySelector('.indicator');
    const navLinks = navPills.querySelectorAll('.nav-link');

    function updateIndicator(activeLink) {
        if (!activeLink) activeLink = navPills.querySelector('.nav-link.active');
        if (!activeLink) {
            indicator.style.opacity = '0';
            return;
        }

        const activeItem = activeLink.closest('.nav-item');
        if (!activeItem) return;

        const itemRect = activeItem.getBoundingClientRect();
        const navRect = navPills.getBoundingClientRect();

        indicator.style.width = `${activeItem.offsetWidth}px`;
        indicator.style.height = `${activeItem.offsetHeight - 10}px`;
        indicator.style.transform = `translateY(-50%) translateX(${itemRect.left - navRect.left}px)`;
        indicator.style.opacity = '1';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateIndicator(this);
        });
    });

    setTimeout(() => updateIndicator(), 50);
    window.addEventListener('resize', () => updateIndicator());
}

function compte(){
    window.location.href = "../page/login.html";
}


function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
    if (!isOpen && overlay) {
        overlay.onclick = () => closeMenu();
    }
}

function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
}

/* ─────────────────────────────────────────
   TRANSITION DE CONTENU
───────────────────────────────────────── */
function changeContent(elementId, newContent, duration = 300) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Phase 1 : fondu sortant
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(12px)';

    setTimeout(() => {
        // Injecter le nouveau contenu
        element.innerHTML = newContent;

        // Forcer un reflow pour que le navigateur prenne en compte opacity:0 avant d'animer
        void element.offsetHeight;

        // Phase 2 : fondu entrant
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, duration);
}

/* ─────────────────────────────────────────
   PAGE — ACCUEIL
───────────────────────────────────────── */

function accueil() {
    const content = `
        
    `;

    changeContent('accueil', content);

    setTimeout(() => {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.addEventListener('keydown', validerSaisie);
            input.focus();
        }
    }, 350);
}

/* ─────────────────────────────────────────
   UTILITAIRES
───────────────────────────────────────── */

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
}


window.addEventListener('resize', () => {
    const largeur = window.innerWidth;
    const hauteur = window.innerHeight;
    //console.log(`Largeur : ${largeur}px, Hauteur : ${hauteur}px`);
    const t = document.querySelector('.terminal');
    const c = document.querySelector('#sidebar');

    if (!t) return;

    if (largeur < 800) {

        t.style.display = 'none';
    } else {
        if (window.getComputedStyle(t).display === 'none') {
            t.style.display = 'flex';
        }
    }

    if (largeur > 800) {
        closeMenu();
        document.body.classList.remove('sidebar-open');
    }
});

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    navigation();
    //accueil();
});


function compte() {
    window.location.href = "../page/login.html";
}