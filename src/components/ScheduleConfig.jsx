// components/ScheduleConfig.jsx
import React from 'react';

const ScheduleConfig = ({ 
  generationParams, 
  setGenerationParams, 
  venues, 
  onVenueChange 
}) => {
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
    onVenueChange([...venues, `Hall ${String.fromCharCode(65 + venues.length)}`]);
  };

  // Remove venue
  const removeVenue = (index) => {
    if (venues.length > 1) {
      onVenueChange(venues.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Step 2: Configure Exam Schedule Parameters</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="startDate" 
                name="startDate"
                value={generationParams.startDate}
                onChange={handleParamChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="endDate" 
                name="endDate"
                value={generationParams.endDate}
                onChange={handleParamChange}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="examDuration" className="form-label">Exam Duration (hours)</label>
              <input 
                type="number" 
                className="form-control" 
                id="examDuration" 
                name="examDuration"
                min="1"
                max="4"
                value={generationParams.examDuration}
                onChange={handleParamChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="gapBetweenExams" className="form-label">Gap Between Exam Days</label>
              <input 
                type="number" 
                className="form-control" 
                id="gapBetweenExams" 
                name="gapBetweenExams"
                min="0"
                max="5"
                value={generationParams.gapBetweenExams}
                onChange={handleParamChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="examsPerDay" className="form-label">Exams Per Day</label>
              <input 
                type="number" 
                className="form-control" 
                id="examsPerDay" 
                name="examsPerDay"
                min="1"
                max="3"
                value={generationParams.examsPerDay}
                onChange={handleParamChange}
              />
            </div>
          </div>
        </div>
        
        <h6 className="mt-3 mb-2">Available Venues</h6>
        <div className="row">
          {venues.map((venue, index) => (
            <div className="col-md-4 mb-2" key={index}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  value={venue}
                  onChange={(e) => handleVenueChange(index, e.target.value)}
                />
                <button 
                  className="btn btn-outline-danger" 
                  type="button"
                  onClick={() => removeVenue(index)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
          <div className="col-md-4 mb-2">
            <button className="btn btn-outline-primary" onClick={addVenue}>
              <i className="bi bi-plus-circle"></i> Add Venue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConfig;