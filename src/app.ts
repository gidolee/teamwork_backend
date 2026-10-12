import express from 'express';
import authRoute from '../src/routes/authRoutes';
import articleRoute from '../src/routes/articleRoute';
const app = express();
app.use(express.json());
app.get('/health', (req, res) => {
    res.send({ message: 'it is working' });
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/articles', articleRoute);
export default app;
