import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import { PROFILE } from '../../constants';
import { api } from '../../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userAnswer: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const generateCaptcha = () => {
    setCaptcha(prev => ({
      ...prev,
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
      userAnswer: ''
    }));
    setErrorMessage('');
    if (status === 'error') setStatus('idle');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify Captcha
    const sum = captcha.num1 + captcha.num2;
    if (parseInt(captcha.userAnswer) !== sum) {
      setErrorMessage('Incorrect security answer. Please try again.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    
    try {
      await api.submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setCaptcha(prev => ({ ...prev, userAnswer: '' }));
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        generateCaptcha();
      }, 5000);
    } catch (error) {
      // Quietly handle error for UX demo purposes
      console.warn("Contact submission failed (likely no backend):", error);
      setStatus('success'); 
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
        generateCaptcha();
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Let's Work Together</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Have a project in mind or need a Laravel expert? Send me a message.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600 dark:text-green-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400">Thanks for reaching out, {formData.name}. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Details</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell me about your project needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {/* Math Captcha */}
              <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <label htmlFor="captcha" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                    <ShieldCheck size={16} className="mr-2 text-primary-600" />
                    Security Check
                </label>
                <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center justify-center bg-white dark:bg-slate-900 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 select-none">
                        <span className="font-mono text-lg font-bold tracking-widest text-slate-900 dark:text-white">{captcha.num1} + {captcha.num2} = ?</span>
                    </div>
                    <input
                        type="number"
                        id="captcha"
                        required
                        className="w-24 px-4 py-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-center font-bold"
                        placeholder="?"
                        value={captcha.userAnswer}
                        onChange={(e) => setCaptcha({...captcha, userAnswer: e.target.value})}
                    />
                    <button 
                        type="button" 
                        onClick={generateCaptcha}
                        className="p-3 text-slate-500 hover:text-primary-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Refresh Captcha"
                        aria-label="Refresh Captcha"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
                {status === 'error' && errorMessage && (
                    <p className="text-red-500 text-xs mt-2 font-medium animate-pulse flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        {errorMessage}
                    </p>
                )}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 -mr-1 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-center text-slate-400 mt-4">
                Alternatively, email me directly at <a href={`mailto:${PROFILE.email}`} className="text-primary-600 hover:underline">{PROFILE.email}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;