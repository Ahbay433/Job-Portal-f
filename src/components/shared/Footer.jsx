import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Briefcase,
  Zap,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION: BRAND & LINKS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-yellow-500/20">
                <Zap size={22} fill="white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-white">Zap</span>
                <span className="text-[#6A38C2]">Hire</span>
              </h2>
            </div>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-sm">
              The world's fastest job platform. We help professionals find their dream careers and companies hire top-tier talent through lightning-fast matching.
            </p>

            <div className="flex gap-3">
              {[
                { icon: Facebook, color: "hover:bg-[#1877F2] hover:border-[#1877F2]", href: "#" },
                { icon: Twitter, color: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2]", href: "#" },
                { icon: Linkedin, color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]", href: "#" },
                { icon: Github, color: "hover:bg-[#24292F] hover:border-[#24292F]", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 ${item.color} hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg`}
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Candidates</h4>
            <ul className="space-y-4">
              {["Browse Jobs", "Browse Companies", "Career Advice", "Skill Courses"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#6A38C2] transition-colors text-sm font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Employers */}
          <div className="lg:col-span-2">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Employers</h4>
            <ul className="space-y-4">
              {["Post a Job", "Candidate Search", "Recruitment AI", "Pricing"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#6A38C2] transition-colors text-sm font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <h4 className="text-gray-900 dark:text-white font-bold mb-2">Subscribe to our newsletter</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Get the latest job updates and career tips directly in your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-[#6A38C2]/30 transition-all text-sm"
                />
                <button className="bg-[#6A38C2] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#5a2fb0] transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <span className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-[10px] font-black text-gray-400">0</div>
              <span className="text-gray-900 dark:text-white font-bold uppercase tracking-widest text-[10px]">No Copyright</span>
            </span>
            <span className="hidden md:block w-1.5 h-1.5 bg-[#6A38C2]/20 rounded-full"></span>
            <span>Public Domain / CC0</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-[#6A38C2]/20 rounded-full"></span>
            <span className="flex items-center gap-1 group cursor-pointer">
              Built with <span className="text-red-500 group-hover:animate-ping">❤️</span> by <span className="text-gray-900 dark:text-white hover:text-[#6A38C2] transition-colors font-bold">ZapHire Team</span>
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400 font-semibold mb-2">
            <a href="#" className="hover:text-[#6A38C2] transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-[#6A38C2] transition-all">Terms of Service</a>
            <a href="#" className="hover:text-[#6A38C2] transition-all">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* ---------- REUSABLE COMPONENTS ---------- */

const FooterLink = ({ name }) => (
  <p
    className="footer-link
    mb-3 leading-relaxed
    transition-all duration-300
    hover:text-[#6A38C2]
    hover:translate-x-2"
  >
    {name}
  </p>
);

const SocialIcon = ({ icon: Icon }) => (
  <div
    className="w-10 h-10 flex items-center justify-center rounded-full
    bg-gray-100 dark:bg-gray-800
    text-gray-700 dark:text-gray-300

    transition-all duration-300 ease-out
    hover:bg-gradient-to-r hover:from-[#6A38C2] hover:to-[#8b5cf6]
    hover:text-white hover:-translate-y-1 hover:scale-110
    hover:shadow-xl cursor-pointer"
  >
    <Icon size={18} />
  </div>
);
