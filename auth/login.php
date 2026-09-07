<?php
require_once __DIR__ . '/../api/loaders/loadProfile.php'
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Portfolio</title>
    <link rel="stylesheet" href="../assets/style/palette.css">
    <link rel="stylesheet" href="../assets/style/footer.css">
    <link rel="stylesheet" href="../assets/style/responsive.css">
    <link rel="stylesheet" href="../assets/style/authStyle/login.css">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body style="background: gray">
<main>

    <form class="contact-grid" onsubmit="handleLogin(event)">
        <div class="form-field field-full">
            <label><i class="ti ti-user"></i> Identifiant</label>
            <input type="text" id="login-user" placeholder="Nom d'utilisateur" required autocomplete="username">
        </div>
        <div class="form-field field-full">
            <label><i class="ti ti-lock"></i> Mot de passe</label>
            <input type="password" id="login-pass" placeholder="••••••••" required autocomplete="current-password">
        </div>
        <div class="form-field field-full" id="login-error" style="display:none;">
        <span style="color:var(--color1); font-size:13px; font-family:var(--font-text);">
            <i class="ti ti-alert-circle"></i> <span id="login-error-msg"></span>
        </span>
        </div>
        <div style="grid-column:1/-1;">
            <button class="btn-submit" type="submit" id="login-btn">
                <i class="ti ti-login"></i>
                Se connecter
            </button>
        </div>
    </form>

</main>
<script src="../assets/script/auth/authentification.js"></script>
</body>
</html>
