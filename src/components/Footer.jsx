import React from 'react';
import { Terminal, Heart, Github, Linkedin, Mail } from 'lucide-react';
import { contactInfo } from '../config/contactInfo';
import { SiBuymeacoffee } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-purple-500/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="text-purple-500" size={24} />
              <span className="text-white font-mono font-bold text-lg">alex.dev</span>
            </div>
            <p className="text-gray-400 text-sm font-mono">
              Building scalable, performant web applications with clean architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-mono font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 text-sm font-mono transition-colors duration-200"
                  >
                    <span className="text-pink-500">→</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-mono font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href={contactInfo.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-lg border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-200"
              >
                <Github className="text-purple-400" size={20} />
              </a>
              <a
                href={contactInfo.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-lg border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-200"
              >
                <Linkedin className="text-purple-400" size={20} />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="p-3 bg-gray-800 rounded-lg border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-200"
              >
                <Mail className="text-purple-400" size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm font-mono mb-4 md:mb-0">
              <span className="text-pink-500">$</span> echo "© {currentYear} Alex Rodriguez. All rights reserved."
            </p>
            <p className="text-gray-400 text-sm font-mono flex items-center">
              Made with <Heart className="text-pink-500 mx-2" size={16} fill="currentColor" /> and lots of coffee <SiBuymeacoffee className='text-xl text-purple-400' />

            </p>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-6 bg-gray-950 rounded-lg p-4 border border-purple-500/30">
          <p className="text-gray-500 font-mono text-xs">
            <span className="text-pink-500">$</span> <span className="text-purple-300">status</span>
            <span className="text-green-400"> ✓</span> All systems operational | Build v1.0.0 | Last deployed: {new Date().toISOString().split('T')[0]}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;