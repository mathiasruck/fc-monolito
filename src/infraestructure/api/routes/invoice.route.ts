import express, {Request, Response} from "express";
import FindInvoiceUsecase from "../../../modules/invoice/usecase/find-invoice/find-invoice.usecase";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";

export const invoiceRoute = express.Router();

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
    const useCase = new FindInvoiceUsecase(new InvoiceRepository());
    try {
        const invoice = await useCase.execute({
            id: req.params.id
        });
        res.json(invoice);
    } catch (err) {
        res.status(500).send(err);
    }
})
