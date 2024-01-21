import {Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {OrderProductsModel} from "./order.products.model";

@Table({
    tableName: 'Order',
    timestamps: false
})
export class OrderModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    status: string

    @Column({allowNull: false})
    clientId: string;

    @Column({allowNull: false})
    clientName: string;

    @Column({allowNull: false})
    clientEmail: string;

    @Column({allowNull: false})
    clientAddress: string;

    @Column({allowNull: false})
    createdAt: Date

    @Column({allowNull: false})
    updatedAt: Date

    @HasMany(() => OrderProductsModel, {foreignKey: 'orderId'})
    orderProducts: OrderProductsModel[];

}
