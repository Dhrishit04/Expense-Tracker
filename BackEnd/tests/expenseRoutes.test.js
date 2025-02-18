
const request = require('supertest');
const app = require('../app'); // Assuming app.js exports the app

describe('Expense Routes', () => {
    // Test for adding a new expense
    it('should add a new expense', async () => {
        const response = await request(app)
            .post('/api/expenses/add')
            .send({
                amount: 100.5,
                description: 'Groceries',
                category: 'Food',
                isRecurring: true,
                recurrenceInterval: 'weekly'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('id');
    });

    // Test for retrieving all expenses
    it('should retrieve all expenses with analytics', async () => {
        const response = await request(app)
            .get('/api/expenses/all');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.analytics).toHaveProperty('totalAmount');
        expect(response.body.analytics).toHaveProperty('count');
        expect(response.body.analytics).toHaveProperty('average');
    });
});
