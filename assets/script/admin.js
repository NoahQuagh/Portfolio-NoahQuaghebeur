function toggleDd(id) {
    document.getElementById(id).classList.toggle('open');
}

/* ─────────────────────────────────────────
   HELPERS CHART
───────────────────────────────────────── */
function getVar(v) {
    return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
}

/* ─────────────────────────────────────────
   ZONE 1 — Doughnut visiteurs
───────────────────────────────────────── */
const ctx1 = document.getElementById('chart-zone1');
if (ctx1) {
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Visiteur', 'Capitaine', 'Étudiant', 'Projet'],
            datasets: [{
                data: [56, 1, 5, 3],
                backgroundColor: [
                    'rgba(124,111,224,0.25)',
                    'rgba(255,152,0,0.25)',
                    'rgba(76,175,80,0.25)',
                    'rgba(232,64,64,0.25)',
                ],
                borderColor: ['#7c6fe0', '#ff9800', '#4caf50', '#e84040'],
                borderWidth: 1.5,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            cutout: '68%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255,255,255,0.5)',
                        font: {family: 'IBM Plex Mono', size: 10},
                        padding: 14,
                        boxWidth: 10,
                        boxHeight: 10,
                    }
                }
            }
        }
    });
}

/* ─────────────────────────────────────────
   ZONE 2 — Mini sparkline bot (uptime/cmds)
───────────────────────────────────────── */
const ctx2 = document.getElementById('chart-zone2');
if (ctx2) {
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
            datasets: [{
                label: 'Commandes',
                data: [0, 34, 28, 45, 4, 0],
                backgroundColor: 'rgba(124,111,224,0.3)',
                borderColor: '#7c6fe0',
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            plugins: {legend: {display: false}},
            scales: {
                x: {
                    ticks: {color: 'rgba(255,255,255,0.25)', font: {family: 'IBM Plex Mono', size: 9}},
                    grid: {color: 'rgba(255,255,255,0.04)'}
                },
                y: {
                    ticks: {color: 'rgba(255,255,255,0.25)', font: {family: 'IBM Plex Mono', size: 9}},
                    grid: {color: 'rgba(255,255,255,0.04)'}
                }
            }
        }
    });
}

/* ─────────────────────────────────────────
   CONTENT — Multi-lignes activité annuelle
───────────────────────────────────────── */
const ctx4 = document.getElementById('chart-content');
if (ctx4) {
    new Chart(ctx4, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juillet', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [
                {
                    label: 'Commandes exécutées',
                    data: [0, 34, 28, 45, 4, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(124,111,224,0.15)',
                    borderColor: '#7c6fe0',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#7c6fe0',
                },
                {
                    label: 'Bugs signalés',
                    data: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(232,64,64,0.08)',
                    borderColor: '#e84040',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#e84040',
                },
                {
                    label: 'Serveurs actifs',
                    data: [0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(76,175,80,0.08)',
                    borderColor: '#4caf50',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#4caf50',
                },
                {
                    label: 'Équipes Premier',
                    data: [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(230,144,10,0.08)',
                    borderColor: '#e6900a',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#e6900a',
                },
                {
                    label: 'Bugs résolus',
                    data: [0, 0, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(10,230,230,0.06)',
                    borderColor: '#0ae6e6',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#0ae6e6',
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {mode: 'index', intersect: false},
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255,255,255,0.5)',
                        font: {family: 'IBM Plex Mono', size: 11},
                        padding: 20,
                        boxWidth: 12,
                        boxHeight: 12,
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(8,8,32,0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    titleColor: 'rgba(255,255,255,0.7)',
                    bodyColor: 'rgba(255,255,255,0.5)',
                    titleFont: {family: 'IBM Plex Mono', size: 11},
                    bodyFont: {family: 'IBM Plex Mono', size: 11},
                    padding: 12,
                }
            },
            scales: {
                x: {
                    ticks: {color: 'rgba(255,255,255,0.3)', font: {family: 'IBM Plex Mono', size: 11}},
                    grid: {color: 'rgba(255,255,255,0.05)'}
                },
                y: {
                    ticks: {color: 'rgba(255,255,255,0.3)', font: {family: 'IBM Plex Mono', size: 11}},
                    grid: {color: 'rgba(255,255,255,0.05)'}
                }
            }
        }
    });
}