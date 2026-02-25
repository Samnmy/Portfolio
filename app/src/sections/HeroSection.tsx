import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CVModal } from '@/components/ui/CVModal';
import { MechanicalKey } from '@/components/ui/MechanicalKey';
import { GradientText } from '@/components/animations/GradientText';
import { SphereCard } from '@/components/animations/SphereCard';
import { useLanguage } from '@/context/LanguageContext';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Samnmy', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/samuel-monsalve-orrego', icon: Linkedin },
  { name: 'Email', href: 'mailto:samuel.monsalve.orrego@gmail.com', icon: Mail },
];


export function HeroSection() {
  const { t } = useLanguage();
  const [isCVOpen, setIsCVOpen] = useState(false);
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 md:pt-28 pb-20">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">{t('hero.badge')}</span>
          </motion.div>

          {/* 3D Interactive Sphere */}
          <SphereCard />

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight mb-4 whitespace-nowrap"
          >
            {t('hero.greeting')} <GradientText>Samuel Monsalve</GradientText>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-8"
          >
            {t('hero.role')}
          </motion.h2>


          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
          >
            <Button
              size="lg"
              onClick={() => handleScrollTo('#contact')}
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-6 text-base rounded-xl btn-glow"
            >
              {t('hero.ctaPrimary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScrollTo('#projects')}
              className="border-border hover:bg-accent/10 text-foreground px-8 py-6 text-base rounded-xl"
            >
              {t('hero.ctaSecondary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsCVOpen(true)}
              className="border-purple-500/40 hover:border-purple-500/70 hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 px-8 py-6 text-base rounded-xl font-semibold tracking-wide transition-all"
            >
              CV
            </Button>
          </motion.div>

          {/* Social Links — Mechanical Keys */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((link) => (
              <MechanicalKey
                key={link.name}
                icon={link.icon}
                href={link.href}
                label={link.name}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* CV Download Modal */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </>
  );
}
