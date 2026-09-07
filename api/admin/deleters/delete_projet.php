<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$proId = trim($_POST['proId'] ?? '');

if (empty($proId)) {
    echo json_encode(['success' => false, 'message' => 'Id du projet manquant']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("delete from POR_PROJET_DOMAINES where pod_pro_id=?");
    $stmt->execute([$proId]);

    $stmt = $pdo->prepare("delete from POR_PROJETS where pro_id=?");
    $stmt->execute([$proId]);

    header('Location: ../../../admin/admin_projets.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Delete Projet Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de suppréssion du projet']);
}
