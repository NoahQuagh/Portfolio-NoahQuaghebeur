<?php
header('Content-Type: application/json; charset=utf-8');
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $req = $db->prepare('SELECT
    c.com_categorie,
    c.com_icone,
    d.dom_nom,
    d.dom_logo,
    d.dom_desc
FROM POR_COMPETENCES c
         JOIN POR_DOMAINES d ON d.dom_comp_id = c.com_id
ORDER BY c.com_id, d.dom_id
');

    $req->execute();

    $competence = $req->fetchAll();

    $grouped = [];
    foreach ($competence as $row) {
        $cat = $row['com_categorie'];

        if (!isset($grouped[$cat])) {
            $grouped[$cat] = [
                'categorie' => $row['com_categorie'],
                'icone'     => $row['com_icone'],
                'domaines'  => []
            ];
        }

        $grouped[$cat]['domaines'][] = [
            'nom'   => $row['dom_nom'],
            'logo'  => $row['dom_logo'],
            'desc'  => $row['dom_desc']
        ];
    }

    $formattedCompetence = array_values($grouped);

    echo json_encode([
        'success' => true,
        'data'    => $formattedCompetence
    ]);

} catch (\Throwable $e) {
    error_log("[Competence Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des competences.']);
    exit();
}
?>