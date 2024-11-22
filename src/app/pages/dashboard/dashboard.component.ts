import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '../../models/store';
import { StoreService } from '../../services/store.service';
import { StoreCardComponent } from '../../components/store-card/store-card.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [StoreCardComponent, MatPaginator, MatButtonToggleModule, MatIconModule],
})
export class DashboardComponent implements OnInit {
  storeService = inject(StoreService);
  router = inject(Router);

  stores: Store[] = [];
  storesPaginated: Store[] = []

  length = 0;

  viewGrid = false

  async ngOnInit() {
    this.stores = await this.storeService.getStores();


    for (let index = 0; index < 20; index++) {
      const testValue: Store = {
        ...this.stores[0],
        data: {
          ...this.stores[0].data,
          name: `testValue${index}`
        }
      }
      this.stores.push(testValue);
    }


    this.length = this.stores.length;
    this.storesPaginated = this.stores.slice(0, 3)
  }

  onCardNavigate(store: Store) {
    this.router.navigate([`/store/${store.id}`]);
  }

  handlePageEvent(event: any) {
    const start = event.pageIndex * event.pageSize
    const end = (event.pageIndex + 1) * event.pageSize
    this.storesPaginated = this.stores.slice(start, end)
  }

  onViewChange(event: any) {
    this.viewGrid = event.value
  }
}
