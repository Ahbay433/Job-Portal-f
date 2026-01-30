import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Loader2, Upload, User } from "lucide-react";

const Signup = () => {
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "student",
    file: "",
  });

  const [preview, setPreview] = useState("");

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file: file });
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) {
      return toast.error("Please select a role");
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (user) {
      const targetPath = user.role === 'recruiter' ? "/admin/companies" : "/profile";
      navigate(targetPath);
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-6 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-[3rem] p-12 shadow-2xl border border-gray-100 dark:border-gray-700"
        >
          <div className="text-center mb-10">
            <h1 className="font-black text-4xl text-gray-900 dark:text-white mb-2 uppercase tracking-tighter">Create Profile</h1>
            <p className="text-gray-500 font-medium font-bold">Join the Avengers Hire recruitment platform</p>
          </div>

          {/* PROFILE PHOTO CIRCLE */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group cursor-pointer">
              <label htmlFor="profilePhoto" className="cursor-pointer">
                <div
                  className="w-28 h-28 rounded-full border-4 border-[#6A38C2]/10 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden hover:scale-105 transition-all shadow-xl ring-4 ring-white dark:ring-gray-800"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <User className="w-10 h-10 text-[#6A38C2]" />
                      <span className="text-[10px] font-black uppercase text-[#6A38C2]/40">Photo</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-1 right-1 bg-[#6A38C2] p-2 rounded-full border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </label>

              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="e.g. Tony Stark"
                className="h-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Email Address</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="stark@avengers.com"
                className="h-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Secret Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="h-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
              />
            </div>

            <div className='py-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 px-6'>
              <Label className="font-black text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-4 block text-center">Identity Type</Label>
              <RadioGroup
                defaultValue="student"
                className="flex items-center justify-center gap-12"
                onValueChange={(val) => setInput({ ...input, role: val })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="rs1" className="border-[#6A38C2] text-[#6A38C2]" />
                  <Label htmlFor="rs1" className="font-black cursor-pointer transition-colors hover:text-[#6A38C2] text-xs uppercase">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="rs2" className="border-[#6A38C2] text-[#6A38C2]" />
                  <Label htmlFor="rs2" className="font-black cursor-pointer transition-colors hover:text-[#6A38C2] text-xs uppercase">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full h-14 mt-10 rounded-2xl bg-[#6A38C2] font-black uppercase tracking-widest">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Preparing Suit...
            </Button>
          ) : (
            <Button type="submit" className="w-full h-14 mt-10 rounded-2xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-black uppercase tracking-widest shadow-xl shadow-[#6A38C2]/20 transition-all active:scale-95 text-lg">
              Assemble Profile
            </Button>
          )}

          <div className="flex flex-col gap-4 mt-8 text-center border-t border-gray-50 dark:border-gray-700 pt-8 font-bold">
            <span className="text-xs text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#6A38C2] font-black hover:underline underline-offset-4 ml-2">
                Sign In Instead
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;