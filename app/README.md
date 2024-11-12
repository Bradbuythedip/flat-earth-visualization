 Application

This web application provides an interactive 3D visualization of a flat Earth model, built for deployment on the QUAI network. The application mirrors Google Earth's functionality while representing Earth as a flat disc.

## Routes

- `/`: Main application route
- `/api/map-data`: Get map data for the flat Earth model
- `/api/search`: Search for locations on the flat Earth
- `/api/measure`: Calculate distances on the flat Earth model

## Technologies Used

- Backend: Node.js with TypeScript, Express.js
- Frontend: React 18 with TypeScript
- 3D Visualization: Three.js
- State Management: Redux
- Database: SQLite (sqlite3 library)
- QUAI Network Integration: Smart contracts for decentralized data storage

## Setup and Running

1. Install dependencies:
   ```
   npm install
   ```

2. Run the application:
   ```
   bun server/run.ts
   ```

3. Open `http://localhost:8001` in your browser.

## Database

This project uses SQLite for storing map data, user preferences, and other necessary information. The database is automatically created and tables are set up when the server starts.

## Socket.io

This project does not use Socket.io for real-time communication. All data is fetched through RESTful API endpoints.

