import {app, sequelize} from "../express";
import request from "supertest";
import {InvoiceModel} from "../../../modules/invoice/repository/invoice.model";
import {InvoiceItemsModel} from "../../../modules/invoice/repository/invoice.items.model";

describe("E2E test for invoice", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should get an invoice", async () => {
        const inv = await InvoiceModel.create({
                id: "1",
                name: "Invoice 1",
                document: "doc 1",
                street: "Rua da Praia",
                number: "2034",
                complement: "Melhor AP",
                city: "Florianopolis",
                state: "SC",
                zipCode: "88888-123",
                items: [{
                    id: "item1",
                    name: "item 1",
                    price: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }],
                total: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {include: [InvoiceItemsModel]}
        );
        await request(app)
            .get("/invoice/1")
            .expect(200)
            .then((response) => {
                expect(response.body.id).toBe(inv.id);
                expect(response.body.name).toBe(inv.name);
                expect(response.body.document).toBe(inv.document);
                expect(response.body.address.street).toBe(inv.street);
                expect(response.body.address.number).toBe(inv.number);
                expect(response.body.address.complement).toBe(inv.complement);
                expect(response.body.address.city).toBe(inv.city);
                expect(response.body.address.state).toBe(inv.state);
                expect(response.body.address.zipCode).toBe(inv.zipCode);
                expect(response.body.items[0].id).toBe(inv.items[0].id);
                expect(response.body.items[0].name).toBe(inv.items[0].name);
                expect(response.body.items[0].price).toBe(inv.items[0].price);
                expect(response.body.total).toBe(inv.total);
            });
    })
})
