import { Component } from '@angular/core';
import { PizzaService,Pizza } from 'src/app/services/pizza.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css']
})
export class OrderPizzaComponent {
  pizzas: Pizza[] = [];

  constructor(private pizzaService: PizzaService,private cartService: CartService) {}

  ngOnInit(): void {
    this.pizzaService.getPizzas().subscribe({
      next: (data) => {
        this.pizzas = data;
        // console.log('Pizzas:', this.pizzas);
      },

      error: (error) => {
        console.error('Error fetching pizzas:', error);
      }
    });
  }
  addToCart(pizza: Pizza): void {

  this.cartService.addToCart(pizza.id).subscribe({
    next: (cart) => {
      // console.log('Pizza added to cart:', cart);
      // alert(`${pizza.name} added to cart`);
    },

    error: (error) => {
      console.error('Failed to add pizza:', error);
    }
  });

}
}
