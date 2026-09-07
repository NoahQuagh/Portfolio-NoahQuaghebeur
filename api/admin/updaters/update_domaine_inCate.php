<?php
session_start();
require_once __DIR__ . '/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$domId = trim($_POST['dom_id'] ?? '');

if (empty($domId)) {
    echo json_encode(['success' => false, 'message' => 'Id de la catégorie et id de domaine requis']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("update POR_DOMAINES set dom_comp_id=null where dom_id=?");
    $stmt->execute([$domId]);


    header('Location: ../../../admin/admin_competences.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Update Domaine Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de mise a jour du domaine'.$e]);
}