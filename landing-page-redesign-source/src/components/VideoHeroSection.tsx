import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VideoHeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="video-hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Placeholder Image / Video Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Imagen del equipo trabajando - Puedes reemplazar esta imagen con tu video cuando esté listo */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1733826544831-ad71d05c8423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHRlYW0lMjBkZXNpZ24lMjBzY3JlZW4lMjB3YXJtJTIwb2ZmaWNlfGVufDF8fHx8MTc2MzMyOTEwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Equipo joven de Chacal colaborando en diseño"
          className="w-full h-full object-cover"
        />
        {/* 
        Para usar video, reemplaza la imagen con:
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/tu-video.mp4" type="video/mp4" />
        </video>
        */}
        
        {/* Overlay sutil para mejorar contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </motion.div>

      {/* Flecha hacia abajo con animación */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 text-white z-20 cursor-pointer hover:scale-110 transition-transform backdrop-blur-sm bg-black/20 rounded-full p-3 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: [0, 10, 0] 
        }}
        transition={{
          opacity: { duration: 0.8, delay: 1 },
          y: { 
            duration: 2, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: 1
          },
        }}
        aria-label="Scroll to content"
      >
        <ChevronDown size={40} strokeWidth={1.5} className="sm:w-10 sm:h-10 w-8 h-8" />
      </motion.button>
    </section>
  );
}
