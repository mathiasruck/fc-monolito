import Id from "../../@shared/domain/value-object/id.value-object";
import CheckoutGateway from "../gateway/checkout.gateway";
import {OrderModel} from "./order.model";
import OrderEntity from "../domain/order.entity";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

export default class OrderRepository implements CheckoutGateway {
    async findOrder(id: string): Promise<OrderEntity> {
        const order = await OrderModel.findOne({
            where: {id},
            include: ["orderProducts"]
        })

        if (!order) {
            throw new Error("Order not found")
        }

        return new OrderEntity({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.clientId),
                name: order.clientName,
                email: order.clientEmail,
                address: order.clientAddress
            }),
            products: order.orderProducts.map((orderProd) =>
                new Product({
                    id: new Id(orderProd.id),
                    name: orderProd.name,
                    description: orderProd.description,
                    salesPrice: orderProd.salesPrice
                })
            ),
            status: order.status,
        });
    }

    async addOrder(order: OrderEntity): Promise<void> {
        await OrderModel.create({
            id: order.id.id,
            status: order.status,
            clientId: order.client.id.id,
            clientName: order.client.name,
            clientEmail: order.client.email,
            clientAddress: order.client.address,
            orderProducts: order.products,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        });
    }

}
