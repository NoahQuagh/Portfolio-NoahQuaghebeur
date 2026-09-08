<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$proId = trim($_POST['pro_id'] ?? '');
$proNom = trim($_POST['pro_titre'] ?? '');
$proNomEN = trim($_POST['pro_titre_en'] ?? '');
$proDesc = trim($_POST['pro_desc'] ?? '');
$proDescEN = trim($_POST['pro_desc_en'] ?? '');
$proGit = trim($_POST['pro_github'] ?? '');
$proLien = trim($_POST['pro_lien'] ?? '');
$proImg = trim($_POST['pro_img'] ?? '');


if (empty($proId) || empty($proNom) || empty($proDesc) || empty($proGit) || empty($proLien) || empty($proImg) || empty($proDescEN) || empty($proNomEN)) {
    echo json_encode(['success' => false, 'message' => 'Informations manquantes']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("update POR_PROJETS set pro_nom=? , pro_desc=? , pro_github=? , pro_lien=? , pro_img=?, pro_desc_en=?,pro_nom_en=?  where pro_id=?");
    $stmt->execute([$proNom,$proDesc,$proGit,$proLien,$proImg,$proDescEN,$proNomEN,$proId]);

    header('Location: ../../../admin/admin_projets.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Update Projet Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de mise a jour du projet']);
}



