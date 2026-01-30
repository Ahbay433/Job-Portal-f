import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { MapPin, Briefcase, DollarSign, BarChart3, XCircle } from 'lucide-react'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Gurgaon", "Chennai", "Noida"]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "Data Scientist",
            "AI/ML Engineer",
            "Cloud Engineer",
            "Prompt Engineer",
            "UI/UX Designer",
            "Data Analyst"
        ]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh", "6lakh to 10lakh", "10lakh to 20lakh", "25lakh+"]
    },
    {
        filterType: "Experience",
        array: ["Fresher", "Mid Level", "Senior Level"]
    }
];

const FilterCard = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');

    const getIcon = (type) => {
        switch (type) {
            case "Location": return <MapPin size={16} className="text-pink-500" />;
            case "Industry": return <Briefcase size={16} className="text-[#6A38C2]" />;
            case "Salary": return <DollarSign size={16} className="text-green-500" />;
            case "Experience": return <BarChart3 size={16} className="text-blue-500" />;
            default: return null;
        }
    }

    useEffect(() => {
        if (searchedQuery) {
            const [loc, ind, sal, exp] = searchedQuery.split('|');
            setSelectedLocation(loc || '');
            setSelectedIndustry(ind || '');
            setSelectedSalary(sal || '');
            setSelectedExperience(exp || '');
        }
    }, [searchedQuery]);

    useEffect(() => {
        const combined = `${selectedLocation}|${selectedIndustry}|${selectedSalary}|${selectedExperience}`;
        if (combined !== searchedQuery) {
            dispatch(setSearchedQuery(combined));
        }
    }, [selectedLocation, selectedIndustry, selectedSalary, selectedExperience, searchedQuery, dispatch]);

    const clearAll = () => {
        setSelectedLocation('');
        setSelectedIndustry('');
        setSelectedSalary('');
        setSelectedExperience('');
    };

    return (
        <div className='w-full bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 sticky top-24 overflow-y-auto h-[88vh] custom-scrollbar'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='font-black text-2xl text-gray-900 dark:text-white uppercase tracking-tighter'>Filter Jobs</h1>
                <button
                    onClick={clearAll}
                    className='p-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:text-red-700 transition-all hover:scale-110'
                    title="Clear All Filters"
                >
                    <XCircle size={20} />
                </button>
            </div>

            <div className="space-y-8">
                {filterData.map((data, index) => (
                    <div key={index} className='space-y-4'>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner">
                                {getIcon(data.filterType)}
                            </div>
                            <h2 className='font-black text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500'>{data.filterType}</h2>
                        </div>

                        <RadioGroup
                            value={
                                data.filterType === "Location" ? selectedLocation :
                                    data.filterType === "Industry" ? selectedIndustry :
                                        data.filterType === "Salary" ? selectedSalary :
                                            selectedExperience
                            }
                            onValueChange={value => {
                                if (data.filterType === "Location") setSelectedLocation(value);
                                else if (data.filterType === "Industry") setSelectedIndustry(value);
                                else if (data.filterType === "Salary") setSelectedSalary(value);
                                else setSelectedExperience(value);
                            }}
                            className="grid grid-cols-1 gap-2"
                        >
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                const isSelected = (
                                    data.filterType === "Location" ? selectedLocation === item :
                                        data.filterType === "Industry" ? selectedIndustry === item :
                                            data.filterType === "Salary" ? selectedSalary === item :
                                                selectedExperience === item
                                );

                                return (
                                    <div
                                        className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all cursor-pointer border ${isSelected ? 'bg-[#6A38C2]/5 border-[#6A38C2]/20 shadow-sm' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50'}`}
                                        key={itemId}
                                        onClick={() => {
                                            if (data.filterType === "Location") setSelectedLocation(item);
                                            else if (data.filterType === "Industry") setSelectedIndustry(item);
                                            else if (data.filterType === "Salary") setSelectedSalary(item);
                                            else setSelectedExperience(item);
                                        }}
                                    >
                                        <RadioGroupItem value={item} id={itemId} className="border-[#6A38C2] text-[#6A38C2]" />
                                        <Label htmlFor={itemId} className={`cursor-pointer text-sm font-bold transition-colors ${isSelected ? 'text-[#6A38C2]' : 'text-gray-600 dark:text-gray-400'}`}>
                                            {item}
                                        </Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </div>
                ))}
            </div>

            {/* Clear Filters Button at Bottom */}
            {(selectedLocation || selectedIndustry || selectedSalary || selectedExperience) && (
                <Button
                    onClick={clearAll}
                    variant="outline"
                    className="w-full mt-10 h-12 rounded-2xl border-2 border-red-100 dark:border-red-950 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg active:scale-95"
                >
                    Clear All Active Selection
                </Button>
            )}
        </div>
    );
};

export default FilterCard;