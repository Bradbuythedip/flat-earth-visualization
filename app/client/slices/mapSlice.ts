

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapState, FlatEarthCoordinates, MapLayer } from '../../shared/types';

const initialState: MapState = {
  center: { x: 0, y: 0 },
  zoom: 1,
  rotation: 0,
  tilt: 0,
  activeLayer: MapLayer.Satellite,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<FlatEarthCoordinates>) => {
      state.center = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setRotation: (state, action: PayloadAction<number>) => {
      state.rotation = action.payload;
    },
    setTilt: (state, action: PayloadAction<number>) => {
      state.tilt = action.payload;
    },
    setActiveLayer: (state, action: PayloadAction<MapLayer>) => {
      state.activeLayer = action.payload;
    },
  },
});

export const { setCenter, setZoom, setRotation, setTilt, setActiveLayer } = mapSlice.actions;

export default mapSlice.reducer;

