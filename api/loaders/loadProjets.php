<?php
header('Content-Type: application/json; charset=utf-8');
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $req = $db->prepare('SELECT
    p.pro_id,
    p.pro_nom,
    p.pro_desc,
    p.pro_github,
    p.pro_lien,
    p.pro_img,
    d.dom_nom,
    d.dom_logo
FROM POR_PROJETS p
         JOIN POR_PROJET_DOMAINES pd ON pd.pod_pro_id = p.pro_id
         JOIN POR_DOMAINES d         ON d.dom_id = pd.pod_dom_id
ORDER BY p.pro_id, d.dom_id
');

    $req->execute();

    $rows = $req->fetchAll();

    $grouped = [];
    foreach ($rows as $row) {
        $id = $row['pro_id'];

        if (!isset($grouped[$id])) {
            $grouped[$id] = [
                'id'       => $row['pro_id'],
                'nom'      => $row['pro_nom'],
                'desc'     => $row['pro_desc'],
                'github'   => $row['pro_github'],
                'lien'     => $row['pro_lien'],
                'img'      => $row['pro_img'],
                'domaines' => []
            ];
        }

        if ($row['dom_nom']) {
            $grouped[$id]['domaines'][] = [
                'nom'  => $row['dom_nom'],
                'logo' => $row['dom_logo']
            ];
        }
    }

    echo json_encode([
        'success' => true,
        'data'    => array_values($grouped)
    ]);

} catch (\Throwable $e) {
    error_log("[Competence Error] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des competences.']);
    exit();
}
?>