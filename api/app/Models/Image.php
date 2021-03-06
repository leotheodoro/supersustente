<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['register_id', 'path'];
    
    public function register()
    {
        return $this->belongsTo(Register::class);
    }
}
