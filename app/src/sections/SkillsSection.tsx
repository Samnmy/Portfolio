import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { GradientText } from '@/components/animations/GradientText';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}



const additionalSkills = [
  'REST APIs',
  'Python',
  'Azure',
  'Power BI',
  'Figma',
  'Jira',
  'Git & GitHub',
  'Docker',
  'Agile/Scrum',
];

function ProgressBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-card border border-border/50"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6 text-center">{category.title}</h3>
      {category.skills.map((skill, skillIndex) => (
        <ProgressBar key={skill.name} skill={skill} delay={index * 0.1 + skillIndex * 0.1} />
      ))}
    </motion.div>
  );
}

export function SkillsSection() {
  const { t, language } = useLanguage();

  const skillCategories: SkillCategory[] = [
    {
      id: 'frontend',
      title: t('skills.categories.frontend'),
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 80 },
        { name: 'Angular', level: 75 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'Bootstrap', level: 75 },
      ],
    },
    {
      id: 'backend',
      title: t('skills.categories.backend'),
      skills: [
        { name: 'Spring Boot', level: 90 },
        { name: 'Java', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'MySQL', level: 80 },
      ],
    },
    {
      id: 'devops',
      title: t('skills.categories.devops'),
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'AWS', level: 80 },
        { name: 'Git', level: 95 },
        { name: 'CI/CD', level: 85 },
        { name: 'Linux', level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
             {t('skills.title')} <GradientText>{t('skills.titleHighlight')}</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('skills.description')}
          </p>
        </FadeIn>

        {/* Skill Categories */}
        <div key={language} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Additional Skills */}
        <FadeIn key={`additional-${language}`} delay={0.3}>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-6">{t('skills.additionalTitle')}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {additionalSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-card border-2 border-border text-foreground hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-500/50 transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
