//auteur Noah QUAGHEBEUR
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');


// FONCTION AFFICHER UN MESSAGE
function afficherMessage(texte, type) {
    messageDiv.textContent = texte;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';
}

// FONCTION VERIF CONNEXION
function verifierConnexion(identifiant, motDePasse) {
    if (identifiant === 'admin' && motDePasse === 'admin123') {
        window.location.href = 'Accueill-admin.html';
    }else if (identifiant === 'administre' && motDePasse === 'administre123') {
        window.location.href = 'Questionnaire Administre.html';
    }else if (identifiant === 'commune' && motDePasse === 'commune123') {
        window.location.href = 'Questionnaire Commune.html';
    }else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        afficherMessage('Identifiant ou mot de passe incorrect', 'error');
    }
}

// Gestion de la soumission du formulaire
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    // Récupération des valeurs saisies
    const identifiant = document.getElementById('username').value;
    const motDePasse = document.getElementById('password').value;

    // Vérification de la connexion
    verifierConnexion(identifiant, motDePasse)
});