<?php

$json = file_get_contents("php://input");
$jsonArr = json_decode($json,true);
if($jsonArr['fun'] == 'echo'){
    $returnText = $jsonArr['text'];
    echo '{ "fun":"echo", "return":"'.$returnText.'"}';
}

if($jsonArr['fun'] == 'getDir'){
    $returnText = getDir($jsonArr['path']);
    echo '{ "fun":"getDir", "return":"'.$returnText.'"}';
}

if($jsonArr['fun'] == 'fileRead'){
    $returnText = fileRead($jsonArr['filePath']);
    echo '{ "fun":"fileRead", "return":"'.$returnText.'"}';
}

if($jsonArr['fun'] == 'includeBin'){
    $returnText = includeBin($jsonArr['binPath']);
    echo '{ "fun":"includeBin", "return":"'.$returnText.'"}';
}

function getDir($dir){
    $dir = dirname(dirname(__FILE__)).$dir;
    $files=array();  
    $dir_list=scandir($dir);  
    foreach($dir_list as $file){  
        if($file!='..' && $file!='.'){  
            if(is_dir($dir.'/'.$file)){  
                $files[]=read_dir($dir.'/'.$file);  
            }else{  
                $files[]=$file;  
            }  
        }  
    }
    $files = implode('?',$files);
    return $files;
}

function fileRead($filePath){
    $filePath = dirname(dirname(__FILE__)).$filePath;
    $file = fopen($filePath, "r");
    $fileText = fread($file,filesize($filePath));
    $fileText=str_replace("\r\n","",$fileText);
    fclose($file);
    return $fileText;
}

function includeBin($binPath){
    $binPath = dirname(dirname(__FILE__)).$binPath;
    include $binPath;
    return 'OK';
}

?>