function navigation() {
    const navPills = document.getElementById('customNav');
    if (!navPills) return;

    const indicator = navPills.querySelector('.indicator');
    const navLinks = navPills.querySelectorAll('.nav-link');

    function updateIndicator(activeLink) {
        if (!activeLink) activeLink = navPills.querySelector('.nav-link.active');
        if (!activeLink) {
            indicator.style.opacity = '0';
            return;
        }

        const activeItem = activeLink.closest('.nav-item');
        if (!activeItem) return;

        const itemRect = activeItem.getBoundingClientRect();
        const navRect = navPills.getBoundingClientRect();

        indicator.style.width = `${activeItem.offsetWidth}px`;
        indicator.style.height = `${activeItem.offsetHeight - 10}px`;
        indicator.style.transform = `translateY(-50%) translateX(${itemRect.left - navRect.left}px)`;
        indicator.style.opacity = '1';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateIndicator(this);
        });
    });

    setTimeout(() => updateIndicator(), 50);
    window.addEventListener('resize', () => updateIndicator());
}

function compte() {
    window.location.href = "../../../../pages/login.html";
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
    if (!isOpen && overlay) {
        overlay.onclick = () => closeMenu();
    }
}

function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
}

function changeContent(elementId, newContent, duration = 300) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(12px)';

    setTimeout(() => {
        element.innerHTML = newContent;
        void element.offsetHeight;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, duration);
}

/* =========================================================
   PAGE ACCUEIL
   ========================================================= */
function accueil() {
    const content = `
        <!-- Hero -->
        <section class="hero">
            <div class="hero-bg-pattern"></div>
            <div class="hero-inner">
                <div class="hero-badge">🚌 Réseau normand de cars régionaux</div>
                <h1 class="hero-title">Viking Transport</h1>
                <p class="hero-sub">
                    Voyagez à travers toute la Normandie avec notre réseau de
                    <strong>19&nbsp;lignes</strong> reliant plus de <strong>80&nbsp;communes</strong>,
                    du Cotentin au pays de Bray.
                </p>
                <div class="hero-actions">
                    <button class="btn-primary" onclick="ligne()">Explorer les lignes →</button>
                    <button class="btn-outline" onclick="tarif()">Voir les tarifs</button>
                </div>
            </div>
        </section>

        <!-- Chiffres clés -->
        <section class="stats-band">
            <div class="stat-item">
                <span class="stat-num">19</span>
                <span class="stat-label">Lignes</span>
            </div>
            <div class="stat-sep"></div>
            <div class="stat-item">
                <span class="stat-num">80+</span>
                <span class="stat-label">Communes desservies</span>
            </div>
            <div class="stat-sep"></div>
            <div class="stat-item">
                <span class="stat-num">500&nbsp;km</span>
                <span class="stat-label">Distance max couverte</span>
            </div>
            <div class="stat-sep"></div>
            <div class="stat-item">
                <span class="stat-num">5&nbsp;€</span>
                <span class="stat-label">Tarif de départ</span>
            </div>
        </section>

        <!-- Services -->
        <section class="services-section">
            <h2 class="section-title">Nos services</h2>
            <p class="section-sub">Tout ce dont vous avez besoin pour voyager en Normandie</p>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">🗺️</div>
                    <h3>Réseau étendu</h3>
                    <p>19 lignes couvrant l'ensemble de la Normandie, de Cherbourg-en-Cotentin à Gisors, du Havre à Alençon.</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">🎟️</div>
                    <h3>Réservation simple</h3>
                    <p>Réservez en quelques clics entre deux communes. Sans inscription pour un accès rapide, ou avec un compte pour plus d'avantages.</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">⭐</div>
                    <h3>Programme fidélité</h3>
                    <p>Gagnez <strong>1 point pour 10 km</strong> parcourus. Accumulez des points pour obtenir des réductions sur vos prochains voyages.</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">💰</div>
                    <h3>Tarifs attractifs</h3>
                    <p>13 tranches tarifaires de 5 € à 90 €. Les clients fidélisés bénéficient de réductions supplémentaires selon leur niveau.</p>
                </div>
            </div>
        </section>

        <!-- Comment ça marche -->
        <section class="howto-section">
            <h2 class="section-title">Comment voyager avec nous ?</h2>
            <div class="steps-row">
                <div class="step">
                    <div class="step-num">1</div>
                    <h4>Consultez les lignes</h4>
                    <p>Visualisez notre réseau normand et repérez votre itinéraire.</p>
                </div>
                <div class="step-arrow">→</div>
                <div class="step">
                    <div class="step-num">2</div>
                    <h4>Choisissez votre trajet</h4>
                    <p>Sélectionnez votre commune de départ et d'arrivée, puis votre horaire.</p>
                </div>
                <div class="step-arrow">→</div>
                <div class="step">
                    <div class="step-num">3</div>
                    <h4>Réservez et voyagez</h4>
                    <p>Payez en ligne et montez à bord. Le tarif est calculé selon la distance parcourue.</p>
                </div>
                <div class="step-arrow">→</div>
                <div class="step">
                    <div class="step-num">4</div>
                    <h4>Cumulez des points</h4>
                    <p>Avec un compte fidélité, chaque voyage vous rapporte des points pour voyager moins cher.</p>
                </div>
            </div>
        </section>

        <!-- CTA création de compte -->
        <section class="cta-section">
            <div class="cta-box">
                <div class="cta-text">
                    <h3>Créez votre compte gratuitement</h3>
                    <p>Profitez de l'historique de vos voyages, du programme de fidélité et de la recherche d'itinéraires optimisés.</p>
                </div>
                <button class="btn-primary" onclick="compte()">Créer un compte →</button>
            </div>
        </section>
    `;
    changeContent('accueil', content);
}

