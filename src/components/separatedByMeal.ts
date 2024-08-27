import type { ProductInfo } from "../types.js";

type MealCategory = {
  [key: string]: ProductInfo[];
};

export default function separateByMeal(meals: ProductInfo[]): MealCategory {
  return meals.reduce<MealCategory>((result, meal) => {
    const mealTypes = Array.isArray(meal.mealType) ? meal.mealType : [meal.mealType];
    
    mealTypes.forEach((type) => {
      if (!result[type]) {
        result[type] = [];
      }
      result[type].push(meal);
    });

    return result;
  }, {} as MealCategory);
}
