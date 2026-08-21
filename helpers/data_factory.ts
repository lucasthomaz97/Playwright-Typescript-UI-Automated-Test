const { faker } = require('@faker-js/faker');

export const CREDENTIALS = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
    invalidUsername: { username: 'invalid_user', password: 'secret_sauce' },
    invalidPassword: { username: 'standard_user', password: 'invalid_password' },
    invalidBoth: { username: 'invalid_user', password: 'invalid_password' },
};

export const LOGIN_ERROR_MESSAGES = {
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
};

export const CHECKOUT_ERROR_MESSAGES = {
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
};

export interface Product {
    name: string;
    description: string;
    price: number;
}

/**
 * Full SauceDemo catalog in default display order (Name A to Z).
 * Index matches product row position on the Products page.
 */
export const PRODUCTS: Product[] = [
    {
        name: 'Sauce Labs Backpack',
        price: 29.99,
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    },
    {
        name: 'Sauce Labs Bike Light',
        price: 9.99,
        description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    },
    {
        name: 'Sauce Labs Bolt T-Shirt',
        price: 15.99,
        description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    },
    {
        name: 'Sauce Labs Fleece Jacket',
        price: 49.99,
        description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    },
    {
        name: 'Sauce Labs Onesie',
        price: 7.99,
        description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    },
    {
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: 15.99,
        description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    },
];

export const PRODUCT_NAMES = PRODUCTS.map(p => p.name);

export const PRODUCT_PRICES = PRODUCTS.map(p => p.price);

export function formatPrice(priceInCents: number): string {
    return `$${(priceInCents / 100).toFixed(2)}`;
}

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