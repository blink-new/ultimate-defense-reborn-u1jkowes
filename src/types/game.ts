export interface Position {
  x: number;
  y: number;
}

export interface Tile {
  x: number;
  y: number;
  type: 'grass' | 'path' | 'spawn' | 'exit';
  isOccupied: boolean;
}

export interface GameState {
  grid: Tile[][];
  gridSize: number;
  selectedTile: Position | null;
  gold: number;
  lives: number;
  currentWave: number;
  isWaveActive: boolean;
}

export interface Enemy {
  id: string;
  position: Position;
  health: number;
  maxHealth: number;
  speed: number;
  pathIndex: number;
  statusEffects: StatusEffect[];
}

export interface StatusEffect {
  type: 'burn' | 'slow' | 'freeze' | 'poison' | 'stun';
  duration: number;
  intensity: number;
}

export interface Hero {
  id: string;
  type: 'archer' | 'mage' | 'warrior';
  position: Position;
  level: number;
  experience: number;
  damage: number;
  attackSpeed: number;
  accuracy: number;
  critChance: number;
  critMultiplier: number;
  range: number;
  attackPattern: 'single' | 'line' | 'cross' | 'aoe';
  skillPoints: number;
  upgrades: HeroUpgrade[];
}

export interface HeroUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  skillPointCost: number;
  unlocked: boolean;
}