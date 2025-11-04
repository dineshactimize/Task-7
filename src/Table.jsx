import React, { useEffect, useState } from 'react'

const Table = () => {
  const [entries, setEntries] = useState(()=>{
  let temp =localStorage.getItem('users');
   return temp ? JSON.parse(temp):[];
})
  const [name, setName] = useState("")
  const [place, setPlace] = useState("")
  const [phone, setPhone] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [viewingEntry, setViewingEntry] = useState(null)

  const[errname,setErrname] = useState("")
  const[errplace,setErrplace]=useState("")
  const[errphone,setErrphone]=useState("")

useEffect(()=>{
  setErrname("");
  setErrplace("");
  setErrphone("");
},[name,place,phone])

  const resetForm = () => {
    setName("")
    setPlace("")
    setPhone("")
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setErrname('Please enter a name')
      return
    }
    else if(name.length<3){
      setErrname('length must be greater than 3')
    
      return
    }
    if (!place.trim()) {
      setErrplace('Please enter a place')
      return
    }
    if (!phone.trim()) {
      setErrphone('Please enter a phone')
      return
    }
    else if(!isNaN(phone)===false || phone.length!==10){
      setErrphone('Please enter a valid phone number')
      return
    }
    if (editingId !== null) {
      setEntries(prev => {
        const updated = prev.map(it => it.id === editingId ? { ...it, name: name.trim(), place: place.trim(), phone: phone.trim() } : it);
        localStorage.setItem('users', JSON.stringify(updated));
        alert('Entry updated successfully!');
        return updated;
      })
    } else {
      const entry = { id: Math.floor(Math.random()*100), name: name.trim(), place: place.trim(), phone: phone.trim() }
      setEntries(prev => {
        const updated = [...prev, entry];
        localStorage.setItem('users', JSON.stringify(updated));
        alert('Entry added successfully!');
        return updated;
      })
    }
    console.log('object')
    resetForm()
    setViewingEntry(null)
  }


  const handleEdit = (entry) => {
    setEditingId(entry.id)
    setName(entry.name)
    setPlace(entry.place)
    setPhone(entry.phone)
    setViewingEntry(null)
  }

  const handleDelete = (id) => {
    const ok = window.confirm('Are you sure you want to delete this entry?')
    if (!ok) return
    setEntries(prev => {
      const updated = prev.filter(it => it.id !== id);
      localStorage.setItem('users', JSON.stringify(updated));
      alert('Entry deleted successfully!');
      return updated;
    })

    if (viewingEntry && viewingEntry.id === id) setViewingEntry(null)
    if (editingId === id) resetForm()
  }

  const handleView = (entry) => {
    setViewingEntry(entry)
    setEditingId(null)
  }

  return (
    <div>



     
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id="addModalLabel">Add New Student</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='form'>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className={`form-control ${errname ? 'is-invalid' : ''}`}placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} />
                  {errname && <div className="invalid-feedback">{errname}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Place</label>
                  <input type="text" className={`form-control ${errplace ? 'is-invalid' : ''}`}placeholder='Enter Place'value={place} onChange={(e) => setPlace(e.target.value)} />
                  {errplace && <div className="invalid-feedback">{errplace}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className={`form-control ${errphone ? 'is-invalid' : ''}`} placeholder='Enter Phone Number' value={phone}  onChange={(e) => setPhone(e.target.value)} />
                  {errphone && <div className="invalid-feedback">{errphone}</div>}
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
                  <button className="btn btn-primary" type="submit">Add Student</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Student Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='form'>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input 
                    type="text" 
                    className={`form-control ${errname ? 'is-invalid' : ''}`}
                    placeholder='Enter your Name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                  {errname && <div className="invalid-feedback">{errname}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Place</label>
                  <input 
                    type="text" 
                    className={`form-control ${errplace ? 'is-invalid' : ''}`}
                    placeholder='Enter Place' 
                    value={place} 
                    onChange={(e) => setPlace(e.target.value)} 
                  />
                  {errplace && <div className="invalid-feedback">{errplace}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input 
                    type="text" 
                    className={`form-control ${errphone ? 'is-invalid' : ''}`}
                    placeholder='Enter Phone Number' 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                  {errphone && <div className="invalid-feedback">{errphone}</div>}
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" type="button" data-bs-dismiss="modal" onClick={resetForm}>Cancel</button>
                  <button className="btn btn-primary" type="submit">Update Student</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className='boxx p-2'>
         <div className='text-center'>
          <h1>React CRUD Operations</h1>
        </div>
        <div>
          <h4>Student Details:</h4>
        </div>
         <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-primary"data-bs-toggle="modal" data-bs-target="#addModal"onClick={resetForm}>
            Add Student
          </button>
        </div>
     
      <div className='d-none d-lg-block'>
       
      <table className='first' style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>NAME</th>
            <th>PLACE</th>
            <th>PHONE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody className='body'>
          {entries.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: 12 }}>No entries yet.</td>
            </tr>
          )}

          {entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index+1}</td>
              <td>{entry.name}</td>
              <td>{entry.place}</td>
              <td>{entry.phone}</td>
              <td>
                <button 
                  type="button" className='btn btn-primary 'onClick={() => handleView(entry)}data-bs-toggle="modal"data-bs-target="#exampleModal1"style={{ marginRight: 6 }}>
                  <i className="bi bi-eye-fill"></i>
                </button>
                <button 
                  type="button" className='btn btn-warning ' onClick={() => handleEdit(entry)} data-bs-toggle="modal" data-bs-target="#editModal" style={{ marginRight: 6 }}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button 
                  type="button" className='btn btn-danger ' onClick={() => handleDelete(entry.id)}>
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      

    <div className='d-block d-lg-none'>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {entries.length === 0 && (
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text text-center">No entries yet. Click "Add" to add one.</p>
                </div>
              </div>
            </div>
          )}
          {entries.map((entry, index) => (
            <div className="col" key={entry.id}>
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text">
                    <strong>S.No:</strong> {index + 1}<br />
                    <strong>Name:</strong>  {entry.name} <br />
                    <strong>Place:</strong> {entry.place}<br />
                    <strong>Phone:</strong> {entry.phone}
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => handleView(entry)}><i class="bi bi-eye-fill"></i></button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(entry)}><i class="bi bi-pencil-square"></i></button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry.id)}><i class="bi bi-trash3-fill"></i></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>




<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">View Student Details</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               {viewingEntry && (
        <div style={{ marginTop: 12, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
         
          <div><strong>Name:</strong> {viewingEntry.name}</div>
          <div><strong>Place:</strong> {viewingEntry.place}</div>
          <div><strong>Phone:</strong> {viewingEntry.phone}</div>
        </div>
      )}
            </div>
            <div className="modal-footer">
              <button 
                type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => handleEdit(viewingEntry)}>
                Edit
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Table
