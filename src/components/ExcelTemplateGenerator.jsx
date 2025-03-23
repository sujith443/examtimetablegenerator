// components/ExcelTemplateGenerator.jsx
import React from 'react';
import * as XLSX from 'xlsx';

const ExcelTemplateGenerator = () => {
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

  const downloadExcelTemplate = () => {
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
      
      // Generate Excel binary
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      
      // Create a Blob from the buffer
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      
      // Create temporary download link and trigger click
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'SVIT_Exam_Schedule_Template.xlsx';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating Excel template:", error);
      alert("Failed to generate Excel template. Error: " + error.message);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Excel Template Download</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <p>
              To help you get started quickly, you can download a template Excel file with the correct format for student data.
              This template includes:
            </p>
            <ul>
              <li>Sample student data to use as a reference</li>
              <li>Detailed instructions on how to fill out the data</li>
              <li>Proper column headers and formatting</li>
            </ul>
            <p>Once downloaded, open the file in Excel or any spreadsheet software, then modify it with your own data.</p>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <button 
              className="btn btn-primary btn-lg" 
              onClick={downloadExcelTemplate}
            >
              <i className="bi bi-file-earmark-excel me-2"></i>
              Download Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelTemplateGenerator;