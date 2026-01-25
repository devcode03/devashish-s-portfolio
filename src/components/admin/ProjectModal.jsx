import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { projectsAPI } from '../../services/api';
import { toast } from '../../hooks/use-toast';

const ProjectModal = ({ project, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: [],
    features: [],
    liveDemo: '',
    githubRepo: '',
    status: 'production'
  });
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        techStack: project.techStack || [],
        features: project.features || [],
        liveDemo: project.liveDemo || '',
        githubRepo: project.githubRepo || '',
        status: project.status || 'production'
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (project) {
        await projectsAPI.update(project.id, formData);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        await projectsAPI.create(formData);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to save project",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addTech = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData({ ...formData, techStack: [...formData.techStack, newTech.trim()] });
      setNewTech('');
    }
  };

  const removeTech = (tech) => {
    setFormData({ ...formData, techStack: formData.techStack.filter(t => t !== tech) });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-lg border border-purple-500/30 w-full max-w-3xl my-8">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 border-b border-purple-500/30 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-mono">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Name */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Project Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono resize-none"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Tech Stack <span className="text-red-400">*</span>
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Add technology..."
                className="flex-1 bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-600/20 text-purple-300 rounded text-sm font-mono border border-purple-500/30"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Features <span className="text-red-400">*</span>
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Add feature..."
                className="flex-1 bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-950 px-4 py-2 rounded border border-purple-500/30"
                >
                  <span className="text-gray-300 text-sm font-mono">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Demo */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Live Demo URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              value={formData.liveDemo}
              onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
              required
              className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
              placeholder="https://..."
            />
          </div>

          {/* GitHub Repo */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              GitHub Repository <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              value={formData.githubRepo}
              onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
              required
              className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
              placeholder="https://github.com/..."
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
            >
              <option value="production">Production</option>
              <option value="beta">Beta</option>
              <option value="development">Development</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white rounded font-mono transition-colors duration-200"
            >
              {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded font-mono transition-colors duration-200 border border-purple-500/30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
