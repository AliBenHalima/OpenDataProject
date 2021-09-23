<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\chatcontroller;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\Comment\LikesController;
use App\Http\Controllers\Comment\CommentController;
use App\Http\Controllers\Formulaire\InputsController;
use App\Http\Controllers\FormController\FormController;
use App\Http\Controllers\Formulaire\TentativeController;
use App\Http\Controllers\UserController\LoginController;
use App\Http\Controllers\UserController\RolesController;
use App\Http\Controllers\Formulaire\FormulaireController;
use App\Http\Controllers\PostsController\PostsController;
use App\Http\Controllers\SujetController\SujetController;
use App\Http\Controllers\Formulaire\FormRequestController;
use App\Http\Controllers\UserController\PrivilegesController;
use App\Http\Controllers\UserController\RoleSpatieController;
use App\Http\Controllers\UserController\PermissionsController;
use App\Http\Controllers\DocumentsController\DocumentsController;
use App\Http\Controllers\EvenementController\EvenementController;
use App\Http\Controllers\EventTypeController\EventTypeController;
use App\Http\Controllers\GouverneratController\GouverneratController;
use App\Http\Controllers\EtablissementController\EtablissementController;
use App\Http\Controllers\SujetDocumentsController\SujetDocumentsController;

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

Route::post('/test', [LoginController::class, 'test']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
   return $request->user();
});

Route::prefix('auth')->group(function () {
   Route::post('/login', [LoginController::class, 'login']);
   Route::post('/Signup', [LoginController::class, 'Signup']);
   Route::post('/UserSignUp', [LoginController::class, 'UserSignUp']);
   Route::post('/forgot-password', [LoginController::class, 'forgotPassword'])->middleware('guest')->name('password.email');
   Route::post('/send-mail', [LoginController::class, 'sendmail']);
   Route::post('/forgot', [LoginController::class, 'forgot']);
   Route::post('/reset', [LoginController::class, 'resetpassword']);
   Route::post('/ContactMail', [LoginController::class, 'ContactMail']);
   Route::post('/Addimage/{id}', [LoginController::class, 'Addimage']);
   Route::post('/UpdateUser/{id}', [LoginController::class, 'UpdateUser']);
   Route::post('/UpdateOwnProfile/{id}', [LoginController::class, 'UpdateOwnProfile'])->middleware('auth:api');
   Route::get('/test', [LoginController::class, 'test'])->middleware('permission:delete etablissements,api');
});

Route::resource('postman/free/etabliss', EtablissementController::class);
Route::middleware('auth:api')->prefix('etab')->group(function () {
   Route::resource('/etabliss', EtablissementController::class)->middleware(['permission:view etablissements,api']);
   Route::get('/showEtablissement/{id}', [EtablissementController::class, 'showEtablissement']);
   Route::post('/EditEtab/{id}', [EtablissementController::class, 'EditEtab']);

});

Route::prefix('gouv')->group(function () {
   Route::resource('gouvernerat', GouverneratController::class);
});


Route::middleware('auth:api')->prefix('users')->group(function () {
   Route::resource('user', UserController::class);
   Route::get('/UsersByETabID/{id}', [UserController::class, 'UsersByETabID'])->middleware(['permission:view users,api']);
   Route::get('/freeUsersByETabID/{id}', [UserController::class, 'UsersByETabID']);
   Route::get('/usersEtab/{id}', [UserController::class, 'filterUserByEtab']);
   Route::get('/userbyetab/{id}', [UserController::class, 'GetUserOfEtab']);
   Route::get('/role/{id}', [UserController::class, 'GetUserRole']);
   Route::get('/user_withEtab/{id}', [UserController::class, 'GetUser_withEtab']);
   Route::get('/Get_Self_ProfileInfo', [UserController::class, 'Get_Self_ProfileInfo']);
   Route::post('/UpdateUser/{id}', [UserController::class, 'UpdateUser']);
   Route::post('/UpdateOwnProfile/{id}', [UserController::class, 'UpdateOwnProfile']);
});

