// components/SampleData.jsx
import React, { useState } from 'react';

const SampleData = () => {
  const [showSample, setShowSample] = useState(false);

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
    {
      course: "EC301",
      date: new Date("2025-04-01"),
      timeSlot: 2,
      venue: "Hall B",
      branches: ["ECE"],
      years: [2],
      semesters: [3],
      studentCount: 95,
      startTime: "2:00 PM",
      endTime: "5:00 PM"
    },
    {
      course: "CS302",
      date: new Date("2025-04-03"),
      timeSlot: 1,
      venue: "Hall A",
      branches: ["CSE"],
      years: [2],
      semesters: [3],
      studentCount: 120,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
    },
    {
      course: "EC302",
      date: new Date("2025-04-03"),
      timeSlot: 2,
      venue: "Hall B",
      branches: ["ECE"],
      years: [2],
      semesters: [3],
      studentCount: 95,
      startTime: "2:00 PM",
      endTime: "5:00 PM"
    },
    {
      course: "ME301",
      date: new Date("2025-04-05"),
      timeSlot: 1,
      venue: "Hall C",
      branches: ["Mech"],
      years: [2],
      semesters: [3],
      studentCount: 85,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
    },
    {
      course: "CS303",
      date: new Date("2025-04-05"),
      timeSlot: 2,
      venue: "Hall A",
      branches: ["CSE"],
      years: [2],
      semesters: [3],
      studentCount: 120,
      startTime: "2:00 PM",
      endTime: "5:00 PM"
    },
    {
      course: "MA201",
      date: new Date("2025-04-07"),
      timeSlot: 1,
      venue: "Hall D",
      branches: ["CSE", "ECE"],
      years: [2],
      semesters: [3],
      studentCount: 215,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
    },
    {
      course: "EC303",
      date: new Date("2025-04-07"),
      timeSlot: 2,
      venue: "Hall B",
      branches: ["ECE"],
      years: [2],
      semesters: [3],
      studentCount: 95,
      startTime: "2:00 PM",
      endTime: "5:00 PM"
    },
    {
      course: "ME302",
      date: new Date("2025-04-09"),
      timeSlot: 1,
      venue: "Hall C",
      branches: ["Mech"],
      years: [2],
      semesters: [3],
      studentCount: 85,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
    },
    {
      course: "PHY201",
      date: new Date("2025-04-09"),
      timeSlot: 2,
      venue: "Hall C",
      branches: ["Mech"],
      years: [2],
      semesters: [3],
      studentCount: 85,
      startTime: "2:00 PM",
      endTime: "5:00 PM"
    },
    {
      course: "ME303",
      date: new Date("2025-04-11"),
      timeSlot: 1,
      venue: "Hall C",
      branches: ["Mech"],
      years: [2],
      semesters: [3],
      studentCount: 85,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
    },
    {
      course: "CS501",
      date: new Date("2025-04-11"),
      timeSlot: 2,
      venue: "Hall A",
      branches: ["CSE"],
      years: [3],
      semesters: [5],
      studentCount: 110,
      startTime: "2:00 PM",
      endTime: "5:00 PM"
    },
    {
      course: "CS502",
      date: new Date("2025-04-13"),
      timeSlot: 1,
      venue: "Hall A",
      branches: ["CSE"],
      years: [3],
      semesters: [5],
      studentCount: 110,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
    },
    {
      course: "CS503",
      date: new Date("2025-04-13"),
      timeSlot: 2,
      venue: "Hall A",
      branches: ["CSE"],
      years: [3],
      semesters: [5],
      studentCount: 110,
      startTime: "2:00 PM",
      endTime: "5:00 PM"
    },
    {
      course: "CS504",
      date: new Date("2025-04-15"),
      timeSlot: 1,
      venue: "Hall A",
      branches: ["CSE"],
      years: [3],
      semesters: [5],
      studentCount: 110,
      startTime: "9:00 AM",
      endTime: "12:00 PM"
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

  return (
    <div className="card mb-4">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0 d-flex justify-content-between align-items-center">
          <span>Sample Output Preview</span>
          <button 
            className="btn btn-sm btn-light" 
            onClick={() => setShowSample(!showSample)}
          >
            {showSample ? 'Hide Sample' : 'Show Sample'}
          </button>
        </h5>
      </div>
      {showSample && (
        <div className="card-body">
          <div className="alert alert-info">
            <p><strong>This is a sample output</strong> showing how the exam schedule might look after processing student data.</p>
            <p>The following schedule is based on sample data for CSE, ECE, and Mechanical Engineering departments.</p>
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
          
          <div className="mt-4">
            <h6>Sample Excel File Format</h6>
            <div className="table-responsive">
              <table className="table table-sm table-bordered">
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
                    <td>CSE2102</td>
                    <td>Priya Singh</td>
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
      )}
    </div>
  );
};

export default SampleData;