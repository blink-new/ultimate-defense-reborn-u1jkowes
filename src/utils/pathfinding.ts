import { Position, Tile } from '../types/game';

// Predefined path for the 18x18 grid - creates a winding path from spawn to exit
export const createDefaultPath = (): Position[] => {
  const path: Position[] = [];
  
  // Start from left side (spawn)
  const startX = 0;
  const startY = 9; // Middle of the grid
  
  // Create a winding path across the grid
  const waypoints = [
    { x: 0, y: 9 },   // Spawn point
    { x: 4, y: 9 },   // Move right
    { x: 4, y: 5 },   // Move up
    { x: 8, y: 5 },   // Move right
    { x: 8, y: 13 },  // Move down
    { x: 12, y: 13 }, // Move right
    { x: 12, y: 3 },  // Move up
    { x: 17, y: 3 },  // Move to exit
  ];
  
  // Generate smooth path between waypoints
  for (let i = 0; i < waypoints.length - 1; i++) {
    const current = waypoints[i];
    const next = waypoints[i + 1];
    
    // Add current waypoint if it's the first one
    if (i === 0) {
      path.push(current);
    }
    
    // Generate path between current and next waypoint
    const steps = generatePathBetweenPoints(current, next);
    path.push(...steps);
  }
  
  return path;
};

function generatePathBetweenPoints(start: Position, end: Position): Position[] {
  const path: Position[] = [];
  let current = { ...start };
  
  // Move horizontally first, then vertically
  while (current.x !== end.x) {
    current.x += current.x < end.x ? 1 : -1;
    path.push({ ...current });
  }
  
  while (current.y !== end.y) {
    current.y += current.y < end.y ? 1 : -1;
    path.push({ ...current });
  }
  
  return path;
}

export const isValidPlacement = (x: number, y: number, grid: Tile[][]): boolean => {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
    return false;
  }
  
  const tile = grid[y][x];
  return tile.type === 'grass' && !tile.isOccupied;
};

export const getNeighbors = (position: Position, gridSize: number): Position[] => {
  const neighbors: Position[] = [];
  const directions = [
    { x: 0, y: -1 }, // North
    { x: 1, y: 0 },  // East
    { x: 0, y: 1 },  // South
    { x: -1, y: 0 }  // West
  ];
  
  directions.forEach(dir => {
    const newX = position.x + dir.x;
    const newY = position.y + dir.y;
    
    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
      neighbors.push({ x: newX, y: newY });
    }
  });
  
  return neighbors;
};