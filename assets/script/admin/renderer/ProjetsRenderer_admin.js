document.addEventListener("DOMContentLoaded", function () {
    fetch('../api/loaders/loadProjets.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) throw new Error(res.message);
            renderProjets_admin(res.data,res.tous_domaines);
        })
        .catch(err => {
            document.getElementById('projet-zone').innerHTML =
                `<p style="color:var(--color-1);font-family:var(--font-mono);font-size:13px;">
                    <i class="ti ti-alert-circle"></i> Erreur de chargement.
                 </p>`;
        });
});

function renderProjets_admin(data,tousDomaines) {
    const zone = document.getElementById('projet-zone');
    if (!data || data.length === 0) {
        zone.innerHTML = `<p style="color:var(--wh3);font-family:var(--font-mono);font-size:13px;">Aucun projet trouvée.</p>`;
        return;
    }

    zone.innerHTML =`
        ${data.map(data => `
        <section class="admin-card-group">
            <div class="cat-header" style="display: flex; align-items: center; justify-content: space-between;">
                <div class="cat-title" style="display: flex; align-items: center; gap: 0.5rem;">
                    <h2>${escHtml(data.nom)}</h2>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">      
                    <form action="../api/admin/deleters/delete_projet.php" method="POST" style="margin: 0;">
                        <input type="hidden" name="proId" value="${data.id}">
                        <button type="submit" 
                                class="btn-icon btn-delete" 
                                title="Supprimer cette catégorie">
                            <i class="ti ti-trash"></i>
                        </button>
                    </form>
                </div>
            </div>
            <form action="../api/admin/updaters/update_projet.php" method="POST" class="domaine-card">
                <input type="hidden" name="pro_id" value="${data.id}">
                
                
                <label  class="form-label">Titre</label>
                <input type="text" name="pro_titre_en" value="${data.nom_en}" required class="form-input">
                
                <label  class="form-label">Titre anglais</label>
                <input type="text" name="pro_titre" value="${data.nom}" required class="form-input">
                
                <label  class="form-label">Description</label>
                <textarea name="pro_desc" required class="form-input">${data.desc}</textarea>
                
                <label  class="form-label">Description anglais</label>
                <textarea name="pro_desc_en" required class="form-input">${data.desc_en}</textarea>
                
                <label  class="form-label">GitHub</label>
                <input type="text" name="pro_github" value="${data.github}" required class="form-input">
                
                <label  class="form-label">Lien du projet</label>
                <input type="text" name="pro_lien" value="${data.lien}" required class="form-input">
                
                <label  class="form-label">Nom image</label>
                <input type="text" name="pro_img" value="${data.img}" required class="form-input">

                <button type="submit" class="btn-submit" style="padding: 0.5rem 1rem;">
                    <i class="ti ti-edit"></i> Modifier
                </button>
            </form>
            ${data.domaines.map(d => `
                    <form action="../api/admin/updaters/update_domaine_inPro.php" method="POST" class="domaine-card">
                        <input type="hidden" name="dom_id" value="${d.id}">
                        <input type="hidden" name="pro_id" value="${data.id}">
                        
                        <div class="form-group">
                            <label class="form-label">${escHtml(d.nom)}</label>
                        </div>
                        <div class="domaine-card-actions">
                            <button type="submit" name="action" value="delete"
                                class="btn-icon btn-delete" title="Supprimer">
                                <i class="ti ti-trash"></i>
                            </button>
                        </div>
                    </form>
                `).join('')}
                <form action="../api/admin/inserters/add_domaine_inPro.php" method="POST" class="add-domaine-form">
                    <input type="hidden" name="pro_id" value="${data.id}">
                    
                
                    <span class="form-label" style="grid-column:1/-1;">
                        + Ajouter un domaine existant à "${escHtml(data.nom)}"
                    </span>
                    <select name="dom_id" required class="form-input">
                        <option value="" disabled selected>Sélectionner un domaine...</option>
                            ${tousDomaines
                                .map(d => `
                                <option value="${d.dom_id}">${escHtml(d.dom_nom)}</option>
                            `).join('')}
                    </select>
                    <button type="submit" class="btn-submit" style="padding:0.5rem 1rem;">
                        <i class="ti ti-plus"></i> Associer
                    </button>
                </form>
        </section>`).join('')}
        <details class="admin-details">
            <summary class="admin-details-summary">
                <i class="ti ti-folder-plus"></i> + Créer un nouveau projet
            </summary>
            <form action="../api/admin/inserters/add_projet.php" method="POST" class="domaine-card" style="margin-top: 1rem">
                             
                <label  class="form-label">Titre</label>
                <input type="text" name="pro_titre"  required class="form-input">
                
                <label  class="form-label">Titre anglais</label>
                <input type="text" name="pro_titre_en"  required class="form-input">
                
                <label  class="form-label">Description</label>
                <textarea name="pro_desc" required class="form-input"></textarea>
                
                <label  class="form-label">Description anglais</label>
                <textarea name="pro_desc_en" required class="form-input"></textarea>
                
                <label " class="form-label">GitHub</label>
                <input type="text" name="pro_github"  required class="form-input">
                
                <label class="form-label">Lien du projet</label>
                <input type="text" name="pro_lien"  required class="form-input">
                
                <label  class="form-label">Nom image</label>
                <input type="text" name="pro_img"  required class="form-input">
                
                
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