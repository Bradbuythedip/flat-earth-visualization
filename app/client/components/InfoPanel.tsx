react';
import { PointOfInterest } from '../../shared/types';

interface InfoPanelProps {
  poi: PointOfInterest;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ poi }) => {
  return (
    <div className="info-panel">
      <h2>{poi.name}</h2>
      <p>{poi.description}</p>
      <p>Category: {poi.category}</p>
      <p>Coordinates: X: {poi.coordinates.x.toFixed(2)}, Y: {poi.coordinates.y.toFixed(2)}</p>
    </div>
  );
};

export default InfoPanel;

