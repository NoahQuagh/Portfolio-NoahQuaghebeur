// 1. Définition de la plage de temps : Janvier de l'année en cours -> +14 mois (Fin Février année suivante)
const anneeEnCours = new Date().getFullYear();
const dateDebutPlanning = new Date(anneeEnCours, 0, 1); // 1er Janvier
const dateFinPlanning = new Date(anneeEnCours + 1, 2, 0); // Fin Février

// Calcul de la durée totale en jours et de la largeur d'un jour à l'écran (ex: 4 pixels par jour)
const MS_PAR_JOUR = 1000 * 60 * 60 * 24;
const totalJoursPlanning = Math.ceil((dateFinPlanning - dateDebutPlanning) / MS_PAR_JOUR) + 1;
const LARGEUR_JOUR_PX = 4; // Ajustez cette valeur pour élargir ou rétrécir le planning
const LARGEUR_LABEL_AFFAIRE = 150; // Aligné avec le CSS (.gantt-row-label)

// Base de données locale temporaire pour tester
let affaires = [
    { nom: "Affaire Test A (Tournage)", debut: `${anneeEnCours}-01-15`, fin: `${anneeEnCours}-02-10` },
    { nom: "Affaire Test B (Fraisage)", debut: `${anneeEnCours}-02-01`, fin: `${anneeEnCours}-03-15` }
];

const ganttContainer = document.getElementById('gantt');
const formAffaire = document.getElementById('form-affaire');

// 2. Initialisation et affichage
function initPlanning() {
    ganttContainer.innerHTML = '';

    // Générer l'en-tête des Mois
    const monthsHeader = document.createElement('div');
    monthsHeader.className = 'gantt-months';
    monthsHeader.style.paddingLeft = `${LARGEUR_LABEL_AFFAIRE}px`;

    let moisCourant = new Date(dateDebutPlanning);
    while (moisCourant <= dateFinPlanning) {
        const premierJourMois = new Date(moisCourant.getFullYear(), moisCourant.getMonth(), 1);
        const dernierJourMois = new Date(moisCourant.getFullYear(), moisCourant.getMonth() + 1, 0);
        const joursDansCeMois = dernierJourMois.getDate();

        const monthCell = document.createElement('div');
        monthCell.className = 'gantt-month-cell';
        monthCell.style.width = `${joursDansCeMois * LARGEUR_JOUR_PX}px`;
        monthCell.innerText = moisCourant.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });

        monthsHeader.appendChild(monthCell);
        moisCourant.setMonth(moisCourant.getMonth() + 1); // Passer au mois suivant
    }
    ganttContainer.appendChild(monthsHeader);

    // Dessiner les lignes d'affaires
    affaires.forEach(affaire => {
        const dDebut = new Date(affaire.debut);
        const dFin = new Date(affaire.fin);

        // Ignorer si l'affaire est hors limites du planning
        if (dFin < dateDebutPlanning || dDebut > dateFinPlanning) return;

        const row = document.createElement('div');
        row.className = 'gantt-row';
        row.style.width = `${(totalJoursPlanning * LARGEUR_JOUR_PX) + LARGEUR_LABEL_AFFAIRE}px`;

        // Label de l'affaire (colonne fixe à gauche)
        const label = document.createElement('div');
        label.className = 'gantt-row-label';
        label.innerText = affaire.nom;
        row.appendChild(label);

        // Calcul de la position (Left) et de la largeur (Width) de la barre
        const joursDepuisDebut = Math.max(0, Math.ceil((dDebut - dateDebutPlanning) / MS_PAR_JOUR));
        const dureeAffaire = Math.ceil((dFin - dDebut) / MS_PAR_JOUR) + 1;

        const bar = document.createElement('div');
        bar.className = 'gantt-bar';
        bar.style.left = `${LARGEUR_LABEL_AFFAIRE + (joursDepuisDebut * LARGEUR_JOUR_PX)}px`;
        bar.style.width = `${dureeAffaire * LARGEUR_JOUR_PX}px`;
        bar.innerText = affaire.nom;
        bar.title = `Du ${dDebut.toLocaleDateString()} au ${dFin.toLocaleDateString()}`; // Tooltip au survol

        row.appendChild(bar);
        ganttContainer.appendChild(row);
    });
}

// 3. Écouteur d'événement pour le formulaire
formAffaire.addEventListener('submit', (e) => {
    e.preventDefault();

    const nouvelElement = {
        nom: document.getElementById('nom').value,
        debut: document.getElementById('date-debut').value,
        fin: document.getElementById('date-fin').value
    };

    // Validation simple (Date de fin après date de début)
    if (new Date(nouvelElement.fin) < new Date(nouvelElement.debut)) {
        alert("La date de fin ne peut pas être avant la date de début.");
        return;
    }

    affaires.push(nouvelElement);
    initPlanning(); // Recharger le visuel
    formAffaire.reset(); // Vider les champs
});

// Lancement au chargement de la page
initPlanning();