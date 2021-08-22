import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { showMarkOfSubject } from '../utils';


const Students = ()=>{
    const [students, setStudents ] = useState([]);
    const history = useHistory();
    const deleteStudent = (student_id) => {
        axios.delete(`/api/students/${student_id}`).then(response => {
            alert("Deleted Successfully");
            load();
        })
    }
    const load=()=>{
        axios.get('/api/students').then(response => {
            setStudents(response.data)
        })
    }
    useEffect(()=>{
        load();
    },[])

    return (<table className="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Gender</th>
        <th scope="col">Reporting Teacher</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
   
       {
           students.map(s=><tr>
               <td>{s.id}</td>
               <td>{s.name}</td>
               <td>{s.age}</td>
               <td>{s.gender}</td>
               <td>{s.teacher.name}</td>
               <td><button onClick={()=>history.push(`/edit-student/${s.id}`)}>Edit</button><button onClick={()=>deleteStudent(s.id)}>Delete</button></td>
           </tr>)
       }
    </tbody>
  </table>)
}

export default Students;
