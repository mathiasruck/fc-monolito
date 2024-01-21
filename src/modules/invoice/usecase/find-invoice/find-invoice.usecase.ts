import InvoiceGateway from "../../gateway/invoice.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.usecase.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const result = await this.invoiceRepository.find(input.id);
        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode,
            },
            items: result.items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                })
            ),
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            total: result.items.map(item => item.price)
                .reduce((sum, current) => sum + current),
        };
    }
}
