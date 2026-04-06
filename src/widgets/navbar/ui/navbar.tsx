'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState, startTransition } from 'react';
import { Moon, Sun, Menu, BookOpen, Globe } from 'lucide-react';
import { buttonVariants } from '@/shared/lib/button-variants';
import { Menu as BaseMenu } from '@base-ui/react/menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { cn } from '@/shared/lib/utils';
import { locales } from '@/shared/i18n/config';

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { startTransition(() => setMounted(true)); }, []);
  const t = useTranslations('nav');

  const navLinks = [
    { href: `/${locale}/dashboard`, label: t('dashboard') },
    { href: `/${locale}/categories`, label: t('categories') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg mr-6">
          <BookOpen className="h-5 w-5 text-primary" />
          FrontLog
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <BaseMenu.Root>
            <BaseMenu.Trigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'cursor-pointer')} aria-label="Change language">
              <Globe className="h-4 w-4" />
            </BaseMenu.Trigger>
            <BaseMenu.Portal>
              <BaseMenu.Positioner side="bottom" align="end" sideOffset={4} className="z-[200]">
                <BaseMenu.Popup className="min-w-[80px] rounded-md border bg-background p-1 shadow-md transition-[opacity,transform] data-ending-style:opacity-0 data-starting-style:opacity-0">
                  {locales.map((l) => (
                    <BaseMenu.LinkItem
                      key={l}
                      href={`/${l}`}
                      className={cn(
                        'block px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-accent transition-colors',
                        l === locale && 'font-medium text-primary'
                      )}
                    >
                      {l.toUpperCase()}
                    </BaseMenu.LinkItem>
                  ))}
                </BaseMenu.Popup>
              </BaseMenu.Positioner>
            </BaseMenu.Portal>
          </BaseMenu.Root>

          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'cursor-pointer')}
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === 'dark'
              ? <Sun className="h-4 w-4" />
              : <Moon className="h-4 w-4" />
            }
          </button>

          {user ? (
            <Link href={`/${locale}/settings`} className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link
              href={`/${locale}/auth/signin`}
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              {t('signIn')}
            </Link>
          )}

          <Sheet>
            <SheetTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'md:hidden')}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
