<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$expId = trim($_POST['exp_id'] ?? '');
$expIcon = trim($_POST['exp_icon'] ?? '');
$expLoc = trim($_POST['exp_loc'] ?? '');
$expContrat = trim($_POST['exp_contrat'] ?? '');
$expContratEN = trim($_POST['exp_contrat_en'] ?? '');
$expPoste = trim($_POST['exp_poste'] ?? '');
$expPosteEN = trim($_POST['exp_poste_en'] ?? '');
$expEntreprise = trim($_POST['exp_entreprise'] ?? '');
$expDesc = trim($_POST['exp_desc'] ?? '');
$expDescEN = trim($_POST['exp_desc_en'] ?? '');
$expDateDebut = trim($_POST['date_debut'] ?? '');
$expDateFinInput = trim($_POST['date_fin'] ?? '');


if (!empty($expDateFinInput)) {
    $timestamp = strtotime($expDateFinInput);
    $expDateFin = $timestamp ? date('Y-m-d', $timestamp) : null;
} else {
    $expDateFin = null;
}

if (empty($expId) || empty($expIcon) ||  empty($expLoc) ||  empty($expContrat) ||  empty($expPoste) ||  empty($expEntreprise)  ||  empty($expDesc) ||  empty($expDateDebut) ||  empty($expContratEN)  ||  empty($expPosteEN) ||  empty($expDescEN)) {
    echo json_encode(['success' => false, 'message' => 'Informations manquantes']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("update POR_EXPERIENCES set exp_logo=? , exp_date_debut=? , exp_date_fin=? ,exp_type_contrat=?,exp_nom_poste=? ,exp_entreprise=? , exp_localisation=? , exp_description=?,exp_type_contrat_en=?,exp_nom_poste_en=?,exp_description_en=?
where exp_id=?");
    $stmt->execute([$expIcon,$expDateDebut,$expDateFin,$expContrat,$expPoste,$expEntreprise,$expLoc,$expDesc,$expContratEN,$expPosteEN,$expDescEN,$expId]);

    header('Location: ../../../admin/admin_experiences.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Update Experience Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de mise a jour de l\'experience']);
}


