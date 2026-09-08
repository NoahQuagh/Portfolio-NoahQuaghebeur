<?php
header('Content-Type: application/json; charset=utf-8');
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';
    require_once __DIR__.'/../../config/language.php';

    $db = getDB();

    $strEnCours  = __tphp('en_cours');

    $req = $db->prepare("select par_id,par_icone,CONCAT(DATE_FORMAT(par_date_debut, '%Y'),' - ',COALESCE(DATE_FORMAT(par_date_fin, '%Y'), :en_cours)) as date,
       par_titre,par_localisation,par_description,par_date_debut,par_date_fin,par_titre_en,par_description_en
from POR_PARCOURS ORDER BY par_id desc");

    $req->bindValue(':en_cours', $strEnCours, PDO::PARAM_STR);

    $req->execute();

    $parcours = $req->fetchAll();

    $formattedParcours = array_map(function($p) {
        return [
            'id'           => $p['par_id'],
            'icon'           => $p['par_icone'],
            'date'          => $p['date'],
            'titre'        => $p['par_titre'],
            'localisation'          => $p['par_localisation'],
            'desc'    => $p['par_description'],
            'date_debut'    => $p['par_date_debut'],
            'date_fin'    => $p['par_date_fin'],
            'titre_en'        => $p['par_titre_en'],
            'desc_en'    => $p['par_description_en'],
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
