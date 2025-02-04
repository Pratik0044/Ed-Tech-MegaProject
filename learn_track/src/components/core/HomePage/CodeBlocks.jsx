import React from 'react'
import { CTAButton } from './CTAButton'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from "react-type-animation"


const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, bgGradiant,codeColor
}) => {
  return (
    <div className={`lg:flex ${position} my-20 justify-between gap-5 `}>
        <div className='w-[45%] flex flex-col gap-5'>
            {heading}
            <div className='text-richblack-300 font-bold font-inter'>
                {subheading}
            </div>
            <div className='flex flex-row gap-7 mt-5'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}   
                        <FaArrowRight />  
                    </div>
                </CTAButton> 
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton> 
            </div>
        </div>
        <div className={` flex h-fit flex-row text-[15px] w-[55%] lg:w-[500px]`}>
            <div className='flex felx-row w-[100%] h-fit gap-2 border border-richblack-700 bg-richblack-900 bg-transparent p-3'>
                <div  className='w-fit font-bold font-inter text-richblack-300  '>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation 
                        sequence={[
                            codeblock,2000,""
                        ]}
                        repeat={Infinity}
                        className={`w-[100%] font-mono font-bold ${codeColor}`}

                        style={{
                            whiteSpace:"pre-line",
                            display:'block'
                        }}
                        omitDeletionAnimation={true}
                />
                </div>
            
            </div>
        </div>

        
    </div>
  )
}

export default CodeBlocks;
