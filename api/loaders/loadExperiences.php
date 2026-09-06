<?php
header('Content-Type: application/json; charset=utf-8');
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $db->exec("SET lc_time_names = 'fr_FR'");

    $req = $db->prepare("
SELECT exp_logo,
       CASE
           WHEN exp_date_fin IS NULL THEN CONCAT(DATE_FORMAT(exp_date_debut, '%M %Y'), ' - En cours')
           WHEN DATE_FORMAT(exp_date_debut, '%Y-%m') = DATE_FORMAT(exp_date_fin, '%Y-%m') THEN DATE_FORMAT(exp_date_debut, '%M %Y')
           ELSE CONCAT(DATE_FORMAT(exp_date_debut, '%M %Y'), ' - ', DATE_FORMAT(exp_date_fin, '%M %Y'))
           END as date,
       CONCAT(exp_type_contrat, ' - ', exp_nom_poste) as travail,
       CONCAT(exp_entreprise, ' - ', exp_localisation) as lieu,
       COALESCE(exp_description, 'Description vide') as description
FROM POR_EXPERIENCES");

    $req->execute();

    $exp = $req->fetchAll();

    $formattedExperiences = array_map(function($p) {
        return [
            'icon'           => $p['exp_logo'],
            'date'          => $p['date'],
            'travail'        => $p['travail'],
            'localisation'          => $p['lieu'],
            'desc'    => $p['description'],
        ];
    }, $exp);

    echo json_encode([
        'success' => true,
        'data'    => $formattedExperiences
    ]);

} catch (\Throwable $e) {
    error_log("[Competence Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des expériences.']);
    exit();
}
?>
