import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, MailCheck, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSent(true);
            toast.success("Password reset link sent to your email!");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className='flex items-center justify-center flex-grow px-6 py-20 relative overflow-hidden'>
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#6A38C2]/5 rounded-full -ml-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full -mr-48 -mb-48 blur-3xl" />

                <div className='w-full max-w-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] p-10 shadow-2xl relative z-10'>
                    {!sent ? (
                        <>
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    <Sparkles size={12} /> Account Recovery
                                </div>
                                <h1 className='font-black text-3xl text-gray-900 dark:text-white mb-2 uppercase tracking-tighter'>Reset Access</h1>
                                <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">
                                    Enter your registered email and we'll help you back in.
                                </p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">
                                <div className='space-y-2'>
                                    <Label className="font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-widest pl-1">Email Address</Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="yourname@example.com"
                                        className="h-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 focus:ring-[#6A38C2]"
                                    />
                                </div>

                                {loading ? (
                                    <Button disabled className="w-full h-14 rounded-2xl bg-[#6A38C2] font-black uppercase tracking-widest">
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Sending...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full h-14 rounded-2xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white font-black uppercase tracking-widest shadow-xl shadow-[#6A38C2]/20 transition-all active:scale-95 text-lg">
                                        Recover Account
                                    </Button>
                                )}
                            </form>

                            <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-700 text-center">
                                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-[#6A38C2] font-black uppercase tracking-widest hover:gap-4 transition-all">
                                    <ArrowLeft size={16} /> Back to Sign In
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-500/10 rotate-3">
                                <MailCheck className="text-green-500" size={48} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter uppercase">Check Inbox</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-10 font-medium leading-relaxed">
                                We've sent a recovery link to <br />
                                <span className="font-black text-[#6A38C2] bg-[#6A38C2]/5 px-2 py-0.5 rounded-md text-xs tracking-wider break-all">{email}</span>
                            </p>
                            <Button
                                onClick={() => setSent(false)}
                                variant="outline"
                                className="w-full h-12 rounded-xl border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-widest hover:bg-gray-50"
                            >
                                Try different email
                            </Button>
                            <div className="mt-8">
                                <Link to="/login" className="text-xs text-[#6A38C2] font-black uppercase tracking-widest hover:underline underline-offset-4">
                                    Finalize Sign In
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
