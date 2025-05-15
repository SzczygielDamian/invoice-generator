import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { MatTableModule } from '@angular/material/table';
import { MessageComponent } from '../../shared/message/message.component';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock: Partial<ProductService>;
  
  beforeEach(async () => {
    productServiceMock = {
      calculatedQuantity$: new BehaviorSubject<number>(0),
      getProducts: jasmine.createSpy('getProducts').and.returnValue([
        { id: 1, name: 'Product 1', count: 2, price: 200 },
        { id: 2, name: 'Product 2', count: 3, price: 300 }
      ])
    };

  await TestBed.configureTestingModule({
  imports: [ProductListComponent, MatTableModule, MessageComponent],
  providers: [{ provide: ProductService, useValue: productServiceMock }]
  }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productList from ProductService', () => {
    expect(component.productList.length).toBe(2);
    expect(component.productList[0].name).toBe('Product 1');
  });

  it('should subscribe to calculatedQuantity$', () => {
    productServiceMock.calculatedQuantity$!.next(10);
    fixture.detectChanges();
    expect(component.calculatedQuantity).toBe(10);
  });
});
