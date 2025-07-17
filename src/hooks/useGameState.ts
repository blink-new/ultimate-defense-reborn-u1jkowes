import { useState, useCallback } from 'react';
import { GameState, Tile, Position } from '../types/game';
import { createDefaultPath } from '../utils/pathfinding';

const GRID_SIZE = 18;

const initializeGrid = (): Tile[][] => {
  const grid: Tile[][] = [];
  const path = createDefaultPath();
  const pathSet = new Set(path.map(p => `${p.x},${p.y}`));
  
  for (let y = 0; y < GRID_SIZE; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const posKey = `${x},${y}`;
      let type: Tile['type'] = 'grass';
      
      if (pathSet.has(posKey)) {
        if (x === 0 && y === 9) {
          type = 'spawn';
        } else if (x === 17 && y === 3) {
          type = 'exit';
        } else {
          type = 'path';
        }
      }
      
      row.push({
        x,
        y,
        type,
        isOccupied: false
      });
    }
    grid.push(row);
  }
  
  return grid;
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: initializeGrid(),
    gridSize: GRID_SIZE,
    selectedTile: null,
    gold: 100,
    lives: 20,
    currentWave: 1,
    isWaveActive: false
  });

  const selectTile = useCallback((position: Position) => {
    setGameState(prev => ({
      ...prev,
      selectedTile: position
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedTile: null
    }));
  }, []);

  const updateGold = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      gold: Math.max(0, prev.gold + amount)
    }));
  }, []);

  const updateLives = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      lives: Math.max(0, prev.lives + amount)
    }));
  }, []);

  const setWaveActive = useCallback((active: boolean) => {
    setGameState(prev => ({
      ...prev,
      isWaveActive: active
    }));
  }, []);

  const nextWave = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentWave: prev.currentWave + 1,
      isWaveActive: false
    }));
  }, []);

  return {
    gameState,
    selectTile,
    clearSelection,
    updateGold,
    updateLives,
    setWaveActive,
    nextWave
  };
};