
import React, { useState, useMemo } from 'react';
import { FolderGit2, Search, ExternalLink, Github, Filter } from 'lucide-react';
import { projects } from '../mock/mockData';

const ProjectsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');

  // Get all unique tech stack items
  const allTech = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      project.techStack?.forEach(tech => techSet.add(tech));
    });
    return ['all', ...Array.from(techSet).sort()];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech = selectedTech === 'all' || project.techStack?.includes(selectedTech);
      return matchesSearch && matchesTech;
    });
  }, [searchTerm, selectedTech]);

  return (
    <section className="min-h-screen py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <FolderGit2 className="text-pink-500" size={32} />
            <h2 className="text-4xl font-bold text-white font-mono">$ git log --projects</h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        <>
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
              />
            </div>

            {/* Tech Filter */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              <Filter className="text-purple-400" size={20} />
              {allTech.map(tech => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap border transition-colors duration-200 ${selectedTech === tech
                      ? 'bg-purple-600 text-white border-purple-400'
                      : 'bg-gray-900 text-gray-400 border-purple-500/30 hover:border-pink-500/50'
                    }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-lg border border-purple-500/30 hover:border-pink-500/50 transition-all duration-300 overflow-hidden group"
              >
                {/* Project Header */}
                <div className="p-6 border-b border-purple-500/30">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white font-mono group-hover:text-purple-400 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${project.status === 'production'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </div>

                {/* Tech Stack */}
                <div className="px-6 py-4 bg-gray-950/50">
                  <div className="text-xs text-gray-500 font-mono mb-2">// Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded text-xs font-mono border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 py-4">
                  <div className="text-xs text-gray-500 font-mono mb-2">// Key Features</div>
                  <ul className="space-y-1">
                    {project.features?.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-sm text-gray-400 font-mono">
                        <span className="text-pink-500">→</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="px-6 py-4 border-t border-purple-500/30 flex space-x-3">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded font-mono text-sm transition-colors duration-200 border border-purple-500/30"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-900 rounded-lg p-8 border border-purple-500/30 inline-block">
                <p className="text-gray-400 font-mono">
                  <span className="text-pink-500">$</span> No projects found matching your criteria
                </p>
              </div>
            </div>
          )}

          {/* Terminal Summary */}
          <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-purple-500/30 font-mono text-sm">
            <span className="text-pink-500">$</span> <span className="text-purple-300">git log --oneline --count</span>
            <div className="mt-2 text-gray-400">
              <span className="text-cyan-400">{filteredProjects.length}</span> project(s) found
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default ProjectsSection;
