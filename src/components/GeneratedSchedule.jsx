// components/GeneratedSchedule.jsx
import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/scheduleUtils';
import ScheduleSummary from './ScheduleSummary';

const GeneratedSchedule = ({ examSchedule, onExport, conflicts }) => {
  const [activeView, setActiveView] = useState('calendar');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  
  // Reset filters when exam schedule changes
  useEffect(() => {
    setFilterBranch('all');
    setFilterYear('all');
    setFilterSemester('all');
  }, [examSchedule]);
  
  // Get unique filter options
  const branches = ['all', ...Array.from(new Set(examSchedule.flatMap(exam => exam.branches)))];
  const years = ['all', ...Array.from(new Set(examSchedule.flatMap(exam => exam.years)))];
  const semesters = ['all', ...Array.from(new Set(examSchedule.flatMap(exam => exam.semesters)))];
  
  // Filter exams based on selection
  const filteredExams = examSchedule.filter(exam => {
    if (filterBranch !== 'all' && !exam.branches.includes(filterBranch)) return false;
    if (filterYear !== 'all' && !exam.years.includes(parseInt(filterYear))) return false;
    if (filterSemester !== 'all' && !exam.semesters.includes(parseInt(filterSemester))) return false;
    return true;
  });
  
  // Group exams by date for calendar view
  const examsByDate = filteredExams.reduce((acc, exam) => {
    const dateStr = formatDate(exam.date);
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(exam);
    return acc;
  }, {});
  
  // Get courses with conflicts
  const conflictCourses = conflicts.flatMap(conflict => conflict.courses);
  
  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Generated Exam Schedule</h5>
        <div>
          <button 
            className="btn btn-light btn-sm me-2" 
            onClick={onExport}
            title="Export to Excel"
          >
            <i className="bi bi-file-earmark-excel me-1"></i>
            Export
          </button>
          <div className="btn-group btn-group-sm">
            <button 
              className={`btn btn-${activeView === 'calendar' ? 'light' : 'outline-light'}`}
              onClick={() => setActiveView('calendar')}
              title="Calendar View"
            >
              <i className="bi bi-calendar3"></i>
            </button>
            <button 
              className={`btn btn-${activeView === 'table' ? 'light' : 'outline-light'}`}
              onClick={() => setActiveView('table')}
              title="Table View"
            >
              <i className="bi bi-table"></i>
            </button>
            <button 
              className={`btn btn-${activeView === 'summary' ? 'light' : 'outline-light'}`}
              onClick={() => setActiveView('summary')}
              title="Summary Dashboard"
            >
              <i className="bi bi-graph-up"></i>
            </button>
            <button 
              className={`btn btn-${activeView === 'conflicts' ? 'light' : 'outline-light'}`}
              onClick={() => setActiveView('conflicts')}
              title="Conflicts View"
            >
              <i className="bi bi-exclamation-triangle"></i>
              {conflicts.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {conflicts.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        {/* Summary View */}
        {activeView === 'summary' && (
          <ScheduleSummary examSchedule={examSchedule} />
        )}
        
        {/* Filters - Show for all views except summary */}
        {activeView !== 'summary' && (
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label">Branch</label>
              <select 
                className="form-select"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
              >
                {branches.map((branch, idx) => (
                  <option key={idx} value={branch}>
                    {branch === 'all' ? 'All Branches' : branch}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Year</label>
              <select 
                className="form-select"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                {years.map((year, idx) => (
                  <option key={idx} value={year}>
                    {year === 'all' ? 'All Years' : `Year ${year}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Semester</label>
              <select 
                className="form-select"
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
              >
                {semesters.map((semester, idx) => (
                  <option key={idx} value={semester}>
                    {semester === 'all' ? 'All Semesters' : `Semester ${semester}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {/* Calendar View */}
        {activeView === 'calendar' && (
          <div className="row g-4">
            {Object.keys(examsByDate).sort((a, b) => {
              return new Date(a.replace(/(\w{3}) (\w{3}) (\d+) (\d+)/, '$2 $3 $4')) - 
                     new Date(b.replace(/(\w{3}) (\w{3}) (\d+) (\d+)/, '$2 $3 $4'));
            }).map((dateStr) => (
              <div className="col-md-6 col-lg-4" key={dateStr}>
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">{dateStr}</h6>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      {examsByDate[dateStr]
                        .sort((a, b) => a.timeSlot - b.timeSlot)
                        .map((exam, idx) => (
                          <li 
                            key={idx} 
                            className={`list-group-item list-group-item-action ${
                              conflictCourses.includes(exam.course) ? 'list-group-item-warning' : ''
                            }`}
                          >
                            <div className="d-flex justify-content-between">
                              <span className="badge bg-info text-dark">
                                {exam.startTime} - {exam.endTime}
                              </span>
                              <span className="badge bg-secondary">
                                {exam.venue}
                              </span>
                            </div>
                            <h6 className="mt-2 mb-1">{exam.course}</h6>
                            <small className="text-muted">
                              Branches: {exam.branches.join(', ')}
                            </small>
                            <div>
                              <small className="text-muted">
                                Years: {exam.years.join(', ')} | 
                                Semesters: {exam.semesters.join(', ')} | 
                                Students: {exam.studentCount}
                              </small>
                            </div>
                          </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            
            {Object.keys(examsByDate).length === 0 && (
              <div className="col-12 text-center py-5">
                <i className="bi bi-calendar-x text-muted display-1"></i>
                <h4 className="mt-3 text-muted">No exams match your filter criteria</h4>
                <button 
                  className="btn btn-outline-primary mt-3"
                  onClick={() => {
                    setFilterBranch('all');
                    setFilterYear('all');
                    setFilterSemester('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Table View */}
        {activeView === 'table' && (
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
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam, index) => (
                    <tr 
                      key={index}
                      className={conflictCourses.includes(exam.course) ? 'table-warning' : ''}
                    >
                      <td>{formatDate(exam.date)}</td>
                      <td>{exam.startTime} - {exam.endTime}</td>
                      <td>
                        <strong>{exam.course}</strong>
                        {conflictCourses.includes(exam.course) && (
                          <span className="ms-2 badge bg-warning text-dark">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            Conflict
                          </span>
                        )}
                      </td>
                      <td>{exam.venue}</td>
                      <td>{exam.branches.join(', ')}</td>
                      <td>{exam.years.join(', ')}</td>
                      <td>{exam.semesters.join(', ')}</td>
                      <td>{exam.studentCount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No exams match your filter criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Conflict Analysis */}
        {activeView === 'conflicts' && (
          <div>
            <h6 className="mb-3">Conflict Analysis</h6>
            {conflicts.length === 0 ? (
              <div className="alert alert-success">
                <div className="d-flex">
                  <i className="bi bi-check-circle-fill fs-4 me-3"></i>
                  <div>
                    <h6 className="mb-1">No scheduling conflicts detected!</h6>
                    <p className="mb-0">All exams are properly scheduled with no overlapping students.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="alert alert-warning mb-4">
                  <div className="d-flex">
                    <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                    <div>
                      <h6 className="mb-1">Warning: {conflicts.length} scheduling conflicts detected!</h6>
                      <p className="mb-0">The following exams have overlapping students which may cause scheduling issues.</p>
                    </div>
                  </div>
                </div>
                
                <div className="row g-4">
                  {conflicts.map((conflict, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="card shadow-sm border-warning h-100">
                        <div className="card-header bg-warning text-dark">
                          <h6 className="mb-0">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            Conflict #{index + 1}: {conflict.date}
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <strong>Time:</strong> {conflict.time}
                          </div>
                          <div className="mb-3">
                            <strong>Conflicting Courses:</strong>
                            <div className="d-flex gap-2 mt-1">
                              {conflict.courses.map((course, idx) => (
                                <span key={idx} className="badge bg-primary py-2 px-3">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-3">
                            <strong>Affected Student Groups:</strong>
                            <ul className="list-group list-group-flush mt-1">
                              {conflict.branches.length > 0 && (
                                <li className="list-group-item">
                                  <i className="bi bi-building me-2 text-primary"></i>
                                  Branches: {conflict.branches.join(', ')}
                                </li>
                              )}
                              {conflict.years.length > 0 && (
                                <li className="list-group-item">
                                  <i className="bi bi-mortarboard me-2 text-success"></i>
                                  Years: {conflict.years.join(', ')}
                                </li>
                              )}
                              {conflict.semesters.length > 0 && (
                                <li className="list-group-item">
                                  <i className="bi bi-calendar-week me-2 text-info"></i>
                                  Semesters: {conflict.semesters.join(', ')}
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="alert alert-light">
                            <small>
                              <i className="bi bi-info-circle me-1"></i>
                              Students in these groups will have two exams scheduled at the same time.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedSchedule;