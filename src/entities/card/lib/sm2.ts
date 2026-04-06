/**
 * SM-2 Spaced Repetition Algorithm
 * Based on the original algorithm by Piotr Wozniak
 *
 * Rating scale:
 * 0 - Again  (complete blackout)
 * 1 - Hard   (significant difficulty)
 * 2 - Good   (correct with hesitation)
 * 3 - Easy   (perfect recall)
 */

export type Rating = 0 | 1 | 2 | 3;

export interface SM2State {
  easeFactor: number;   // EF: starts at 2.5, min 1.3
  interval: number;     // days until next review
  repetitions: number;  // consecutive successful reviews
}

export interface SM2Result extends SM2State {
  dueDate: Date;
}

const MIN_EASE_FACTOR = 1.3;

export interface SM2Intervals {
  intervalAgain?: number; // minutes
  intervalHard?: number;  // minutes
  intervalGood?: number;  // minutes
  intervalEasy?: number;  // minutes
}

export function calculateSM2(state: SM2State, rating: Rating, intervals: SM2Intervals = {}): SM2Result {
  let { easeFactor, interval, repetitions } = state;

  const {
    intervalAgain = 5,
    intervalHard = 10,
    intervalGood = 1440,  // 1 day
    intervalEasy = 4320,  // 3 days
  } = intervals;

  const dueDate = new Date();

  if (rating === 0) {
    // Again: reset, schedule in minutes
    repetitions = 0;
    interval = 0;
    dueDate.setMinutes(dueDate.getMinutes() + intervalAgain);
    return { easeFactor, interval, repetitions, dueDate };
  }

  if (rating === 1) {
    // Hard: repeat soon, decrease EF
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);
    repetitions = Math.max(0, repetitions - 1);
    dueDate.setMinutes(dueDate.getMinutes() + intervalHard);
    interval = Math.max(1, Math.round(intervalHard / 1440));
    return { easeFactor, interval, repetitions, dueDate };
  }

  if (rating === 2) {
    // Good: normal progression
    if (repetitions <= 1) {
      interval = Math.max(1, Math.round(intervalGood / 1440));
      dueDate.setMinutes(dueDate.getMinutes() + intervalGood);
    } else {
      interval = Math.round(interval * easeFactor);
      dueDate.setDate(dueDate.getDate() + interval);
      dueDate.setHours(0, 0, 0, 0);
    }
    repetitions += 1;
  } else {
    // Easy: fast progression, increase EF
    easeFactor = Math.min(3.0, easeFactor + 0.1);
    if (repetitions <= 1) {
      interval = Math.max(1, Math.round(intervalEasy / 1440));
      dueDate.setMinutes(dueDate.getMinutes() + intervalEasy);
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
      dueDate.setDate(dueDate.getDate() + interval);
      dueDate.setHours(0, 0, 0, 0);
    }
    repetitions += 1;
  }

  return { easeFactor, interval, repetitions, dueDate };
}

export const RATING_LABELS = {
  ru: {
    0: 'Снова',
    1: 'Сложно',
    2: 'Хорошо',
    3: 'Легко',
  },
  en: {
    0: 'Again',
    1: 'Hard',
    2: 'Good',
    3: 'Easy',
  },
} as const;

export const RATING_COLORS = {
  0: 'bg-red-500 hover:bg-red-600',
  1: 'bg-orange-500 hover:bg-orange-600',
  2: 'bg-green-500 hover:bg-green-600',
  3: 'bg-blue-500 hover:bg-blue-600',
} as const;
