import { Component, inject, input, OnInit, signal } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Product } from '../../../models/product';
import { firstValueFrom, map, pipe } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ConfirmDialogComponent } from '../../../core/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrl: './product-tab.component.scss',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule],
})
export class ProductTabComponent implements OnInit {
  store_id = input.required<string>();

  storeService = inject(StoreService);
  dialog = inject(MatDialog);

  products: Product[] = [];
  productsPaginated = signal<Product[]>([]);
  cols = ['title', 'category', 'employee', 'price', 'actions'];
  pageSizeOptions = [5, 10, 15];
  pageSize = this.pageSizeOptions[0];

  async ngOnInit() {
    await this.initProducts();
  }

  async initProducts() {
    this.products = await this.storeService.getStoreProducts(this.store_id());
    this.productsPaginated.set(this.products.slice(0, this.pageSizeOptions[1]));
    this.pageSize = this.pageSizeOptions[1];
  }

  handlePageEvent(event: any) {
    const start = event.pageIndex * event.pageSize;
    const end = (event.pageIndex + 1) * event.pageSize;
    this.pageSize = event.pageSize;
    this.productsPaginated.set(this.products.slice(start, end));
  }

  openDialog(product_id?: string) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      autoFocus: false,
      data: {
        store_id: this.store_id(),
        product_id: product_id ? product_id : null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.initProducts();
      }
    });
  }

  deleteProduct(product_id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(async (confirm) => {
      if (confirm) {
        const res = await this.storeService.deleteStoreProduct(this.store_id(), product_id)
        this.initProducts();
      }
    });
  }
}
