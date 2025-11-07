import React, { useEffect, useState } from 'react'
import {db} from './firebase';
import{collection,addDoc,getDocs,deleteDoc,doc,updateDoc,query,orderBy}from 'firebase/firestore';
import { PropagateLoader } from 'react-spinners';
import { ToastContainer,toast } from 'react-toastify';
import StudentModal from './components/StudentModal';



const Table = () => {
  const [entries, setEntries] = useState([])
  const [name, setName] = useState("")
  const [place, setPlace] = useState("")
  const [phone, setPhone] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [viewingEntry, setViewingEntry] = useState(null)
  const [loading, setLoading] = useState(true)

  const[errname,setErrname] = useState("")
  const[errplace,setErrplace]=useState("")
  const[errphone,setErrphone]=useState("")

useEffect(()=>{
  setErrname("");
  setErrplace("");
  setErrphone("");
},[name,place,phone])

const notify=()=>{toast('Student added successfully!')};
const notifyupdate=()=>{toast('Student updated sucessdully!')};
const notifydelete=()=>{toast('Student deleted sucessdully!')};

useEffect(() => {
  const fetchEntries = async () => {
      try {
        setLoading(true)
        // const colRef = collection(db, 'users')
        const q = query(collection(db, 'users'), orderBy('time', 'asc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        setEntries(data)
      } catch (err) {
        console.error('Error fetching entries:', err)
      } finally {
        setLoading(false)
      }
  }
  fetchEntries()
}, [])

  const resetForm = () => {
    setName("")
    setPlace("")
    setPhone("")
    setEditingId(null)
  }

  const handleSubmit = async(e) => {
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
        const docRef = doc(db, 'users', editingId)
        await updateDoc(docRef, { name: name.trim(), place: place.trim(), phone: phone.trim() })
        setEntries(prev => prev.map(it => it.id === editingId ? { ...it, name: name.trim(), place: place.trim(), phone: phone.trim() } : it))
       notifyupdate();
      
    } else {
         
        const colRef = collection(db, 'users')
        const docRef = await addDoc(colRef, { time: Date.now(), name: name.trim(), place: place.trim(), phone: phone.trim() })
        const entry = { id: docRef.id, name: name.trim(), place: place.trim(), phone: phone.trim() }
        setEntries(prev => [...prev, entry])
        notify();
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

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this entry?')
    if (!ok) return
      await deleteDoc(doc(db, 'users', id))
      setEntries(prev => prev.filter(it => it.id !== id))
      notifydelete();
    
    if (viewingEntry && viewingEntry.id === id) setViewingEntry(null)
    if (editingId === id) resetForm()
  }

  const handleView = (entry) => {
    setViewingEntry(entry)
    setEditingId(null)
  }

  return (
    <div>
     
      <StudentModal 
        isEdit={editingId !== null}
        name={name}
        place={place}
        phone={phone}
        errname={errname}
        errplace={errplace}
        errphone={errphone}
        onSubmit={handleSubmit}
        onNameChange={(e) => setName(e.target.value)}
        onPlaceChange={(e) => setPlace(e.target.value)}
        onPhoneChange={(e) => setPhone(e.target.value)}
        onCancel={resetForm}
      />
      
      <div className='boxx p-2'>
         <div className='text-center'>
          <h1>React CRUD Operations</h1>
        </div>
        <div>
          <h4>Student Details:</h4>
        </div>
         <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#studentModal" onClick={resetForm}>
            Add Student
          </button>
           <ToastContainer/>
            
        </div>
     
      <div className='d-none d-lg-block'>
        {loading ? (
          <div className="d-flex justify-content-center" style={{ marginTop: 100 }}>
            <PropagateLoader color="#010710ff" loading={loading} size={20} />
          </div>
        ) : (
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
                      type="button" className='btn btn-primary ' onClick={() => handleView(entry)} data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{ marginRight: 6 }}>
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button 
                      type="button" className='btn btn-warning ' onClick={() => handleEdit(entry)} data-bs-toggle="modal" data-bs-target="#studentModal" style={{ marginRight: 6 }}>
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
        )}
      </div>
      

    <div className='d-block d-lg-none'>
      {loading ? (
        <div className="d-flex justify-content-center" style={{ marginTop: 100 }}>
          <PropagateLoader color="#010305ff" loading={loading} size={20} />
        </div>
      ) : (
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
                      <button className="btn btn-primary btn-sm" onClick={() => handleView(entry)}><i className="bi bi-eye-fill"></i></button>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(entry)}><i className="bi bi-pencil-square"></i></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry.id)}><i className="bi bi-trash3-fill"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
                type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#studentModal" onClick={() => handleEdit(viewingEntry)}>
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