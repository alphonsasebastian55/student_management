import React from "react";
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import AddStudent from "./containers/AddStudent";
import Terms from "./containers/Terms";
import AddMark from "./containers/AddMark";
import Students from "./containers/Students";

const Layout = () => {
    return (
        <Router>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-3"><Link className="add-btn btn btn-primary" to="/">Marks</Link></div>
                            <div className="col-md-3"><Link className="add-btn btn btn-primary" to="/add-student">Add Student</Link></div>
                            <div className="col-md-3"><Link className="add-btn btn btn-primary" to="/add">Add Marks</Link></div>
                            <div className="col-md-3"><Link className="add-btn btn btn-primary" to="/students">Student List</Link></div>
                        </div>
                        <div className="card-body">
                        <Switch>
                            <Route path="/" exact>
                                <Terms />
                            </Route>
                            <Route path="/add-student">
                                <AddStudent />
                            </Route>
                            <Route path="/add">
                                <AddMark />
                            </Route>
                            <Route path="/students">
                                <Students />
                            </Route>
                            <Route path="/edit/:id">
                                <AddMark />
                            </Route>                            
                            <Route path="/edit-student/:id">
                                <AddStudent />
                            </Route>
                        </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Router>
    )
}

export default Layout;
if (document.getElementById('app')) {
    ReactDOM.render(<Layout />, document.getElementById('app'));
}
