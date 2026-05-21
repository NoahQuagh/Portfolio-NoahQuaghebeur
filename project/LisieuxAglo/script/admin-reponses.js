// admin-reponses.js
//auteur Marwan NAIRI
// Liste des questions pour l'affichage des détails (identique à administre.js pour avoir les libellés)
const questionsListeRef = [
    "Commune de résidence", "Âge", "Statut", "Taille foyer", "Nombre d'enfants", 
    "Véhicules motorisés", "Motifs déplacement", "Fréquence trajets/semaine", 
    "Lieu travail/étude", "Usage transports en commun (TC)", "Pourquoi TC ?", 
    "Mode transport principal", "Distance trajets", "Freins usage vélo/TC", 
    "Prêt à changer ?", "Impact coût énergie", "Améliorations souhaitées", 
    "Intérêt ateliers", "Autres suggestions", "Accord données"
];

document.addEventListener('DOMContentLoaded', () => {
    chargerDonnees();
    
    // Recherche dynamique
    document.getElementById('rechercheCommune').addEventListener('keyup', (e) => {
        filtrerTableau(e.target.value.toLowerCase());
    });
});

function chargerDonnees() {
    const tableBody = document.getElementById('tableBody');
    const messageVide = document.getElementById('messageVide');
    tableBody.innerHTML = '';

    // Récupération des données
    const data = JSON.parse(localStorage.getItem('db_reponses_administres')) || [];

    if (data.length === 0) {
        messageVide.style.display = 'block';
        return;
    }

    messageVide.style.display = 'none';

    // Création des lignes du tableau (inversé pour voir les plus récents en haut)
    data.slice().reverse().forEach((item, index) => {
        // L'index réel dans le tableau d'origine (pour la suppression)
        const realIndex = data.length - 1 - index; 

        // Récupération des réponses clés pour le résumé
        // Q0 = Commune, Q2 = Statut, Q11 = Mode Transport (selon votre tableau questionsListe)
        const commune = item.reponses[0] || 'Non renseigné';
        const statut = item.reponses[2] || '-';
        
        // Gestion tableau ou chaine pour le mode de transport
        let transport = item.reponses[11];
        if (Array.isArray(transport)) transport = transport.join(', ');
        if (!transport) transport = '-';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.date}</td>
            <td><strong>${commune}</strong></td>
            <td>${statut}</td>
            <td>${transport}</td>
            <td>
                <button class="btn-action btn-voir" onclick="voirDetails(${realIndex})">👁️ Voir</button>
                <button class="btn-action btn-supprimer" onclick="supprimerLigne(${realIndex})">🗑️</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Afficher les détails dans la Modale Bootstrap
function voirDetails(index) {
    const data = JSON.parse(localStorage.getItem('db_reponses_administres')) || [];
    const dossier = data[index];
    const corpsModal = document.getElementById('corpsModal');

    if (!dossier) return;

    let html = `<p class="text-muted">Soumis le : ${dossier.date}</p><hr>`;
    
    // Boucle sur toutes les réponses stockées
    Object.keys(dossier.reponses).forEach(key => {
        const qIndex = parseInt(key);
        // On récupère le libellé de la question ou "Question X" si introuvable
        const libelle = questionsListeRef[qIndex] || `Question ${qIndex + 1}`;
        
        let reponse = dossier.reponses[key];
        if (Array.isArray(reponse)) reponse = reponse.join(', '); // Pour les choix multiples

        html += `
            <div class="mb-3">
                <strong class="text-primary">${libelle} :</strong><br>
                <span class="text-dark">${reponse || 'Non répondu'}</span>
            </div>
        `;
    });

    corpsModal.innerHTML = html;

    // Ouvrir la modale via Bootstrap 5
    const myModal = new bootstrap.Modal(document.getElementById('modalDetails'));
    myModal.show();
}

// Supprimer une seule ligne
function supprimerLigne(index) {
    if(confirm("Voulez-vous vraiment supprimer cette réponse ?")) {
        let data = JSON.parse(localStorage.getItem('db_reponses_administres')) || [];
        data.splice(index, 1);
        localStorage.setItem('db_reponses_administres', JSON.stringify(data));
        chargerDonnees();
    }
}

// Tout supprimer
function toutSupprimer() {
    if(confirm("ATTENTION : Cela va effacer TOUTES les réponses enregistrées. Continuer ?")) {
        localStorage.removeItem('db_reponses_administres');
        chargerDonnees();
    }
}

// Filtre de recherche
function filtrerTableau(texte) {
    const lignes = document.querySelectorAll('#tableBody tr');
    lignes.forEach(ligne => {
        const commune = ligne.children[1].textContent.toLowerCase();
        if (commune.includes(texte)) {
            ligne.style.display = '';
        } else {
            ligne.style.display = 'none';
        }
    });
}