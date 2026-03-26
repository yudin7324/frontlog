import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiHtml5,
  SiCss,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNextdotjs,
} from 'react-icons/si';
import {
  Globe,
  Network,
  Zap,
  FlaskConical,
  ShieldCheck,
  Wrench,
  GitBranch,
  Boxes,
} from 'lucide-react';

type IconEntry =
  | { icon: React.ElementType; color: string; colorClass?: never; lucide?: boolean }
  | { icon: React.ElementType; colorClass: string; color?: never; lucide?: boolean };

const ICONS: Record<string, IconEntry> = {
  javascript:    { icon: SiJavascript,  color: '#F7DF1E' },
  typescript:    { icon: SiTypescript,  color: '#3178C6' },
  react:         { icon: SiReact,       color: '#61DAFB' },
  html:          { icon: SiHtml5,       color: '#E34F26' },
  css:           { icon: SiCss,         color: '#2965F1' },
  vue:           { icon: SiVuedotjs,    color: '#42B883' },
  angular:       { icon: SiAngular,     color: '#DD0031' },
  svelte:        { icon: SiSvelte,      color: '#FF3E00' },
  nextjs:        { icon: SiNextdotjs,   colorClass: 'text-zinc-900 dark:text-zinc-100' },
  browser:       { icon: Globe,         color: '#4ADE80', lucide: true },
  networking:    { icon: Network,       color: '#06B6D4', lucide: true },
  performance:   { icon: Zap,           color: '#F97316', lucide: true },
  testing:       { icon: FlaskConical,  color: '#10B981', lucide: true },
  security:      { icon: ShieldCheck,   color: '#818CF8', lucide: true },
  tools:         { icon: Wrench,        color: '#94A3B8', lucide: true },
  algorithms:    { icon: GitBranch,     color: '#A78BFA', lucide: true },
  'system-design': { icon: Boxes,       color: '#38BDF8', lucide: true },
};

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const entry = ICONS[slug];
  const sizeClass = className ?? 'w-16 h-16';

  if (!entry) {
    return (
      <div className={`${sizeClass} rounded-lg bg-slate-400/20 flex items-center justify-center text-slate-400 font-bold text-2xl`}>
        ?
      </div>
    );
  }

  const Icon = entry.icon;
  const extraProps = entry.lucide ? { strokeWidth: 1.2 } : {};
  if (entry.colorClass) {
    return <Icon className={`${sizeClass} ${entry.colorClass}`} {...extraProps} />;
  }
  return <Icon className={sizeClass} style={{ color: entry.color }} {...extraProps} />;
}
