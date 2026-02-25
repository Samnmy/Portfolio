import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
    const { t } = useLanguage();

    const cvOptions = [
        {
            id: 'standard',
            label: t('cv.standard.label'),
            description: t('cv.standard.description'),
            icon: FileText,
            file: '/CVs/CV_Samuel_Monsalve_Orrego.pdf',
            filename: 'CV_Samuel_Monsalve_Orrego.pdf',
            gradient: 'from-purple-500 to-purple-700',
            glow: 'rgba(168,85,247,0.35)',
        },
        {
            id: 'ats',
            label: t('cv.ats.label'),
            description: t('cv.ats.description'),
            icon: Zap,
            file: '/CVs/CV_ATS_Samuel_Monsalve_Orrego.pdf',
            filename: 'CV_ATS_Samuel_Monsalve_Orrego.pdf',
            gradient: 'from-violet-500 to-indigo-600',
            glow: 'rgba(139,92,246,0.35)',
        },
    ];

    const handleDownload = (file: string, filename: string) => {
        const a = document.createElement('a');
        a.href = file;
        a.download = filename;
        a.click();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        {/* Blurred overlay */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

                        {/* Modal card */}
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.88, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-md z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Outer glow */}
                            <div
                                className="absolute -inset-px rounded-2xl pointer-events-none"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 100%)',
                                }}
                            />

                            <div className="relative rounded-2xl border border-purple-500/20 bg-card/95 backdrop-blur-xl p-8 shadow-2xl"
                                style={{ boxShadow: '0 25px 60px -12px rgba(168,85,247,0.2), 0 0 0 1px rgba(168,85,247,0.1)' }}
                            >
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                                    aria-label={t('cv.close')}
                                >
                                    <X size={18} />
                                </button>

                                {/* Header */}
                                <div className="mb-6 text-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                        <span className="text-xs text-purple-400 font-medium uppercase tracking-widest">{t('cv.badge')}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">{t('cv.title')}</h2>
                                    <p className="text-sm text-muted-foreground mt-1">{t('cv.subtitle')}</p>
                                </div>

                                {/* Options */}
                                <div className="flex flex-col gap-3">
                                    {cvOptions.map((opt) => (
                                        <motion.button
                                            key={opt.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleDownload(opt.file, opt.filename)}
                                            className="group relative flex items-center gap-4 p-4 rounded-xl border border-border hover:border-purple-500/40 bg-background/50 hover:bg-accent/5 transition-all text-left"
                                            style={{ '--glow': opt.glow } as React.CSSProperties}
                                        >
                                            {/* Icon */}
                                            <div
                                                className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${opt.gradient} flex items-center justify-center shadow-lg`}
                                                style={{ boxShadow: `0 0 20px ${opt.glow}` }}
                                            >
                                                <opt.icon size={20} className="text-white" />
                                            </div>

                                            {/* Text */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-foreground group-hover:text-purple-400 transition-colors">
                                                    {opt.label}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                                    {opt.description}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <svg
                                                className="flex-shrink-0 w-4 h-4 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
