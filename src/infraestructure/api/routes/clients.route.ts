import express, {Request, Response} from "express";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import Address from "../../../modules/@shared/domain/value-object/address";

export const clientsRoute = express.Router();

clientsRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new AddClientUseCase(new ClientRepository());
    try {
        const client = await useCase.execute({
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(
                req.body.address.street,
                req.body.address.number,
                req.body.address.complement,
                req.body.address.city,
                req.body.address.state,
                req.body.address.zipCode,
            )
        });
        res.send(client);
    } catch (err) {
        res.status(500).send(err);
    }
})
