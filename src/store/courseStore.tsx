import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Course = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

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

// courseStore is 
// useCourseStore, is what we are exporting: this is the Store!
// the store is being created here.
const useCourseStore = create(
    devtools(
        persist(courseStore, {
            name: "courses"// will be saved with this name in local storage
        })
    )
)

export default useCourseStore;


