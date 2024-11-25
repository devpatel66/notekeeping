import { useEffect, useState } from 'react'
import AddNote from './components/AddNote'
import Note from './components/Note'
import note from './appwrite/database'
import PopupMsg from './components/PopupMsg'
import EditNote from './components/EditNote'
import Popup from './components/Popup'

function App() {
  const [showAddNote, setShowAddNote] = useState(false)
  const [showEditNote, setShowEditNote] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pinNote, setPinNote] = useState([])
  const [popupMsg, setPopupMsg] = useState(false)
  const [editNoteData, setEditNoteData] = useState({})
  const [deletePopup, setDeletePopup] = useState({ open: false, id: "" })

  const fetchNotes = async (page) => {
    const notes = await note.getNotes(page)
    console.log(notes);

    setNotes(notes)
  }

  const nextPage = () => {
    setCurrentPage(prev => prev + 1)
  }
  const previousPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  const addToPin = (e,id, note) => {
    e.stopPropagation()
    const exits = pinNote.find(note => note.$id === id)
    if (exits) {
      setPopupMsg({ msg: "Note Already Added to Pin", type: "error" })
    }
    else {
      setPopupMsg({ msg: "Note Added to Pin", type: "success" })
      setPinNote(prev => [...prev, note])
    }
  }
  const deleteNote = async (id) => {
    const res = await note.deleteNote(id)
    if (res === 1) {
      setPopupMsg({ msg: "Note Deleted", type: "success" })
    }
    else {
      setPopupMsg({ msg: "Error While Deleting Note", type: "error" })
    }
  }

  const handleDeleteBtn = (e, id) => {
    e.stopPropagation()
    setDeletePopup({ open: true, id })
  }

  useEffect(() => {
    fetchNotes(currentPage)
  }, [showAddNote, currentPage])

  return (
    <>
      {
        showAddNote && <AddNote setShowAddNote={setShowAddNote} />
      }
      {
        showEditNote && <EditNote noteData={editNoteData} setShowEditNote={setShowEditNote} />
      }
      {
        popupMsg && <PopupMsg type={popupMsg.type} setMessage={setPopupMsg} message={popupMsg.msg} />
      }

      {
        deletePopup.open && <Popup title="Are you sure do you want delete this note ?" btnFunc={() => deleteNote(deletePopup.id)} btnCancelFunc={() => setDeletePopup(!deletePopup)} />
      }


      <div className='flex justify-center items-center '>

      </div>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Notes</h1>
          <div>
            <button className="bg-green-500 ml-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowAddNote(!showAddNote)}>Add Note</button>
          </div>

        </div>
        <h1 className='text-3xl font-bold'>Pin Notes</h1>
        <div className="grid grid-cols-1 border rounded-lg px-2 py-2 mb-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            Array.isArray(pinNote) && pinNote.length > 0 ? pinNote.map((note) => (
              <div key={note.$id} >
                <Note title={note.title} body={note.body} tagline={note.tagline} ID={note.$id} />

              </div>
            ))
              : <p className='text-center w-full'>No Pin Notes found</p>
          }
        </div>
        <h1 className='text-3xl font-bold'>All Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            Array.isArray(notes.documents) && notes.documents.length > 0 ? notes.documents.map((note) => (
              <div className='relative cursor-pointer hover:scale-105' onClick={(e) => {e.stopPropagation(); setShowEditNote(true); setEditNoteData(note) }} key={note.$id} >
                <button onClick={(e) => addToPin(e,note.$id, note)} className='absolute top-2 right-2 hover:cursor-pointer hover:scale-110'>📌</button>
                <button onClick={(e) => handleDeleteBtn(e, note.$id)} className='absolute bottom-2 right-2 hover:cursor-pointer hover:scale-110'>❌</button>
                <Note title={note.title} body={note.body} tagline={note.tagline} />

              </div>
            ))
              : <p>No notes found</p>
          }
        </div>
        <div className="flex justify-center mt-4">
          {
            notes.total &&
            <div className="flex space-x-2 flex-col">
             <div className='flex gap-2'>
             <button disabled={currentPage === 0} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={previousPage}>Previous</button>
             <button disabled={Math.ceil(notes.total / 6) === currentPage + 1} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={nextPage}>Next</button>
             </div>
              <p>Page {currentPage + 1} of {Math.ceil(notes.total / 6)}</p>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
