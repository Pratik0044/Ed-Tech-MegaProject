import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

function ExploreMore() {
    const [currentTab,setCurrentTab] = useState(tabsName[0])
    const [courses,setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0] .heading)

    const setMyCards =(value)=>{
            setCurrentTab(value );
            const result = HomePageExplore.filter((courses)=>courses.tag ===value )
            setCourses(result[0].courses)
            setCurrentCard(result[0].courses[0].heading)
    }
  return ( 
    <div className='flex flex-col gap-3 items-center justify-between'>
        <div className='text-white font-semibold text-4xl text-center'>
        Unlock the <HighlightText text={"Power of Code"}/>
        </div>
        <p className='text-richblack-300 text-center'>Learn to Build Anything You Can Imagine</p>
        <div className='tab flex flex-row rounded-full bg-richblack-700 m-1 p-1 gap-1 mt-5 mb-5'>
            {
                tabsName.map( (element,index)=>{
                    return (
                        <div
                        className={`text-[16px] flex flex-row  items-center gap-2 
                            ${currentTab==element 
                                ? "bg-richblack-900 text-richblack-5 font-medium " 
                                : " text-richblack-200 "
                             } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblue-900 
                              hover:text-richblack-5 px-3 py-1 font-semibold`}

                              key={index}
                              onClick={()=> setMyCards(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>
        <div className='lg:h-[200px]'>

            {/* course card ka group */}
        <div className='flex flex-row absolute gap-5 justify-between w-full'> 
            {
                courses.map((element,index)=>{
                    return (
                        <CourseCard key={index} 
                         cardData={element}
                          currentCard={currentCard}
                          setCurrentCard={setCurrentCard} />
                    )
                })
            }
        </div>

        </div>
    </div>
  )
}

export default ExploreMore