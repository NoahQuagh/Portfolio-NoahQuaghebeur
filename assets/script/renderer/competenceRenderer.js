document.addEventListener("DOMContentLoaded", function() {
    fetch('../api/loaders/loadCompetences.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw new Error(res.message);
            }else{
                renderCompetence(res.data);
            }
        })
        .catch(error => {
            renderCompetence({});
        });
});


function renderCompetence(data) {
    if (!data || data.length === 0) {
        return;
    }

    const skill_grid = document.getElementById('skill-zone');

    skill_grid.innerHTML = data.map(t => `
        <div class="skill-cat">
            <div class="skill-cat-title">
                <i class="${t.icone}" aria-hidden="true"></i>
                ${t.categorie}
            </div>
            <div class="skill-tags">
                ${t.domaines.map(d => `
                    <span class="skill-tag tooltip-container">
                        ${d.logo ? `<img src="${d.logo}" alt="${d.nom}">` : ''}
                        ${d.nom}
                        <span class="tooltip-text">${d.desc ?? ''}</span>
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
}