import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
  addItem(item: CartItem): void;

  removeItem(index: number): void;

  get itens(): Readonly<CartItem[]>;

  total(): number;

  totalWithDiscount(): number;

  isEmpty(): boolean;

  clear(): void;
}
