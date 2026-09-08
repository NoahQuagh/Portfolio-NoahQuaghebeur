document.addEventListener("DOMContentLoaded", function () {
    fetch('../api/loaders/loadParcours.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) throw new Error(res.message);
            renderParcours_admin(res.data);
        })
        .catch(err => {
            document.getElementById('parcours-zone').innerHTML =
                `<p style="color:var(--color-1);font-family:var(--font-mono);font-size:13px;">
                    <i class="ti ti-alert-circle"></i> Erreur de chargement.
                 </p>`;
        });
});

function renderParcours_admin(data) {
    const zone = document.getElementById('parcours-zone');
    if (!data || data.length === 0) {
        zone.innerHTML = `<p style="color:var(--wh3);font-family:var(--font-mono);font-size:13px;">Aucun parcours trouvée.</p>`;
        return;
    }

    zone.innerHTML =`
        ${data.map(data => `
        <section class="admin-card-group">
            <div class="cat-header" style="display: flex; align-items: center; justify-content: space-between;">
                <div class="cat-title" style="display: flex; align-items: center; gap: 0.5rem;">
                    <h2>${escHtml(data.titre)}</h2>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">      
                    <form action="../api/admin/deleters/delete_parcours.php" method="POST" style="margin: 0;">
                        <input type="hidden" name="parId" value="${data.id}">
                        <button type="submit" 
                                class="btn-icon btn-delete" 
                                title="Supprimer cette catégorie">
                            <i class="ti ti-trash"></i>
                        </button>
                    </form>
                </div>
            </div>
            <form action="../api/admin/updaters/update_parcours.php" method="POST" class="domaine-card">
                <input type="hidden" name="par_id" value="${data.id}">
                
                
                <label class="form-label">Formation</label>
                <input type="text" name="par_titre" value="${data.titre}" required class="form-input">
                
                <label class="form-label">Formation anglais</label>
                <input type="text" name="par_titre_en" value="${data.titre_en}" required class="form-input">
                
                <label class="form-label">Icon</label>
                <input type="text" name="par_icon" value="${data.icon}" required class="form-input">
                
                <label class="form-label">Localisation</label>
                <input type="text" name="par_loc" value="${data.localisation}" required class="form-input">
                
                <label class="form-label">Description</label>
                <textarea name="par_desc" required class="form-input">${data.desc}</textarea>
                
                <label class="form-label">Description anglais</label>
                <textarea name="par_desc_en" required class="form-input">${data.desc_en}</textarea>
                
                <label class="form-label">Dates</label>
                <input type="date" name="date_debut" value="${data.date_debut}" required class="form-input">
                
                <input type="date" name="date_fin" value="${data.date_fin}" class="form-input">
                
                
                
                <button type="submit" class="btn-submit" style="padding: 0.5rem 1rem;">
                    <i class="ti ti-edit"></i> Modifier
                </button>
            </form>
        </section>`).join('')}
        <details class="admin-details">
            <summary class="admin-details-summary">
                <i class="ti ti-folder-plus"></i> + Créer une nouvelle étapes du parcours
            </summary>
            <form action="../api/admin/inserters/add_parcours.php" method="POST" class="domaine-card" style="margin-top: 1rem">
                             
                <label class="form-label">Formation</label>
                <input type="text" name="par_titre" placeholder="titre" required class="form-input">
                
                <label class="form-label">Formation anglais</label>
                <input type="text" name="par_titre_en" placeholder="titre" required class="form-input">
                
                <label class="form-label">Icon</label>
                <input type="text" name="par_icon" placeholder="ti ti-school ou ti ti-certificate" required class="form-input">
                
                <label class="form-label">Localisation</label>
                <input type="text" name="par_loc" placeholder="localisation" required class="form-input">
                
                <label class="form-label">Description</label>
                <textarea name="par_desc" placeholder="description" required class="form-input"></textarea>
                
                <label class="form-label">Description anglais</label>
                <textarea name="par_desc_en" placeholder="description" required class="form-input"></textarea>
                
                <label class="form-label">Dates</label>
                <input type="date" name="date_debut" required class="form-input">
                
                <input type="date" name="date_fin"  class="form-input">
                
                
                <button type="submit" class="btn-submit" style="padding: 0.5rem 1rem;">
                    <i class="ti ti-edit"></i> Créer
                </button>
            </form>
        </details>
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