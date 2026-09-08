document.addEventListener("DOMContentLoaded", function() {
    fetch('../api/loaders/loadProjets.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw new Error(res.message);
            }else{
                renderProjet(res.data);
            }
        })
        .catch(error => {
            renderProjet({});
        });
});


function renderProjet(data) {
    if (!data || data.length === 0) {
        return;
    }

    const skill_grid = document.getElementById('projet-zone');

    skill_grid.innerHTML = data.map(t => {
        const nom = (lang === 'en' && t.nom_en) ? t.nom_en : t.nom;
        const desc = (lang === 'en' && t.desc_en) ? t.desc_en : (t.desc ?? '');

        return `
        <div class="project-card">
            <div class="project-icon"><img src="assets/img/${t.img}" alt="${nom}"></div>
            <div class="project-card-top">
                <h3 class="project-title">${nom}</h3>
                <div class="project-links">
                    <a href="${t.github}" class="project-link" aria-label="GitHub"><i class="ti ti-brand-github" aria-hidden="true"></i></a>
                    <a href="https://${t.lien}" class="project-link" aria-label="Voir le projet" rel="noopener"><i class="ti ti-external-link" aria-hidden="true"></i></a>
                </div>
            </div>
            <p class="project-desc">${desc}</p>
            <div class="project-tags">
                ${t.domaines.map(d => `<span class="badge badge-normal">${d.nom}</span>`).join('')}
            </div>
        </div>
    `;
    }).join('');
}