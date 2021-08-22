<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;

class Student extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'teacher_id', 'age', 'gender'];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
