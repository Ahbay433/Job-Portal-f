import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Plus, Briefcase, Building2 } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allAdminJobs } = useSelector(store => store.job);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  // Calculate Quick Stats
  const totalJobs = allAdminJobs.length;
  const totalApplicants = allAdminJobs.reduce((acc, job) => acc + (job.applicationCount || 0), 0);
  const totalCompanies = new Set(allAdminJobs.map(job => job.company?._id)).size;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className='max-w-7xl mx-auto px-6 py-12'>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-5 transition-transform hover:scale-105">
            <div className="p-4 bg-[#6A38C2]/10 rounded-2xl">
              <Briefcase size={28} className="text-[#6A38C2]" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Total Jobs</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{totalJobs}</h2>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-5 transition-transform hover:scale-105">
            <div className="p-4 bg-pink-500/10 rounded-2xl">
              <Search size={28} className="text-pink-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Total Applicants</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{totalApplicants}</h2>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-5 transition-transform hover:scale-105">
            <div className="p-4 bg-blue-500/10 rounded-2xl">
              <Building2 size={28} className="text-blue-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Active Companies</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{totalCompanies}</h2>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between gap-6 mb-12'>
          <div className="text-left">
            <h1 className='font-extrabold text-3xl text-gray-900 dark:text-white mb-2'>Active Job Postings</h1>
            <p className="text-gray-500 dark:text-gray-400">Monitor and manage your active job listings and applicants</p>
          </div>

          <div className='flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0'>
            <Button
              onClick={() => navigate("/")}
              variant="link"
              className="text-gray-500 hover:text-[#6A38C2] font-bold"
            >
              Go to Main Site
            </Button>
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-12 h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm focus:ring-[#6A38C2]"
                placeholder="Filter by role or company..."
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-[#6A38C2] hover:bg-[#5a2fb0] text-white h-12 px-6 rounded-xl font-bold shadow-lg shadow-[#6A38C2]/20 transition-all active:scale-95"
            >
              <Plus className="mr-2" size={20} /> Post New Job
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs