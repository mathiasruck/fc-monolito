import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "../usecase/find-invoice/find-invoice.usecase.dto";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";

export interface UseCaseProps {
    findInvoiceUseCase: FindInvoiceUsecase;
    generateInvoiceUseCase: GenerateInvoiceUsecase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findInvoiceUseCase: UseCaseInterface;
    private _generateInvoiceUseCase: UseCaseInterface;


    constructor(useCaseProps: UseCaseProps) {
        this._findInvoiceUseCase = useCaseProps.findInvoiceUseCase;
        this._generateInvoiceUseCase = useCaseProps.generateInvoiceUseCase;
    }

    find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        return this._findInvoiceUseCase.execute(input);
    }

    generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        return this._generateInvoiceUseCase.execute(input);
    }

}
