<?php

$servername = "airmarket.gistemp.com";
$username = "airmarke";
$password = "1Eo2C8sk2i";
$dbname="airmarke_airport";
//$tableName="carlsbad2";
$tableName="air_merge";



header("content-type:application/json");

//var_dump($_POST);

$lat=$_POST["lat"];
$lng=$_POST["lng"];
$radius=$_POST["radius"];

$connection_string="host=".$servername." port=5432 dbname=".$dbname." user=".$username." password=".$password;
$db_conn=pg_connect($connection_string) or die ("Could not connect to server\n");

//$query = "SELECT station, \"city or to\", \"lat.\", \"long.\",type FROM airport_merge where ST_Intersects(ST_SetSRID(ST_POINT(".$lng.",".$lat."),4326)::geography, airport_merge.geom)";
//SELECT * from public.airport_point where ST_Intersects(ST_Buffer(ST_SetSRID(ST_POINT(-93,52.4),4326),0.2),airport_point.geom);
$query = "select class,name,floor_num,celing_num from public.airspace where ST_Intersects(ST_Buffer(ST_SetSRID(ST_POINT(".$lng.",".$lat."),4326),".$radius."),airspace.geom);";

$rs = pg_query($db_conn, $query) or die("Cannot execute query: $query\n");

$myarray = array();
while ($row = pg_fetch_row($rs)) {
  $myarray[] = $row;
}

//echo "run query";
echo json_encode($myarray);
pg_close($db_conn);


?>