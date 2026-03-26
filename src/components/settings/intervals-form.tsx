'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Settings {
  dailyNewCards: number;
  dailyReviews: number;
  intervalAgain: number;
  intervalGood1: number;
  intervalGood2: number;
  intervalEasy1: number;
  intervalEasy2: number;
}

interface IntervalsFormProps {
  initial: Settings;
}

function Field({
  label,
  description,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-7 h-7 rounded border text-sm font-bold hover:bg-muted transition-colors cursor-pointer"
        >
          −
        </button>
        <span className="w-10 text-center text-sm font-mono font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-7 h-7 rounded border text-sm font-bold hover:bg-muted transition-colors cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function IntervalsForm({ initial }: IntervalsFormProps) {
  const t = useTranslations('settings');
  const [values, setValues] = useState<Settings>(initial);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const set = (key: keyof Settings) => (v: number) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const handleSave = () => {
    startTransition(async () => {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="border rounded-xl p-5">
      <h2 className="font-semibold mb-1">{t('learningTitle')}</h2>
      <p className="text-sm text-muted-foreground mb-4">{t('learningDesc')}</p>

      <Field
        label={t('dailyNewCards')}
        description={t('dailyNewCardsDesc')}
        value={values.dailyNewCards}
        min={1}
        max={100}
        onChange={set('dailyNewCards')}
      />
      <Field
        label={t('dailyReviews')}
        description={t('dailyReviewsDesc')}
        value={values.dailyReviews}
        min={10}
        max={500}
        onChange={set('dailyReviews')}
      />

      <h3 className="font-medium text-sm mt-5 mb-1">{t('intervalsTitle')}</h3>
      <p className="text-xs text-muted-foreground mb-3">{t('intervalsDesc')}</p>

      <Field
        label={t('intervalAgain')}
        description={t('intervalAgainDesc')}
        value={values.intervalAgain}
        min={1}
        max={7}
        onChange={set('intervalAgain')}
      />
      <Field
        label={t('intervalGood1')}
        description={t('intervalGood1Desc')}
        value={values.intervalGood1}
        min={1}
        max={14}
        onChange={set('intervalGood1')}
      />
      <Field
        label={t('intervalGood2')}
        description={t('intervalGood2Desc')}
        value={values.intervalGood2}
        min={2}
        max={30}
        onChange={set('intervalGood2')}
      />
      <Field
        label={t('intervalEasy1')}
        description={t('intervalEasy1Desc')}
        value={values.intervalEasy1}
        min={1}
        max={14}
        onChange={set('intervalEasy1')}
      />

      <Button
        onClick={handleSave}
        disabled={isPending}
        className="mt-5 w-full sm:w-auto"
      >
        <Save className="h-4 w-4 mr-2" />
        {saved ? t('saved') : t('save')}
      </Button>
    </div>
  );
}
