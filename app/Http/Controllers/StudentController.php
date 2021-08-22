<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(){
        return response()
        ->json(Student::with('teacher')->get());
    }
    public function store(Request $request){
        Student::create($request->all());
    }
    
    public function destroy(Request $request){
        Student::where('id',$request['student_id'])->delete();
    }
    public function show($id){ 
        $student=Student::find($id);
        return response()->json($student);
    }
    public function update($id,Request $request){
        Student::where('id',$id)->update($request->all());
    }

}
