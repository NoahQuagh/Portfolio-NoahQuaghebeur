<?php
require_once __DIR__ . '/../auth/guard.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gérer les Compétences - Admin</title>
    <link rel="stylesheet" href="../assets/style/palette.css">
    <link rel="stylesheet" href="../assets/style/responsive.css">
    <link rel="stylesheet" href="../assets/style/admin/mainAdmin.css">
    <link rel="stylesheet" href="../assets/style/admin/competenceAdmin.css">
    <link rel="stylesheet" href="../assets/style/spinner.css">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body>
<header class="admin-bar">
    <div class="admin-bar-brand"><a href="dashboard.php" style="color:inherit; text-decoration:none;">Portfolio <em>Admin</em></a></div>
    <div class="admin-bar-right">
        <a href="dashboard.php" class="admin-logout" style="border-color: rgba(255,255,255,0.15); color: #fff;">
            <i class="ti ti-arrow-left"></i> Retour
        </a>
        <a href="../auth/logout.php" class="admin-logout">
            <i class="ti ti-logout"></i> Déconnexion
        </a>
    </div>
</header>

<main>
    <div class="page-kicker">// SAVOIR-FAIRE</div>
    <h1 class="page-title">Gérer les <em>Compétences</em></h1>
    <p class="page-sub">Ajoutez ou modifiez des domaines d'expertise et leurs catégories associées.</p>

    <details class="admin-details">
        <summary class="admin-details-summary">
            <i class="ti ti-folder-plus"></i> + Créer une nouvelle catégorie (ex: DevOps, Sécurité)
        </summary>
        <form action="actions/add_categorie.php" method="POST" class="admin-form" style="margin-top: 1rem;">
            <div class="form-grid">
                <div class="form-group">
                    <label for="com_categorie" class="form-label">Nom de la catégorie</label>
                    <input type="text" id="com_categorie" name="com_categorie" required placeholder="ex: Base de données" class="form-input">
                </div>
                <div class="form-group">
                    <label for="com_icone" class="form-label">Classe Icône (Tabler Icons)</label>
                    <input type="text" id="com_icone" name="com_icone" required placeholder="ex: ti ti-database" class="form-input">
                </div>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-submit"><i class="ti ti-plus"></i> Créer la catégorie</button>
            </div>
        </form>
    </details>

    <div class="section-divider"><span>Catégories existantes</span></div>

        <section class="admin-card-group" id="competence-zone">
            <span class="loader"></span>
        </section>

    <form action="actions/create_domaine.php" method="POST" class="add-domaine-form">
        <input type="hidden" name="dom_comp_id">
        <span class="form-label" style="grid-column: 1 / -1;">+ Créer une nouvelle technologie</span>

        <input type="text" name="dom_nom" placeholder="Nom (ex: PostgreSQL)" required class="form-input">
        <input type="text" name="dom_logo" placeholder="Logo " required class="form-input">
        <input type="text" name="dom_desc" placeholder="Description" required class="form-input">

        <button type="submit" class="btn-submit" style="padding: 0.5rem 1rem;">
            <i class="ti ti-plus"></i> Créer
        </button>
    </form>

</main>
<script src="../assets/script/admin/renderer/CompetenceRenderer_admin.js"></script>
</body>
</html>
