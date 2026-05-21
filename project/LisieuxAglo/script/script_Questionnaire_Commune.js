//auteur Noah QUAGHEBEUR
// Tableau contenant toutes les questions
const questionsListe = [
    {
        question: "Quel est le nom de votre commune ?",
        type: "texte",
        placeholder: "Ex: Mézidon Vallée d'Auge"
    },
    {
        question: "Quel est le nombre d'habitant de la commune ?",
        type: "choix",
        options:["< 500","501 - 1500","1501 - 5000","5001 - 15000","> 15000"]
    },
    {
        question: "Quelle est la superficie de la commune (en km²) ?",
        type: "choix",
        options:["< 0.5km²","0.5km² - 2km²","2km² - 5km²","5km² - 10km²","> 10km²"]
    },
    {
        question: "Indiquez les principales zones d'activité économique ou commerciales de votre commune ?",
        type: "choix-multiple",
        options: ["Zone artisanale", "Zone commerciale", "Pôle santé", "secteur argricole", "Autre", "Aucune zone spécifique"]
    },
    {
        question: "Quelles infrastructure de transport collectif sont présentes sur votre commune?",
        type: "choix-multiple",
        options:["Gare SNCF","Arrêts de bus","Points d'arrêt de transport à la demande","Aucune"]
    },
    {
        question: "Quelles infrastructures de mobilité douce sont aménagées ?",
        type: "choix-multiple",
        options:["Piste cyclables en site propre","Bandes cyclables","Parking sécurisés pour les vélos","Sentiers pédestres balisés"]
    },
    {
        question: "Quels sont les prestataires de transport utilisés par les habitants de votre commune ?",
        type: "choix-multiple",
        options:["Transport public","Transport scolaire dédié","Prestataires privés","Covoiturage organisé","Autre","Non pertinent"]
    },
    {
        question: "Y a-t'il des bornes de recharge pour véhicules électriques accessibles au public sur la commune ?",
        type: "choix",
        options:["Oui","Non"]
    },
    {
        question: "Combien avez vous d'écoles maternelles et élémentaires",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de collèges ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de lycées ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de structures pour la petite enfance ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de professionnelle de santé  ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Quel est le nombre de pharmacie présente sur la commune ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de structures pour séniors ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de commerce dans votre commune ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de service de restauration ",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous d'entreprise ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de salarié dans votre commune ?",
        type: "choix",
        options:["< 50","50 - 200","200 - 500","> 500"]
    },
    {
        question: "Combien avez vous d'infrastructure sportives ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous d'infrastructure culturelles ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous de salle des fêtes ou salle polyvalente ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Combien avez vous d'association actives ?",
        type: "nombre",
        min:0,
        max:99
    },
    {
        question: "Quels sont les équipements publics ou privés générateur de flux ?",
        type: "choix-multiple",
        options:["école(s) primaire(s)","Collège ou lycée","équipement sportifs","Maison de santé","Commerces de proximité"]
    },
    {
        question: "Quels sont les enjeux de mobilité identifiés sur votre commune ?",
        type: "choix-multiple",
        options:["Sécurité des piétons","Désenclavement","Stationnement","Accés aux services publics","Saturation automobile","Services pour les jeunes"]
    },
    {
        question: "Quelles actions ou projets sont déjà en cours pour amélioré la mobilité ?",
        type: "zone-texte",
        placeholder: "entrez votre texte ici"
    },
    {
        question: "Quels sont les besoins prioritaires en matière de mobilité pour votre commune ?",
        type: "choix-multiple",
        options:["Création d'une nouvelle ligne de TC","Amélioration de la fréquence des bus","Aménagement de pistes cyclables sécurisées","Création d'un parking relais","Autre"]
    },
    {
        question: "Souhaitez vous participer à des réunions de concertation sur le Plan Local de Déplacement ?",
        type: "choix",
        options:["Oui","Non"]
    },
    {
        question: "Avez-vous des suggestions pour améliorer la coordination entre les communes et l'agglomération sur les questions de mobilité ?",
        type: "zone-texte",
        placeholder: "entrez votre texte ici"
    }
];

// VARIABLES GLOBALES
let questionActuelle = 0;
let reponses = {};


