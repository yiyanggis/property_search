<?php
// $servername = "localhost";
// $username = "postgres";
// $password = "postgres";
// $dbname="property";
// $tablename="carlsbad3";
//south_laguna
//newport_beach

require('config.php');

$connection_string="host=".DB_HOST." port=".DB_PORT." dbname=".DB_NAME_Airbnb." user=".DB_USER." password=".DB_PASSWORD;

$db_conn=pg_connect($connection_string) or die ("Could not connect to server\n");

$arguments;
if ( !isset($_SERVER['HTTP_USER_AGENT']) ) {
   $arguments = $argv;
} else {
   $arguments = array();
   $arguments[] = $_SERVER['SCRIPT_FILENAME'];
   foreach ($_GET as $key => $value){
      $arguments[] = $value;
   }
}

var_dump($arguments);

$tablename=str_replace(" ","_",$arguments[1]);
$tablename=str_replace("-","_",$tablename);


$sql ="CREATE TABLE ".$tablename." (ID INT PRIMARY KEY NOT NULL, lat double precision, lon double precision, address text, listnum text, type text, calendar integer);";

$ret = pg_query($db_conn, $sql);
   if(!$ret){
      echo pg_last_error($db_conn);
   } else {
      echo "Table created successfully\n";
   }
   pg_close($db_conn);

?>