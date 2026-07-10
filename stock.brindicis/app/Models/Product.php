<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Image;
use App\Models\Category;
use App\Models\Reservation;
use App\Models\Log;
use App\Models\Family;
use App\Models\ProductVariant;

class Product extends Model
{
    const Active = 1;
    const Inactive = 0;

    const EM_STOCK = 2;
    const QUASE_ESGOTADO = 1;
    const ESGOTADO = 0;

    public function images()
    {
        return $this->hasMany(images::class, 'id_product');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_product');
    }

    public function logs()
    {
        return $this->hasMany(Log::class, 'id_product');
    }

    public function family()
    {
        return $this->belongsTo(Family::class, 'id_family');
    }

    public function productvariants()
    {
        return $this->hasMany(ProductVariant::class, 'id_product');
    }
}
