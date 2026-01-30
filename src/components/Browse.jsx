import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    const filterJobs = allJobs.filter(job => {
        const matchesQuery = !query ||
            job?.title?.toLowerCase().includes(query.toLowerCase()) ||
            job?.company?.name?.toLowerCase().includes(query.toLowerCase());

        const matchesLocation = !location ||
            job?.location?.toLowerCase().includes(location.toLowerCase());

        return matchesQuery && matchesLocation;
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />

            <div className='max-w-7xl mx-auto px-6 py-10'>
                {/* Search Header */}
                <div className="mb-12 text-center">
                    <h1 className='font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-8'>
                        Explore <span className="text-[#6A38C2]">Opportunities</span>
                    </h1>

                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
                        {/* Search Input Box */}
                        <div className="flex-1 flex items-center px-6 py-5 rounded-2xl bg-white dark:bg-gray-800 shadow-[0_10px_40px_rgba(106,56,194,0.2)] border-2 border-[#6A38C2] w-full transition-all hover:scale-[1.02] hover:shadow-[#6A38C2]/30">
                            <div className="p-2 bg-[#6A38C2]/10 rounded-lg mr-4">
                                <Search size={22} className="text-[#6A38C2]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Job Title, Skills... "
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-extrabold text-lg placeholder:text-gray-400"
                            />
                        </div>

                        {/* Location Input Box */}
                        <div className="flex-1 flex items-center px-6 py-5 rounded-2xl bg-white dark:bg-gray-800 shadow-[0_10px_40px_rgba(236,72,153,0.15)] border-2 border-pink-500 w-full transition-all hover:scale-[1.02] hover:shadow-pink-500/25">
                            <div className="p-2 bg-pink-50 rounded-lg mr-4">
                                <MapPin size={22} className="text-pink-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Location... "
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-extrabold text-lg placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className='font-bold text-xl text-gray-900 dark:text-white'>
                        Search Results <span className="text-[#6A38C2]">({filterJobs.length})</span>
                    </h2>
                </div>

                {filterJobs.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-inner border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No jobs found matching your criteria. Try adjusting your search.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            filterJobs.map((job) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    key={job._id}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse