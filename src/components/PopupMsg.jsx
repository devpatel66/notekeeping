import React, { useEffect } from 'react'

function PopupMsg({ type = "info", message, setMessage }) {
    const colorType = {
        "error": ["bg-red-500", "text-white"],
        "success": ["bg-green-500", "text-white"],
        "warning": ["bg-yellow-500", "text-white"],
        "info": ["bg-blue-500", "text-white"]
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(""); 
            }, 5000);

            return () => clearTimeout(timer); 
        }
    }, [message, setMessage]);

    if (!message) return null
    
    return (
        <div className={`fixed top-5 right-5 z-50 w-60 px-4 py-2 h-12 flex items-center rounded-md text-left ${colorType[type][1]} ${colorType[type][0]}`}>
            <p>{message}</p>
        </div>
    )
}

export default PopupMsg