import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '../../models/store';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.scss',
  imports: [MatCardModule, MatIcon],
})
export class StoreCardComponent {
  store = input.required<Store>();
  navigate = output();

  navigateStore() {
    this.navigate.emit();
  }
}
