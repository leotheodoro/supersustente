<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(["prefix" => "api/v1"], function() {
    Route::get("/", function() {
        return response()->json(['message' => 'Super Sustente API', 'status' => 'Connected']);
    });

    Route::resource('registers', 'Api\\RegistersController');
    Route::get('registers/image/{id}', 'Api\\RegistersController@destroyImage');
    Route::get('registers/video/{id}', 'Api\\RegistersController@destroyVideo');
    Route::get('registers/users/{id}', 'Api\\RegistersController@findByUser');


    Route::resource('situations', 'Api\\SituationsController');
    Route::resource('comments', 'Api\\CommentsController');
    
    Route::resource('users', 'Api\\UsersController');
    Route::post('users/login', 'Api\\UsersController@login');
    Route::post('users/logout', 'Api\\UsersController@logout');
    Route::post('users/check', 'Api\\UsersController@check');
    Route::post('users/image/{id}', 'Api\\UsersController@updateImage');
});