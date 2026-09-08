document.addEventListener("DOMContentLoaded", function() {
    fetch('../api/loaders/loadParcours.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw new Error(res.message);
            }else{
                renderParcours(res.data);
            }
        })
        .catch(error => {
            renderParcours({});
        });
});


function renderParcours(data) {
    if (!data || data.length === 0) {
        return;
    }

    const skill_grid = document.getElementById('timeline-zone');

    skill_grid.innerHTML = data.map(t => {
        const titre = (lang === 'en' && t.titre_en) ? t.titre_en : t.titre;
        const desc = (lang === 'en' && t.desc_en) ? t.desc_en : (t.desc ?? '');

        return `
        <div class="timeline-item">
            <div class="timeline-dot"><i class="${t.icon}" aria-hidden="true"></i></div>
            <div class="timeline-content">
                <p class="timeline-period">${t.date}</p>
                <h3 class="timeline-title">${titre}</h3>
                <p class="timeline-sub">${t.localisation}</p>
                <p class="timeline-desc">${desc}</p>
            </div>
        </div>
    `;
    }).join('');
}