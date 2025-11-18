export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface SlideData {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  points: string[];
  codeSnippet?: string;
  quiz: Question[];
}

export type AnimationState = 'assembling' | 'holding' | 'liquid' | 'dispersing';

export interface AppState {
  currentSlideIndex: number;
  isMenuOpen: boolean;
  animationState: AnimationState;
  noiseEnabled: boolean;
  reducedMotion: boolean;
}