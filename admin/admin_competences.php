<?php
session_start();
require_once __DIR__ . '/../db/connexion_portfolio_db.php';

$db = getDB();

$req = $db->prepare('
    SELECT c.com_id, c.com_categorie, c.com_icone,
           d.dom_id, d.dom_nom, d.dom_logo, d.dom_desc
    FROM POR_COMPETENCES c
    LEFT JOIN POR_DOMAINES d ON d.dom_comp_id = c.com_id
    ORDER BY c.com_id, d.dom_id
');
$req->execute();
$rows = $req->fetchAll(PDO::FETCH_ASSOC);

$categories = [];
foreach ($rows as $row) {
    $catId = $row['com_id'];
    if (!isset($categories[$catId])) {
        $categories[$catId] = [
            'id'        => $row['com_id'],
            'nom'       => $row['com_categorie'],
            'icone'     => $row['com_icone'],
            'domaines'  => []
        ];
    }
    if ($row['dom_id']) {
        $categories[$catId]['domaines'][] = [
            'id'    => $row['dom_id'],
            'nom'   => $row['dom_nom'],
            'logo'  => $row['dom_logo'],
            'desc'  => $row['dom_desc']
        ];
    }
}

$reqDomaines = $db->query('SELECT dom_id, dom_nom FROM POR_DOMAINES ORDER BY dom_nom ASC');
$tousLesDomaines = $reqDomaines->fetchAll(PDO::FETCH_ASSOC);
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

    <!-- LISTE DES CATÉGORIES ET DE LEURS DOMAINES -->
    <?php foreach ($categories as $cat): ?>
        <section class="admin-card-group">
            <div class="cat-header">
                <div class="cat-title">
                    <i class="<?= htmlspecialchars($cat['icone']) ?>"></i>
                    <h2><?= htmlspecialchars($cat['nom']) ?></h2>
                </div>
                <span class="card-tag"><?= count($cat['domaines']) ?> domaine(s)</span>
            </div>

            <!-- DOMAINES COMPRIS DANS CETTE CATÉGORIE -->
            <div class="domaines-grid">
                <?php foreach ($cat['domaines'] as $dom): ?>
                    <form action="actions/update_domaine.php" method="POST" class="domaine-card">
                        <input type="hidden" name="dom_id" value="<?= $dom['id'] ?>">

                        <div class="form-group">
                            <label class="form-label"><?= htmlspecialchars($dom['nom']) ?></label>
                        </div>

                        <div class="domaine-card-actions">
                            <button type="submit" name="action" value="delete" class="btn-icon btn-delete" title="Supprimer" onclick="return confirm('Supprimer ce domaine ?');">
                                <i class="ti ti-trash"></i>
                            </button>
                        </div>
                    </form>
                <?php endforeach; ?>
            </div>

            <form action="actions/add_domaine.php" method="POST" class="add-domaine-form">
                <input type="hidden" name="dom_comp_id" value="<?= $cat['id'] ?>">
                <span class="form-label" style="grid-column: 1 / -1;">+ Ajouter un domaine existant à "<?= htmlspecialchars($cat['nom']) ?>"</span>

                <!-- Liste déroulante des domaines existants -->
                <select name="dom_id" required class="form-input">
                    <option value="" disabled selected>Sélectionner un domaine...</option>
                    <?php foreach ($tousLesDomaines as $domaineOption): ?>
                        <option value="<?= $domaineOption['dom_id'] ?>">
                            <?= htmlspecialchars($domaineOption['dom_nom']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>

                <button type="submit" class="btn-submit" style="padding: 0.5rem 1rem;">
                    <i class="ti ti-plus"></i> Associer
                </button>
            </form>
        </section>
    <?php endforeach; ?>

    <form action="actions/create_domaine.php" method="POST" class="add-domaine-form">
        <input type="hidden" name="dom_comp_id" value="<?= $cat['id'] ?>">
        <span class="form-label" style="grid-column: 1 / -1;">+ Créer une nouvelle technologie pour "<?= htmlspecialchars($cat['nom']) ?>"</span>

        <input type="text" name="dom_nom" placeholder="Nom (ex: PostgreSQL)" required class="form-input">
        <input type="text" name="dom_logo" placeholder="Logo " required class="form-input">
        <input type="text" name="dom_desc" placeholder="Description" required class="form-input">

        <button type="submit" class="btn-submit" style="padding: 0.5rem 1rem;">
            <i class="ti ti-plus"></i> Créer
        </button>
    </form>

</main>
</body>
</html>
