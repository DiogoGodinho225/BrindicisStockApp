<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productvariant;
use App\Models\User;
use App\Models\Image;
use App\Models\Product;

class ProductVariantController extends Controller
{
    public function getProductVariants(Request $request)
    {
        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $productId = $request['id_product'];
        $productVariants = Productvariant::where('id_product', $productId)->orderBy('created_at', 'asc')->get();

        $productVariants->map(function ($productVariant) use ($productId) {
            $images = Image::where('color', strtolower($productVariant->color))->where('id_product', $productId)->get();
            $imagesUrl = [];  

            if ($images->isEmpty()) {
                $productVariant->images = null;
            } else {
                foreach ($images as $img) {
                    $url_base = env('APP_URL');
                    $imagesUrl[] = [
                        'id' => $img->id,
                        'url' => $url_base . '/' . $img->img_url];
                }
                $productVariant->images = $imagesUrl;
            }

            return $productVariant;
        });

        return response()->json([
            'productVariants' => $productVariants,
        ],200);
    }

    public function getVariants(Request $request)
    {
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

    
        $variants = Productvariant::get();

        $variants->map(function ($variant) {
            $product = Product::where('id', $variant->id_product)->first();
            $variant->ref = $product->ref;
            
            return $variant;
        });

        return response()->json([
            'variants' => $variants,
        ],200);
    }

}
