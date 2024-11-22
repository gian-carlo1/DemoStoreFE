import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '../../models/store';
import { StoreService } from '../../services/store.service';
import { StoreCardComponent } from '../../components/store-card/store-card.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [StoreCardComponent],
  host: { 'class': 'dashboard' },
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  storeService = inject(StoreService);
  router = inject(Router);
  stores: Store[] = [];

  async ngOnInit() {
    this.stores = await this.storeService.getStores();
  }

  onCardNavigate(store: Store) {
    this.router.navigate([`/store/${store.id}`]);
  }
}
