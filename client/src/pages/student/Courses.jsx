import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const LIMIT = 5;

const Courses = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetPublishedCourseQuery({ page, limit: LIMIT });

  if (isError) return <h1>Some error occurred while fetching courses.</h1>;

  const totalCourses = data?.total || 0;
  const totalPages = Math.ceil(totalCourses / LIMIT);

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
        <h2 className="font-bold text-3xl text-center mb-6">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: LIMIT }).map((_, index) => <CourseSkeleton key={index} />)
            : data?.courses.map((course, index) => <Course key={index} course={course} />)}
        </div>

        <div className="flex justify-center mt-6 mb-6 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50 rounded-l-full mb-4"
          >
            Previous
          </button>
          <span className="text-sm text-center mt-2.5 text-gray-800 dark:text-gray-100">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-5 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50 rounded-r-full mb-4"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
