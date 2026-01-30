import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  LogOut,
  User2,
  Sun,
  Moon,
  Home,
  Briefcase,
  Search,
  GraduationCap,
  Compass,
  Building2,
  Zap
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      // ✅ Case 1: Backend successfully logs out
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      // ✅ Case 2: Backend says "Unauthorized" (401)
      // This happens if the token expired or server restarted. 
      // We force a local logout so the user isn't stuck.
      dispatch(setUser(null));
      navigate("/");
      toast.success("Logged out successfully");
    }
  };

  const studentLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Browse", path: "/browse", icon: Search },
    { name: "Courses", path: "/courses", icon: GraduationCap },
    { name: "Career Advice", path: "/career-advice", icon: Compass },
  ];

  const recruiterLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Companies", path: "/admin/companies", icon: Building2 },
    { name: "Jobs", path: "/admin/jobs", icon: Briefcase },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* 🏆 PREMIUM BRAND LOGO */}
        <Link to="/" className="group relative flex flex-col leading-tight">

          <div className="flex items-center font-extrabold text-2xl tracking-wider">
            {/* ZAP ICON */}
            <div className="mr-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-yellow-500/20 group-hover:rotate-12 transition-transform duration-500">
              <Zap size={24} fill="white" />
            </div>

            {/* ZAP */}
            <span className="text-gray-900 dark:text-white transition-all duration-500 group-hover:text-yellow-500">
              ZAP
            </span>

            {/* HIRE */}
            <span className="text-[#6A38C2] transition-all duration-500 group-hover:text-pink-500">
              HIRE
            </span>
          </div>

          {/* TAGLINE */}
          <span className="text-[10px] tracking-[0.3em] text-gray-500 dark:text-gray-400">
            LIGHTNING FAST RECRUITMENT
          </span>

          {/* GLOW LINE */}
          <span
            className="absolute -bottom-2 left-1/2 w-0 h-0.5 
            bg-gradient-to-r from-yellow-400 to-[#6A38C2]
            transition-all duration-500 group-hover:w-full group-hover:left-0"
          ></span>
        </Link>

        {/* CENTER NAV */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200 font-medium">
          {(user?.role?.toLowerCase() === "recruiter" ? recruiterLinks : studentLinks).map(
            (item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="relative group">
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                  >
                    {({ isActive }) => (
                      <>
                        <div className={`flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 ${isActive ? 'text-[#6A38C2] font-extrabold' : 'group-hover:text-[#6A38C2]'}`}>
                          <Icon size={18} />
                          {item.name}
                        </div>

                        {/* THE UNDERLINE: FULL IF ACTIVE, EXPAND ON HOVER */}
                        <span
                          className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#6A38C2] to-pink-500 transition-all duration-500 shadow-[0_1px_4px_rgba(106,56,194,0.3)]
                          ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                        ></span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            }
          )}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* 🌙 THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
            transition-all duration-300 hover:rotate-12"
          >
            {darkMode ? (
              <Sun className="text-yellow-400 drop-shadow-md" />
            ) : (
              <Moon className="drop-shadow-md" />
            )}
          </button>

          {!user ? (
            <Link to="/login">
              <Button
                className="bg-[#6A38C2] hover:bg-[#5b30a6] px-8 h-12 rounded-xl 
                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[#6A38C2]/20 font-bold"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar
                  className="cursor-pointer transition-all duration-300 ring-2 ring-transparent
                  hover:scale-105 hover:ring-[#6A38C2]/30 active:scale-95 shadow-md"
                >
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback className="bg-[#6A38C2] text-white font-bold text-sm">
                    {user?.fullname?.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 mt-4 p-5 rounded-2xl shadow-2xl border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                <div className="space-y-5">
                  <div className="flex gap-4 items-center">
                    <Avatar className="h-14 w-14 ring-2 ring-[#6A38C2]/10">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback className="bg-[#6A38C2] text-white font-bold text-lg">
                        {user?.fullname?.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-gray-900 dark:text-white truncate">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic line-clamp-1">
                        {user?.profile?.bio || "No bio added"}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800 w-full" />

                  <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#6A38C2] group"
                      >
                        <User2 size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">View Profile</span>
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 group w-full text-left"
                    >
                      <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Logout Account</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;