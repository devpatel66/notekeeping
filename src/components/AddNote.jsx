import React, { useRef, useState } from 'react'
import note from '../appwrite/database'
import PopupMsg from './PopupMsg'



function AddNote({ setShowAddNote }) {
  const [titleError, setTitleError] = useState(false)
  const [bodyError, setBodyError] = useState(false)
  const [taglineError, setTaglineError] = useState(false)
  const [popupMsg, setPopupMsg] = useState(false)
  const formRef = useRef(null)

  const handleAddNote = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const title = formData.get('title')
    const body = formData.get('body')
    const tagline = formData.get('tagline')
    if (title.length > 100) {
      setTitleError("Title should be less than 100 characters")
      return
    }
    if (body.length > 500) {
      setBodyError("Body should be less than 1000 characters")
      return
    }
    if (tagline.length > 50) {
      setTaglineError("Tagline should be less than 100 characters")
      return
    }
    if (title.length === 0) {
      setTitleError("Title is required")
    }
    if (body.length === 0) {
      setBodyError("Body is required")

    }
    if (tagline.length === 0) {
      setTaglineError("Tagline required")
    }


    if (tagline.length < 50 && body.length < 500 && title.length < 100 && title.length > 0 && body.length > 0 && tagline.length > 0) {
      const res = await note.createNote(title, body, tagline)
      if (res === 1) {
        setPopupMsg({msg:"Note Added Successfully",type:"success"})
        formRef.current.reset()
      }
      else{
        setPopupMsg({msg:"Error While Adding Note",type:"error"})
      }
    }
  }

  return (
    <>
    {popupMsg && <PopupMsg message={popupMsg.msg} type={popupMsg.type} setMessage={setPopupMsg} />}
    <div className='p-5 absolute z-50 flex justify-center  w-full h-full  bg-[#94949446]'>
      <div className='flex rounded-2xl gap-5 justify-center h-max flex-col p-2 w-1/3 bg-white'>
        <div className='flex w-full border-b py-2 px-2 justify-between  items-center'>
          <h1 className='font-bold text-xl'>Add Note</h1>
          <button onClick={() => setShowAddNote(false)} className='cursor-pointer border rounded-full px-5 py-2 flex justify-center items-center'>Close</button>
        </div>

        <div className='flex flex-col gap-2'>
          <form ref={formRef}>
            <div className='flex flex-col'>
              <label htmlFor="title">Title</label>
              <input type="text" name='title' id='title' className='border rounded-md p-2' />
              <p className='text-gray-400 text-sm'>Max : 100</p>
              <p className='text-red-400 text-sm'>{titleError && titleError}</p>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="body">Body</label>
              <input type="text" name='body' id='body' className='border rounded-md p-2' />
              <p className='text-gray-400 text-sm'>Max : 500</p>
              <p className='text-red-400 text-sm'>{bodyError && bodyError}</p>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="tagline">Tagline</label>
              <input type="text" name='tagline' id='tagline' className='border rounded-md p-2' />
              <p className='text-gray-400 text-sm'>Max : 50</p>
              <p className='text-red-400 text-sm'>{taglineError && taglineError}</p>
            </div>
            <div className='flex justify-end'>
              <button onClick={handleAddNote} className='cursor-pointer border rounded-xl px-8 py-3  flex justify-center items-center'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddNote