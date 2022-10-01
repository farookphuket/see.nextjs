<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AuthController as uAuth;
use App\Http\Controllers\RegisterController as uRegister;
use App\Http\Controllers\ProfileController as uProfile;

use App\Http\Controllers\WhatupController as Whatup;
use App\Http\Controllers\VisitorController as Visitor;
use App\Http\Controllers\UserController as User;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// visitor route
Route::get('/visitor',[Visitor::class,'index']);

// whatup route
Route::get('/whatup',[Whatup::class,'index']);
Route::get('/whatup/{whatup}',[Whatup::class,'show']);

Route::post('/register',[uRegister::class,'store'])->name('register');
Route::post('/login',[uAuth::class,'store'])->name('login');


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});




/* #Member make a route prefix for member group */
Route::prefix("member")->name("member.")->middleware('auth:sanctum')
                                        ->group(function(){
    Route::post('/logout',[uAuth::class,'destroy'])->name('logout');

    // update profile
    Route::resource("/profile",uProfile::class);

    // whatup
    Route::resource("/whatup",Whatup::class);

});



/* #admin  make a route prefix for admin  group */
Route::prefix("admin")->name("admin.")->middleware('auth:sanctum')
                                        ->group(function(){
    Route::post('/logout',[uAuth::class,'destroy'])->name('logout');

    // update profile
    Route::resource("/profile",uProfile::class);

    // whatup
    Route::resource("/whatup",Whatup::class);

    // user 
    Route::resource('/user',User::class);


    // visitor 
    Route::get('/get-visitors',[Visitor::class,'getVisitors'])->name('getVisitors');
    Route::resource('/visitor',Visitor::class);

});
