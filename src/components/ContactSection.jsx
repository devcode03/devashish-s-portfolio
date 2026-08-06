import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { contactInfo } from '../config/contactInfo';
import { SiLeetcode } from "react-icons/si";


const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTerminalOutput([]);

    // Simulate terminal output
    const outputs = [
      { text: '$ send_message --init', delay: 0 },
      { text: '> Validating form data...', delay: 300 },
      { text: '> Checking email format...', delay: 600 },
      { text: '✓ Validation successful', delay: 900, type: 'success' },
      { text: '> Establishing connection...', delay: 1200 },
      { text: '> Sending message...', delay: 1500 }
    ];

    for (const output of outputs) {
      await new Promise(resolve => setTimeout(resolve, output.delay));
      setTerminalOutput(prev => [...prev, output]);
    }

    try {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `${formData.message}\n\n— ${formData.name} (${formData.email})`
      );
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

      await new Promise(resolve => setTimeout(resolve, 500));
      setTerminalOutput(prev => [...prev, {
        text: '✓ Email client opened successfully!',
        type: 'success'
      }]);

      setTimeout(() => {
        toast({
          title: "Email Client Opened",
          description: "Please send the pre-filled email to complete your message.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
        setTerminalOutput([]);
      }, 1000);
    } catch (error) {
      setTerminalOutput(prev => [...prev, {
        text: '✗ Error opening email client: ' + error.message,
        type: 'error'
      }]);

      toast({
        title: "Error",
        description: "Failed to open email client. Please try again.",
        variant: "destructive"
      });

      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-20 px-4" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="text-pink-500" size={32} />
            <h2 className="text-4xl font-bold text-white font-mono">$ send_message</h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-900 rounded-lg border border-purple-500/30 overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 border-b border-purple-500/30">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm font-mono text-purple-400">contact.sh</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  <span className="text-purple-400">--name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  <span className="text-purple-400">--email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  <span className="text-purple-400">--subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  <span className="text-purple-400">--message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-gray-950 text-white px-4 py-2 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white rounded font-mono transition-colors duration-200"
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Terminal Output */}
          <div className="bg-gray-900 rounded-lg border border-purple-500/30 overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 border-b border-purple-500/30">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm font-mono text-purple-400">output.log</span>
              </div>
            </div>

            {/* Output Content */}
            <div className="p-6 h-96 overflow-y-auto font-mono text-sm">
              {terminalOutput.length === 0 ? (
                <div className="text-gray-500">
                  <p className="mb-2">// Waiting for command execution...</p>
                  <p className="mb-4">// Fill the form and click "Send Message"</p>
                  <div className="space-y-1 text-xs">
                    <p className="text-purple-400">Available contact methods:</p>
                    <p className="text-gray-400">• Email: {contactInfo.email}</p>
                    <p className="text-gray-400">• GitHub: {contactInfo.github.username}</p>
                    <p className="text-gray-400">• LinkedIn: {contactInfo.linkedin.displayName}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {terminalOutput.map((output, idx) => (
                    <div
                      key={idx}
                      className={`${output.type === 'success'
                          ? 'text-green-400'
                          : output.type === 'error'
                            ? 'text-red-400'
                            : output.text.startsWith('$')
                              ? 'text-pink-500'
                              : 'text-gray-300'
                        }`}
                    >
                      {output.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href={`mailto:${contactInfo.email}`}
            className="bg-gray-900 rounded-lg p-4 border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-300 text-center"
          >
            <Mail className="text-purple-400 mx-auto mb-2" size={24} />
            <div className="text-white font-mono text-sm">Email</div>
            <div className="text-gray-500 text-xs mt-1">{contactInfo.email.replace('@gmail.com', '')}</div>
          </a>
          <a
            href={contactInfo.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 rounded-lg p-4 border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-300 text-center"
          >
            <svg className="w-6 h-6 text-purple-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <div className="text-white font-mono text-sm">GitHub</div>
            <div className="text-gray-500 text-xs mt-1">@{contactInfo.github.username}</div>
          </a>
          <a
            href={contactInfo.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 rounded-lg p-4 border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-300 text-center"
          >
            <svg className="w-6 h-6 text-purple-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <div className="text-white font-mono text-sm">LinkedIn</div>
            <div className="text-gray-500 text-xs mt-1">{contactInfo.linkedin.displayName}</div>
          </a>
          <a
            href={contactInfo.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 rounded-lg p-4 border border-purple-500/30 hover:border-pink-500/50 transition-colors duration-300 text-center"
          >
            <svg role="img" className="w-6 h-6 text-purple-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Leetcode--Streamline-Simple-Icons" height="24" width="24">
              <desc>
                Leetcode Streamline Icon: https://streamlinehq.com
              </desc>
              <title>LeetCode</title>
              <path d="M13.483 0a1.374 1.374 0 0 0 -0.961 0.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0 -1.209 2.104 5.35 5.35 0 0 0 -0.125 0.513 5.527 5.527 0 0 0 0.062 2.362 5.83 5.83 0 0 0 0.349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193 0.039 0.038c2.248 2.165 5.852 2.133 8.063 -0.074l2.396 -2.392c0.54 -0.54 0.54 -1.414 0.003 -1.955a1.378 1.378 0 0 0 -1.951 -0.003l-2.396 2.392a3.021 3.021 0 0 1 -4.205 0.038l-0.02 -0.019 -4.276 -4.193c-0.652 -0.64 -0.972 -1.469 -0.948 -2.263a2.68 2.68 0 0 1 0.066 -0.523 2.545 2.545 0 0 1 0.619 -1.164L9.13 8.114c1.058 -1.134 3.204 -1.27 4.43 -0.278l3.501 2.831c0.593 0.48 1.461 0.387 1.94 -0.207a1.384 1.384 0 0 0 -0.207 -1.943l-3.5 -2.831c-0.8 -0.647 -1.766 -1.045 -2.774 -1.202l2.015 -2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0 -1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38 -1.382 1.38 1.38 0 0 0 -1.38 -1.382z" fill="#c27aff" stroke-width="1"></path>
            </svg>
            <div className="text-white font-mono text-sm">LeetCode</div>
            <div className="text-gray-500 text-xs mt-1">{contactInfo.leetcode.displayName}</div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;