import { VideoHeroSection } from '../components/VideoHeroSection';
import { HeroSection } from '../components/HeroSection';
import { MarqueeSection } from '../components/MarqueeSection';
import { MethodSection } from '../components/MethodSection';
import { FutureSection } from '../components/FutureSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ImpactSection } from '../components/ImpactSection';
import { ServicesSection } from '../components/ServicesSection';
import { PlantBasedSection } from '../components/PlantBasedSection';
import { SDGSection } from '../components/SDGSection';
import { PartnersSection } from '../components/PartnersSection';
import { ContactSection } from '../components/ContactSection';

export function HomePage() {
  return (
    <>
      <VideoHeroSection />
      <HeroSection />
      <MarqueeSection />
      <MethodSection />
      <FutureSection />
      <ProjectsSection />
      <ImpactSection />
      <ServicesSection />
      <PlantBasedSection />
      <SDGSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
