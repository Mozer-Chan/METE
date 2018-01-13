<?php

$json = file_get_contents("php://input");
$jsonArr = json_decode($json,true);

if($jsonArr['fun'] == 'putLog'){
    $returnText = putLog($jsonArr['log']);
    echo '{ "fun":"putLog", "return":"'.$returnText.'"}';
}

function putLog($dir){
    return $files;
}

?>