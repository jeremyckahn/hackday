<?php

$bandData = array();

for ($i = 1; $i < 7; $i++) {
	// get contents of a file into a string
	$filename = 'output' . $i . '.json';
	$handle = fopen($filename, "r");
	$contents = fread($handle, filesize($filename));
	fclose($handle);
	
	$jsonData = json_decode($contents, true);
	$bands = $jsonData["bands"]["band"];
	
	for ($j = 0; $j < count($bands); $j++) {
		array_push($bandData, array(
				"band_name" => $bands[$j]['title'],
				"id_lolla" => $bands[$j]['id'],
				"id_echoNest" => $bands[$j]['echonest_id']
			));
	}
}

$jsonData = json_encode($bandData);

$fp = fopen('band_data.json', 'w');
fwrite($fp, $jsonData);
fclose($fp);

?>