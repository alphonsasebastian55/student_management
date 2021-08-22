<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TermController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/teachers',[TeacherController::class,'index']);

Route::delete('/students/{student_id}',[StudentController::class,'destroy']);

Route::resources([
    'marks' => MarkController::class,
    'subjects' => SubjectController::class,
    'students' => StudentController::class,
    
]);
Route::get('/terms',[TermController::class,'index']);
Route::get('/terms/marks',[TermController::class,'marks']);
Route::delete('/marks/{term_id}/{student_id}',[MarkController::class,'destroy']);
Route::delete('/students/{student_id}',[StudentController::class,'destroy']);
