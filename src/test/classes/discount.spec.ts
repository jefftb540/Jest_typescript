import { Discount, FiftyPercenteDiscount, NoDiscount } from '../../classes/discount';

function createSut(className: new () => Discount): Discount {
  return new className();
}
const price = 100;
describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have no discount', () => {
    const sut = createSut(NoDiscount);

    expect(sut.calculate(price)).toBe(price);
  });

  it('Should apply fifty percente discount', () => {
    const sut = createSut(FiftyPercenteDiscount);

    expect(sut.calculate(price)).toBe(price * 0.5);
  });
});
