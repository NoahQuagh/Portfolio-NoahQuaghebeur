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

function toggleSidebar() {
    toggleMenu();
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
   TERMINAL — ligne suivante
───────────────────────────────────────── */
function LigneSuivante() {
    const fenetre = document.getElementById('terminal-output');
    if (!fenetre) return;
    fenetre.innerHTML += `
        <div class="output-line" id="output-line">
            <br><span class="prompt">PS C:\\Users\\Noah&gt;</span>
            <input type="text" id="terminal-input" autofocus autocomplete="off">
        </div>`;
    fenetre.scrollTop = fenetre.scrollHeight;
    const input = document.getElementById('terminal-input');
    if (input) {
        input.addEventListener('keydown', validerSaisie);
        input.focus();
    }
}

/* ─────────────────────────────────────────
   TERMINAL — validation commande
───────────────────────────────────────── */
function validerSaisie(event) {
    if (event.key !== 'Enter') return;
    const valeur = event.target.value.toLowerCase().trim();
    const fenetre = document.getElementById('terminal-output');
    const ligneActuelle = document.getElementById('output-line');
    if (!valeur) return;

    const cmdsNav = {
        'cd parcours': {fn: parcours, name: 'parcours'},
        'cd projets': {fn: projet, name: 'projet'},
        'cd competences': {fn: comptence, name: 'competence'},
        'cd expériences': {fn: experience, name: 'experience'}
    };

    ligneActuelle.innerHTML = `<br><span class="prompt">PS C:\\Users\\Noah&gt; <span class="${cmdsNav[valeur] || valeur === 'help' || valeur === './bio' || valeur === './moi' || valeur === './jeu' ? 'success' : 'error'}">${valeur}</span></span>`;
    ligneActuelle.id = '';

    if (cmdsNav[valeur]) {
        cmdsNav[valeur].fn();
        if (cmdsNav[valeur].name) {
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('data-name') === cmdsNav[valeur].name) l.classList.add('active');
            });
            setTimeout(() => navigation(), 100);
        }
        LigneSuivante();

    } else if (valeur === 'help') {
        fenetre.innerHTML += `
            <div class="output-line info"><br>COMMANDES DISPONIBLES</div>
            ${['help', 'cd parcours', 'cd projets', 'cd competences', 'cd expériences', './bio', './moi', './jeu']
            .map(c => `<div class="output-line" style="color:#5dd62c">   ${c}</div>`).join('')}`;
        LigneSuivante();

    } else if (valeur === './bio') {
        fenetre.innerHTML += `
            <div class="output-line info"><br>[ <span class="cyan">BIO</span> ] Étudiant en BUT Informatique, passionné de développement web.</div>`;
        LigneSuivante();

    } else if (valeur === './moi') {
        fenetre.innerHTML += asciiNoah();
        LigneSuivante();

    } else if (valeur === './jeu') {
        fenetre.innerHTML += `
            <div class="output-line info"><br>[ <span class="cyan">INFO</span> ] Chargement du jeu ...</div>`;
        window.location.href = '../../pages/jeu.html';
        LigneSuivante();

    } else {
        ligneActuelle.innerHTML = `<br><span class="prompt">PS C:\\Users\\Noah&gt; <span class="error">${valeur}</span></span>`;
        ligneActuelle.id = '';
        fenetre.innerHTML += `
            <div class="output-line info">[ <span class="error">ERREUR</span> ] « <span class="error">${valeur}</span> » n'est pas reconnu.</div>
            <div class="output-line info">[ <span class="warning">AIDE</span> ] Tapez <span class="success">help</span> pour la liste des commandes.</div>`;
        LigneSuivante();
    }
}

