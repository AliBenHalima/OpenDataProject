<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('etablissements')->insert([
            'nom' => 'Main Establishement',
            'description' =>
                "Harvard University possesses the title of America's oldest learning institution, founded in 1636. At its inception, this university's name was “New College,” and its purpose was mainly to educate clergy. In 1639, the school's name became Harvard University, so named for the Rev. John Harvard",
            'email' => 'MainEtablissement@gmail.com',
            'phone_number' => '+21673582458',
            'color' => '#EA4335',
            'photo'=>'Zt7SXLpzdi_ETablissementGeneral.jpg',
            'addresse' => '4491 Hardesty Mahdia',
            'mapLocation' =>
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.998715377224!2d10.632395314750429!3d35.8245072297094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130275c7293c5b9b%3A0x3e4d22cc1d0f7dd5!2sISSAT%20Sousse!5e0!3m2!1sfr!2stn!4v1627844843425!5m2!1sfr!2stn',
            'short_description' =>
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
            'isMain' => true,
            'video' => 'HpeEIyfQXCc',
        ]);

        $data = [
            ['name' => 'view users','guard_name'=>'api'],
            ['name' => 'create users','guard_name'=>'api'],
            ['name' => 'update users','guard_name'=>'api'],
            ['name' => 'delete users','guard_name'=>'api'],
            ['name' => 'view roles','guard_name'=>'api'],
            ['name' => 'create roles','guard_name'=>'api'],
            ['name' => 'update roles','guard_name'=>'api'],
            ['name' => 'delete roles','guard_name'=>'api'],
            ['name' => 'view etablissements','guard_name'=>'api'],
            ['name' => 'create etablissements','guard_name'=>'api'],
            ['name' => 'update etablissements','guard_name'=>'api'],
            ['name' => 'delete etablissements','guard_name'=>'api'],
            ['name' => 'view events','guard_name'=>'api'],
            ['name' => 'create events','guard_name'=>'api'],
            ['name' => 'update events','guard_name'=>'api'],
            ['name' => 'delete events','guard_name'=>'api'],
            ['name' => 'view eventsType','guard_name'=>'api'],
            ['name' => 'create eventsType','guard_name'=>'api'],
            ['name' => 'update eventsType','guard_name'=>'api'],
            ['name' => 'delete eventsType','guard_name'=>'api'],
            ['name' => 'view documents','guard_name'=>'api'],
            ['name' => 'create documents','guard_name'=>'api'],
            ['name' => 'update documents','guard_name'=>'api'],
            ['name' => 'delete documents','guard_name'=>'api'],
            ['name' => 'view documentsSubject','guard_name'=>'api'],
            ['name' => 'create documentsSubject','guard_name'=>'api'],
            ['name' => 'update documentsSubject','guard_name'=>'api'],
            ['name' => 'delete documentsSubject','guard_name'=>'api'],
            ['name' => 'view posts','guard_name'=>'api'],
            ['name' => 'create posts','guard_name'=>'api'],
            ['name' => 'update posts','guard_name'=>'api'],
            ['name' => 'delete posts','guard_name'=>'api'],
            ['name' => 'view galleries','guard_name'=>'api'],
            ['name' => 'create galleries','guard_name'=>'api'],
            ['name' => 'update galleries','guard_name'=>'api'],
            ['name' => 'delete galleries','guard_name'=>'api'],
            ['name' => 'view forms','guard_name'=>'api'],
            ['name' => 'create forms','guard_name'=>'api'],
            ['name' => 'update forms','guard_name'=>'api'],
            ['name' => 'delete forms','guard_name'=>'api'],
            ['name' => 'view formelements','guard_name'=>'api'],
            ['name' => 'create formelements','guard_name'=>'api'],
            ['name' => 'update formelements','guard_name'=>'api'],
            ['name' => 'delete formelements','guard_name'=>'api'],
        ];
        DB::table('permissions')->insert($data);
        $superAdminPermissionsArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
        $superAdminPermissions = [
            'view users',
            'create users',
            'update users',
            'delete users',
            'view roles',
            'create roles',
            'update roles',
            'delete roles',
            'view etablissements',
            'create etablissements',
            'update etablissements',
            'delete etablissements',
            'view events',
            'create  events',
            'update events',
            'delete events',
            'view eventsType',
            'create eventsType',
            'update eventsType',
            'delete eventsType',
            'view documents',
            'create documents',
            'update documents',
            'delete documents',
            'view documentsSubject',
            'create documentsSubject',
            'update documentsSubject',
            'delete documentsSubject',
            'view posts',
            'create posts',
            'update posts',
            'delete posts',
            'view galleries',
            'create galleries',
            'update galleries',
            'delete galleries',
            'view formelements',
            'view forms',
            'create forms',
            'update forms',
            'delete forms',
            'create formelements',
            'update formelements',
            'delete formelements',
        ];
        $userPermissions = ['create users'];
        $roleSuperAdmin = Role::create(['name' => 'SuperAdmin']);
        $roleUser = Role::create(['name' => 'User']);
        $roleSuperAdmin->syncPermissions($superAdminPermissionsArray);
        $roleUser->syncPermissions($userPermissions);

    }
}
