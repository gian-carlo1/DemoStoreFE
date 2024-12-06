import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loaderService = inject(LoaderService);

  loaderService.loading = true;

  return next(req).pipe(finalize(() => (loaderService.loading = false)));
}