//FONCTION :AFFICHER UNE QUESTION
function afficherQuestion() {
    const q = questionsListe[questionActuelle];
    const elementQuestion = document.getElementById('question');
    const zoneOptions = document.getElementById('zoneOptions');
    const compteur = document.getElementById('compteur');
    const btnPrecedent = document.getElementById('btnPrecedent');
    const btnSuivant = document.getElementById('btnSuivant');

    elementQuestion.textContent = q.question;
    zoneOptions.innerHTML = '';

    //AFFICHAGE SELON LE TYPE QUESTION

    // CAS 1 Question à choix unique
    if (q.type === 'choix') {
        q.options.forEach(option => {
            const div = document.createElement('div');
            div.className = 'option';
            div.textContent = option;

            if (reponses[questionActuelle] === option) {
                div.classList.add('selectionnee');
                btnSuivant.disabled = false;
            }

            div.onclick = () => selectionnerOption(option, div);
            zoneOptions.appendChild(div);
        });
    }
    // CAS 2 Question à choix multiples
    else if (q.type === 'choix-multiple') {
        // Initialise tableau vide si pas encore de réponse
        if (!reponses[questionActuelle]) {
            reponses[questionActuelle] = [];
        }

        q.options.forEach(option => {
            const div = document.createElement('div');
            div.className = 'option';
            div.textContent = option;

            // Marque comme sélectionné si dans le tableau
            if (reponses[questionActuelle].includes(option)) {
                div.classList.add('selectionnee');
            }

            div.onclick = () => selectionnerOptionMultiple(option, div);
            zoneOptions.appendChild(div);
        });

        // Active le bouton si au moins une réponse sélectionnée
        btnSuivant.disabled = reponses[questionActuelle].length === 0;
    }
    // CAS 3 Question avec champ texte court
    else if (q.type === 'texte') {
        const champTexte = document.createElement('input');
        champTexte.type = 'text';
        champTexte.placeholder = q.placeholder;
        champTexte.value = reponses[questionActuelle] || '';

        champTexte.oninput = (e) => {
            reponses[questionActuelle] = e.target.value;
            btnSuivant.disabled = e.target.value.trim() === '';
        };

        zoneOptions.appendChild(champTexte);
        btnSuivant.disabled = !reponses[questionActuelle] || reponses[questionActuelle].trim() === '';
        setTimeout(() => champTexte.focus(), 100);
    }
    // CAS 4 Question avec zone de texte longue
    else if (q.type === 'zone-texte') {
        const zoneTexte = document.createElement('textarea');
        zoneTexte.rows = 5;
        zoneTexte.placeholder = q.placeholder;
        zoneTexte.value = reponses[questionActuelle] || '';

        zoneTexte.oninput = (e) => {
            reponses[questionActuelle] = e.target.value;
            btnSuivant.disabled = e.target.value.trim() === '';
        };

        zoneOptions.appendChild(zoneTexte);
        btnSuivant.disabled = !reponses[questionActuelle] || reponses[questionActuelle].trim() === '';
        setTimeout(() => zoneTexte.focus(), 100);
    }
    // CAS 5 : Question avec saisie de nombre et compteur
    else if (q.type === 'nombre') {
        // Initialise la réponse à min (0 par défaut) si pas encore de réponse
        if (reponses[questionActuelle] === undefined) {
            reponses[questionActuelle] = q.min || 0;
        }

        const conteneurNombre = document.createElement('div');
        conteneurNombre.className = 'conteneur-nombre';

        const affichageCompteur = document.createElement('div');
        affichageCompteur.className = 'affichage-compteur';
        affichageCompteur.textContent = reponses[questionActuelle];

        const champNombre = document.createElement('input');
        champNombre.type = 'number';
        champNombre.min = q.min || 0;
        champNombre.max = q.max || 100;
        champNombre.value = reponses[questionActuelle];
        champNombre.style.display='none';

        const conteneurBoutons = document.createElement('div');
        conteneurBoutons.className = 'conteneur-boutons-nombre';

        const btnMoins = document.createElement('button');
        btnMoins.className = 'btn-compteur';
        btnMoins.textContent = '−';

        const btnPlus = document.createElement('button');
        btnPlus.className = 'btn-compteur';
        btnPlus.textContent = '+';

        const mettreAJourValeur = (nouvelleValeur) => {
            const min = parseInt(q.min || 0);
            const max = parseInt(q.max || 100);
            nouvelleValeur = Math.max(min, Math.min(max, nouvelleValeur));
            champNombre.value = nouvelleValeur;
            affichageCompteur.textContent = nouvelleValeur;
            reponses[questionActuelle] = nouvelleValeur;
            btnSuivant.disabled = false;
        };

        champNombre.oninput = (e) => {
            mettreAJourValeur(parseInt(e.target.value) || 0);
        };

        btnMoins.onclick = (e) => {
            e.preventDefault();
            mettreAJourValeur(parseInt(champNombre.value) - 1);
        };

        btnPlus.onclick = (e) => {
            e.preventDefault();
            mettreAJourValeur(parseInt(champNombre.value) + 1);
        };

        conteneurNombre.appendChild(affichageCompteur);
        conteneurNombre.appendChild(champNombre);
        conteneurBoutons.appendChild(btnMoins);
        conteneurBoutons.appendChild(btnPlus);
        conteneurNombre.appendChild(conteneurBoutons);
        zoneOptions.appendChild(conteneurNombre);

        btnSuivant.disabled = false;
    }

    //GESTION DES BOUTONS
    btnPrecedent.style.display = questionActuelle > 0 ? 'block' : 'none';
    btnSuivant.textContent = questionActuelle === questionsListe.length - 1 ? 'Terminer' : 'Suivant';
}

