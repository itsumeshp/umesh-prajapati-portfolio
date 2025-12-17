import React, { useState, useEffect } from 'react';
import { EXPERIENCE } from '../../constants';
import { api } from '../../services/api';
import { Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  const [experience, setExperience] = useState(EXPERIENCE);

  useEffect(() => {
    api.getExperience().then(setExperience);
  }, []);

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Section Header */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 sticky top-32">
              Experience <br />
              <span className="text-slate-400 dark:text-slate-600 font-normal text-2xl">History</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-8 space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent dark:before:via-slate-700">
            {experience.map((item) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Icon/Dot on Timeline */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700 group-hover:bg-primary-500 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:static">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow ml-14 md:ml-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                     <div>
                       <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.role}</h3>
                       <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">{item.company}</span>
                     </div>
                     <div className="flex items-center text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded mt-2 sm:mt-0 w-fit">
                       <Calendar size={12} className="mr-1.5" />
                       {item.duration}
                     </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50 dark:border-slate-700">
                    {item.technologies && item.technologies.slice(0,4).map((tech) => (
                      <span key={tech} className="text-xs font-medium px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;