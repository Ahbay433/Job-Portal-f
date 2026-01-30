import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, MapPin, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(`${location}|${query}|`));
    navigate("/jobs");
  };

  const isRecruiter = user?.role === "recruiter";

  return (
    <section className="relative bg-gradient-to-r from-[#6A38C2] via-[#7c4ce3] to-[#9b6bff]">

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] text-sm font-black shadow-sm uppercase tracking-widest">
          <Sparkles size={14} className="animate-pulse" />
          {isRecruiter ? "Recruiter Workspace" : "No. 1 Smart Job Platform"}
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-gray-900 dark:text-white tracking-tight">
          {isRecruiter ? (
            <>
              Hire Top Talent & <br />
              <span className="text-[#6A38C2]">Build Your Team</span>
            </>
          ) : (
            <>
              Search, Apply & <br />
              Get Your <span className="text-[#6A38C2]">Dream Job</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
          {isRecruiter
            ? "Manage your company profile, post new opportunities, and shortlist the best candidates from our global talent pool."
            : "Discover thousands of jobs from top companies with ZapHire. Your next career milestone is just a search away."
          }
        </p>

        {isRecruiter ? (
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-[#6A38C2] hover:bg-[#5b30a6] px-12 py-7 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-lg font-black"
            >
              Post New Job
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 px-12 py-7 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-lg font-black"
            >
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <>
            {/* Search Card */}
            <div
              className="mt-12 mx-auto max-w-5xl bg-white dark:bg-gray-900 
              shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100 dark:border-gray-800"
            >
              {/* Job input */}
              <div className="flex items-center w-full md:w-[45%] px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-transparent focus-within:border-[#6A38C2]/30 transition-all">
                <Search className="text-[#6A38C2] mr-4" size={20} />
                <input
                  type="text"
                  placeholder="Job title, skills..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 dark:text-white font-bold placeholder:text-gray-400 placeholder:font-medium"
                />
              </div>

              {/* Location input */}
              <div className="flex items-center w-full md:w-[30%] px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-transparent focus-within:border-[#6A38C2]/30 transition-all">
                <MapPin className="text-pink-500 mr-4" size={20} />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 dark:text-white font-bold placeholder:text-gray-400 placeholder:font-medium"
                />
              </div>

              {/* Button */}
              <Button
                onClick={searchJobHandler}
                className="w-full md:w-auto bg-[#6A38C2] hover:bg-[#5b30a6] 
                px-12 py-5 h-auto rounded-2xl shadow-xl transition-all duration-300 
                hover:-translate-y-1 hover:shadow-2xl text-lg font-black"
              >
                Search Jobs
              </Button>
            </div>

            {/* Popular Tags */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 self-center">Popular:</span>
              {["React", "Node.js", "AI", "UI/UX", "Marketing", "Finance"].map(
                (tag) => (
                  <span
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-6 py-2.5 rounded-xl bg-white dark:bg-gray-900 shadow-md 
                    text-gray-700 dark:text-gray-200 text-sm font-bold cursor-pointer 
                    transition-all duration-300 border border-transparent hover:border-[#6A38C2]/20 hover:text-[#6A38C2] hover:-translate-y-1"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
