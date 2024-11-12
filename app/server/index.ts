';
import { app } from './run_express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { MapData, SearchResult, DistanceMeasurement, FlatEarthCoordinates, PointOfInterest, SearchRequest, MeasureDistanceRequest } from '../shared/types';

// Database setup
let db: sqlite3.Database;

async function setupDatabase() {
  db = await open({
    filename: path.join(__dirname, 'flatearth.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS map_tiles (
      id TEXT PRIMARY KEY,
      image_url TEXT,
      x REAL,
      y REAL,
      z REAL
    );

    CREATE TABLE IF NOT EXISTS points_of_interest (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      x REAL,
      y REAL,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      default_view_x REAL,
      default_view_y REAL,
      zoom_level REAL
    );
  `);
}

setupDatabase();

// API Routes
app.get('/api/map-data', async (req, res) => {
  const { x, y } = req.query;
  const mapData: MapData = {
    imageUrl: `https://flatearth-tiles.com/${x}-${y}.jpg`,
    elevation: [/* Elevation data would be fetched from the database */],
    coordinates: { x: Number(x), y: Number(y) }
  };
  res.json(mapData);
});

app.post('/api/search', async (req, res) => {
  const { query }: SearchRequest = req.body;
  const results: SearchResult[] = await db.all(
    'SELECT name, x, y FROM points_of_interest WHERE name LIKE ?',
    [`%${query}%`]
  );
  res.json(results.map(r => ({ name: r.name, coordinates: { x: r.x, y: r.y } })));
});

app.post('/api/measure', (req, res) => {
  const { start, end }: MeasureDistanceRequest = req.body;
  const distance = calculateFlatEarthDistance(start, end);
  const measurement: DistanceMeasurement = { start, end, distance };
  res.json(measurement);
});

app.get('/api/poi', async (req, res) => {
  const pois: PointOfInterest[] = await db.all('SELECT * FROM points_of_interest');
  res.json(pois.map(p => ({
    ...p,
    coordinates: { x: p.x, y: p.y }
  })));
});

// Helper function to calculate distance on flat Earth
function calculateFlatEarthDistance(start: FlatEarthCoordinates, end: FlatEarthCoordinates): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.sqrt(dx * dx + dy * dy);
}

console.log('Server is running on http://localhost:8001');

