import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto my-24 px-4">

      {/* ===== SECTION HEADER ===== */}
      <div className="text-center mb-14 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-[#6A38C2] to-pink-500 bg-clip-text text-transparent">
            Latest & Top
          </span>{" "}
          Job Openings
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
          Hand-picked opportunities from top companies
        </p>

        {/* Glow underline */}
        <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#6A38C2] to-pink-500"></div>
      </div>

      {/* ===== JOB GRID ===== */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        {/* ===== LOADING / EMPTY STATE ===== */}
        {allJobs.length <= 0 ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="
                  h-52 rounded-2xl
                  bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200
                  dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
                  animate-pulse
                  border border-gray-200 dark:border-gray-700
                  shadow-sm
                "
              ></div>
            ))}
          </>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <div
              key={job._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <LatestJobCards job={job} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
