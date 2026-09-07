<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}


$parNom = trim($_POST['par_titre'] ?? '');
$parIcon = trim($_POST['par_icon'] ?? '');
$parLoc = trim($_POST['par_loc'] ?? '');
$parDesc = trim($_POST['par_desc'] ?? '');
$parDateDebut = trim($_POST['date_debut'] ?? '');
$parDateFin = trim($_POST['date_fin'] ?? null);


if (empty($parNom) || empty($parIcon) ||  empty($parLoc) ||  empty($parDesc) ||  empty($parDateDebut)) {
    echo json_encode(['success' => false, 'message' => 'Informations manquantes']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("insert into POR_PARCOURS (par_icone, par_date_debut, par_date_fin, par_titre, par_localisation, par_description) VALUE (?,?,?,?,?,?)");
    $stmt->execute([$parIcon,$parDateDebut,$parDateFin,$parNom,$parLoc,$parDesc]);

    header('Location: ../../../admin/admin_parcours.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Add Parcours Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de suppréssion du parcours']);
}

