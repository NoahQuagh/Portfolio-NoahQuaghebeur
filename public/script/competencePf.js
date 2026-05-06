const competences = [
    {
        categorie: 'Développement web',
        icone: '◈',
        skills: [
            {nom: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
            {nom: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
            {
                nom: 'JavaScript',
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
            },
            {nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'},
        ]
    },
    {
        categorie: 'Développement logiciel',
        icone: '◇',
        skills: [
            {nom: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'},
            {nom: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
            {nom: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg'},
        ]
    },
    {
        categorie: 'Bases de données',
        icone: '▣',
        skills: [
            {nom: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'},
            {
                nom: 'Oracle',
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg'
            },
        ]
    },
    {
        categorie: 'Réseaux & systèmes',
        icone: '◉',
        skills: [
            {nom: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'},
            {nom: 'Windows', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg'},
        ]
    },
    {
        categorie: 'Outils & environnement',
        icone: '◆',
        skills: [
            {nom: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'},
            {
                nom: 'IntelliJ',
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg'
            },
            {
                nom: 'PhpStorm',
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phpstorm/phpstorm-original.svg'
            },
            {
                nom: 'WebStorm',
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg'
            },
            {
                nom: 'Clion',
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clion/clion-original.svg'
            }
        ]
    },
];

function comptence() {
    const items = competences.map((cat, i) => {
        const skills = cat.skills.map(s => `
            <div class="skill-item">
                <img src="${s.logo}" alt="${s.nom}" class="skill-logo">
                <span class="skill-nom">${s.nom}</span>
            </div>`).join('');

        return `
        <div class="comp-card" style="transition-delay:${i * 80}ms;">
            <div class="comp-card-header">
                <span class="comp-icone">${cat.icone}</span>
                <span class="comp-categorie">${cat.categorie}</span>
            </div>
            <div class="comp-card-body">${skills}</div>
        </div>`;
    }).join('');

    const content = `
        <div class="section-wrap">
            <div class="chapter" style="border-bottom:none; padding-bottom:4rem;">
                <div class="chapter-header">
                    <span class="chapter-num">\\compétences</span>
                    <h2 class="chapter-title">Mes Compétences</h2>
                </div>
                <div class="comp-grid" id="comp-grid">${items}</div>
            </div>
        </div>`;

    changeContent('accueil', content);

    setTimeout(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('show');
            });
        }, {threshold: 0.15});
        document.querySelectorAll('.comp-card').forEach(el => observer.observe(el));
    }, 300);
}