import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './core/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loaderService = inject(LoaderService);
  loading = this.loaderService.loading;
  title = 'EurisStoreFE';
}
