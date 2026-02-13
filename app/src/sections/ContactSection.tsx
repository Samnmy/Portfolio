import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { GradientText } from '@/components/animations/GradientText';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';



interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

function ContactCard({
  item,
  index,
}: {
  item: ContactItem;
  index: number;
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-purple-500/30 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
        <item.icon className="w-5 h-5 text-purple-400" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{item.label}</p>
        <p className="text-foreground font-medium">{item.value}</p>
      </div>
    </motion.div>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.labels.email'),
      value: 'samuel.monsalve.orrego@gmail.com',
      href: 'mailto:samuel.monsalve.orrego@gmail.com',
    },
    {
      icon: Linkedin,
      label: t('contact.labels.linkedin'),
      value: 'linkedin.com/in/samuel-monsalve-orrego',
      href: 'https://linkedin.com/in/samuel-monsalve-orrego',
    },
    {
      icon: Github,
      label: t('contact.labels.github'),
      value: 'github.com/Samnmy',
      href: 'https://github.com/Samnmy',
    },
    {
      icon: MapPin,
      label: t('contact.labels.location'),
      value: 'Medellín, Colombia',
      href: 'https://www.google.com/maps/place/Medell%C3%ADn,+Antioquia/@6.2442872,-75.6224111,13z/data=!3m1!4b1!4m6!3m5!1s0x8e4428dfb80fad05:0x42137cfcc7b53b56!8m2!3d6.2476376!4d-75.5658153!16zL20vMDF4XzZz?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('contact.title')} <GradientText>{t('contact.titleHighlight')}</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeIn animation="slideInLeft">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">{t('contact.getInTouch')}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('contact.getInTouchDesc')}
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <ContactCard key={item.label} item={item} index={index} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn animation="slideInRight">
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50">
              <h3 className="text-2xl font-semibold text-foreground mb-6">{t('contact.sendMessage')}</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.labels.name')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('contact.placeholders.name')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.labels.email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('contact.placeholders.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.labels.message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('contact.placeholders.message')}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white py-6 rounded-xl btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      {t('contact.buttons.sending')}
                    </span>
                  ) : isSubmitted ? (
                    <span>{t('contact.buttons.sent')}</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      {t('contact.buttons.send')}
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
