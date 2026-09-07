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
$proId = trim($_POST['pro_id'] ?? '');

if (empty($domId) || empty($proId)) {
    echo json_encode(['success' => false, 'message' => 'Id du projet et id de domaine requis']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("delete from POR_PROJET_DOMAINES where pod_pro_id=? and pod_dom_id=?");
    $stmt->execute([$proId,$domId]);


    header('Location: ../../../admin/admin_projets.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Update Domaine Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de mise à jour du domaine']);
}
