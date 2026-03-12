import request from 'supertest'
import { expect } from 'chai'
import app from '../src/app'

describe('Auth endpoints', () => {
    it('should return 200 for health check', async () => {
        const res = await request(app).get('/api/v1/health')

        expect(res.status).to.equal(200)
        expect(res.body.status).to.equal('success')
        expect(res.body.data).to.have.property('message')
    })
})
