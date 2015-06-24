<?php 

require 'config.php';

if (!isset($_GET['f'])) {
    return;
}

$f = $_GET['f'];

if ($f == 'translate') {

    if (!isset($_GET['q'])) {
        return;
    }

    $q = $_GET['q'];        
    $q = urlencode($q);

    $url = 'http://fanyi.youdao.com/openapi.do?keyfrom='. $kf .'&key='. $key .'&type=data&doctype=json&version=1.1&q='. $q;
} else if ($f == 'rand') {
    $url = 'http://api.hitokoto.us/rand';
} else {
    return;
}

$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, $url); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
$output = curl_exec($ch); 
curl_close($ch);      

//header('Content-Type: application/json');
header('Content-Type: text/plain');
header('Access-Control-Allow-Origin: *');

echo $output;

?>
