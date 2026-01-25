import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LogOut, Plus, Edit2, Trash2, Mail, Eye, Archive, 
  Loader2, ExternalLink, Github 
} from 'lucide-react';
import { adminAPI, projectsAPI, contactAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import ProjectModal from '../components/admin/ProjectModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const username = adminAPI.getUsername();

  useEffect(() => {
    // Check authentication
    if (!adminAPI.isAuthenticated()) {
      navigate('/admin');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsRes, contactsRes] = await Promise.all([
        projectsAPI.getAll(),
        contactAPI.getAll()
      ]);
      
      if (projectsRes.success) setProjects(projectsRes.projects);
      if (contactsRes.success) setContacts(contactsRes.contacts);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminAPI.logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/admin');
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(projectId);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      await contactAPI.delete(contactId);
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive"
      });
    }
  };

  const handleUpdateContactStatus = async (contactId, status) => {
    try {
      await contactAPI.updateStatus(contactId, status);
      loadData();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-purple-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Terminal className="text-purple-500" size={24} />
              <h1 className="text-xl font-bold text-white font-mono">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-mono text-sm">
                <span className="text-purple-400">$</span> {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded font-mono text-sm transition-colors duration-200 border border-purple-500/30"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-900 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 font-mono text-sm transition-colors duration-200 border-b-2 ${
                activeTab === 'projects'
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-3 font-mono text-sm transition-colors duration-200 border-b-2 ${
                activeTab === 'contacts'
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Contacts ({contacts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-purple-500" size={48} />
          </div>
        ) : (
          <>
            {activeTab === 'projects' && (
              <ProjectsTab
                projects={projects}
                onAdd={() => {
                  setEditingProject(null);
                  setShowProjectModal(true);
                }}
                onEdit={(project) => {
                  setEditingProject(project);
                  setShowProjectModal(true);
                }}
                onDelete={handleDeleteProject}
              />
            )}

            {activeTab === 'contacts' && (
              <ContactsTab
                contacts={contacts}
                onDelete={handleDeleteContact}
                onUpdateStatus={handleUpdateContactStatus}
              />
            )}
          </>
        )}
      </main>

      {/* Project Modal */}
      {showProjectModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setShowProjectModal(false);
            setEditingProject(null);
          }}
          onSuccess={() => {
            setShowProjectModal(false);
            setEditingProject(null);
            loadData();
          }}
        />
      )}
    </div>
  );
};

// Projects Tab Component
const ProjectsTab = ({ projects, onAdd, onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-mono">Manage Projects</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900 rounded-lg border border-purple-500/30 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white font-mono mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded text-xs font-mono border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(project)}
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-purple-400 rounded transition-colors duration-200"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-2 bg-gray-800 hover:bg-red-600 text-red-400 hover:text-white rounded transition-colors duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contacts Tab Component
const ContactsTab = ({ contacts, onDelete, onUpdateStatus }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white font-mono mb-6">Contact Messages</h2>
      
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-gray-900 rounded-lg border border-purple-500/30 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-white font-mono">{contact.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    contact.status === 'new'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : contact.status === 'read'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  <Mail size={14} className="inline mr-1" />
                  {contact.email}
                </p>
                <p className="text-purple-400 font-mono text-sm mb-3">{contact.subject}</p>
                <p className="text-gray-300 text-sm">{contact.message}</p>
                <p className="text-gray-500 text-xs mt-3 font-mono">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                {contact.status === 'new' && (
                  <button
                    onClick={() => onUpdateStatus(contact.id, 'read')}
                    className="p-2 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded transition-colors duration-200"
                    title="Mark as read"
                  >
                    <Eye size={18} />
                  </button>
                )}
                {contact.status !== 'archived' && (
                  <button
                    onClick={() => onUpdateStatus(contact.id, 'archived')}
                    className="p-2 bg-gray-800 hover:bg-gray-700 text-yellow-400 rounded transition-colors duration-200"
                    title="Archive"
                  >
                    <Archive size={18} />
                  </button>
                )}
                <button
                  onClick={() => onDelete(contact.id)}
                  className="p-2 bg-gray-800 hover:bg-red-600 text-red-400 hover:text-white rounded transition-colors duration-200"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <Mail className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-400 font-mono">No contact messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;