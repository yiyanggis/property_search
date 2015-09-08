<?php

require('../config.php');

header("content-type:application/json");

//website->database
//city->table

$website=$_POST["website"];
$city=$_POST["city"];

$city=str_replace(" ","_",$city);
$city=str_replace("-","_",$city);

$connection_string="host=".DB_HOST." port=".DB_PORT." dbname=".$website." user=".DB_USER." password=".DB_PASSWORD;

$db_conn=pg_connect($connection_string) or die ("Could not connect to server\n");

//$query = "SELECT station, \"city or to\", \"lat.\", \"long.\",type FROM airport_merge where ST_Intersects(ST_SetSRID(ST_POINT(".$lng.",".$lat."),4326)::geography, airport_merge.geom)";
//SELECT * from public.airport_point where ST_Intersects(ST_Buffer(ST_SetSRID(ST_POINT(-93,52.4),4326),0.2),airport_point.geom);

$query = "select * from ".$city;

$rs = pg_query($db_conn, $query) or die("Cannot execute query: $query\n");

$myarray = array();
while ($row = pg_fetch_row($rs)) {
  $myarray[] = $row;
}

// //echo "run query";
echo json_encode($myarray);
pg_close($db_conn);


?>