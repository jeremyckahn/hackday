<?php

$filename = 'band_data.json';
$handle = fopen($filename, "r");
$contents = fread($handle, filesize($filename));
fclose($handle);

$bandArray = json_decode($contents);

for ($i = 0; $i < count($bandArray); $i++) {
//for ($i = 0; $i < 3; $i++) {
	//var_dump($bandArray);
	$echonestId = $bandArray[$i]->id_echoNest;
	
	$ch = curl_init("http://developer.echonest.com/api/v4/artist/terms?api_key=YCPKHEGQZ9BTYBBBE&id=" . $echonestId . "&format=json");
	//echo("http://developer.echonest.com/api/v4/artist/terms?api_key=YCPKHEGQZ9BTYBBBE&id=" . $echonestId . "&format=json");

	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);
	
	$responseJson = json_decode($response);
	$termObjsArr = $responseJson->response->terms;
	$termStrsArr = array();
	
	//var_dump($termObjsArr);
	
//	var_dump($termObjsArr);
	
	for ($j = 0; $j < count($termObjsArr); $j++) {
		array_push($termStrsArr, $termObjsArr[$j]->name);
	}
	
	$bandArray[$i]->genres = $termStrsArr;
}

$bandsJson = json_encode($bandArray);

$fp = fopen('band_data_TERMS.json', 'w');
fwrite($fp, $bandsJson);
fclose($fp);

?>