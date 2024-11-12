3 } from 'three';

export interface MapData {
  imageUrl: string;
  elevation: number[];
  coordinates: FlatEarthCoordinates;
}

export interface FlatEarthCoordinates {
  x: number;
  y: number;
}

export interface SearchResult {
  name: string;
  coordinates: FlatEarthCoordinates;
}

export interface DistanceMeasurement {
  start: FlatEarthCoordinates;
  end: FlatEarthCoordinates;
  distance: number;
}

export interface MapTile {
  id: string;
  imageUrl: string;
  position: Vector3;
}

export interface UserPreferences {
  id: number;
  username: string;
  defaultView: FlatEarthCoordinates;
  zoomLevel: number;
}

export interface PointOfInterest {
  id: number;
  name: string;
  description: string;
  coordinates: FlatEarthCoordinates;
  category: string;
}

export enum MapLayer {
  Satellite = 'satellite',
  Terrain = 'terrain',
  Street = 'street'
}

export interface MapState {
  center: FlatEarthCoordinates;
  zoom: number;
  rotation: number;
  tilt: number;
  activeLayer: MapLayer;
}

export interface SearchRequest {
  query: string;
}

export interface MeasureDistanceRequest {
  start: FlatEarthCoordinates;
  end: FlatEarthCoordinates;
}

