import { Product } from '../../classes/Product';

function createSut(name: string, price: number) {
  return new Product(name, price);
}

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have properties name and price', () => {
    const sut = createSut('Teste', 100);

    expect(sut).toHaveProperty('name', 'Teste');
    expect(sut).toHaveProperty('price', 100);
  });
});
