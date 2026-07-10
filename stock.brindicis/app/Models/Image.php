<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Model\Product;
use App\Model\Productvariant;

class Image extends Model
{
    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }

    public function variant()
    {
        return $this->belongsTo(Productvariant::class, 'id_varient');
    }
}
