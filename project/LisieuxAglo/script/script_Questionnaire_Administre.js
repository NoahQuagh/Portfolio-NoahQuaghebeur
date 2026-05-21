//auteur Noah QUAGHEBEUR
// Tableau contenant toutes les questions
const questionsListe = [
    {
        question: "Dans quelle commune de l'agglomération résidez-vous ?",
        type: "texte",
        placeholder: "Ex: Mézidon Vallée d'Auge"
    },
    {
        question: "Quel âge avez vous ?",
        type: "nombre",
        min:16,
        max:150,
    },
    {
        question: "Quel est votre statut ?",
        type: "choix",
        options: ["Professionel","Personnel du service Public","Etudiant du supérieur","Etudiant du second degré","Retraité","Elu municipal","Autre"]
    },
    {
        question: "Quel est le nombre de personnes (adultes et enfants) composant votre foyer ?",
        type: "nombre",
        min:1,
        max:50,
    },
    {
        question: "Combien avez vous d'enfants ?",
        type: "nombre",
        min: 0,
        max:20
    },
    {
        question: "Quels moyens de transport motorisés sont disponibles dans votre foyer ?",
        type: "choix-multiple",
        options: ["Voiture","Mote ou scooter","Voiture de fonction","Aucun"]
    },
    {
        question: "Quels sont vos principaux motifs de déplacement ?",
        type: "choix-multiple",
        options:["Travails","Etude","Achat/Course","Rendez vous personnel ou médical","Loisirs ou sports","Autre"]
    },
    {
        question: "Combien de fois par semaine effectués vous des trajets ?",
        type: "nombre",
        min: 0,
        max:100
    },
    {
        question: "Dans quelle commune se situe votre principal lieu de travail ou d'études ?",
        type: "texte",
        placeholder: "Ex: Mézidon Vallée d'Auge"
    },
    {
        question: "Utilisez-vous les transports en communs ?",
        type: "choix",
        options:["Oui de manière quotidienne","Oui de manière hebdomadaire","Oui occasionnellement","Non"]
    },
    {
        question: "Pourquoi utilisez-vous les transports en communs ?",
        type: "choix-multiple",
        options:["Pour aller à mon lieu de travail","Pour aller à mon lieu d'Etude","Pour faire mes courses","Pour aller à mes lieux de loisirs","Pour aller à des lieux de santés","Autres"]
    },
    {
        question: "Quels modes de transport utilisez-vous le plus souvent pour ces déplacements principaux ?",
        type: "choix-multiple",
        options:["Voiture (seul)","Voiture (covoiturage)","Transports en commun (Bus, Train)","Vélo (classique ou électrique)","Marche","Autre"]
    },
    {
        question: "Quelle est la distance moyenne de vos trajets quotidiens ?",
        type: "choix",
        options:["< 2km","2km - 5km","5km - 10km","10km - 20km","> 20km"]
    },
    {
        question: "Quels sont les principaux freins qui vous empêchent d'utiliser davantage les transports en commun ou le vélo ?  ",
        type: "choix-multiple",
        options:["Horaires non adaptés","Temps de trajet trop long","Manque de sécurité (nuit, arrêts)","Coût","Manque de pistes cyclables","Manque d'accessibilité","Autre"]
    },
    {
        question: "Dans quelle mesure seriez-vous prêt à utiliser davantage les transports en commun ou le vélo si des améliorations étaient apportées ?",
        type: "choix",
        options:["Pas du tout","Occasionnellement","Souvent","trés souvent"]
    },
    {
        question: "Avez-vous déjà été impacté par la hausse des coûts de l’énergie dans vos déplacements ?",
        type: "choix",
        options:["Oui, cela m'a obligé à changer mes habitudes","Oui, mais cela n'a pas changé mes habitudes","Non, pas d'impact"]
    },
    {
        question: "Quelles améliorations concrètes souhaiteriez-vous voir pour les transports en commun et les mobilités douces ?",
        type: "zone-texte",
        placeholder: "entrez votre texte ici"
    },
    {
        question: "Seriez-vous intéressé par des ateliers ou des informations sur les alternatives à la voiture individuelle (covoiturage, vélo électrique, etc.) ?",
        type: "choix",
        options:["Oui","Non","Peut-être"]
    },
    {
        question: "Avez-vous d'autres suggestions pour améliorer la mobilité sur Lisieux Normandie ?",
        type: "zone-texte",
        placeholder: "entrez votre texte ici"
    },
    {
        question: "Etes-vous d'accord pour que vos données de déplacement soient utilisées anonymement dans le cadre de la création du PLD ( Plan Local de Déplacements) ?",
        type: "choix",
        options:["Oui","Non"]
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

function afficherResultats() {
    // 1. Sauvegarde dans le LocalStorage (Simulation Base de données)
    sauvegarderReponses();

    // 2. Affichage (Code existant)
    document.getElementById('contenuQuestionnaire').style.display = 'none';
    const elementResultats = document.getElementById('resultats');
    const listeResultats = document.getElementById('listeResultats');

    listeResultats.innerHTML = '';

    questionsListe.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'item-resultat';

        let reponseAffichee;
        if (q.type === 'choix-multiple' && Array.isArray(reponses[index])) {
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

// AJOUT administre.js
function sauvegarderReponses() {
    // Récupère l'historique existant ou crée un tableau vide
    let historique = JSON.parse(localStorage.getItem('db_reponses_administres')) || [];

    // Crée le nouvel objet de données
    const nouvelleEntree = {
        date: new Date().toLocaleDateString('fr-FR') + ' à ' + new Date().toLocaleTimeString('fr-FR'),
        reponses: reponses // L'objet global qui contient les réponses actuelles
    };

    // Ajoute et sauvegarde
    historique.push(nouvelleEntree);
    localStorage.setItem('db_reponses_administres', JSON.stringify(historique));
}

//FONCTION RETOUR A L'ACCUEIL
function retourAccueil() {
    window.location.href = 'accueil.html';
}

//Affiche la première question
afficherQuestion();