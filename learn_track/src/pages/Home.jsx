
import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import { CTAButton } from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from "../components/core/HomePage/TimeLineSection"
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructoreSection from '../components/core/HomePage/InstructoreSection'
import RatingAndReviewSection from '../components/core/HomePage/RatingAndReviewSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'

export default function Home() {
  return (
    <div>
        {/* Section 1 */}
        <div className='mt-10 relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white
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

            <div className=' mx-3 my-14 shadow-[20px_20px] shadow-richblack-50'>
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
                position={"lg:flex-row"} 
                heading={
                    <div className='text-[36px] font-semibold'>
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
                    active:true
                }}
                ctabtn2={{
                    btnText: "Learn More",
                    linkto:"/login",
                    active:false
                }}

                codeblock={`<!Doctype html>\n<html>\n<head><title rel='stylsheet'\n href='style.css'/>\n</head>\n<body><h1>Learn_track</h1>
                    <a href="/one">One</a>\n<a href="/two">Two</a>\n<p>This is edtech plateform.</p>\n</body>\n</html> `
                }
                codeColor={'text-caribbeangreen-25'}
                />

            </div>
            {/* Code section 2 */}
            <div>
                <CodeBlocks 
                position={"lg:flex-row-reverse"} 
                heading={
                    <div className='text-[36px] font-semibold'>
                        
                        Start <HighlightText text={"Coding in second."}/>
                    </div>
                }
                subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={{
                    btnText: "Continue Lesson",
                    linkto:"/signup",
                    active:true
                }}
                ctabtn2={{
                    btnText: "Learn More",
                    linkto:"/login",
                    active:false
                }}

                codeblock={`<!Doctype html>\n<html>\n<head><title rel='stylsheet'\n href='style.css'/>\n</head>\n<body><h1>Learn_track</h1>
                    <a href="/one">One</a>\n<a href="/two">Two</a>\n<p>This is edtech plateform.</p>\n</body>\n</html> `
                }
                codeColor={'text-caribbeangreen-25'}
                />

            </div>


            <ExploreMore/>
            


        </div>
        {/* Section 2 */}
        
        <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg  h-[310px]'>

                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                        <div className='h-[150px] '></div>
                        <div className='flex flex-row gap-7 text-white mx-auto '> 
                            <CTAButton active={true} linkto={"/signup"}  >
                                <div className='flex flex-row items-center gap-2 font-inter' >Explore Full Catalog <FaArrowRight/> </div>
                                
                            </CTAButton>
                            <CTAButton children={"Learn More"} />
                        </div>
                    </div>
                </div>

                <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex flex-row gap-12 mt-[100px] '>
                        <div className='text-[36px] font-bold '>
                        Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                        </div>
                        <div className='flex flex-col gap-5 justify-between'>
                            <div className='text-richblack-900 '>
                                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            <div className='h-[48px] w-[137px] mt-10'>
                                <CTAButton active={true} children={"Learn More"} linkto={"/signup"} /></div>
                            </div>
                        </div>
                    </div>


                    <TimeLineSection/>
                    <LearningLanguageSection/>
                </div>
        </div>

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8
        first-letter bg-richblack-900 text-white'>
            <InstructoreSection/>
            <h1 className='text-white font-semibold mt-20 mb-10 text-4xl text-center'>Review from other learners</h1>
            <RatingAndReviewSection/>

        </div>
        

        {/* Footer */}
        <Footer/>
        
    </div>
  )
}





