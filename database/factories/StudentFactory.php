<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'age' => $this->faker->numberBetween(1,100),
            'gender' => $this->faker->randomElement(['M', 'F']),
            'teacher_id' =>  $this->faker->unique()->numberBetween(1, \App\Models\Teacher::count()),
        ];
    }
}
    