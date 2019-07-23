const request = require('supertest')
const mongoose = require('mongoose')
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
let server;
describe("/api/genres", () => {
    beforeEach(() => {
        process.env.VIDSECRETKEY="asd";
        server = require('../../app');
    })
    afterEach(async () => {
        await Genre.remove({});
        await server.close()
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ])
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(x => x.name === 'genre1')).toBeTruthy();
        })

    })
    describe('GET /:id', () => {
        it('should return genre with ID', async () => {
            const genres = new Genre({
                name: 'genre1'
            })
            await genres.save();
            const res = await request(server).get(`/api/genres/${genres._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", genres.name);
        });

        it('should return 400 if ID not found', async () => {
            const res = await request(server).get(`/api/genres/1`);
            expect(res.status).toBe(400);
        })
    })
    describe('POST /', () => {
        it('should return 401 if not logged in', async () => {
            const res = await request(server).post('/api/genres').send({ name: 'genre' });
            expect(res.status).toBe(401);
        });
        it('should return 400 if invalid data', async () => {

            const token = new User().generateAuthToken()
            const res = await request(server).post('/api/genres').send({ name: 'g' }).set('x-auth-token',token);
            expect(res.status).toBe(400);
        })
        it('should return 400 if invalid data', async () => {

            const token = new User().generateAuthToken()
            const res = await request(server).post('/api/genres').send({ name: 'g' }).set('x-auth-token',token);
            expect(res.status).toBe(400);
        })
        it('should save the genre if valid', async () => {

            const token = new User().generateAuthToken()

            const res = await request(server).post('/api/genres').send({ name: 'genre1' }).set('x-auth-token',token);

            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("name","genre1");
        })
    })
})