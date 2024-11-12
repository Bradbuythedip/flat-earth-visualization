# Flat Earth Visualization

An interactive 3D visualization of the Flat Earth model using Sketchfab's viewer.

## Features

- Interactive 3D visualization
- High-quality textures and models
- Full orbit and zoom controls
- Mobile-friendly interface
- VR/AR support through Sketchfab

## Technology Stack

- React
- TypeScript
- Bun / Node.js
- Express
- Sketchfab Viewer

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flat-earth-visualization.git
cd flat-earth-visualization
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Start the development server:
```bash
bun server/run_express.ts
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:8001`

## Project Structure

```
flat-earth-visualization/
├── client/
│   ├── components/
│   │   └── sketchfab-viewer.tsx
│   ├── styles/
│   │   └── global.css
│   └── index.tsx
├── server/
│   └── run_express.ts
├── public/
├── dist/
├── package.json
└── README.md
```

## Credits

- 3D Model: ["Flat Earth Theory" by AORV on Sketchfab](https://sketchfab.com/3d-models/flat-earth-theory-092c2b871a704bd39387dacbd2286ad5)

## License

MIT License - See LICENSE file for details
