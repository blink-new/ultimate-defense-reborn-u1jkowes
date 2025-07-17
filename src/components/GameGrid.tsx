import React from 'react';
import { Tile, Position } from '../types/game';

interface GameGridProps {
  grid: Tile[][];
  selectedTile: Position | null;
  onTileClick: (position: Position) => void;
  onTileHover: (position: Position | null) => void;
}

const GameGrid: React.FC<GameGridProps> = ({
  grid,
  selectedTile,
  onTileClick,
  onTileHover
}) => {
  const getTileColor = (tile: Tile): string => {
    switch (tile.type) {
      case 'grass':
        return 'grass-tile hover:brightness-110 transition-all duration-200';
      case 'path':
        return 'path-tile';
      case 'spawn':
        return 'spawn-tile';
      case 'exit':
        return 'exit-tile';
      default:
        return 'bg-gray-400';
    }
  };

  const getTileBorder = (tile: Tile): string => {
    if (selectedTile && selectedTile.x === tile.x && selectedTile.y === tile.y) {
      return 'ring-3 ring-orange-400 ring-inset shadow-lg';
    }
    return '';
  };

  const getTileIcon = (tile: Tile): string => {
    switch (tile.type) {
      case 'spawn':
        return '🔶';
      case 'exit':
        return '🏁';
      default:
        return '';
    }
  };

  return (
    <div className="inline-block p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 rounded-3xl border-4 border-amber-400 shadow-2xl game-panel">
      {/* Game Board Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-fredoka text-amber-800 drop-shadow-sm">
          🗺️ Champ de Bataille 🗺️
        </h2>
        <p className="text-sm text-amber-700 font-medium">
          Placez vos héros sur l'herbe • Les ennemis suivent le chemin
        </p>
      </div>
      
      {/* Game Grid */}
      <div className="grid grid-cols-18 gap-0 bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 p-4 rounded-2xl border-4 border-green-300 shadow-inner">
        {grid.map((row, y) =>
          row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                w-7 h-7 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-bold
                ${getTileColor(tile)}
                ${getTileBorder(tile)}
                ${tile.type === 'grass' ? 'hover:scale-110 hover:z-10 relative hover:brightness-110' : ''}
                ${tile.type === 'spawn' ? 'spawn-indicator' : ''}
                rounded-sm
              `}
              onClick={() => onTileClick({ x, y })}
              onMouseEnter={() => onTileHover({ x, y })}
              onMouseLeave={() => onTileHover(null)}
            >
              {getTileIcon(tile)}
            </div>
          ))
        )}
      </div>
      
      {/* Direction Indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full border-2 border-blue-300">
          <span className="text-blue-700 font-medium text-sm">
            ⚡ Départ
          </span>
          <span className="text-blue-600">→</span>
          <span className="text-blue-700 font-medium text-sm">
            🏰 Arrivée
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;