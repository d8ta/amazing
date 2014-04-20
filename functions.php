<?php
/**
 * Created by PhpStorm.
 * User: danielraudschus
 * Date: 19.04.14
 * Time: 09:28
 */

    include "config.php";

        ob_start();
        session_start();

        if( ! $DB_NAME ) die('please create config.php, define $DB_NAME, $DB_USER, $DB_PASS there');


        try {
            $dbh = new PDO($DSN, $DB_USER, $DB_PASS);
            $dbh->setAttribute(PDO::ATTR_ERRMODE,            PDO::ERRMODE_EXCEPTION);
            $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $dbh->exec('SET CHARACTER SET utf8') ;
        } catch (Exception $e) {
            die("Problem connecting to database $DB_NAME as $DB_USER: " . $e->getMessage() );
        }
?>
