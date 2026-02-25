import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { FadeIn } from '@/components/animations/FadeIn';
import { GradientText } from '@/components/animations/GradientText';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

function ContactCard({ item, index }: { item: ContactItem; index: number }) {
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
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{item.label}</p>
        <p className="text-foreground font-medium break-all">{item.value}</p>
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

type SendState = 'idle' | 'sending' | 'sent' | 'error';

export function ContactSection() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sendState, setSendState] = useState<SendState>('idle');

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
      href: 'https://www.google.com/maps/place/Medell%C3%ADn',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState === 'sending') return;

    setSendState('sending');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'samuel.monsalve.orrego@gmail.com',
        },
        PUBLIC_KEY
      );

      setSendState('sent');
      setFormData({ name: '', email: '', message: '' });

      // Reset back to idle after 5 seconds
      setTimeout(() => setSendState('idle'), 5000);
    } catch (err: unknown) {
      // Log full error details for debugging
      console.error('EmailJS error (full object):', err);
      if (err && typeof err === 'object') {
        const e = err as Record<string, unknown>;
        console.error('Status:', e.status);
        console.error('Text:', e.text);
      }
      setSendState('error');
      // Reset to idle after 5 seconds so user can retry
      setTimeout(() => setSendState('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ── Button label based on state ── */
  const buttonContent = () => {
    if (sendState === 'sending') {
      return (
        <span className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
          {t('contact.buttons.sending')}
        </span>
      );
    }
    if (sendState === 'sent') {
      return (
        <span className="flex items-center gap-2">
          <CheckCircle size={18} />
          {t('contact.buttons.sent')}
        </span>
      );
    }
    if (sendState === 'error') {
      return (
        <span className="flex items-center gap-2">
          <AlertCircle size={18} />
          {t('contact.buttons.error')}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2">
        <Send size={18} />
        {t('contact.buttons.send')}
      </span>
    );
  };

  const buttonClass = `w-full py-6 rounded-xl btn-glow disabled:opacity-50 disabled:cursor-not-allowed ${sendState === 'sent'
    ? 'bg-green-600 hover:bg-green-500 text-white'
    : sendState === 'error'
      ? 'bg-red-600 hover:bg-red-500 text-white'
      : 'bg-purple-600 hover:bg-purple-500 text-white'
    }`;

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

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                    disabled={sendState === 'sending'}
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
                    disabled={sendState === 'sending'}
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
                    disabled={sendState === 'sending'}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sendState === 'sending' || sendState === 'sent'}
                  className={buttonClass}
                >
                  {buttonContent()}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
