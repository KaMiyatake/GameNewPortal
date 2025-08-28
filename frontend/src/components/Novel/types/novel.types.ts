// src/components/Novel/types/novel.types.ts
export interface ScenarioStep {
  id: string;
  type: 'dialog' | 'narration' | 'choice' | 'scene_change' | 'character_change';
  speaker?: string;
  text: string;
  character?: {
    name: string;
    expression: string;
    position: 'left' | 'center' | 'right';
    action?: 'fade_in' | 'fade_out' | 'slide_in' | 'slide_out';
  };
  background?: {
    image: string;
    transition?: 'fade' | 'slide' | 'instant';
  };
  bgm?: {
    file: string;
    action: 'play' | 'stop' | 'fade_out';
  };
  choices?: {
    id: string;
    text: string;
    next_step: string;
  }[];
  next_step?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: ScenarioStep[];
}

export interface GameState {
  currentScenario: string;
  currentStep: number;
  characterPositions: {
    [key: string]: {
      name: string;
      expression: string;
      position: 'left' | 'center' | 'right';
      visible: boolean;
    };
  };
  currentBackground: string;
  currentBGM: string;
  textVisible: boolean;
  autoPlay: boolean;
  gameSpeed: number;
}
