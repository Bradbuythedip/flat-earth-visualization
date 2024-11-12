 React from 'react';

interface CompassProps {
  rotation: number;
}

const Compass: React.FC<CompassProps> = ({ rotation }) => {
  const compassStyle: React.CSSProperties = {
    transform: `rotate(${-rotation}rad)`,
  };

  return (
    <div className="compass" style={compassStyle}>
      <div className="compass-north">N</div>
      <div className="compass-east">E</div>
      <div className="compass-south">S</div>
      <div className="compass-west">W</div>
    </div>
  );
};

export default Compass;

