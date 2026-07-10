<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\Log;
use App\Models\Image;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use App\Models\Productvariant;

class ProductController extends Controller
{
    public function getProductsStock(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);
        
        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $stock = Product::where('active', Product::Active)->get();
        $reservations = Reservation::where('status', Reservation::PENDING)->get();


        $stockCounter = 0;
        $reservedStock = 0;

        foreach($stock as $item){
            $stockCounter += $item->quantity;
        }

        foreach($reservations as $item){
            $reservedStock += $item->quantity;
        }

        return response()->json(['stockCounter' => $stockCounter, 'reservedStock' => $reservedStock], 200);

    }

    public function getProducts(Request $request)
    {
        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $products = Product::orderBy('created_at', 'desc')->get();

        $products = $products->map(function($product) {
            
            $url_base = env('APP_URL');
            
            $images = Image::where('id_product', $product->id)->orderBy('created_at', 'asc')->get();

            $imagesUrl = [];

            if (!$images) {
                $product->images = null; 
            } else {
                foreach($images as $img){
                    $imagesUrl[] = [
                       'url' => $url_base . '/' . $img->img_url,
                       'id' => $img->id,
                       'color' => $img->color,
                ];
                }
            }
            
            $productVariants = Productvariant::where('id_product', $product->id)->get();
            $sizes = [];
            $colors = [];

            foreach($productVariants as $variant){
                $sizes[] = [
                    'sizes' => $variant->size,
                ];

                $colors[] = ['name' => $variant->color];
            }

            $sizes = collect($productVariants)
                ->pluck('size')
                ->unique()
                ->map(function ($size) {
                    return ['size' => $size];
                })
                ->values();

            $colors = collect($productVariants)
                ->pluck('color')
                ->unique()
                ->map(function ($color) {
                    return ['name' => $color];
                })
                ->values();

            $product->images = $imagesUrl;
            $product->category = $product->category;
            $product->family = $product->family;
            $product->sizes = $sizes;
            $product->colors = $colors;


            return $product;
        });

        return response()->json(['products' => $products], 200);
    }

    public function getProduct(Request $request)
    {
        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];

        if ($id != null) {
            $product = Product::find($id);
            $url_base = env('APP_URL');
            $images = Image::where('id_product', $product->id)->orderBy('created_at', 'asc')->get();

            $imagesUrl = [];

            if (!$images) {
                $product->images = null; 
            } else {
                foreach($images as $img){
                    $imagesUrl[] = [
                        'url' => $url_base . '/' . $img->img_url,
                        'id' => $img->id,
                        'color' => $img->color
                    ];
                }
            }

            $productVariants = Productvariant::where('id_product', $product->id)->get();
            $sizes = [];
            $colors = [];

            foreach($productVariants as $variant){
                $sizes[] = ['size' => $variant->size];

                $colors[] = ['name' => $variant->color];
            }

            $sizes = collect($productVariants)
                ->pluck('size')
                ->unique()
                ->map(function ($size) {
                    return ['size' => $size];
                })
                ->values();

            $colors = collect($productVariants)
                ->pluck('color')
                ->unique()
                ->map(function ($color) {
                    return ['name' => $color];
                })
                ->values();

            $product->images = $imagesUrl;
            $product->category = $product->category;
            $product->family = $product->family;
            $product->sizes = $sizes;
            $product->colors = $colors;

            return response()->json(['product' => $product], 200);
        }

        return response()->json(['message' => 'Produto não encontrado!'], 404);
    }


    public function addProduct(Request $request)
    {
        $token = $request['token'];
        $permission = User::verifyToken($token, true, false);

        if ($permission != true) {
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $product = new Product();
        $product->type = $request->input('type');
        $product->ref = $request->input('ref');
        $product->quantity = $request->input('quantity') ?? 0;
        $product->reserved = 0;
        $product->drawer = $request->input('drawer');
        $product->cx = $request->input('cx');
        $product->pvp = $request->input('pvp') ?? 0;
        $product->id_category = $request->input('category');
        $product->description = $request->input('description');
        $product->name = $request->input('name');
        $product->number = $request->input('number');
        $product->id_family = $request->input('family');

        if ($product->quantity == 0) {
            $product->status = Product::ESGOTADO;
        } elseif ($product->quantity < 30) {
            $product->status = Product::QUASE_ESGOTADO;
        } else {
            $product->status = Product::EM_STOCK;
        }

        $product->active = Product::Active;
        $product->save();

        $variants = $request['variants'];

        foreach ($variants as $variantIndex => $variant) {
            if (isset($variant['sizes']) && is_array($variant['sizes']) && count($variant['sizes']) > 0) {
                $variant['quantity'] = 0; 
            }
            $color = strtolower($variant['color']); 
            $isTextil = isset($variant['sizes']) && is_array($variant['sizes']) && count($variant['sizes']) > 0;

            if ($isTextil) {
                foreach ($variant['sizes'] as $size) {
                    $productVariant = new Productvariant();
                    $productVariant->id_product = $product->id;
                    $productVariant->color = $color;
                    $productVariant->size = strtoupper($size['size']);
                    $productVariant->quantity = $size['quantity'] ?? 0;
                    $productVariant->reserved = 0;
                    $productVariant->save();
                }
            } else {
                $productVariant = new Productvariant();
                $productVariant->id_product = $product->id;
                $productVariant->color = $color;
                $productVariant->size = null;
                $productVariant->quantity = $variant['quantity'] ?? 0;
                $productVariant->reserved = 0;
                $productVariant->save();
            }

            if ($request->hasFile("variants.$variantIndex.images")) {
                foreach ($request->file("variants.$variantIndex.images") as $imgFile) {
                    $imgName = Str::random(8) . '.png';
                    $imgFile->move(public_path('images'), $imgName);

                    $imageColor = new Image(); 
                    $imageColor->id_product = $product->id;
                    $imageColor->color = $color;
                    $imageColor->img_url = 'images/' . $imgName;
                    $imageColor->save();
                }
            }
        }

        $log = new Log();
        $log->id_product = $product->id;
        $log->message = "Produto adicionado";
        $log->newQuantity = $product->quantity;
        $log->save();

        return response()->json(['product' => $product, 'message' => 'Produto criado com sucesso!'], 200);
    }

    public function editProduct(Request $request) {
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if ($permission != true) {
            return response()->json(['error' => 'Token inválido']);
        }


        $id = $request->input('id');
        $type = $request->input('type');
        $ref = $request->input('ref');
        $quantity = $request->input('quantity');
        $description = $request->input('description');
        $drawer = $request->input('drawer');
        $cx = $request->input('cx');
        $pvp = $request->input('pvp');
        $id_category = $request->input('category');
        $id_family = $request->input('family');
        $imagesRemoved = json_decode($request->input('imagesToDelete'), true);
        $sizesRemoved = json_decode($request->input('sizesToDelete'), true);
        $variantsRemoved = json_decode($request->input('variantsToDelete'), true);
        $active = $request->input('active');
        $name = $request->input('name');
        $number = $request->input('number');
        $variants = $request->input('variants');
        $product = Product::where('id', $id)->first();

        if (!$product) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        if ($type !== null) {
            $product->type = $type;
        }
        if ($ref !== null) {
            $product->ref = $ref;
        }
        if ($quantity !== null) {
            $product->quantity = $quantity;
        }
        if ($description === null || $description === 'null' || trim($description) === '') {
            $product->description = null;
        } else {
            $product->description = $description;
        }


        if ($drawer !== null) {
            $product->drawer = $drawer;
        }
        if ($cx !== null) {
            $product->cx = $cx;
        }
        if ($pvp !== null) {
            $product->pvp = $pvp;
        } else {
            $product->pvp = 0;
        }
        if ($id_category !== null) {
            $product->id_category = $id_category;
        }
        if ($id_family !== null) {
            $product->id_family = $id_family;
        }

        if ($product->quantity == 0) {
            $product->status = Product::ESGOTADO;
        } else if ($product->quantity > 0 && $product->quantity < 30) {
            $product->status = Product::QUASE_ESGOTADO;
        } else {
            $product->status = Product::EM_STOCK;
        }

        if ($active !== null) {
            $product->active = $active;
        }
        if ($name !== null) {
            $product->name = $name;
        }
        if ($number !== null) {
            $product->number = $number;
        } else {
            $product->number = null;
        }

        if ($imagesRemoved !== null) {
            foreach ($imagesRemoved as $img) {
                $image = Image::where('id', $img)->first();
                if ($image != null) {
                    $imagePath = public_path($image->img_url);
                    if (file_exists($imagePath)) {
                        unlink($imagePath);
                    }
                    $image->delete();
                }
            }
        }

        if ($sizesRemoved !== null) {
            foreach ($sizesRemoved as $size) {
                if (isset($size['size']) && isset($size['color'])) {
                    $sizeToDelete = Productvariant::where('id_product', $id)
                        ->where('color', $size['color'])
                        ->where('size', $size['size'])
                        ->first();

                    if ($sizeToDelete) {
                        $sizeToDelete->delete();
                    }
                }
            }
        }

        if ($variantsRemoved !== null) {
            foreach ($variantsRemoved as $variant) {
                if (isset($variant['color'])) {
                    $variantToDelete = Productvariant::where('id_product', $id)
                        ->where('color', $variant['color'])
                        ->get();

                    foreach ($variantToDelete as $variantItem) {
                        $images = Image::where('color', $variantItem->color)->where('id_product', $id)->get();
                        foreach ($images as $img) {
                            $img->delete();
                        }
                        $variantItem->delete();
                    }
                }
            }
        }
        

        if ($variants !== null) {
            foreach ($variants as $variantIndex => $variant) {
                if (!isset($variant['reserved']) || $variant['reserved'] === null) {
                    $variant['reserved'] = 0;
                }
                if (isset($variant['sizes']) && is_array($variant['sizes']) && count($variant['sizes']) > 0) {
                    $variant['quantity'] = 0;
                }

                if (isset($variant['color']) && isset($variant['id'])) {
                
                    $existingVariant = Productvariant::where('id', $variant['id'])->where('id_product', $id)->first();
                    
                    if ($existingVariant) {
                        $existingVariant->color = strtolower($variant['color']);
                        if($product->id_family !== 1){
                            $existingVariant->quantity = $variant['quantity'];
                        }
                        $existingVariant->save();

                        if (isset($variant['sizes'])) {
                            foreach ($variant['sizes'] as $size) {
                                if (isset($size['size'])) {
                                    $existingSize = Productvariant::where('id_product', $id)
                                        ->where('color', $variant['color'])
                                        ->where('size', $size['size'])
                                        ->first();

                                    if ($existingSize) {
                                        $existingSize->size = strtoupper($size['size']);
                                        $existingSize->quantity = $size['quantity'];
                                        $existingSize->save();
                                    } else {
                                        $newSize = new Productvariant();
                                        $newSize->id_product = $id;
                                        $newSize->color = strtolower($variant['color']);
                                        $newSize->size = strtoupper($size['size']);
                                        $newSize->quantity = $size['quantity'];
                                        $newSize->reserved = 0;
                                        $newSize->save();
                                    }
                                }
                            }
                        }
                    }
                } else {

                    if (isset($variant['sizes'])) {
                        foreach ($variant['sizes'] as $size) {
                            $newVariant = new Productvariant();
                            $newVariant->id_product = $id;
                            $newVariant->color = strtolower($variant['color']);
                            $newVariant->size = strtoupper($size['size']);
                            $newVariant->quantity = $size['quantity'];
                            $newVariant->reserved = 0;
                            $newVariant->save();
                        }
                    }else{
                            $newVariant = new Productvariant();
                            $newVariant->id_product = $id;
                            $newVariant->color = strtolower($variant['color']);
                            $newVariant->size = strtoupper($size['size']);
                            $newVariant->quantity = $variant['quantity'];
                            $newVariant->reserved = 0;
                            $newVariant->save();
                    }
                }

                if ($request->hasFile("variants.$variantIndex.images")) {
                    foreach ($request->file("variants.$variantIndex.images") as $imgFile) {
                        $imgName = Str::random(8) . '.png';
                        $imgFile->move(public_path('images'), $imgName);

                        $imageColor = new Image(); 
                        $imageColor->id_product = $product->id;
                        $imageColor->color = $variant['color'];
                        $imageColor->img_url = 'images/' . $imgName;
                        $imageColor->save();
                    }
                }
            }
        }

        $product->save();

        return response()->json(['message' => 'Editado com sucesso!'], 200);
    }
    
    public function deleteProduct(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];

        $reservations = Reservation::where('id_product', $id)->get();
        $logs = Log::where('id_product', $id)->get();
        $reservationsPending = Reservation::where('id_product', $id)->where('status', Reservation::PENDING)->count();
       
        $productVariants = Productvariant::where('id_product', $id)->get();
        $images = Image::where('id_product', $id)->get();

        if($reservationsPending > 0){
            return response()->json(['error' => 'Produto não pode ser eliminado, existem reservas pendentes!'], 200);
        }

        foreach ($images as $img) {
            $filePath = public_path($img->img_url);
            if (file_exists($filePath)) {
                unlink($filePath);
            }

            $img->delete();
        }

        foreach($productVariants as $variant){
            $variant->delete();
        }

        foreach($reservations as $reservation){
            $reservation->delete();
        }

        foreach($logs as $log){
            $log->delete();
        }

        if($id != null){
            $product = Product::find($id);
            $product->delete();
        }

        return response()->json(['message' => 'Produto eliminado com sucesso!'], 200);

    }
}
