export type ProductData = Readonly<{
  name: string;
  descriptionSnippet: string;
  price: string;
}>;

export type TestData = Readonly<{
  users: Readonly<{
    standardUser: string;
    lockedUser: string;
    problemUser: string;
    performanceGlitchUser: string;
    errorUser: string;
    visualUser: string;
    password: string;
    invalidPassword: string;
    invalidUsername: string;
  }>;
  products: Readonly<{
    backpack: ProductData;
    bikeLight: ProductData;
    boltTShirt: ProductData;
    fleeceJacket: ProductData;
    onesie: ProductData;
    redTShirt: ProductData;
  }>;
  sortOrders: Readonly<{
    nameAz: readonly string[];
    nameZa: readonly string[];
    priceLowHigh: readonly string[];
    priceHighLow: readonly string[];
  }>;
  checkout: Readonly<{
    firstName: string;
    lastName: string;
    postalCode: string;
    longFirstName: string;
    longLastName: string;
    longPostalCode: string;
  }>;
}>;

const longText = 'A'.repeat(255);
const overLengthText = 'A'.repeat(256);

export const testData = {
  users: {
    standardUser: process.env.STANDARD_USER ?? 'standard_user',
    lockedUser: process.env.LOCKED_USER ?? 'locked_out_user',
    problemUser: 'problem_user',
    performanceGlitchUser: 'performance_glitch_user',
    errorUser: 'error_user',
    visualUser: 'visual_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
    invalidPassword: 'wrongpassword',
    invalidUsername: 'unknown_user',
  },
  products: {
    backpack: {
      name: 'Sauce Labs Backpack',
      descriptionSnippet: 'carry.allTheThings() with the sleek...',
      price: '$29.99',
    },
    bikeLight: {
      name: 'Sauce Labs Bike Light',
      descriptionSnippet: 'A red light isn\'t the desired state...',
      price: '$9.99',
    },
    boltTShirt: {
      name: 'Sauce Labs Bolt T-Shirt',
      descriptionSnippet: 'Get your testing superhero on...',
      price: '$15.99',
    },
    fleeceJacket: {
      name: 'Sauce Labs Fleece Jacket',
      descriptionSnippet: 'It\'s not every day that you come...',
      price: '$49.99',
    },
    onesie: {
      name: 'Sauce Labs Onesie',
      descriptionSnippet: 'Rib snap infant onesie...',
      price: '$7.99',
    },
    redTShirt: {
      name: 'Test.allTheThings() T-Shirt (Red)',
      descriptionSnippet: 'This classic Sauce Labs t-shirt...',
      price: '$15.99',
    },
  },
  sortOrders: {
    nameAz: [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ],
    nameZa: [
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ],
    priceLowHigh: [
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ],
    priceHighLow: [
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie',
    ],
  },
  checkout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    longFirstName: longText,
    longLastName: longText,
    longPostalCode: overLengthText,
  },
} satisfies TestData;
