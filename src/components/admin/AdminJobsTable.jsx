import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Calendar, Briefcase, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])
    return (
        <div className="overflow-hidden">
            <Table>
                <TableCaption className="pb-4">A complete list of your recently posted job opportunities</TableCaption>
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                    <TableRow>
                        <TableHead className="font-bold text-gray-900 dark:text-white rounded-tl-2xl px-6">Job Role & Company</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white">Date Posted</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white">Applicants</TableHead>
                        <TableHead className="text-right font-bold text-gray-900 dark:text-white rounded-tr-2xl px-6">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                <TableCell className="py-5 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-[#6A38C2]/10 rounded-xl">
                                            <Briefcase size={20} className="text-[#6A38C2]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white text-base leading-none mb-1.5">{job?.title}</p>
                                            <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                                                <Building2 size={14} className="text-gray-400" /> {job?.company?.name}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-[#6A38C2]/50" />
                                        {job?.createdAt.split("T")[0]}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${job.applicationCount > 0 ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20 shadow-sm' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
                                            {job.applicationCount || 0} APPLIED
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right px-6">
                                    <Popover>
                                        <PopoverTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                            <MoreHorizontal size={20} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-44 rounded-2xl p-2 shadow-2xl border-gray-100 dark:border-gray-700">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className='flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-semibold transition-all group'
                                            >
                                                <Edit2 className='w-4 text-[#6A38C2] group-hover:scale-110' />
                                                <span>Edit Job</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className='flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-semibold transition-all group mt-1'
                                            >
                                                <Eye className='w-4 text-pink-500 group-hover:scale-110' />
                                                <span>View Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
