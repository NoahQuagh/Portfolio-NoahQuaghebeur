<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$expIcon = trim($_POST['exp_icon'] ?? '');
$expLoc = trim($_POST['exp_loc'] ?? '');
$expContrat = trim($_POST['exp_contrat'] ?? '');
$expPoste = trim($_POST['exp_poste'] ?? '');
$expEntreprise = trim($_POST['exp_entreprise'] ?? '');
$expDesc = trim($_POST['exp_desc'] ?? '');
$expDateDebut = trim($_POST['date_debut'] ?? '');
$expDateFin = trim($_POST['date_fin'] ?? null);


if (empty($expIcon) ||  empty($expLoc) ||  empty($expContrat) ||  empty($expPoste) ||  empty($expEntreprise)  ||  empty($expDesc) ||  empty($expDateDebut)) {
    echo json_encode(['success' => false, 'message' => 'Informations manquantes']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("insert into POR_EXPERIENCES 
    (exp_logo, exp_date_debut, exp_date_fin, exp_type_contrat, exp_nom_poste, exp_entreprise, exp_localisation, exp_description) 
    VALUE (?,?,?,?,?,?,?,?)");
    $stmt->execute([$expIcon,$expDateDebut,$expDateFin,$expContrat,$expPoste,$expEntreprise,$expLoc,$expDesc]);

    header('Location: ../../../admin/admin_experiences.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Update Experience Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de mise a jour de l\'experience']);
}


