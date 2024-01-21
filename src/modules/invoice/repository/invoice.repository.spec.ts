import {Sequelize} from "sequelize-typescript";
import {InvoiceModel} from "./invoice.model";
import {InvoiceItemsModel} from "./invoice.items.model";
import InvoiceRepository from "./invoice.repository";
import InvoiceEntity from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemsEntity from "../domain/InvoiceItems.entity";
import Address from "../../@shared/domain/value-object/address";

describe("Invoice repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    });

    it("Should find an invoice", async () => {

        const invoice = await InvoiceModel.create({
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

        const repository = new InvoiceRepository();
        const result = await repository.find(invoice.id);

        expect(result.id.id).toEqual(invoice.id);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.street);
        expect(result.address.number).toEqual(invoice.number);
        expect(result.address.complement).toEqual(invoice.complement);
        expect(result.address.city).toEqual(invoice.city);
        expect(result.address.state).toEqual(invoice.state);
        expect(result.address.zipCode).toEqual(invoice.zipCode);

    });

    it("Should generate an invoice", async () => {
        const invoice = new InvoiceEntity({
                id: new Id("1"),
                name: "Invoice 1",
                document: "doc 1",
                address: new Address(
                    "Rua da Praia",
                    "2034",
                    "Melhor AP",
                    "Florianopolis",
                    "SC",
                    "88888-123",
                ),
                items: [new InvoiceItemsEntity({
                    id: new Id("item1"),
                    name: "item 1",
                    price: 1,
                })],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        )

        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const result = await InvoiceModel.findOne({where: {id: invoice.id.id}});
        expect(result.id).toEqual(invoice.id.id);
        expect(result.document).toEqual(invoice.document);
        expect(result.street).toEqual(invoice.address.street);
        expect(result.number).toEqual(invoice.address.number);
        expect(result.complement).toEqual(invoice.address.complement);
        expect(result.city).toEqual(invoice.address.city);
        expect(result.state).toEqual(invoice.address.state);
        expect(result.zipCode).toEqual(invoice.address.zipCode);
    })

})
