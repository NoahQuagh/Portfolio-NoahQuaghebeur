<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$domId = trim($_POST['dom_id'] ?? '');

if (empty($domId)) {
    echo json_encode(['success' => false, 'message' => 'Id du domaine requis']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("delete from POR_DOMAINES where dom_id=?");
    $stmt->execute([$domId]);

    header('Location: ../../../admin/admin_domaines.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Delete Domaine Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de suppresion du domaine']);
}

