import express, {Express} from "express";
import {Sequelize} from "sequelize-typescript";
import {productsRoute} from "./routes/products.route";
import {clientsRoute} from "./routes/clients.route";
import {checkoutRoute} from "./routes/checkout.route";
import {invoiceRoute} from "./routes/invoice.route";
import {ClientModel} from "../../modules/client-adm/repository/client.model";
import {InvoiceModel} from "../../modules/invoice/repository/invoice.model";
import {TransactionModel} from "../../modules/payment/repository/transaction.model";
import {ProductModel} from "../../modules/store-catalog/repository/product.model";
import {ProductAdmModel} from "../../modules/product-adm/repository/product-adm.model";
import {InvoiceItemsModel} from "../../modules/invoice/repository/invoice.items.model";
import {OrderModel} from "../../modules/checkout/repository/order.model";
import {OrderProductsModel} from "../../modules/checkout/repository/order.products.model";

export const app: Express = express()
app.use(express.json())
app.use("/products", productsRoute)
app.use("/clients", clientsRoute)
app.use("/checkout", checkoutRoute)
app.use(`/invoice`, invoiceRoute)

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });

    sequelize.addModels([
        ClientModel,
        InvoiceModel,
        TransactionModel,
        ProductModel,
        ProductAdmModel,
        InvoiceItemsModel,
        OrderModel,
        OrderProductsModel
    ]);
    // await sequelize.sync();
}

setupDb();
