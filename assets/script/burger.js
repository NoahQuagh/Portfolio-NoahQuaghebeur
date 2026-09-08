(function () {

    var sidebar = document.getElementById('sidebar');
    var burger  = document.querySelector('.menu');

    var overlay = document.createElement('div');
    overlay.className = 'sb-overlay';
    document.body.appendChild(overlay);

    function open() {
        if (!sidebar) return;
        sidebar.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        if (!sidebar) return;
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    function toggle() {
        sidebar && sidebar.classList.contains('open') ? close() : open();
    }

    if (burger) burger.addEventListener('click', toggle);

    overlay.addEventListener('click', close);

    document.querySelectorAll('#sidebar .sb-item').forEach(function (el) {
        el.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });

})();