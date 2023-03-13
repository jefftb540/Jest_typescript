import { Messaging } from '../../services/messaging';

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks());
  function createSut() {
    return new Messaging();
  }
  const messageMock = 'teste';
  it('Should return undefined', () => {
    const sut = createSut();

    expect(sut.sendMessage(messageMock)).toBeUndefined();
  });
  it('Should call console.log once', () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage(messageMock);
    expect(consoleSpy).toBeCalledTimes(1);
  });

  it(`Should call console.log with mensagem enviada ${messageMock}`, () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage(messageMock);

    expect(consoleSpy).toHaveBeenCalledWith('mensagem enviada', messageMock);
  });
});
