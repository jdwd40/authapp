process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seed/seed');
const userData = require('../db/data/test/users');

describe('/', () => {
    beforeEach(() => seed(userData));
    afterAll(() => db.end());

    test('GET /api', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then((res) => {
                expect(res.body.msg).toBe('Hello from the API!');
            });
    });
});

// /api/users
describe('/api/users', () => {
    test('GET /api/users returns an array of users', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then((res) => {
                expect(Array.isArray(res.body.users)).toBe(true);
                expect(res.body.users.length).toBe(userData.length);
                res.body.users.forEach((user) => {
                    expect(user).toHaveProperty('username');
                    expect(user).toHaveProperty('name');
                    expect(user).toHaveProperty('avatar_url');
                });
            });
    });

    test('GET /api/users/:username returns a single user', () => {
        const testUser = userData[0];
        return request(app)
            .get(`/api/users/${testUser.username}`)
            .expect(200)
            .then((res) => {
                expect(res.body.user).toEqual(testUser);
            });
    });

    test('POST /api/users creates a new user', () => {
        const newUser = {
            username: 'newuser',
            name: 'New User',
            avatar_url: 'https://example.com/avatar.jpg'
        };
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .then((res) => {
                expect(res.body.user).toMatchObject(newUser);
            });
    });

    test('404: GET /api/users/:username with non-existent username', () => {
        return request(app)
            .get('/api/users/nonexistentuser')
            .expect(404)
            .then((res) => {
                expect(res.body.msg).toBe('User not found');
            });
    });
});
