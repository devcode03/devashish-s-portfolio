import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Lazy load admin pages (code splitting)
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

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
      <BrowserRouter>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#030712', color: '#fff' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
