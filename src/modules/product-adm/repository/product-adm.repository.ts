import Id from "../../@shared/domain/value-object/id.value-object";
import ProductAdm from "../domain/product-adm.entity";
import ProductAdmGateway from "../gateway/product-adm.gateway";
import {ProductAdmModel} from "./product-adm.model";

export default class ProductAdmRepository implements ProductAdmGateway {
    async add(product: ProductAdm): Promise<void> {
        await ProductAdmModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async find(id: string): Promise<ProductAdm> {
        const product = await ProductAdmModel.findOne({
            where: {id},
        });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        return new ProductAdm({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }
}
