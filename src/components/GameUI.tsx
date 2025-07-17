import React from 'react';
import { GameState } from '../types/game';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface GameUIProps {
  gameState: GameState;
  onStartWave: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onStartWave
}) => {
  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="game-panel p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-fredoka text-amber-800 drop-shadow-sm">
            🎮 Statistiques 🎮
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 border-4 border-yellow-400 shadow-lg">
            <div className="text-3xl font-bold text-yellow-800 font-fredoka">
              💰 {gameState.gold}
            </div>
            <div className="text-sm text-yellow-700 font-bold">Or</div>
          </div>
          <div className="text-center bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-4 border-4 border-red-400 shadow-lg">
            <div className="text-3xl font-bold text-red-800 font-fredoka">
              ❤️ {gameState.lives}
            </div>
            <div className="text-sm text-red-700 font-bold">Vies</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <div className="text-center flex-1">
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white border-3 border-blue-600 px-4 py-2 font-bold rounded-full shadow-lg">
              🌊 Vague {gameState.currentWave}
            </div>
          </div>
          <div className="text-center flex-1">
            <div 
              className={`px-4 py-2 font-bold border-3 rounded-full shadow-lg ${
                gameState.isWaveActive 
                  ? "bg-gradient-to-r from-red-400 to-red-500 text-white border-red-600" 
                  : "bg-gradient-to-r from-green-400 to-green-500 text-white border-green-600"
              }`}
            >
              {gameState.isWaveActive ? "⚡ Active" : "✅ Prêt"}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Controls */}
      <div className="game-panel p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-fredoka text-green-700 drop-shadow-sm">🎯 Contrôle des Vagues 🎯</h3>
        </div>
        
        <div className="space-y-3">
          {!gameState.isWaveActive ? (
            <button 
              onClick={onStartWave}
              className="w-full game-button text-white font-bold text-lg py-4 px-6 font-fredoka"
            >
              🚀 Démarrer la Vague {gameState.currentWave}
            </button>
          ) : (
            <div className="text-center bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-4 border-3 border-red-400 shadow-lg">
              <div className="text-red-700 font-bold text-lg font-fredoka">⚡ Vague {gameState.currentWave} Active</div>
              <div className="text-red-600 text-sm mt-1 font-medium">Les ennemis arrivent...</div>
            </div>
          )}
        </div>
      </div>

      {/* Tile Info */}
      <div className="game-panel p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-fredoka text-purple-700 drop-shadow-sm">📍 Info Case 📍</h3>
        </div>
        
        {gameState.selectedTile ? (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border-3 border-purple-300 shadow-lg">
              <div className="text-sm text-purple-600 font-medium">
                Type: <span className="font-bold capitalize">{gameState.grid[gameState.selectedTile.y][gameState.selectedTile.x].type}</span>
              </div>
              {gameState.grid[gameState.selectedTile.y][gameState.selectedTile.x].type === 'grass' && (
                <div className="text-sm text-green-600 font-bold mt-3 bg-green-100 rounded-lg px-3 py-2 border-2 border-green-300">
                  ✅ Disponible pour placer un héros
                </div>
              )}
              {gameState.grid[gameState.selectedTile.y][gameState.selectedTile.x].type === 'path' && (
                <div className="text-sm text-amber-600 font-bold mt-3 bg-amber-100 rounded-lg px-3 py-2 border-2 border-amber-300">
                  🛤️ Chemin des ennemis
                </div>
              )}
              {gameState.grid[gameState.selectedTile.y][gameState.selectedTile.x].type === 'spawn' && (
                <div className="text-sm text-orange-600 font-bold mt-3 bg-orange-100 rounded-lg px-3 py-2 border-2 border-orange-300">
                  ⚡ Point d'apparition
                </div>
              )}
              {gameState.grid[gameState.selectedTile.y][gameState.selectedTile.x].type === 'exit' && (
                <div className="text-sm text-blue-600 font-bold mt-3 bg-blue-100 rounded-lg px-3 py-2 border-2 border-blue-300">
                  🏰 Point d'arrivée
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-purple-600 text-center bg-white rounded-xl p-4 border-3 border-purple-300 shadow-lg font-medium">
            👆 Cliquez sur une case pour voir les détails
          </div>
        )}
      </div>
    </div>
  );
};

export default GameUI;