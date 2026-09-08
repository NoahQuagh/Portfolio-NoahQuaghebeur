<?php
try{
    require_once __DIR__.'/../../db/connexion_portfolio_db.php';

    $db = getDB();

    $req = $db->prepare("
        SELECT use_bio, use_email, use_nom_cv,use_bio_en,use_nom_cv_en, use_pp 
        FROM POR_USERS 
        WHERE use_id = 1
    ");

    $req->execute();

    $exp = $req->fetch();

    $bio= $exp['use_bio'];
    $mail= $exp['use_email'];
    $cv= $exp['use_nom_cv'];
    $pp=$exp['use_pp'];
    $bioEN=$exp['use_bio_en'];
    $cvEN=$exp['use_nom_cv_en'];


} catch (\Throwable $e) {
    $bio= null;
    $mail= null;
    $cv= null;
    $bioEN=null;
    $cvEN=null;
}
?>

