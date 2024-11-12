'react';

interface ScaleBarProps {
  zoom: number;
}

const ScaleBar: React.FC<ScaleBarProps> = ({ zoom }) => {
  const scaleLength = useMemo(() => {
    // Calculate scale length based on zoom level
    // This is a simplified calculation and should be adjusted based on your flat Earth model
    const baseLength = 100; // 100 km at zoom level 1
    return baseLength / zoom;
  }, [zoom]);

  return (
    <div className="scale-bar">
      <div className="scale-line" style={{ width: `${scaleLength}px` }}></div>
      <div className="scale-text">{scaleLength.toFixed(2)} km</div>
    </div>
  );
};

export default ScaleBar;

