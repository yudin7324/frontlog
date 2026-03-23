import { cn } from '@/lib/utils';

type Day = { date: string; count: number };

function cellColor(count: number) {
  if (count === 0) return 'bg-muted';
  if (count <= 2)  return 'bg-primary/20';
  if (count <= 5)  return 'bg-primary/45';
  if (count <= 9)  return 'bg-primary/70';
  return 'bg-primary';
}

/** Returns a 53×7 grid (weeks × days), starting from the Sunday 52 weeks ago */
function buildGrid(data: Day[]): (Day | null)[][] {
  const lookup = new Map(data.map((d) => [d.date, d.count]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from the Sunday that begins the 52-week window
  const start = new Date(today);
  start.setDate(today.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // rewind to Sunday

  const weeks: (Day | null)[][] = [];
  const cur = new Date(start);

  while (cur <= today) {
    const week: (Day | null)[] = [];
    for (let d = 0; d < 7; d++) {
      if (cur > today) {
        week.push(null);
      } else {
        const key = cur.toISOString().slice(0, 10);
        week.push({ date: key, count: lookup.get(key) ?? 0 });
      }
      cur.setDate(cur.getDate() + 1);
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
}

export function ActivityHeatmap({ data, locale, totalDays, streak }: ActivityHeatmapProps) {
  const isRu = locale === 'ru';
  const total = data.reduce((s, d) => s + d.count, 0);
  const weeks = buildGrid(data);

  const MONTHS = isRu
    ? ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const DAY_LABELS = isRu
    ? ['', 'Пн', '', 'Ср', '', 'Пт', '']
    : ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  // Month label: show when week contains the 1st of a month
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">
          <span className="text-primary font-bold">{total}</span>{' '}
          {isRu ? 'повторений за год' : 'reviews in the last year'}
        </span>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{isRu ? 'Дней: ' : 'Days: '}<span className="text-foreground font-medium">{totalDays}</span></span>
          <span>{isRu ? 'Серия: ' : 'Streak: '}<span className="text-foreground font-medium">{streak}</span></span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-2">
          {/* Day labels column */}
          <div className="flex flex-col gap-[3px] mt-[18px]">
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="h-[11px] w-7 flex items-center justify-end pr-1">
                <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex flex-col gap-1">
            {/* Month labels */}
            <div className="flex gap-[3px]">
              {weeks.map((_, wi) => (
                <div key={wi} className="w-[11px] text-[10px] text-muted-foreground leading-none">
                  {monthLabels[wi] ?? ''}
                </div>
              ))}
            </div>

            {/* Cells: render row by row (0=Sun … 6=Sat) */}
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
                      className={cn(CELL, 'transition-opacity hover:opacity-70', cellColor(day.count))}
                      title={`${day.date}${day.count ? `: ${day.count}` : ''}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1 justify-end mt-3 text-[10px] text-muted-foreground">
        <span>{isRu ? 'Меньше' : 'Less'}</span>
        {['bg-muted','bg-primary/20','bg-primary/45','bg-primary/70','bg-primary'].map((c, i) => (
          <div key={i} className={cn('w-[11px] h-[11px] rounded-[2px]', c)} />
        ))}
        <span>{isRu ? 'Больше' : 'More'}</span>
      </div>
    </div>
  );
}
