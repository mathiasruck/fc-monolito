import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/product-adm.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";

const mockCheckoutRepository = {
    addOrder: jest.fn(),
    findOrder: jest.fn(),
};
export default class CheckoutFacadeFactory {
    static create() {
        return new PlaceOrderUsecase(
            ClientAdmFacadeFactory.create(),
            ProductAdmFacadeFactory.create(),
            StoreCatalogFacadeFactory.create(),
            mockCheckoutRepository,
            InvoiceFacadeFactory.create(),
            PaymentFacadeFactory.create()
        )
    }
}