// FONCTION SÉLECTIONNER UNE OPTION (choix unique)
function selectionnerOption(option, element) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selectionnee'));
    element.classList.add('selectionnee');
    reponses[questionActuelle] = option;
    document.getElementById('btnSuivant').disabled = false;
}

// FONCTION SÉLECTIONNER UNE OPTION (choix multiple)
function selectionnerOptionMultiple(option, element) {
    const btnSuivant = document.getElementById('btnSuivant');

    // Si l'option est déjà sélectionnée, on la retire
    if (reponses[questionActuelle].includes(option)) {
        reponses[questionActuelle] = reponses[questionActuelle].filter(item => item !== option);
        element.classList.remove('selectionnee');
    }
    // Sinon on l'ajoute
    else {
        reponses[questionActuelle].push(option);
        element.classList.add('selectionnee');
    }

    // Active le bouton si au moins une réponse
    btnSuivant.disabled = reponses[questionActuelle].length === 0;
}

//FONCTION MAJ DU COMPTEUR DE QUESTION
function MAJcompteur(){
    const compteur = document.getElementById('compteur');
    compteur.textContent = `Question ${questionActuelle + 1} sur ${questionsListe.length}`;
}

//FONCTION PASSER à LA QUESTION SUIVANTE
function questionSuivante() {
    if (questionActuelle < questionsListe.length - 1) {
        questionActuelle++;
        MAJcompteur();
        afficherQuestion();
    } else {
        afficherResultats();
    }
}

//FONCTION REVENIR À LA QUESTION PRÉCÉDENTE
function questionPrecedente() {
    if (questionActuelle > 0) {
        questionActuelle--;
        MAJcompteur();
        afficherQuestion();
    }
}

// FONCTION AFFICHER LES RÉSULTATS
function afficherResultats() {
    document.getElementById('contenuQuestionnaire').style.display = 'none';

    const elementResultats = document.getElementById('resultats');
    const listeResultats = document.getElementById('listeResultats');

    listeResultats.innerHTML = '';

    questionsListe.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'item-resultat';

        // Formatte la réponse selon le type
        let reponseAffichee;
        if (q.type === 'choix-multiple' && Array.isArray(reponses[index])) {
            // Pour les choix multiples, affiche les réponses séparées par des virgules
            reponseAffichee = reponses[index].join(', ');
        } else if (reponses[index] !== undefined && reponses[index] !== null) {
            reponseAffichee = reponses[index];
        } else {
            reponseAffichee = 'Non renseigné';
        }

        div.innerHTML = `
            <div class="question-resultat">${q.question}</div>
            <div class="reponse-resultat">${reponseAffichee}</div>
        `;
        listeResultats.appendChild(div);
    });

    elementResultats.classList.add('afficher');
}

//FONCTION RETOUR A L'ACCUEIL
function retourAccueil() {
    window.location.href = 'accueil.html';
}

//Affiche la première question
afficherQuestion();