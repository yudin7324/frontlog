import { redirect } from 'next/navigation';

export default async function StudyPlansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/settings`);
}
