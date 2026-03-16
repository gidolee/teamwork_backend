import app from './app';
import config from './config/config';
import pool from './config/db';

const startServer = async () => {
    try {
        // Force DB connection
        await pool.query('SELECT 1');
        console.log('✅ Database connected successfully');

        app.listen(config, () => {
            console.log(`🚀 Server running on port ${config}`);
        });
    } catch (error) {
        console.error('❌ Database connection failed', error);
        process.exit(1);
    }
};

startServer();
