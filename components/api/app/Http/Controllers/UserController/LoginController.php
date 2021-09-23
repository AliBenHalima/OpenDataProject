<?php

namespace App\Http\Controllers\UserController;

use Exception;
// use App\Models\role;
use App\Models\User;
use App\Mail\MyTestMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use App\Models\Etablissement;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\MessageBag;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\UserController\LoginController;
use Illuminate\Http\Client\RequestException;

class LoginController extends Controller
{
    public function __construct()

{
    $this->middleware('permission:view etablissements,api', ['only' => ['test']]);
    $this->middleware('auth:api', ['only' => ['UpdateUser']]);
}

    public function login(Request $request)
    {

        try {
            $validator= $request->validate([
            'email'=>['required','email'],
            'password'=>['required']
        ]);

            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return ["success"=>false,'message'=>'Erreur dauthentification'];
            }
             $role = DB::table('model_has_roles')
        ->where('model_has_roles.model_id', '=', $user->id)
        ->select("model_has_roles.role_id")
        ->first();


            if($user->hasRole("SuperAdmin")){
            $isSuperAdmin=true;
        }else{
            $isSuperAdmin=false;
        }

        $etablissements = Etablissement::get();
            return ["success"=>true,"token"=>$user->createToken('Auth-token')->accessToken,'id'=>$user->id,"etablissement_id"=>$user->etablissement_id,"role"=>$role,"isSuperAdmin"=>$isSuperAdmin,"username"=>$user->name,"photo"=>$user->photo,'etablissements'=>$etablissements,'user_role'=>$user->getRoleNames()];
        } catch (\Exception $exception) {
            return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
        }
    }

    public function Signup(Request $request)
    {

        $request->validate([
            'name'=>['required'],
            'email'=>['required','email'],
            'password'=>['required'],
            'address'=>['required'],
            'photo'=>'required|mimes:jpj,png,jpeg',
            'role'=>['required'],
            'etablissement_id'=>['required'],
        ]);

        $user = User::where('email', $request->email)->first();
        if ($user) {
            return ["success"=>false,'message','user exists'];
        }

        Mail::send('emails.Welcome', ['Name'=>$request->name,'Email'=>$request->email], function (Message $message) use ($request) {
            $message->to($request->email);
            $message->subject('Welcome');
        });

        if (count(Mail::failures()) > 0) {
            return ['success'=>false,'message'=>'Mail does not exsist'];
           }

        try {
            $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
            $request->photo->storeAs('images/Users', $fileName, 'public');

            $user = new User([
                'name'=> $request->name,
                'email'=> $request->email,
                'password'=> Hash::make($request->password),
                'address'=>$request->address,
                'photo'=>$fileName,
                'etablissement_id'=>$request->etablissement_id,
            ]);

            $user->assignRole($request->role);
            $user->save();


            return ["success"=>true,'message'=>'user added'];
        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }
    }
    public function UserSignUp(Request $request)
    {


        $request->validate([
            'name'=>['required'],
            'email'=>['required','email'],
            'password'=>['required'],
            'address'=>['required'],
            'photo'=>'required|mimes:jpj,png,jpeg',
            'etablissement_id'=>['required'],
        ]);



        $user = User::where('email', $request->email)->first();
        if ($user) {
            return ["success"=>false,'message','user exists'];
        }

    Mail::send('emails.Welcome', ['Name'=>$request->name,'Email'=>$request->email], function (Message $message) use ($request) {
        $message->to($request->email);
        $message->subject('Welcome');
    });


    if (count(Mail::failures()) > 0) {
        return ['success'=>false,'message'=>'Mail does not exsist'];
       }

        try {
            $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
            $request->photo->storeAs('images/Users', $fileName, 'public');

            $user = new User([
                'name'=> $request->name,
                'email'=> $request->email,
                'password'=> Hash::make($request->password),
                'address'=>$request->address,
                'photo'=>$fileName,
                'etablissement_id'=>$request->etablissement_id,
                'name'=> $request->name,
            ]);

            $user->assignRole("User");
            $user->save();


            return ["success"=>true,'message'=>'Account created'];
        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }
    }


    public function ContactMail (Request $request){

             try {
                $validator= $request->validate([
                    'name'=>['required'],
                    'email'=>['required'],
                    'sujet'=>['required'],
                    'message'=>['required'],
                ]);

             Mail::send('emails.contact',['Name'=>$request->name,'Email'=>$request->email,'Sujet'=>$request->sujet,'Message'=>$request->message],function(Message $message) use ($request){
                 $message->to("alikiller16.2017@gmail.com");
                 $message->subject('Contact');
             });

             return ['success'=>true,'message'=>'Mail sent successfully'];

             }catch(\Exception $exception){
                 return response([
                     'success'=>false,'message'=>$exception->getMessage()
                 ]);
             }
         }

    public function sendmail (Request $request) {
            $details=[
                'title'=>'Mail from CRC',
                'body'=>'this is for testing mail'
            ]   ;
            $results = Mail::to("alibenhalima60@gmail.com")->send(new MyTestMail($details));
            if ($results!=null) {
                return ["message"=>"email sent"];
            }
            else{
                return "error";
            }
    }


    public function forgot (Request $request){

   if(User::where('email', $request->email)->doesntExist()){
            return['success'=>false,'message'=>'Utilisateur nexiste pas'];
        }
        try {
            $token = Str::random(10);
            DB::table('password_resets')->insert([
            'email'=>$request->email,
            'token'=>$token
        ]);

        Mail::send('emails.TestForgot',['token'=>$token],function(Message $message) use ($request){
            $message->to($request->email);
            $message->subject('Reset your passord');
        });

        return ['success'=>true,'message'=>'Check your Email'];

        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }
    }
    public function resetpassword (Request $request){
        try {
        $validator= $request->validate([
            'email'=>['required','email'],
            'password'=>['required'],
            'confirm_password'=>'required |required_with:password|same:password'
        ]);

            if(!$PasswordReset=DB::table('password_resets')->where('token',$request->token)->first()){
              [
                    'success'=>false,'message'=>'Invalid token!'
              ];
            }
            if(!$user=User::where('email',$PasswordReset->email)->first()){
                return \response([
                    'message'=>'User Doesn\'t exist'
                ]);
            }
            $user->password =  Hash::make($request->password);

            $user->save();
            return \response([
               'success'=>true, 'message'=>'Success'
            ]);
        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }

    }


    public function test (Request $request){
try{
    $client = new Client();

$res = $client->request('POST', 'http://127.0.0.1:5000/api/post', [
    'form_params' => [
        'comment' => 'ربي معاكم كل التوفيق والنجاح الدائم',
    ]
]);


if ($res->getStatusCode() == 200) { // 200 OK
    $response_data = $res->getBody()->getContents();
    return  ['success'=>true,'message'=>$response_data];
}
}

catch(\Exception $exception){
    return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
}
}


