import { motion } from 'framer-motion';
import { Code, Lightbulb, Users, Zap } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { GradientText } from '@/components/animations/GradientText';
import { useLanguage } from '@/context/LanguageContext';



export function AboutSection() {
  const { t, language } = useLanguage();
  
  const features = [
    {
      id: 'clean-code',
      icon: Code,
      title: t('about.features.cleanCode.title'),
      description: t('about.features.cleanCode.description'),
    },
    {
      id: 'problem-solver',
      icon: Lightbulb,
      title: t('about.features.problemSolver.title'),
      description: t('about.features.problemSolver.description'),
    },
    {
      id: 'team-player',
      icon: Users,
      title: t('about.features.teamPlayer.title'),
      description: t('about.features.teamPlayer.description'),
    },
    {
      id: 'fast-learner',
      icon: Zap,
      title: t('about.features.fastLearner.title'),
      description: t('about.features.fastLearner.description'),
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('about.title')} <GradientText>{t('about.titleHighlight')}</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </FadeIn>

        {/* Feature Cards */}
        <StaggerContainer key={language} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <StaggerItem key={feature.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-card border border-border/50 card-hover h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Quote */}
        <FadeIn delay={0.3}>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full" />
            <blockquote className="pl-8 py-4">
              <p className="text-lg md:text-xl text-foreground/90 italic leading-relaxed">
                &ldquo;{t('about.quote')}&rdquo;
              </p>
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
