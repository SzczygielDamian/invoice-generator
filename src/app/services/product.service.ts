import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  calculatedQuantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getProducts(): Product[] {
    this.setCalculatedQuantity();
    return this.products;
  }

 setCalculatedQuantity(): void {
  let totalProductsCount = 0;
   this.products.forEach((product: Product) => {
    totalProductsCount += product.count;
   })
  this.calculatedQuantity$.next(this.products.length * totalProductsCount);
  }
}
