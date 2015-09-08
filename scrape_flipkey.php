<?php

require('config.php');

$connection_string="host=".DB_HOST." port=".DB_PORT." dbname=".DB_NAME_Flipkey." user=".DB_USER." password=".DB_PASSWORD;
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

$query = "SELECT * FROM ".$tablename.""; 

$rs = pg_query($db_conn, $query) or die("Cannot execute query: $query\n");

$myarray = array();
while ($row = pg_fetch_row($rs)) {
  $myarray[] = $row;

  //reverse_geocoding

  $lat=$row[1];
  $lon=$row[2];
  $address=reverse_geocoding($lat,$lon);

  if(is_null($address))
  {

  }
  else{
    updatePropertyRecord($db_conn, $tablename, $address,$row[0]);
  }
}

pg_close($db_conn); 

function getPropertyType($id){

}

function reverse_geocoding($lat,$lng){
    $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=".$lat.",".$lng."&sensor=true&key=AIzaSyCp1HWib0Es6rZGsfylHOZMawOiOZYx3Q4";
    //$url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=".$lat.",".$lng."&sensor=true";
    $data = @file_get_contents($url);
    $jsondata = json_decode($data,true);

    //echo $data;

    if(is_array($jsondata) && $jsondata['status'] == "OK")
    {
          //$city = $jsondata['results']['0']['address_components']['2']['long_name'];
          //$country = $jsondata['results']['0']['address_components']['5']['long_name'];
          //$street = $jsondata['results']['0']['address_components']['1']['long_name'];
          $formatted_address=$jsondata['results']['0']['formatted_address'];
          //print_r($jsondata['results']['0']);
          //echo "<br/>";
          echo $formatted_address;
          return $formatted_address;
    }
    else{
      print_r($jsondata);
      echo "<br/>";
      return NULL;
    }
}

function insertPropertyRecord($db_conn, $tablename, $record){
    
}

function updatePropertyRecord($db_conn, $tablename, $address,$id){
     $address=str_replace("'", "", $address);
     $sql ="UPDATE ".$tablename." set address = '".$address."' where ID=".$id;
     
     $ret = pg_query($db_conn, $sql);
     if(!$ret){
        echo pg_last_error($db);
        exit;
     } else {
        echo $id." updated successfully<br/>";
     }
}

?>