import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentExchangeRate } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public fetchData(date?: string) {
    if (date)
      return this.http.get<CurrentExchangeRate[]>(
        `https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`
      );
      
    return this.http.get<CurrentExchangeRate[]>(
      'https://api.nbp.pl/api/exchangerates/tables/A/?format=json'
    );
  }
}
