
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveLayer } from '../slices/mapSlice';
import { MapLayer } from '../../shared/types';

const LayerToggle: React.FC = () => {
  const activeLayer = useSelector((state: RootState) => state.map.activeLayer);
  const dispatch = useDispatch();

  const handleLayerChange = (layer: MapLayer) => {
    dispatch(setActiveLayer(layer));
  };

  return (
    <div className="layer-toggle">
      <button
        className={`layer-button ${activeLayer === MapLayer.Satellite ? 'active' : ''}`}
        onClick={() => handleLayerChange(MapLayer.Satellite)}
      >
        Satellite
      </button>
      <button
        className={`layer-button ${activeLayer === MapLayer.Terrain ? 'active' : ''}`}
        onClick={() => handleLayerChange(MapLayer.Terrain)}
      >
        Terrain
      </button>
      <button
        className={`layer-button ${activeLayer === MapLayer.Street ? 'active' : ''}`}
        onClick={() => handleLayerChange(MapLayer.Street)}
      >
        Street
      </button>
    </div>
  );
};

export default LayerToggle;

