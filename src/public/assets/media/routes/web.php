<?php

use App\Http\Controllers\PagesController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

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

// Route::get('/staff-test', '');
Route::get('/clean', 'UserController@clean');
Route::get('/tes', 'UserController@getToken');
Route::get('/', 'PagesController@landing');
// Route::get('/panduan', 'PagesController@panduan');
Route::get('/pengumuman', 'PagesController@pengumuman');
Route::get('/pengumuman/{id}', 'PagesController@pengumumanDetail');
Route::get('/admin', 'AdminController@index');
Route::get('/admin/login', 'AdminController@login');


Route::get('/pelaporan', 'PelaporanPagesController@index');
Route::get('/pelaporan/formulir', 'PelaporanPagesController@formulir');
Route::get('/pelaporan/sos', 'PelaporanPagesController@sos');

Route::get('/services/pelaporan-sos', 'PelaporanSosController@index');
Route::get('/services/pelaporan-sos/{id}', 'PelaporanSosController@show');
Route::post('/services/pelaporan-sos', 'PelaporanSosController@store')->middleware('sanitizer');
Route::post('/services/pelaporan-sos/dt', 'PelaporanSosController@dt');
Route::put('/services/pelaporan-sos/{id}', 'PelaporanSosController@update')->middleware('sanitizer');


Route::middleware(['session'])->group(function(){
    Route::get('/dashboard', 'PagesController@index')->middleware('konseli');;

    Route::get('/profile', 'PagesController@profile');
    Route::get('/gantipassword', 'PagesController@gantiPassword');

    Route::get('/files', 'PagesController@files');
    Route::get('/pelaporan', 'PagesController@pelaporan');

// Konselor routes
    Route::get('/daftarkonseli', 'PagesController@daftarkonseli');
    Route::get('/konseling-offline', 'PagesController@konselingOffline');

    Route::get('/arsip', 'PagesController@arsip')->middleware('konseli');
    Route::get('/caseconference', 'PagesController@caseconference');

// Konseli routes
    Route::get('/daftarsesi', 'PagesController@daftarSesi')->middleware('konseli');
    Route::get('/ruangkonseling', 'PagesController@ruangkonseling')->middleware('konseli');
    Route::get('/gantijadwal', 'PagesController@gantiJadwal')->middleware('konseli');;
    Route::get('/pin', 'PagesController@pin')->middleware('konseli');;
    Route::get('/gantipin', 'PagesController@changePin')->middleware('konseli');;

// Setups routes
    Route::get('/setup/caseconference', 'PagesController@conferenceSetup');
    Route::get('/setup/referral', 'PagesController@referralSetup');
    Route::get('/admin/dashboard', 'AdminController@dashboard');
    Route::get('/admin/konselor', 'AdminController@konselor');
    Route::get('/admin/report', 'AdminController@report');
    Route::get('/admin/setting', 'AdminController@setting');
    Route::get('/admin/informasi', 'AdminController@informasi');
    Route::get('/admin/konseling-offline', 'PagesController@konselingOffline');
    Route::get('/admin/konselor/tambah', 'AdminController@tambahKonselor');
    Route::get('/admin/konselor/edit/{id}', 'AdminController@editKonselor');
    Route::post('/admin/post', 'AdminController@doLogin');

    Route::get('/admin/pelaporan', 'AdminPelaporanPagesController@index');
    Route::get('/admin/pelaporan/wilayah', 'AdminPelaporanPagesController@wilayah');
    Route::get('/admin/pelaporan/detail-pelaporan', 'AdminPelaporanPagesController@detailPelaporan');
});

// Admin routes


// Demo routes
Route::get('/datatables', 'PagesController@datatables');
Route::get('/ktdatatables', 'PagesController@ktDatatables');
Route::get('/select2', 'PagesController@select2');
Route::get('/jquerymask', 'PagesController@jQueryMask');
Route::get('/icons/custom-icons', 'PagesController@customIcons');
Route::get('/icons/flaticon', 'PagesController@flaticon');
Route::get('/icons/fontawesome', 'PagesController@fontawesome');
Route::get('/icons/lineawesome', 'PagesController@lineawesome');
Route::get('/icons/socicons', 'PagesController@socicons');
Route::get('/icons/svg', 'PagesController@svg');

// Quick search dummy route to display html elements in search dropdown (header search)
Route::get('/quick-search', 'PagesController@quickSearch')->name('quick-search');

Route::post('/services/konselor/tambahKonselor', 'UserController@tambahKonselor');
Route::post('/services/konselor/editKonselor', 'UserController@editKonselor');

Route::post('services/auth/login', 'UserController@login');
Route::post('services/auth/pin', 'UserController@pin')->middleware('customthrottle:2,2');
Route::post('services/auth/gantipin', 'UserController@gantiPin');
Route::post('services/auth/reset-pin', 'UserController@resetPin');
Route::post('services/auth/login/admin', 'UserController@adminLogin');
Route::post('services/auth/register', 'UserController@register');
Route::post('services/auth/siasat', 'UserController@siasatLogin');
Route::post('services/auth/staff', 'UserController@staffLogin');
Route::post('services/auth/changepassword', 'UserController@changePassword');


Route::get('services/jadwalkonselor', 'JadwalKonselorController@index');

Route::post('services/file', 'FileController@create');
Route::delete('services/file/{id}', 'FileController@destroy');
Route::put('services/file/{id}', 'FileController@update');
Route::post('services/file/upload', 'FileController@upload');

