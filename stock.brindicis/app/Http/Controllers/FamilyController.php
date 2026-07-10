<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Family;
use App\Models\User;

class FamilyController extends Controller
{
    public function getFamilies(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $families = Family::where('status', 1)->get();
        return response()->json(['families' => $families],200);
    }
}
