import React from 'react'

function Note({title,body,tagline}) {
  return (
    <div className="bg-white rounded shadow-md p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-600">{body}</p>
      <p className="text-gray-600">Tagline : {tagline}</p>
    </div>
  )
}

export default Note