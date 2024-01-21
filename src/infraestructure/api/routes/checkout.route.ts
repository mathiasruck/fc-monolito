import express, {Request, Response} from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post('/', async (req: Request, res: Response) => {
    const useCase = CheckoutFacadeFactory.create();
    try {
        const placeOrderOutputDto = await useCase.execute({
            clientId: req.body.id,
            products: req.body.products.map((p: { id: string; }) => {
                return {productId: p.id};
            })
        });
        res.send(placeOrderOutputDto);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);

    }

})
