import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-6 py-12'>
                <div className='flex items-center gap-6 mb-10'>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-10 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                        <ArrowLeft className="mr-2" size={18} />
                        <span className="font-bold">Back</span>
                    </Button>
                    <div>
                        <h1 className='font-extrabold text-3xl text-gray-900 dark:text-white'>Candidate Management</h1>
                        <p className="text-gray-500 dark:text-gray-400">Review and shortlist applicants for your job posting</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-6 px-4">
                        <div className="px-3 py-1 bg-[#6A38C2]/10 text-[#6A38C2] rounded-lg font-black text-sm uppercase tracking-wider">
                            {applicants?.applications?.length || 0} Total Applicants
                        </div>
                    </div>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants