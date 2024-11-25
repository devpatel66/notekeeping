import React from 'react'

function Popup({title,btnFunc=()=>{},btnCancelFunc=()=>{},btnText="OK"}) {
  return (
    <div className=' flex justify-center z-50 items-center rounded shadow-md w-full h-full bg-[#94949446] p-4 absolute'>
      <div className=' flex w-1/6 px-2 py-5 flex-col rounded shadow-md bg-white'>
      <p>{title}</p>
      <div className='flex gap-4'>
        <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={btnFunc}>{btnText}</button>
        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={btnCancelFunc}>Cancel</button>
      </div>
      </div>

    </div>
  )
}

export default Popup