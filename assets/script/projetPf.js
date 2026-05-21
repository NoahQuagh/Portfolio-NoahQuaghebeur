function projet() {
    const projects = [
        {
            fileName: 'projet1',
            date: 'Projet de NSI — 2025',
            titre: 'Jeu de la vie',
            desc: 'Simulateur du jeu de la vie.',
            tech: ['Python'],
            details: 'Implémentation du célèbre automate cellulaire de Conway. Chaque cellule évolue selon des règles simples : survie, mort ou naissance en fonction de ses voisins. Interface graphique permettant de dessiner des configurations initiales et d\'observer leur évolution en temps réel.',
            link: ''
        },
        {
            fileName: 'projet2',
            date: 'Projet personnel — 2026',
            titre: 'Bot Discord : GigaBot',
            desc: 'Développement d\'un bot Discord.',
            tech: ['Java', 'JDA', 'JSON'],
            details: 'Bot Discord complet avec système de gestion d\'équipes Premier Valorant, commandes slash, invitations par DM avec boutons interactifs, stockage de données JSON et système de rappels automatiques.',
            link: ''
        },
        {
            fileName: 'imgPortfolio',
            date: 'Projet personnel — 2026',
            titre: 'Portfolio',
            desc: 'Développement de mon portfolio.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            details: 'Site portfolio dynamique avec navigation par sections, terminal interactif simulé, animations de transition, design responsive et thème cohérent inspiré de l\'esthétique des éditeurs de code.',
            link: ''
        },
    ];


    const items = projects.map((e, i) => `
        <div class="project-item show" style="transition-delay:${i * 80}ms;" onclick="ouvrirProjet(${i})">
            <div class="project-content">
                <img src=../assets/img/${e.fileName}.png alt="${e.titre}" class="project-img">
                <div class="project-info">
                    <span class="project-date">${e.date}</span>
                    <h3 class="project-title">${e.titre}</h3>
                    <p class="project-description">${e.desc}</p>
                </div>
            </div>
        </div>`).join('');

    const content = `
        <div class="section-wrap">
            <div class="chapter" style="border-bottom:none; padding-bottom:4rem;">
                <div class="projet-scene">
                    <div class="projet-liste-wrap" id="projet-liste">
                        <div class="chapter-header">
                            <span class="chapter-num">\\projets</span>
                            <h2 class="chapter-title">Mes Projets</h2>
                        </div>
                        <div class="project" id="project">${items}</div>
                    </div>
                    <div class="projet-detail-wrap" id="projet-detail"></div>
                </div>
            </div>
        </div>`;

    changeContent('accueil', content);

    // Stocker les projets pour y accéder depuis ouvrirProjet()
    window._projets = projects;
}

function ouvrirProjet(index) {
    const e = window._projets[index];
    const liste = document.getElementById('projet-liste');
    const detail = document.getElementById('projet-detail');
    if (!liste || !detail) return;

    // Slide out vers la gauche
    liste.classList.add('slide-out-left');
    if (index === 0) {
        detail.innerHTML = `
        <div class="chapter-header" style="margin-bottom:1rem;">
            <span class="chapter-num">${e.date}</span>
            <h2 class="chapter-title">${e.titre}</h2>
        </div>
        <img src="../assets/img/${e.fileName}.png" alt="${e.titre}" class="projet-detail-img" style="object-position:center;object-fit:contain;background: #000000;">
        <div class="projet-back-div-btn">
            <button class="projet-back-btn" onclick="projet()">← Retour</button>
            <button class="projet-doc-btn" onclick="">Documentation</button>
        </div>
        <div class="projet-tech-list">
            ${e.tech.map(t => `<span class="projet-tech-tag">${t}</span>`).join('')}
        </div>
        <p class="projet-detail-desc">${e.details}</p>
    `;
    } else if (index === 1) {
        detail.innerHTML = `
        <div class="chapter-header" style="margin-bottom:1rem;">
            <span class="chapter-num">${e.date}</span>
            <h2 class="chapter-title">${e.titre}</h2>
        </div>
        <img src="../assets/img/${e.fileName}.png" alt="${e.titre}" class="projet-detail-img">
        <div class="projet-back-div-btn">
            <button class="projet-back-btn" onclick="projet()">← Retour</button>
            <a class="projet-doc-btn" href="../../pages/gigadoc.html">Documentation</a>
        </div>
        <div class="projet-tech-list">
            ${e.tech.map(t => `<span class="projet-tech-tag">${t}</span>`).join('')}
        </div>
        <p class="projet-detail-desc">${e.details}</p>
    `;
    } else if (index === 2) {
        detail.innerHTML = `
        <div class="chapter-header" style="margin-bottom:1rem;">
            <span class="chapter-num">${e.date}</span>
            <h2 class="chapter-title">${e.titre}</h2>
        </div>
        <img src="../assets/img/${e.fileName}.png" alt="${e.titre}" class="projet-detail-img">
        <div class="projet-back-div-btn">
            <button class="projet-back-btn" onclick="projet()">← Retour</button>
        </div>
        <div class="projet-tech-list">
            ${e.tech.map(t => `<span class="projet-tech-tag">${t}</span>`).join('')}
        </div>
        <p class="projet-detail-desc">${e.details}</p>
    `;
    }


    liste.innerHTML = '';

    // Slide in depuis la droite (léger délai pour que le CSS de départ soit appliqué)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            detail.classList.add('slide-in');
        });
    });
}

function fermerProjet() {
    const liste = document.getElementById('projet-liste');
    const detail = document.getElementById('projet-detail');
    if (!liste || !detail) return;

    // Inverser : detail sort à droite, liste revient
    detail.classList.remove('slide-in');
    setTimeout(() => {
        detail.innerHTML = '';
        liste.classList.remove('slide-out-left');
    }, 400);
}