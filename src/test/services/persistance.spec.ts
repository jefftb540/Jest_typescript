import { Persistance } from '../../services/persistance';

describe('Percistance', () => {
  afterEach(() => jest.clearAllMocks());
  function createSut() {
    return new Persistance();
  }
  it('Should return undefined', () => {
    const sut = createSut();

    expect(sut.saveOrder()).toBeUndefined();
  });
  it('Should call console.log once', () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toBeCalledTimes(1);
  });

  it("Should call console.log with 'Pedido confirmado'", () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();

    expect(consoleSpy).toHaveBeenCalledWith('Pedido confirmado');
  });
});
