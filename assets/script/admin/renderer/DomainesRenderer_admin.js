document.addEventListener("DOMContentLoaded", function () {
    fetch('../api/loaders/loadCompetences.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) throw new Error(res.message);
            renderCompetence_admin(res.data, res.tous_domaines ?? []);
        })
        .catch(err => {
            document.getElementById('domaines-zone').innerHTML =
                `<p style="color:var(--color-1);font-family:var(--font-mono);font-size:13px;">
                    <i class="ti ti-alert-circle"></i> Erreur de chargement.
                 </p>`;
        });
});

function renderCompetence_admin(categories, tousLesDomaines) {
    const zone = document.getElementById('domaines-zone');
    if (!categories || categories.length === 0) {
        zone.innerHTML = `<p style="color:var(--wh3);font-family:var(--font-mono);font-size:13px;">Aucune catégorie trouvée.</p>`;
        return;
    }

    zone.innerHTML =`
        <form action="../api/admin/inserters/add_domaine.php" method="POST" class=" admin-card-group">
            <input type="hidden" name="dom_comp_id">
            <span class="form-label" style="grid-column: 1 / -1;">+ Créer une nouvelle technologie</span>
    
            <input type="text" name="dom_nom" placeholder="Nom (ex: PostgreSQL)" required class="form-input">
            <input type="text" name="dom_logo" placeholder="Logo " class="form-input">
            <input type="text" name="dom_desc" placeholder="Description" required class="form-input">
            <input type="text" name="dom_desc_en" placeholder="Description anglaise" required class="form-input">
    
            <button type="submit" class="btn-submit" style="padding: 0.5rem 1rem;">
                <i class="ti ti-plus"></i> Créer
            </button>
        </form>
        
        
        <form action="../api/admin/deleters/delete_domaine.php" method="POST" class="add-domaine-form admin-card-group">
            <span class="form-label" style="grid-column: 1 / -1;">- Supprimer une technologie</span>
    
            <select name="dom_id" required class="form-input">
                <option value="" disabled selected>Sélectionner un domaine...</option>
                ${tousLesDomaines
        .map(d => `
                    <option value="${d.dom_id}">${escHtml(d.dom_nom)}</option>
                `).join('')}
            </select>
    
            <button type="submit" class="btn-submit btn-delete" style="padding: 0.5rem 1rem;">
                <i class="ti ti-minus"></i> Supprimer
            </button>
        </form>
     `;

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