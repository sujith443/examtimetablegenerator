import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const ScheduleSummary = ({ examSchedule }) => {
  const [summaryData, setSummaryData] = useState({
    totalExams: 0,
    totalDays: 0,
    examsByBranch: [],
    examsByVenue: [],
    examsByWeekday: []
  });
  
  useEffect(() => {
    if (!examSchedule || examSchedule.length === 0) return;
    
    // Calculate summary statistics
    const branches = {};
    const venues = {};
    const weekdays = {};
    const dates = new Set();
    
    // Process each exam
    examSchedule.forEach(exam => {
      // Count by branch
      exam.branches.forEach(branch => {
        branches[branch] = (branches[branch] || 0) + 1;
      });
      
      // Count by venue
      venues[exam.venue] = (venues[exam.venue] || 0) + 1;
      
      // Count by weekday
      const weekday = new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long' });
      weekdays[weekday] = (weekdays[weekday] || 0) + 1;
      
      // Track unique dates
      dates.add(exam.date.toDateString());
    });
    
    // Convert to array format for charts
    const examsByBranch = Object.entries(branches).map(([name, value]) => ({ name, value }));
    const examsByVenue = Object.entries(venues).map(([name, value]) => ({ name, value }));
    const examsByWeekday = Object.entries(weekdays).map(([name, value]) => ({ name, value }));
    
    // Sort weekdays in correct order
    const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    examsByWeekday.sort((a, b) => weekdayOrder.indexOf(a.name) - weekdayOrder.indexOf(b.name));
    
    // Set summary data
    setSummaryData({
      totalExams: examSchedule.length,
      totalDays: dates.size,
      examsByBranch,
      examsByVenue,
      examsByWeekday
    });
  }, [examSchedule]);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];
  
  if (!examSchedule || examSchedule.length === 0) {
    return null;
  }
  
  return (
    <div className="border rounded shadow-sm p-4 bg-white mb-4">
      <h5 className="mb-4 text-center">
        <i className="bi bi-graph-up me-2 text-primary"></i>
        Exam Schedule Summary
      </h5>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <h3 className="display-4 text-primary">{summaryData.totalExams}</h3>
              <p className="text-muted mb-0">Total Exams Scheduled</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <h3 className="display-4 text-success">{summaryData.totalDays}</h3>
              <p className="text-muted mb-0">Exam Days</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <h3 className="display-4 text-warning">
                {(summaryData.totalExams / Math.max(1, summaryData.totalDays)).toFixed(1)}
              </h3>
              <p className="text-muted mb-0">Exams Per Day</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">Exams by Branch</h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={summaryData.examsByBranch}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Exams" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">Exams by Weekday</h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={summaryData.examsByWeekday}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" name="Exams" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mx-auto">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h6 className="mb-0">Venue Utilization</h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={summaryData.examsByVenue}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {summaryData.examsByVenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSummary;