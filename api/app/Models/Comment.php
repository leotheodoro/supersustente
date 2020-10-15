<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['register_id', 'user_id', 'comment'];

    public function register()
    {
        return $this->belongsTo(Register::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
