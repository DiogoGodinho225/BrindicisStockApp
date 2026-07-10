<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Reservation extends Model
{
    const PENDING = 0;
    const APPROVED = 1;
    const NOT_APPROVED = 2;
    const TIME_EXCEEDED = 3;


    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }

    public function productvariant()
    {
        return $this->belongsTo(Productvariant::class, 'id_variant');
    }
}
