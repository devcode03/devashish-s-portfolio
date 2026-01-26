import React, { useState } from 'react';
import { Code2, Package, Terminal, CheckCircle2 } from 'lucide-react';
import { skills } from '../mock/mockData';

const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: Code2 },
    { id: 'backend', label: 'Backend', icon: Terminal },
    { id: 'tools', label: 'Tools & DevOps', icon: Package },
    { id: 'architecture', label: 'Architecture', icon: CheckCircle2 }
  ];

  return (
    <section className="min-h-screen py-20 px-4" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Package className="text-pink-500" size={32} />
            <h2 className="text-4xl font-bold text-white font-mono">$ npm list --global</h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`px-6 py-3 rounded-lg font-mono text-sm border transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === id
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-gray-900 text-gray-400 border-purple-500/30 hover:border-pink-500/50'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="grid md:grid-cols-2 gap-6">
          {skills[activeCategory].map((skill, idx) => (
            <div
              key={skill.name}
              className="bg-gray-900 rounded-lg p-6 border border-purple-500/30 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {skill.icon && (
                    <skill.icon className="text-4xl text-purple-400" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono">{skill.name}</h3>
                    {skill.version && (
                      <p className="text-sm text-gray-500 font-mono mt-1">
                        <span className="text-purple-400">version:</span> {skill.version}
                      </p>
                    )}
                  </div>
                </div>
                {skill.level && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-400">{skill.level}%</div>
                    <div className="text-xs text-gray-500">proficiency</div>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {skill.level && (
                <div className="relative">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Terminal-style output */}
              <div className="mt-4 p-3 bg-gray-950 rounded font-mono text-xs text-gray-400">
                <span className="text-pink-500">$</span> npm info {skill.name.toLowerCase().replace(/\s+/g, '-')}
                <br />
                <span className="text-green-400">✓</span> Package installed and verified
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Output Summary */}
        <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-purple-500/30 font-mono text-sm">
          <div className="text-gray-300">
            <span className="text-pink-500">$</span> <span className="text-purple-300">echo "Skills Summary"</span>
            <div className="mt-2 pl-4">
              <div className="text-cyan-400">Total Technologies: {Object.values(skills).flat().length}</div>
              <div className="text-green-400">Status: Production Ready</div>
              <div className="text-yellow-400">Last Updated: 2025-01-{randomDay}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;