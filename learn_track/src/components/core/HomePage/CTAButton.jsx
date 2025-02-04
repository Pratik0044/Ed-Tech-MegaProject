import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({children,active,linkto}) => {
  return (
    
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
            ${active? "bg-yellow-50 text-black shadow-[2px_2px] shadow-yellow-5" : "bg-richblack-800 shadow-[2px_2px] shadow-pure-greys-300"} hover:scale-95 transition-all
            duration-200`}>
            {children}
        </div>
    </Link>

  )
}
