let container, pastille, gauche, droite;

function initElements() {
    container = document.querySelector('.containerLogin');
    pastille = document.querySelector('.login-pastille');
    gauche = document.getElementById('gauche');
    droite = document.getElementById('droite');
}

function moveTo(targetBox) {
    if (!container || !pastille || !targetBox) return;

    const containerRect = container.getBoundingClientRect();
    const boxRect = targetBox.getBoundingClientRect();

    const offsetLeft = boxRect.left - containerRect.left;
    const offsetTop = boxRect.top - containerRect.top;

    pastille.style.width = `${boxRect.width}px`;
    pastille.style.height = `${boxRect.height}px`;
    pastille.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    pastille.style.opacity = '1';
}

function deplaDroite() {
    gauche.classList.add('hidden-content');
    droite.classList.add('hidden-content');

    pastille.dataset.side = 'droite';
    moveTo(droite);

    setTimeout(() => {
        connecCompte();
        pasDeCompte();

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

function creaCompteForm() {
    gauche.innerHTML = `
        <div class="containerForm fade-in">
            <h2 style="color: var(--ink)">Bienvenue,<br><span>Viking.</span></h2>
            <form id="loginFormLogin" novalidate>
                <div class="input-group">
                    <div class="labelZoneLine">
                      <div class="labelZone">
                        <label>Nom</label>
                        <input type="text" placeholder="dupont" required>
                      </div>
                      <div class="labelZone">
                        <label>Prenom</label>
                        <input type="text" placeholder="jean" required>
                      </div>
                    </div>
                    
                    
                    <div class="labelZone">
                        <label>Adresse mail</label>
                        <input type="email" placeholder="email" required>
                    </div>
                    
                    <div class="labelZoneLine">
                        <div class="labelZone">
                            <label>Ville</label>
                            <input type="text" placeholder="ex. Caen" required>
                        </div>
                        <div class="labelZone">
                            <label>Téléphone</label>
                            <input type="tel" placeholder="numéro" required>
                        </div>
                    </div>
                    
                    <div class="labelZoneLine">
                      <div class="labelZone">
                        <label>Mot de passe</label>
                        <input type="password" placeholder="••••••••" required>
                      </div>
                      <div class="labelZone">
                        <label>Confirmez</label>
                        <input type="password" placeholder="••••••••" required>
                      </div>
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
                    <div class="labelZone"><label>Identifiant</label><input type="email" placeholder="ex. dupont.jean@sae.com" required></div>
                    <div class="labelZone"><label>Mot de passe</label><input type="password" placeholder="••••••••" required></div>
                </div>
                <div class="error-container"></div>
                <button type="submit" class="btn-login">se connecter</button>
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
            <p style="color: var(--bg)">Rejoignez le réseau Viking Transport gratuitement et sans engagement</p>
            </div>
        `;
}

document.addEventListener('DOMContentLoaded', () => {
    initElements();
    connecCompte();
    pasDeCompte();

    setTimeout(() => {
        pastille.dataset.side = 'droite';
        moveTo(droite);
    }, 200);
});

window.addEventListener('resize', () => {
    const active = pastille.dataset.side === 'droite' ? droite : gauche;
    moveTo(active);
});

