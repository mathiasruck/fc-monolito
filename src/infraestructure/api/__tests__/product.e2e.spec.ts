import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create product", async () => {

        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                description: "Best Product 1",
                purchasePrice: 500,
                stock: 10
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Best Product 1");
        expect(response.body.purchasePrice).toBe(500);
        expect(response.body.stock).toBe(10);
    })
})
