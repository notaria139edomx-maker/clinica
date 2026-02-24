import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is running smoothly!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
