// components/FileUpload.jsx
import React, { useState, useRef } from 'react';
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
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  
  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Trigger file input click
  const handleFileAreaClick = () => {
    fileInputRef.current.click();
  };
  
  // Process the uploaded file
  const processFile = (file) => {
    setIsProcessing(true);
    setError('');
    
    if (!file) {
      setIsProcessing(false);
      return;
    }
    
    // Check file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      setIsProcessing(false);
      return;
    }
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { 
          type: 'array',
          cellDates: true,
          cellStyles: true
        });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          setError('The uploaded Excel file is empty');
          setIsProcessing(false);
          return;
        }
        
        // Verify required columns exist
        const requiredColumns = ['Student ID', 'Name', 'Branch', 'Year', 'Semester', 'Courses'];
        const fileColumns = Object.keys(jsonData[0]);
        
        const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col));
        if (missingColumns.length > 0) {
          setError(`Missing required columns: ${missingColumns.join(', ')}`);
          setIsProcessing(false);
          return;
        }
        
        // Extract unique branches, years, and semesters
        const uniqueBranches = [...new Set(jsonData.map(item => item.Branch))];
        const uniqueYears = [...new Set(jsonData.map(item => item.Year))];
        const uniqueSemesters = [...new Set(jsonData.map(item => item.Semester))];
        
        // Sort years and semesters numerically
        const sortedYears = [...uniqueYears].sort((a, b) => a - b);
        const sortedSemesters = [...uniqueSemesters].sort((a, b) => a - b);
        
        // Clean and process the data
        const processedData = jsonData.map(student => {
          // Ensure courses are properly formatted
          if (typeof student.Courses === 'string') {
            student.Courses = student.Courses.split(',').map(course => course.trim()).filter(Boolean);
          } else if (typeof student.Courses === 'number') {
            student.Courses = [student.Courses.toString()];
          } else if (!student.Courses) {
            student.Courses = [];
          }
          
          return student;
        });
        
        setBranches(uniqueBranches);
        setYears(sortedYears);
        setSemesters(sortedSemesters);
        setStudentData(processedData);
        
      } catch (err) {
        console.error('Error processing Excel file:', err);
        setError('Error processing the Excel file. Please check the format.');
      } finally {
        setIsProcessing(false);
        setDragActive(false);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading the file');
      setIsProcessing(false);
      setDragActive(false);
    };
    
    reader.readAsArrayBuffer(file);
  };
  
  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Step 1: Upload Student Data</h5>
        {studentData && (
          <span className="badge bg-light text-primary">
            <i className="bi bi-check-circle-fill me-1"></i>
            Data Loaded
          </span>
        )}
      </div>
      <div className="card-body">
        <div 
          className={`file-upload-area mb-3 ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleFileAreaClick}
        >
          <input 
            type="file" 
            className="d-none" 
            ref={fileInputRef}
            accept=".xlsx, .xls" 
            onChange={handleFileChange}
          />
          
          {isProcessing ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5>Processing your file...</h5>
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="bi bi-file-earmark-excel display-4 text-success mb-3"></i>
              <h5>{fileName || 'Drag & Drop your Excel file here'}</h5>
              <p className="text-muted mb-1">or click to browse</p>
              <small className="d-block text-muted">
                The Excel file should contain columns: <br />Student ID, Name, Branch, Year, Semester, Courses
              </small>
            </div>
          )}
        </div>
        
        {studentData && (
          <div className="bg-light p-3 rounded">
            <div className="row">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-info-circle-fill text-primary me-2"></i>
                      Data Summary
                    </h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total Students
                        <span className="badge bg-primary rounded-pill">{studentData.length}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total Branches
                        <span className="badge bg-primary rounded-pill">{branches.length}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Years
                        <span className="badge bg-primary rounded-pill">{years.join(', ')}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Semesters
                        <span className="badge bg-primary rounded-pill">{semesters.join(', ')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-building-fill text-primary me-2"></i>
                      Branches
                    </h6>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                      {branches.map((branch, index) => (
                        <span key={index} className="badge bg-info text-dark py-2 px-3">
                          {branch}
                        </span>
                      ))}
                    </div>
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

export default FileUpload;