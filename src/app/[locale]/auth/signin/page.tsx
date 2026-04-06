import { auth, signIn } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { BookOpen } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { getTranslations } from 'next-intl/server';

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (session?.user) {
    redirect(`/${locale}/dashboard`);
  }

  const t = await getTranslations('auth');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">FrontLog</span>
        </div>

        <div className="border rounded-xl p-6">
          <div className="text-center mb-6">
            <h1 className="text-lg font-semibold">{t('signInTitle')}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t('signInSubtitle')}</p>
          </div>
          <div className="flex flex-col gap-3">
            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: `/${locale}/dashboard` });
              }}
            >
              <Button className="w-full" variant="outline" type="submit">
                <FaGithub className="h-4 w-4 mr-2" />
                {t('continueWithGitHub')}
              </Button>
            </form>

            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: `/${locale}/dashboard` });
              }}
            >
              <Button className="w-full" variant="outline" type="submit">
                <FaGoogle className="h-4 w-4 mr-2" />
                {t('continueWithGoogle')}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-2">
              {t('terms')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
