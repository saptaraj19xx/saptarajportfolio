import { HeroSection } from "./sections/HeroSection";
import { MarqueeSection } from "./sections/MarqueeSection";
import { VideoShowcaseSection } from "./sections/VideoShowcaseSection";
import { AboutSection } from "./sections/AboutSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ContactSection from "./sections/ContactSection";

function Portfolio() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <VideoShowcaseSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}

function App() {
  return <Portfolio />;
}

export default App;
