import { Component, input, output, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '../../models/store';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.scss',
  imports: [MatCardModule, MatExpansionModule, MatIcon],
})
export class StoreCardComponent {
  store = input.required<Store>();
  panelOpenState: boolean = false;
}
