<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Posts
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

       $id = $this->routes('updatePost');
       $x =2;
        return $next($request);
    }
}
