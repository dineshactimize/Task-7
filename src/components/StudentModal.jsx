import React from 'react';

const StudentModal = ({ 
  isEdit, 
  name, 
  place, 
  phone, 
  errname, 
  errplace, 
  errphone, 
  onSubmit, 
  onNameChange, 
  onPlaceChange, 
  onPhoneChange,
  onCancel
}) => {
  return (
    <div className="modal fade" id="studentModal" tabIndex="-1" aria-labelledby="studentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="studentModalLabel">
              {isEdit ? 'Edit Student Details' : 'Add New Student'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit} className='form '>
              <div className="mb-3 inputs">
                <label className="form-label">Name</label>
                <input 
                  type="text"className= {`form-control ${errname ? 'is-invalid' : ''}`}placeholder='Enter your Name'  value={name} onChange={onNameChange}/>
                {errname && <div className="invalid-feedback">{errname}</div>}
              </div>

              <div className="mb-3 inputs">
                <label className="form-label">Place</label>
                <input 
                  type="text" className={`form-control ${errplace ? 'is-invalid' : ''}`} placeholder='Enter Place' value={place} onChange={onPlaceChange}/>
                {errplace && <div className="invalid-feedback">{errplace}</div>}
              </div>

              <div className="mb-3 inputs">
                <label className="form-label">Phone</label>
                <input 
                  type="text" className={`form-control ${errphone ? 'is-invalid' : ''}`} placeholder='Enter Phone Number' value={phone} onChange={onPhoneChange}/>
                {errphone && <div className="invalid-feedback">{errphone}</div>}
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal" onClick={onCancel}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  {isEdit ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;