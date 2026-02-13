import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { GradientText } from '@/components/animations/GradientText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
}



function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 card-hover"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60" />
        
        {/* Overlay links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-purple-600 transition-colors"
              aria-label="View GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-purple-600 transition-colors"
              aria-label="View Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-purple-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { t } = useLanguage();

  const projects: Project[] = [
    {
      title: t('projects.cards.ecommerce.title'),
      description: t('projects.cards.ecommerce.description'),
      image: '/images/project-ecommerce.jpg',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: t('projects.cards.projectManagement.title'),
      description: t('projects.cards.projectManagement.description'),
      image: '/images/project-kanban.jpg',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: t('projects.cards.aiContent.title'),
      description: t('projects.cards.aiContent.description'),
      image: '/images/project-ai.jpg',
      tech: ['React', 'Python', 'FastAPI', 'OpenAI', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: t('projects.cards.chatApp.title'),
      description: t('projects.cards.chatApp.description'),
      image: '/images/project-chat.jpg',
      tech: ['React', 'Socket.io', 'Node.js', 'WebRTC'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('projects.title')} <GradientText>{t('projects.titleHighlight')}</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('projects.description')}
          </p>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <FadeIn delay={0.4} className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-accent/10 text-foreground px-8 py-6 rounded-xl group"
          >
            {t('projects.viewAll')}
            <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
