import { Messaging } from './dip/services/messaging';
import { Order } from './dip/classes/order';
import { Persistance } from './dip/services/persistance';
import { Product } from './dip/classes/Product';
import { ShoppingCart } from './dip/classes/shopping-cart';
import { FiftyPercenteDiscount } from './dip/classes/discount';
import { IndividualCustomer } from './dip/classes/customer';

const fiftyPercenteDiscount = new FiftyPercenteDiscount();
const customer = new IndividualCustomer('Jefferson', 'Lima', '123.456.789-00');
const shoppingCart = new ShoppingCart(fiftyPercenteDiscount, customer);
const messaging = new Messaging();
const persistance = new Persistance();
const order = new Order(shoppingCart, messaging, persistance);

shoppingCart.addItem(new Product('Camisa do vasco I Branca', 100.0));
shoppingCart.addItem(new Product('Camisa do vasco II Preta', 100.0));
shoppingCart.addItem(new Product('Camisa do vasco III', 100.0));

console.log(shoppingCart.itens);
console.log(order.orderStatus);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(shoppingCart.customer.getName());
order.checkout();
