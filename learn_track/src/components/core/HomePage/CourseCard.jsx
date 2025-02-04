import React from 'react'
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePlayLesson } from "react-icons/md";



function CourseCard({cardData, currentCard, setCurrentCard}) {
  return (
    <div className={`bg-richblack-800 flex flex-col w-[340px] h-[280px] p-8 gap-5 cursor-pointer
    ${ currentCard === cardData?.heading 
      ? "bg-white text-black shadow-[12px_12px] shadow-caribbeangreen-300"
      : "text-white"
      }`}
      
      onClick={() => setCurrentCard(cardData?.heading)}
      >
        <div className={`font-inter font-semibold text-2xl`}>
          {cardData?.heading}
        </div>
        <div className='font-inter text-[16px]'>
          {cardData?.description}
        </div>
        <div class="border-t border-dashed border-gray-500 mt-auto  "></div>
        <div className={`flex justify-between items-center mt-auto `}>
          <div  className={` flex items-center gap-2`}>
           <FaUserGroup />
           <span> {cardData?.level} </span>
          </div>
          <div className='gap-2 flex items-center' >
         
          <MdOutlinePlayLesson />

            <span>{cardData?.lessionNumber} </span>
             <span> Lessons</span>
          </div>
          </div>
        <div>

        </div>
    </div>
  )
}

export default CourseCard