function asciiNoah() {
    return `
        <div class="ascii-container">
            <div class="ascii-art">
 /$$   /$$  /$$$$$$   /$$$$$$  /$$   /$$
| $$$ | $$ /$$__  $$ /$$__  $$| $$  | $$
| $$$$| $$| $$  \\ $$| $$  \\ $$| $$  | $$
| $$ $$ $$| $$  | $$| $$$$$$$$| $$$$$$$$
| $$  $$$$| $$  | $$| $$__  $$| $$__  $$
| $$\\  $$$| $$  | $$| $$  | $$| $$  | $$
| $$ \\  $$|  $$$$$$/| $$  | $$| $$  | $$
|__/  \\__/ \\______/ |__/  |__/|__/  |__/
            </div>
        </div>
        <div class="ascii-container">
            <div class="ascii-art">
  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$  /$$$$$$$$ /$$   /$$ /$$$$$$$
 /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$| $$  | $$| $$_____/| $$__  $$| $$_____/| $$  | $$| $$__  $$
| $$  \\ $$| $$  | $$| $$  \\ $$| $$  \\__/| $$  | $$| $$      | $$  \\ $$| $$      | $$  | $$| $$  \\ $$
| $$  | $$| $$  | $$| $$$$$$$$| $$ /$$$$| $$$$$$$$| $$$$$   | $$$$$$$ | $$$$$   | $$  | $$| $$$$$$$/
| $$  | $$| $$  | $$| $$__  $$| $$|_  $$| $$__  $$| $$__/   | $$__  $$| $$__/   | $$  | $$| $$__  $$
| $$/$$ $$| $$  | $$| $$  | $$| $$  \\ $$| $$  | $$| $$      | $$  \\ $$| $$      | $$  | $$| $$  \\ $$
|  $$$$$$/|  $$$$$$/| $$  | $$|  $$$$$$/| $$  | $$| $$$$$$$$| $$$$$$$/| $$$$$$$$|  $$$$$$/| $$  | $$
\\____ $$$ \\______/ |__/  |__/ \\______/ |__/  |__/|________/|_______/ |________/ \\______/ |__/  |__/
     \\__/
            </div>
        </div>`;
}

const terminal = `<div class="terminal-header">
                            <img src="assets/img/terminal.svg" class="terminal-icon">
                            <span class="terminal-title">Terminal — PS C:\\Users\\Noah</span>
                            <span class="terminal-close">✕</span>
                        </div>
                        <div class="terminal-body" id="terminal-output">
                            <div class="output-line info">PS C:\\Users\\Noah&gt; <span class="success">./moi</span></div>
                            ${asciiNoah()}
                            <div class="output-line" style="margin-top:12px;">
                                [ <span style="color:darkcyan">INFO</span> ] Tapez <span class="success">help</span> pour voir les commandes disponibles.
                            </div>
                            <div class="output-line" id="output-line">
                                <br><span class="prompt">PS C:\\Users\\Noah&gt;</span>
                                <input type="text" id="terminal-input" autofocus autocomplete="off">
                            </div>
                        </div>`;

/* ─────────────────────────────────────────
   PAGE — ACCUEIL
───────────────────────────────────────── */

