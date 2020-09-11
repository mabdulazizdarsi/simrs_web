<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class apicontroller extends Controller
{
    public function post_api(Request $request)
    {
        $url = "http://localhost/emr/api/".$request["method"];
        // print($url);
        $token = $request["token"];
        $encodedData = json_encode($request["data"]);
        // print_r($encodedData);
        $handle = curl_init($url);
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_POSTFIELDS, $encodedData);
        curl_setopt($handle, CURLOPT_HTTPHEADER, array("Content-Type:application/json", "Authorization:Bearer $token"));

        $result = curl_exec($handle);

    }
}
