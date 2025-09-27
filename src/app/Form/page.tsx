"use client";
import useCourseStore from '@/store/courseStore'
import React, { useState } from 'react'

export default function CourseForm() {
    const addCourse = useCourseStore((state)=>state.addCourse);
    const [courseTitle, setCourseTitle] = useState('');
    const [allCourses, setAllCourses] = useState<['']>();
    console.log("Form rendered");
    
    function handleCourseSubmit(){
        if(!courseTitle) return alert("Please add a title ")
          addCourse({
              id: Math.ceil(Math.random()*10000).toString(),
              completed: false,
              description: "This is a new course",
              title: courseTitle
          })
          setCourseTitle('');
    }
    function getCourses(){
      //@ts-ignore
      let courses =JSON.parse((localStorage.getItem("courses")))
      console.log(courses.state);
      //@ts-ignore
      setAllCourses(JSON.stringify(courses.state.courses));
    }
    return (
    <div className='flex flex-col items-center '>
      <form action="
      ">
      <input 
        className='bg-amber-100 flex-col-1 text-background'
        type="text" 
        value={courseTitle}
        onChange={(e)=>{
          setCourseTitle(e.target.value)
        }}
        />
        <button
        className='bg-[#979797] p-2 m-2'
        onClick={handleCourseSubmit}
        >
          Submit
        </button>
        </form>
        <button
         className='bg-green-300 p-3 m-2 rounded-3xl text-black'
        onClick={getCourses}
        >
          Get the courses
        </button>
        <div className='forced-color-adjust-auto'>
          {allCourses}
        </div>
        
    </div>
  )
}

