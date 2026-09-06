<?php
session_start();
require_once __DIR__.'/../../../db/connexion_portfolio_db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Identifiant et mot de passe requis']);
    exit;
}

$pdo =getDB();

$stmt = $pdo->prepare("select use_id,CONCAT(use_prenom,' ',use_nom) as username,use_identifiant,use_mdp from POR_USERS where use_identifiant=?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['use_mdp'])) {
    echo json_encode(['success' => false, 'message' => 'Identifiant ou mot de passe incorrect']);
    exit;
}

session_regenerate_id(true);

$_SESSION['id']   = $user['use_id'];
$_SESSION['username']  = $user['username'];
$_SESSION['logged_in'] = true;


echo json_encode([
    'success'  => true,
    'redirect' => '../admin/dashboard.php'
]);