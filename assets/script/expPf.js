const experiences = [
    {
        poste: 'Coéquipier polyvalent',
        entreprise: 'McDonald\'s',
        type: 'CDD',
        debut: 'Déc 2025',
        fin: 'Jan 2026',
        description: 'Description du poste et des missions effectuées.',
        tech: ['Cuisine', 'SAT', 'Drive'],
    }
];

function experience() {
    const badgeType = {
        'Stage': 'exp-badge-stage',
        'Alternance': 'exp-badge-alternance',
        'CDI': 'exp-badge-cdi',
        'CDD': 'exp-badge-cdd',
        'Freelance': 'exp-badge-freelance',
    };

    const items = experiences.map((e, i) => `
        <div class="exp-card" style="transition-delay:${i * 80}ms;" onclick="this.classList.toggle('open')">
            <div class="exp-card-top">
                <div class="exp-card-meta">
                    <span class="exp-badge ${badgeType[e.type] ?? 'exp-badge-stage'}">${e.type.toUpperCase()}</span>
                    <span class="exp-dates">${e.debut} — ${e.fin}</span>
                </div>
                <div class="exp-poste">${e.poste}</div>
                <div class="exp-entreprise">${e.entreprise}</div>
                <span class="exp-toggle">▾ détails</span>
            </div>
            <div class="exp-detail">${e.description}</div>
            <div class="exp-card-footer">
                ${e.tech.map(t => `<span class="exp-tech">${t}</span>`).join('')}
            </div>
        </div>`).join('');

    const content = `
        <div class="section-wrap">
            <div class="chapter" style="border-bottom:none; padding-bottom:4rem;">
                <div class="chapter-header">
                    <span class="chapter-num">\\expériences</span>
                    <h2 class="chapter-title">Mes Expériences</h2>
                </div>
                <div class="exp-grid">${items}</div>
            </div>
        </div>`;

    changeContent('accueil', content);

    setTimeout(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('show');
            });
        }, {threshold: 0.15});
        document.querySelectorAll('.exp-card').forEach(el => observer.observe(el));
    }, 300);
}