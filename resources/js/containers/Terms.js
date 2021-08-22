import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { showMarkOfSubject } from '../utils';

const RenderRow = ({marks, subjects, deleteMark})=>{
    const history = useHistory();
    const data = marks[0];
    return <tr>
        <td>{data.id}</td>
        <td>{data.student.name}</td>
        {subjects.map(subject=><td>{showMarkOfSubject(marks, subject.id)}</td>)}
        <td>{data.term.name}</td>
        <td>{marks.reduce((total,m)=>m.mark+total,0)}</td>
        <td>{Date(data.created_at).toLocaleString()}</td>
        <td><button onClick={()=>history.push(`/edit/${data.term_id}`,{marks})}>Edit</button><button onClick={()=>deleteMark(data.term_id, data.student_id)}>Delete</button></td>
    </tr>;
}

const Terms = ()=>{
    const [terms, setTerms ] = useState({});
    const [subjects, setSubjects ] = useState([]);
    const load = ()=>{
        axios.get('/api/terms/marks').then(response => {
            setTerms(response.data)
        })
    }
    
    const deleteMark = (term_id, student_id) => {
        axios.delete(`/api/marks/${term_id}/${student_id}`).then(response => {
         alert("Deleted Successfully");
         load();
        })
    }
    useEffect(()=>{
        load();
        axios.get('/api/subjects').then(response => {
            setSubjects(response.data)
        })
    },[])

    return (<table className="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        {
            subjects.map(s=><th scope="col">{s.name}</th>)
        }
        <th scope="col">Term</th>
        <th scope="col">Total Marks</th>
        <th scope="col">Created On</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
        {
            Object.keys(terms).map(term_id=>(
                Object.keys(terms[term_id])
                .map(student_id=>(<RenderRow deleteMark={deleteMark} subjects={subjects} marks={terms[term_id][student_id]} />))
            ))
        }
    </tbody>
  </table>)
}

export default Terms;
