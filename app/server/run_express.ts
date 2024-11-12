import http from "http";
import { Server } from "socket.io";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import esbuild from 'esbuild';
import fs from 'fs';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/client/:file', (req, res) => {
    const filepath = path.join(__dirname, '../client', req.params.file);
    res.sendFile(filepath);
});

app.get('/dist/:file', (req, res) => {
    const filepath = path.join(__dirname, '../dist', req.params.file);
    res.sendFile(filepath);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8001;
server.listen(port, () => {
    console.log('Server is running on port ' + port);
    console.log('Open http://localhost:' + port + ' in your browser.');
});

(async () => {
    const folder = path.join(__dirname, '../');
    
    try {
        await esbuild.build({
            entryPoints: [path.join(folder, 'client/index.tsx')],
            bundle: true,
            outfile: path.join(folder, 'dist/bundle.js'),
            format: 'esm',
            platform: 'browser',
            loader: {
                '.tsx': 'tsx',
                '.ts': 'ts',
                '.js': 'js',
                '.css': 'css',
            },
            plugins: [],
            define: {
                'process.env.NODE_ENV': '"development"'
            }
        });

        const indexHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flat Earth Visualization</title>
    <link rel="stylesheet" href="/dist/bundle.css">
    <script type="importmap">
    {
        "imports": {
            "three": "/node_modules/three/build/three.module.js",
            "@react-three/fiber": "/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js",
            "@react-three/drei": "/node_modules/@react-three/drei/index.js"
        }
    }
    </script>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/dist/bundle.js"></script>
</body>
</html>`;

        await fs.promises.writeFile(path.join(__dirname, 'index.html'), indexHtml);
        console.log('Build completed successfully');

    } catch (error) {
        console.error('Build failed:', error);
    }
})();
