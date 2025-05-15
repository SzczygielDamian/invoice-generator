import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormComponent } from './products-form.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['addProduct']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        ProductsFormComponent,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productForm correctly', () => {
    expect(component.productForm.controls['products']).toBeDefined();
    expect(component.products.length).toBe(1); 
  });

  it('should add a new product to the form', () => {
    component.addProduct();
    expect(component.products.length).toBe(2);
  });

  it('should remove a product from the form', () => {
    component.addProduct();
    component.deleteProduct(0);
    expect(component.products.length).toBe(1);
  });

  it('should submit form and call productService.addProduct()', () => {
    component.productForm.setValue({
      products: [{ name: 'Test Product', count: 2, price: 100 }]
    });

    component.onSubmit();
    expect(productServiceMock.addProduct).toHaveBeenCalledWith({ name: 'Test Product', count: 2, price: 100 });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/product-list');
  });

  it('should not submit form if invalid', () => {
    component.productForm.setValue({
      products: [{ name: '', count: -1, price: 0 }] 
    });

    component.onSubmit();
    expect(productServiceMock.addProduct).not.toHaveBeenCalled();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });
});
