export interface CardSeed {
  id: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  questionRu: string;
  questionEn: string;
  answerRu: string;
  answerEn: string;
  tags: string[];
  order: number;
}
