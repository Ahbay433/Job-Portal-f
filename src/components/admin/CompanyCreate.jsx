import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-4xl mx-auto px-6 py-12'>
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
                        <h1 className='font-extrabold text-3xl text-gray-900 dark:text-white'>Register New Company</h1>
                        <p className="text-gray-500 dark:text-gray-400">What would you like to call your organization? You can change this later.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-700 max-w-2xl">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="font-bold text-gray-700 dark:text-gray-300">Company Name</Label>
                            <Input
                                type="text"
                                className="h-14 rounded-xl border-gray-100 dark:border-gray-700 focus:ring-[#6A38C2] text-lg font-medium"
                                placeholder="e.g. Google, Microsoft, Avengers Hire"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center gap-4 pt-4'>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="h-12 flex-1 rounded-xl font-bold border-gray-100 dark:border-gray-700 shadow-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={registerNewCompany}
                                className="h-12 flex-1 rounded-xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-bold shadow-lg shadow-[#6A38C2]/20 transition-all active:scale-95"
                            >
                                Continue <ChevronRight className="ml-2" size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate