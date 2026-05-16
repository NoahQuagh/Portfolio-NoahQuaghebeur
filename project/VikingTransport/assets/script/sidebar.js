function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.classList.contains('open');

    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');


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


window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        closeMenu();
    }
});