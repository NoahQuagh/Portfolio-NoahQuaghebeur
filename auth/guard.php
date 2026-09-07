<?php
session_start();
if(!isset($_SESSION['logged_in']) === true){
    header('location: ../auth/login.php');
}