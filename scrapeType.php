<?php
$servername = "localhost1";
$username = "root";
$password = "password";
$dbname="test";
$tableName="Huntington_Beach";
//$tableName="laguna_beach";
//$tablename="south_laguna";
$tablename="newport_beach";

$connection_string="host=localhost port=5432 dbname=property user=postgres password=postgres";
$db_conn=pg_connect($connection_string) or die ("Could not connect to server\n");

$query = "SELECT * FROM ".$tablename.""; // where type is null

$rs = pg_query($db_conn, $query) or die("Cannot execute query: $query\n");

$myarray = array();
while ($row = pg_fetch_row($rs)) {
  $myarray[] = $row;

  //reverse_geocoding

  $lat=$row[1];
  $lon=$row[2];
  //$address=reverse_geocoding($lat,$lon);
  $array=getPropertyType($row[4]);
  //$calendar=getCalendarDays($row[4]);

  echo $array;

  if(is_null($array))
  {
    echo $row[0]." error";
  }
  else{
    //updatePropertyRecord($db_conn, $tableName, $type,$row[0]);
    updatePropertyRecord($db_conn, $tablename, "type","calendar", $array, $row[0]);
  }
}

//echo json_encode($myarray);

//while ($row = pg_fetch_row($rs)) {
  //echo "$row[0] $row[1] $row[2]\n"."</br>";
  
  
//}

pg_close($db_conn); 

//echo json_encode($db_conn);

//move_uploaded_file($tmpName,"test.jpg");

function getPropertyType($listnum){

  echo $listnum;

  $array=array();
  $array1='';
  $array2=0;

  $form_url="http://www.vrbo.com/".$listnum;

  $curl = curl_init();

  curl_setopt($curl,CURLOPT_URL, $form_url);

  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $result = curl_exec($curl);

  $doc = new DOMDocument();
  $doc->loadHTML($result);

  $widget=$doc->getElementById("listing-criteria");

  //print_r($widget);
  if($widget->childNodes->length>0){
    $list=$widget->childNodes->item(1);

    //$list=$widget->childNodes->item(1);


    foreach ($list->childNodes as $item) {
        if ($item->hasChildNodes()) {
            $childs = $item->childNodes;
            foreach($childs as $i) {
                echo $i->nodeValue . "<br />";
                if($i->nodeValue=="House"){
                  $array1 = $i->nodeValue;
                }
                else if($i->nodeValue=="Apartment"){
                  $array1 = $i->nodeValue;
                }
                else if($i->nodeValue=="Cottage"){
                  $array1 = $i->nodeValue;
                }
                else if($i->nodeValue=="Condo"){
                  $array1 = $i->nodeValue;
                }
                else if($i->nodeValue=="Villa"){
                  $array1 = $i->nodeValue;
                }
                else if($i->nodeValue=="Studio"){
                  $array1 = $i->nodeValue;
                }
                else if($i->nodeValue=="Estate"){
                  $array1 = $i->nodeValue;
                }
                else if($i->nodeValue=="Townhome"){
                  $array1 = $i->nodeValue;
                }
            }
        }
    }
  }
  

  //calendar
  $tds=$doc->getElementsByTagName('script');

  //$array2 = substr_count($tds->item(9)->nodeValue,"N");
  foreach($tds as $item){

    $temp = substr_count($item->nodeValue,"N");
    if($temp>$array2)
      $array2=$temp;
  }
  // $array.push($array1);
  // $array.push($array2);
  array_push($array, $array1, $array2);

  return $array;

  curl_close($curl);
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

function updatePropertyRecord($db_conn, $tablename, $column1, $column2, $values,$id){
     $values[0]=str_replace("'", "", $values[0]);
     $values[1]=str_replace("'", "", $values[1]);
     $sql ="UPDATE ".$tablename." set ".$column1." = '".$values[0]."',".$column2."= '".$values[1]."' where ID=".$id;
     
     $ret = pg_query($db_conn, $sql);
     if(!$ret){
        echo pg_last_error($db_conn);
        exit;
     } else {
        echo $id." updated successfully<br/>";
     }
}

?>