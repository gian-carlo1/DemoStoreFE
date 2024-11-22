import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Store, StoreData } from '../models/store';
import { Product, ProductData } from '../models/product';
import { Stat } from '../models/stat';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  http = inject(HttpClient);

  BASE_URL = 'https://us-central1-test-b7665.cloudfunctions.net/api/stores';

  getStores(): Promise<Store[]> {
		const url = `${this.BASE_URL}`
		return firstValueFrom(this.http.get<Store[]>(url))
	}

  getStoreById(storeId: string): Promise<StoreData> {
		const url = `${this.BASE_URL}/${storeId}`
		return firstValueFrom(this.http.delete<StoreData>(url))
	}

  getStoreProducts(storeId: string): Promise<Product[]> {
		const url = `${this.BASE_URL}/${storeId}/products`
		return firstValueFrom(this.http.get<Product[]>(url))
	}

  getStoreProductById(storeId: string, productId: string): Promise<ProductData> {
		const url = `${this.BASE_URL}/${storeId}/products/${productId}`
		return firstValueFrom(this.http.get<ProductData>(url))
	}

  createStoreProduct(storeId: string, product: Product) {
		const url = `${this.BASE_URL}/${storeId}/products`
		const body = {product}

		return firstValueFrom(this.http.post(url, body))
	}

  deleteStoreProduct(storeId: string, productId: string) {
		const url = `${this.BASE_URL}/${storeId}/products/${productId}`
		return firstValueFrom(this.http.delete(url))
	}

  getCategoriesStats(storeId: string): Promise<Stat> {
		const url = `${this.BASE_URL}/${storeId}/stats/categories`
		return firstValueFrom(this.http.get<Stat>(url))
	}
}
