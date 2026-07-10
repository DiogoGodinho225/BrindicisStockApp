<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Image;

class Productvariant extends Model
{
    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }

    public function image()
    {
        return $this->hasOne(Image::class, 'id_varient');
    }
}
