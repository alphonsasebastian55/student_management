import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field } from 'formik';
import { useParams, useHistory } from 'react-router-dom'
import { showMarkOfSubject } from '../utils';

export default function AddMark() {
    let { id } = useParams();
    const { location } = useHistory();
    const history = useHistory();
    const marks = location.state&&location.state.marks;
    let data={};
    if(marks&&marks.length>0){
        data = marks[0];
    }
    const [students, setStudents ] = useState([]);
    const [terms, setTerms ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    useEffect(()=>{
        axios.get('/api/students').then(response => {
            setStudents(response.data)
        })
        axios.get('/api/terms').then(response => {
            setTerms(response.data)
        })
        axios.get('/api/subjects').then(response => {
            setSubjects(response.data)
        })
    },[])
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Add Mark</h5>

                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                marks:subjects.map((subject, index)=>({
                                    subject_id:subject.id,
                                    mark:marks&&showMarkOfSubject(marks,subject.id),
                                })),
                                student_id:data.student_id,
                                term_id:data.term_id,
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.student_id) {
                                    errors.student_id = 'Student is Required';
                                }
                                if (!values.term_id) {
                                    errors.term_id = 'Term is Required';
                                }
                                
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                                console.log(JSON.stringify(values));
                                axios.post('/api/marks',values).then(response => {
                                    if(id){
                                        alert("Updated Successfully");
                                    }
                                    else{
                                        alert("Created Successfully");
                                    }
                                history.push('/')
                                })
                            }}
                        >
                        {({
                            errors,
                            touched,
                            handleSubmit,
                            isSubmitting,
                            
                        }) => (
                            <form onSubmit={handleSubmit}>
                                
                            <div class="form-group">
                                <label>Select Student</label>
                                <Field className="form-control" as="select" name="student_id" disabled={id}>
                                    <option value="" selected disabled>Select</option>
                                    {students.map(student=>(<option value={student.id}>{student.name}</option>))}
                                </Field>
                                <div class="alert-danger">{errors.student_id && touched.student_id && errors.student_id}</div>
                            </div>
                            <div class="form-group">
                                <label>Select Term</label>
                                <Field className="form-control" as="select" name="term_id"  disabled={id}>
                                    <option value="" selected disabled>Select</option>
                                    {terms.map(term=>(<option value={term.id}>{term.name}</option>))}
                                </Field>
                                <div class="alert-danger">{errors.term_id && touched.term_id && errors.term_id}</div>
                            </div>
 
                            {subjects.map((subject, index)=>(
                                <div class="form-group">
                                    <label>Enter mark for {subject.name}</label>
                                    <Field type="hidden" name={`marks[${index}][subject_id]`} placeholder={subject.name} value={subject.id} />
                                    <Field className="form-control" type="number" name={`marks[${index}][mark]`} placeholder={subject.name} />
                                </div>))}
                            
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                            </form>
                        )}
                        </Formik>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
