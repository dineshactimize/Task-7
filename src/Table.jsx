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



      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='form'>
                <label>Name</label><br />
                <input type="text" placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <p className='text-danger'>{errname}</p>
                <label>Place</label><br />
                <input type="text" placeholder='PLACE' value={place} onChange={(e) => setPlace(e.target.value)} /><br />
                <p className='text-danger'>{errplace}</p>

                <label>Phone</label><br />
                <input type="text" placeholder='PHONE' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <br />
                <p className='text-danger'>{errphone}</p>

                <button className='btb btn-primary' type="submit">{editingId ? 'Update' : 'Add'}</button>
                {editingId && <button className='btn btn-primary' type="button" onClick={resetForm} style={{ marginLeft: 8 }}>Cancel</button>}
              </form>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" >Save changes</button> */}
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

          {entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index+1}</td>
              <td>{entry.name}</td>
              <td>{entry.place}</td>
              <td>{entry.phone}</td>
              <td>
                <button type="button" className='btn btn-primary' onClick={() => handleView(entry)}  data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{ marginRight: 6 }}><i class="bi bi-eye-fill"></i></button>
                <button type="button" className='btn btn-warning' onClick={() => handleEdit(entry)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginRight: 6 }}><i class="bi bi-pencil-square"></i></button>
                <button type="button" className='btn btn-danger' onClick={() => handleDelete(entry.id)}><i class="bi bi-trash3-fill"></i></button>
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
          {entries.map((entry, index) => (
            <div className="col" key={entry.id}>
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Name:</strong>  {entry.name} <br />
                    <strong>S.No:</strong> {index + 1}<br />
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




<div className="modal fade1" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Viewing</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
               <button type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(viewingEntry)} style={{ marginRight: 8 }}>Edit</button>
               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Table
