<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$parId = trim($_POST['par_id'] ?? '');
$parNom = trim($_POST['par_titre'] ?? '');
$parNomEN = trim($_POST['par_titre_en'] ?? '');
$parIcon = trim($_POST['par_icon'] ?? '');
$parLoc = trim($_POST['par_loc'] ?? '');
$parDesc = trim($_POST['par_desc'] ?? '');
$parDescEN = trim($_POST['par_desc_en'] ?? '');
$parDateDebut = trim($_POST['date_debut'] ?? '');
$parDateFinInput = trim($_POST['date_fin'] ?? '');

if (!empty($parDateFinInput)) {
    $timestamp = strtotime($parDateFinInput);
    $parDateFin = $timestamp ? date('Y-m-d', $timestamp) : null;
} else {
    $parDateFin = null;
}

if (empty($parNom) || empty($parIcon) ||  empty($parLoc) ||  empty($parDesc) ||  empty($parDateDebut) ||  empty($parId) ||  empty($parNomEN) ||  empty($parDescEN)) {
    echo json_encode(['success' => false, 'message' => 'Informations manquantes']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("update POR_PARCOURS set par_icone=? , par_date_debut=? , par_date_fin=? , par_titre=? , par_localisation=? , par_description=?,par_titre_en=? ,par_description_en=? where par_id=?");
    $stmt->execute([$parIcon,$parDateDebut,$parDateFin,$parNom,$parLoc,$parDesc,$parNomEN,$parDescEN,$parId]);

    header('Location: ../../../admin/admin_parcours.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Update Parcours Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de mise a jour du parcours']);
}


