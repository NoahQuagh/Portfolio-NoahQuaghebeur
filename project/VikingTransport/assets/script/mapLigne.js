function initMap() {
    const map = L.map('map', {
        minZoom: 9,
        maxZoom: 12
    }).setView([49.1828, -0.3707], 5);


    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);


    const coordonneesVilles = {
        "Caen": [49.1828, -0.3707],
        "Rouen": [49.4431, 1.0993],
        "Cherbourg-en-Cotentin": [49.6337, -1.6221],
        "Flamanville": [49.5303, -1.8665],
        "Granville": [48.8379, -1.5977],
        "Vire Normandie": [48.8378, -0.8893],
        "Argentan": [48.7444, -0.0192],
        "Bayeux": [49.2764, -0.7025],
        "Saint-Lô": [49.1161, -1.0908],
        "Dieppe": [49.9229, 1.0776],
        "Le Havre": [49.4938, 0.1008],
        "Lisieux": [49.1459, 0.2256],
        "Alençon": [48.4323, 0.1436],
        "Avranches": [48.6853, -1.3633]
    };


    const lignesReseau = [
        {
            nom: "Ligne 5A",
            communes: ["Flamanville", "Cherbourg-en-Cotentin", "Granville"],
            couleur: "#e67e22" // Orange
        },
        {
            nom: "Ligne 6B",
            communes: ["Granville", "Vire Normandie"],
            couleur: "#e74c3c" // Rouge
        },
        {
            nom: "Ligne 10B",
            communes: ["Vire Normandie", "Argentan"],
            couleur: "#8e44ad" // Violet
        },
        {
            nom: "Ligne Axe Majeur (Exemple)",
            communes: ["Cherbourg-en-Cotentin", "Bayeux", "Caen", "Lisieux", "Rouen"],
            couleur: "#2ecc71" // Vert
        }
    ];


    for (const ville in coordonneesVilles) {
        const coords = coordonneesVilles[ville];


        L.circleMarker(coords, {
            radius: 6,
            fillColor: "#2c3e50",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        })
            .addTo(map)
            .bindPopup(`<b>Arrêt : ${ville}</b><br>Réseau Viking Transport`);
    }


    lignesReseau.forEach(ligne => {

        const pointsGps = ligne.communes
            .map(nomVille => coordonneesVilles[nomVille])
            .filter(coords => coords !== undefined);


        const polyline = L.polyline(pointsGps, {
            color: ligne.couleur,
            weight: 3,
            opacity: 0.75
        }).addTo(map);


        polyline.bindPopup(`<b>${ligne.nom}</b><br>Itinéraire : ${ligne.communes.join(" → ")}`);

        polyline.on('mouseover', function () {
            this.setStyle({weight: 5, opacity: 1});
        });
        polyline.on('mouseout', function () {
            this.setStyle({weight: 3, opacity: 0.75});
        });
    });
}
