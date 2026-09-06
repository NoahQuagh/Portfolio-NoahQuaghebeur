async function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    const btn  = document.getElementById('login-btn');
    const errBox = document.getElementById('login-error');
    const errMsg = document.getElementById('login-error-msg');

    errBox.style.display = 'none';
    btn.disabled = true;
    btn.innerHTML = '<i class="ti ti-loader-2"></i> Connexion…';

    const form = new FormData();
    form.append('username', user);
    form.append('password', pass);

    try {
        const res  = await fetch('../api/admin/validator/login.php', { method: 'POST', body: form });
        const data = await res.json();

        if (data.success) {
            window.location.href = data.redirect;
        } else {
            errMsg.textContent     = data.message ?? 'Identifiant ou mot de passe incorrect.';
            errBox.style.display   = 'block';
            btn.disabled           = false;
            btn.innerHTML          = '<i class="ti ti-login"></i> Se connecter';
        }
    }catch (error){
        errMsg.textContent   = 'Erreur réseau. Réessayez.';
        errBox.style.display = 'block';
        btn.disabled         = false;
        btn.innerHTML        = '<i class="ti ti-login"></i> Se connecter';
    }
}