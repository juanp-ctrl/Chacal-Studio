import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { FloatingActions } from './components/FloatingActions';
import { IntroSequence } from './components/IntroSequence';
import { Toaster } from './components/ui/sonner';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

type Route = 'home' | 'projects' | 'project-detail';

interface RouteState {
  route: Route;
  projectId?: string;
}

export default function App() {
  const [routeState, setRouteState] = useState<RouteState>({ route: 'home' });
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash.startsWith('#/proyectos/')) {
        const projectId = hash.replace('#/proyectos/', '');
        setRouteState({ route: 'project-detail', projectId });
        setShowIntro(false);
      } else if (hash === '#/proyectos') {
        setRouteState({ route: 'projects' });
        setShowIntro(false);
      } else {
        setRouteState({ route: 'home' });
      }
    };

    // Handle initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    switch (routeState.route) {
      case 'projects':
        return <ProjectsPage />;
      case 'project-detail':
        return <ProjectDetailPage projectId={routeState.projectId || ''} />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          {showIntro && routeState.route === 'home' && <IntroSequence />}
          <Navigation />
          <main>
            {renderContent()}
          </main>
          <Footer />
          <CookieBanner />
          <FloatingActions />
          <Toaster position="top-right" />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}