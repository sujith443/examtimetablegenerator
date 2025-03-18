// components/GeneratedSchedule.jsx
import React from 'react';
import { formatDate } from '../utils/scheduleUtils';

const GeneratedSchedule = ({ examSchedule, onExport, conflicts }) => {
  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Generated Exam Schedule</h5>
        <button className="btn btn-light btn-sm" onClick={onExport}>
          Export to Excel
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Course</th>
                <th>Venue</th>
                <th>Branches</th>
                <th>Years</th>
                <th>Semesters</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((exam, index) => (
                <tr key={index}>
                  <td>{formatDate(exam.date)}</td>
                  <td>{exam.startTime} - {exam.endTime}</td>
                  <td>{exam.course}</td>
                  <td>{exam.venue}</td>
                  <td>{exam.branches.join(', ')}</td>
                  <td>{exam.years.join(', ')}</td>
                  <td>{exam.semesters.join(', ')}</td>
                  <td>{exam.studentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Conflict Detection */}
        {examSchedule.length > 0 && (
          <div className="mt-4">
            <h6>Conflict Analysis</h6>
            {conflicts.length === 0 ? (
              <div className="alert alert-success">
                No scheduling conflicts detected! All exams are properly scheduled.
              </div>
            ) : (
              <div className="alert alert-warning">
                <p><strong>Warning: {conflicts.length} scheduling conflicts detected!</strong></p>
                <ul>
                  {conflicts.map((conflict, index) => (
                    <li key={index}>
                      {conflict.date} at {conflict.time}: Courses {conflict.courses.join(' and ')} have overlapping students from 
                      {conflict.branches.length > 0 ? ` branches ${conflict.branches.join(', ')}` : ''}
                      {conflict.years.length > 0 ? ` in years ${conflict.years.join(', ')}` : ''}
                      {conflict.semesters.length > 0 ? ` and semesters ${conflict.semesters.join(', ')}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedSchedule;