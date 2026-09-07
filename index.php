<?php
require_once __DIR__ . '/api/loaders/loadProfile.php'
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Noah Quaghebeur - Portfolio</title>
    <link rel="stylesheet" href="assets/style/mainPage.css">
    <link rel="stylesheet" href="assets/style/toolsTipsText.css">
    <link rel="stylesheet" href="assets/style/header.css">
    <link rel="stylesheet" href="assets/style/palette.css">
    <link rel="stylesheet" href="assets/style/sidebar.css">
    <link rel="stylesheet" href="assets/style/footer.css">
    <link rel="stylesheet" href="assets/style/burger.css">
    <link rel="stylesheet" href="assets/style/spinner.css">
    <link rel="stylesheet" href="assets/style/responsive.css">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body>

<aside id="sidebar">
    <nav class="sb-nav">
        <p class="sb-label">Navigation</p>
        <ul class="sb-list">
            <li class="sb-item active">
                <a href="#hero"><i class="ti ti-home" aria-hidden="true"></i><span>Accueil</span></a>
            </li>
            <li class="sb-item">
              <a href="#competences"><i class="ti ti-code" aria-hidden="true"></i><span>Compétences</span></a>
            </li>
            <li class="sb-item">
              <a href="#parcours"><i class="ti ti-school" aria-hidden="true"></i><span>Parcours</span></a>
            </li>
            <li class="sb-item">
              <a href="#projets"><i class="ti ti-folder" aria-hidden="true"></i><span>Projets</span></a>
            </li>
            <li class="sb-item">
              <a href="#experience"><i class="ti ti-briefcase" aria-hidden="true"></i><span>Expériences</span></a>
            </li>
        </ul>
    </nav>
</aside>

<header class="floating-header">
  <div class="header-container">
    <nav class="header-nav">
      <ul>
        <li class="nav-item active" onclick="scrollTo('#hero')"><a href="#hero"><span>Accueil</span></a></li>
        <li class="nav-item" onclick="scrollTo('#competences')"><a href="#competences"><span>Compétences</span></a></li>
        <li class="nav-item" onclick="scrollTo('#parcours')"><a href="#parcours"><span>Parcours</span></a></li>
        <li class="nav-item" onclick="scrollTo('#projets')"><a href="#projets"><span>Projets</span></a></li>
        <li class="nav-item" onclick="scrollTo('#experience')"><a href="#experience"><span>Expériences</span></a></li>
      </ul>
    </nav>
  </div>
  <div class="menu">
    <i class="ti ti-menu-2"></i>
  </div>
</header>

<main>

    <div class="option">
      <ul>
        <li><a href="mailto:<?= $mail ?? "noah.quaghebeur@laposte.net" ?>"><i class="ti ti-mail" aria-hidden="true"></i></a></li>
        <li><i class="ti ti-language" aria-hidden="true"></i></li>
        <li id="theme-btn" style="cursor:pointer;">
          <i class="ti ti-moon" id="theme-icon" aria-hidden="true"></i>
        </li>
      </ul>
    </div>

    <section class="hero" id="hero">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="hero-inner">

            <div class="hero-left">
                <h1 class="hero-name">NOAH<br><em>QUAGHEBEUR</em></h1>
                <p class="hero-desc">
                    <?= $bio ?? "" ?>
                </p>
                <div class="hero-actions">
                    <a class="btn-primary" href="#projets">
                        <i class="ti ti-folders" aria-hidden="true"></i> Voir mes projets
                    </a>
                    <a href="assets/docs/<?= $cv ?? "cv_tmp.pdf" ?>" download="<?= $cv ? "CV_Noah_Quaghebeur.pdf" : "CV_Noah_Quaghebeur_non_actualiser.pdf"?>" aria-label="Télécharger le CV" class="btn-ghost">
                        <i class="ti ti-download" aria-hidden="true"></i> Télécharger le CV
                    </a>
                </div>
            </div>

            <div class="hero-right">
                <div class="hero-avatar-wrap">
                    <div class="hero-avatar">
                        <img src="assets/img/<?= $pp ?? "pp_tmp.jpg" ?>" alt="Noah Quaghebeur">
                    </div>
                    <div class="hero-social">
                        <a href="https://github.com/NoahQuagh/" rel="noopener" aria-label="GitHub"><i class="ti ti-brand-github" aria-hidden="true"></i></a>
                        <a href="https://linkedin.com" rel="noopener" aria-label="LinkedIn"><i class="ti ti-brand-linkedin" aria-hidden="true"></i></a>
                        <a href="mailto:<?= $mail ?? "noah.quaghebeur@laposte.net" ?>" aria-label="Email"><i class="ti ti-mail" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <section id="competences">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 1</p>
            <h2 class="section-title">Compétences</h2>
        </div>
        <div class="skills-grid" id="skill-zone"><span class="loader"></span></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <section id="parcours">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 2</p>
            <h2 class="section-title">Parcours</h2>
        </div>
        <div class="timeline" id="timeline-zone"><span class="loader"></span></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <section id="projets">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 3</p>
            <h2 class="section-title">Projets</h2>
        </div>
        <div class="projects-grid" id="projet-zone"><span class="loader"></span></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <section id="experience">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 4</p>
            <h2 class="section-title">Expériences</h2>
        </div>
        <div class="timeline" id="exp-zone"><span class="loader"></span></div>
    </section>

</main>

<footer>
  <section class="footerSection">

    <div>
      <h4>Navigation</h4>
      <ul>
        <li onclick="scrollTo('#hero')"><a href="#hero">Accueil</a></li>
        <li onclick="scrollTo('#competences')"><a href="#competences">Compétences</a></li>
        <li onclick="scrollTo('#parcours')"><a href="#parcours">Parcours</a></li>
        <li onclick="scrollTo('#projets')"><a href="#projets">Projets</a></li>
        <li onclick="scrollTo('#experience')"><a href="#experience">Expériences</a></li>
        <li onclick="scrollTo('#experience')"><a href="auth/login.php">Connexion</a></li>
      </ul>
    </div>

    <div>
      <h4>Réseaux & Projets</h4>
      <ul>
        <li><a href="mailto:<?= $mail ?? "noah.quaghebeur@laposte.net" ?>" target="_blank" rel="noopener">E-mail</a></li>
        <li><a href="https://github.com/NoahQuagh" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
        <?php require_once __DIR__ . '/api/loaders/loadListProFooter.php'?>
      </ul>
    </div>

    <div>
      <h4 class="titre-about">Portfolio de Noah Quaghebeur</h4>
      <p class="about">Portfolio interactif développé pour mettre en valeur mon parcours, mes compétences et mes réalisations techniques.</p>
    </div>

  </section>

  <div class="separator"></div>

  <section class="footerSection footerSection2">
    <p class="bottom-p">© Noah Quaghebeur | 2026</p>
  </section>

</footer>

<script src="assets/script/script_navigation.js"></script>
<script src="assets/script/renderer/competenceRenderer.js"></script>
<script src="assets/script/renderer/parcoursRenderer.js"></script>
<script src="assets/script/renderer/projetsRenderer.js"></script>
<script src="assets/script/renderer/experiencesRenderer.js"></script>
<script src="assets/script/theme.js"></script>
<script src="assets/script/burger.js"></script>
</body>
</html>