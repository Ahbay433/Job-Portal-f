import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Code2,
  Server,
  Database,
  PenTool,
  Layers,
  Brain,
  Smartphone,
  Cloud,
  Cpu,
  Terminal,
  LineChart,
} from "lucide-react";

const categories = [
  { name: "Frontend Developer", icon: Code2 },
  { name: "Backend Developer", icon: Server },
  { name: "FullStack Developer", icon: Layers }, // Matches seeded name
  { name: "Data Scientist", icon: Database },
  { name: "AI/ML Engineer", icon: Brain }, // Matches seeded name
  { name: "Cloud Engineer", icon: Cloud },
  { name: "Prompt Engineer", icon: Cpu }, // New role
  { name: "UI/UX Designer", icon: PenTool },
  { name: "Data Analyst", icon: LineChart },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const searchJobHandler = (query) => {
    // Send in piped format to be compatible with Jobs page logic: |Industry|
    dispatch(setSearchedQuery(`|${query}|`));
    navigate("/jobs"); // Navigate to /jobs instead of /browse for better filtering
  };

  // Mouse wheel horizontal scroll
  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Explore Jobs by <span className="text-[#6A38C2]">Category</span>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Scroll horizontally to discover opportunities
          </p>
        </div>

        {/* SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-2 py-6"
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <button
                key={index}
                onClick={() => searchJobHandler(cat.name)}
                className="group min-w-[240px] h-16 rounded-2xl flex items-center gap-4 px-6

                bg-white dark:bg-gray-900
                border-2 border-gray-200 dark:border-gray-700

                text-gray-900 dark:text-gray-100
                shadow-lg

                transition-all duration-300 ease-out

                hover:-translate-y-1 hover:shadow-2xl
                hover:border-[#6A38C2]

                hover:bg-gradient-to-r hover:from-[#6A38C2] hover:to-[#8b5cf6]
                hover:text-white"
              >
                <Icon
                  className="text-[#6A38C2] transition-all duration-300 
                  group-hover:text-white group-hover:scale-110"
                />
                <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
