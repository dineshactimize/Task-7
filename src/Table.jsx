import React, { useState } from 'react'

const Table = () => {
  const [entries, setEntries] = useState([])
  const [name, setName] = useState("")
  const [place, setPlace] = useState("")
  const [phone, setPhone] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [viewingEntry, setViewingEntry] = useState(null)



  const resetForm = () => {
    setName("")
    setPlace("")
    setPhone("")
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      alert('Please enter a name')
      return
    }
    else if(name.length<3){
      alert('length must be greater than 3')
      return
    }
    if (!place.trim()) {
      alert('Please enter a place')
      return
    }
    if (!phone.trim()) {
      alert('Please enter a phone')
      return
    }
    if (editingId !== null) {
      // update
      setEntries(prev => prev.map(it => it.id === editingId ? { ...it, name: name.trim(), place: place.trim(), phone: phone.trim() } : it))
    } else {
      // add
      const entry = { id: Date.now(), name: name.trim(), place: place.trim(), phone: phone.trim() }
      setEntries(prev => [...prev, entry])
    }

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
    setEntries(prev => prev.filter(it => it.id !== id))
    if (viewingEntry && viewingEntry.id === id) setViewingEntry(null)
    if (editingId === id) resetForm()
  }

  const handleView = (entry) => {
    setViewingEntry(entry)
    setEditingId(null)
  }

  return (
    <div>


      


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit} className='form'>
                <label>Name</label><br />
                <input type="text" placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>Place</label><br />
                <input type="text" placeholder='PLACE' value={place} onChange={(e) => setPlace(e.target.value)} /><br />
                <label>Phone</label><br />
                <input type="text" placeholder='PHONE' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <br />
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                {editingId && <button type="button" onClick={resetForm} style={{ marginLeft: 8 }}>Cancel</button>}
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='boxx p-2'>
         <div className='d-flex justify-content-end'>
        <button type="button"  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add
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
              <td colSpan={5} style={{ textAlign: 'center', padding: 12 }}>No entries yet. Add one using the form above.</td>
            </tr>
          )}

          {entries.map((entry, idx) => (
            <tr key={entry.id}>
              <td>{idx + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.place}</td>
              <td>{entry.phone}</td>
              <td>
                <button type="button" onClick={() => handleView(entry)}  data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{ marginRight: 6 }}>View</button>
                <button type="button" onClick={() => handleEdit(entry)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginRight: 6 }}>Edit</button>
                <button type="button" onClick={() => handleDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      

    <div className='d-block d-lg-none'>
      <div className="container-fluid mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {entries.length === 0 && (
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text text-center">No entries yet. Click "Add" to add one.</p>
                </div>
              </div>
            </div>
          )}
          {entries.map((entry, idx) => (
            <div className="col" key={entry.id}>
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Name:</strong>  {entry.name} <br />
                    <strong>S.No:</strong> {idx + 1}<br />
                    <strong>Place:</strong> {entry.place}<br />
                    <strong>Phone:</strong> {entry.phone}
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => handleView(entry)}>View</button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(entry)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>




<div class="modal fade1" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel"> <h4>Viewing</h4></h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               {viewingEntry && (
        <div style={{ marginTop: 12, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
         
          <div><strong>Name:</strong> {viewingEntry.name}</div>
          <div><strong>Place:</strong> {viewingEntry.place}</div>
          <div><strong>Phone:</strong> {viewingEntry.phone}</div>
          {/* <div style={{ marginTop: 8 }}>
            <button onClick={() => handleEdit(viewingEntry)} style={{ marginRight: 8 }}>Edit</button>
            <button onClick={() => setViewingEntry(null)}>Close</button>
          </div> */}
        </div>
      )}
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(viewingEntry)} style={{ marginRight: 8 }}>Edit</button>
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Table
