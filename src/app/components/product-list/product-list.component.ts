import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MatTableModule } from '@angular/material/table';
import { MessageComponent } from '../../shared/message/message.component';


@Component({
  selector: 'app-product-list',
  imports: [MatTableModule, MessageComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'count', 'price'];

    private productService = inject(ProductService);
  
    calculatedQuantity: number = 0;
    productList: Product[] = [];

    ngOnInit(): void {
      this.productList = this.productService.getProducts();
      this.productService.calculatedQuantity$.subscribe(calculatedQuantity => this.calculatedQuantity = calculatedQuantity);
    }
}
