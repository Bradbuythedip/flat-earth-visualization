import React from 'react';

export const SketchfabViewer = () => {
  return (
    <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '100vh' }}>
      <iframe 
        title="Flat Earth Theory"
        src="https://sketchfab.com/models/092c2b871a704bd39387dacbd2286ad5/embed"
        style={{
          width: '100%',
          height: '100%',
          border: 0
        }}
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
      />
    </div>
  );
};
