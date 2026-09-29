import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pizza {
  id: string;
  type: string;
  price: number;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  topping: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private apiUrl = 'http://localhost:3000/api/pizzas';

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }
}