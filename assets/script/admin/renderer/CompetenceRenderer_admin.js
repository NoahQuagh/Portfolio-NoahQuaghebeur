document.addEventListener("DOMContentLoaded", function () {
    fetch('../api/loaders/loadCompetences.php')
        .then(res => res.json())
        .then(res => {
            if (!res.success) throw new Error(res.message);
            renderCompetence_admin(res.data, res.tous_domaines ?? []);
        })
        .catch(err => {
            console.error('[Competence Admin]', err);
            document.getElementById('competence-zone').innerHTML =
                `<p style="color:var(--color-1);font-family:var(--font-mono);font-size:13px;">
                    <i class="ti ti-alert-circle"></i> Erreur de chargement.
                 </p>`;
        });
});

function renderCompetence_admin(categories, tousLesDomaines) {
    const zone = document.getElementById('competence-zone');
    if (!categories || categories.length === 0) {
        zone.innerHTML = `<p style="color:var(--wh3);font-family:var(--font-mono);font-size:13px;">Aucune catégorie trouvée.</p>`;
        return;
    }

    zone.innerHTML = categories.map(cat => `
        <section class="admin-card-group">
            <div class="cat-header">
                <div class="cat-title">
                    <i class="${escHtml(cat.icone)}"></i>
                    <h2>${escHtml(cat.categorie)}</h2>
                </div>
                <span class="card-tag">${cat.domaines.length} domaine(s)</span>
            </div>

            <!-- DOMAINES -->
            <div class="domaines-grid">
                ${cat.domaines.map(dom => `
                    <form action="actions/update_domaine.php" method="POST" class="domaine-card">
                        <input type="hidden" name="dom_id" value="${dom.id}">
                        <div class="form-group">
                            <label class="form-label">${escHtml(dom.nom)}</label>
                        </div>
                        <div class="domaine-card-actions">
                            <button type="submit" name="action" value="delete"
                                class="btn-icon btn-delete" title="Supprimer"
                                onclick="return confirm('Supprimer ce domaine ?');">
                                <i class="ti ti-trash"></i>
                            </button>
                        </div>
                    </form>
                `).join('')}
            </div>

            <!-- AJOUT DOMAINE -->
            <form action="actions/add_domaine.php" method="POST" class="add-domaine-form">
                <input type="hidden" name="dom_comp_id" value="${cat.id}">
                <span class="form-label" style="grid-column:1/-1;">
                    + Ajouter un domaine existant à "${escHtml(cat.categorie)}"
                </span>
                <select name="dom_id" required class="form-input">
                    <option value="" disabled selected>Sélectionner un domaine...</option>
                    ${tousLesDomaines.map(d => `
                        <option value="${d.dom_id}">${escHtml(d.dom_nom)}</option>
                    `).join('')}
                </select>
                <button type="submit" class="btn-submit" style="padding:0.5rem 1rem;">
                    <i class="ti ti-plus"></i> Associer
                </button>
            </form>
        </section>
    `).join('');
}

// Échappe les caractères HTML pour éviter les injections
function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}