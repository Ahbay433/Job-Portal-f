import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-6 py-12'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6 mb-12'>
                    <div className="text-left">
                        <h1 className='font-extrabold text-3xl text-gray-900 dark:text-white mb-2'>Registered Companies</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your organizations and their hiring profiles</p>
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
                                placeholder="Filter by name..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-[#6A38C2] hover:bg-[#5a2fb0] text-white h-12 px-6 rounded-xl font-bold shadow-lg shadow-[#6A38C2]/20 transition-all active:scale-95"
                        >
                            <Plus className="mr-2" size={20} /> New Company
                        </Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies