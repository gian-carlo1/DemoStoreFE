import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSignal = signal<boolean>(false);

  set loading(isLoading: boolean) {
    this.loadingSignal.set(isLoading);
  }

	get loading(): Signal<boolean> {
		return this.loadingSignal.asReadonly()
	}
}
