import {Sequelize} from "sequelize-typescript";
import {OrderModel} from "./order.model";
import {OrderProductsModel} from "./order.products.model";
import OrderRepository from "./order.repository";
import OrderEntity from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

describe("Order repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([OrderModel, OrderProductsModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    });

    it("Should find an order", async () => {
        const order = await OrderModel.create({
                id: "1",
                status: "approved",
                clientId: "1c",
                clientName: "Client name 1",
                clientEmail: "client@email.com",
                clientAddress: "Rua da Praia",
                orderProducts: [{
                    id: "p1",
                    name: "product 1",
                    description: "desc prod 1",
                    salesPrice: 100,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {include: [OrderProductsModel]}
        )

        const repository = new OrderRepository();
        const result = await repository.findOrder(order.id);

        expect(result.id.id).toEqual(order.id);
        expect(result.client.id.id).toEqual(order.clientId);
        expect(result.client.name).toEqual(order.clientName);
        expect(result.client.email).toEqual(order.clientEmail);
        expect(result.client.address).toEqual(order.clientAddress);
        expect(result.products[0].id.id).toEqual(order.orderProducts[0].id);
        expect(result.products[0].name).toEqual(order.orderProducts[0].name);
        expect(result.products[0].description).toEqual(order.orderProducts[0].description);
    });

    it("Should generate an invoice", async () => {
        const order = new OrderEntity({
            id: new Id("1"),
            client: new Client({
                id: new Id("1c"),
                name: "Client 1",
                email: "email@client.com",
                address: "address, 123"
            }),
            products: [
                new Product({
                    id: new Id("p1"),
                    name: "product 1",
                    description: "p1 desc",
                    salesPrice: 10
                }),
                new Product({
                    id: new Id("p2"),
                    name: "product 2",
                    description: "p2 desc",
                    salesPrice: 150
                })
            ],

            status: "approved",
        });

        const repository = new OrderRepository();
        await repository.addOrder(order);

        const result = await OrderModel.findOne(
            {where: {id: order.id.id}});
        expect(result.id).toEqual(order.id.id);
        expect(result.clientId).toEqual(order.client.id.id);
        expect(result.clientName).toEqual(order.client.name);
        expect(result.clientEmail).toEqual(order.client.email);
        expect(result.clientAddress).toEqual(order.client.address);
    })

})
