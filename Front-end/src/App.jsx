import React from 'react';
import Courses from './components/Courses';


const App = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Student Information</h3>
             


            </div>
          </div>
        </div>
        <div className="col-md-8">
        <div className="card">
            <div className="card-body">
              <h3 className="card-title">Courses</h3>
            </div>
          </div>
          
          <Courses/>
        </div>
      </div>
    </div>
  );
};

export default App;