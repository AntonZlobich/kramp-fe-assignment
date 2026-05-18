const productsData = require('./data/products.json');

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
}

export class User {
  public firstName: string;
  public lastName: string;
  public id: string;

  constructor(id: string) {
    this.id = id;
    this.firstName = 'John';
    this.lastName = 'Doe';
  }
}

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductById(id: string): Product | undefined {
  const all = getAllProducts();
  return all.find(p => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const all = getAllProducts();
  return all.filter(p => p.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
}
