import ProductAdm from "../domain/product-adm.entity";

export default interface ProductAdmGateway {
    add(product: ProductAdm): Promise<void>;

    find(id: string): Promise<ProductAdm>;
}
