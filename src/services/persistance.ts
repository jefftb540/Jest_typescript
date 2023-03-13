import { PersistanceProtocol } from '../classes/interfaces/persistance-protocol';

export class Persistance implements PersistanceProtocol {
  saveOrder(): void {
    console.log('Pedido confirmado');
  }
}
