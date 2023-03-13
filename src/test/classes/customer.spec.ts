import { IndividualCustomer, EnterpriseCustomer } from '../../classes/customer';

function createIndividualCustomer(firstName: string, lastName: string, cpf: string) {
  return new IndividualCustomer(firstName, lastName, cpf);
}

function createEnterpriseCustomer(name: string, cnpj: string) {
  return new EnterpriseCustomer(name, cnpj);
}
const firstName = 'João';
const lastName = 'Carlos';
const cpf = '123.456.789.-00';
describe('Individual Customer', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should get full name', () => {
    const sut = createIndividualCustomer(firstName, lastName, cpf);

    expect(sut.getName()).toBe(`${firstName} ${lastName}`);
  });

  it('Should get cpf', () => {
    const sut = createIndividualCustomer(firstName, lastName, cpf);

    expect(sut.getIdentificationNumber()).toBe(cpf);
  });

  it('Should have firstname, lastname and cpf', () => {
    const sut = createIndividualCustomer(firstName, lastName, cpf);

    expect(sut).toHaveProperty('firstName', firstName);
    expect(sut).toHaveProperty('lastName', lastName);
    expect(sut).toHaveProperty('cpf', cpf);
  });
});

const name = 'Empresa teste';
const cnpj = '32.348.166/0001-90';
describe('Enterprise Customer', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should get name', () => {
    const sut = createEnterpriseCustomer(name, cnpj);

    expect(sut.getName()).toBe(name);
  });

  it('Should get cnpj', () => {
    const sut = createEnterpriseCustomer(name, cnpj);

    expect(sut.getIdentificationNumber()).toBe(cnpj);
  });

  it('Should have firstname, lastname and cpf', () => {
    const sut = createEnterpriseCustomer(name, cnpj);

    expect(sut).toHaveProperty('name', name);
    expect(sut).toHaveProperty('cnpj', cnpj);
  });
});
