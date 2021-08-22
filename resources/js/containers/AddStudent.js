import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field } from 'formik';
import { useParams, useHistory } from 'react-router-dom'


function AddStudent() {
    let { id } = useParams();
    const [teachers, setTeachers] = useState([]);
    const [students,setStudents] = useState({});
    const history = useHistory();
    useEffect(() => {
        axios.get('/api/teachers').then(response => {
            setTeachers(response.data)
        })
        if(id){
            axios.get(`/api/students/${id}`).then(response => {
                setStudents(response.data)
            })
        }
    }, [])
    return (<>
        <h5 className="card-title">Add Student</h5>

        <Formik
            enableReinitialize={true}
            initialValues={{ name: students.name, age: students.age, gender: students.gender, teacher_id: students.teacher_id }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Name is Required';
                }
                if (!values.age) {
                    errors.age = 'Age is Required';
                }
                if (!values.gender) {
                    errors.gender = 'Gender is Required';
                }
                if (!values.teacher_id) {
                    errors.teacher_id = 'Teacher is Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                if(id){
                    axios.post(`/api/students/${id}`, values).then(response => {
                        alert("Updated Successfully");
                    })
                }else{
                    axios.post('/api/students', values).then(response => {
                       alert("Created Successfully");
                    })
                }
                history.push('/students');
            }}
        >
            {({
                errors,
                touched,
                handleSubmit,
                isSubmitting,
                
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <Field className="form-control" type="text" name="name" />

                        <div className="alert-danger">{errors.name && touched.name && errors.name}</div>
                    </div>
                    <div className="form-group">
                    <label>Age</label>
                    <Field className="form-control" type="number" name="age" />

                    <div className="alert-danger">{errors.age && touched.age && errors.age}</div>
                    </div>
                    <div className="form-group">
                        Gender
                    <div class="form-check">
                            <Field class="form-check-input" type="radio" name="gender" value="F" />
                            <label class="form-check-label" for="exampleRadios1" >
                                Female
                            </label>
                        </div>
                        <div class="form-check">
                            <Field class="form-check-input" type="radio" name="gender" value="M" />  <label class="form-check-label" for="exampleRadios1" />
                            <label class="form-check-label" for="exampleRadios2">
                                Male
                            </label>
                        </div>


                        <div className="alert-danger"> {errors.gender && touched.gender && errors.gender}</div>
                    </div>

                    <div className="form-group">
                    Reporting Teacher
                    <Field className="form-control" as="select" name="teacher_id">
                        <option value="" selected disabled>Select</option>                        
                        {teachers.map(teacher => (<option value={teacher.id}>{teacher.name}</option>))}
                    </Field>
                    </div>

                    <div className="alert-danger">{errors.teacher_id && touched.teacher_id && errors.teacher_id}</div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </>
    );
}

export default AddStudent;