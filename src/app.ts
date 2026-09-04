import express from 'express';
import authRoute from '../src/routes/authRoutes';
const app = express();
app.use(express.json());
app.get('/health', (req, res) => {
    res.send({ message: 'it is working' });
});

app.use('/api/v1/auth', authRoute);
export default app;
