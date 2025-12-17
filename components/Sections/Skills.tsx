import React, { useState, useEffect } from 'react';
import { SKILLS } from '../../constants';
import { api } from '../../services/api';
import { Layers, Monitor, Server } from 'lucide-react';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState(SKILLS);

  useEffect(() => {
    api.getSkills().then(setSkills);
  }, []);

  const getIcon = (category: string) => {
    if (category.includes('Core')) return <Server className="w-6 h-6 text-primary-500" />;
    if (category.includes('Frontend')) return <Monitor className="w-6 h-6 text-blue-500" />;
    return <Layers className="w-6 h-6 text-purple-500" />;
  };

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-950 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            The Tech Stack
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            My expertise is built on the <span className="font-semibold text-slate-900 dark:text-white">TALL stack</span> (Tailwind, Alpine, Laravel, Livewire) and modern cloud infrastructure. I focus on tools that deliver stability and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category) => (
            <div 
              key={category.category} 
              className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                  {getIcon(category.category)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {category.category}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between group/skill">
                    <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/skill:bg-primary-500 transition-colors"></div>
                       {skill.name}
                    </span>
                    <span className={`text-xs font-mono px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${skill.level > 90 ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500'}`}>
                      {skill.level > 90 ? 'EXPERT' : 'ADVANCED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;