Under the hood, Zustand uses `useSyncExternalStore`.
Not there

- [x] thunk middleware, async calls zustand

https://medium.com/@ignatovich.dm/managing-react-state-with-zustand-4e4d6bb50722

1. create a store
    
    ```jsx
    const courseStore = (set: any) => {
        return {
            courses:[],// array of courses
            addCourse:  (course: Course)=>{
                set((state:{ courses: Course[] })=>({
                    courses: [course, ...state.courses]// courses is updated
                }))
            },
            removeCourse: (courseId:string)=>{
                set((state:{ courses: Course[] })=>({
                    courses: state.courses.filter((c: Course)=> c.id !== courseId) // courses is updated
                }))
            },
            toggleCourseStatus: (courseId:string)=>{
                set((state: { courses: Course[] })=>({
                    courses: state.courses.map((course: Course)=> course.id === courseId ?{...course, completed: !course.completed}: course)
                }))
            }
        }
    }
    ```
    
2. need to import 
    
    ```jsx
    import { create } from 'zustand'
    import { devtools, persist } from 'zustand/middleware'
    ```
    
3. create a useCourseStore, i.e. the actual store
    
    ```jsx
    const useCourseStore = create(
        devtools(
            persist(courseStore, {
                name: "courses"// will be saved with this name in local storage
            })
        )
    )
    ```
    
4. To get a visual understanding of how then we are getting those values, functions and other details in other components and all. 
    
    ```jsx
    "use client";
    import useCourseStore from '@/store/courseStore'
    import React, { useCallback } from 'react'
    import type { Course } from '@/store/courseStore';
    
    function CourseList() {
        // Using separate selectors for better performance
      // const { courses, removeCourse, toggleCourseStatus } = useCourseStore(
      //   (state) => ({
      //     courses: state.courses,
      //     removeCourse: state.removeCourse,
      //     toggleCourseStatus: state.toggleCourseStatus
      //   }),
      // );
    // this above thing does not work because of the last version of React
    
        const courses = useCourseStore((state) => state.courses);
        const removeCourse = useCourseStore((state) => state.removeCourse);
        const toggleCourseStatus = useCourseStore((state) => state.toggleCourseStatus);
    
        return (
            <div>
                <h2>Course List</h2>
                {courses.map((course: Course) => (
                    <div key={course.id}>
                        <li className='bg-amber-50 text-black p-2 m-2 flex justify-between items-center'>
                            <span 
                                style={{ textDecoration: course.completed ? 'line-through' : 'none' }}
                                onClick={() => toggleCourseStatus(course.id)}
                            >
                                {course.title}
                            </span>
                            <button 
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => removeCourse(course.id)}
                            >
                                Delete
                            </button>
                        </li>
                    </div>
                ))}
            </div>
        )
    }
    
    export default CourseList;

    ```