import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
    id?: Id;
    client: Client
    products: Product[];
    status?: string
};

export default class OrderEntity extends BaseEntity {
    constructor(props: OrderProps) {
        super(props.id);
        this._client = props.client;
        this._products = props.products;
        this._status = props.status || "pending";
    }

    private _client: Client

    get client(): Client {
        return this._client;
    }

    private _products: Product[];

    get products(): Product[] {
        return this._products;
    }

    private _status?: string

    get status(): string {
        return this._status;
    }

    get total(): number {
        return this.products.reduce((total, product) => {
            return total + product.salesPrice;
        }, 0);
    }

    approved(): void {
        this._status = "approved";
    }
}
