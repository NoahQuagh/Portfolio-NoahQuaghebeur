<?php
session_start();

$allowed_langs = ['fr', 'en'];
$default_lang  = 'fr';

$current_lang = $default_lang;

if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $browserLang = strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));
    if (in_array($browserLang, $allowed_langs)) {
        $current_lang = $browserLang;
    }
}

if (isset($_COOKIE['user_lang']) && in_array($_COOKIE['user_lang'], $allowed_langs)) {
    $current_lang = $_COOKIE['user_lang'];
}

$langFilePath = __DIR__ . "/../lang/$current_lang.php";
$translations = file_exists($langFilePath) ? require $langFilePath : [];

/**
 * Fonction de traduction PHP
 */
function __tphp(string $key): string {
    global $translations;
    return $translations[$key] ?? $key;
}