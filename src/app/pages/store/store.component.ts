import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Store, StoreData } from '../../models/store';
import { StoreService } from '../../services/store.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTabComponent } from './product-tab/product-tab.component';
import { EmployeesTabComponent } from './employees-tab/employees-tab.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  imports: [MatTabsModule, ProductTabComponent, EmployeesTabComponent],
})
export class StoreComponent implements OnInit {
  private storeService = inject(StoreService);

  store_id = input.required<string>();
  store = signal<StoreData | null>(null);

  employees = computed((): string[] => {
    return this.store() ? this.store()?.employees! : []
  })

  async ngOnInit() {
    this.store.set(await this.storeService.getStoreById(this.store_id()));
  }
}
