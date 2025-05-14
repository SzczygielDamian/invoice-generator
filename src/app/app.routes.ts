import { Routes } from '@angular/router';
import { ProductsFormComponent } from './components/products-form/products-form.component';



export const routes: Routes = [
    { path: '', redirectTo: '/add-product', pathMatch: 'full' },
    { 
        path: 'add-product',
        component: ProductsFormComponent
    },
    { 
        path: 'product-list', 
        loadComponent: () => import('./components/product-list/product-list.component').then(c => c.ProductListComponent)
    }
];