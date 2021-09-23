<?php

namespace App\Providers;

use App\Models\Post;
use App\Models\User;
use App\Models\Formulaire;
use App\Policies\PostPolicy;
use App\Models\Etablissement;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use App\Policies\EtablissementPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        //  Post::class => PostPolicy::class,
        //  Etablissement::class => EtablissementPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

                Gate::define('update-post', function ($user,Post $post) {
            return $user->etablissement_id == $post->etablissement_id;
        });

        Gate::define('view-post', function ($user,Post $post) {
            // abort(response()->json('Unauthorized', 403));
            return $user->etablissement_id == $post->etablissement_id;
        });

        Gate::define('update-form', function ($user,Formulaire $form) {
            return $user->etablissement_id == $form->etablissement_id;
        });

        Gate::define('view-etablissement', function ($user,Etablissement $etablissement) {
            // abort(response()->json('Unauthorized', 403));
            return $user->etablissement_id == $etablissement->id;
        });

        Gate::define('view-own-profile', function ($User,$id) {
            // abort(response()->json('Unauthorized', 403));
                if(auth()->user()->hasPermissionTo('update users')){
                    return true;
                }
                return $User->id == $id;
        });


        if (! $this->app->routesAreCached()) {
            Passport::routes();
        }
        // Passport::routes();
        Passport::hashClientSecrets();
        Passport::tokensExpireIn(now()->addDays(365));
         Passport::refreshTokensExpireIn(now()->addDays(365));
         Passport::personalAccessTokensExpireIn(now()->addMonths(12));
         Gate::before(function ($user, $ability) {
            return $user->hasRole('SuperAdmin') ? true : null;
        });


    }
}
