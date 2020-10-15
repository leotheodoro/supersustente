<?php

namespace App\Models;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    protected $fillable = [
        'user_id', 
        'title', 
        'description', 
        'situation_id', 
        'localization_type', 
        'status', 
        'address', 
        'neighborhood',
        'city',
        'state',
        'country',
        'lat',
        'lon',
        'anonymous',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function situation()
    {
        return $this->belongsTo(Situation::class);
    }
}
