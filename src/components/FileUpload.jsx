// components/FileUpload.jsx
import React from 'react';
import * as XLSX from 'xlsx';

const FileUpload = ({ 
  setStudentData, 
  setBranches, 
  setYears, 
  setSemesters, 
  setError,
  studentData,
  branches,
  years,
  semesters
}) => {
  // Handle file upload
  const handleFileUpload = (e) => {
    setError('');
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          setError('The uploaded Excel file is empty');
          return;
        }
        
        // Verify required columns exist
        const requiredColumns = ['Student ID', 'Name', 'Branch', 'Year', 'Semester', 'Courses'];
        const fileColumns = Object.keys(jsonData[0]);
        
        const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col));
        if (missingColumns.length > 0) {
          setError(`Missing required columns: ${missingColumns.join(', ')}`);
          return;
        }
        
        // Extract unique branches, years, and semesters
        const uniqueBranches = [...new Set(jsonData.map(item => item.Branch))];
        const uniqueYears = [...new Set(jsonData.map(item => item.Year))];
        const uniqueSemesters = [...new Set(jsonData.map(item => item.Semester))];
        
        setBranches(uniqueBranches);
        setYears(uniqueYears);
        setSemesters(uniqueSemesters);
        setStudentData(jsonData);
        
      } catch (err) {
        console.error('Error processing Excel file:', err);
        setError('Error processing the Excel file. Please check the format.');
      }
    };
    
    reader.onerror = () => {
      setError('Error reading the file');
    };
    
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Step 1: Upload Student Data</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label">Upload Excel File with Student Data</label>
          <input 
            type="file" 
            className="form-control" 
            id="fileUpload" 
            accept=".xlsx, .xls" 
            onChange={handleFileUpload}
          />
          <small className="text-muted">
            The Excel file should contain columns: Student ID, Name, Branch, Year, Semester, Courses
          </small>
        </div>
        
        {studentData && (
          <div className="alert alert-success">
            <p className="mb-1"><strong>Data loaded successfully!</strong></p>
            <p className="mb-1">Branches: {branches.join(', ')}</p>
            <p className="mb-1">Years: {years.join(', ')}</p>
            <p className="mb-1">Semesters: {semesters.join(', ')}</p>
            <p className="mb-0">Total Students: {studentData.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;