import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Badge } from './ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Clock, BookOpen, CheckCircle } from 'lucide-react';

const courseCategories = [
    {
        title: "Get Hired Series (Career Preparation)",
        description: "Essential for securing interviews and navigating the job market.",
        courses: [
            {
                title: "Resume & CV Writing Masterclass",
                desc: "How to write ATS-friendly resumes.",
                fullDesc: "Learn the secrets of recruiters and how ATS systems parse your resume. This masterclass covers formatting, keyword optimization, and power verbs to make your profile stand out.",
                duration: "4 Hours",
                syllabus: ["ATS Fundamentals", "Formatting for Success", "Keyword Research", "Case Studies"]
            },
            {
                title: "Interview Success Strategies",
                desc: "Behavioral prep (STAR method), technical basics, and mock interviews.",
                fullDesc: "Cracking an interview is a skill. We teach you how to handle high-pressure questions, present your experience effectively using the STAR method, and follow up professionally.",
                duration: "6 Hours",
                syllabus: ["The STAR Method", "Common Behavioral Qs", "Technical Fundamentals", "Mock Scenarios"]
            },
            {
                title: "LinkedIn & Personal Branding",
                desc: "Optimizing profiles for recruiters and networking strategies.",
                fullDesc: "Your LinkedIn profile is your 24/7 digital representative. Learn how to optimize your headline, about section, and how to effectively network with industry leaders.",
                duration: "3 Hours",
                syllabus: ["Profile Optimization", "Networking Ethics", "Content Strategy", "Job Search Hacks"]
            }
        ]
    },
    {
        title: "Essential Soft Skills",
        description: "Critical skills employers look for beyond technical expertise.",
        courses: [
            {
                title: "Effective Communication",
                desc: "Business writing, public speaking, and active listening.",
                fullDesc: "Communication is more than just talking. Master the art of clarity in emails, confidence in meetings, and the power of listening to build trust.",
                duration: "5 Hours",
                syllabus: ["Verbal vs Non-Verbal", "Business Writing 101", "Public Speaking", "Conflict Resolution"]
            },
            {
                title: "Emotional Intelligence (EQ)",
                desc: "Empathy, self-awareness, and managing workplace relationships.",
                fullDesc: "EQ is often more important than IQ in leadership. Develop self-awareness and empathy to navigate complex workplace dynamics and lead teams effectively.",
                duration: "4 Hours",
                syllabus: ["The 5 Pillars of EQ", "Self-Regulation", "Empathy in Practice", "Team Dynamics"]
            }
        ]
    },
    {
        title: "High-Demand Technical Skills",
        description: "The most searched-for skills by recruiters right now.",
        courses: [
            {
                title: "AI & GenAI Fundamentals",
                desc: "Intro to GenAI, Prompt Engineering, and AI ethics.",
                fullDesc: "Understand the AI revolution. Learn how to use Generative AI tools like ChatGPT effectively through advanced prompt engineering while maintaining ethical standards.",
                duration: "8 Hours",
                syllabus: ["History of AI", "How LLMs Work", "Prompt Engineering", "AI Ethics & Future"]
            },
            {
                title: "Web Development (React.js)",
                desc: "Modern frontend development with React and Vite.",
                fullDesc: "Build dynamic, responsive web applications using the most popular frontend library. We cover hooks, state management, and modern component design.",
                duration: "20 Hours",
                syllabus: ["React Basics", "Hooks (useState/Effect)", "State Management", "Deployment"]
            }
        ]
    }
];

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleViewDetails = (course) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Upgrade Your Skills
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Explore our curated courses to boost your career and stay ahead in 2025.
                    </p>
                </div>

                <div className="space-y-12">
                    {courseCategories.map((category, index) => (
                        <div key={index} className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white relative inline-block pb-2">
                                    {category.title}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#6A38C2] rounded-full"></span>
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto italic">
                                    {category.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.courses.map((course, cIndex) => (
                                    <div
                                        key={cIndex}
                                        className="
                                            bg-white dark:bg-gray-800 rounded-xl shadow-md 
                                            hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                                            border border-gray-100 dark:border-gray-700
                                            flex flex-col overflow-hidden group
                                        "
                                    >
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="mb-4">
                                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 uppercase text-xs font-bold px-2 py-1 rounded">
                                                    Course
                                                </Badge>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#6A38C2] transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                                                {course.desc}
                                            </p>
                                        </div>
                                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                                            <button
                                                onClick={() => handleViewDetails(course)}
                                                className="w-full py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-300"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Details Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl overflow-hidden rounded-3xl p-0 border-none shadow-2xl">
                    <div className="h-2 bg-gradient-to-r from-[#6A38C2] to-pink-500"></div>
                    <div className="p-8">
                        <DialogHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-[#6A38C2]/10 text-[#6A38C2] hover:bg-[#6A38C2]/20 border-none">
                                    Learning Module
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-gray-500 font-medium ml-auto">
                                    <Clock size={14} />
                                    {selectedCourse?.duration || "N/A"}
                                </div>
                            </div>
                            <DialogTitle className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                {selectedCourse?.title}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                                    <BookOpen size={16} /> Overview
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {selectedCourse?.fullDesc || selectedCourse?.desc}
                                </p>
                            </div>

                            {selectedCourse?.syllabus && (
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                                        <CheckCircle size={16} /> What you'll learn
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedCourse.syllabus.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                                                <div className="w-2 h-2 rounded-full bg-[#6A38C2]"></div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button className="flex-1 py-4 rounded-xl bg-[#6A38C2] text-white font-bold hover:bg-[#5a2fb0] transition-all shadow-lg shadow-[#6A38C2]/20">
                                Enroll Now
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className="flex-1 py-4 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Courses;
