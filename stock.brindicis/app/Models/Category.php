<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Model\Product;

class Category extends Model
{

    const ACTIVE = 1;
    const DESACTIVE = 0;
    
    public function products()
    {
        return $this->hasMany(Product::class, 'id_category');
    }  
}
