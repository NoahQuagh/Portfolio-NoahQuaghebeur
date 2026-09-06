<?php
header('Content-Type: application/json; charset=utf-8');
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $req = $db->prepare("select par_icone,CONCAT(DATE_FORMAT(par_date_debut, '%Y'),' - ',COALESCE(DATE_FORMAT(par_date_fin, '%Y'), 'En cours')) as date,
       par_titre,par_localisation,par_description
from POR_PARCOURS ORDER BY par_id desc");

    $req->execute();

    $parcours = $req->fetchAll();

    $formattedParcours = array_map(function($p) {
        return [
            'icon'           => $p['par_icone'],
            'date'          => $p['date'],
            'titre'        => $p['par_titre'],
            'localisation'          => $p['par_localisation'],
            'desc'    => $p['par_description'],
        ];
    }, $parcours);

    echo json_encode([
        'success' => true,
        'data'    => $formattedParcours
    ]);

} catch (\Throwable $e) {
    error_log("[Competence Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des competences.']);
    exit();
}
?>
