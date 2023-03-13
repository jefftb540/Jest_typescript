import { OrderStatus } from './interfaces/order-status';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistanceProtocol } from './interfaces/persistance-protocol';
import { OrderProtocol } from './interfaces/order-protocol';
import { Customer } from './interfaces/customer-protocol';

export class Order implements OrderProtocol {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly _cart: ShoppingCartProtocol,
    private readonly _messaging: MessagingProtocol,
    private readonly persistance: PersistanceProtocol,
    private readonly _customer: Customer
  ) {}

  get customer(): Customer {
    return this._customer;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this._cart.isEmpty()) {
      this._messaging.sendMessage('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.persistance.saveOrder();
    this._messaging.sendMessage('Pedido recebido');
    this._cart.clear();
  }
}
