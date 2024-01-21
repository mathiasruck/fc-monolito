import {app, sequelize} from "../express";
import request from "supertest";
import {Umzug} from "umzug";
import {ClientModel} from "../../../modules/client-adm/repository/client.model";
import {faker} from "@faker-js/faker";
import {migrator} from "../../config-migration/migrator";
import {QueryTypes} from "sequelize";

let migration: Umzug<any>;

const createProduct = async () => {
    const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        purchasePrice: +faker.commerce.price(),
        stock: faker.datatype.number(),
        salesPrice: +faker.commerce.price(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    sequelize.query(`
        INSERT INTO products (id,
                              name,
                              description,
                              "purchasePrice",
                              "salesPrice",
                              stock,
                              "createdAt",
                              "updatedAt")
        VALUES ("${product.id}",
                "${product.name}",
                "${product.description}",
                ${product.purchasePrice},
                ${product.salesPrice},
                ${product.stock},
                date ('now'),
                date ('now'))
    `, {type: QueryTypes.INSERT})

    return product
};
const mockDate = new Date(2023, 1, 1);

async function createClient() {
    return await ClientModel.create({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
        document: faker.random.alphaNumeric(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...(({
            street: faker.address.street(),
            number: "any_number",
            complement: "any_complement",
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
        })),
    });
}

describe("E2E test for checkout", () => {

    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(mockDate);
        migration = migrator(sequelize)
    })

    beforeEach(async () => {
        await migration.up();
    });

    afterEach(async () => {
        await migration.down();
    });


    afterAll(async () => {
        jest.useRealTimers();
        await sequelize.close();
    })

    it("should checkout", async () => {
        const client = await createClient();
        const product1 = await createProduct();
        const product2 = await createProduct();

        await request(app)
            .post("/checkout")
            .send({
                id: client.id,
                products: [{
                    id: product1.id,
                }, {
                    id: product2.id,
                }],
             }).expect(200)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.id).toBeDefined();
                expect(response.body.invoiceId).toBeDefined();
                expect(response.body.status).toBe("approved");
                expect(response.body.total).toBe(product1.salesPrice + product2.salesPrice);
                expect(response.body.products[0].productId).toBe(product1.id);
                expect(response.body.products[1].productId).toBe(product2.id);
            });

    });
});
