<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$proNom = trim($_POST['pro_titre'] ?? '');
$proNomEN = trim($_POST['pro_titre_en'] ?? '');
$proDesc = trim($_POST['pro_desc'] ?? '');
$proDescEN = trim($_POST['pro_desc_en'] ?? '');
$proGit = trim($_POST['pro_github'] ?? '');
$proLien = trim($_POST['pro_lien'] ?? '');
$proImg = trim($_POST['pro_img'] ?? '');


if (empty($proNom) || empty($proDesc) || empty($proGit) || empty($proLien) || empty($proImg) || empty($proDescEN) || empty($proNomEN)) {
    echo json_encode(['success' => false, 'message' => 'Informations manquantes']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("insert into POR_PROJETS (pro_nom, pro_img, pro_github, pro_lien, pro_desc,pro_desc_en,pro_nom_en) VALUE (?,?,?,?,?,?,?)");
    $stmt->execute([$proNom,$proImg,$proGit,$proLien,$proDesc,$proDescEN,$proNomEN]);

    header('Location: ../../../admin/admin_projets.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Add Projet Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur d\'ajout du projet']);
}




