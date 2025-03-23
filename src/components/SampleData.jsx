// components/SampleData.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const SampleData = () => {
  const [showSample, setShowSample] = useState(false);
  const [activeTab, setActiveTab] = useState('schedule');

  const sampleSchedule = [
    {
      course: "CS301",
      date: new Date("2025-04-01"),
      timeSlot: 1,
      venue: "Hall A",
      branches: ["CSE"],
      years: [2],
      semesters: [3],
      studentCount: 120,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
    },
    // ... other sample schedule items ...
  ];

  // Sample student data
  const sampleStudentData = [
    {
      "Student ID": "CSE2101",
      "Name": "Rahul Sharma",
      "Branch": "CSE",
      "Year": 2,
      "Semester": 3,
      "Courses": "CS301,CS302,CS303,MA201"
    },
    {
      "Student ID": "CSE2102",
      "Name": "Priya Singh",
      "Branch": "CSE",
      "Year": 2,
      "Semester": 3,
      "Courses": "CS301,CS302,CS303,MA201"
    },
    {
      "Student ID": "ECE2105",
      "Name": "Arun Kumar",
      "Branch": "ECE",
      "Year": 2,
      "Semester": 3,
      "Courses": "EC301,EC302,EC303,MA201"
    },
    {
      "Student ID": "MECH2110",
      "Name": "Sanjay Gupta",
      "Branch": "Mech",
      "Year": 2,
      "Semester": 3,
      "Courses": "ME301,ME302,ME303,PHY201"
    },
    {
      "Student ID": "CSE1901",
      "Name": "Kiran Verma",
      "Branch": "CSE",
      "Year": 3,
      "Semester": 5,
      "Courses": "CS501,CS502,CS503,CS504"
    }
  ];

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Download sample Excel file
  const downloadSampleExcel = () => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Convert sample data to worksheet
      const ws = XLSX.utils.json_to_sheet(sampleStudentData);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Students");
      
      // Add a second worksheet with instructions
      const instructionsData = [
        ["SVIT College Exam Scheduler - Template Instructions"],
        [""],
        ["Required Columns:"],
        ["Student ID", "Unique identifier for each student (e.g., CSE2101)"],
        ["Name", "Student's full name"],
        ["Branch", "Department/Branch (e.g., CSE, ECE, Mech)"],
        ["Year", "Current study year (numeric: 1, 2, 3, or 4)"],
        ["Semester", "Current semester (numeric: 1-8)"],
        ["Courses", "Comma-separated list of course codes (e.g., CS301,CS302,MA201)"],
        [""],
        ["Important Notes:"],
        ["1. Do not change the column headers"],
        ["2. Ensure all students have at least one course"],
        ["3. Use consistent branch names and course codes"]
      ];
      
      const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
      XLSX.utils.book_append_sheet(wb, wsInstructions, "Instructions");
      
      // Set column widths for better readability
      ws['!cols'] = [
        { wch: 12 }, // Student ID
        { wch: 20 }, // Name
        { wch: 10 }, // Branch
        { wch: 6 },  // Year
        { wch: 10 }, // Semester
        { wch: 30 }  // Courses
      ];
      
      wsInstructions['!cols'] = [
        { wch: 40 }, // First column
        { wch: 60 }  // Second column
      ];
      
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, "SVIT_Exam_Schedule_Template.xlsx");
    } catch (error) {
      console.error("Error generating Excel template:", error);
      alert("Error generating Excel template. Please try again.");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-file-earmark-text me-2"></i>
          Sample Data & Templates
        </h5>
        <div>
          <button 
            className="btn btn-sm btn-light me-2"
            onClick={downloadSampleExcel}
            title="Download sample Excel template"
          >
            <i className="bi bi-download me-1"></i>
            Template
          </button>
          <button 
            className={`btn btn-sm ${showSample ? 'btn-danger' : 'btn-light'}`}
            onClick={() => setShowSample(!showSample)}
          >
            {showSample ? 'Hide Samples' : 'Show Samples'}
          </button>
        </div>
      </div>
      
      {showSample && (
        <div className="card-body">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                <i className="bi bi-calendar-week me-1"></i>
                Sample Schedule
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                <i className="bi bi-people me-1"></i>
                Student Data Format
              </button>
            </li>
          </ul>
          
          {/* Rest of the component remains the same */}
          {activeTab === 'schedule' && (
            <div>
              <div className="alert alert-info mb-4">
                <i className="bi bi-info-circle-fill me-2"></i>
                This is a sample output showing how the generated exam schedule might look. The data below is based on 
                sample records for CSE, ECE, and Mechanical Engineering departments.
              </div>
              
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
                    {sampleSchedule.map((exam, index) => (
                      <tr key={index}>
                        <td>{formatDate(exam.date)}</td>
                        <td>{exam.startTime} - {exam.endTime}</td>
                        <td><strong>{exam.course}</strong></td>
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
              
              <div className="d-flex justify-content-center mt-3">
                <div className="alert alert-light d-inline-block">
                  <i className="bi bi-calendar-check me-2 text-success"></i>
                  This schedule ensures no conflicts for students across departments
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card h-100 border-primary">
                    <div className="card-header bg-primary text-white">
                      <h6 className="mb-0">
                        <i className="bi bi-file-spreadsheet me-2"></i>
                        Required Excel Format
                      </h6>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        Your Excel file must contain the following columns with the exact column names:
                      </p>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <strong>Student ID</strong> - Unique identifier
                        </li>
                        <li className="list-group-item">
                          <strong>Name</strong> - Student's full name
                        </li>
                        <li className="list-group-item">
                          <strong>Branch</strong> - Department/branch (CSE, ECE, etc.)
                        </li>
                        <li className="list-group-item">
                          <strong>Year</strong> - Current study year (numeric)
                        </li>
                        <li className="list-group-item">
                          <strong>Semester</strong> - Current semester (numeric)
                        </li>
                        <li className="list-group-item">
                          <strong>Courses</strong> - Comma-separated course codes
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer bg-light">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={downloadSampleExcel}
                      >
                        <i className="bi bi-download me-1"></i>
                        Download Template
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-success">
                    <div className="card-header bg-success text-white">
                      <h6 className="mb-0">
                        <i className="bi bi-table me-2"></i>
                        Sample Student Entries
                      </h6>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-sm table-striped table-bordered mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Student ID</th>
                              <th>Name</th>
                              <th>Branch</th>
                              <th>Year</th>
                              <th>Semester</th>
                              <th>Courses</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sampleStudentData.map((student, index) => (
                              <tr key={index}>
                                <td>{student["Student ID"]}</td>
                                <td>{student["Name"]}</td>
                                <td>{student["Branch"]}</td>
                                <td>{student["Year"]}</td>
                                <td>{student["Semester"]}</td>
                                <td>{student["Courses"]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer bg-light">
                      <div className="alert alert-success mb-0 py-2">
                        <small>
                          <i className="bi bi-lightbulb me-1"></i>
                          This sample data demonstrates how to structure your Excel file
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="alert alert-warning mt-4">
                <div className="d-flex">
                  <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                  <div>
                    <h6 className="mb-1">Important Notes</h6>
                    <ul className="mb-0">
                      <li>All column names must be <strong>exactly</strong> as shown</li>
                      <li>Course codes in the "Courses" column must be consistent across all students</li>
                      <li>The Year and Semester must be numeric values</li>
                      <li>Branch names should be consistent (e.g., always use "CSE" instead of mixing "CSE" and "Computer Science")</li>
                      <li>Each student must have a unique Student ID</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SampleData;