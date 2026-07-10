<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function verifyToken($token, $backofficePermission, $frontofficePermission)
    {
        if (!$token) {
            return false;
        }

        $tokenBackoffice = Cache::get("auth_token:backoffice");
        $tokenFrontoffice = Cache::get("auth_token:frontoffice");

        if($backofficePermission == true && $frontofficePermission == false){
            if($token != $tokenBackoffice || $token == $tokenFrontoffice){
                return false;
            }
        }

        if($backofficePermission == false && $frontofficePermission == true){
            if($token == $tokenBackoffice || $token != $tokenFrontoffice){
                return false;
            }
        }

        if($backofficePermission == false && $frontofficePermission == false){
            return false;
        }

        return true;
    }

}