/* =========================================================
   PAGE LIGNES
   ========================================================= */
function ligne() {
    const content = `
        <!-- Bannière -->
        <div class="page-banner ligne-banner">
            <div class="page-banner-inner">
                <span class="page-banner-badge">Réseau</span>
                <h2>Nos lignes</h2>
                <p>19 lignes régionales reliant les communes normandes</p>
            </div>
        </div>

        <!-- Intro réseau -->
        <section class="ligne-intro">
            <div class="ligne-intro-grid">
                <div class="ligne-intro-text">
                    <h3>Un réseau maillé sur toute la Normandie</h3>
                    <p>
                        Viking Transport exploite <strong>19 lignes de cars régionaux</strong> couvrant
                        les départements normands : Manche, Calvados, Orne, Seine-Maritime et Eure.
                        Chaque ligne relie une commune de départ à une commune d'arrivée en desservant
                        plusieurs arrêts intermédiaires.
                    </p>
                    <p>
                        Chaque ligne existe en <strong>double sens</strong> (ex : ligne 1A de Caen
                        vers La Hague, ligne 1B dans le sens inverse), vous offrant une flexibilité
                        maximale pour vos déplacements.
                    </p>
                    <div class="ligne-chips">
                        <span class="chip">🔴 Lignes 1–5 · Cotentin</span>
                        <span class="chip">🟢 Lignes 6–10 · Calvados / Orne</span>
                        <span class="chip">🔵 Lignes 11–15 · Eure / Seine-Maritime</span>
                        <span class="chip">🟡 Lignes 16–19 · Transversales</span>
                    </div>
                </div>
                <div class="ligne-intro-stats">
                    <div class="mini-stat"><span>19</span><p>Lignes actives</p></div>
                    <div class="mini-stat"><span>5</span><p>Départements couverts</p></div>
                </div>
            </div>
        </section>

        <!-- Info survol -->
        <div class="info-box">
            🗺️ Survolez ou cliquez sur les arrêts et les lignes pour explorer le réseau normand.
        </div>

        <!-- Carte -->
        <div id="map"></div>

        <!-- Info complémentaire -->
        <section class="ligne-footer-info">
            <div class="lfi-card">
                <span class="lfi-icon">🕐</span>
                <h4>Horaires</h4>
                <p>Consultez les horaires de passage à chaque arrêt directement sur la carte en cliquant sur un nœud.</p>
            </div>
            <div class="lfi-card">
                <span class="lfi-icon">🔀</span>
                <h4>Correspondances</h4>
                <p>Des correspondances entre lignes sont possibles dans les communes partagées pour rejoindre votre destination.</p>
            </div>
            <div class="lfi-card">
                <span class="lfi-icon">📍</span>
                <h4>Arrêts</h4>
                <p>Chaque commune dispose d'un arrêt unique. La distance entre arrêts détermine le tarif de votre billet.</p>
            </div>
        </section>
    `;

    changeContent('accueil', content);
    setTimeout(() => {
        initMap();
    }, 350);
}

