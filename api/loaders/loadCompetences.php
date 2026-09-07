<?php
header('Content-Type: application/json; charset=utf-8');
try {
    require_once __DIR__.'/../../db/connexion_portfolio_db.php';
    $db = getDB();

    $req = $db->prepare('
        SELECT
    c.com_id,
    c.com_categorie,
    c.com_icone,
    d.dom_id,
    d.dom_nom,
    d.dom_logo,
    d.dom_desc
FROM POR_COMPETENCES c
         left JOIN POR_DOMAINES d ON d.dom_comp_id = c.com_id
ORDER BY c.com_id, d.dom_id
    ');
    $req->execute();
    $rows = $req->fetchAll();

    $grouped = [];
    foreach ($rows as $row) {
        $cat = $row['com_categorie'];
        if (!isset($grouped[$cat])) {
            $grouped[$cat] = [
                'id'        => $row['com_id'],
                'categorie' => $row['com_categorie'],
                'icone'     => $row['com_icone'],
                'domaines'  => []
            ];
        }
        $grouped[$cat]['domaines'][] = [
            'id'   => $row['dom_id'],
            'nom'  => $row['dom_nom'],
            'logo' => $row['dom_logo'],
            'desc' => $row['dom_desc'],
        ];
    }

    $reqDomNull = $db->prepare('SELECT dom_id, dom_nom FROM POR_DOMAINES WHERE dom_comp_id IS NULL ORDER BY dom_nom');
    $reqDomNull->execute();
    $tousLesDomainesNull = $reqDomNull->fetchAll();

    $reqDom = $db->prepare('SELECT dom_id, dom_nom FROM POR_DOMAINES ORDER BY dom_nom');
    $reqDom->execute();
    $tousLesDomaines = $reqDom->fetchAll();

    echo json_encode([
        'success'        => true,
        'data'           => array_values($grouped),
        'tous_domaines_null'  => $tousLesDomainesNull,
        'tous_domaines'  => $tousLesDomaines
    ]);

} catch (\Throwable $e) {
    error_log('[Competence Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des compétences.']);
    exit();
}
?>