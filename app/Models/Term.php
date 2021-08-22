<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mark;
class Term extends Model
{
    use HasFactory;
    public function mark(){
        return $this->hasMany(Mark::class);
    }
}
