<?php
require_once __DIR__ . '/../../../auth/guard.php';
require_once __DIR__ . '/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json');


function repondre($success, $message, $redirect = '') {
    echo json_encode(['success' => $success, 'message' => $message, 'redirect' => $redirect]);
    exit;
}

function uploadFichier($file, $dossier, $extensionsAutorisees, $tailleMax = 5000000) {
    if ($file['error'] !== UPLOAD_ERR_OK) return false;
    if ($file['size'] > $tailleMax)       return false;

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $extensionsAutorisees)) return false;

    if (!is_dir($dossier)) {
        mkdir($dossier, 0755, true);
    }

    $nomFichier = time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
    $chemin     = rtrim($dossier, '/') . '/' . $nomFichier;

    if (!move_uploaded_file($file['tmp_name'], $chemin)) return false;

    return $nomFichier;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    repondre(false, 'Méthode non autorisée.');
}

$dossierPhotos = __DIR__ . '/../../../assets/img/';
$dossierDocs   = __DIR__ . '/../../../assets/docs/';
$dossierDocsEN   = __DIR__ . '/../../../assets/docs/';

$email = trim($_POST['email']    ?? '');
$bio   = trim($_POST['biographie'] ?? '');
$bioEN   = trim($_POST['biographie_en'] ?? '');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    repondre(false, 'Adresse e-mail invalide.');
}

if (!$bio) {
    repondre(false, 'La biographie ne peut pas être vide.');
}

if (!$bioEN) {
    repondre(false, 'La biographie anglaise ne peut pas être vide.');
}

$nomPhoto = null;
if (!empty($_FILES['photo']['name'])) {
    $nomPhoto = uploadFichier(
        $_FILES['photo'],
        $dossierPhotos,
        ['jpg', 'jpeg', 'png', 'webp'],
        3000000
    );
    if ($nomPhoto === false) {
        repondre(false, 'Photo invalide. Formats acceptés : JPG, PNG, WEBP. Max 3 Mo.');
    }
}

$nomCV = null;
if (!empty($_FILES['cv']['name'])) {
    $nomCV = uploadFichier(
        $_FILES['cv'],
        $dossierDocs,
        ['pdf'],
        10000000
    );
    if ($nomCV === false) {
        repondre(false, 'CV invalide. Format accepté : PDF uniquement. Max 10 Mo.');
    }
}

$nomCVEN = null;
if (!empty($_FILES['cv_en']['name'])) {
    $nomCVEN = uploadFichier(
        $_FILES['cv_en'],
        $dossierDocsEN,
        ['pdf'],
        10000000
    );
    if ($nomCVEN === false) {
        repondre(false, 'CV EN invalide. Format accepté : PDF uniquement. Max 10 Mo.');
    }
}

$db = getDB();

$sets   = ['use_email = ?', 'use_bio = ?','use_bio_en = ?'];
$params = [$email, $bio,$bioEN];

if ($nomPhoto !== null) {
    $sets[]   = 'use_pp = ?';
    $params[] = $nomPhoto;
}

if ($nomCV !== null) {
    $sets[]   = 'use_nom_cv = ?';
    $params[] = $nomCV;
}

if ($nomCVEN !== null) {
    $sets[]   = 'use_nom_cv_en = ?';
    $params[] = $nomCVEN;
}

$sql = 'UPDATE POR_USERS SET ' . implode(', ', $sets) . ' WHERE use_id = 1';
$stmt = $db->prepare($sql);
$stmt->execute($params);

if ($nomPhoto !== null) {
    $ancien = $db->query('SELECT use_pp FROM POR_USERS WHERE use_id = 1')->fetchColumn();
    if ($ancien && $ancien !== $nomPhoto && file_exists($dossierPhotos . $ancien)) {
        unlink($dossierPhotos . $ancien);
    }
}

if ($nomCV !== null) {
    $ancien = $db->query('SELECT use_nom_cv FROM POR_USERS WHERE use_id = 1')->fetchColumn();
    if ($ancien && $ancien !== $nomCV && file_exists($dossierDocs . $ancien)) {
        unlink($dossierDocs . $ancien);
    }
}

if ($nomCVEN !== null) {
    $ancien = $db->query('SELECT use_nom_cv_en FROM POR_USERS WHERE use_id = 1')->fetchColumn();
    if ($ancien && $ancien !== $nomCVEN && file_exists($dossierDocsEN . $ancien)) {
        unlink($dossierDocsEN . $ancien);
    }
}

header('Location: ../../../admin/admin_profil.php');
exit;