import React from 'react';
import { User, Code2, MapPin, Mail, Coffee, Terminal } from 'lucide-react';
import { aboutData } from '../mock/mockData';

const AboutSection = () => {
  return (
    <section className="min-h-screen py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-pink-500" size={32} />
            <h2 className="text-4xl font-bold text-white font-mono">$ cat about.json</h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-purple-500/30 font-mono text-sm">
            <pre className="text-gray-300">
              <span className="text-pink-500">{'{'}</span>
              {Object.entries(aboutData).map(([key, value], idx, arr) => (
                <div key={key} className="ml-4">
                  <span className="text-purple-400">"{key}"</span>
                  <span className="text-gray-500">: </span>
                  {Array.isArray(value) ? (
                    <>
                      <span className="text-yellow-500">{'['}</span>
                      <div className="ml-4">
                        {value.map((item, i) => (
                          <div key={i}>
                            <span className="text-green-400">"{item}"</span>
                            {i < value.length - 1 && <span className="text-gray-500">,</span>}
                          </div>
                        ))}
                      </div>
                      <span className="text-yellow-500">{']'}</span>
                    </>
                  ) : typeof value === 'string' ? (
                    <span className="text-green-400">"{value}"</span>
                  ) : (
                    <span className="text-cyan-400">{value}</span>
                  )}
                  {idx < arr.length - 1 && <span className="text-gray-500">,</span>}
                </div>
              ))}
              <span className="text-pink-500">{'}'}</span>
            </pre>
          </div>
{/* info cards */}
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-6 border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Code2 className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">Engineering Mindset</h3>
                  <p className="text-gray-400">
                    Focused on building scalable, performant applications with clean architecture. 
                    I believe in writing code that's maintainable, testable, and production-ready.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-pink-500/20 rounded-lg">
                  <Terminal className="text-pink-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">Tech Stack</h3>
                  <p className="text-gray-400">
                    Specializing in modern frontend frameworks (React, Next.js) with full-stack 
                    capabilities. Experienced in building microservices, APIs, and cloud infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Coffee className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">Current Focus</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {aboutData.currentFocus.map((focus) => (
                      <span key={focus} className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-sm font-mono border border-purple-500/30">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-purple-500/30 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">{aboutData.yearsOfExperience}+</div>
                <div className="text-gray-400 text-sm font-mono">Years Experience</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 border border-purple-500/30 text-center">
                <div className="text-3xl font-bold text-pink-400 mb-1">{aboutData.projectsCompleted}+</div>
                <div className="text-gray-400 text-sm font-mono">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;