import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import GameGrid from './components/GameGrid';
import GameUI from './components/GameUI';
import { Position } from './types/game';
import './App.css';

function App() {
  const {
    gameState,
    selectTile,
    clearSelection,
    setWaveActive,
    nextWave
  } = useGameState();

  const [hoveredTile, setHoveredTile] = useState<Position | null>(null);

  const handleTileClick = (position: Position) => {
    const tile = gameState.grid[position.y][position.x];
    
    if (tile.type === 'grass') {
      selectTile(position);
    } else {
      clearSelection();
    }
  };

  const handleTileHover = (position: Position | null) => {
    setHoveredTile(position);
  };

  const handleStartWave = () => {
    setWaveActive(true);
    // TODO: Implement wave spawning logic
    console.log('Starting wave', gameState.currentWave);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100" style={{backgroundColor: 'hsl(var(--background))'}}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-400 border-b-4 border-green-500 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white font-fredoka drop-shadow-lg mb-2">
            🏰 Ultimate Defense Reborn 🏹
          </h1>
          <p className="text-green-50 text-lg font-medium">
            Défense Stratégique • Combat sur Grille • Héros Évolutifs
          </p>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Game Grid - Takes up most space */}
          <div className="xl:col-span-3 flex justify-center">
            <GameGrid
              grid={gameState.grid}
              selectedTile={gameState.selectedTile}
              onTileClick={handleTileClick}
              onTileHover={handleTileHover}
            />
          </div>

          {/* UI Panel */}
          <div className="xl:col-span-1">
            <GameUI
              gameState={gameState}
              onStartWave={handleStartWave}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;