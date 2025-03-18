// App.jsx - Main application container
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from './components/FileUpload';
import ScheduleConfig from './components/ScheduleConfig';
import GeneratedSchedule from './components/GeneratedSchedule';
import Instructions from './components/Instructions';
import SampleData from './components/SampleData';
import DemoImage from './components/DemoImage';
import { generateExamSchedule, exportToExcel, getConflictInfo } from './utils/scheduleUtils';

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [examSchedule, setExamSchedule] = useState(null);
  const [venues, setVenues] = useState(['Hall A', 'Hall B', 'Hall C', 'Hall D', 'Hall E']);
  const [generationParams, setGenerationParams] = useState({
    startDate: '',
    endDate: '',
    examDuration: 3, // hours
    gapBetweenExams: 1, // days
    examsPerDay: 2
  });
  const [showSchedule, setShowSchedule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSchedule = () => {
    setError('');
    setLoading(true);
    
    try {
      if (!studentData) {
        setError('Please upload student data first');
        setLoading(false);
        return;
      }
      
      const result = generateExamSchedule(
        studentData,
        generationParams,
        venues
      );
      
      if (result.error) {
        setError(result.error);
      }
      
      setExamSchedule(result.schedule);
      setShowSchedule(true);
      setLoading(false);
    } catch (err) {
      console.error('Error generating exam schedule:', err);
      setError('Error generating exam schedule. Please try again.');
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (examSchedule) {
      exportToExcel(examSchedule);
    }
  };

  const handleVenueChange = (updatedVenues) => {
    setVenues(updatedVenues);
  };

  const handleParamChange = (updatedParams) => {
    setGenerationParams(updatedParams);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">B.Tech Exam Time Table System</h1>
      
      <FileUpload
        setStudentData={setStudentData}
        setBranches={setBranches}
        setYears={setYears}
        setSemesters={setSemesters}
        setError={setError}
        studentData={studentData}
        branches={branches}
        years={years}
        semesters={semesters}
      />
      
      <SampleData />
      
      <ScheduleConfig
        generationParams={generationParams}
        setGenerationParams={handleParamChange}
        venues={venues}
        onVenueChange={handleVenueChange}
      />
      
      <div className="d-grid gap-2 mb-4">
        <button 
          className="btn btn-primary btn-lg" 
          onClick={handleGenerateSchedule}
          disabled={!studentData || loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Generating Schedule...
            </>
          ) : 'Generate Exam Schedule'}
        </button>
      </div>
      
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}
      
      {showSchedule && examSchedule && (
        <GeneratedSchedule
          examSchedule={examSchedule}
          onExport={handleExportExcel}
          conflicts={getConflictInfo(examSchedule)}
        />
      )}
      
      <DemoImage />
      
      <Instructions />
    </div>
  );
};

export default App;