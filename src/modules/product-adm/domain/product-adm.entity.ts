import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class ProductAdm extends BaseEntity implements AggregateRoot {
    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._purchasePrice = props.purchasePrice;
        this._stock = props.stock;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    private _description: string;

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    private _purchasePrice: number;

    get purchasePrice(): number {
        return this._purchasePrice;
    }

    set purchasePrice(purchasePrice: number) {
        this._purchasePrice = purchasePrice;
    }

    private _stock: number;

    get stock(): number {
        return this._stock;
    }

    set stock(stock: number) {
        this._stock = stock;
    }
}
