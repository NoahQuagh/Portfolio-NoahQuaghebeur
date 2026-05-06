<?php
require_once 'includes/guard.php';
chdir('/var/www/html');

shell_exec('git reset --hard origin/main 2>&1');

$output = shell_exec('git pull origin main 2>&1');

echo "<h2>R�sultat du d�ploiement :</h2>";
echo "<pre>$output</pre>";
?>