import React from 'react'
import { Button } from './ui/button'
import { MapPin, Heart, History } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(106,56,194,0.1)] relative group'>
            <div className='flex items-center justify-between mb-4'>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-900 text-[10px] font-black uppercase text-gray-500 tracking-widest border border-gray-100 dark:border-gray-700">
                    <History size={12} className="text-[#6A38C2]" />
                    {daysAgoFunction(job?.createdAt) === 0 ? "Posted Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
                </div>
                <Button
                    variant="ghost"
                    className="rounded-2xl w-10 h-10 p-0 text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all active:scale-95"
                    size="icon"
                >
                    <Heart size={20} className="fill-transparent group-hover:fill-current transition-all" />
                </Button>
            </div>

            <div className='flex items-center gap-4 mb-6'>
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center p-2 shadow-inner group-hover:scale-110 transition-transform">
                    <Avatar className="w-full h-full rounded-xl">
                        <AvatarImage src={job?.company?.logo} className="object-contain" />
                    </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className='font-black text-xl text-gray-900 dark:text-white truncate uppercase tracking-tighter leading-tight'>{job?.company?.name}</h2>
                    <p className='text-sm text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1 opacity-70'>
                        <MapPin size={12} className="text-pink-500" /> {job?.location || "Remote"}
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <h1 className='font-black text-2xl text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-[#6A38C2] transition-colors'>{job?.title}</h1>
                <p className='text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-2 leading-relaxed h-10'>
                    {job?.description}
                </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mb-8'>
                <Badge className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-none px-3 py-1.5 rounded-xl font-black text-[10px] uppercase shadow-sm">
                    {job?.position} Openings
                </Badge>
                <Badge className="bg-pink-50 dark:bg-pink-900/20 text-pink-500 border-none px-3 py-1.5 rounded-xl font-black text-[10px] uppercase shadow-sm">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-[#6A38C2]/10 text-[#6A38C2] border-none px-3 py-1.5 rounded-xl font-black text-[10px] uppercase shadow-sm">
                    {job?.experienceLevel}
                </Badge>
                <Badge className="bg-green-50 dark:bg-green-900/20 text-green-600 border-none px-3 py-1.5 rounded-xl font-black text-[10px] uppercase shadow-sm">
                    {job?.salary && (job.salary.toString().toLowerCase().includes('k') || job.salary.toString().toLowerCase().includes('lakh'))
                        ? job.salary
                        : `${job?.salary}LPA`}
                </Badge>
            </div>

            <div className='flex items-center gap-3 w-full'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="flex-1 h-12 rounded-2xl border-2 border-gray-100 dark:border-gray-700 font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:border-[#6A38C2]/30 transition-all shadow-md active:scale-95"
                >
                    View Insights
                </Button>
                <Button className="flex-1 h-12 rounded-2xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#6A38C2]/20 transition-all active:scale-95">
                    Save Role
                </Button>
            </div>
        </div>
    )
}

export default Job