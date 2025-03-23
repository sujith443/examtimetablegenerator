// components/DemoImage.jsx
import React, { useState } from 'react';

const DemoImage = () => {
  const [showImages, setShowImages] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const demoImages = [
    {
      id: 'upload',
      title: 'Excel File Upload',
      description: 'Upload your student data Excel file with the required columns via drag-and-drop or file browser',
      color: 'primary',
      icon: 'file-earmark-excel'
    },
    {
      id: 'config',
      title: 'Schedule Configuration',
      description: 'Set exam dates, duration, venue preferences and other scheduling parameters',
      color: 'info',
      icon: 'sliders'
    },
    {
      id: 'schedule',
      title: 'Generated Schedule View',
      description: 'View your generated exam schedule in an intuitive calendar or table format',
      color: 'success',
      icon: 'calendar2-check'
    },
    {
      id: 'conflicts',
      title: 'Conflict Detection',
      description: 'The system automatically identifies and highlights scheduling conflicts',
      color: 'warning',
      icon: 'exclamation-triangle'
    },
    {
      id: 'export',
      title: 'Excel Export',
      description: 'Export your final schedule to Excel format for distribution and printing',
      color: 'secondary',
      icon: 'file-earmark-spreadsheet'
    },
    {
      id: 'filter',
      title: 'Filtering Options',
      description: 'Filter the schedule by branch, year, or semester for custom views',
      color: 'dark',
      icon: 'funnel'
    }
  ];
  
  // Full-size image modal
  const ImageModal = ({ image, onClose }) => {
    if (!image) return null;
    
    return (
      <div className="modal-backdrop show" style={{ display: 'block', background: 'rgba(0,0,0,0.7)' }}>
        <div className="modal show d-block" style={{ pointerEvents: 'none' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0">
              <div className={`modal-header bg-${image.color} text-white`}>
                <h5 className="modal-title">
                  <i className={`bi bi-${image.icon} me-2`}></i>
                  {image.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={onClose}
                  style={{ pointerEvents: 'auto' }}
                ></button>
              </div>
              <div className="modal-body p-0">
                <img 
                  src={`/api/placeholder/1200/800`} 
                  alt={image.title} 
                  className="img-fluid w-100"
                />
              </div>
              <div className="modal-footer">
                <p className="text-muted mb-0">{image.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-images me-2"></i>
          Visual Examples
        </h5>
        <button 
          className={`btn btn-sm ${showImages ? 'btn-danger' : 'btn-light'}`}
          onClick={() => setShowImages(!showImages)}
        >
          <i className={`bi bi-${showImages ? 'eye-slash' : 'eye'} me-1`}></i>
          {showImages ? 'Hide Examples' : 'Show Examples'}
        </button>
      </div>
      
      {showImages && (
        <div className="card-body">
          <div className="row g-4">
            {demoImages.map((image) => (
              <div className="col-md-6 col-lg-4" key={image.id}>
                <div className={`card h-100 shadow-sm border-${image.color}`}>
                  <div className={`card-header bg-${image.color} ${['light', 'warning', 'info'].includes(image.color) ? 'text-dark' : 'text-white'}`}>
                    <h6 className="mb-0">
                      <i className={`bi bi-${image.icon} me-2`}></i>
                      {image.title}
                    </h6>
                  </div>
                  <div className="card-img-top position-relative img-hover-zoom">
                    <img 
                      src={`/api/placeholder/600/400`}
                      alt={image.title} 
                      className="img-fluid cursor-pointer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveImage(image)}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center hover-overlay">
                      <button 
                        className="btn btn-light btn-sm rounded-circle"
                        onClick={() => setActiveImage(image)}
                      >
                        <i className="bi bi-zoom-in"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <p className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Click on any image to view in larger size
            </p>
          </div>
        </div>
      )}
      
      {/* Full-size image modal */}
      <ImageModal 
        image={activeImage} 
        onClose={() => setActiveImage(null)} 
      />
    </div>
  );
};

export default DemoImage;