function parcours() {
    const etapes = [
        {
            date: '2023 – 2024',
            titre: 'Lycée — Première',
            desc: 'Première Générale avec spécialité Mathématiques, Physique et Chimie et Numérique et Sciences Informatiques (NSI).'
        },
        {
            date: '2024 – 2025',
            titre: 'Lycée — Terminale',
            desc: 'Terminale Générale avec spécialité Mathématiques et Numérique et Sciences Informatiques (NSI).'
        },
        {
            date: '2025 – 2026',
            titre: 'BUT Informatique — 1ère année',
            desc: 'Étudiant à l\'IUT de Caen, découverte du développement web, C et Java. Découverte de l\'architecture réseau et des bases de données.'
        },
        {
            date: '2026 – 2027',
            titre: 'BUT Informatique — 2ème année',
            desc: 'Vide'
        },
        {
            date: '2027 – 2028',
            titre: 'BUT Informatique — 3ème année',
            desc: 'Vide'
        },
    ];

    const items = etapes.map((e, i) => `
        <div class="timeline-item" style="transition-delay:${i * 80}ms;">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-date">${e.date}</span>
                <h3 class="timeline-title">${e.titre}</h3>
                <p class="timeline-description">${e.desc}</p>
            </div>
        </div>`).join('');

    const content = `
        <div class="section-wrap">
            <div class="chapter" style="border-bottom:none; padding-bottom:4rem;">
                <div class="chapter-header">
                    <span class="chapter-num">\\parcours</span>
                    <h2 class="chapter-title">Mon Parcours</h2>
                </div>
                <div class="timeline" id="timeline">${items}</div>
            </div>
        </div>`;

    changeContent('accueil', content);

    setTimeout(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('show');
            });
        }, {threshold: 0.15});
        document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
    }, 300);
}
