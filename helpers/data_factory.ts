const { faker } = require('@faker-js/faker');

export const CREDENTIALS = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
    invalidUsername: { username: 'invalid_user', password: 'secret_sauce' },
    invalidPassword: { username: 'standard_user', password: 'invalid_password' },
    invalidBoth: { username: 'invalid_user', password: 'invalid_password' },
};

export class DataFactory {
  constructor() {
    faker.seed(123);
  }

  createFirstName(): string {
    return faker.person.firstName();
  }

  createLastName(): string {
    return faker.person.lastName();
  }

  createPostalCode(): string {
    return faker.location.zipCode('#####-###');
  }
}