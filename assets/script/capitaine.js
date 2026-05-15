function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    sidebar.classList.toggle('open');
    body.classList.toggle('sidebar-open');
}