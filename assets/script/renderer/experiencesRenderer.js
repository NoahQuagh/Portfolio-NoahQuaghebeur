document.addEventListener("DOMContentLoaded", function() {
    fetch('../api/loaders/loadExperiences.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw new Error(res.message);
            }else{
                renderExperiences(res.data);
            }
        })
        .catch(error => {
            renderExperiences({});
        });
});


function renderExperiences(data) {
    if (!data || data.length === 0) {
        return;
    }

    const skill_grid = document.getElementById('exp-zone');

    skill_grid.innerHTML = data.map(t => {
        const travail = (lang === 'en' && t.travail_en) ? t.travail_en : t.travail;
        const desc = (lang === 'en' && t.description_en) ? t.description_en : (t.desc ?? '');

        return `
        <div class="timeline-item">
            <div class="timeline-dot"><i class="${t.icon}" aria-hidden="true"></i></div>
            <div class="timeline-content">
                <p class="timeline-period">${t.date}</p>
                <h3 class="timeline-title">${travail}</h3>
                <p class="timeline-sub">${t.localisation}</p>
                <p class="timeline-desc">${desc}</p>
            </div>
        </div>
    `;
    }).join('');
}