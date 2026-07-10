<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use App\Models\Product;
use App\Models\User;

class LogController extends Controller
{
    public function getProductLogs(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id_product = $request['id'];

        $logs = Log::where('id_product', $id_product)
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json(['logs' => $logs], 200);

    }
}
