import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
            <Navbar />
            <div className='max-w-4xl mx-auto px-6 py-12'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-6 mb-10'>
                        <Button
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-10 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            <ArrowLeft className="mr-2" size={18} />
                            <span className="font-bold">Back</span>
                        </Button>
                        <div>
                            <h1 className='font-extrabold text-3xl text-gray-900 dark:text-white'>Company Details</h1>
                            <p className="text-gray-500 dark:text-gray-400">Update your organization's public information</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="Enter company name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Website URL</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2]"
                                    placeholder="https://example.com"
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
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Company Logo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="h-12 pt-2.5 rounded-xl border-gray-100 dark:border-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#6A38C2]/10 file:text-[#6A38C2] hover:file:bg-[#6A38C2]/20 cursor-pointer"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label className="font-bold text-gray-700 dark:text-gray-300">Company Description</Label>
                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    rows={4}
                                    className="w-full p-4 rounded-xl border-gray-100 dark:border-gray-700 bg-transparent ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 transition-all font-medium text-gray-700 dark:text-gray-300 outline-none border shadow-sm"
                                    placeholder="Tell potential candidates about your company culture and mission..."
                                />
                            </div>
                        </div>

                        <div className="mt-12 flex justify-end gap-4 border-t border-gray-50 dark:border-gray-700/50 pt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="h-12 px-8 rounded-xl font-bold border-gray-100 dark:border-gray-700"
                            >
                                Cancel
                            </Button>
                            {
                                loading ? (
                                    <Button disabled className="h-12 px-10 rounded-xl bg-[#6A38C2]">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="h-12 px-10 rounded-xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-bold shadow-lg shadow-[#6A38C2]/20 transition-all">
                                        Update Profile
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

export default CompanySetup