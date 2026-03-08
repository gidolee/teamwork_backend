import express from 'express'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.get('/ping', (req, res) => {
    res.status(200).json({ ok: true, message: 'pong' })
})

// Global error handler (should be after routes)
app.use(errorHandler)

export default app
