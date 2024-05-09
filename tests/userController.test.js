const userController = require('../src/controllers/userController');
const userModel = require('../src/models/user');

describe('User Controller', () => {
    describe('createUser', () => {
        it('should create a new user in the database', async () => {
            const req = { body: { name: 'John Doe' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: expect.any(Number), name: 'John Doe' });
        });
    });
});