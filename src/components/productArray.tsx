import { useEffect, useState } from "react";
import separateByMeal from "./separatedByMeal";
import FormMeals from "./formMeals";
import type { ProductInfo } from "../types";

type SeparatedMeals = {
  [key: string]: ProductInfo[];
};

const ProductArray = () => {
  const [displayMeals, setDisplayMeals] = useState<ProductInfo[]>([]);
  const [mealsKeys, setMealsKeys] = useState<string[]>([]);
  const [separatedMeals, setSeparatedMeals] = useState<SeparatedMeals>({});
  const [selectedMeal, setSelectedMeal] = useState<string>("");

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => data.recipes)
      .then((recipes) => separateByMeal(recipes))
      .then((separatedMeals) => setSeparatedMeals(separatedMeals));
  }, []);

  useEffect(() => {
    setMealsKeys(Object.keys(separatedMeals));
  }, [separatedMeals]);

  useEffect(() => {
    const savedSelectedMeal = localStorage.getItem("selectedMeal");
    if (savedSelectedMeal && separatedMeals[savedSelectedMeal]) {
      setSelectedMeal(savedSelectedMeal);
      setDisplayMeals(separatedMeals[savedSelectedMeal]);
    }
  }, [separatedMeals]);

  const onSelectedMeal = (meal: string) => {
    localStorage.setItem("selectedMeal", meal);
    setSelectedMeal(meal);
    setDisplayMeals(separatedMeals[meal as keyof typeof separatedMeals]);
  };

  return (
    <div>
      <FormMeals mealsKeys={mealsKeys} selectedMeal={selectedMeal} onSelectedMeal={onSelectedMeal} />

      <h1 className="py-2 text-4xl font-semibold text-yellow-300">
        {selectedMeal}
      </h1>

      <section className="mx-auto py-6 sm:px-10">
        {displayMeals.length !== 0 ? (
          displayMeals.map((recipe: ProductInfo) => (
            <div
              key={recipe.id}
              className="w-72 duration-300 hover:scale-105 rounded-lg bg-gray-600/40 text-white"
            >
              <a className="flex flex-col h-full" href={`${recipe.id}`}>
                <picture>
                  <img
                    alt={recipe.name}
                    className="my-2 h-32 w-full rounded-t-lg"
                    src={recipe.image}
                  />
                </picture>
                <h3 className="my-2 text-center text-balance text-3xl h-full content-center">
                  {recipe.name}
                </h3>
              </a>
            </div>
          ))
        ) : (
          <h2 className="text-4xl font-semibold text-[#febd2f] md:w-max">
            Please, select a meal's type.
          </h2>
        )}
      </section>

      {(displayMeals.length >= 3 && window.innerWidth < 768) ||
      displayMeals.length >= 4 ? (
        <a
          href="#top"
          className="absolute -bottom-7 right-0 motion-safe:animate-bounce"
          aria-label="Scroll to top"
        >
          <svg
            className="size-10 fill-white/60 hover:fill-white duration-300"
            viewBox="0 0 512 512"
          >
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM385 215c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V392c0 13.3-10.7 24-24 24s-24-10.7-24-24V177.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 103c9.4-9.4 24.6-9.4 33.9 0L385 215z" />
          </svg>
        </a>
      ) : null}
    </div>
  );
};

export default ProductArray;