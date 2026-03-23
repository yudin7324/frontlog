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
    case 'css':
      return (
        <svg viewBox="0 0 80 48" className={size} fill="none">
          {/* HTML5 shield */}
          <path d="M4 2l3.2 36 12.8 3.6 12.8-3.6L36 2H4z" fill="#E44D26" />
          <path d="M20 38.8l10.3-2.9 2.7-30.7H20v33.6z" fill="#F16529" />
          <path d="M20 20h6.8l.5-5.2H20V10h12.8l-.3 2.4-2.2 25.2L20 40V20z" fill="#fff" />
          <path d="M20 20v4.8H14l-.4-4.8H20zm-6.8-10H20v4.8H13.6l-.4-4.8z" fill="#EBEBEB" />
          {/* CSS3 shield */}
          <path d="M44 2l3.2 36 12.8 3.6 12.8-3.6L76 2H44z" fill="#264DE4" />
          <path d="M60 38.8l10.3-2.9 2.7-30.7H60v33.6z" fill="#2965F1" />
          <path d="M60 20h6.8l.5-5.2H60V10h12.8l-.3 2.4-2.2 25.2L60 40V20z" fill="#fff" />
          <path d="M60 20v4.8H54l-.4-4.8H60zm-6.8-10H60v4.8H53.6l-.4-4.8z" fill="#EBEBEB" />
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
    default:
      return (
        <svg viewBox="0 0 64 64" className={size} fill="none">
          <rect width="64" height="64" rx="8" fill="#94A3B8" />
          <text x="16" y="44" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#fff">?</text>
        </svg>
      );
  }
}
