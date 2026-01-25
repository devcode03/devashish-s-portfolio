import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

const TerminalHero = ({ onCommandExecute }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Devashish\'s Portfolio v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands' },
    { type: 'output', content: '' }
  ]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  whoami        - Display developer information',
      '  about         - Navigate to about section',
      '  skills        - Navigate to skills section',
      '  projects      - Navigate to projects section',
      '  experience    - Navigate to experience section',
      '  contact       - Navigate to contact section',
      '  clear         - Clear terminal',
      '  github        - Open GitHub profile',
      '  linkedin      - Open LinkedIn profile'
    ],
    whoami: () => [
      '{',
      '  "name": "Alex Rodriguez",',
      '  "role": "Engineer && Frontend Developer",',
      '  "passion": "Building scalable, performant web applications",',
      '  "status": "Available for opportunities"',
      '}'
    ],
    about: () => {
      onCommandExecute('about');
      return ['Navigating to About section...'];
    },
    skills: () => {
      onCommandExecute('skills');
      return ['Navigating to Skills section...'];
    },
    projects: () => {
      onCommandExecute('projects');
      return ['Navigating to Projects section...'];
    },
    experience: () => {
      onCommandExecute('experience');
      return ['Navigating to Experience section...'];
    },
    contact: () => {
      onCommandExecute('contact');
      return ['Navigating to Contact section...'];
    },
    clear: () => {
      setHistory([]);
      return [];
    },
    github: () => {
      window.open('https://github.com/devcode03', '_blank');
      return ['Opening GitHub profile...'];
    },
    linkedin: () => {
      window.open('https://www.linkedin.com/in/devashish03', '_blank');
      return ['Opening LinkedIn profile...'];
    }
  };

  const executeCommand = (cmd) => {
    const cmdTrimmed = cmd.trim().toLowerCase();
    const output = commands[cmdTrimmed] 
      ? commands[cmdTrimmed]()
      : [`Command not found: ${cmd}. Type "help" for available commands.`];

    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd },
      ...output.map(line => ({ type: 'output', content: line })),
      { type: 'output', content: '' }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
      setCommandIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.filter(h => h.type === 'input');
      if (commands.length > 0) {
        const newIndex = commandIndex < commands.length - 1 ? commandIndex + 1 : commandIndex;
        setCommandIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex].content);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const commands = history.filter(h => h.type === 'input');
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex].content);
      } else {
        setCommandIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20" id="home">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-900 rounded-lg shadow-2xl border border-purple-500/30 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-purple-500/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Terminal size={16} />
              <span className="text-sm font-mono">portfolio.sh</span>
            </div>
            <div className="w-16"></div>
          </div>

          <div 
            ref={terminalRef}
            className="p-6 h-96 overflow-y-auto font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, idx) => (
              <div key={idx} className="mb-1">
                {line.type === 'input' ? (
                  <div className="flex items-center">
                    <span className="text-pink-500 mr-2">$</span>
                    <span className="text-purple-300">{line.content}</span>
                  </div>
                ) : (
                  <div className="text-gray-300 pl-4">{line.content}</div>
                )}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-pink-500 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-purple-300 font-mono"
                autoFocus
                spellCheck="false"
              />
              <span className="animate-pulse text-purple-400">█</span>
            </form>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {['about', 'skills', 'projects', 'experience', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-mono text-sm rounded transition-colors duration-200 border border-purple-400/30"
            >
              <ChevronRight size={14} className="inline mr-1" />
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TerminalHero;