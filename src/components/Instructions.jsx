// components/Instructions.jsx
import React from 'react';

const Instructions = () => {
  return (
    <div className="card">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">How to Use This System</h5>
      </div>
      <div className="card-body">
        <ol>
          <li className="mb-2">
            <strong>Prepare your Excel file</strong> with the following columns:
            <ul>
              <li>Student ID - Unique identifier for each student</li>
              <li>Name - Student's full name</li>
              <li>Branch - Department/Branch (e.g., CSE, ECE, Civil, Mech, EEE)</li>
              <li>Year - Current study year (e.g., 1, 2, 3, 4)</li>
              <li>Semester - Current semester (e.g., 1, 2, 3, etc.)</li>
              <li>Courses - List of courses the student is enrolled in (comma-separated if multiple)</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Upload the Excel file</strong> using the file upload button in Step 1.
          </li>
          <li className="mb-2">
            <strong>Configure the exam parameters</strong> in Step 2:
            <ul>
              <li>Set the start and end dates for the exam period</li>
              <li>Specify exam duration, gap between exam days, and exams per day</li>
              <li>Manage available venues</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Click "Generate Exam Schedule"</strong> to create an optimized timetable.
          </li>
          <li>
            <strong>Review the schedule</strong> and check for any conflicts. Export to Excel if needed.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Instructions;