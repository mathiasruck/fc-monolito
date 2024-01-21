import OrderEntity from "../domain/order.entity";

export default interface CheckoutGateway {

    addOrder(order: OrderEntity): Promise<void>;

    findOrder(id: string): Promise<OrderEntity | null>;
}
