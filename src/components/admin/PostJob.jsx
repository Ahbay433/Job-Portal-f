import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, ArrowLeft } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
            <Navbar />
            <div className='max-w-5xl mx-auto px-6 py-12'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-6 mb-10'>
                        <Button
                            onClick={() => navigate("/admin/jobs")}
                            variant="outline"
                            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-10 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            <ArrowLeft className="mr-2" size={18} />
                            <span className="font-bold">Back</span>
                        </Button>
                        <div>
                            <h1 className='font-extrabold text-3xl text-gray-900 dark:text-white'>Post New Opportunity</h1>
                            <p className="text-gray-500 dark:text-gray-400">Share your requirements with top talent across the platform</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            <div className="md:col-span-2 space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300 text-sm italic">SELECT AN ORGANIZATION</Label>
                                {
                                    companies.length > 0 ? (
                                        <Select onValueChange={selectChangeHandler}>
                                            <SelectTrigger className="h-14 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50/50 transition-all focus:ring-[#6A38C2]">
                                                <SelectValue placeholder="Which company is hiring?" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl border-gray-100 dark:border-gray-700 shadow-2xl">
                                                <SelectGroup>
                                                    {
                                                        companies.map((company) => (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()} className="rounded-xl py-3 focus:bg-[#6A38C2]/10 focus:text-[#6A38C2]">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 rounded-full bg-[#6A38C2]" />
                                                                    {company.name}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className='text-xs text-red-600 font-bold bg-red-50 p-4 rounded-xl border border-red-100'>* Please register a company first, before posting a jobs. Navigate to "Companies" to get started.</p>
                                    )
                                }
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Job Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="e.g. Noida, Delhi, Remote"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Annual Salary</Label>
                                <Input
                                    type="text"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="e.g. 15LPA - 20LPA"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Employment Type</Label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="e.g. Full-time, Contract"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Exp Level Required</Label>
                                <Input
                                    type="text"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="e.g. 2-5 years"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">No. of Openings</Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="3"
                                />
                            </div>

                            <div className="md:col-span-2 lg:col-span-3 space-y-2 border-t border-gray-50 dark:border-gray-700/50 pt-8">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Job Description</Label>
                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    rows={4}
                                    className="w-full p-4 rounded-xl border-gray-100 dark:border-gray-700 bg-transparent ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 transition-all font-medium text-gray-700 dark:text-gray-300 outline-none border shadow-sm"
                                    placeholder="A brief overview of the role and team..."
                                />
                            </div>

                            <div className="md:col-span-2 lg:col-span-3 space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Skills & Requirements</Label>
                                <textarea
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    rows={3}
                                    className="w-full p-4 rounded-xl border-gray-100 dark:border-gray-700 bg-transparent ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 transition-all font-medium text-gray-700 dark:text-gray-300 outline-none border shadow-sm"
                                    placeholder="e.g., React, Node.js, strong communication skills..."
                                />
                            </div>
                        </div>

                        <div className="mt-12 flex justify-end gap-4 border-t border-gray-50 dark:border-gray-700/50 pt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/jobs")}
                                className="h-12 px-8 rounded-xl font-bold border-gray-100 dark:border-gray-700"
                            >
                                Cancel
                            </Button>
                            {/* Disable if no company is registered */}
                            {
                                loading ? (
                                    <Button disabled className="h-12 px-10 rounded-xl bg-[#6A38C2]">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={companies.length === 0}
                                        className="h-12 px-10 rounded-xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-bold shadow-lg shadow-[#6A38C2]/20 transition-all disabled:opacity-50"
                                    >
                                        Share Posting
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob