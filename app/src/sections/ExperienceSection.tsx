import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { GradientText } from '@/components/animations/GradientText';
import { useLanguage } from '@/context/LanguageContext';

interface ExperienceItem {
  type: 'work' | 'education';
  period: string;
  title: string;
  organization: string;
  description: string;
  achievements: string[];
}



function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: ExperienceItem;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      {/* Timeline dot and line */}
      <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          className="w-4 h-4 rounded-full bg-purple-500 border-4 border-background"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.6, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`${isLeft ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}`}
      >
        <div className="p-6 rounded-2xl bg-card border border-border/50 card-hover">
          {/* Period */}
          <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
            {item.type === 'education' ? (
              <GraduationCap size={16} className="text-purple-400" />
            ) : (
              <Briefcase size={16} className="text-purple-400" />
            )}
            <span className="text-sm text-purple-400 font-medium">{item.period}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
          <p className="text-muted-foreground mb-3">{item.organization}</p>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Achievements */}
          <ul className={`space-y-1 ${isLeft ? 'md:text-right' : ''}`}>
            {item.achievements.map((achievement) => (
              <li
                key={achievement}
                className={`text-sm text-muted-foreground flex items-center gap-2 ${
                  isLeft ? 'md:justify-end' : ''
                }`}
              >
                {!isLeft && <span className="w-1 h-1 rounded-full bg-purple-500" />}
                {achievement}
                {isLeft && <span className="w-1 h-1 rounded-full bg-purple-500" />}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export function ExperienceSection() {
  const { t } = useLanguage();

  const experiences: ExperienceItem[] = [
    {
      type: 'education',
      period: '2023 - Present',
      title: t('experience.education.university.title'),
      organization: 'Instituto Tecnológico de Metropolitano (ITM)',
      description: t('experience.education.university.description'),
      achievements: [
        t('experience.education.university.achievements.0'),
        t('experience.education.university.achievements.1'),
        t('experience.education.university.achievements.2'),
      ],
    },
    {
      type: 'education',
      period: '2025 - 2026',
      title: t('experience.education.riwi.title'),
      organization: 'Riwi',
      description: t('experience.education.riwi.description'),
      achievements: [
        t('experience.education.riwi.achievements.0'),
        t('experience.education.riwi.achievements.1'),
        t('experience.education.riwi.achievements.2'),
        t('experience.education.riwi.achievements.3'),
        t('experience.education.riwi.achievements.4'),
      ],
    },
    {
      type: 'education',
      period: '2022',
      title: t('experience.education.quipux.title'),
      organization: 'Quipux',
      description: t('experience.education.quipux.description'),
      achievements: [
        t('experience.education.quipux.achievements.0'),
        t('experience.education.quipux.achievements.1'),
        t('experience.education.quipux.achievements.2'),
        t('experience.education.quipux.achievements.3')
      ],
    },
    {
      type: 'education',
      period: '2021 - 2022',
      title: t('experience.education.tecnicoEnSistemas.title'),
      organization: 'Servicio Nacional de Aprendizaje (SENA)',
      description: t('experience.education.tecnicoEnSistemas.description'),
      achievements: [
        t('experience.education.tecnicoEnSistemas.achievements.0'),
        t('experience.education.tecnicoEnSistemas.achievements.1'),
        t('experience.education.tecnicoEnSistemas.achievements.2'),
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('experience.title')} <GradientText>{t('experience.titleHighlight')}</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('experience.description')}
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative space-y-12 md:space-y-0">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {experiences.map((item, index) => (
            <div key={`${item.title}-${index}`} className="md:pb-12 last:pb-0">
              <TimelineItem item={item} index={index} isLeft={index % 2 === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
