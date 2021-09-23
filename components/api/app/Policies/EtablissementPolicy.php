<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Etablissement;
use Illuminate\Auth\Access\HandlesAuthorization;

class EtablissementPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function update(User $user, Etablissement $etablissement)
    {
    $x=2;
        return $user->etablissement_id === $etablissement->id;
    }
}
