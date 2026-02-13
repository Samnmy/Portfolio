import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';



export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Samnmy', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/samuel-monsalve-orrego', icon: Linkedin },
    { name: 'Email', href: 'mailto:samuel.monsalve.orrego@gmail.com', icon: Mail },
  ];

  return (
    <footer className="border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-foreground">SM.</span>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Samuel Monsalve. {t('footer.rights')}
            </p>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t('footer.madeWith')} <span className="text-purple-500">&#9829;</span> {t('footer.and')}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                aria-label={link.name}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
