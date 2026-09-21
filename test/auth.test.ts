import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';

describe('Auth endpoints', () => {
    it('should return 200 for health check', async () => {
        const res = await request(app).get('/health');

        expect(res.status).to.equal(200);
    });
});
