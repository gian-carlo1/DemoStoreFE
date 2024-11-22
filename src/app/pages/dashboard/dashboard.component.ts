import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '../../models/store';
import { StoreService } from '../../services/store.service';
import { StoreCardComponent } from '../../components/store-card/store-card.component';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [StoreCardComponent, MatPaginator],
  host: { class: 'dashboard' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  storeService = inject(StoreService);
  router = inject(Router);

  stores: Store[] = [];
  storesPaginated: Store[] = []

  pageSize = 5;
  pageIndex = 1;
  length = 0;

  async ngOnInit() {
    this.stores = await this.storeService.getStores();
    for (let index = 0; index < 20; index++) {
      this.stores.push(this.stores[0]);
    }
    this.length = this.stores.length;
    this.storesPaginated = this.stores.slice(0, this.pageSize)
  }

  onCardNavigate(store: Store) {
    this.router.navigate([`/store/${store.id}`]);
  }

  handlePageEvent(event: any) {}
}
