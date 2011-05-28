<?php

for ($i = 1; $i < 7; $i++) {
	$ch = curl_init("http://api.dostuffmedia.com/bands.json?key=af9bf4e58022305398c885ae8a2e9888725dab0a&page=" . $i);

	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$response = curl_exec($ch);

	$responseArr = json_decode($response, true);

	$fp = fopen('output' . $i . '.json', 'w');
	fwrite($fp, $response);
	fclose($fp);

	//$response = json_encode($responseArr["bands"]);

	echo($response);

	curl_close($ch);
}

?>