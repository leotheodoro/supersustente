<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Localization extends Model
{
    protected $fillable = ['register_id', 'lat', 'lon'];
    
    public function register()
    {
        return $this->belongsTo(Register::class);
    }
}
