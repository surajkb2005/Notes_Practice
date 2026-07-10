import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/dbconfig.js';
import noteRouter from './routes/noteRoutes.js';
import client from 'prom-client';

dotenv.config();
connectDB();
// Collect default Node.js metrics
client.collectDefaultMetrics();

const app = express(); //using express is to make the server handling easier
app.use(cors()); //using cors is to allow cross-origin requests

// ---------------------------------------------------------------------------------------
// Count total HTTP requests
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
});
// Measure response time
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status'],
});
// ---------------------------------------------------------------------------------------

const port = process.env.PORT || 5000;
app.use(express.json());

// ---------------------------------------------------------------------------------------
// Metrics middleware
app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode,
        });
        end({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode,
        });
    });
    next();
});
// ---------------------------------------------------------------------------------------

// using the noteRouter for handling routes related to notes
app.use('/notes', noteRouter);

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);

    res.end(await client.register.metrics());
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
