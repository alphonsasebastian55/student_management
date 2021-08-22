<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Subject;
use App\Models\Student;
use App\Models\Term;

class Mark extends Model
{
    use HasFactory;
    protected $fillable =['student_id','subject_id','term_id','mark'];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function term()
    {
        return $this->belongsTo(Term::class);
    }
}
