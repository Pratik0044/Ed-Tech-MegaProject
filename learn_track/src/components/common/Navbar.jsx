import React from 'react'
import { NavbarLinks} from '../../data/navbar-links'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from 'react-router-dom'


function Navbar() {
    const location = useLocation();
    const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname)
    }

  return (
    <>
        <div  className="fixed top-0 left-0 w-full z-50 h-14 flex items-center justify-center border-b border-richblack-600 bg-richblack-900">
            <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
            <Link to="/" >
                <img src={logo} alt=""  width={160} height={42}/>    
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index) => {
                            return <li key={index}> 
                                {
                                    link.title === "Catalog"? (<div></div>) : (
                                        <Link to={link?.path} >
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"}`}>
                                            {link.title}

                                            </p>
                                            
                                        </Link>
                                    )
                                }
                            </li>
                        })
                    }
                </ul>
            </nav>
            
            <div  className='flex gap-x-4 items-center '>

            </div>

            </div>
        </div>
    </>
  )
}

export default Navbar