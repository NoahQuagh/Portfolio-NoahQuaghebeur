let container, pastille, gauche, droite;

function initElements() {
    container = document.querySelector('.containerLogin');
    pastille  = document.querySelector('.login-pastille');
    gauche    = document.getElementById('gauche');
    droite    = document.getElementById('droite');
}

function moveTo(targetBox) {
    if (!container || !pastille || !targetBox) return;

    const containerRect = container.getBoundingClientRect();
    const boxRect       = targetBox.getBoundingClientRect();

    const offsetLeft = boxRect.left - containerRect.left;
    const offsetTop  = boxRect.top - containerRect.top;

    pastille.style.width     = `${boxRect.width}px`;
    pastille.style.height    = `${boxRect.height}px`;
    pastille.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    pastille.style.opacity   = '1';
}

function deplaDroite() {
    // 1. On rend le contenu transparent immédiatement
    gauche.classList.add('hidden-content');
    droite.classList.add('hidden-content');

    // 2. On lance le mouvement de la pastille
    pastille.dataset.side = 'droite';
    moveTo(droite);

    // 3. On attend que la pastille soit au milieu du trajet pour changer le HTML
    setTimeout(() => {
        connecCompte(); // Cette fonction doit ajouter la classe .fade-in au containerForm
        pasDeCompte();

        // 4. On retire la classe hidden pour laisser l'animation fade-in agir
        gauche.classList.remove('hidden-content');
        droite.classList.remove('hidden-content');
    }, 250);
}

function deplaGauche() {
    gauche.classList.add('hidden-content');
    droite.classList.add('hidden-content');

    pastille.dataset.side = 'gauche';
    moveTo(gauche);

    setTimeout(() => {
        creaCompteForm();
        creaCompteTxt();

        gauche.classList.remove('hidden-content');
        droite.classList.remove('hidden-content');
    }, 250);
}

// Fonctions d'affichage (Modifiées pour inclure les appels de déplacement)
function creaCompteForm() {
    gauche.innerHTML = `
        <div class="containerForm fade-in">
            <h2 style="color: var(--ink)">Bonjour,<br><span>Viking.</span></h2>
            <form id="loginFormLogin" novalidate>
                <div class="input-group">
                    <div class="labelZone">
                        <label>Identifiant</label>
                        <input type="text" placeholder="ex. dupont.jean" required>
                    </div>
                    <div class="labelZone">
                        <label>Mot de passe</label>
                        <input type="password" placeholder="••••••••" required>
                    </div>
                    <div class="labelZone">
                        <label>Confirmez</label>
                        <input type="password" placeholder="••••••••" required>
                    </div>
                </div>
                <div class="error-container"></div>
                <button type="button" class="btn-login" onclick="deplaDroite()" style="background: var(--ink);color: var(--bg)">Créer le compte</button>
            </form>
        </div>`;
}

function connecCompte() {
    gauche.innerHTML = `
        <div class="containerForm fade-in">
            <h2>Bon retour,<br><span>Viking.</span></h2>
            <form id="loginFormLogin">
                <div class="input-group">
                    <div class="labelZone"><label>Identifiant</label><input type="text" placeholder="ex. dupont.jean" required></div>
                    <div class="labelZone"><label>Mot de passe</label><input type="password" placeholder="••••••••" required></div>
                </div>
                <div class="error-container"></div>
                <button type="submit" class="btn-login">Initialiser la session</button>
            </form>
        </div>`;
}

function pasDeCompte() {
    droite.innerHTML = `
        <div class="fade-in">
        <h2>Pas encore<br>de compte ?</h2>
                    <p>Rejoignez le réseau Viking Transport.</p>
                    <button class="btn-no-border" type="button" onclick="deplaGauche()">← Créer un compte</button>
        </div>
            
        `;
}

function creaCompteTxt() {
    droite.innerHTML = `
<div class="fade-in">
            <h2 style="color: var(--bg);">Créez votre compte<br><span>gratuitement !</span></h2>
            <p style="color: var(--bg)">Rejoignez le réseau Viking Transport.</p>
            </div>
        `;
}

document.addEventListener('DOMContentLoaded', () => {
    initElements();
    connecCompte();
    pasDeCompte();

    // Position initiale : on commence à gauche sur le login
    setTimeout(() => {
        pastille.dataset.side = 'droite';
        moveTo(droite);
    }, 200);
});

window.addEventListener('resize', () => {
    const active = pastille.dataset.side === 'droite' ? droite : gauche;
    moveTo(active);
});

