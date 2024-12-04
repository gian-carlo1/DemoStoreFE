import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '../../models/store';
import { StoreService } from '../../services/store.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatPaginator,
    MatButtonToggleModule,
    MatIconModule,
    MatExpansionModule,
    StoreComponent
  ],
})
export class DashboardComponent implements OnInit {
  private storeService = inject(StoreService);

  stores: Store[] = [];
  storesPaginated: Store[] = [];
  
  length = 0;
  pageSizeOptions = [5, 10, 15];

  viewGrid = false;

  async ngOnInit() {
    this.stores = await this.storeService.getStores();

    /* TEST VALUES */
    for (let index = 0; index < 20; index++) {
      const testValue: Store = {
        id: `testValue${index}`,
        data: {
          ...this.stores[0].data,
          name: `testValue${index}`,
        },
      };
      this.stores.push(testValue);
    }

    this.length = this.stores.length;
    this.storesPaginated = this.stores.slice(0, this.pageSizeOptions[0]);
  }

  handlePageEvent(event: any) {
    const start = event.pageIndex * event.pageSize;
    const end = (event.pageIndex + 1) * event.pageSize;
    this.storesPaginated = this.stores.slice(start, end);
  }

  onViewChange(event: any) {
    this.viewGrid = event.value;
  }
}
