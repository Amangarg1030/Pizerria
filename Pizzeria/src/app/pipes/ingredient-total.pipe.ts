import {
  Pipe,
  PipeTransform
} from '@angular/core';

import { Ingredient } from '../services/ingredient.service';


@Pipe({
  name: 'ingredientTotal'
})
export class IngredientTotalPipe
  implements PipeTransform {


  transform(
    ingredients: Ingredient[] | undefined
  ): number {

    if (
      !ingredients ||
      ingredients.length === 0
    ) {

      return 0;

    }


    return ingredients.reduce(

      (total, ingredient) =>

        total + ingredient.price,

      0

    );

  }

}