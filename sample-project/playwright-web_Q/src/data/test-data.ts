export const Users = {
  standard: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  locked: {
    username: process.env.LOCKED_USER || 'locked_out_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;

export const Products = {
  backpack: { name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { name: 'Sauce Labs Bike Light', price: 9.99 },
  boltTShirt: { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  fleeceJacket: { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  onesie: { name: 'Sauce Labs Onesie', price: 7.99 },
  redTShirt: { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
} as const;

export const SortOrder = {
  nameAZ: ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)'],
  nameZA: ['Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Onesie', 'Sauce Labs Fleece Jacket', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light', 'Sauce Labs Backpack'],
  priceLowHigh: ['Sauce Labs Onesie', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'],
  priceHighLow: ['Sauce Labs Fleece Jacket', 'Sauce Labs Backpack', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light', 'Sauce Labs Onesie'],
} as const;
