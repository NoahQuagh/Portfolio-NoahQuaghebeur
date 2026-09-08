<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$cate = trim($_POST['com_categorie'] ?? '');
$cateEN = trim($_POST['com_categorie_en'] ?? '');
$icon = trim($_POST['com_icone'] ?? '');

if (empty($cate) || empty($icon) || empty($cateEN)) {
    echo json_encode(['success' => false, 'message' => 'Nom de la catégorie et icône requis']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("INSERT INTO POR_COMPETENCES (com_categorie, com_icone,com_categorie_en) VALUES (?, ?,?)");
    $stmt->execute([$cate, $icon,$cateEN]);

    echo json_encode(['success' => true, 'message' => 'création de la catégorie reussie']);

} catch (\Throwable $e) {
    error_log("[Add Competence Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de création de la competence']);
}