/* =========================================================
   PAGE TARIFS
   ========================================================= */
function tarif() {
    const content = `
        <!-- Bannière -->
        <div class="tarif-banner">
            <div class="tarif-banner-inner">
                <span class="page-banner-badge">Tarifs</span>
                <h2>Grille tarifaire</h2>
                <p>Des prix adaptés à chaque distance</p>
            </div>
        </div>

        <!-- Contenu principal -->
        <div class="tarif-wrap">

            <!-- Intro -->
            <div class="tarif-intro">
                <div class="tarif-intro-text">
                    <h3>Comment est calculé votre billet ?</h3>
                    <p>
                        Le tarif de base dépend de la <strong>distance totale parcourue</strong> lors de votre voyage,
                        calculée en additionnant les distances entre chaque arrêt emprunté.
                        Votre prix final peut ensuite être réduit grâce à votre <strong>niveau de fidélité</strong>
                        ou à l'utilisation de vos <strong>points cumulés</strong>.
                    </p>
                </div>
                <div class="tarif-intro-cards">
                    <div class="tarif-info-card tarif-info-green">
                        <span class="tic-icon">⭐</span>
                        <div>
                            <strong>Niveau Junior</strong>
                            <p>−20 % sur le tarif de base</p>
                        </div>
                    </div>
                    <div class="tarif-info-card tarif-info-blue">
                        <span class="tic-icon">🏅</span>
                        <div>
                            <strong>Points fidélité</strong>
                            <p>1 point par 10 km parcourus (min. 1 pt)</p>
                        </div>
                    </div>
                    <div class="tarif-info-card tarif-info-amber">
                        <span class="tic-icon">🎁</span>
                        <div>
                            <strong>Réduction points</strong>
                            <p>Utilisez vos points pour payer moins cher</p>
                        </div>
                    </div>
                </div>
            </div>

            <p class="tarif-title">Grille des tranches</p>
            <p class="tarif-sub">Transport par bus — tarif de base selon la distance parcourue</p>

            <!-- Tableau -->
            <div class="table-wrapper">
                <table id="tarif-table">
                    <thead>
                        <tr>
                            <th style="width:52px">N°</th>
                            <th>Distance min</th>
                            <th>Distance max</th>
                            <th>Tarif de base</th>
                        </tr>
                    </thead>
                    <tbody id="tarif-body"></tbody>
                </table>
            </div>

            <!-- Exemple de calcul -->
            <div class="tarif-example">
                <h4>💡 Exemple de tarif</h4>
                <p>
                    Marlène effectue un voyage de <strong>247,7 km</strong> (3 étapes : Flamanville → Granville → Vire → Argentan).
                    Son trajet entre dans la <strong>tranche 12</strong> (201–300 km) → tarif de base : <strong>80 €</strong>.
                    Avec son niveau client Junior (−20 %), elle paie <strong>64 €</strong> et gagne <strong>24 points</strong>.
                </p>
            </div>

        </div>
    `;

    changeContent('accueil', content);
    setTimeout(() => {
        initGrille();
    }, 350);
}

/* =========================================================
   UTILITAIRES
   ========================================================= */
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
}

window.addEventListener('resize', () => {
    const largeur = window.innerWidth;
    const t = document.querySelector('.terminal');

    if (!t) return;
    t.style.display = largeur < 800 ? 'none' : 'flex';

    if (largeur > 800) {
        closeMenu();
        document.body.classList.remove('sidebar-open');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    navigation();
    accueil();
});