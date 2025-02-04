import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import { CTAButton } from './CTAButton'
import { FaArrowRight } from "react-icons/fa";

function InstructoreSection() {
  return (
    <div >
        <div className='flex flex-row w-11/12 mx-auto max-w-maxContent items-center justify-between gap-20
        first-letter bg-richblack-900 text-white '>
            <div className='w-[50%%] '>
                <img src={Instructor} alt="" className='m-10 w-[500px] mt-20 shadow-white shadow-[-20px_-20px]' />
            </div>
            <div className='w-[50%] flex flex-col  gap-5'>
                <div className='text-4xl font-semibold'>
                        Become an <br/>
                        <HighlightText text={"Instructor"}/>
                </div>
                <div className='w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on Learn Track. 
                    We provide the tools and skills to teach what you love.
                </div>
                <div className='flex mt-5'>
                    <CTAButton active={true} linkto={"/singup"} >
                        <div className='flex items-center gap-2'>Start Teaching Today <FaArrowRight/></div>
                        
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructoreSection