<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use App\Models\Log;
use Carbon\Carbon;
use App\Models\Productvariant;

class ReservationController extends Controller
{
    public function getReservations(Request $request){
        
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $reservations = Reservation::orderBy('created_at', 'desc')
        ->get();

        $reservations = $reservations->map(function($reservation){
            $productVariant = Productvariant::where('id', $reservation->id_variant)->first();
            $product = $productVariant->product;
            $image = Image::where('id_product', $product->id)->where('color', $productVariant->color)->first();

            if($image){
                $reservation->image = $image->img_url;
            }

            $reservation->variant = $productVariant;
            $reservation->ref = $product->ref;
            return $reservation;
        });


        return response()->json(['reservations' => $reservations], 200);
    }

    public function getProductReservations(Request $request){
        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];
        
        if($id){
            $reservations = Reservation::where('id_product', $id)->orderBy('created_at', 'desc')
            ->get();

            $reservations = $reservations->map(function($reservation){
                $productVariant = Productvariant::where('id', $reservation->id_variant)->first();
                $product = $productVariant->product;
                $image = Image::where('id', $productVariant->id_image)->first();
                
                if($image){
                    $reservation->image = $image->img_url;
                }
                
                $reservation->variant = $productVariant;
                $reservation->ref = $product->ref;
                return $reservation;
            });
        }else{
            return response()->json(['message' => 'reservas não encontradas'], 401);
        }