Route::prefix('priv')->group(function () {
   Route::resource('privilege', PrivilegesController::class);
});
Route::resource('/postman/roleSpatie', RoleSpatieController::class);
Route::middleware('auth:api')->prefix('role')->group(function () {
   Route::resource('/roleSpatie', RoleSpatieController::class);
   Route::resource('/user/roleSpatie', RoleSpatieController::class);
   Route::resource('/roleSpatie', RoleSpatieController::class, [
      'only' => [
         'index',
         'show'
      ]
   ])->middleware('permission:view roles,api');
   Route::post('/RoleAndPermissions', [RoleSpatieController::class, 'GetRole_Permissions']);
});

Route::prefix('permissions')->group(function () {
   Route::resource('perm', PermissionsController::class);
});


Route::middleware('auth:api')->group(function () {
   Route::resource('sujetdocuments', SujetDocumentsController::class);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('documents', DocumentsController::class);
   Route::get('/allDocuments', [DocumentsController::class, 'AllDocuments']);
   Route::post('/updateDocument/{id}', [DocumentsController::class, 'updateDocument']);
   Route::get('/GetFullDocumentsByETab/{id}', [DocumentsController::class, 'GetFullDocumentsByETab']);
   Route::get('/GetFullDocumentsByETab', [DocumentsController::class, 'GetFullDocuments']);
   Route::get('/allDocuments/{id}', [DocumentsController::class, 'AllDocumentsByID']);
   Route::get('/docEtab/{id}', [DocumentsController::class, 'DocsByEtabID']);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('eventtype', EventTypeController::class);
});


Route::middleware('auth:api')->group(function () {
   Route::resource('event', EvenementController::class);
   Route::get('/eventByEtab/{id}', [EvenementController::class, 'eventByEtab']);
   Route::get('/GetFullEvents', [EvenementController::class, 'GetFullEvents']);
   Route::get('/GetFullEventsID/{id}', [EvenementController::class, 'GetFullEventsID']);
   Route::get('/GetFullEvents/{id}', [EvenementController::class, 'GetFullEventsByID']);
   Route::post('/UpdateEvent/{id}', [EvenementController::class, 'UpdateEvent']);
});



Route::middleware('auth:api')->group(function () {
   Route::resource('posts', PostsController::class);
   Route::post('/updatePost/{id}', [PostsController::class, 'updatePost'])->middleware(['permission:update posts,api']);
   Route::get('/GetFullPosts/{id}', [PostsController::class, 'GetFullPosts']);
   Route::get('/getpostByEtab/{id}', [PostsController::class, 'getpostByEtab'])->middleware(['permission:view posts,api']);
   Route::get('/GetPostwithRole/{id}', [PostsController::class, 'GetPostwithRole']);
});

Route::middleware('auth:api')->group(function () {
   Route::post('chat', [chatcontroller::class, 'saveMessage']);
   Route::get('chat', [chatcontroller::class, 'fetchMessaged']);
   Route::get('messages/{sujet_id}', [chatcontroller::class, 'messages']);
   Route::get('sujets', [chatcontroller::class, 'sujets']);
   Route::post('msg', [chatcontroller::class, 'saveMessage']);
   Route::get('FetchPrivateMsg/{user}', [chatcontroller::class, 'PrivateMsg']);
   Route::get('ConvPrivateMsg', [chatcontroller::class, 'ConvPrivateMsg']);
   Route::get('MyConv', [chatcontroller::class, 'MyConv']);


   Route::post('PostPrivateMsg', [chatcontroller::class, 'savePrivateMessage']);
   Route::get('check', [chatcontroller::class, 'check']);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('sujets', SujetController::class);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('gallery', GalleryController::class);
   Route::get('/GetGalleriesByEtab/{id}', [GalleryController::class, 'GetGalleriesByEtab']);
   Route::get('/GetFullGallery/{id}', [GalleryController::class, 'GetFullGallery']);
   Route::delete('/DeleteImage/{id}', [GalleryController::class, 'DeleteImage']);
   Route::post('/AddImage/{id}', [GalleryController::class, 'AddImage']);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('forms', FormController::class);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('formulaire', FormulaireController::class);
   Route::post('UpdateFormulaire/{id}', [FormulaireController::class, 'UpdateFormulaire']);
   Route::get('GetFormulaireFullData/{id}', [FormulaireController::class, 'GetFormulaireFullData']);
   Route::get('GetFormulaireByID/{id}', [FormulaireController::class, 'GetFormulaireByID'])->middleware('permission:view forms,api');;
   Route::post('/TableFieldsValues', [FormulaireController::class, 'TableFieldsValues']);
});



