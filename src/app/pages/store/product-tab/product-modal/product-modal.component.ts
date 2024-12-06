import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { StoreService } from '../../../../services/store.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductData } from '../../../../models/product';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
  ],
})
export class ProductModalComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  storeService = inject(StoreService);

  productForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    category: new FormControl('', { validators: [Validators.required] }),
    price: new FormControl(0, { validators: [Validators.required] }),
    employee: new FormControl(''),
    description: new FormControl(''),
  });
  reviews: string[] = []
  editDisabled: boolean = false;

  async ngOnInit() {
    if (this.data.store_id && this.data.product_id != null) {
      this.editDisabled = true;

      const product = await this.storeService.getStoreProductById(
        this.data.store_id,
        this.data.product_id
      );

      this.productForm = new FormGroup({
        title: new FormControl(product.title, {
          validators: [Validators.required],
        }),
        category: new FormControl(product.category, {
          validators: [Validators.required],
        }),
        price: new FormControl(product.price, {
          validators: [Validators.required],
        }),
        employee: new FormControl(product.employee ? product.employee : ''),
        description: new FormControl(
          product.description ? product.description : ''
        ),
      });
      this.reviews = product.reviews ? product.reviews : []
    }
  }

  async onSubmit(event: any) {
    const res = await this.storeService.createStoreProduct(this.data.store_id, {
      id: this.data.product_id,
      data: {
        ...this.productForm.value,
        reviews: this.reviews
      } as ProductData,
    });

    this.dialogRef.close(res);
  }

  addReview(event: any) {
    event.stopPropagation();
    this.reviews.push('');
  }

  deleteReview(index: any, event: any) {
    event.stopPropagation();
    this.reviews.splice(index, 1);
  }
}
