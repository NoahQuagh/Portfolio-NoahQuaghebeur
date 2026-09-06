<?php
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $req = $db->prepare("
select pro_nom,pro_lien from POR_PROJETS where pro_id!=2");

    $req->execute();

    $exp = $req->fetchAll(PDO::FETCH_ASSOC);

    $htmlProjets='';

    foreach ($exp as $projet) {
        $nom = htmlspecialchars($projet['pro_nom'], ENT_QUOTES, 'UTF-8');
        $lien = htmlspecialchars($projet['pro_lien'], ENT_QUOTES, 'UTF-8');

        $htmlProjets .= '    <li><a href="https://' . $lien . '" target="_blank" rel="noopener">' . $nom . "</a></li>";
    }

    echo $htmlProjets;



} catch (\Throwable $e) {
    echo '';
}
?>
