(function () {

    const STORAGE_KEY = 'portfolio-theme';
    const root        = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);

        const icon = document.getElementById('theme-icon');
        if (!icon) return;

        if (theme === 'light') {
            icon.className = 'ti ti-sun';
        } else {
            icon.className = 'ti ti-moon';
        }
    }

    function getInitialTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;

        return window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';
    }

    function toggleTheme() {
        const current = root.getAttribute('data-theme') ?? 'dark';
        const next    = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    applyTheme(getInitialTheme());

    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('theme-btn');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }

        applyTheme(root.getAttribute('data-theme') ?? getInitialTheme());

        window.matchMedia('(prefers-color-scheme: light)')
            .addEventListener('change', function (e) {
                if (!localStorage.getItem(STORAGE_KEY)) {
                    applyTheme(e.matches ? 'light' : 'dark');
                }
            });
    });

})();