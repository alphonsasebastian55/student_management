<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Term;
class TermController extends Controller
{
    public function index(){
        return response()
        ->json(Term::with(['mark.subject','mark.student','mark.term'])->get());  
    }
    public function marks(){
        return response()
        ->json(Term::with(['mark.subject','mark.student','mark.term'])->get()->flatMap(function($item){
            return $item->mark;
        })->groupBy(["term_id","student_id"]));  
    }
}
