import { CartItem } from '../../classes/interfaces/cart-item';
import { Customer } from '../../classes/interfaces/customer-protocol';
import { MessagingProtocol } from '../../classes/interfaces/messaging-protocol';
import { PersistanceProtocol } from '../../classes/interfaces/persistance-protocol';
import { ShoppingCartProtocol } from '../../classes/interfaces/shopping-cart-protocol';
import { Order } from '../../classes/order';

class ShoppingCartMock implements ShoppingCartProtocol {
  addItem(item: CartItem): void {
    //
  }

  removeItem(index: number): void {
    //
  }

  get itens(): Readonly<CartItem[]> {
    return [];
  }

  total(): number {
    return 0;
  }

  totalWithDiscount(): number {
    return 0;
  }

  isEmpty(): boolean {
    return false;
  }

  clear(): void {
    //
  }
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void {
    //
  }
}

class PersistanceMock implements PersistanceProtocol {
  saveOrder(): void {
    //
  }
}

class CustomerMock implements Customer {
  getName(): string {
    return '';
  }
  getIdentificationNumber(): string {
    return '';
  }
}

function createSut() {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistanceMock = new PersistanceMock();
  const customerMock = new CustomerMock();

  const sut = new Order(shoppingCartMock, messagingMock, persistanceMock, customerMock);

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistanceMock,
  };
}
describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValue(true);

    sut.checkout();
    expect(shoppingCartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should  checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValue(false);

    sut.checkout();
    expect(shoppingCartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should  clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');

    sut.checkout();
    expect(shoppingCartMockSpy).toBeCalledTimes(1);
  });

  it('should send message', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');

    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistanceMock } = createSut();
    const persistanceMockSpy = jest.spyOn(persistanceMock, 'saveOrder');

    sut.checkout();
    expect(persistanceMockSpy).toHaveBeenCalledTimes(1);
  });
});
