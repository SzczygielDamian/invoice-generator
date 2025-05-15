import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to the list', () => {
    const product: Product = { name: 'Test Product', count: 2, price: 200 };
    service.addProduct(product);
    expect(service.getProducts().length).toBe(1);
    expect(service.getProducts()[0]).toEqual(product);
  });

  it('should calculate quantity correctly', () => {
    const product1: Product = { name: 'Product 1', count: 2, price: 200};
    const product2: Product = { name: 'Product 2', count: 3, price: 300};
    
    service.addProduct(product1);
    service.addProduct(product2);

    service.getProducts(); 

    const expectedQuantity = (2 + 3) * 2;
    expect(service.calculatedQuantity$.value).toBe(expectedQuantity);
  });
});
