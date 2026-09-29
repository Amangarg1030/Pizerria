import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartService,
  Cart,
  CartItem
} from '../../services/cart.service';


@Component({
  selector: 'app-cart',

  templateUrl: './cart.component.html',

  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  // ==========================================
  // CART
  // ==========================================

  cart: Cart = {
    items: [],
    ingredients: []
  };


  // ==========================================
  // INGREDIENT DROPDOWN
  // ==========================================

  showIngredients = false;


  // ==========================================
  // ORDER SUCCESS
  // ==========================================

  orderPlaced = false;

  orderedItems: CartItem[] = [];


constructor(
  private cartService: CartService,
  private router: Router
) {}

  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.loadCart();

  }


  // ==========================================
  // LOAD CART
  // ==========================================

  loadCart(): void {

    this.cartService
      .getCart()
      .subscribe({

        next: (data: Cart) => {

          this.cart = data;

        },

        error: (error: any) => {

          console.error(
            'Failed to load cart:',
            error
          );

        }

      });

  }


  // ==========================================
  // CHECK NON VEG
  // ==========================================

  isNonVeg(type: string): boolean {

    return type?.toLowerCase() === 'non-veg';

  }


  // ==========================================
  // UPDATE PIZZA QUANTITY
  // ==========================================

  updateQuantity(
    itemId: string,
    quantity: number
  ): void {

    if (quantity < 1) {

      this.removeItem(itemId);

      return;

    }


    this.cartService
      .updateQuantity(
        itemId,
        quantity
      )
      .subscribe({

        next: (data: Cart) => {

          this.cart = data;

        },

        error: (error: any) => {

          console.error(
            'Failed to update quantity:',
            error
          );

        }

      });

  }


  // ==========================================
  // REMOVE PIZZA
  // ==========================================

  removeItem(
    itemId: string
  ): void {

    this.cartService
      .removeFromCart(itemId)
      .subscribe({

        next: (data: Cart) => {

          this.cart = data;

        },

        error: (error: any) => {

          console.error(
            'Failed to remove item:',
            error
          );

        }

      });

  }


  // ==========================================
  // PIZZA TOTAL
  // ==========================================

  getPizzaTotal(): number {

    return this.cart.items.reduce(

      (total, item) => {

        return total +
          (item.price * item.quantity);

      },

      0

    );

  }


  // ==========================================
  // INGREDIENT TOTAL
  // ==========================================

  getIngredientsTotal(): number {

    return this.cart.ingredients.reduce(

      (total, ingredient) => {

        return total +
          (ingredient.price * ingredient.quantity);

      },

      0

    );

  }


  // ==========================================
  // GRAND TOTAL
  // ==========================================

  getGrandTotal(): number {

    return (
      this.getPizzaTotal() +
      this.getIngredientsTotal()
    );

  }


  // ==========================================
  // TOGGLE INGREDIENTS
  // ==========================================

  toggleIngredients(): void {

    this.showIngredients =
      !this.showIngredients;

  }


  // ==========================================
  // PAY / CHECKOUT
  // ==========================================

  checkout(): void {

    /*
     * Save the pizzas currently in the cart
     * so they can be displayed on the success page.
     */
    
    this.orderedItems = [
      ...this.cart.items
    ];

    /*
     * Show only the success message.
     */

    this.orderPlaced = true;


    /*
     * Close ingredient dropdown.
     */

    this.showIngredients = false;

  }


  // ==========================================
  // CLEAR CART
  // ==========================================

  clearCart(): void {

    this.cartService
      .clearCart()
      .subscribe({

        next: (data: Cart) => {

          this.cart = data;

          this.showIngredients = false;

        },

        error: (error: any) => {

          console.error(
            'Failed to clear cart:',
            error
          );

        }

      });

  }

  orderMore(): void {
  this.router.navigate(['/order-pizza']);
}

}