<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $role_id = +$request->header('role_id'); // to convert it to Number
        $user = Auth::user();
        if(!$user->hasRole($role_id)){
            abort(403, 'You dont have access here');
        }
        return $next($request);
    }
}
