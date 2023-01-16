import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { CurrentExchangeRate, FetchStatus } from './model';

export interface CurrentExchangeRateState {
  data: CurrentExchangeRate[] | null;
  status: FetchStatus;
  error: string;
}

export const initialCurrentExchangeRateState: CurrentExchangeRateState = {
  data: null,
  status: 'IDLE',
  error: '',
};

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private currentExchangeRateState =
    new BehaviorSubject<CurrentExchangeRateState>(
      initialCurrentExchangeRateState
    );

  constructor(private apiService: ApiService) {}

  public get currentExchangeRateState$() {
    return this.currentExchangeRateState.asObservable();
  }

  public getCurrentExchangeRate(date?: string) {
    this.currentExchangeRateState.next({
      ...this.currentExchangeRateState.value,
      status: 'LOADING',
      data: null,
      error: '',
    });

    this.apiService.fetchData(date).subscribe({
      next: (res) => {
        this.currentExchangeRateState.next({
          ...this.currentExchangeRateState.value,
          status: 'SUCCESS',
          data: res,
          error: '',
        });
      },
      error: (err: HttpErrorResponse) => {
        this.currentExchangeRateState.next({
          ...this.currentExchangeRateState.value,
          status: 'ERROR',
          data: null,
          error: err.error,
        });
        
      },
    });
  }

  public setTheme(mode: string) {
      // if (mode === 'DARK'){
      //   import '~primeng/resources/themes/lara-light-blue/theme.css';
      // } else if (mode === 'LIGHT'){
      //   import '~primeng/resources/themes/mdc-dark-indigo/theme.css';
      // }
  }
}
