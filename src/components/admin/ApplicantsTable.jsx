import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Mail, Phone, FileText, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="overflow-hidden">
            <Table>
                <TableCaption className="pb-4">A complete list of users who applied to this position</TableCaption>
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                    <TableRow>
                        <TableHead className="font-bold text-gray-900 dark:text-white rounded-tl-2xl px-6">Candidate Information</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white">Email Address</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white text-center">Contact Info</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white">Documentation</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white">Applied Date</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white text-center">Status</TableHead>
                        <TableHead className="text-right font-bold text-gray-900 dark:text-white rounded-tr-2xl px-6">Shortlist</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                <TableCell className="py-5 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#6A38C2]/10 flex items-center justify-center text-[#6A38C2] font-black">
                                            {item?.applicant?.fullname?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white leading-none mb-1">{item?.applicant?.fullname}</p>
                                            <p className="text-xs text-gray-500 font-medium">Candidate Profile</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-gray-400" />
                                        {item?.applicant?.email}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-medium text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center justify-center gap-2">
                                        <Phone size={14} className="text-gray-400" />
                                        {item?.applicant?.phoneNumber}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume ? (
                                            <a
                                                className="flex items-center gap-2 text-[#6A38C2] hover:text-[#5a2fb0] font-bold transition-all group"
                                                href={item?.applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FileText size={16} className="group-hover:scale-110 transition-transform" />
                                                <span className="truncate max-w-[120px]">{item?.applicant?.profile?.resumeOriginalName}</span>
                                            </a>
                                        ) : <span className="text-gray-400 font-medium italic">No Resume</span>
                                    }
                                </TableCell>
                                <TableCell className="font-medium text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-[#6A38C2]/40" />
                                        {item?.applicant.createdAt.split("T")[0]}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className={`mx-auto w-fit px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${item?.status === 'accepted' ? 'bg-green-50 text-green-600 border-green-200' :
                                        item?.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                            'bg-gray-50 text-gray-500 border-gray-200'
                                        }`}>
                                        {item?.status || 'Pending'}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right px-6">
                                    <Popover>
                                        <PopoverTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                            <MoreHorizontal size={20} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 rounded-2xl p-2 shadow-2xl border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div
                                                            onClick={() => statusHandler(status, item?._id)}
                                                            key={index}
                                                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold transition-all group my-1 ${status === 'Accepted' ? 'hover:bg-green-50 hover:text-green-600' : 'hover:bg-red-50 hover:text-red-600'
                                                                }`}
                                                        >
                                                            {status === 'Accepted' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
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

export default ApplicantsTable