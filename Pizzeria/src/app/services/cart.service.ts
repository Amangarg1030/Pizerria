import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  _id?: string;
  pizzaId: string;
  name: string;
  type: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartIngredient {
  _id?: string;
  ingredientId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  _id?: string;
  items: CartItem[];
  ingredients: CartIngredient[];
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/api/cart';


  constructor(
    private http: HttpClient
  ) {}


  // ==========================================
  // GET CART
  // ==========================================

  getCart(): Observable<Cart> {

    return this.http.get<Cart>(
      this.apiUrl
    );

  }


  // ==========================================
  // ADD PIZZA
  // ==========================================

  addToCart(pizzaId: string): Observable<Cart> {

    return this.http.post<Cart>(
      this.apiUrl,
      {
        pizzaId: pizzaId
      }
    );

  }


  // ==========================================
  // ADD INGREDIENT
  // ==========================================

  addIngredient(
    ingredientId: string
  ): Observable<Cart> {

    return this.http.post<Cart>(
      `${this.apiUrl}/ingredient`,
      {
        ingredientId: ingredientId
      }
    );

  }


  // ==========================================
  // UPDATE PIZZA QUANTITY
  // ==========================================

  updateQuantity(
    itemId: string,
    quantity: number
  ): Observable<Cart> {

    return this.http.patch<Cart>(
      `${this.apiUrl}/${itemId}`,
      {
        quantity: quantity
      }
    );

  }


  // ==========================================
  // REMOVE PIZZA
  // ==========================================

  removeFromCart(
    itemId: string
  ): Observable<Cart> {

    return this.http.delete<Cart>(
      `${this.apiUrl}/${itemId}`
    );

  }


  // ==========================================
  // CLEAR CART
  // ==========================================

  clearCart(): Observable<Cart> {

    return this.http.delete<Cart>(
      this.apiUrl
    );

  }

}