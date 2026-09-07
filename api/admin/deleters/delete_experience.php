<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$expId = trim($_POST['expId'] ?? '');

if (empty($expId)) {
    echo json_encode(['success' => false, 'message' => 'Id de l\'experience manquant']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("delete from POR_EXPERIENCES where exp_id=?");
    $stmt->execute([$expId]);

    header('Location: ../../../admin/admin_experiences.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Delete Experience Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de suppréssion de l\'experience']);
}

