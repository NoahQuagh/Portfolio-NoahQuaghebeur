<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Noah Quaghebeur — Portfolio</title>
    <link rel="stylesheet" href="assets/style/mainPage.css">
    <link rel="stylesheet" href="assets/style/palette.css">
    <link rel="stylesheet" href="assets/style/toolsTipsText.css">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body>

<!-- ── Sidebar ── -->
<aside id="sidebar">
    <nav class="sb-nav">
        <p class="sb-label">Navigation</p>
        <ul class="sb-list">
            <li class="sb-item active" onclick="scrollTo('#hero')">
                <i class="ti ti-home" aria-hidden="true"></i><span>Accueil</span>
            </li>
            <li class="sb-item" onclick="scrollTo('#competences')">
                <i class="ti ti-code" aria-hidden="true"></i><span>Compétences</span>
            </li>
            <li class="sb-item" onclick="scrollTo('#parcours')">
                <i class="ti ti-school" aria-hidden="true"></i><span>Parcours</span>
            </li>
            <li class="sb-item" onclick="scrollTo('#projets')">
                <i class="ti ti-folder" aria-hidden="true"></i><span>Projets</span>
            </li>
            <li class="sb-item" onclick="scrollTo('#experience')">
                <i class="ti ti-briefcase" aria-hidden="true"></i><span>Expériences</span>
            </li>
        </ul>
    </nav>
    <div class="sb-bottom">
        <a href="noah.quaghebeur@laposte.net" class="sb-item">
            <i class="ti ti-mail" aria-hidden="true"></i><span>Contact</span>
        </a>
        <a href="" class="sb-item">
            <i class="ti ti-language" aria-hidden="true"></i><span>Langue</span>
        </a>
        <a href="" class="sb-item">
            <i class="ti ti-moon" aria-hidden="true"></i><span>Thème</span>
        </a>
    </div>
</aside>

<main>

    <!-- HERO -->
    <section class="hero" id="hero">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="hero-inner">

            <div class="hero-left">
                <h1 class="hero-name">NOAH<br><em>QUAGHEBEUR</em></h1>
                <p class="hero-desc">
                    bio ici
                </p>
                <div class="hero-actions">
                    <button class="btn-primary" onclick="scrollTo('#projets')">
                        <i class="ti ti-folder" aria-hidden="true"></i> Voir mes projets
                    </button>
                    <a href="#" class="btn-ghost">
                        <i class="ti ti-download" aria-hidden="true"></i> Télécharger le CV
                    </a>
                </div>
            </div>

            <div class="hero-right">
                <div class="hero-avatar-wrap">
                    <div class="hero-avatar">
                        <img src="assets/img/photoNoah.jpg" alt="Noah Quaghebeur">
                    </div>
                    <div class="hero-social">
                        <a href="#" aria-label="GitHub"><i class="ti ti-brand-github" aria-hidden="true"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="ti ti-brand-linkedin" aria-hidden="true"></i></a>
                        <a href="#" aria-label="Email"><i class="ti ti-mail" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <!-- COMPÉTENCES -->
    <section id="competences">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 1</p>
            <h2 class="section-title">Compétences</h2>
        </div>
        <div class="skills-grid" id="skill-zone"></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <!-- PARCOURS -->
    <section id="parcours">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 2</p>
            <h2 class="section-title">Parcours</h2>
        </div>
        <div class="timeline" id="timeline-zone"></div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <!-- PROJETS -->
    <section id="projets">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 3</p>
            <h2 class="section-title">Projets</h2>
        </div>
        <div class="projects-grid">

            <div class="project-card">
                <div class="project-card-top">
                    <div class="project-icon"><i class="ti ti-layout-kanban" aria-hidden="true"></i></div>
                    <div class="project-links">
                        <a href="#" class="project-link" aria-label="GitHub"><i class="ti ti-brand-github" aria-hidden="true"></i></a>
                        <a href="#" class="project-link" aria-label="Voir le projet"><i class="ti ti-external-link" aria-hidden="true"></i></a>
                    </div>
                </div>
                <h3 class="project-title">Together</h3>
                <p class="project-desc">Application web de gestion de projet collaborative avec Kanban, sprints, messagerie et statistiques. Développée en PHP natif + MariaDB.</p>
                <div class="project-tags">
                    <span class="badge badge-blue">PHP</span>
                    <span class="badge badge-green">MariaDB</span>
                    <span class="badge badge-yellow">JavaScript</span>
                </div>
            </div>

            <div class="project-card">
                <div class="project-card-top">
                    <div class="project-icon" style="background:var(--badge-bg-green)">
                        <i class="ti ti-world" aria-hidden="true" style="color:var(--badge-col-green)"></i>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link" aria-label="GitHub"><i class="ti ti-brand-github" aria-hidden="true"></i></a>
                        <a href="#" class="project-link" aria-label="Voir le projet"><i class="ti ti-external-link" aria-hidden="true"></i></a>
                    </div>
                </div>
                <h3 class="project-title">Portfolio</h3>
                <p class="project-desc">Portfolio personnel développé from scratch, avec sidebar interactive, thème sombre et sections animées.</p>
                <div class="project-tags">
                    <span class="badge badge-blue">HTML / CSS</span>
                    <span class="badge badge-yellow">JavaScript</span>
                </div>
            </div>

            <div class="project-card">
                <div class="project-card-top">
                    <div class="project-icon" style="background:var(--badge-bg-yellow)">
                        <i class="ti ti-device-mobile" aria-hidden="true" style="color:var(--badge-col-yellow)"></i>
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link" aria-label="GitHub"><i class="ti ti-brand-github" aria-hidden="true"></i></a>
                    </div>
                </div>
                <h3 class="project-title">Projet 3</h3>
                <p class="project-desc">Description de votre troisième projet. Remplacez ce texte par la vraie description.</p>
                <div class="project-tags">
                    <span class="badge badge-green">À compléter</span>
                </div>
            </div>

        </div>
    </section>

    <div class="section-sep" aria-hidden="true"></div>

    <!-- EXPÉRIENCES -->
    <section id="experience">
        <div class="section-header">
            <p class="section-eyebrow">// chapitre 4</p>
            <h2 class="section-title">Expériences</h2>
        </div>
        <div class="timeline">

            <div class="timeline-item">
                <div class="timeline-dot"><i class="ti ti-briefcase" aria-hidden="true"></i></div>
                <div class="timeline-content">
                    <p class="timeline-period">Aout 2026</p>
                    <h3 class="timeline-title">CDD Etudiant - Employer Commerciale</h3>
                    <p class="timeline-sub">E.Leclerc — Falaise</p>
                    <p class="timeline-desc">Description vide.</p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-dot"><i class="ti ti-code" aria-hidden="true"></i></div>
                <div class="timeline-content">
                    <p class="timeline-period">Décembre 2025</p>
                    <h3 class="timeline-title">CDD - Employer Polyvalent</h3>
                    <p class="timeline-sub">McDonald's — Ifs</p>
                    <p class="timeline-desc">Description vide.</p>
                </div>
            </div>

        </div>
    </section>

</main>

<footer>
    <p>&lt; © 2025 Noah Quaghebeur — Développeur Web &gt;</p>
</footer>

<script src="assets/script/pagePortfolio.js"></script>
<script src="assets/script/renderer/competenceRenderer.js"></script>
<script src="assets/script/renderer/parcoursRenderer.js"></script>
</body>
</html>