public function Addimage(Request $request, $id){
    $request->validate([
        'photo'=>'required|mimes:jpj,png,jpeg',
        'id'=>['required']
    ]);

    try {
    $user = User::where('id', $request->id)->first();
    if ($user) {
        return ["success"=>false,'message','user exists'];
    }


        $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
        $request->photo->storeAs('images/Users', $fileName, 'public');

        $user->update([
            'photo'=>$fileName,
        ]);


        return ["success"=>true,'message'=>'Photo Updated'];
    }catch(\Exception $exception){
        return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
    }
}
public function UpdateUser(Request $request, $id){
    $request->validate([
        'id'=>['required'],
        'name'=>['required'],
        'email'=>['required','email'],
        'address'=>['required'],
        'CurrentPassword'=>'',
        'NewPassword'=>'required_with:CurrentPassword',
        'ConfirmPassword'=>'required_with:NewPassword',
        'photo'=>'mimes:jpj,png,jpeg',
    ]);
    try {
    $user = User::where('id', $id)->first();
    $CurrentUser = Auth::user();
        if(!empty($request->CurrentPassword)&&(!$CurrentUser->hasRole("SuperAdmin"))){
            if(Hash::check($request->CurrentPassword, $user->password)){
                $user->password = Hash::make($request->NewPassword);
            }
            else{
                return ["success"=>false,'message'=>'Wrong Password info'];
            }
            if($request->NewPassword != $request->ConfirmPassword){
                return ["success"=>false,'message'=>'Passwords do not match'];
            }
        }
        if($CurrentUser->hasRole("SuperAdmin")){
            if(!empty($request->NewPassword))
            $user->password = Hash::make($request->NewPassword);
            if(!empty($request->role)){
                $user->etablissement_id = $request->etablissement_id;
            }
        }
        if(!empty($request->photo)){
            $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
            $request->photo->storeAs('images/Users', $fileName, 'public');
            $user->photo = $fileName;
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->Bio = $request->Bio;
        $user->syncRoles($request->role);
        $user->save();

        return ["success"=>true,'message'=>'Photo Updated','user'=>$user];
    }catch(\Exception $exception){
        return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
    }

}

public function UpdateOwnProfile(Request $request, $id){

        if(auth()->user()->id!=$id && !auth()->user()->can('update users')){
            return ["success"=>false,'message'=>"You can only update your own profile"];
        }
        $request->validate([
            'id'=>['required'],
            'name'=>['required'],
            'email'=>['required','email'],
            'address'=>['required'],
            'CurrentPassword'=>'',
            'NewPassword'=>'required_with:CurrentPassword',
            'ConfirmPassword'=>'required_with:NewPassword',
            'photo'=>'mimes:jpj,png,jpeg',
        ]);
        try {
        $user = User::where('id', $id)->first();
        $CurrentUser = Auth::user();
            if(!empty($request->CurrentPassword)&&(!$CurrentUser->hasRole("SuperAdmin"))){
                if(Hash::check($request->CurrentPassword, $user->password)){
                    $user->password = Hash::make($request->NewPassword);
                }
                else{
                    return ["success"=>false,'message'=>'Wrong Password info'];
                }
                if($request->NewPassword != $request->ConfirmPassword){
                    return ["success"=>false,'message'=>'Passwords do not match'];
                }
            }
            if($CurrentUser->hasRole("SuperAdmin")){
                if(!empty($request->NewPassword))
                $user->password = Hash::make($request->NewPassword);
                if(!empty($request->role)){
                    $user->etablissement_id = $request->etablissement_id;
                }
            }
            if(!empty($request->photo)){
                $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
                $request->photo->storeAs('images/Users', $fileName, 'public');
                $user->photo = $fileName;
            }
            $user->name = $request->name;
            $user->email = $request->email;
            $user->address = $request->address;
            $user->Bio = $request->Bio;
            $user->syncRoles($request->role);
            $user->save();

            return ["success"=>true,'message'=>'Photo Updated','user'=>$user];
        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }

    }



}
