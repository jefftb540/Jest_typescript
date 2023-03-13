import { Discount } from '../../classes/discount';
import { CartItem } from '../../classes/interfaces/cart-item';

import { ShoppingCart } from '../../classes/shopping-cart';

function createSut() {
  const discountMock = createDiscountMock();

  return { sut: new ShoppingCart(discountMock), discountMock };
}

function createSutWithProducts() {
  const discountMock = createDiscountMock();
  const cartItemMock = createCartItem('produto 1', 200);
  const cartItemMock2 = createCartItem('produto 2', 200);

  const sut = new ShoppingCart(discountMock);
  sut.addItem(cartItemMock);
  sut.addItem(cartItemMock2);
  return { sut, discountMock };
}

function createDiscountMock() {
  class DiscountMock extends Discount {
    protected discount = 10;
  }
  return new DiscountMock();
}

function createCartItem(name: string, price: number) {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }
  return new CartItemMock(name, price);
}
describe('ShoppingCart', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should be empty when no product have benn added', () => {
    const { sut } = createSut();

    expect(sut.isEmpty()).toBe(true);
  });

  it('Should have two cart itens', () => {
    const { sut } = createSutWithProducts();

    expect(sut.itens.length).toBe(2);
  });

  it('Should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();

    expect(sut.total()).toBe(400);
    expect(sut.totalWithDiscount()).toBe(360);
  });

  it('Should add products and clear cart', () => {
    const { sut } = createSutWithProducts();

    expect(sut.itens.length).toBe(2);
    sut.clear();
    expect(sut.itens.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('Should remove itens', () => {
    const { sut } = createSutWithProducts();

    sut.removeItem(1);
    expect(sut.itens.length).toBe(1);
    sut.removeItem(0);
    expect(sut.itens.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('Should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();
    expect(discountMockSpy).toBeCalledTimes(1);
  });

  it('Should call discount.calculate with totalPrice when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
