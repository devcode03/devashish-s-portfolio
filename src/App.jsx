import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TerminalHero from "./components/TerminalHero";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import { Toaster } from "./components/ui/toaster";
import Particles from "./components/Particles";
import ResumeSection from "./components/ResumeSection";

const HomePage = () => {
  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-950">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          particleColors={["#8B5CF6", "#A78BFA", "#C4B5FD", "#E0E7FF", "#60A5FA", "#93C5FD", "#DBEAFE", "#F472B6", "#FBBF24"]}
          particleCount={900}
          particleSpread={18}
          speed={0.2}
          particleBaseSize={160}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio="2"
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header onNavigate={handleNavigate} />
        <main>
          <div style={{ pointerEvents: 'none' }}>
            <TerminalHero onCommandExecute={handleNavigate} />
          </div>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ResumeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <HomePage />
      <Toaster />
    </div>
  );
}

export default App;
