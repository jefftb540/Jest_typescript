export abstract class Discount {
  protected discount = 0;
  calculate(price: number): number {
    return price - (price * this.discount) / 100;
  }
}

export class FiftyPercenteDiscount extends Discount {
  protected discount = 50;
}

export class NoDiscount extends Discount {
  calculate(price: number): number {
    return price;
  }
}