Route::middleware('permission:create forms,api')->group(function () {
   Route::resource('inputs', InputsController::class)->only('index');
});

Route::middleware('permission:create formelements,api')->group(function () {
   Route::resource('inputs', InputsController::class)->only('index');
   Route::post('/makeinput', [InputsController::class, 'store']);
});

Route::middleware('permission:view formelements,api')->middleware('auth:api')->prefix('inputs')->group(function () {
   Route::resource('inputs', InputsController::class)->only('index');
});

Route::middleware('auth:api')->group(function () {
   Route::resource('formrequest', FormRequestController::class);
});


Route::middleware('auth:api')->group(function () {
   Route::resource('tentative', TentativeController::class);
});


Route::middleware('auth:api')->group(function () {
   Route::resource('comments', CommentController::class);
   Route::post('SendMailToUsers', [CommentController::class, 'SendMailToUsers']);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('likes', LikesController::class);
});

Route::middleware('auth:api')->group(function () {
   Route::resource('tentative', TentativeController::class);
   Route::post('accepttentative/{id}', [TentativeController::class, 'accepttentative']);
});

//  USER API's //////////////////////////////////////////


Route::prefix('user')->group(function () {
   Route::resource('event', EvenementController::class);
   Route::get('/eventByEtab/{id}', [EvenementController::class, 'eventByEtab']);
   Route::get('/GetFullEvents', [EvenementController::class, 'GetFullEvents']);
   Route::get('/GetFullEvents/{id}', [EvenementController::class, 'GetFullEventsByID']);
   Route::post('/UpdateEvent/{id}', [EvenementController::class, 'UpdateEvent']);
});

Route::prefix('user')->group(function () {
   Route::resource('posts', PostsController::class);
   Route::post('/updatePost/{id}', [PostsController::class, 'updatePost']);
   Route::get('/GetFullPosts/{id}', [PostsController::class, 'GetFullPosts']);
   Route::get('/getpostByEtab/{id}', [PostsController::class, 'getpostByEtab']);
   Route::get('/GetPostwithRole/{id}', [PostsController::class, 'GetPostwithRole']);
});

Route::prefix('user')->group(function () {
   Route::resource('documents', DocumentsController::class);
   Route::get('/allDocuments', [DocumentsController::class, 'AllDocuments']);
   Route::post('/updateDocument/{id}', [DocumentsController::class, 'updateDocument'])->middleware('can:updateDocument,id');
   Route::get('/GetFullDocumentsByETab/{id}', [DocumentsController::class, 'GetFullDocumentsByETab']);
   Route::get('/GetFullDocumentsByETab', [DocumentsController::class, 'GetFullDocuments']);
   Route::get('/allDocuments/{id}', [DocumentsController::class, 'AllDocumentsByID']);
   Route::get('/docEtab/{id}', [DocumentsController::class, 'DocsByEtabID']);
});

Route::prefix('user')->group(function () {
   Route::resource('gallery', GalleryController::class);
   Route::get('/GetGalleriesByEtab/{id}', [GalleryController::class, 'GetGalleriesByEtab']);
   Route::get('/GetFullGallery/{id}', [GalleryController::class, 'GetFullGallery']);
   Route::delete('/DeleteImage/{id}', [GalleryController::class, 'DeleteImage']);
   Route::post('/AddImage/{id}', [GalleryController::class, 'AddImage']);
});

Route::prefix('user')->group(function () {
   Route::resource('formulaire', FormulaireController::class);
   Route::get('GetFormulaireFullData/{id}', [FormulaireController::class, 'GetFormulaireFullData']);
   Route::get('GetFormulaireByID/{id}', [FormulaireController::class, 'GetFormulaireByID']);
   Route::get('User_GetFormulaireByID/{id}', [FormulaireController::class, 'User_GetFormulaireByID']);
   Route::post('/TableFieldsValues', [FormulaireController::class, 'TableFieldsValues']);
});

Route::prefix('user')->group(function () {
   Route::get('AllEtabs', [EtablissementController::class, 'AllEtabs']);
});

Route::prefix('user')->group(function () {
   Route::resource('formrequest', FormRequestController::class);
});

Route::middleware('permission:create forms,api')->prefix('user')->group(function () {
   Route::resource('inputs', InputsController::class)->only('index');
});
