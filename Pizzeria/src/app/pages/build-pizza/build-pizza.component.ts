import { Component, OnInit } from '@angular/core';

import {
  Ingredient,
  IngredientService
} from '../../services/ingredient.service';

import { CartService } from '../../services/cart.service';

import { Router } from '@angular/router';

import { from } from 'rxjs';
import { concatMap, last } from 'rxjs/operators';


@Component({
  selector: 'app-build-pizza',

  templateUrl: './build-pizza.component.html',

  styleUrls: ['./build-pizza.component.css']
})
export class BuildPizzaComponent implements OnInit {

  ingredients: Ingredient[] = [];

  selectedIngredients: Ingredient[] = [];

  totalPrice = 0;

  addingToCart = false;


  constructor(
    private ingredientService: IngredientService,

    private cartService: CartService,

    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadIngredients();

  }


  // ==========================================
  // LOAD INGREDIENTS
  // ==========================================

  loadIngredients(): void {

    this.ingredientService
      .getIngredients()
      .subscribe({

        next: (data) => {

          this.ingredients = data;

        },

        error: (error: any) => {

          console.error(
            'Failed to load ingredients:',
            error
          );

        }

      });

  }


  // ==========================================
  // SELECT / UNSELECT INGREDIENT
  // ==========================================

  selectIngredient(
    ingredient: Ingredient
  ): void {

    const index =
      this.selectedIngredients.findIndex(
        item => item.id === ingredient.id
      );


    if (index === -1) {

      this.selectedIngredients.push(
        ingredient
      );

    } else {

      this.selectedIngredients.splice(
        index,
        1
      );

    }


    this.calculateTotal();

  }


  // ==========================================
  // CHECK SELECTED
  // ==========================================

  isSelected(
    ingredient: Ingredient
  ): boolean {

    return this.selectedIngredients.some(
      item => item.id === ingredient.id
    );

  }


  // ==========================================
  // CALCULATE TOTAL
  // ==========================================

  calculateTotal(): void {

    this.totalPrice =
      this.selectedIngredients.reduce(

        (total, ingredient) =>
          total + ingredient.price,

        0

      );

  }


  // ==========================================
  // ADD INGREDIENTS TO CART
  // ==========================================

  addPizzaToCart(): void {

    if (
      this.selectedIngredients.length === 0
    ) {

      alert(
        'Please select at least one ingredient'
      );

      return;

    }


    this.addingToCart = true;


    /*
     * Add every selected ingredient
     * individually to the cart.
     */

    from(this.selectedIngredients)
      .pipe(

        concatMap((ingredient) => {

          return this.cartService.addIngredient(
            ingredient.id.toString()
          );

        }),

        last()

      )
      .subscribe({

        next: (data) => {

          console.log(
            'Ingredients added to cart:',
            data
          );

          this.addingToCart = false;

          this.router.navigate([
            '/cart'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Failed to add ingredients to cart:',
            error
          );

          this.addingToCart = false;

          alert(
            'Failed to add ingredients to cart'
          );

        }

      });

  }

}