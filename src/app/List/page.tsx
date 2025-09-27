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

