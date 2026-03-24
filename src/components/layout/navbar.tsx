'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/lib/button-variants';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const locale = useLocale();
  const { setTheme } = useTheme();
  const t = useTranslations('nav');

  const otherLocale = locale === 'ru' ? 'en' : 'ru';

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
          <Link
            href={`/${otherLocale}`}
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            {otherLocale.toUpperCase()}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>{t('themeLight')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>{t('themeDark')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>{t('themeSystem')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {user.email}
                </div>
                <DropdownMenuItem onClick={() => signOut()}>
                  {t('signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
