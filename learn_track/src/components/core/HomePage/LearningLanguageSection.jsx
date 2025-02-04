import React from 'react'
import HighlightText from './HighlightText';
import Know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import Compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import { CTAButton } from './CTAButton';

const LearningLanguageSection = () => {
  return (
    <div>
        <div className='flex flex-col gap-5 mt-[130px] items-center mb-[100px]'>
            <div className='text-4xl font-semibold text-center '>
                Your Swiss knife for
                <HighlightText text={`Learning any language`}/>
            </div>
            <p className='font-inter text-center text-base text-richblack-600 font-medium w-[55%] '>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </p>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={Know_your_progress} alt=""  className='translate-x-[100px] -translate-y-7'/>
                <img src={Compare_with_others} alt="" className='-translate-x-[20px]' />
                <img src={Plan_your_lessons} alt="" className='-translate-x-[170px] -translate-y-7' />
            </div>  
            
            <div className='w-[137px] h-[48px]'>
                <CTAButton active={true} children={"Learn More"}/>
            </div>
        </div>
    </div>
  )
}
export default LearningLanguageSection