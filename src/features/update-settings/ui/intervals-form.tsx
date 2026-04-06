'use client';

import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Save } from 'lucide-react';
import { Button } from '@/shared/ui/button';

interface Settings {
  dailyNewCards: number;
  dailyReviews: number;
  intervalAgain: number; // minutes
  intervalHard: number;  // minutes
  intervalGood: number;  // minutes
  intervalEasy: number;  // minutes
}

type Unit = 'minutes' | 'hours' | 'days';

function toMinutes(value: number, unit: Unit): number {
  if (unit === 'hours') return Math.round(value * 60);
  if (unit === 'days') return Math.round(value * 1440);
  return Math.round(value);
}

function fromMinutes(minutes: number): { value: number; unit: Unit } {
  if (minutes >= 1440 && minutes % 1440 === 0) return { value: minutes / 1440, unit: 'days' };
  if (minutes >= 60 && minutes % 60 === 0) return { value: minutes / 60, unit: 'hours' };
  return { value: minutes, unit: 'minutes' };
}

function StepperField({
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
        <span className="w-12 text-center text-sm font-mono font-medium">{value}</span>
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

function IntervalField({
  label,
  description,
  minutes,
  onChange,
  onValidChange,
}: {
  label: string;
  description: string;
  minutes: number;
  onChange: (minutes: number) => void;
  onValidChange: (valid: boolean) => void;
}) {
  const locale = useLocale();
  const initial = fromMinutes(minutes);
  const [inputStr, setInputStr] = useState(String(initial.value));
  const [unit, setUnit] = useState<Unit>(initial.unit);

  const isValid = (raw: string) => {
    const n = parseFloat(raw);
    return !isNaN(n) && n > 0;
  };

  const handleValueChange = (raw: string) => {
    setInputStr(raw);
    const valid = isValid(raw);
    onValidChange(valid);
    if (valid) onChange(toMinutes(parseFloat(raw), unit));
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
    if (isValid(inputStr)) onChange(toMinutes(parseFloat(inputStr), newUnit));
  };

  const invalid = !isValid(inputStr);

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <input
          type="number"
          min={1}
          step={1}
          value={inputStr}
          onChange={(e) => handleValueChange(e.target.value)}
          className={`w-16 text-center text-sm font-mono font-medium border rounded px-2 py-1 bg-background focus:outline-none focus:ring-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            invalid
              ? 'border-red-400 focus:ring-red-400'
              : 'focus:ring-ring'
          }`}
        />
        <select
          value={unit}
          onChange={(e) => handleUnitChange(e.target.value as Unit)}
          className="text-sm border rounded px-2 py-1 bg-background focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
        >
          <option value="minutes">{locale === 'ru' ? 'мин' : 'min'}</option>
          <option value="hours">{locale === 'ru' ? 'ч' : 'h'}</option>
          <option value="days">{locale === 'ru' ? 'дн' : 'd'}</option>
        </select>
      </div>
    </div>
  );
}

export function IntervalsForm({ initial }: { initial: Settings }) {
  const t = useTranslations('settings');
  const [values, setValues] = useState<Settings>(initial);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());

  const set = (key: keyof Settings) => (v: number) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const setValid = (key: string) => (valid: boolean) =>
    setInvalidFields((prev) => {
      const next = new Set(prev);
      if (valid) next.delete(key);
      else next.add(key);
      return next;
    });

  const hasErrors = invalidFields.size > 0;

  const handleSave = () => {
    if (hasErrors) return;
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

      <StepperField
        label={t('dailyNewCards')}
        description={t('dailyNewCardsDesc')}
        value={values.dailyNewCards}
        min={1}
        max={100}
        onChange={set('dailyNewCards')}
      />
      <StepperField
        label={t('dailyReviews')}
        description={t('dailyReviewsDesc')}
        value={values.dailyReviews}
        min={10}
        max={500}
        onChange={set('dailyReviews')}
      />

      <h3 className="font-medium text-sm mt-5 mb-1">{t('intervalsTitle')}</h3>
      <p className="text-xs text-muted-foreground mb-3">{t('intervalsDesc')}</p>

      <IntervalField
        label={t('intervalAgain')}
        description={t('intervalAgainDesc')}
        minutes={values.intervalAgain}
        onChange={set('intervalAgain')}
        onValidChange={setValid('intervalAgain')}
      />
      <IntervalField
        label={t('intervalHard')}
        description={t('intervalHardDesc')}
        minutes={values.intervalHard}
        onChange={set('intervalHard')}
        onValidChange={setValid('intervalHard')}
      />
      <IntervalField
        label={t('intervalGood')}
        description={t('intervalGoodDesc')}
        minutes={values.intervalGood}
        onChange={set('intervalGood')}
        onValidChange={setValid('intervalGood')}
      />
      <IntervalField
        label={t('intervalEasy')}
        description={t('intervalEasyDesc')}
        minutes={values.intervalEasy}
        onChange={set('intervalEasy')}
        onValidChange={setValid('intervalEasy')}
      />

      <div className="mt-5 flex items-center gap-3">
        <Button onClick={handleSave} disabled={isPending || hasErrors}>
          <Save className="h-4 w-4 mr-2" />
          {saved ? t('saved') : t('save')}
        </Button>
        {hasErrors && (
          <p className="text-sm text-red-500">{t('intervalError')}</p>
        )}
      </div>
    </div>
  );
}
