<?php
require_once __DIR__ . '/../auth/guard.php';
require_once __DIR__ . '/../api/loaders/loadProfile.php'
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier le Profil - Admin</title>
    <link rel="stylesheet" href="../assets/style/palette.css">
    <link rel="stylesheet" href="../assets/style/responsive.css">
    <link rel="stylesheet" href="../assets/style/admin/mainAdmin.css">
    <link rel="stylesheet" href="../assets/style/admin/profile.css">
  <link rel="icon" type="image/png" href="../assets/icon/NQ.ico">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body>
<header class="admin-bar">
    <div class="admin-bar-brand"><a href="dashboard.php" style="color:inherit; text-decoration:none;">Portfolio <em>Admin</em></a></div>
    <div class="admin-bar-right">
        <a href="dashboard.php" class="admin-logout" style="border-color: rgba(255,255,255,0.15); color: #fff;">
            <i class="ti ti-arrow-left"></i>
            Retour
        </a>
        <a href="../auth/logout.php" class="admin-logout">
            <i class="ti ti-logout"></i>
            Déconnexion
        </a>
    </div>
</header>

<main>
    <div class="page-kicker">// Édition des données</div>
    <h1 class="page-title">Informations<br><em>personnelles</em></h1>
    <p class="page-sub">Modifiez vos informations : mail, bio, photo ou CV.</p>

    <form action="../api/admin/updaters/update_profile.php" method="POST" enctype="multipart/form-data" class="admin-form">

        <div class="form-group">
            <label class="form-label">Adresse Email</label>
            <input type="email" id="email" name="email" value="<?= $mail ?>" required class="form-input">
        </div>

        <div class="form-group">
            <label class="form-label">Biographie / Description</label>
            <textarea id="biographie" name="biographie" rows="5" class="form-textarea" required><?= $bio ?></textarea>
        </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label" for="photo">
            <i class="ti ti-photo"></i> Photo de profil
          </label>
          <input type="file" id="photo" name="photo" accept=".jpg,.jpeg,.png" class="form-input-file">
          <span class="form-hint">Formats acceptés : JPG, PNG</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="cv">
            <i class="ti ti-file-text"></i> Fichier CV (PDF)
          </label>
          <input type="file" id="cv" name="cv" accept=".pdf" class="form-input-file">
          <span class="form-hint">Format accepté : PDF uniquement</span>
        </div>
      </div>

        <div class="form-actions">
            <button type="submit" class="btn-submit">
                <i class="ti ti-device-floppy"></i> Enregistrer les modifications
            </button>
        </div>

    </form>
</main>
</body>
</html>
