<?php

//echo("running... \r\n");


$ch = curl_init("http://api.dostuffmedia.com/bands.json?key=af9bf4e58022305398c885ae8a2e9888725dab0a");

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

$responseArr = json_decode($response, true);



$fp = fopen('output.json', 'w');
fwrite($fp, $response);
fclose($fp);




$response = json_encode($responseArr["bands"]);

echo($response);

curl_close($ch);

?>