export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const size = className ?? 'w-16 h-16';

  switch (slug) {
    case 'javascript':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <rect width="64" height="64" rx="8" fill="#F7DF1E" />
          <text x="8" y="52" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32" fill="#000">JS</text>
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <rect width="64" height="64" rx="8" fill="#3178C6" />
          <text x="6" y="52" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="30" fill="#fff">TS</text>
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <ellipse cx="32" cy="32" rx="30" ry="11" stroke="#61DAFB" strokeWidth="3" />
          <ellipse cx="32" cy="32" rx="30" ry="11" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="30" ry="11" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 32 32)" />
          <circle cx="32" cy="32" r="4" fill="#61DAFB" />
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 64 64" className={size}>
          <path d="M8 2L56 2L51.5 54L32 60L12.5 54Z" fill="#E44D26"/>
          <path d="M32 7L32 55.5L47.5 51.2L51.5 7Z" fill="#F16529"/>
          <text x="32" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="10" fill="white">HTML</text>
          <text x="32" y="47" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="16" fill="white">5</text>
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 64 64" className={size}>
          <path d="M8 2L56 2L51.5 54L32 60L12.5 54Z" fill="#264DE4"/>
          <path d="M32 7L32 55.5L47.5 51.2L51.5 7Z" fill="#2965F1"/>
          <text x="32" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="13" fill="white">CSS</text>
          <text x="32" y="47" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="16" fill="white">3</text>
        </svg>
      );
    case 'browser':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <circle cx="32" cy="32" r="28" stroke="#4ADE80" strokeWidth="3" />
          <ellipse cx="32" cy="32" rx="12" ry="28" stroke="#4ADE80" strokeWidth="2.5" />
          <line x1="4" y1="32" x2="60" y2="32" stroke="#4ADE80" strokeWidth="2.5" />
          <line x1="8" y1="20" x2="56" y2="20" stroke="#4ADE80" strokeWidth="2" />
          <line x1="8" y1="44" x2="56" y2="44" stroke="#4ADE80" strokeWidth="2" />
        </svg>
      );
    case 'networking':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <circle cx="32" cy="32" r="6" fill="#06B6D4" />
          <circle cx="10" cy="16" r="5" fill="#06B6D4" />
          <circle cx="54" cy="16" r="5" fill="#06B6D4" />
          <circle cx="10" cy="48" r="5" fill="#06B6D4" />
          <circle cx="54" cy="48" r="5" fill="#06B6D4" />
          <line x1="15" y1="19" x2="27" y2="28" stroke="#06B6D4" strokeWidth="2.5" />
          <line x1="49" y1="19" x2="37" y2="28" stroke="#06B6D4" strokeWidth="2.5" />
          <line x1="15" y1="45" x2="27" y2="36" stroke="#06B6D4" strokeWidth="2.5" />
          <line x1="49" y1="45" x2="37" y2="36" stroke="#06B6D4" strokeWidth="2.5" />
        </svg>
      );
    case 'performance':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <polygon points="28,4 18,36 30,36 20,60 46,24 32,24 42,4" fill="#F97316" />
        </svg>
      );
    case 'vue':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <polygon points="32,52 4,8 16,8 32,36 48,8 60,8" fill="#42B883" />
          <polygon points="32,36 20,16 28,16 32,24 36,16 44,16" fill="#35495E" />
        </svg>
      );
    case 'angular':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <polygon points="32,4 58,14 53,50 32,60 11,50 6,14" fill="#DD0031" />
          <polygon points="32,4 32,60 53,50 58,14" fill="#C3002F" />
          <polygon points="32,14 20,42 25,42 28,34 36,34 39,42 44,42" fill="white" />
          <rect x="29" y="27" width="6" height="5" fill="#DD0031" />
        </svg>
      );
    case 'svelte':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <rect width="64" height="64" rx="8" fill="#FF3E00" />
          <path d="M46 10C38 4 27 6 22 14L14 26c-4 7-2 15 4 20-2 3-3 7-2 10 2 8 10 13 18 11l16-4c8-2 13-10 12-18 2-3 3-7 2-10-2-8-10-13-18-10z" fill="white" opacity="0.15" />
          <path d="M42 14c-6-4-14-2-18 4l-8 12c-3 5-1 11 4 14l2 1c-1 2-2 4-1 7 1 5 7 9 12 7l14-4c5-1 9-7 8-12-1-2-2-4-3-5l1-1c3-5 1-11-4-14l-7-9z" fill="white" />
        </svg>
      );
    case 'testing':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <path d="M22 8h20v4l8 28a6 6 0 01-6 6H20a6 6 0 01-6-6l8-28V8z" stroke="#10B981" strokeWidth="3" />
          <line x1="18" y1="28" x2="46" y2="28" stroke="#10B981" strokeWidth="2.5" />
          <circle cx="28" cy="40" r="3" fill="#10B981" />
          <circle cx="38" cy="40" r="3" fill="#10B981" />
          <line x1="24" y1="8" x2="40" y2="8" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'security':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <path d="M32 4L8 14v18c0 14 10 25 24 28 14-3 24-14 24-28V14L32 4z" fill="#6366F1" />
          <path d="M32 4L32 60c14-3 24-14 24-28V14L32 4z" fill="#4F46E5" />
          <path d="M22 32l7 7 13-14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'tools':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <path d="M38 10a12 12 0 00-12 16L8 44a4 4 0 005.5 5.5l18-18A12 12 0 0038 10z" fill="#94A3B8" />
          <circle cx="38" cy="22" r="4" fill="#475569" />
          <path d="M30 34l16 16a4 4 0 005.5-5.5L36 30" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'algorithms':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <circle cx="32" cy="10" r="6" fill="#8B5CF6" />
          <circle cx="12" cy="46" r="6" fill="#8B5CF6" />
          <circle cx="52" cy="46" r="6" fill="#8B5CF6" />
          <line x1="32" y1="16" x2="14" y2="40" stroke="#8B5CF6" strokeWidth="2.5" />
          <line x1="32" y1="16" x2="50" y2="40" stroke="#8B5CF6" strokeWidth="2.5" />
          <line x1="18" y1="46" x2="46" y2="46" stroke="#8B5CF6" strokeWidth="2.5" />
        </svg>
      );
    case 'system-design':
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <rect x="4" y="8" width="22" height="14" rx="3" fill="#0EA5E9" />
          <rect x="38" y="8" width="22" height="14" rx="3" fill="#0EA5E9" />
          <rect x="20" y="42" width="24" height="14" rx="3" fill="#0EA5E9" />
          <line x1="15" y1="22" x2="32" y2="42" stroke="#0EA5E9" strokeWidth="2.5" />
          <line x1="49" y1="22" x2="32" y2="42" stroke="#0EA5E9" strokeWidth="2.5" />
          <line x1="26" y1="15" x2="38" y2="15" stroke="#0EA5E9" strokeWidth="2.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <rect width="64" height="64" rx="8" fill="#94A3B8" />
          <text x="16" y="44" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#fff">?</text>
        </svg>
      );
  }
}
