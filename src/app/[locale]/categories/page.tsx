import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { CategoryIcon } from '@/components/ui/category-icon';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/lib/button-variants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  const isRu = locale === 'ru';
  const userId = session?.user?.id;

  const categories = await prisma.category.findMany({
    include: {
      cards: {
        where: { isPublished: true },
        include: { progress: userId ? { where: { userId } } : false },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">{isRu ? 'Темы' : 'Topics'}</h1>
        <p className="text-muted-foreground mb-8">
          {isRu ? 'Выбери тему чтобы посмотреть все вопросы' : 'Choose a topic to view all questions'}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const total = cat.cards.length;
            const learned = userId
              ? cat.cards.filter((c) => c.progress.some((p) => p.repetitions > 0)).length
              : 0;
            const progressPct = total > 0 ? Math.round((learned / total) * 100) : 0;
            const name = isRu ? cat.nameRu : cat.nameEn;
            const desc = isRu ? cat.descriptionRu : cat.descriptionEn;

            return (
              <Link key={cat.id} href={`/${locale}/categories/${cat.slug}`}>
                <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="shrink-0">
                        <CategoryIcon slug={cat.slug} className="w-12 h-12" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-bold text-base">{name}</h2>
                        {desc && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{desc}</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{isRu ? 'Прогресс' : 'Progress'}</span>
                      <span className="font-semibold">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5 mb-4">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {total}
                        </span>
                        {userId && (
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-3 w-3" />
                            {learned}
                          </span>
                        )}
                      </div>
                      <span className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs pointer-events-none')}>
                        {isRu ? 'Открыть →' : 'Open →'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
