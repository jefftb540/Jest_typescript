export interface Customer {
  getName(): string;
  getIdentificationNumber(): string;
}

export interface IndividualCustomerProtocol extends Customer {
  firstName: string;
  lastName: string;
  cpf: string;
}
export interface EnterpriseCustomerProtocol extends Customer {
  name: string;
  cnpj: string;
}
