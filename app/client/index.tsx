import React from 'react';
import { createRoot } from 'react-dom/client';
import { SketchfabViewer } from './components/sketchfab-viewer';
import './styles/global.css';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SketchfabViewer />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

export default App;
