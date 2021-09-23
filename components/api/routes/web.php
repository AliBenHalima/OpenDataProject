<?php

use App\Mail\MyTestMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Broadcasting\BroadcastController;
use App\Http\Controllers\UserController\LoginController;

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

Route::get('sendmail', function () {

    $details = [
        'title' => 'Mail from ItSolutionStuff.com',
        'body' => 'This is for testing email using smtp'
    ];

    $var = Mail::to('alibenhalima60@gmail.com')->send(new \App\Mail\MyTestMail($details));

    if ($var != null) {
        return ["message" => "email sent"];
    } else {
        return "error";
    }
});
// Illuminate\Broadcasting\BroadcastController@authenticate
// Route::post('broadcasting/auth', [BroadcastController::class,'authenticate']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
