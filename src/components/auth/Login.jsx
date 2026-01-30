import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                const targetPath = res.data.user.role === 'recruiter' ? "/admin/companies" : "/profile";
                navigate(targetPath);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            const targetPath = user.role === 'recruiter' ? "/admin/companies" : "/profile";
            navigate(targetPath);
        }
    }, [user, navigate])

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-6 py-20'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-700'
                >
                    <div className="text-center mb-10">
                        <h1 className='font-black text-4xl text-gray-900 dark:text-white mb-2 uppercase tracking-tighter'>Welcome Back</h1>
                        <p className="text-gray-500 font-medium font-bold">Sign in to your Avengers account</p>
                    </div>

                    <div className='space-y-6'>
                        <div className='flex flex-col gap-2'>
                            <Label className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                className="h-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="h-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                            />
                        </div>

                        <div className='py-2'>
                            <Label className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1 mb-4 block text-center">I am a...</Label>
                            <RadioGroup
                                defaultValue="student"
                                className="flex items-center justify-center gap-8"
                                onValueChange={(value) => setInput({ ...input, role: value })}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="student" id="r1" className="border-[#6A38C2] text-[#6A38C2]" />
                                    <Label htmlFor="r1" className="font-black cursor-pointer transition-colors hover:text-[#6A38C2] text-sm uppercase">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="recruiter" id="r2" className="border-[#6A38C2] text-[#6A38C2]" />
                                    <Label htmlFor="r2" className="font-black cursor-pointer transition-colors hover:text-[#6A38C2] text-sm uppercase">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button disabled className="w-full h-14 mt-10 rounded-2xl bg-[#6A38C2] font-black uppercase tracking-widest">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Verifying...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-14 mt-10 rounded-2xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-black uppercase tracking-widest shadow-xl shadow-[#6A38C2]/20 transition-all active:scale-95 text-lg">
                                Sign In
                            </Button>
                        )
                    }

                    <div className="flex flex-col gap-4 mt-8 text-center border-t border-gray-50 dark:border-gray-700 pt-8 font-bold">
                        <span className='text-xs text-gray-500'>
                            Don't have an account?
                            <Link to="/signup" className='text-[#6A38C2] font-black hover:underline underline-offset-4 ml-2'>Register Now</Link>
                        </span>
                        <Link to="/forgot-password" size="sm" className='text-[10px] text-gray-400 font-bold hover:text-[#6A38C2] uppercase tracking-widest'>Forgot Credentials?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login