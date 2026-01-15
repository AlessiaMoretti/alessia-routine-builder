export type Goal = 'energy' | 'sleep' | 'skin' | 'focus' | 'stress';
export type TimeAvailable = 5 | 10 | 20;
export type SkinType = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';
export type Language = 'en' | 'it';

export interface FormData {
  goals: Goal[];
  timeAvailable: TimeAvailable;
  skinType: SkinType;
  stressLevel: number;
}

export interface RoutineStep {
  name: string;
  duration: number;
}

export interface Routine {
  morning: RoutineStep[];
  evening: RoutineStep[];
  tips: string[];
  shopping: string[];
}
