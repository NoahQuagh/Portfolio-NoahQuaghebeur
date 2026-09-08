<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$nom = trim($_POST['dom_nom'] ?? '');
$icon = trim($_POST['dom_logo'] ?? null);
$desc = trim($_POST['dom_desc'] ?? '');
$descEN = trim($_POST['dom_desc_en'] ?? '');

if (empty($nom)  || empty($desc) || empty($descEN)) {
    echo json_encode(['success' => false, 'message' => 'Information manquante']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("insert into POR_DOMAINES (dom_nom, dom_logo, dom_desc,dom_desc_en) values (?,?,?,?)");
    $stmt->execute([$nom, $icon,$desc,$descEN]);

    header('Location: ../../../admin/admin_domaines.php');
    exit;

} catch (\Throwable $e) {
    error_log("[Add Domaine Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de création du domaines']);
}
