document.addEventListener("DOMContentLoaded", function () {
    fetch('../api/loaders/loadCompetences.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) throw new Error(res.message);
            renderCompetence_admin(res.data, res.tous_domaines ?? [],res.tous_domaines_null ?? []);
        })
        .catch(err => {
            document.getElementById('competence-zone').innerHTML =
                `<p style="color:var(--color-1);font-family:var(--font-mono);font-size:13px;">
                    <i class="ti ti-alert-circle"></i> Erreur de chargement.
                 </p>`;
        });
});

function renderCompetence_admin(categories, tousLesDomaines,tousLesDomainesNull) {
    const zone = document.getElementById('competence-zone');
    if (!categories || categories.length === 0) {
        zone.innerHTML = `<p style="color:var(--wh3);font-family:var(--font-mono);font-size:13px;">Aucune catégorie trouvée.</p>`;
        return;
    }

    zone.innerHTML =`
        ${categories.map(cat => `
        <section class="admin-card-group">
            <div class="cat-header" style="display: flex; align-items: center; justify-content: space-between;">
                <div class="cat-title" style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="${escHtml(cat.icone)}"></i>
                    <h2>${escHtml(cat.categorie)}</h2>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span class="card-tag">${cat.domaines && cat.domaines[0].id !== null ? cat.domaines.length : 0} domaine(s)</span>
                    
                    <form action="../api/admin/deleters/delete_cate.php" method="POST" style="margin: 0;">
                        <input type="hidden" name="catId" value="${cat.id}">
                        <button type="submit" 
                                class="btn-icon btn-delete" 
                                title="Supprimer cette catégorie">
                            <i class="ti ti-trash"></i>
                        </button>
                    </form>
                </div>
            </div>

            ${cat.domaines && cat.domaines.length > 0 && cat.domaines[0].id !== null ? `
                <div class="domaines-grid">
                    ${cat.domaines.map(dom => `
                        <form action="../api/admin/updaters/update_domaine_inCate.php" method="POST" class="domaine-card">
                            <input type="hidden" name="dom_id" value="${dom.id}">
                            
                            <div class="form-group">
                                <label class="form-label">${escHtml(dom.nom)}</label>
                            </div>
                            <div class="domaine-card-actions">
                                <button type="submit" name="action" value="delete"
                                    class="btn-icon btn-delete" title="Supprimer">
                                    <i class="ti ti-trash"></i>
                                </button>
                            </div>
                        </form>
                    `).join('')}
                </div>
            ` : ''}

            <form action="../api/admin/inserters/add_domaine_inCate.php" method="POST" class="add-domaine-form">
                <input type="hidden" name="catId" value="${cat.id}">
                
                <span class="form-label" style="grid-column:1/-1;">
                    + Ajouter un domaine existant à "${escHtml(cat.categorie)}"
                </span>
                <select name="dom_id" required class="form-input">
                    <option value="" disabled selected>Sélectionner un domaine...</option>
                    ${tousLesDomainesNull
                        .filter(d => d.dom_comp_id === null || d.dom_comp_id === "null" || d.dom_comp_id === 0 || !d.dom_comp_id)
                        .map(d => `
                        <option value="${d.dom_id}">${escHtml(d.dom_nom)}</option>
                    `).join('')}
                </select>
                <button type="submit" class="btn-submit" style="padding:0.5rem 1rem;">
                    <i class="ti ti-plus"></i> Associer
                </button>
            </form>
        </section>
    `).join('')}`;

}

function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}