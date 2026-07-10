<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Log extends Model
{

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }
}
