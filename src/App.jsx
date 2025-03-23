// App.jsx - Main application container with fixes
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Import Bootstrap JS for interactive components
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FileUpload from "./components/FileUpload";
import ScheduleConfig from "./components/ScheduleConfig";
import GeneratedSchedule from "./components/GeneratedSchedule";
import Instructions from "./components/Instructions";
import SampleData from "./components/SampleData";
import DemoImage from "./components/DemoImage";
import ExcelTemplateGenerator from "./components/ExcelTemplateGenerator";
import ScheduleSummary from "./components/ScheduleSummary";
import {
  generateExamSchedule,
  exportToExcel,
  getConflictInfo,
} from "./utils/scheduleUtils";
import "./App.css";

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [examSchedule, setExamSchedule] = useState(null);
  const [venues, setVenues] = useState([
    "Hall A",
    "Hall B",
    "Hall C",
    "Hall D",
    "Hall E",
  ]);
  const [generationParams, setGenerationParams] = useState({
    startDate: "",
    endDate: "",
    examDuration: 3, // hours
    gapBetweenExams: 1, // days
    examsPerDay: 2,
  });
  const [showSchedule, setShowSchedule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("upload");

  // Set default dates on initial load
  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 14); // Start exams in 2 weeks

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 21); // 3 weeks exam period

    setGenerationParams({
      ...generationParams,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
  }, []);

  const handleGenerateSchedule = () => {
    setError("");
    setLoading(true);

    try {
      if (!studentData) {
        setError("Please upload student data first");
        setLoading(false);
        return;
      }

      if (!generationParams.startDate || !generationParams.endDate) {
        setError("Please set both start and end dates for the exam period");
        setLoading(false);
        return;
      }

      // Simulate processing time for better UX
      setTimeout(() => {
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
        setActiveTab("schedule");
      }, 1500);
    } catch (err) {
      console.error("Error generating exam schedule:", err);
      setError("Error generating exam schedule. Please try again.");
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <>
            <ExcelTemplateGenerator /> {/* Add this line */}
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
          </>
        );
      case "config":
        return (
          <ScheduleConfig
            generationParams={generationParams}
            setGenerationParams={handleParamChange}
            venues={venues}
            onVenueChange={handleVenueChange}
          />
        );
      case "schedule":
        return (
          showSchedule &&
          examSchedule && (
            <>
              <ScheduleSummary examSchedule={examSchedule} />
              <GeneratedSchedule
                examSchedule={examSchedule}
                onExport={handleExportExcel}
                conflicts={getConflictInfo(examSchedule)}
              />
            </>
          )
        );
      case "help":
        return (
          <>
            <Instructions />
            <DemoImage />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-2 text-center text-md-start mb-3 mb-md-0">
              <img
                src="/api/placeholder/120/120"
                alt="SVIT College Logo"
                className="img-fluid rounded-circle college-logo"
              />
            </div>
            <div className="col-md-8 text-center">
              <h1 className="mb-1 app-title">SVIT College Exam Scheduler</h1>
              <p className="text-light mb-0">
                B.Tech Examination Time Table Management System
              </p>
            </div>
            <div className="col-md-2 text-center text-md-end">
              <span className="badge bg-primary fs-6">Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container my-4">
        <ul className="nav nav-tabs nav-fill mb-4">
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeTab === "upload" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabChange("upload");
              }}
            >
              <i className="bi bi-upload me-2"></i>Upload Data
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeTab === "config" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabChange("config");
              }}
              style={{ cursor: !studentData ? "not-allowed" : "pointer" }}
            >
              <i className="bi bi-gear me-2"></i>Configure
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeTab === "schedule" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                if (examSchedule) handleTabChange("schedule");
              }}
              style={{ cursor: !examSchedule ? "not-allowed" : "pointer" }}
            >
              <i className="bi bi-calendar2-check me-2"></i>Schedule
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeTab === "help" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabChange("help");
              }}
            >
              <i className="bi bi-question-circle me-2"></i>Help
            </a>
          </li>
        </ul>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        {renderTabContent()}

        {activeTab !== "schedule" && (
          <div className="d-grid gap-2 mt-4">
            <button
              className="btn btn-primary btn-lg py-3 generate-btn"
              onClick={handleGenerateSchedule}
              disabled={
                !studentData ||
                loading ||
                !generationParams.startDate ||
                !generationParams.endDate
              }
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Generating Schedule...
                </>
              ) : (
                <>
                  <i className="bi bi-calendar2-check me-2"></i>
                  Generate Exam Schedule
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <footer className="bg-dark text-white py-3 mt-5">
        <div className="container text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} - SVIT College B.Tech Exam Time Table
            System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
