<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mark;

class MarkController extends Controller
{
    public function store(Request $request){
        $input = $request->json()->all();
        foreach($input["marks"] as $mark){
            Mark::updateOrCreate(
                [
                    'student_id'=>$input['student_id'],
                    'term_id'=>$input['term_id'],
                    'subject_id'=>$mark['subject_id'],
                ],
                [
                    'mark'=>$mark['mark'],
                ]
            );
        }
    }
    
    public function update(Request $request){
        $input = $request->json()->all();
        foreach($input["marks"] as $mark){
            Mark::where('student_id', $input['student_id'])
            ->where('term_id', $input['term_id'])
            ->where('subject_id', $input['subject_id'])
            ->update([
                'mark'=>$mark['mark'],
            ]);
        }
    }

    public function destroy(Request $request){
        Mark::where('student_id', $request['student_id'])->where('term_id', $request['term_id'])->delete();

    }
    
}
