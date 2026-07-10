<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use App\Models\Product;

class CategoryController extends Controller
{
    public function addCategory(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $categoryName = $request['CategoryName'];
        
        $category = new Category();
        $category->name = $categoryName;
        $category->status = Category::ACTIVE;
        $category->save();

        return response()->json(['message' => 'Categoria criado com sucesso!', 'category'=>$category], 200);
    }

    public function editCategory(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];
        $categoryName = $request['CategoryName'];
        $status = $request['status'];

        $category = Category::where('id', $id)->first();
        if ($categoryName !== null) {
            $category->name = $categoryName;
        }
    
       
        if ($status !== null) {
            $category->status = $status;
        }
        $category->save();

        return response()->json(['message' => 'Produto editado com sucesso!', 'category'=>$category], 200);
    }

    public function deleteCategory(Request $request){
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];
        $category = Category::where('id', $id)->first();
        $productsCategory = Product::where('id_category', $id)->count();
        if($productsCategory > 0){
            return response()->json(['error' => 'Não é possível eliminar uma categoria que tem produtos associados!'], 200);
        }

        $category->delete();

        return response()->json(['message' => 'Produto eliminado com sucesso!'], 200);
    }

    public function getCategories(Request $request){
        
        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $categories = Category::orderBy('created_at', 'desc')->get();

        return response()->json(['categories' => $categories], 200);
    }

}
