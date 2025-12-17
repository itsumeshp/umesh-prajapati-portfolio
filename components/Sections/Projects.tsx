import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../../constants';
import { api } from '../../services/api';
import { ArrowUpRight, Github, Star, Zap, Trophy } from 'lucide-react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950 scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
           <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Selected Work
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              A collection of architectural challenges solved with Laravel, scalable databases, and modern frontend frameworks.
            </p>
           </div>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col lg:flex-row gap-16 items-start group/project ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Project Visual */}
              <div className="w-full lg:w-1/2 relative perspective-[1000px] top-4">
                {/* Background Blob */}
                <div className="absolute inset-0 bg-primary-600/20 dark:bg-primary-900/20 rounded-2xl blur-3xl transform scale-90 opacity-0 group-hover/project:opacity-100 group-hover/project:scale-100 transition-all duration-700 ease-out"></div>
                
                {/* Card Container */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-video transform group-hover/project:-translate-y-2 group-hover/project:shadow-3xl transition-all duration-500 ease-out z-10">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover/project:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover/project:bg-slate-900/10 transition-colors duration-300"></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                            {project.category}
                        </span>
                        {project.role && (
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mr-2"></span>
                                {project.role}
                            </span>
                        )}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    {project.title}
                    </h3>

                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.description}
                    </p>
                </div>

                {/* Key Features */}
                {project.features && (
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                        <h4 className="flex items-center text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">
                            <Star size={16} className="text-yellow-500 mr-2" fill="currentColor" /> Key Features
                        </h4>
                        <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                                    <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-primary-500 flex-shrink-0"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Challenge */}
                {project.challenge && (
                    <div className="relative pl-6 border-l-2 border-primary-500">
                         <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-primary-500 bg-white dark:bg-slate-950"></div>
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                            <Trophy size={16} className="mr-2 text-primary-600" /> The Challenge
                         </h4>
                         <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                            "{project.challenge}"
                         </p>
                    </div>
                )}

                {/* Tech Stack */}
                <div className="pt-4">
                   <h4 className="flex items-center text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                        <Zap size={16} className="text-slate-400 mr-2" /> Tech Stack
                   </h4>
                   <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-sm font-medium shadow-sm hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                   </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:-translate-y-0.5 shadow-lg shadow-slate-900/20 dark:shadow-none">
                      View Project 
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                  {project.repoUrl && (
                     <a href={project.repoUrl} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white transition-colors group/link">
                       <Github size={20} /> 
                       <span className="group-hover/link:underline decoration-primary-500 decoration-2 underline-offset-4">Source Code</span>
                     </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;