        return response()->json(['reservations' => $reservations], 200);
    }

    public function getRecentReservations(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $reservations = Reservation::where('status', Reservation::PENDING)
        ->orderBy('created_at', 'desc')
        ->limit(15)
        ->get();

        $reservations = $reservations->map(function($reservation){
            
            $productVariant = Productvariant::where('id', $reservation->id_variant)->first();
            $product = $productVariant->product;
        
            $image = Image::where('id_product', $product->id)->where('color', $productVariant->color)->first();
            
            
            if($image){
                $reservation->image = $image->img_url;
            }
           
            $reservation->variant = $productVariant;
            $reservation->ref = $product->ref;
            return $reservation;
        });


        return response()->json(['reservations' => $reservations], 200);
    }

    public function makeReservation(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, false, true);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $name = $request['name'];
        $id_product = $request['id_product'];
        $quantity = $request['quantity'];
        $message = $request['message'];
        $color = $request['color'];
        $size = $request['size'];
        $proposal = $request['proposal'];
        $order = $request['order'];

        if($quantity == 0){
            return response()->json(['error' => 'Adicione uma quantidade à reserva'], 200);
        }
        
        if($quantity && $quantity > 0){
            $product = Product::find($id_product);

            if($product->id_family === 1 && !$size){
                return response()->json(['error' => 'Selecione um tamanho'], 200);
            }

            if($color == 0){
                return response()->json(['error' => 'Selecione uma cor'], 200);
            }
            
            if($product){
                if($color && $size){
                    $productVariant = Productvariant::where('color', $color)->where('size', $size)->where('id_product', $product->id)->first();
                }else if($color && !$size){
                    $productVariant = Productvariant::where('color', $color)->where('id_product', $product->id)->first();
                }else{
                    return response()->json(['error' => 'Nenhuma Variante Encontrada'], 200);
                }
            }else{
                return response()->json(['error' => 'Nenhum produto encontrado'], 200);
            }

            if($productVariant && $quantity <= $productVariant->quantity && $productVariant->quantity > 0){
                $product->quantity -= $quantity;
                $product->reserved += $quantity;
                $productVariant->quantity -= $quantity;
                $productVariant->reserved += $quantity;

                if ($product->quantity == 0) {
                    $product->status = Product::ESGOTADO;
                } else if ($product->quantity > 0 && $product->quantity < 30) {
                    $product->status = Product::QUASE_ESGOTADO;
                } else {
                    $product->status = Product::EM_STOCK;
                }

                $product->save();
                $productVariant->save();

                if($product->save() && $productVariant->save()){
                    $reservation = new Reservation();
                    $reservation->name = $name;
                    $reservation->id_product = $id_product;
                    $reservation->id_variant = $productVariant->id;
                    $reservation->quantity = $quantity;
                    $reservation->order = $order;
                    $message != null ? $reservation->message = $message : $reservation->message = '';
                    $proposal != null ? $reservation->proposal = $proposal : $reservation->proposal = 0;
                    $reservation->status = Reservation::PENDING;
                    $reservation->save();

                    $log = new Log();
                    $log->id_product = $id_product;
                    if($size){
                        $log->message = "Reserva " . "tamanho: " . $size .", " . "cor: ". $color . " realizada";
                    }else{
                        $log->message = "Reserva " . "cor: ". $color . ", realizada";
                    }
                    $log->removeQuantity = $reservation->quantity;
                    $log->addReserved = $reservation->quantity;
                    $log->oldQuantity = $productVariant->quantity + $quantity;
                    $log->newQuantity = $productVariant->quantity;
                    $log->oldReserved = $productVariant->reserved - $quantity;
                    $log->newReserved = $productVariant->reserved;
                    $log->save();
                }
            }else{
                return response()->json(['error' => 'Quantidade de produto insuficiente'], 200);
            }
            
        }

        

        return response()->json(['message' => 'Reservado'], 200);
    }

    public function approveReservation(Request $request){
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];

        if($id){
            $reservation = Reservation::find($id);
            
            if($reservation){
                $reservation->status = Reservation::APPROVED;
                $reservation->save();
                
                $productVariant = Productvariant::find($reservation->id_variant);
                $product = $productVariant->product;
                $old_reserved_quantity = $productVariant->reserved;
                $product->reserved -= $reservation->quantity;
                $productVariant->reserved -= $reservation->quantity;
                $product->save();
                $productVariant->save();

                $log = new Log();
                $log->id_product = $reservation->id_product;
                if($productVariant->size){
                    $log->message = "Reserva " . "tamanho: " . $productVariant->size .", " . "cor: ". $productVariant->color . ", aprovada";
                }else{
                    $log->message = "Reserva " . "cor: ". $productVariant->color . " aprovada";
                }
                $log->removeReserved = $reservation->quantity;
                $log->oldReserved = $old_reserved_quantity;
                $log->newReserved = $productVariant->reserved;
                $log->save();
            }
        }else{
            return response()->json(['message' => 'Reserva não encontrada'], 401);
        }
        return response()->json(['message' => 'Reserva aprovada'], 200);
    }

    /*public function notApproveReservation(Request $request){
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];

        if($id){
            $reservation = Reservation::find($id);
           
            if($reservation){
                $reservation->status = Reservation::NOT_APPROVED;
                $reservation->save();
                
                $product = Product::find($reservation->id_product);
                $old_product_quantity = $product->quantity;
                $old_reserved_quantity = $product->reserved;
                $product->reserved -= $reservation->quantity;
                $product->quantity += $reservation->quantity;
                $product->save();

                $log = new Log();
                $log->id_product = $reservation->id_product;
                $log->message = "Reserva recusada";
                $log->addQuantity = $reservation->quantity;
                $log->removeReserved = $reservation->quantity;
                $log->oldQuantity = $old_product_quantity;
                $log->oldReserved = $old_reserved_quantity;
                $log->newQuantity = $product->quantity;
                $log->newReserved = $product->reserved;
                $log->save();
            }else{
                return response()->json(['message' => 'Reserva não encontrada'], 401);
            }
        }
        return response()->json(['message' => 'Reserva Reprovada'], 200);
    }*/

    public function deleteReservation(Request $request){
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $id = $request['id'];

        if($id){
            $reservation = Reservation::find($id);

            if($reservation->status == Reservation::PENDING){
                $productVariant = $reservation->productvariant;
                $product = $productVariant->product;
                $old_product_quantity = $productVariant->quantity;
                $old_reserved_quantity = $productVariant->reserved;
                $product->quantity += $reservation->quantity;
                $product->reserved -= $reservation->quantity;
                $productVariant->quantity += $reservation->quantity;
                $productVariant->reserved -= $reservation->quantity;
                $product->save();
                $productVariant->save();

                $log = new Log();
                $log->id_product = $reservation->id_product;
                if($productVariant->size){
                    $log->message = "Reserva " . "tamanho: " . $productVariant->size .", " . "cor: ". $productVariant->color . ", excluída";
                }else{
                    $log->message = "Reserva " . "cor: ". $productVariant->color . " expirada";
                }
                $log->addQuantity = $reservation->quantity;
                $log->removeReserved = $reservation->quantity;
                $log->oldQuantity = $old_product_quantity;
                $log->oldReserved = $old_reserved_quantity;
                $log->newQuantity = $productVariant->quantity;
                $log->newReserved = $productVariant->reserved;
                $log->save();
            }

            $reservation->delete();
        }
        return response()->json(['message' => 'Reserva deletada'], 200);
    }

    public function editReservation(Request $request){

        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $name = $request['name'];
        $id = $request['id'];
        $quantity = $request['quantity'];
        $message = $request['message'];
        $status = $request['status'];
        $proposal = $request['proposal'];
        $order = $request['order'];

        if($id){
            $reservation = Reservation::find($id);
            $old_reservation_status = $reservation->status;
        }
        
        if($reservation){
            $productVariant = Productvariant::find($reservation->id_variant);
            $old_reserved_quantity = $productVariant->reserved;
            $old_product_quantity = $productVariant->quantity;
            $product = $productVariant->product;

            if ($product && $productVariant) {
                if ($quantity !== null && $quantity > 0) {
                    if ($quantity > $product->reserved && $quantity > $productVariant->reserved) {
                        $productDifference = $quantity - $product->reserved;
                        $productVariantDifference = $quantity - $productVariant->reserved;
                        $product->quantity -= $productDifference;
                        $product->reserved += $productDifference;
                        $productVariant->quantity -= $productVariantDifference;
                        $productVariant->reserved += $productVariantDifference;

                        $log = new Log();
                        $log->id_product = $product->id;
                        $log->message = "Quantidade de reserva aumentada";
                        $log->removeQuantity = $productVariantDifference;
                        $log->addReserved = $productVariantDifference;
                        $log->oldQuantity = $old_product_quantity;
                        $log->oldReserved = $old_reserved_quantity;
                        $log->newQuantity = $productVariant->quantity;
                        $log->newReserved = $productVariant->reserved;
                        $log->save();

                    } elseif ($quantity < $product->reserved && $quantity < $productVariant->reserved) {
                        $productDifference = $product->reserved - $quantity;
                        $productVariantDifference = $productVariant->reserved - $quantity;
                        $product->quantity += $productDifference;
                        $product->reserved -= $productDifference;
                        $productVariant->quantity += $productVariantDifference;
                        $productVariant->reserved -= $productVariantDifference;

                        $log = new Log();
                        $log->id_product = $product->id;
                        $log->message = "Quantidade de reserva reduzida";
                        $log->addQuantity = $productVariantDifference;
                        $log->removeReserved = $productVariantDifference;
                        $log->oldQuantity = $old_product_quantity;
                        $log->oldReserved = $old_reserved_quantity;
                        $log->newQuantity = $productVariant->quantity;
                        $log->newReserved = $productVariant->reserved;
                        $log->save();
                    }
                }
            }
           
            if ($product->quantity > 0 && $productVariant->quantity > 0) {
                $product->save();
                $productVariant->save();
                if($product->save() && $productVariant->save()){
                    if($name != null){
                        $reservation->name = $name;
                    }
                    if($quantity != null){
                        $reservation->quantity = $quantity;
                    }
                    if($message != null){
                        $reservation->message = $message;
                    }else{
                        $reservation->message = '';
                    }

                    if($proposal !== null && $proposal !== ""){
                        $reservation->proposal = $proposal;
                    } else {
                        $reservation->proposal = 0;
                    }

                    if($order != null){
                        $reservation->order = $order;
                    }
            
                    if($status === Reservation::PENDING){
                        $reservation->status = $status;
                        
                        if($old_reservation_status == Reservation::APPROVED && $reservation->status == Reservation::PENDING){
                            $product->reserved += $reservation->quantity;
                            $productVariant->reserved += $reservation->quantity;

                            $log = new Log();
                            $log->id_product = $reservation->id_product;
                            $log->message = "Reserva alterada para pendente";
                            $log->addReserved = $reservation->quantity;
                            $log->oldQuantity = $old_product_quantity;
                            $log->oldReserved = $old_reserved_quantity;
                            $log->newQuantity = $productVariant->quantity;
                            $log->newReserved = $productVariant->reserved;
                            $log->save();
                        }

                        /*
                        if($old_reservation_status == Reservation::NOT_APPROVED && $reservation->status == Reservation::PENDING){
                            if($product->quantity >= $reservation->quantity){
                                $product->quantity -= $reservation->quantity;
                                $product->reserved += $reservation->quantity;

                                $log = new Log();
                                $log->id_product = $reservation->id_product;
                                $log->message = "Reserva alterada para pendente";
                                $log->addReserved = $reservation->quantity;
                                $log->removeQuantity = $reservation->quantity;
                                $log->oldQuantity = $old_product_quantity;
                                $log->oldReserved = $old_reserved_quantity;
                                $log->newQuantity = $product->quantity;
                                $log->newReserved = $product->reserved;
                                $log->save();
                            }else{
                                return response()->json(['error' => 'Quantidade de produto insuficiente'], 200);
                            }
                        }
                            */

                        if($old_reservation_status == Reservation::TIME_EXCEEDED && $reservation->status == Reservation::PENDING){
                            if($product->quantity >= $reservation->quantity && $productVariant->quantity >= $reservation->quantity){
                                $product->quantity -= $reservation->quantity;
                                $product->reserved += $reservation->quantity;
                                $productVariant->quantity -= $reservation->quantity;
                                $productVariant->reserved += $reservation->quantity;
                                $reservation->created_at = Carbon::now();
                                $reservation->updated_at = Carbon::now();

                                $log = new Log();
                                $log->id_product = $reservation->id_product;
                                $log->message = "Reserva alterada para pendente";
                                $log->addReserved = $reservation->quantity;
                                $log->removeQuantity = $reservation->quantity;
                                $log->oldQuantity = $old_product_quantity;
                                $log->oldReserved = $old_reserved_quantity;
                                $log->newQuantity = $productVariant->quantity;
                                $log->newReserved = $productVariant->reserved;
                                $log->save();
                            }else{
                                return response()->json(['error' => 'Quantidade de produto insuficiente'], 200);
                            }
                            
                            
                        }
                    }
                    $product->save();
                    $reservation->save();
                    $productVariant->save();
                   
                }
            }else{
                return response()->json(['error' => 'Quantidade de produto insuficiente'], 200);
            }
            
        }

        return response()->json(['message' => 'Reserva editada'], 200);
    }
    
    public function getUnviewedReservations(Request $request){
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $unviewed_reservations = Reservation::where('status', Reservation::PENDING)
                                    ->where('viewed', 0)
                                    ->count();

        return response()->json(['unviewed_reservations' => $unviewed_reservations], 200);
    }

    public function MarkReservationAsViewed(Request $request){
        $token = $request['token'];

        $permission = User::verifyToken($token, true, false);

        if($permission != true){
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $unviewed_reservations = Reservation::where('status', Reservation::PENDING)
                                    ->where('viewed', 0)
                                    ->get();

        foreach($unviewed_reservations as $reservation){
            $reservation->viewed = 1;
            $reservation->save();
        }
        return response()->json(['message' => 'Reservas marcadas como lidas'], 200);
    }
}
