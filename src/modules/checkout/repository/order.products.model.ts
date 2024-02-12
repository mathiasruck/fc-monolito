import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {OrderModel} from "./order.model";

@Table({
    tableName: 'OrderProducts',
    timestamps: false
})
export class OrderProductsModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    description: string;

    @Column({allowNull: false})
    salesPrice: number;

    @Column({allowNull: false})
    createdAt: Date

    @Column({allowNull: false})
    updatedAt: Date

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    orderId: string;

    @BelongsTo(() => OrderModel, {foreignKey: 'orderId'})
    orderModel: OrderModel;
}

