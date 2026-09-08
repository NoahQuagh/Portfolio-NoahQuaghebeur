<?php
header('Content-Type: application/json; charset=utf-8');
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';
    require_once __DIR__.'/../../config/language.php';

    $db = getDB();

    $lcTimeName = ($current_lang === 'en') ? 'en_US' : 'fr_FR';
    $db->exec("SET lc_time_names = '$lcTimeName'");

    $strEnCours  = __tphp('en_cours');
    $strDescVide = __tphp('desc_vide');

    $req = $db->prepare("
        SELECT exp_logo, exp_id,
               CASE
                   WHEN exp_date_fin IS NULL THEN CONCAT(DATE_FORMAT(exp_date_debut, '%M %Y'), ' - ', :en_cours)
                   WHEN DATE_FORMAT(exp_date_debut, '%Y-%m') = DATE_FORMAT(exp_date_fin, '%Y-%m') THEN DATE_FORMAT(exp_date_debut, '%M %Y')
                   ELSE CONCAT(DATE_FORMAT(exp_date_debut, '%M %Y'), ' - ', DATE_FORMAT(exp_date_fin, '%M %Y'))
               END as date,
               CONCAT(exp_type_contrat, ' - ', exp_nom_poste) as travail,
               CONCAT(exp_type_contrat_en, ' - ', exp_nom_poste_en) as travail_en,
               CONCAT(exp_entreprise, ' - ', exp_localisation) as lieu,
               COALESCE(exp_description, :desc_vide) as description,
               exp_date_debut, exp_date_fin, exp_type_contrat, exp_nom_poste, exp_entreprise, exp_localisation, exp_description, exp_type_contrat_en, exp_nom_poste_en, exp_description_en
        FROM POR_EXPERIENCES 
        ORDER BY exp_date_debut DESC
    ");

    $req->bindValue(':en_cours', $strEnCours, PDO::PARAM_STR);
    $req->bindValue(':desc_vide', $strDescVide, PDO::PARAM_STR);

    $req->execute();

    $exp = $req->fetchAll();

    $formattedExperiences = array_map(function($p) {
        return [
            'id'           => $p['exp_id'],
            'icon'           => $p['exp_logo'],
            'date'          => $p['date'],
            'travail'        => $p['travail'],
            'travail_en'        => $p['travail_en'],
            'localisation'          => $p['lieu'],
            'desc'    => $p['description'],
            'date_debut'    => $p['exp_date_debut'],
            'date_fin'    => $p['exp_date_fin'],
            'contrat'    => $p['exp_type_contrat'],
            'poste'    => $p['exp_nom_poste'],
            'entreprise'    => $p['exp_entreprise'],
            'loc'    => $p['exp_localisation'],
            'description'    => $p['exp_description'],
            'contrat_en'    => $p['exp_type_contrat_en'],
            'poste_en'    => $p['exp_nom_poste_en'],
            'description_en'    => $p['exp_description_en'],
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
