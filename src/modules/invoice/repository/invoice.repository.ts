import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceEntity from "../domain/invoice.entity";
import {InvoiceModel} from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItemsEntity from "../domain/InvoiceItems.entity";

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<InvoiceEntity> {
        const invoice = await InvoiceModel.findOne({
            where: {id},
            include: ["items"]
        })

        if (!invoice) {
            throw new Error("Invoice not found")
        }

        return new InvoiceEntity({
            id: new Id(invoice.id),
            name: invoice.name,
            address: new Address(
                invoice.street,
                invoice.number,
                invoice.complement,
                invoice.city,
                invoice.state,
                invoice.zipCode,
            ),
            document: invoice.document,
            items: invoice.items.map(item => new InvoiceItemsEntity({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                })
            ),

        })
    }

    async generate(invoice: InvoiceEntity): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            total: invoice.items.map(item => item.price)
                .reduce((previousValue, currentValue) => previousValue + currentValue),
            items: invoice.items,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        });
    }

}
