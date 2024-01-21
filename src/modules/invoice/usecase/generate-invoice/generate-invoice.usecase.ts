import InvoiceRepository from "../../repository/invoice.repository";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.usecase.dto";
import Invoice from "../../domain/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/InvoiceItems.entity";
import InvoiceItem from "../../../@shared/domain/value-object/invoice-item.value-object";
import Address from "../../../@shared/domain/value-object/address";


export default class GenerateInvoiceUsecase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceRepository) {
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            ),
            items: input.items.map(item =>
                new InvoiceItems({
                        id: new Id(item.id) || new Id(),
                        name: item.name,
                        price: item.price
                    }
                )
            ),
        };
        const invoice = new Invoice(props);
        await this.invoiceRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            city: invoice.address.city,
            complement: invoice.address.complement,
            number: invoice.address.number,
            state: invoice.address.state,
            street: invoice.address.street,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item =>
                new InvoiceItem(
                    item.id.id,
                    item.name,
                    item.price
                )
            ),
            total: invoice.items.map(item => item.price)
                .reduce((sum, current) => sum + current),

        }
    }


}
