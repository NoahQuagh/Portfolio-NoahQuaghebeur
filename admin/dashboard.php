<?php
session_start();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Portfolio</title>
    <link rel="stylesheet" href="../assets/style/palette.css">
    <link rel="stylesheet" href="../assets/style/responsive.css">
    <link rel="stylesheet" href="../assets/style/admin/mainAdmin.css">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body>
<header class="admin-bar">
    <div class="admin-bar-brand">Portfolio <em>Admin</em></div>
    <div class="admin-bar-right">
        <a href="../auth/logout.php" class="admin-logout">
            <i class="ti ti-logout"></i>
            Déconnexion
        </a>
    </div>
</header>
<main>
    <div class="page-kicker">// gestion du contenu</div>
    <h1 class="page-title">Que voulez-vous<br><em>modifier ?</em></h1>
    <p class="page-sub">Choisissez une section pour éditer son contenu affiché sur le portfolio.</p>

    <!-- CARTE PRINCIPALE : INFOS PERSO -->
    <div class="sections-grid" style="margin-bottom:0;">
        <a href="admin_profil.php" class="section-card section-card-main card-profil">
            <div class="card-main-inner">
                <div class="card-icon"><i class="ti ti-user-edit"></i></div>
                <div class="card-main-body">
                    <div class="card-label">Identité</div>
                    <div class="card-title">Informations personnelles</div>
                    <div class="card-desc">Email, CV, photo et biographie.</div>
                </div>
                <i class="ti ti-chevron-right card-arrow"></i>
            </div>
        </a>
    </div>

    <div class="section-divider"><span>Sections du portfolio</span></div>

    <div class="sections-grid">

        <a href="admin_competences.php" class="section-card card-skills">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div class="card-icon"><i class="ti ti-brain"></i></div>
                <i class="ti ti-chevron-right card-arrow"></i>
            </div>
            <div class="card-body">
                <div class="card-label">Savoir-faire</div>
                <div class="card-title">Compétences</div>
                <div class="card-desc">Technologies, langages et outils maîtrisés, organisés par catégorie.</div>
            </div>
        </a>

        <a href="admin_parcours.php" class="section-card card-parcours">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div class="card-icon"><i class="ti ti-timeline"></i></div>
                <i class="ti ti-chevron-right card-arrow"></i>
            </div>
            <div class="card-body">
                <div class="card-label">Formation</div>
                <div class="card-title">Parcours</div>
                <div class="card-desc">Timeline de votre cursus scolaire et formations.</div>
            </div>
        </a>

        <a href="admin_projets.php" class="section-card card-projets">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div class="card-icon"><i class="ti ti-folder-code"></i></div>
                <i class="ti ti-chevron-right card-arrow"></i>
            </div>
            <div class="card-body">
                <div class="card-label">Réalisations</div>
                <div class="card-title">Projets</div>
                <div class="card-desc">Projets personnels et scolaires avec détails, technologies et liens.</div>
            </div>
        </a>

        <a href="admin_experiences.php" class="section-card card-exp">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div class="card-icon"><i class="ti ti-briefcase"></i></div>
                <i class="ti ti-chevron-right card-arrow"></i>
            </div>
            <div class="card-body">
                <div class="card-label">Professionnel</div>
                <div class="card-title">Expériences</div>
                <div class="card-desc">Stages, alternances et expériences professionnelles.</div>
            </div>
        </a>

    </div>
</main>
</body>
</html>

