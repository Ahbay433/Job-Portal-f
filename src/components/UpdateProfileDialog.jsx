import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }



    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[480px] rounded-3xl border-none shadow-2xl p-0 overflow-hidden" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className="bg-[#6A38C2] p-8 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight relative z-10">Update Profile</DialogTitle>
                        <p className="text-white/70 text-sm font-medium relative z-10">Refine your professional details and resume</p>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className="p-8 bg-white dark:bg-gray-900">
                        <div className='grid gap-6 py-4'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="fullname" className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Full Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. John Doe"
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor="email" className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="h-12 rounded-xl border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor="phoneNumber" className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="h-12 rounded-xl border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="bio" className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Professional Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    placeholder="Briefly describe yourself..."
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="skills" className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Skills (Comma Separated)</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    placeholder="React, Node.js, Design..."
                                    className="h-12 rounded-xl border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='flex flex-col gap-2 bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800'>
                                <Label htmlFor="file" className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1 mb-1">Update Resume (PDF)</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="h-10 pt-1.5 border-none bg-transparent shadow-none focus-visible:ring-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <DialogFooter className="mt-8">
                            {
                                loading ? (
                                    <Button disabled className="w-full h-12 rounded-xl bg-[#6A38C2] font-bold">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving Changes...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full h-12 rounded-xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-bold shadow-lg shadow-[#6A38C2]/20 transition-all active:scale-95">
                                        Save All Changes
                                    </Button>
                                )
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog