import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import {
    BookOpen,
    FileText,
    Users,
    TrendingUp,
    Award,
    CheckCircle2,
    ArrowRight,
    Search,
    Info,
    Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';

const CareerAdvice = () => {
    const [selectedAdvice, setSelectedAdvice] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const adviceCategories = [
        {
            title: "Resume & Cover Letters",
            icon: <FileText className="text-blue-500" />,
            desc: "Expert guidance on crafting profiles that get noticed by top recruiters.",
            tips: [
                "Use industry-specific keywords for ATS optimization.",
                "Quantify your achievements with numbers and percentages.",
                "Keep your resume clean, modern, and maximum 2 pages."
            ],
            extendedTips: [
                "Tailor your resume for EVERY job application to highlight relevant skills.",
                "Use the 'Reverse Chronological' format as it is preferred by most recruiters.",
                "Avoid using complex graphics or tables that ATS might fail to read.",
                "Ensure your contact information and LinkedIn URL are up-to-date and professional."
            ],
            resources: ["Resume Templates", "ATS Keyword Scanner", "Cover Letter Builder"],
            color: "bg-blue-50"
        },
        {
            title: "Interview Preparation",
            icon: <Users className="text-purple-500" />,
            desc: "Master the art of storytelling and technical demonstrations.",
            tips: [
                "Master the STAR method for behavioral questions.",
                "Research the company culture and recent projects.",
                "Prepare 3-5 thoughtful questions for the interviewer."
            ],
            extendedTips: [
                "Situation, Task, Action, Result (STAR) helps you structure your answers effectively.",
                "Conduct a mock interview with a peer or use AI tools to record and review yourself.",
                "Dress appropriately for the company culture, even for virtual interviews.",
                "Have a stable internet connection and clean background for video calls."
            ],
            resources: ["Mock Interview Tool", "Common Q&A Bank", "Salary Calculator"],
            color: "bg-purple-50"
        },
        {
            title: "Salary Negotiation",
            icon: <TrendingUp className="text-green-500" />,
            desc: "Strategies to ensure you are compensated fairly for your value.",
            tips: [
                "Know your market value using data from Glassdoor/Indeed.",
                "Practice your pitch and highlight your unique value.",
                "Consider the total package (benefits, remote work, etc.)."
            ],
            extendedTips: [
                "Never be the first to mention a number; let the recruiter lead or give a range.",
                "Back up your request with specific achievements and the value you'll bring.",
                "Get the final offer in writing before resigning from your current position.",
                "Negotiate beyond just base pay: think about equity, bonuses, and PTO."
            ],
            resources: ["Market Rate Finder", "Negotiation Script", "Benefit Checklist"],
            color: "bg-green-50"
        },
        {
            title: "Career Growth",
            icon: <Award className="text-orange-500" />,
            desc: "Long-term strategies for continuous professional development.",
            tips: [
                "Build a strong personal brand on LinkedIn.",
                "Seek mentorship from leaders in your field.",
                "Continuous learning: Stay updated with new technologies."
            ],
            extendedTips: [
                "Post regular updates on LinkedIn to stay visible to your network and recruiters.",
                "Attend industry webinars and local meetups to expand your horizons.",
                "Set SMART goals for every quarter to track your professional progress.",
                "Learn to accept constructive criticism as a tool for rapid improvement."
            ],
            resources: ["LinkedIn Guide", "Mentorship Network", "Skill Roadmap"],
            color: "bg-orange-50"
        }
    ];

    const handleReadMore = (advice) => {
        setSelectedAdvice(advice);
        setOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#6A38C2] py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold mb-6"
                    >
                        Career <span className="text-pink-400">Excellence</span> Hub
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto"
                    >
                        Expert advice, proven strategies, and actionable tips to help you navigate your career path and land your dream job.
                    </motion.p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {adviceCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 rounded-2xl ${category.color} dark:bg-gray-700 group-hover:scale-110 transition-transform`}>
                                    {category.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {category.title}
                                </h2>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {category.tips.map((tip, idx) => (
                                    <li key={idx} className="flex gap-3 text-gray-600 dark:text-gray-300">
                                        <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleReadMore(category)}
                                className="flex items-center gap-2 text-[#6A38C2] font-semibold hover:gap-3 transition-all"
                            >
                                Read More <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-pink-500 to-[#6A38C2] text-white text-center"
                >
                    <BookOpen size={48} className="mx-auto mb-6 opacity-50" />
                    <p className="text-2xl italic font-medium mb-4">
                        "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."
                    </p>
                    <p className="text-lg opacity-80">- Steve Jobs</p>
                </motion.div>
            </div>

            {/* Advice Details Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl overflow-hidden rounded-3xl p-0 border-none shadow-2xl">
                    <div className="h-2 bg-gradient-to-r from-pink-500 to-[#6A38C2]"></div>
                    <div className="p-8">
                        <DialogHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-pink-100 text-pink-600 border-none">
                                    Strategic Advice
                                </Badge>
                                <span className="text-xs text-gray-400 font-medium ml-auto flex items-center gap-1">
                                    <Info size={14} /> Comprehensive Guide
                                </span>
                            </div>
                            <DialogTitle className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
                                {selectedAdvice?.title}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-8 space-y-8">
                            {/* Detailed Explanation */}
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                                    <Search size={16} /> Strategy Overview
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                    {selectedAdvice?.desc}
                                </p>
                            </div>

                            {/* Extended Actionable Tips */}
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                                    <CheckCircle2 size={16} className="text-green-500" /> Deep Dive Tips
                                </h4>
                                <div className="space-y-4">
                                    {selectedAdvice?.extendedTips?.map((tip, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                            <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-[#6A38C2] shrink-0 shadow-sm">
                                                {i + 1}
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-200 font-medium">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommended Tools/Resources */}
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                                    <Briefcase size={16} /> Recommended Resources
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedAdvice?.resources?.map((res, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            {res}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={() => setOpen(false)}
                                className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 transition-all"
                            >
                                Got it, Thanks!
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default CareerAdvice;
