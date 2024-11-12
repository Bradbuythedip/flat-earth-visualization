 } from '@reduxjs/toolkit';
import { SearchResult, PointOfInterest } from '../../shared/types';

interface UIState {
  searchResults: SearchResult[];
  selectedPOI: PointOfInterest | null;
  isSearching: boolean;
  isMeasuring: boolean;
  measurementStart: { x: number; y: number } | null;
  measurementEnd: { x: number; y: number } | null;
}

const initialState: UIState = {
  searchResults: [],
  selectedPOI: null,
  isSearching: false,
  isMeasuring: false,
  measurementStart: null,
  measurementEnd: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.searchResults = action.payload;
    },
    setSelectedPOI: (state, action: PayloadAction<PointOfInterest | null>) => {
      state.selectedPOI = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setIsMeasuring: (state, action: PayloadAction<boolean>) => {
      state.isMeasuring = action.payload;
    },
    setMeasurementStart: (state, action: PayloadAction<{ x: number; y: number } | null>) => {
      state.measurementStart = action.payload;
    },
    setMeasurementEnd: (state, action: PayloadAction<{ x: number; y: number } | null>) => {
      state.measurementEnd = action.payload;
    },
  },
});

export const {
  setSearchResults,
  setSelectedPOI,
  setIsSearching,
  setIsMeasuring,
  setMeasurementStart,
  setMeasurementEnd,
} = uiSlice.actions;

export default uiSlice.reducer;

