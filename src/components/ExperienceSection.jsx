import React from 'react';
import { GitBranch, Calendar, Briefcase } from 'lucide-react';
import { experience } from '../mock/mockData';

const ExperienceSection = () => {
  return (
    <section className="min-h-screen py-20 px-4" id="experience">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <GitBranch className="text-pink-500" size={32} />
            <h2 className="text-4xl font-bold text-white font-mono">$ git log --experience</h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                className={`relative flex items-start ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Commit Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 border-4 border-gray-950 flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
                </div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    idx % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-gray-900 rounded-lg p-6 border border-purple-500/30 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    {/* Commit Hash */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-xs font-mono border border-purple-500/30">
                        commit: {exp.commit}
                      </span>
                      <Calendar className="text-gray-500" size={16} />
                      <span className="text-gray-500 text-sm font-mono">{exp.date}</span>
                    </div>

                    {/* Role and Company */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white font-mono mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center space-x-2 text-pink-400">
                        <Briefcase size={16} />
                        <span className="font-mono">{exp.company}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500 font-mono">// Key Achievements</div>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <span className="text-green-400 font-mono text-sm">✓</span>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Summary */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 border border-purple-500/30 font-mono text-sm">
          <div className="text-gray-300">
            <span className="text-pink-500">$</span> <span className="text-purple-300">git log --stat</span>
            <div className="mt-2 pl-4 space-y-1">
              <div className="text-cyan-400">{experience.length} commits (positions)</div>
              <div className="text-green-400">+{experience.reduce((sum, exp) => sum + exp.achievements.length, 0)} achievements</div>
              <div className="text-yellow-400">Status: Open to new opportunities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;