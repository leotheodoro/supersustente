<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['register_id', 'address', 'neighborhood', 'city', 'state', 'country'];

    public function register()
    {
        return $this->belongsTo(Register::class);
    }
}
