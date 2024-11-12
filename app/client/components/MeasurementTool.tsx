

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setIsMeasuring, setMeasurementStart, setMeasurementEnd } from '../slices/uiSlice';
import { FlatEarthCoordinates } from '../../shared/types';

const MeasurementTool: React.FC = () => {
  const dispatch = useDispatch();
  const { isMeasuring, measurementStart, measurementEnd } = useSelector((state: RootState) => state.ui);

  const handleMeasureToggle = () => {
    dispatch(setIsMeasuring(!isMeasuring));
    if (isMeasuring) {
      // Reset measurement points when turning off
      dispatch(setMeasurementStart(null));
      dispatch(setMeasurementEnd(null));
    }
  };

  const handleMapClick = (coordinates: FlatEarthCoordinates) => {
    if (!isMeasuring) return;

    if (!measurementStart) {
      dispatch(setMeasurementStart(coordinates));
    } else if (!measurementEnd) {
      dispatch(setMeasurementEnd(coordinates));
      calculateDistance(measurementStart, coordinates);
    } else {
      // Reset and start new measurement
      dispatch(setMeasurementStart(coordinates));
      dispatch(setMeasurementEnd(null));
    }
  };

  const calculateDistance = async (start: FlatEarthCoordinates, end: FlatEarthCoordinates) => {
    try {
      const response = await fetch('/api/measure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start, end }),
      });

      if (!response.ok) {
        throw new Error('Measurement failed');
      }

      const result = await response.json();
      console.log(`Distance: ${result.distance.toFixed(2)} km`);
      // You might want to display this result in the UI
    } catch (error) {
      console.error('Measurement error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="measurement-tool">
      <button onClick={handleMeasureToggle}>
        {isMeasuring ? 'Cancel Measurement' : 'Measure Distance'}
      </button>
      {isMeasuring && (
        <p>
          {!measurementStart
            ? 'Click on the map to set start point'
            : !measurementEnd
            ? 'Click on the map to set end point'
            : 'Measurement complete. Click to start new measurement.'}
        </p>
      )}
    </div>
  );
};

export default MeasurementTool;

