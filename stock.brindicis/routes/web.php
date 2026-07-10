<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\ProductVariantController;

Route::prefix('api')->group(function () {
    /* product routes */
    Route::get('/getStock', [ProductController::class, 'getProductsStock']);
    Route::post('/create-product', [ProductController::class, 'addProduct']);
    Route::post('/edit-product', [ProductController::class, 'editProduct']);
    Route::delete('/delete-product', [ProductController::class, 'deleteProduct']);
    Route::get('/getProducts', [ProductController::class, 'getProducts']);
    Route::get('/getProduct', [ProductController::class, 'getProduct']);
    
    /* reservation routes */
    Route::get('/getRecentReservations', [ReservationController::class, 'getRecentReservations']);
    Route::get('/getProductReservations', [ReservationController::class, 'getProductReservations']);
    Route::post('/make-reservation', [ReservationController::class, 'makeReservation']);
    Route::put('/approve-reservation', [ReservationController::class, 'approveReservation']);
    /*Route::put('/notApprove-reservation', [ReservationController::class, 'notApproveReservation']);*/
    Route::get('getReservations', [ReservationController::class, 'getReservations']);
    Route::put('edit-reservation', [ReservationController::class, 'editReservation']);
    Route::delete('delete-reservation', [ReservationController::class, 'deleteReservation']);
    Route::put('mark-as-viewed', [ReservationController::class, 'MarkReservationAsViewed']);
    Route::get('get-unviewed-reservations', [ReservationController::class, 'getUnviewedReservations']);


    /* categories routes */
    Route::post('/create-category', [CategoryController::class, 'addCategory']);
    Route::put('/edit-category', [CategoryController::class, 'editCategory']);
    Route::delete('/delete-category', [CategoryController::class, 'deleteCategory']);
    Route::get('/getCategories', [CategoryController::class, 'getCategories']);  
    
    /* logs */
    Route::get('/getLogs', [LogController::class, 'getProductLogs']);
    
    /* families */
    Route::get('/getFamilies', [FamilyController::class, 'getFamilies']);

    /* product variants */
    Route::get('/getProductVariants', [ProductVariantController::class, 'getProductVariants']);
    Route::get('/getVariants', [ProductVariantController::class, 'getVariants']);
    Route::get('/getQuantities', [ProductVariantController::class, 'getVariantQuantities']);

});

Route::get('/{any}', function () {
    return view('layout.app');  
})->where('any', '.*');

//login routes
Route::post('login-frontOffice', [AuthController::class, 'loginFrontOffice']);
Route::post('login-backOffice', [AuthController::class, 'loginBackOffice']);

