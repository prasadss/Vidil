const request = require('supertest');
const { User } = require('../../models/user');
let server;
describe('Auth Middleware',()=>{
    let token
    const exec= ()=>{
        return  request(server).post('/api/genres').send({name:'genres1'}).set('x-auth-token',token);
    }
    beforeEach(() => {
        process.env.VIDSECRETKEY="asd";
        server = require('../../app');
        token=new User().generateAuthToken();
    })
    afterEach(async () => {
        await server.close()
    });
    it('200 if valid token',async ()=>{
        const res=await exec();
        expect(res.status).toBe(200);
    })
    it('401 if no token',async ()=>{
        token='';
        const res=await exec();
        expect(res.status).toBe(401);
    })
    it('400 if invalid token',async ()=>{
        token='234424';
        const res=await exec();
        expect(res.status).toBe(400);
    })
})