export type DateLabels = {
  now: string;
  tomorrow: string;
  days: (n: number) => string;
  weeks: (n: number) => string;
  months: (n: number) => string;
};

export type StatusLabels = {
  new: string;
  learning: string;
  due: string;
  learned: string;
};
