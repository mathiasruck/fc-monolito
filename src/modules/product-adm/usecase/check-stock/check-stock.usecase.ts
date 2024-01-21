import ProductAdmGateway from "../../gateway/product-adm.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
  private _productRepository: ProductAdmGateway;

  constructor(productRepository: ProductAdmGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}
