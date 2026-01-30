import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Contact, Mail, Pen, FileText, ArrowLeft, Briefcase, GraduationCap, Compass, Bookmark, History, ShieldCheck, Heart } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
            <Navbar />
            <div className='max-w-5xl mx-auto px-6 py-12'>
                {/* Profile Portfolio Card */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                    {/* Decorative Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6A38C2]/5 to-pink-500/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110" />

                    <div className='flex flex-col md:flex-row justify-between items-start gap-8 relative z-10'>
                        <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
                            <Avatar className="h-32 w-32 ring-4 ring-white dark:ring-gray-900 shadow-2xl border-4 border-[#6A38C2]/10 transition-transform hover:scale-105">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                <AvatarFallback className="bg-[#6A38C2] text-white text-4xl font-black">
                                    {user?.fullname?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center md:text-left space-y-3">
                                <h1 className='font-black text-4xl text-gray-900 dark:text-white tracking-tight uppercase leading-none'>{user?.fullname}</h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-xl italic">
                                    " {user?.profile?.bio || "A passionate professional looking for great opportunities."} "
                                </p>

                                <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4'>
                                    <div className='flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:bg-white dark:hover:bg-gray-800'>
                                        <Mail size={16} className="text-[#6A38C2]" />
                                        <span className="font-bold text-gray-700 dark:text-gray-300">{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:bg-white dark:hover:bg-gray-800'>
                                        <Contact size={16} className="text-pink-500" />
                                        <span className="font-bold text-gray-700 dark:text-gray-300">{user?.phoneNumber || "No contact info"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-[#6A38C2] hover:bg-[#5a2fb0] text-white rounded-2xl h-14 px-6 gap-2 font-bold shadow-lg shadow-[#6A38C2]/20 transition-all active:scale-95"
                        >
                            <Pen size={18} /> Edit Profile
                        </Button>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-50 dark:border-gray-700/50 pt-10 relative z-10">
                        {/* Skills Section */}
                        <div className="space-y-4">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#6A38C2]" /> Areas of Expertise
                            </h2>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    user?.profile?.skills?.length !== 0 ? (
                                        user?.profile?.skills?.map((item, index) => (
                                            <Badge key={index} className="bg-gray-50 dark:bg-gray-900/50 hover:bg-[#6A38C2]/10 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm text-sm font-bold transition-all hover:-translate-y-1">
                                                {item}
                                            </Badge>
                                        ))
                                    ) : <span className="text-gray-400 italic font-medium">No skills added yet</span>
                                }
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className="space-y-4">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-pink-500" /> Career Documentation
                            </h2>
                            {
                                user?.profile?.resume ? (
                                    <a
                                        target='blank'
                                        href={user?.profile?.resume}
                                        className='flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#6A38C2]/10 to-pink-500/10 border border-white dark:border-gray-800 shadow-xl transition-all hover:scale-[1.02] group/resume'
                                    >
                                        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-md">
                                            <FileText size={24} className="text-pink-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-black text-gray-900 dark:text-white truncate max-w-[200px]">{user?.profile?.resumeOriginalName}</p>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Click to download/view resume</p>
                                        </div>
                                        <div className="p-2 transition-transform group-hover/resume:translate-x-1">
                                            <ArrowLeft className="rotate-180 text-[#6A38C2]" size={20} />
                                        </div>
                                    </a>
                                ) : <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 text-gray-400 text-center font-bold">No Resume Uploaded</div>
                            }
                        </div>
                    </div>

                    {/* Dashboard Quick Access: Mission Control */}
                    <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10'>
                        <div
                            onClick={() => navigate("/jobs")}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl cursor-pointer transition-all hover:-translate-y-2 group hover:shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#6A38C2]/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                            <div className="w-14 h-14 rounded-2xl bg-[#6A38C2]/10 flex items-center justify-center text-[#6A38C2] mb-6 group-hover:bg-[#6A38C2] group-hover:text-white transition-all shadow-inner relative z-10">
                                <Briefcase size={28} />
                            </div>
                            <h3 className="font-black text-2xl mb-1 text-gray-900 dark:text-white relative z-10">Explore Jobs</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter relative z-10">Thousands of Openings</p>
                        </div>

                        <div
                            onClick={() => navigate("/courses")}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl cursor-pointer transition-all hover:-translate-y-2 group hover:shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-inner relative z-10">
                                <GraduationCap size={28} />
                            </div>
                            <h3 className="font-black text-2xl mb-1 text-gray-900 dark:text-white relative z-10">Courses</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter relative z-10">Skill Up Today</p>
                        </div>

                        <div
                            onClick={() => navigate("/career-advice")}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl cursor-pointer transition-all hover:-translate-y-2 group hover:shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner relative z-10">
                                <Compass size={28} />
                            </div>
                            <h3 className="font-black text-2xl mb-1 text-gray-900 dark:text-white relative z-10">Career Advice</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter relative z-10">Expert Guidance</p>
                        </div>
                    </div>
                </div>

                {/* DASHBOARD STATS OVERVIEW */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex items-center gap-4 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-[#6A38C2]">
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Applied</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white">{user?.profile?.appliedJobs?.length || 0}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex items-center gap-4 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                        <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-2xl text-pink-500">
                            <Bookmark size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Saved</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white">12</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex items-center gap-4 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-500">
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Courses</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white">4</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex items-center gap-4 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl text-green-500">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Badges</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white">2</p>
                        </div>
                    </div>
                </div>

                <div className='mt-12'>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-2 bg-[#6A38C2] rounded-full" />
                            <h1 className='font-black text-3xl text-gray-900 dark:text-white tracking-tighter uppercase'>Personal Mission Hub</h1>
                        </div>

                        {/* Interactive Tabs UI */}
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
                            <button className="px-6 py-2 rounded-xl bg-white dark:bg-gray-700 shadow-sm text-sm font-black text-[#6A38C2] transition-all">Applied</button>
                            <button className="px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-all flex items-center gap-2">
                                <Heart size={14} className="fill-current text-pink-500" /> Saved
                            </button>
                            <button className="px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-all">Learning</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                                <AppliedJobTable />
                            </div>
                        </div>

                        {/* Recent Activity & Sidebar Insights */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <History size={16} className="text-[#6A38C2]" /> Recent Activity
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        { title: "Applied to Frontend Dev", company: "Google", time: "2h ago", color: "bg-blue-500" },
                                        { title: "React Mastery Course", detail: "65% Completed", time: "5h ago", color: "bg-pink-500" },
                                        { title: "Profile Strength Up!", detail: "Added Skills", time: "1d ago", color: "bg-green-500" }
                                    ].map((act, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className="relative">
                                                <div className={`w-3 h-3 rounded-full mt-1.5 ${act.color} ring-4 ring-white dark:ring-gray-800 shadow-sm relative z-10 transition-transform group-hover:scale-125`} />
                                                {i !== 2 && <div className="absolute top-4 left-[5px] w-[2px] h-full bg-gray-100 dark:bg-gray-700" />}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 dark:text-white text-sm leading-none mb-1">{act.title}</p>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">{act.company || act.detail}</p>
                                                <p className="text-[10px] text-gray-400 mt-1 font-bold">{act.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="link" className="w-full mt-6 text-[#6A38C2] font-black text-xs uppercase tracking-widest hover:no-underline hover:translate-x-1 transition-transform p-0">
                                    View Activity Log →
                                </Button>
                            </div>

                            <div className="bg-gradient-to-br from-[#6A38C2] to-pink-500 rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                                <h2 className="font-black text-xl mb-2 relative z-10">Next Learning Goal</h2>
                                <p className="text-white/80 text-sm font-bold mb-6 relative z-10">Master Backend with Node.js to unlock Senior roles.</p>
                                <Button className="w-full bg-white text-[#6A38C2] hover:bg-white/90 rounded-2xl font-black uppercase tracking-widest text-xs h-12 relative z-10">
                                    Continue Learning
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile