import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

const Auth: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        if (!supabase) {
            setError("Authentication service is not configured.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        if (!supabase) {
            setError("Authentication service is not configured.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Check your email for the login link!');
        }
        setLoading(false);
    };

    const formAction = isSignUp ? handleSignUp : handleLogin;
    const buttonText = isSignUp ? 'Sign Up' : 'Sign In';
    const formTitle = isSignUp ? 'Create a New Account' : 'Sign In to Your Account';

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900 font-sans">
            <div className="w-full max-w-sm p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-medium text-neutral-900 dark:text-white mb-2">Internify</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">{formTitle}</p>
                </div>
                <form className="space-y-6" onSubmit={formAction}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Email address</label>
                        <input
                            id="email"
                            className="w-full bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-0 focus:border-neutral-900 dark:focus:border-neutral-200 transition"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Password</label>
                        <input
                            id="password"
                            className="w-full bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-0 focus:border-neutral-900 dark:focus:border-neutral-200 transition"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex justify-center py-3 px-8 border border-transparent text-base font-medium rounded-md text-white bg-neutral-900 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:bg-neutral-400 disabled:cursor-not-allowed dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-offset-neutral-900 dark:disabled:bg-neutral-600 transition-colors"
                        >
                            {loading ? 'Processing...' : buttonText}
                        </button>
                    </div>
                     {error && <p className="text-sm text-center text-red-600 dark:text-red-400">{error}</p>}
                     {message && <p className="text-sm text-center text-green-600 dark:text-green-400">{message}</p>}
                </form>
                <div className="text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError(null);
                            setMessage(null);
                        }}
                        className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;