function accueil() {
    const content = `
        <!-- HERO -->
        <section id="NomAccueil">
            <div class="hero-accueil">
                <div class="hero-kicker">Portfolio _</div>
                <h1 class="hero-name">Noah<br><em>Quaghebeur</em></h1>
            </div>
    
            <!-- TERMINAL -->
            <div class="terminal-wrap">
                <div class="terminal" style="display: ${window.innerWidth < 800 ? 'none' : 'flex'}">
                    ${terminal}
                </div>
            </div>
        </section>

        <!-- PROFIL -->
        <div class="section-wrap">
            <div class="chapter" id="body-profil">
                <div class="chapter-header">
                    <h2 class="chapter-title">Qui suis-je ?</h2>
                </div>
                <div class="profil-grid">
                    <div class="profile-card">
                        <div class="profile-image-container">
                            <img src="../assets/img/photoNoah.jpg" alt="Noah Quaghebeur" class="profile-image">
                        </div>
                        <div class="profile-name">NOAH QUAGHEBEUR</div>
                        <div class="profile-title-badge">Étudiant</div>
                        <div class="profile-stats">
                            <div class="stat-item">
                                <span class="stat-label">Localisation</span>
                                <span class="stat-value">6 rue Anton Tchekhov, Ifs</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">E-mail</span>
                                <span class="stat-value">noah.quaghebeur@laposte.net</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Statut</span>
                                <span class="stat-value">Étudiant</span>
                            </div>
                        </div>
                    </div>
                    <div class="profil-right">
                        <div class="bio-block">
                            <div class="block-label">Biographie</div>
                            <div class="block-title">À PROPOS DE MOI_</div>
                            <p>
                                Étudiant en BUT Informatique à l'IUT Grand Ouest Normandie, je me spécialise dans le développement d'applications, 
                                le Web, l'administration système et la gestion de bases de données.
                                De la gestion de serveurs sous Linux à la conception d'interfaces modernes, j'aime transformer des lignes de code 
                                en solutions fonctionnelles, performantes et sécurisées.
                            </p>
                        </div>
                        <div class="actu-block">
                            <div class="block-label">Actuellement</div>
                            <div class="block-title">ACTUELLEMENT_</div>
                            <p>Étudiant en première année de BUT Informatique à l'Université Caen Normandie.</p>
                        </div>
                        <div class="box-button">
                            <div class="nav-arrows">
                                <button class="arrow-btn" onclick="scrollToSection('body-contact')">
                                    Contactez-moi ↓
                                </button>
                            </div>
                            <div class="nav-arrows" id="cv">
                                <a href="../document/Noah_Quaghebeur_CV.pdf" download="Noah_Quaghebeur_CV.pdf" class="arrow-btn">
                                    <img src="assets/img/file-earmark-person.svg">
                                    Obtenir le CV
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CONTACT -->
            <div class="chapter" id="body-contact" style="border-bottom:none; padding-bottom:4rem;">
                <div class="chapter-header">
                    <h2 class="chapter-title">Contactez-moi</h2>
                </div>
                <form class="contact-grid" onsubmit="return false;">
                    <div class="form-field">
                        <label>Nom *</label>
                        <input type="text" id="nomContact" required>
                    </div>
                    <div class="form-field">
                        <label>Prénom</label>
                        <input type="text" id="prenomContact">
                    </div>
                    <div class="form-field">
                        <label>E-Mail *</label>
                        <input type="email" id="emailContact" required>
                    </div>
                    <div class="form-field">
                        <label>Téléphone</label>
                        <input type="tel" id="telContact">
                    </div>
                    <div class="form-field field-full">
                        <label>Objet *</label>
                        <input type="text" id="objetContact" required>
                    </div>
                    <div class="form-field field-full">
                        <label>Message *</label>
                        <textarea id="messageContact" required></textarea>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" id="checkDefault" required>
                        <label for="checkDefault">En soumettant ce formulaire, j'accepte que mes données personnelles soient utilisées pour me recontacter. Aucun autre traitement ne sera effectué avec mes informations.</label>
                    </div>
                    <div style="grid-column:1/-1;">
                        <button class="btn-submit" type="submit">Envoyer →</button>
                    </div>
                </form>
            </div>
        </div>
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

function activeDiv() {
    document.querySelectorAll('*').forEach(el => {
        el.style.border = '1px solid red';
        el.style.boxSizing = 'border-box';
    });
}

function desactiveDiv() {
    document.querySelectorAll('*').forEach(el => el.style.border = '');
}

function toggleDivBorders() {
    const first = document.querySelector('*');
    (first && first.style.border.includes('red')) ? desactiveDiv() : activeDiv();
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
    accueil();

    const displayMode = window.innerWidth < 800 ? 'none' : 'flex';

    // header sticky shadow
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;';
    document.body.prepend(sentinel);
    new IntersectionObserver(entries => {
        document.querySelector('header').classList.toggle('is-pinned', !entries[0].isIntersecting);
    }).observe(sentinel);
});

//TEMPORAIRE
function closeModal() {
    const modal = document.getElementById('dev-modal');
    modal.style.display = 'none';
    // Optionnel : ne plus l'afficher pendant cette session
    sessionStorage.setItem('devModalSeen', 'true');
}

// Vérifie si l'utilisateur l'a déjà vue
window.onload = function () {
    if (sessionStorage.getItem('devModalSeen')) {
        document.getElementById('dev-modal').style.display = 'none';
    }
};

function compte() {
    window.location.href = "pages/login.html";
}