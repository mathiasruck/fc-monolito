import InvoiceGateway from "../../gateway/invoice.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.usecase.dto";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../../@shared/domain/value-object/invoice-item.value-object";

export default class FindInvoiceUsecase implements UseCaseInterface {
    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const result = await this.invoiceRepository.find(input.id);
        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: new Address(
                result.address.street,
                result.address.number,
                result.address.complement,
                result.address.city,
                result.address.state,
                result.address.zipCode,
            ),
            items: result.items.map(item =>
                new InvoiceItem(
                    item.id.id,
                    item.name,
                    item.price
                )
            ),
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            total: result.items.map(item => item.price)
                .reduce((sum, current) => sum + current),
        }

    }


}
