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

function compte() {
    window.location.href = "page/login.html";
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

function changeContent(elementId, newContent, duration = 300) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(12px)';

    setTimeout(() => {
        element.innerHTML = newContent;

        void element.offsetHeight;

        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, duration);
}

function accueil() {
    const content = `
        <div class="accueil-content">
            <img src="assets/img/bus.png" alt="accueil">
            <button class="btn-no-border">Je reserve →</button>
        </div>
    `;

    changeContent('accueil', content);

}

function ligne() {
    const content = `
        <h1>Réseau de Transport - Viking Transport</h1>
    <div class="info-box">Survolez ou cliquez sur les arrêts et les lignes pour explorer le réseau normand.</div>

    <div id="map"></div>
    `;

    changeContent('accueil', content);

    setTimeout(() => {
        initMap();
    }, 350);
}

function tarif() {
    const content = `
        <div class="tarif-banner">
          <h4>Tarifs</h4>
        </div>
        <div class="tarif-wrap">
 
          <p class="tarif-title">Grille tarifaire</p>
          <p class="tarif-sub">Transport par bus — tarifs selon la distance parcourue</p>
                 
          <div class="table-wrapper">
            <table id="tarif-table">
              <thead>
                <tr>
                  <th style="width:52px">N°</th>
                  <th>Distance min</th>
                  <th>Distance max</th>
                  <th>Tarif</th>
                </tr>
              </thead>
              <tbody id="tarif-body"></tbody>
            </table>
          </div>
         
        </div>
    `;

    changeContent('accueil', content);

    setTimeout(() => {
        initGrille();
    }, 350);

}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
}

window.addEventListener('resize', () => {
    const largeur = window.innerWidth;
    const hauteur = window.innerHeight;
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

document.addEventListener('DOMContentLoaded', () => {
    navigation();
    accueil();
});



