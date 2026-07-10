<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AuthController extends Controller
{
    public function loginFrontOffice(Request $request)
    {
        $validUsername = 'brindicis_stock';
        $validPassword = 'Brindicis2025';

        $username = $request['username'];
        $password = $request['password'];

        if($username == $validUsername && $password == $validPassword) {
            $token = bin2hex(random_bytes(16));  

            Cache::put("auth_token:frontoffice", $token);

            return response()->json(['message' => 'Login bem-sucedido!', 'logged_in' => true, 'token' => $token], 200); 
        } else {
            return response()->json(['message' => 'Login inválido!'], 401);
        }
    }

    public function loginBackOffice(Request $request)
    {
        $validUsername = 'brindicis_admin';
        $validPassword = 'Brindicis2025Admin';

        $username = $request['username'];
        $password = $request['password'];

        if($username == $validUsername && $password == $validPassword) {
            $token = bin2hex(random_bytes(16));  

            Cache::put("auth_token:backoffice", $token);

            return response()->json(['message' => 'Login bem-sucedido!', 'logged_in' => true, 'token' => $token], 200); 
        } else {
            return response()->json(['message' => 'Login inválido!'], 401);
        }
    }
}
