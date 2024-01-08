import ValueObject from "./value-object.interface";
import Id from "./id.value-object";

export default class InvoiceItem implements ValueObject{
    private _id?: string = ""
    private _name: string = ""
    private _price: number = 0


    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
    }


    get id(): string{
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required")
        }

        if (this._name.length === 0) {
            throw new Error("Name is required")
        }

        if (this._price === 0|| this._price == null) {
            throw new Error("Price is required")
        }
    }
}
