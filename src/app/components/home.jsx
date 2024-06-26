"use client"
import React from 'react'
import { TypeAnimation } from "react-type-animation";

export default function Landing() {
  return (
    <>
   
     <div className='font-[NeoSansPro-Regular]'>
      
       <header data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="600"
           className="bg-blue-600 h-52 text-white p-6">
        <div className="container flex max-sm:justify-center max-sm:items-center text-center sm:h-80 mx-5 sm:mx-10 relative">
            <h1 className="font-extralight mb-4 text-start text-4xl xl:text-7xl pt-14 sm:pt-24 font-[NeoSansPro-Medium] ">Rate me</h1>
            <p className="text-xl  lg:text-3xl min-w-64 sm:min-w-96  text-gray-800 max-sm:max-w-[15rem] max-lg:max-w-[20rem] lg:max-w-lg bg-white rounded-3xl px-4 py-5 xl:px-10 lg:py-12 absolute max-sm:-bottom-20  bottom-20 sm:-right-14 md:right-8 lg:right-28  font-[NeoSansPro-Light] font-bold shadow-2xl ">
            <span className="text-[#a662eb] font-originalSurfer">
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    "Working hard?",
                    1000,
                    "Ready to improve?",
                    1000,
                    "Seeking feedback?",
                    1000,
                    "Aiming for the top?",
                    1000,
                    "Need validation? ",
                    1000,
                    "Ready for growth?",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  
                  repeat={Infinity}
                />
              </span>
              <br />
                get yourself rated !
            </p>
        </div>
    </header>

   


    </div></>
   
  )
}
