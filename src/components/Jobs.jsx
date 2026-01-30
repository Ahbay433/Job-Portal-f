import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

import { Briefcase } from 'lucide-react';

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        const [loc, ind, sal, exp] = (searchedQuery || '').split('|');
        let filtered = [...allJobs];

        if (loc) {
            filtered = filtered.filter(
                job => job.location && job.location.toLowerCase().includes(loc.toLowerCase())
            );
        }
        if (ind) {
            filtered = filtered.filter(
                job => job.title && job.title.toLowerCase().includes(ind.toLowerCase())
            );
        }
        if (sal) {
            filtered = filtered.filter(
                job => job.salary && job.salary.toString().toLowerCase().includes(sal.toLowerCase())
            );
        }
        if (exp) {
            filtered = filtered.filter(
                job => job.experienceLevel && job.experienceLevel.toLowerCase().includes(exp.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            const aScore =
                (loc && a.location?.toLowerCase().includes(loc.toLowerCase()) ? 4 : 0) +
                (ind && a.title?.toLowerCase().includes(ind.toLowerCase()) ? 3 : 0) +
                (sal && a.salary?.toString().toLowerCase().includes(sal.toLowerCase()) ? 2 : 0) +
                (exp && a.experienceLevel?.toLowerCase().includes(exp.toLowerCase()) ? 1 : 0);
            const bScore =
                (loc && b.location?.toLowerCase().includes(loc.toLowerCase()) ? 4 : 0) +
                (ind && b.title?.toLowerCase().includes(ind.toLowerCase()) ? 3 : 0) +
                (sal && b.salary?.toString().toLowerCase().includes(sal.toLowerCase()) ? 2 : 0) +
                (exp && b.experienceLevel?.toLowerCase().includes(exp.toLowerCase()) ? 1 : 0);
            return bScore - aScore;
        });

        setFilterJobs(filtered);
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-10">
            <Navbar />
            <div className='max-w-7xl mx-auto px-6 py-10'>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#6A38C2] rounded-2xl shadow-lg shadow-[#6A38C2]/20 text-white">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <h1 className='font-black text-4xl text-gray-900 dark:text-white uppercase tracking-tighter'>Opportunities</h1>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest pl-1 opacity-70">Discovered {filterJobs.length} active roles</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-10'>
                    {/* SIDEBAR */}
                    <div className='w-full lg:w-[320px] shrink-0'>
                        <FilterCard />
                    </div>

                    {/* MAIN CONTENT */}
                    <div className='flex-1'>
                        {
                            allJobs.length === 0 ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'>
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className='h-[400px] rounded-[2.5rem] bg-white dark:bg-gray-800 animate-pulse border border-gray-100 dark:border-gray-700 shadow-xl'></div>
                                    ))}
                                </div>
                            ) : filterJobs.length === 0 ? (
                                <div className="text-center py-32 bg-white dark:bg-gray-800 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-700">
                                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Briefcase size={32} className="text-gray-300" />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">No Matches Found</h2>
                                    <p className="text-gray-500 font-medium max-w-sm mx-auto">We couldn't find any jobs matching those filters. Try adjusting your preferences or clearing all.</p>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs