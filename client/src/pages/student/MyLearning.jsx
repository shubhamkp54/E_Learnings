import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const enrolledCourses = data?.user.enrolledCourses || [];
  const createdCourses = data?.user.createdCourses || [];

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-3xl mb-6">My Learning</h1>

      {isLoading ? (
        <MyLearningSkeleton />
      ) : (
        <>
          {/* Enrolled Courses Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Enrolled Courses</h2>
            {enrolledCourses.length === 0 ? (
              <p className="text-gray-500 italic">You're not enrolled in any courses.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {enrolledCourses.map((course, index) => (
                  <Course key={index} course={course} />
                ))}
              </div>
            )}
          </section>

          {/* Created Courses Section */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Created Courses</h2>
            {createdCourses.length === 0 ? (
              <p className="text-gray-500 italic">You haven't created any courses.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {createdCourses.map((course, index) => (
                  <Course key={index} course={course} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
