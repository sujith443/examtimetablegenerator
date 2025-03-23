// components/ScheduleConfig.jsx
import React, { useState, useEffect } from 'react';

const ScheduleConfig = ({ 
  generationParams, 
  setGenerationParams, 
  venues, 
  onVenueChange 
}) => {
  const [activeSection, setActiveSection] = useState('dates');
  
  // Handle parameter changes
  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setGenerationParams({
      ...generationParams,
      [name]: name === 'startDate' || name === 'endDate' ? value : Number(value)
    });
  };

  // Update venues
  const handleVenueChange = (index, value) => {
    const updatedVenues = [...venues];
    updatedVenues[index] = value;
    onVenueChange(updatedVenues);
  };

  // Add new venue
  const addVenue = () => {
    onVenueChange([...venues, `New Hall ${venues.length + 1}`]);
  };

  // Remove venue
  const removeVenue = (index) => {
    if (venues.length > 1) {
      onVenueChange(venues.filter((_, i) => i !== index));
    }
  };
  
  // Calculate total exam days
  const calculateExamDays = () => {
    if (!generationParams.startDate || !generationParams.endDate) return '?';
    
    const start = new Date(generationParams.startDate);
    const end = new Date(generationParams.endDate);
    const diffTime = Math.abs(end - start);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Adjust for weekends
    let weekends = 0;
    let currentDay = new Date(start);
    while (currentDay <= end) {
      if (currentDay.getDay() === 0 || currentDay.getDay() === 6) {
        weekends++;
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return diffDays - weekends;
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Step 2: Configure Exam Schedule Parameters</h5>
      </div>
      <div className="card-body">
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeSection === 'dates' ? 'active' : ''}`}
              onClick={() => setActiveSection('dates')}
            >
              <i className="bi bi-calendar3 me-2"></i>
              Exam Period
            </button>
          </li>
          <li className="nav-item ms-2">
            <button 
              className={`nav-link ${activeSection === 'options' ? 'active' : ''}`}
              onClick={() => setActiveSection('options')}
            >
              <i className="bi bi-sliders me-2"></i>
              Scheduling Options
            </button>
          </li>
          <li className="nav-item ms-2">
            <button 
              className={`nav-link ${activeSection === 'venues' ? 'active' : ''}`}
              onClick={() => setActiveSection('venues')}
            >
              <i className="bi bi-building me-2"></i>
              Venues
            </button>
          </li>
        </ul>
        
        {activeSection === 'dates' && (
          <div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 shadow-sm border-primary">
                  <div className="card-body">
                    <h6 className="card-title text-primary">
                      <i className="bi bi-calendar2-plus me-2"></i>
                      Start Date
                    </h6>
                    <p className="card-text text-muted small">
                      Set the first day of examination period
                    </p>
                    <div className="mt-3">
                      <input 
                        type="date" 
                        className="form-control form-control-lg" 
                        id="startDate" 
                        name="startDate"
                        value={generationParams.startDate}
                        onChange={handleParamChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 shadow-sm border-danger">
                  <div className="card-body">
                    <h6 className="card-title text-danger">
                      <i className="bi bi-calendar2-x me-2"></i>
                      End Date
                    </h6>
                    <p className="card-text text-muted small">
                      Set the last day of examination period
                    </p>
                    <div className="mt-3">
                      <input 
                        type="date" 
                        className="form-control form-control-lg" 
                        id="endDate" 
                        name="endDate"
                        value={generationParams.endDate}
                        onChange={handleParamChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {generationParams.startDate && generationParams.endDate && (
              <div className="alert alert-info mt-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                  <div>
                    <h6 className="mb-1">Exam Period Summary</h6>
                    <p className="mb-0">
                      The exam schedule will span <strong>{calculateExamDays()} working days</strong> (excluding weekends) from <strong>{new Date(generationParams.startDate).toLocaleDateString('en-IN')}</strong> to <strong>{new Date(generationParams.endDate).toLocaleDateString('en-IN')}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'options' && (
          <div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-clock me-2 text-primary"></i>
                      Exam Duration
                    </h6>
                    <p className="card-text text-muted small">
                      Duration of each examination in hours
                    </p>
                    <div className="mt-3">
                      <div className="d-flex align-items-center">
                        <input 
                          type="range" 
                          className="form-range me-2" 
                          id="examDuration" 
                          name="examDuration"
                          min="1"
                          max="4"
                          step="0.5"
                          value={generationParams.examDuration}
                          onChange={handleParamChange}
                        />
                        <span className="badge bg-primary">{generationParams.examDuration} hrs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-calendar2-plus me-2 text-success"></i>
                      Gap Between Exams
                    </h6>
                    <p className="card-text text-muted small">
                      Number of days between consecutive exams
                    </p>
                    <div className="mt-3">
                      <div className="d-flex align-items-center">
                        <input 
                          type="range" 
                          className="form-range me-2" 
                          id="gapBetweenExams" 
                          name="gapBetweenExams"
                          min="0"
                          max="5"
                          value={generationParams.gapBetweenExams}
                          onChange={handleParamChange}
                        />
                        <span className="badge bg-success">{generationParams.gapBetweenExams} day{generationParams.gapBetweenExams !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-calendar2-day me-2 text-info"></i>
                      Exams Per Day
                    </h6>
                    <p className="card-text text-muted small">
                      Maximum number of exams conducted per day
                    </p>
                    <div className="mt-3">
                      <div className="btn-group w-100" role="group">
                        {[1, 2, 3].map((num) => (
                          <button
                            key={num}
                            type="button"
                            className={`btn ${generationParams.examsPerDay === num ? 'btn-info' : 'btn-outline-info'}`}
                            onClick={() => {
                              setGenerationParams({
                                ...generationParams,
                                examsPerDay: num
                              });
                            }}
                          >
                            {num} {num === 1 ? 'Exam' : 'Exams'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'venues' && (
          <div>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">
                    <i className="bi bi-building me-2 text-primary"></i>
                    Available Exam Venues
                  </h6>
                  <button 
                    className="btn btn-sm btn-primary" 
                    onClick={addVenue}
                  >
                    <i className="bi bi-plus-circle me-1"></i> Add Venue
                  </button>
                </div>
                
                <div className="row g-3">
                  {venues.map((venue, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-geo-alt"></i>
                        </span>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={venue}
                          onChange={(e) => handleVenueChange(index, e.target.value)}
                          placeholder="Venue name"
                        />
                        <button 
                          className="btn btn-outline-danger" 
                          type="button"
                          onClick={() => removeVenue(index)}
                          disabled={venues.length <= 1}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="alert alert-warning">
              <div className="d-flex">
                <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                <div>
                  <h6 className="mb-1">Venue Assignment Logic</h6>
                  <p className="mb-0">
                    Venues will be automatically assigned based on the number of students:
                    <ul className="mb-0 mt-2">
                      <li>≤ 50 students: {venues[0] || "First venue"}</li>
                      <li>51-100 students: {venues[1] || "Second venue"}</li>
                      <li>101-150 students: {venues[2] || "Third venue"}</li>
                      <li>151-200 students: {venues[3] || "Fourth venue"}</li>
                      <li> 200 students: {venues[4] || "Fifth venue"}</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleConfig;