// components/DemoImage.jsx
import React, { useState } from 'react';

const DemoImage = () => {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="card mb-4">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0 d-flex justify-content-between align-items-center">
          <span>Visual Output Examples</span>
          <button 
            className="btn btn-sm btn-light" 
            onClick={() => setShowImages(!showImages)}
          >
            {showImages ? 'Hide Examples' : 'Show Examples'}
          </button>
        </h5>
      </div>
      {showImages && (
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h6 className="mb-0">Excel File Upload</h6>
                </div>
                <div className="card-body text-center">
                  <img 
                    src="/api/placeholder/640/480" 
                    alt="Excel file upload example" 
                    className="img-fluid border rounded"
                    style={{ maxHeight: '300px' }}
                  />
                  <p className="mt-3">Upload your student data Excel file containing the required columns</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-success text-white">
                  <h6 className="mb-0">Generated Schedule Example</h6>
                </div>
                <div className="card-body text-center">
                  <img 
                    src="/api/placeholder/640/480" 
                    alt="Generated schedule example" 
                    className="img-fluid border rounded"
                    style={{ maxHeight: '300px' }}
                  />
                  <p className="mt-3">The system generates a comprehensive exam schedule with conflict detection</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-info text-white">
                  <h6 className="mb-0">Schedule Configuration</h6>
                </div>
                <div className="card-body text-center">
                  <img 
                    src="/api/placeholder/640/480" 
                    alt="Schedule configuration example" 
                    className="img-fluid border rounded"
                    style={{ maxHeight: '300px' }}
                  />
                  <p className="mt-3">Configure exam dates, duration, venues and other parameters</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-warning text-dark">
                  <h6 className="mb-0">Excel Export Example</h6>
                </div>
                <div className="card-body text-center">
                  <img 
                    src="/api/placeholder/640/480" 
                    alt="Excel export example" 
                    className="img-fluid border rounded"
                    style={{ maxHeight: '300px' }}
                  />
                  <p className="mt-3">Export your final schedule to Excel for distribution and printing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoImage;