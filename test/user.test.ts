import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import { createAdmin } from './util/admin';

import {
    createUserDetails as users,
    wrongCreateUserDetails,
    invalidSigninDetails,
} from './mocks/users';

let adminToken: string;

const createUserUrl = '/api/v1/auth/register';
const loginUrl = '/api/v1/auth/login';

describe('user tests', () => {
    before(async () => {
        adminToken = await createAdmin();
    });

    describe('POST sign up successfully, api/v1/auth/register', () => {
        it('should return signup successful', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)

                .send(users[2])
                .end((err, res) => {
                    // console.log('res.body', res.body);
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(201);
                    // expect(res.body.status).to.equal(201);
                    expect(res.body.status).to.equal('success');
                    done();
                });
        });

        it('should return email is already exist', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(users[0])
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });

        it('should return email is required is missing', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(wrongCreateUserDetails[0]) // undefined email
                .end((err, res) => {
                    // console.log('res.body', res.body);
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });

        // // Test login for the user

        it('should return signin successful', (done) => {
            request(app)
                .post('/api/v1/auth/login')
                .set('Accept', 'application/json')
                .send(users[2])
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal('success');
                    done();
                });
        });

        // // Test login for the user on fail

        it('should return Invalid Email or Password', (done) => {
            request(app)
                .post('/api/v1/auth/login')
                .set('Accept', 'application/json')
                .send(invalidSigninDetails[3])
                .end((err, res) => {
                    // console.log('res.body', res.body);
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(401);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });

        it('should return email is required is missing', (done) => {
            request(app)
                .post('/api/v1/auth/login')
                .set('Accept', 'application/json')
                .send(invalidSigninDetails[0]) // undefined email
                .end((err, res) => {
                    // console.log('res.body', res.body);
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });
        it('should fail when email format is invalid', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(wrongCreateUserDetails[1]) // invalid email format
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });

        it('should fail when firstName contains a space', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(wrongCreateUserDetails[4]) // spaced firstName
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });

        it('should fail when firstName is too short', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(wrongCreateUserDetails[5]) // short firstName
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });
        it('should fail when lastName is missing', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(wrongCreateUserDetails[6]) // undefined lastName
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });
        it('should fail when lastName contains a space', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(wrongCreateUserDetails[7]) // spaced lastName
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });
        it('should fail when department is missing', (done) => {
            request(app)
                .post(createUserUrl)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(wrongCreateUserDetails[10]) // undefined department
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');
                    done();
                });
        });
    });
});
