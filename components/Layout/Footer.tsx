import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { PROFILE } from '../../constants';
import { api } from '../../services/api';

const Footer: React.FC = () => {
  const [profile, setProfile] = useState(PROFILE);

  useEffect(() => {
    api.getProfile().then(setProfile);
  }, []);

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white block mb-4">
              Umesh <span className="text-primary-600">Prajapati</span>
            </span>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-6">
              Expert Laravel Developer helping businesses build scalable, secure, and performant web applications.
            </p>
            <div className="flex space-x-4">
              {profile.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all"
                  aria-label={social.platform}
                >
                  {social.icon === 'github' && <Github size={18} />}
                  {social.icon === 'linkedin' && <Linkedin size={18} />}
                  {social.icon === 'twitter' && <Twitter size={18} />}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Blog'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-slate-600 dark:text-slate-400">
                <Mail size={18} className="mr-2 text-primary-600" />
                <a href={`mailto:${profile.email}`} className="hover:text-primary-600 transition-colors">
                  {profile.email}
                </a>
              </li>
              <li className="text-slate-500 text-sm">
                Open for opportunities: <br />
                <span className="text-green-600 font-medium">Remote & Contract</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center">
            Built with <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> using React & Laravel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;