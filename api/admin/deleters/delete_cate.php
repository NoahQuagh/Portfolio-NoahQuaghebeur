<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$cateId = trim($_POST['catId'] ?? '');

if (empty($cateId)) {
    echo json_encode(['success' => false, 'message' => 'Id de la catégorie manquant']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("update POR_DOMAINES set dom_comp_id=null where dom_comp_id=?");
    $stmt->execute([$cateId]);

    $stmt = $pdo->prepare("delete from POR_COMPETENCES where com_id=?");
    $stmt->execute([$cateId]);

    header('Location: ../../../admin/admin_competences.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Delete Categorie Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de suppréssion de la catégorie']);
}