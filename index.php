<?php
require_once __DIR__ . '/config/language.php';
require_once __DIR__ . '/api/loaders/loadProfile.php';
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
    <link rel="icon" type="image/png" href="assets/icon/NQ.ico">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body>

<aside id="sidebar">
    <nav class="sb-nav">
        <p class="sb-label"><?= __tphp('navigation') ?></p>
        <ul class="sb-list">
            <li class="sb-item">
                <a href="#hero" onclick="smothScrollTo('#hero')"><i class="ti ti-home" aria-hidden="true"></i><span><?= __tphp('home') ?></span></a>
            </li>
            <li class="sb-item">
              <a href="#competences" onclick="smothScrollTo('#competences')"><i class="ti ti-code" aria-hidden="true"></i><span><?= __tphp('skills') ?></span></a>
            </li>
            <li class="sb-item">
              <a href="#parcours" onclick="smothScrollTo('#parcours')"><i class="ti ti-school" aria-hidden="true"></i><span><?= __tphp('courses') ?></span></a>
            </li>
            <li class="sb-item">
              <a href="#projets" onclick="smothScrollTo('#projets')"><i class="ti ti-folder" aria-hidden="true"></i><span><?= __tphp('projects') ?></span></a>
            </li>
            <li class="sb-item">
              <a href="#experience" onclick="smothScrollTo('#experience')"><i class="ti ti-briefcase" aria-hidden="true"></i><span><?= __tphp('experiences') ?></span></a>
            </li>
        </ul>
    </nav>
</aside>

<header class="floating-header">
  <div class="header-container">
    <nav class="header-nav">
      <ul>
        <li class="nav-item active" onclick="smothScrollTo('#hero')"><a href="#hero"><span><?= __tphp('home') ?></span></a></li>
        <li class="nav-item" onclick="smothScrollTo('#competences')"><a href="#competences"><span><?= __tphp('skills') ?></span></a></li>
        <li class="nav-item" onclick="smothScrollTo('#parcours')"><a href="#parcours"><span><?= __tphp('courses') ?></span></a></li>
        <li class="nav-item" onclick="smothScrollTo('#projets')"><a href="#projets"><span><?= __tphp('projects') ?></span></a></li>
        <li class="nav-item" onclick="smothScrollTo('#experience')"><a href="#experience"><span><?= __tphp('experiences') ?></span></a></li>
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

      <li class="lang-option" id="lang-btn">
        <i class="ti ti-language" aria-hidden="true"></i>
        <div class="lang-bubbles">
          <button class="lang-bubble <?= $current_lang === 'fr' ? 'active': ''?>" data-lang="fr">FR</button>
          <button class="lang-bubble <?= $current_lang === 'en' ? 'active': ''?>" data-lang="en">EN</button>
        </div>
      </li>

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
                  <?= ($current_lang === 'en' ? ($bioEN ?? null) : null) ?? $bio ?? "" ?>
                </p>
                <div class="hero-actions">
                    <a class="btn-primary" href="#projets">
                        <i class="ti ti-folders" aria-hidden="true"></i><?= __tphp('view my projects') ?>
                    </a>
                    <a href="assets/docs/<?= ($current_lang === 'en' ? ($cvEN ?? null) : null) ?? $cv ?? "CV_Noah_Quaghebeur.pdf" ?>" download="<?= __tphp('nomCV') ?>" aria-label="<?= __tphp('download the CV') ?>" class="btn-ghost">
                        <i class="ti ti-download" aria-hidden="true"></i><?= __tphp('download the CV') ?>
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
            <h2 class="section-title"><?= __tphp('skills') ?></h2>
        </div>
        <div class="skills-grid" id="skill-zone"><span class="loader"></span></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <section id="parcours">
        <div class="section-header">
            <h2 class="section-title"><?= __tphp('courses') ?></h2>
        </div>
        <div class="timeline" id="timeline-zone"><span class="loader"></span></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <section id="projets">
        <div class="section-header">
            <h2 class="section-title"><?= __tphp('projects') ?></h2>
        </div>
        <div class="projects-grid" id="projet-zone"><span class="loader"></span></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <section id="experience">
        <div class="section-header">
            <h2 class="section-title"><?= __tphp('experiences') ?></h2>
        </div>
        <div class="timeline" id="exp-zone"><span class="loader"></span></div>
    </section>

</main>

<footer>
  <section class="footerSection">

    <div>
      <h4><?= __tphp('navigation') ?></h4>
      <ul>
        <li><a href="#hero"><?= __tphp('home') ?></a></li>
        <li><a href="#competences"><?= __tphp('skills') ?></a></li>
        <li><a href="#parcours"><?= __tphp('courses') ?></a></li>
        <li><a href="#projets"><?= __tphp('projects') ?></a></li>
        <li><a href="#experience"><?= __tphp('experiences') ?></a></li>
        <li><a href="auth/login.php"><?= __tphp('login') ?></a></li>
      </ul>
    </div>

    <div>
      <h4><?= __tphp('networks & projects') ?></h4>
      <ul>
        <li><a href="mailto:<?= $mail ?? "noah.quaghebeur@laposte.net" ?>" target="_blank" rel="noopener">E-mail</a></li>
        <li><a href="https://github.com/NoahQuagh" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
        <?php require_once __DIR__ . '/api/loaders/loadListProFooter.php'?>
      </ul>
    </div>

    <div>
      <h4 class="titre-about"><?= __tphp('noah quaghebeur’s portfolio') ?></h4>
      <p class="about"><?= __tphp('about') ?></p>
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
<script src="assets/script/langToggle.js"></script>
<script src="assets/script/burger.js"></script>
<script src="assets/script/getLang.js"></script>
</body>
</html>