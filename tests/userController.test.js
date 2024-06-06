const userController = require('../src/controllers/userController');
const userService = require('../src/services/userService');

describe('User Controller', () => {
    describe('createUser', () => {
        it('should create a new user', async () => {
            const req = { body: { name: 'deneme', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });

        it('should handle invalid data error', async () => {
            jest.spyOn(userService, 'createUser').mockImplementation(() => {
                throw { code: 'INVALID_DATA' };
            });

            const req = { body: { name: 'deneme', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data provided' });
        });

        it('should handle internal server error', async () => {
            jest.spyOn(userService, 'createUser').mockImplementation(() => {
                throw new Error('Internal server error');
            });

            const req = { body: { name: 'deneme', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
});
