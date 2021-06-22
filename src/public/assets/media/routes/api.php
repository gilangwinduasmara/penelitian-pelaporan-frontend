<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('chatkonseling', 'ChatKonselingController@index');
Route::post('chatkonseling', 'ChatKonselingController@create')->middleware('sanitizer');;



Route::get('pelaporan-sos', 'PelaporanSosController@index');
Route::get('pelaporan-sos/{id}', 'PelaporanSosController@show');
Route::post('pelaporan-sos', 'PelaporanSosController@store')->middleware('sanitizer');
Route::post('pelaporan-sos/dt', 'PelaporanSosController@dt');
Route::put('pelaporan-sos/{id}', 'PelaporanSosController@update')->middleware('sanitizer');
