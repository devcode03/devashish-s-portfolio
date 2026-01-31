import React, { useState } from 'react';
import { FileText, Download, Eye, ExternalLink, X } from 'lucide-react';
import { aboutData } from '../mock/mockData';

const getDrivePreviewUrl = (url) => {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('drive.google.com')) {
      return url;
    }

    const fileIdMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    if (fileIdMatch?.[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }

    const idParam = parsed.searchParams.get('id');
    if (idParam) {
      return `https://drive.google.com/file/d/${idParam}/preview`;
    }
  } catch (error) {
    return url;
  }

  return url;
};

const ResumeSection = () => {
  const [showViewer, setShowViewer] = useState(false);

  const handleDownload = () => {
    // Convert Google Drive link to direct download URL
    let downloadUrl = aboutData.resumeUrl;
    
    try {
      const parsed = new URL(downloadUrl);
      if (parsed.hostname.includes('drive.google.com')) {
        const fileIdMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
        if (fileIdMatch?.[1]) {
          downloadUrl = `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
        }
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
    }

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Alex_Rodriguez_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    setShowViewer(true);
  };

  const handleOpenNewTab = () => {
    window.open(aboutData.resumeUrl, '_blank');
  };

  return (
    <>
      <section className="min-h-screen py-20 px-4" id="resume">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="text-pink-500" size={32} />
              <h2 className="text-4xl font-bold text-white font-mono">$ cat resume.pdf</h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Preview Card */}
            <div className="bg-gray-900 rounded-lg border border-purple-500/30 overflow-hidden hover:border-pink-500/50 transition-all duration-300">
              <div className="bg-gray-800 px-6 py-4 border-b border-purple-500/30">
                <h3 className="text-xl font-bold text-white font-mono">Resume Preview</h3>
              </div>
              <div className="p-8">
                <button
                  type="button"
                  onClick={handleView}
                  className="aspect-[8.5/11] bg-gray-950 rounded-lg border border-purple-500/30 flex items-center justify-center mb-6 relative overflow-hidden group w-full text-left"
                >
                  <iframe
                    src={getDrivePreviewUrl(aboutData.resumeUrl)}
                    className="absolute inset-0 w-3xl h-full blur-[8px] opacity-75 scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
                  <div className="relative z-10 text-center">
                    <Eye className="mx-auto text-white mb-3"    size={48} />
                    <p className="text-gray-200 font-mono text-sm">Click to view</p>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <div className="space-y-3">
                  {/* <button
                    onClick={handleView}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors duration-200"
                  >
                    <Eye size={18} />
                    <span>View Resume</span>
                  </button> */}
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors duration-200"
                  >
                    <Download size={18} />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={handleOpenNewTab}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded font-mono text-sm transition-colors duration-200 border border-purple-500/30"
                  >
                    <ExternalLink size={18} />
                    <span>Open in New Tab</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg border border-purple-500/30 p-6 hover:border-pink-500/50 transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <FileText className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Professional Resume</h3>
                    <p className="text-gray-400 text-sm">
                      Comprehensive overview of my professional experience, technical skills, 
                      education, and key achievements. Updated regularly to reflect latest accomplishments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-purple-500/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-mono">Resume Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-500 font-mono">→</span>
                    <div>
                      <div className="text-purple-400 font-mono text-sm">Experience</div>
                      <div className="text-gray-300 text-sm">{aboutData.yearsOfExperience}+ years in software engineering</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-500 font-mono">→</span>
                    <div>
                      <div className="text-purple-400 font-mono text-sm">Projects</div>
                      <div className="text-gray-300 text-sm">{aboutData.projectsCompleted}+ successful deliveries</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-500 font-mono">→</span>
                    <div>
                      <div className="text-purple-400 font-mono text-sm">Expertise</div>
                      <div className="text-gray-300 text-sm">Full-stack development & system architecture</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-500 font-mono">→</span>
                    <div>
                      <div className="text-purple-400 font-mono text-sm">Focus Areas</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {aboutData.currentFocus.map((focus) => (
                          <span key={focus} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded text-xs font-mono border border-purple-500/30">
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-purple-500/30 font-mono text-sm">
                <div className="text-gray-300">
                  <span className="text-pink-500">$</span> <span className="text-purple-300">resume --download</span>
                  <div className="mt-2 pl-4">
                    <div className="text-green-400">✓ Ready for download</div>
                    <div className="text-gray-400 text-xs mt-1">Format: PDF | Size: ~200KB | Last updated: 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showViewer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg border border-purple-500/30 w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="bg-gray-800 px-6 py-4 border-b border-purple-500/30 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-mono">Resume Viewer</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors duration-200"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setShowViewer(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <iframe
                src={getDrivePreviewUrl(aboutData.resumeUrl)}
                className="w-full h-full"
                title="Resume"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeSection;