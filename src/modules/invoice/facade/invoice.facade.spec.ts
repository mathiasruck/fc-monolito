import {Sequelize} from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import {InvoiceModel} from "../repository/invoice.model";
import {InvoiceItemsModel} from "../repository/invoice.items.model";


describe("Invoice facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should generate an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();
        const input = {
            id: "1",
            name: "Mathias",
            document: "99-888",
            street: "Rua A",
            number: "88",
            complement: "Casa Azul",
            city: "Tallinn",
            state: "Harjumaa",
            zipCode: "987556",
            items: [
                {
                    id: "2",
                    name: "Phone",
                    price: 500
                },
                {
                    id: "3",
                    name: "Phone Cover",
                    price: 5
                }],
        }

        await facade.generate(input);

        const result = await InvoiceModel.findOne({where: {id: input.id}});
        expect(result.id).toEqual(input.id);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
    });

    it("should find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();
        const input = await InvoiceModel.create({
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
                total: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {include: [InvoiceItemsModel]}
        )

        const result = await facade.find({id: "1"});

        expect(result.id).toEqual(input.id);
        expect(result.document).toEqual(input.document);
        expect(result.address.street).toEqual(input.street);
        expect(result.address.number).toEqual(input.number);
        expect(result.address.complement).toEqual(input.complement);
        expect(result.address.city).toEqual(input.city);
        expect(result.address.state).toEqual(input.state);
        expect(result.address.zipCode).toEqual(input.zipCode);
    })


})
