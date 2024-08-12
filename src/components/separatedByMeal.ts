import type { ProductInfo } from "../types.js";

export default function separateByMeal(meals: [ProductInfo]) {
  return meals.reduce((result, meal) => {
    meal.mealType.forEach((type) => {
      if (!result[type]) {
        result[type] = [];
      }
      result[type].push(meal);
    });
    return result;
  }, {});
}