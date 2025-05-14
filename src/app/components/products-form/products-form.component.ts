import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ErrorMessageComponent } from "../../shared/error-message-forms/error-message.component";
import { BlockInvalidKeysDirective } from '../../directives/blockInvalidKeys.directive';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-products-form',
  imports: [
    BlockInvalidKeysDirective, 
    CommonModule, 
    ErrorMessageComponent, 
    MatButtonModule,
    MatIconModule, 
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFormComponent {
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  submitted = false;

  productForm: FormGroup = this.formBuilder.group({
    products: this.formBuilder.array([this.createProduct()])  
  });

  createProduct(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      count: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]],
    })
  }

  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.createProduct());
  }

  deleteProduct(productIndex: number): void {
    this.products.removeAt(productIndex);
  }

  onSubmit(): void { 
    this.submitted = true;
    
    if (this.productForm.valid) {
      const productsData = this.productForm.get('products')?.value;
      productsData.forEach((product: Product) => {
        this.productService.addProduct(product);
      });
      
      this.router.navigateByUrl('/product-list');
    }
  }
}
