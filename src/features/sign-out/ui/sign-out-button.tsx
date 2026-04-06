'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const t = useTranslations('nav');
  return (
    <Button variant="outline" size="sm" onClick={() => signOut()}>
      <LogOut className="h-4 w-4" />
      {t('signOut')}
    </Button>
  );
}
