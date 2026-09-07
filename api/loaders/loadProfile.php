<?php
try{

    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $req = $db->prepare("
select use_bio,use_email,use_nom_cv,use_pp from POR_USERS where use_id=1
");

    $req->execute();

    $exp = $req->fetch();

    $bio= $exp['use_bio'];
    $mail= $exp['use_email'];
    $cv= $exp['use_nom_cv'];
    $pp=$exp['use_pp'];


} catch (\Throwable $e) {
    $bio= null;
    $mail= null;
    $cv= null;
}
?>

