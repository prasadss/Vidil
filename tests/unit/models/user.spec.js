const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
describe('User.generateAuthToken', () => {
    it('should return valid token', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        const user = new User(payload);

        const token = user.generateAuthToken()
        const decoded = jwt.verify(token, process.env.VIDSECRETKEY);
        expect(decoded).toMatchObject(payload);
    });
});
