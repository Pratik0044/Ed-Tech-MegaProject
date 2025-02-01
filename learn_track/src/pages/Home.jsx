
import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import { CTAButton } from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';

export default function Home() {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white
         justify-between '>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 rounded-full mx-auto bg-richblack-800 font-bold text-richblack-200 
                transition-all duration-200 hover:scale-95 w-fit '>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900' >
                        <p>
                            Become an Instructor
                        </p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='font-inter text-center text-4xl font-semibold mt-8'>
                Empower Your Future with  
                <HighlightText text={"Coding and Academic Skills"} />
            </div>

            <div className='w-[90%] text-center mt-4 text-lg font-ligh text-richblack-300'>
            
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a 
            wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/signup"}>Book a Demo</CTAButton>
            </div>

            <div className='shadow-blue-200  mx-3 my-14 '>
                <video 
                muted 
                loop
                autoPlay
                >
                <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* code section 1*/}
            <div>
                <CodeBlocks 
                position={"flex-row"} 
                heading={
                    <div className='text-4xl font-semibold'>
                        Unloack Your <HighlightText text={"Coding Potential"}/>
                        with our online courses.
                    </div>
                }
                subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={{
                    btnText: "Try it yourself",
                    linkto:"/signup",
                    active:"true"
                }}
                ctabtn2={{
                    btnText: "Learn More",
                    linkto:"/login",
                    active:"false"
                }}

                codeblock={""
                }

                />

            </div>


        </div>
        {/* Section 2 */}

        {/* Section 3 */}

        {/* Footer */}
        
    </div>
  )
}





