import express from 'express'

const app = express()

app.get('/ping', (req, res) => {
    res.status(200).json({ ok: true, message: 'pong' })
})

export default app
