<?php require_once '../../includes/guard.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio — Administration</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
        rel="stylesheet">
  <link rel="icon" type="image/x-icon" href="../icon/gigabot.ico">

  <link rel="stylesheet" href="../style/stylePaletteAdmin.css">
  <link rel="stylesheet" href="../style/StyleHeaderSidebar.css">
  <link rel="stylesheet" href="../style/styleAdmin.css">

  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=menu"/>
<body>

<div id="sidebar-overlay"></div>

<!-- Header mobile -->
<header>
  <button id="menu-btn" onclick="toggleMenu()">
    <img src="../img/menu.svg" id="menuMobile" alt="menu">
  </button>
</header>

<aside id="sidebar">
  <div>
    <div>
      <ul class="header-nav" id="header">
        <li>
          <div class="iconmenu"><img class="menu" src="../img/keyboard_double_arrow_right.svg" alt="menu" onclick="toggleMenu()"></div>
          <a><span class="doc-hero-title-header">Giga<em>Admin</em></span></a>
        </li>
      </ul>
    </div>

    <div class="separator"></div>
    <nav>
      <div class="dropdown">
        <div class="dropdown-trigger" onclick="">
          <div class="iconmenu"><img src="../img/house.svg" alt="gigabot"></div>
          <a>Accueil</a>
          <span class="dd-arrow"></span>
        </div>
      </div>
      <div class="dropdown" id="dd-gigabot">
        <div class="dropdown-trigger" onclick="toggleDd('dd-gigabot')">
          <div class="iconmenu"><img src="../img/robot.svg" alt="gigabot"></div>
          <a>GigaBot</a>
          <span class="dd-arrow"><img src="../img/keyboard_arrow_down.svg" alt="gigabot"></span>
        </div>
        <ul class="dd-menu">
          <li onclick=""><a>Vue d'ensemble</a></li>
          <li onclick=""><a>Équipes Premier</a></li>
          <li onclick=""><a>Commandes</a></li>
          <li onclick=""><a>Changelogs</a></li>
          <li onclick=""><a>Report</a></li>
          <li onclick=""><a>Contributeur</a></li>
          <li onclick=""><a>Logs</a></li>
        </ul>
      </div>

      <div class="dropdown" id="dd-portfolio">
        <div class="dropdown-trigger" onclick="toggleDd('dd-portfolio')">
          <div class="iconmenu"><img src="../img/assignment.svg" alt="portfolio"></div>
          <a>Portfolio</a>
          <span class="dd-arrow"><img src="../img/keyboard_arrow_down.svg" alt="gigabot"></span>
        </div>
        <ul class="dd-menu">
          <li onclick=""><a>Projets</a></li>
          <li onclick=""><a>Expériences</a></li>
          <li onclick=""><a>Compétences</a></li>
          <li onclick=""><a>Parcours</a></li>
          <li onclick=""><a>Informations perso</a></li>
        </ul>
      </div>

      <div class="dropdown" id="dd-compte">
        <div class="dropdown-trigger">
            <div class="iconmenu"><img src="../img/group.svg" alt="menu"></div>
            <a>Comptes</a>
        </div>
      </div>

    </nav>
  </div>
  <nav>
    <ul class="header-nav" id="header-nav-3">
        <button id="theme-toggle-btn" onclick="toggleTheme()">
          <div class="iconmenu" id="dark_mode"><img src="../img/moon_stars.svg" alt="theme"></div>
          <span class="theme-label">Dark Mode</span>
        </button>
      </li>
    </ul>
  </nav>
</aside>

<main>
  <div class="dropdown" id="dd-site">
    <div class="dropdown-trigger">
      <div class="iconmenu"><img src="../img/handyman.svg" alt="menu"></div>
      <a>Mettre maintenance</a>
    </div>
  </div>
</main>

<footer>
  <p>&lt; &copy; 2025 Portfolio de Noah Quaghebeur | Développeur Web. Tous droits réservés. |
    <a href="#">Plan du site</a> | <a href="#">Mentions légales</a> | <a href="#">Politique de confidentialité</a> &gt;
  </p>
</footer>

<script src="../../public/script/sidebar.js"></script>
<script src="../../public/script/theme.js"></script>
<script src="../../public/script/admin.js"></script>

</body>
</html>