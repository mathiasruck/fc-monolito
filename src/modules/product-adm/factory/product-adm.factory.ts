import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmRepository from "../repository/product-adm.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductAdmRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    return new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    });
  }
}
