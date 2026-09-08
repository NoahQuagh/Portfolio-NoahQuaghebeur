<?php
header('Content-Type: application/json; charset=utf-8');
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $req = $db->prepare('SELECT
    p.pro_id,
    p.pro_nom,
    p.pro_nom_en,
    p.pro_desc,
    p.pro_desc_en,
    p.pro_github,
    p.pro_lien,
    p.pro_img,
    d.dom_id,
    d.dom_nom,
    d.dom_logo
FROM POR_PROJETS p
         left JOIN POR_PROJET_DOMAINES pd ON pd.pod_pro_id = p.pro_id
         left JOIN POR_DOMAINES d         ON d.dom_id = pd.pod_dom_id
ORDER BY p.pro_id, d.dom_id
');

    $req->execute();

    $rows = $req->fetchAll();

    $reqDom = $db->prepare('SELECT dom_id, dom_nom FROM POR_DOMAINES ORDER BY dom_nom');
    $reqDom->execute();
    $tousLesDomaines = $reqDom->fetchAll();

    $grouped = [];
    foreach ($rows as $row) {
        $id = $row['pro_id'];

        if (!isset($grouped[$id])) {
            $grouped[$id] = [
                'id'       => $row['pro_id'],
                'nom'      => $row['pro_nom'],
                'nom_en'      => $row['pro_nom_en'],
                'desc'     => $row['pro_desc'],
                'desc_en'   => $row['pro_desc_en'],
                'github'   => $row['pro_github'],
                'lien'     => $row['pro_lien'],
                'img'      => $row['pro_img'],
                'domaines' => []
            ];
        }

        if ($row['dom_nom']) {
            $grouped[$id]['domaines'][] = [
                'id'  => $row['dom_id'],
                'nom'  => $row['dom_nom'],
                'logo' => $row['dom_logo']
            ];
        }
    }

    echo json_encode([
        'success' => true,
        'data'    => array_values($grouped),
        'tous_domaines'  => $tousLesDomaines
    ]);

} catch (\Throwable $e) {
    error_log("[Competence Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des projets.']);
    exit();
}
?>