Route::post('services/konseling/call', 'KonselingController@createCall');
Route::post('services/conference/call', 'CaseConferenceController@createCall');

Route::get('services/konseling/statistic', 'KonselingController@statistic');
Route::get('services/expired', 'KonselingController@checkExpired');
Route::get('services/konseling', 'KonselingController@index');
Route::get('services/konseling/count','KonselingController@count');
Route::post('services/konseling/end', 'KonselingController@end');
Route::get('services/konseling/{id}', 'KonselingController@show');
Route::post('services/konseling', 'KonselingController@create');

Route::get('/services/konseli/{id}', 'KonseliController@show');

Route::get('services/conference', 'CaseConferenceController@index');
Route::get('services/conference/{id}', 'CaseConferenceController@show');
Route::post('services/conference/createagreement', 'CaseConferenceController@createAgreement');
Route::post('services/conference', 'CaseConferenceController@store');
Route::post('services/conference/declineagreement', 'CaseConferenceController@declideAgreement');

Route::post('services/rangkumankonseling', 'RangkumanKonselingController@store');

Route::get('services/chatconference', 'ChatConferenceController@index');
Route::get('services/chatconference/chat', 'ChatConferenceController@chat');
Route::get('services/chatconference/{id}', 'ChatConferenceController@show');
Route::post('services/chatconference', 'ChatConferenceController@store')->middleware('sanitizer');
Route::put('services/chatconference', 'ChatConferenceController@update');

Route::get('services/detailconference/tes', 'DetailConferenceController@tes');
Route::get('services/detailconference', 'DetailConferenceController@index');
Route::get('services/detailconference/{id}', 'DetailConferenceController@show');
Route::post('services/detailconference', 'DetailConferenceController@store');

Route::get('services/referral', 'ReferalController@index');
Route::get('services/referral/{id}', 'ReferalController@show');
Route::post('services/referral', 'ReferalController@store');
Route::post('services/referral/createagreement', 'ReferalController@createAgreement');
Route::post('services/referral/declineagreement', 'ReferalController@declideAgreement');
Route::post('services/referral/begin', 'ReferalController@beginReferral');

Route::get('services/rekamkonseling', 'RekamKonselingController@show');
Route::post('services/rekamkonseling', 'RekamKonselingController@update');

Route::post('services/user/edit', 'UserController@editProfile');
Route::post('services/user/changephoto', 'UserController@changePhoto');

Route::get('/logout', 'UserController@logout');


Route::get('services/notification', 'NotificationController@index');
Route::get('services/notification/{id}', 'NotificationController@show');
Route::get('services/notification/count/{id}', 'NotificationController@count');
Route::post('services/notification', 'NotificationController@store');
Route::put('services/notification/{id}', 'NotificationController@update');
Route::post('services/notification/read/{id}', 'NotificationController@read');
Route::get('/notification/readall', 'NotificationController@readAll');
Route::get('/notification/{id}', 'NotificationController@read');


Route::post('/services/setting', 'SettingController@store');

Route::put('/services/pengumuman', 'PengumumanController@update');
Route::post('/services/pengumuman', 'PengumumanController@store');
Route::delete('/services/pengumuman/{id}', 'PengumumanController@destroy');

Route::put('/services/quote', 'QuoteController@update');
Route::post('/services/quote', 'QuoteController@store');
Route::delete('/services/quote/{id}', 'QuoteController@destroy');

Route::get('/services/tes', 'PagesController@tes');

Route::get('/services/konselingoffline', 'KonselingOfflineController@index');
Route::post('/services/konselingoffline/dt', 'KonselingOfflineController@dt');
Route::post('/services/konselingoffline', 'KonselingOfflineController@store')->middleware('sanitizer');
Route::put('/services/konselingoffline/{id}', 'KonselingOfflineController@update')->middleware('sanitizer');

Route::get('/services/pelaporan', 'PelaporanController@index');
Route::get('/services/pelaporan/{id}', 'PelaporanController@show');
Route::post('/services/pelaporan', 'PelaporanController@store')->middleware('sanitizer');
Route::post('/services/pelaporan/dt', 'PelaporanController@dt');
Route::put('/services/pelaporan/{id}', 'PelaporanController@update')->middleware('sanitizer');


Route::get('/services/provinsi', 'ProvinsiController@index');
Route::post('/services/provinsi', 'ProvinsiController@store')->middleware('sanitizer');
Route::post('/services/provinsi/dt', 'ProvinsiController@dt');
Route::put('/services/provinsi/{id}', 'ProvinsiController@update')->middleware('sanitizer');

Route::get('/services/kab_kota', 'KabKotaController@index');
Route::post('/services/kab_kota', 'KabKotaController@store')->middleware('sanitizer');
Route::post('/services/kab_kota/dt', 'KabKotaController@dt');
Route::put('/services/kab_kota/{id}', 'KabKotaController@update')->middleware('sanitizer');

Route::get('/services/kecamatan', 'KecamatanController@index');
Route::post('/services/kecamatan', 'KecamatanController@store')->middleware('sanitizer');
Route::post('/services/kecamatan/dt', 'KecamatanController@dt');
Route::put('/services/kecamatan/{id}', 'KecamatanController@update')->middleware('sanitizer');

Route::get('/services/kelurahan', 'KelurahanController@index');
Route::post('/services/kelurahan', 'KelurahanController@store')->middleware('sanitizer');
Route::post('/services/kelurahan/dt', 'KelurahanController@dt');
Route::put('/services/kelurahan/{id}', 'KelurahanController@update')->middleware('sanitizer');

