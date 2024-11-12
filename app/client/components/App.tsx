 React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import FlatEarthMap from './FlatEarthMap';
import SearchBar from './SearchBar';
import LayerToggle from './LayerToggle';
import Compass from './Compass';
import ScaleBar from './ScaleBar';
import InfoPanel from './InfoPanel';
import MeasurementTool from './MeasurementTool';

const App: React.FC = () => {
  const mapState = useSelector((state: RootState) => state.map);
  const uiState = useSelector((state: RootState) => state.ui);

  return (
    <div className="app-container">
      <FlatEarthMap />
      <div className="ui-overlay">
        <SearchBar />
        <LayerToggle />
        <Compass rotation={mapState.rotation} />
        <ScaleBar zoom={mapState.zoom} />
        {uiState.selectedPOI && <InfoPanel poi={uiState.selectedPOI} />}
        <MeasurementTool />
      </div>
    </div>
  );
};

export default App;

