<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Broadcast::channel('chat', function ($user, $sujet_id) {
//     return Auth::check();
// });

Broadcast::channel('chat.{sujet_id}', function ($user, $sujet_id) {
    return Auth::check();
    // if(Auth::check()){
    //     return ['id'=>$user->id,'name'=>$user->name];
    // }
});

Broadcast::channel('PrivateChat.{id}', function ($user, $id) {
    return Auth::check();
    // if(Auth::check()){
    //     return ['id'=>$user->id,'name'=>$user->name];
    // }
});

Broadcast::channel('Online', function ($user) {
    if (Auth::check()) {
        return $user;
    }
});


// Broadcast::channel('chan.{roomId}', function ($user, $roomId) {
//     if ($user->canJoinRoom($roomId)) {
//         return ['id' => $user->id, 'name' => $user->name];
//     }
// });

// Broadcast::channel('presence-Channel.{userId}', function ($user,$userId) {

//     if ($user->id === $userId) {
//         return array('name' => $user->name);
//       }
// });

// Broadcast::channel('user.{userId}', function ($user, $userId) {
//     if ($user->id === $userId) {
//       return array('name' => $user->name);
//     }
//   });
