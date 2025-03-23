// components/Instructions.jsx
import React, { useState } from 'react';

const Instructions = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">How to Use This System</h5>
        <div className="btn-group btn-group-sm">
          <button 
            className={`btn ${activeSection === 'overview' ? 'btn-light text-info' : 'btn-info'}`}
            onClick={() => setActiveSection('overview')}
          >
            <i className="bi bi-info-circle me-1"></i>
            Overview
          </button>
          <button 
            className={`btn ${activeSection === 'steps' ? 'btn-light text-info' : 'btn-info'}`}
            onClick={() => setActiveSection('steps')}
          >
            <i className="bi bi-list-ol me-1"></i>
            Steps
          </button>
          <button 
            className={`btn ${activeSection === 'excel' ? 'btn-light text-info' : 'btn-info'}`}
            onClick={() => setActiveSection('excel')}
          >
            <i className="bi bi-file-earmark-excel me-1"></i>
            Excel Format
          </button>
          <button 
            className={`btn ${activeSection === 'faq' ? 'btn-light text-info' : 'btn-info'}`}
            onClick={() => setActiveSection('faq')}
          >
            <i className="bi bi-question-circle me-1"></i>
            FAQ
          </button>
        </div>
      </div>
      <div className="card-body">
        {activeSection === 'overview' && (
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-primary">
                <i className="bi bi-stars me-2"></i>
                What is the Exam Time Table System?
              </h6>
              <p>
                The SVIT College Exam Scheduler is a comprehensive tool designed to automate and streamline the 
                process of creating examination schedules. It efficiently manages student and class data to create 
                conflict-free exam timetables.
              </p>
              <h6 className="text-primary mt-4">
                <i className="bi bi-graph-up-arrow me-2"></i>
                Benefits
              </h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <div>
                    <strong>Time Efficiency</strong>
                    <p className="mb-0 small text-muted">Reduces manual scheduling work from days to minutes</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <div>
                    <strong>Conflict Detection</strong>
                    <p className="mb-0 small text-muted">Automatically identifies scheduling conflicts</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <div>
                    <strong>Customizable Parameters</strong>
                    <p className="mb-0 small text-muted">Adjust exam duration, gaps, venues according to needs</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <div>
                    <strong>Data Visualization</strong>
                    <p className="mb-0 small text-muted">View schedule in calendar or table format</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h6 className="text-primary">
                    <i className="bi bi-diagram-3 me-2"></i>
                    System Workflow
                  </h6>
                  <div className="d-flex flex-column gap-2 mt-3">
                    <div className="d-flex">
                      <div className="bg-primary text-white rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', textAlign: 'center' }}>1</div>
                      <div>
                        <h6 className="mb-1">Input Data</h6>
                        <p className="small text-muted mb-0">Upload student data with courses in Excel format</p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="bg-primary text-white rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', textAlign: 'center' }}>2</div>
                      <div>
                        <h6 className="mb-1">Configure Settings</h6>
                        <p className="small text-muted mb-0">Set exam period, duration, and available venues</p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="bg-primary text-white rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', textAlign: 'center' }}>3</div>
                      <div>
                        <h6 className="mb-1">Generate Schedule</h6>
                        <p className="small text-muted mb-0">System creates optimized conflict-free timetable</p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="bg-primary text-white rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', textAlign: 'center' }}>4</div>
                      <div>
                        <h6 className="mb-1">Review & Export</h6>
                        <p className="small text-muted mb-0">Check for conflicts and export to Excel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'steps' && (
          <div>
            <ol className="list-group list-group-numbered">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Prepare your Excel file</div>
                  <p className="mb-1">The Excel file should include the following columns:</p>
                  <ul className="mb-0">
                    <li><strong>Student ID</strong> - Unique identifier for each student</li>
                    <li><strong>Name</strong> - Student's full name</li>
                    <li><strong>Branch</strong> - Department/Branch (e.g., CSE, ECE, Civil, Mech, EEE)</li>
                    <li><strong>Year</strong> - Current study year (e.g., 1, 2, 3, 4)</li>
                    <li><strong>Semester</strong> - Current semester (e.g., 1, 2, 3, etc.)</li>
                    <li><strong>Courses</strong> - List of courses the student is enrolled in (comma-separated)</li>
                  </ul>
                </div>
                <span className="badge bg-primary rounded-pill">Step 1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Upload the Excel file</div>
                  <p className="mb-0">Click "Upload Data" tab and either drag & drop your file or browse to select it</p>
                </div>
                <span className="badge bg-primary rounded-pill">Step 2</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Configure exam parameters</div>
                  <p className="mb-0">Set the start and end dates for the exam period, exam duration, gap between consecutive exams, and number of exams per day</p>
                </div>
                <span className="badge bg-primary rounded-pill">Step 3</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Customize exam venues</div>
                  <p className="mb-0">Add, edit, or remove available exam venues based on your institution's facilities</p>
                </div>
                <span className="badge bg-primary rounded-pill">Step 4</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Generate the exam schedule</div>
                  <p className="mb-0">Click the "Generate Exam Schedule" button to create an optimized timetable</p>
                </div>
                <span className="badge bg-primary rounded-pill">Step 5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Review the schedule</div>
                  <p className="mb-0">Check for conflicts and verify that the schedule meets your requirements using the calendar and table views</p>
                </div>
                <span className="badge bg-primary rounded-pill">Step 6</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Export to Excel</div>
                  <p className="mb-0">Click "Export" button to download the schedule in Excel format for distribution</p>
                </div>
                <span className="badge bg-primary rounded-pill">Step 7</span>
              </li>
            </ol>
          </div>
        )}
        
        {activeSection === 'excel' && (
          <div>
            <div className="alert alert-primary">
              <div className="d-flex">
                <i className="bi bi-file-earmark-excel fs-4 me-3"></i>
                <div>
                  <h6 className="mb-1">Excel File Format Instructions</h6>
                  <p className="mb-0">
                    Your Excel file must follow this specific format for the system to process it correctly.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="table-responsive mt-4">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Description</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Student ID</strong></td>
                    <td>Text/Number</td>
                    <td>Unique identifier for each student</td>
                    <td>CSE2101</td>
                  </tr>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td>Text</td>
                    <td>Student's full name</td>
                    <td>Rahul Sharma</td>
                  </tr>
                  <tr>
                    <td><strong>Branch</strong></td>
                    <td>Text</td>
                    <td>Department or branch of study</td>
                    <td>CSE</td>
                  </tr>
                  <tr>
                    <td><strong>Year</strong></td>
                    <td>Number</td>
                    <td>Current study year (1-4)</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td><strong>Semester</strong></td>
                    <td>Number</td>
                    <td>Current semester (1-8)</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td><strong>Courses</strong></td>
                    <td>Text</td>
                    <td>Comma-separated list of course codes</td>
                    <td>CS301,CS302,CS303,MA201</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="card mt-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Sample Excel Entries</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-sm table-bordered mb-0">
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
                      <tr>
                        <td>CSE2101</td>
                        <td>Rahul Sharma</td>
                        <td>CSE</td>
                        <td>2</td>
                        <td>3</td>
                        <td>CS301,CS302,CS303,MA201</td>
                      </tr>
                      <tr>
                        <td>ECE2105</td>
                        <td>Arun Kumar</td>
                        <td>ECE</td>
                        <td>2</td>
                        <td>3</td>
                        <td>EC301,EC302,EC303,MA201</td>
                      </tr>
                      <tr>
                        <td>MECH2110</td>
                        <td>Sanjay Gupta</td>
                        <td>Mech</td>
                        <td>2</td>
                        <td>3</td>
                        <td>ME301,ME302,ME303,PHY201</td>
                      </tr>
                      <tr>
                        <td>CSE1901</td>
                        <td>Kiran Verma</td>
                        <td>CSE</td>
                        <td>3</td>
                        <td>5</td>
                        <td>CS501,CS502,CS503,CS504</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'faq' && (
          <div>
            <div className="accordion mb-0" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button 
                    className="accordion-button" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseOne" 
                    aria-expanded="true" 
                    aria-controls="collapseOne"
                  >
                    What if there are conflicts in the generated schedule?
                  </button>
                </h2>
                <div 
                  id="collapseOne" 
                  className="accordion-collapse collapse show" 
                  aria-labelledby="headingOne" 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    The system automatically detects conflicts and displays them in the Conflicts tab. Conflicts occur when students 
                    from the same branch, year, and semester have multiple exams scheduled at the same time. To resolve conflicts, 
                    you can adjust the exam period duration, increase the gap between exams, or modify your input data.
                  </div>
                </div>
              </div>
              
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseTwo" 
                    aria-expanded="false" 
                    aria-controls="collapseTwo"
                  >
                    Can I manually adjust the generated schedule?
                  </button>
                </h2>
                <div 
                  id="collapseTwo" 
                  className="accordion-collapse collapse" 
                  aria-labelledby="headingTwo" 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Currently, manual adjustment is not supported directly in the application. However, you can export the schedule 
                    to Excel, make your adjustments there, and then use it for distribution. Future versions of the system may 
                    include direct manual adjustments.
                  </div>
                </div>
              </div>
              
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseThree" 
                    aria-expanded="false" 
                    aria-controls="collapseThree"
                  >
                    How does the venue assignment work?
                  </button>
                </h2>
                <div 
                  id="collapseThree" 
                  className="accordion-collapse collapse" 
                  aria-labelledby="headingThree" 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Venues are automatically assigned based on the number of students taking the exam. Larger venues are assigned 
                    to exams with more students. The system uses the first venue for up to 50 students, the second for 51-100 students, 
                    and so on. You can customize venue names in the configuration section.
                  </div>
                </div>
              </div>
              
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseFour" 
                    aria-expanded="false" 
                    aria-controls="collapseFour"
                  >
                    Does the system account for holidays and weekends?
                  </button>
                </h2>
                <div 
                  id="collapseFour" 
                  className="accordion-collapse collapse" 
                  aria-labelledby="headingFour" 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes, the system automatically excludes weekends (Saturdays and Sundays) from the exam schedule. However, it does 
                    not have a built-in holiday calendar. You should select an exam period that avoids major holidays or customize 
                    the exported schedule to accommodate specific holidays.
                  </div>
                </div>
              </div>
              
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseFive" 
                    aria-expanded="false" 
                    aria-controls="collapseFive"
                  >
                    What's the maximum number of students and courses the system can handle?
                  </button>
                </h2>
                <div 
                  id="collapseFive" 
                  className="accordion-collapse collapse" 
                  aria-labelledby="headingFive" 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    The system is designed to handle thousands of students and hundreds of courses efficiently. However, very large 
                    datasets (e.g., more than 10,000 students or 500 courses) might cause performance issues. In such cases, 
                    consider splitting your data into separate scheduling operations.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;