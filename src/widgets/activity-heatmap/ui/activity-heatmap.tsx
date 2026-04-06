import { cn } from '@/shared/lib/utils';
import { getTranslations } from 'next-intl/server';

type Day = { date: string; count: number };

function cellColor(count: number, scale: number) {
  if (count === 0) return 'bg-muted';
  if (count < scale * 0.25) return 'bg-green-200 dark:bg-green-900';
  if (count < scale * 0.5)  return 'bg-green-400 dark:bg-green-700';
  if (count < scale * 0.75) return 'bg-green-600 dark:bg-green-500';
  return 'bg-green-800 dark:bg-green-400';
}

function utcKey(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function buildGrid(data: Day[]): (Day | null)[][] {
  const lookup = new Map(data.map((d) => [d.date, d.count]));

  const now = new Date();
  const todayKey = utcKey(now);

  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 364));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const weeks: (Day | null)[][] = [];
  const cur = new Date(start);

  while (utcKey(cur) <= todayKey) {
    const week: (Day | null)[] = [];
    for (let d = 0; d < 7; d++) {
      const key = utcKey(cur);
      week.push(key <= todayKey ? { date: key, count: lookup.get(key) ?? 0 } : null);
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

interface ActivityHeatmapProps {
  data: Day[];
  locale: string;
  totalDays: number;
  streak: number;
  dailyGoal: number;
}

export async function ActivityHeatmap({ data, locale, totalDays, streak, dailyGoal }: ActivityHeatmapProps) {
  const t = await getTranslations('heatmap');
  const isRu = locale === 'ru';
  const total = data.reduce((s, d) => s + d.count, 0);
  const maxCount = data.reduce((m, d) => Math.max(m, d.count), 0);
  const scale = Math.max(maxCount, dailyGoal);
  const weeks = buildGrid(data);

  const MONTHS = isRu
    ? ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const DAY_LABELS = isRu
    ? ['', 'Пн', '', 'Ср', '', 'Пт', '']
    : ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  const monthLabels: (string | null)[] = weeks.map((week) => {
    for (const day of week) {
      if (day && day.date.endsWith('-01')) {
        return MONTHS[new Date(day.date).getMonth()];
      }
    }
    return null;
  });

  const CELL = 'w-[11px] h-[11px] rounded-[2px]';

  return (
    <div className="border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">
          <span className="text-primary font-bold">{total}</span>{' '}
          {t('reviewsInYear')}
        </span>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{t('daysLabel')}: <span className="text-foreground font-medium">{totalDays}</span></span>
          <span>{t('streakLabel')}: <span className="text-foreground font-medium">{streak}</span></span>
        </div>
      </div>

      <div className="overflow-x-auto flex justify-center">
        <div className="inline-flex gap-2">
          <div className="flex flex-col gap-[3px] mt-[18px]">
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="h-[11px] w-7 flex items-center justify-end pr-1">
                <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <div className="relative h-[14px] flex gap-[3px]">
              {weeks.map((_, wi) => (
                <div key={wi} className="relative w-[11px] shrink-0">
                  {monthLabels[wi] && (
                    <span className="absolute left-0 top-0 text-[10px] text-muted-foreground leading-none whitespace-nowrap">
                      {monthLabels[wi]}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {Array.from({ length: 7 }, (_, dayIdx) => (
              <div key={dayIdx} className="flex gap-[3px]">
                {weeks.map((week, wi) => {
                  const day = week[dayIdx];
                  if (!day) {
                    return <div key={wi} className={CELL} />;
                  }
                  return (
                    <div
                      key={wi}
                      className={cn(CELL, 'transition-opacity hover:opacity-70', cellColor(day.count, scale))}
                      title={`${day.date}${day.count ? `: ${day.count}` : ''}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 justify-end mt-3 text-[10px] text-muted-foreground">
        <span>{t('less')}</span>
        {['bg-muted','bg-green-200 dark:bg-green-900','bg-green-400 dark:bg-green-700','bg-green-600 dark:bg-green-500','bg-green-800 dark:bg-green-400'].map((c, i) => (
          <div key={i} className={cn('w-[11px] h-[11px] rounded-[2px]', c)} />
        ))}
        <span>{t('more')}</span>
      </div>
    </div>
  );
}
