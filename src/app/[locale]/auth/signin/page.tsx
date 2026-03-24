import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Github } from 'lucide-react';
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

        <Card>
          <CardHeader className="text-center">
            <CardTitle>{t('signInTitle')}</CardTitle>
            <CardDescription>{t('signInSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: `/${locale}/dashboard` });
              }}
            >
              <Button className="w-full" variant="outline" type="submit">
                <Github className="h-4 w-4 mr-2" />
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
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {t('continueWithGoogle')}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-2">
              {t('terms')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
