/* ─── TOGGLE MENU ─── */
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.classList.contains('open');

    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');

    // Ferme au clic sur l'overlay
    if (!isOpen && overlay) {
        overlay.onclick = () => closeMenu();
    }
}

function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
}

/* ─── FERMER SI ON AGRANDI AU DESSUS DE 800px ─── */
window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        closeMenu();
    }
});